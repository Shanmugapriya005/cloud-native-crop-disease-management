"""
Crop Disease MobileNetV2 Trainer
=================================
Trains a MobileNetV2 model on your PlantVillage dataset and exports a
TorchScript (.pt) file that Java (DJL) can load directly.

Usage:
    python train_model.py

Output:
    mlservice/mlservice/src/main/resources/model/crop_disease_model.pt
    mlservice/mlservice/src/main/resources/model/synset.txt
"""

import os
import json
import time
import random
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
from torchvision import datasets, models, transforms
from pathlib import Path

# ── Configuration ──────────────────────────────────────────────────────────────
DATASET_DIR  = Path(r"c:\Crop Disease Management\archive\PlantVillageDataset\PlantVillage")
OUTPUT_DIR   = Path(r"c:\Crop Disease Management\mlservice\mlservice\src\main\resources\model")
MODEL_NAME   = "crop_disease_model.pt"
SYNSET_NAME  = "synset.txt"

IMG_SIZE     = 224
BATCH_SIZE   = 32
EPOCHS       = 8           # Good balance for CPU training
LR           = 0.001
VAL_SPLIT    = 0.2
NUM_WORKERS  = 0
MAX_PER_CLASS = 200        # Cap per class for CPU — set to None to use all images
DEVICE       = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print(f"Device: {DEVICE}")
print(f"Dataset: {DATASET_DIR}")

# ── Data Transforms ────────────────────────────────────────────────────────────
train_transforms = transforms.Compose([
    transforms.Resize((IMG_SIZE + 32, IMG_SIZE + 32)),
    transforms.RandomCrop(IMG_SIZE),
    transforms.RandomHorizontalFlip(),
    transforms.RandomVerticalFlip(),
    transforms.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.3),
    transforms.RandomRotation(15),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225]),
])

val_transforms = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225]),
])

# ── Load Dataset ───────────────────────────────────────────────────────────────
# ── Load Dataset ───────────────────────────────────────────────────────────────
print("\nLoading dataset...")

VALID_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}

def has_images(folder_path):
    """Returns True only if the folder directly contains image files."""
    return any(f.suffix in VALID_EXTENSIONS for f in Path(folder_path).iterdir() if f.is_file())

# Find valid class folders (excludes nested PlantVillage dir which has no direct images)
valid_class_dirs = sorted([
    d.name for d in DATASET_DIR.iterdir()
    if d.is_dir() and has_images(d)
])

# Build a filtered dataset using a custom sample list
all_samples = []
for idx, class_name in enumerate(valid_class_dirs):
    class_dir = DATASET_DIR / class_name
    imgs = [str(f) for f in class_dir.iterdir() if f.suffix in VALID_EXTENSIONS]
    # Cap per-class samples for CPU training speed
    if MAX_PER_CLASS and len(imgs) > MAX_PER_CLASS:
        random.seed(42)
        imgs = random.sample(imgs, MAX_PER_CLASS)
    for img_path in imgs:
        all_samples.append((img_path, idx))

class_names = valid_class_dirs
num_classes = len(class_names)

print(f"Classes ({num_classes}):")
for i, name in enumerate(class_names):
    count = sum(1 for _, idx in all_samples if idx == i)
    print(f"  [{i}] {name}  ({count} images)")

# Create datasets using a simple wrapper
from torch.utils.data import Dataset
from PIL import Image as PILImage

class CropDataset(Dataset):
    def __init__(self, samples, transform):
        self.samples   = samples
        self.transform = transform

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        path, label = self.samples[idx]
        img = PILImage.open(path).convert("RGB")
        if self.transform:
            img = self.transform(img)
        return img, label

# Shuffle and split
random.seed(42)
random.shuffle(all_samples)
val_size   = int(len(all_samples) * VAL_SPLIT)
train_size = len(all_samples) - val_size
train_samples = all_samples[val_size:]
val_samples   = all_samples[:val_size]

train_ds = CropDataset(train_samples, train_transforms)
val_ds   = CropDataset(val_samples,   val_transforms)

