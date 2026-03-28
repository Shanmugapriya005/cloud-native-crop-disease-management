const remedies = {
  "Leaf Blight": {
    causes: [
      "Fungal infection",
      "High humidity",
      "Poor air circulation"
    ],
    remedies: [
      "Use Mancozeb fungicide",
      "Remove infected leaves",
      "Avoid overhead irrigation"
    ],
    natural: [
      "Neem oil spray",
      "Baking soda solution"
    ]
  },

  "Powdery Mildew": {
    causes: [
      "Warm and dry climate",
      "Fungal spores"
    ],
    remedies: [
      "Use Sulfur fungicide",
      "Apply potassium bicarbonate"
    ],
    natural: [
      "Milk spray (1:9 ratio)",
      "Neem oil"
    ]
  },

  "Healthy": {
    causes: ["No disease detected"],
    remedies: ["Maintain regular watering and nutrition"],
    natural: ["Compost application"]
  }
};

module.exports = remedies;
