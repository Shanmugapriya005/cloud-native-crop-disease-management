export const getPrediction = async (imageFile) => {
  const formData = new FormData();

  // ⚠️ MUST be exactly "file"
  formData.append("file", imageFile);

  const response = await fetch("http://localhost:8080/api/predict", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Backend error:", errorText);
    throw new Error("Prediction failed");
  }

  return await response.json();
};
