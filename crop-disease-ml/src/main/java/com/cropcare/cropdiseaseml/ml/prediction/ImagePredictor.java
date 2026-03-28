package com.cropcare.cropdiseaseml.ml.prediction;

import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.deeplearning4j.util.ModelSerializer;
import org.datavec.image.loader.NativeImageLoader;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.dataset.api.preprocessor.ImagePreProcessingScaler;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.InputStream;

public class ImagePredictor {

    private static final int HEIGHT = 128;
    private static final int WIDTH = 128;
    private static final int CHANNELS = 3;

    private static final String[] LABELS = {
            "Tomato_Bacterial_spot",
            "Tomato_Early_Blight",
            "Tomato_Healthy",
            "Tomato_Late_Blight",
            "Tomato_Leaf_Mold",
            "Tomato_Septoria_leaf_spot",
            "Tomato_Spider_mites_Two_spotted_spider_mite",
            "Tomato_Target_Spot",
            "Tomato_YellowLeaf_Curl_Virus",
            "Tomato_Mosaic_Virus"
    };

    private final MultiLayerNetwork model;

    // Load model from resources
    public ImagePredictor() throws Exception {

        ClassPathResource resource = new ClassPathResource("crop-disease-model.zip");

        InputStream modelStream = resource.getInputStream();

        this.model = ModelSerializer.restoreMultiLayerNetwork(modelStream);

        System.out.println("✅ Model loaded successfully!");
    }

    public String[] predict(File imageFile) throws Exception {

        NativeImageLoader loader = new NativeImageLoader(HEIGHT, WIDTH, CHANNELS);

        INDArray image = loader.asMatrix(imageFile);

        ImagePreProcessingScaler scaler = new ImagePreProcessingScaler(0,1);
        scaler.transform(image);

        INDArray output = model.output(image);

        int predictedClass = output.argMax(1).getInt(0);
        double confidence = output.maxNumber().doubleValue() * 100;

        return new String[]{
                LABELS[predictedClass],
                String.format("%.2f", confidence)
        };
    }
}