train_loader = DataLoader(train_ds, batch_size=BATCH_SIZE, shuffle=True,  num_workers=NUM_WORKERS, pin_memory=False)
val_loader   = DataLoader(val_ds,   batch_size=BATCH_SIZE, shuffle=False, num_workers=NUM_WORKERS, pin_memory=False)

print(f"\nTrain samples: {train_size} | Val samples: {val_size}")

# ── Build Model ────────────────────────────────────────────────────────────────
print("\nBuilding MobileNetV2 model...")
model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.IMAGENET1K_V1)

# Freeze base layers — only train the classifier
for param in model.features.parameters():
    param.requires_grad = False

# Replace classifier head
in_features = model.classifier[1].in_features
model.classifier = nn.Sequential(
    nn.Dropout(p=0.3),
    nn.Linear(in_features, num_classes),
)

model = model.to(DEVICE)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.classifier.parameters(), lr=LR)
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=3, gamma=0.5)

# ── Training Loop ──────────────────────────────────────────────────────────────
print(f"\nTraining for {EPOCHS} epochs on {DEVICE}...\n")
best_val_acc = 0.0
best_model_state = None

for epoch in range(1, EPOCHS + 1):
    t0 = time.time()

    # --- Train ---
    model.train()
    train_loss, train_correct, train_total = 0.0, 0, 0
    for images, labels in train_loader:
        images, labels = images.to(DEVICE), labels.to(DEVICE)
        optimizer.zero_grad()
        outputs = model(images)
        loss    = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        train_loss    += loss.item() * images.size(0)
        _, predicted   = outputs.max(1)
        train_correct += predicted.eq(labels).sum().item()
        train_total   += images.size(0)

    # --- Validate ---
    model.eval()
    val_loss, val_correct, val_total = 0.0, 0, 0
    with torch.no_grad():
        for images, labels in val_loader:
            images, labels = images.to(DEVICE), labels.to(DEVICE)
            outputs = model(images)
            loss    = criterion(outputs, labels)
            val_loss    += loss.item() * images.size(0)
            _, predicted = outputs.max(1)
            val_correct  += predicted.eq(labels).sum().item()
            val_total    += images.size(0)

    scheduler.step()

    train_acc = 100.0 * train_correct / train_total
    val_acc   = 100.0 * val_correct   / val_total
    elapsed   = time.time() - t0

    print(f"Epoch [{epoch:02d}/{EPOCHS}]  "
          f"Train Loss: {train_loss/train_total:.4f}  Train Acc: {train_acc:.2f}%  |  "
          f"Val Loss: {val_loss/val_total:.4f}  Val Acc: {val_acc:.2f}%  "
          f"({elapsed:.1f}s)")

    if val_acc > best_val_acc:
        best_val_acc   = val_acc
        best_model_state = {k: v.clone() for k, v in model.state_dict().items()}
        print(f"  ✓ New best model saved (val_acc={val_acc:.2f}%)")

# ── Export TorchScript ─────────────────────────────────────────────────────────
print(f"\nBest validation accuracy: {best_val_acc:.2f}%")
print("Exporting TorchScript model for Java (DJL)...")

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Load best weights
model.load_state_dict(best_model_state)
model.eval()
model = model.cpu()

# Trace with a dummy input
dummy_input = torch.randn(1, 3, IMG_SIZE, IMG_SIZE)
traced_model = torch.jit.trace(model, dummy_input)
traced_model.save(str(OUTPUT_DIR / MODEL_NAME))
print(f"  Saved: {OUTPUT_DIR / MODEL_NAME}")

# Save synset (class labels) — DJL reads this as classnames file
with open(OUTPUT_DIR / SYNSET_NAME, "w") as f:
    for name in class_names:
        f.write(name + "\n")
print(f"  Saved: {OUTPUT_DIR / SYNSET_NAME}")

# Save class mapping JSON for reference
mapping = {i: name for i, name in enumerate(class_names)}
with open(OUTPUT_DIR / "class_mapping.json", "w") as f:
    json.dump(mapping, f, indent=2)
print(f"  Saved: {OUTPUT_DIR / 'class_mapping.json'}")

print(f"\nDone! Model ready for Java at:\n  {OUTPUT_DIR / MODEL_NAME}")
print("\nNext: restart the Java ML service — it will auto-load the model.")
