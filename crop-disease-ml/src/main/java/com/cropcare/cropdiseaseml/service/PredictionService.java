package com.cropcare.cropdiseaseml.service;

import org.datavec.image.loader.NativeImageLoader;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.deeplearning4j.util.ModelSerializer;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.dataset.api.preprocessor.ImagePreProcessingScaler;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Service
public class PredictionService {

    private MultiLayerNetwork model;

    private static final int HEIGHT = 128;
    private static final int WIDTH = 128;
    private static final int CHANNELS = 3;

    private static final List<String> LABELS = Arrays.asList(
            "Tomato_Bacterial_spot",
            "Tomato_Early_blight",
            "Tomato_Healthy",
            "Tomato_Late_blight",
            "Tomato_Leaf_Mold",
            "Tomato_Septoria_leaf_spot",
            "Tomato_Spider_mites_Two_spotted_spider_mite",
            "Tomato__Target_Spot",
            "Tomato__Tomato_YellowLeaf__Curl_Virus",
            "Tomato__Tomato_mosaic_virus"
    );

    public PredictionService() throws Exception {
        File modelFile = new File("src/main/resources/crop-disease-model.zip");
        model = ModelSerializer.restoreMultiLayerNetwork(modelFile);
    }

    public String predict(MultipartFile file) throws Exception {

        NativeImageLoader loader = new NativeImageLoader(HEIGHT, WIDTH, CHANNELS);
        InputStream inputStream = file.getInputStream();

        INDArray image = loader.asMatrix(inputStream);

        ImagePreProcessingScaler scaler = new ImagePreProcessingScaler(0,1);
        scaler.transform(image);

        INDArray output = model.output(image);

        int predictedClass = output.argMax(1).getInt(0);

        return LABELS.get(predictedClass);
    }
}