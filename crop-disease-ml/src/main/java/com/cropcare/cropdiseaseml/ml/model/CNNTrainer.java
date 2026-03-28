package com.cropcare.cropdiseaseml.ml.model;

import com.cropcare.cropdiseaseml.ml.dataset.ImageDatasetLoader;
import org.deeplearning4j.nn.api.OptimizationAlgorithm;
import org.deeplearning4j.nn.conf.MultiLayerConfiguration;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.inputs.InputType;
import org.deeplearning4j.nn.conf.layers.*;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.deeplearning4j.optimize.listeners.ScoreIterationListener;
import org.deeplearning4j.util.ModelSerializer;
import org.nd4j.evaluation.classification.Evaluation;
import org.nd4j.linalg.activations.Activation;
import org.nd4j.linalg.learning.config.Adam;
import org.nd4j.linalg.lossfunctions.LossFunctions;
import org.nd4j.linalg.dataset.api.iterator.DataSetIterator;
  
import java.io.File;

public class CNNTrainer {

    private static final int HEIGHT = 128;
    private static final int WIDTH = 128;
    private static final int CHANNELS = 3;
    private static final int NUM_CLASSES = 10;   // 🔥 10 CLASSES
    private static final int EPOCHS = 20;

    public static void main(String[] args) throws Exception {

        System.out.println("Loading training data...");
       String datasetPath = new File("crop-disease-ml/dataset").getAbsolutePath();

DataSetIterator trainData =
        ImageDatasetLoader.loadData(datasetPath, true);

DataSetIterator testData =
        ImageDatasetLoader.loadData(datasetPath, false);
        System.out.println("=== LABEL ORDER USED BY MODEL ===");
        System.out.println(trainData.getLabels());

        MultiLayerConfiguration config = new NeuralNetConfiguration.Builder()
                .seed(123)
                .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
                .updater(new Adam(0.0001))
                .list()

                .layer(new ConvolutionLayer.Builder(3, 3)
                        .nIn(CHANNELS)
                        .stride(1, 1)
                        .nOut(32)
                        .activation(Activation.RELU)
                        .build())

                .layer(new SubsamplingLayer.Builder(SubsamplingLayer.PoolingType.MAX)
                        .kernelSize(2, 2)
                        .stride(2, 2)
                        .build())

                .layer(new ConvolutionLayer.Builder(3, 3)
                        .stride(1, 1)
                        .nOut(64)
                        .activation(Activation.RELU)
                        .build())

                .layer(new SubsamplingLayer.Builder(SubsamplingLayer.PoolingType.MAX)
                        .kernelSize(2, 2)
                        .stride(2, 2)
                        .build())

                .layer(new DenseLayer.Builder()
                        .nOut(128)
                        .activation(Activation.RELU)
                        .build())

                .layer(new OutputLayer.Builder(
                        LossFunctions.LossFunction.NEGATIVELOGLIKELIHOOD)
                        .activation(Activation.SOFTMAX)
                        .nOut(NUM_CLASSES)   // 🔥 10 OUTPUTS
                        .build())

                .setInputType(InputType.convolutional(HEIGHT, WIDTH, CHANNELS))
                .build();

        MultiLayerNetwork model = new MultiLayerNetwork(config);
        model.init();
        model.setListeners(new ScoreIterationListener(20));

        System.out.println("Starting training...");

        for (int i = 0; i < EPOCHS; i++) {
            trainData.reset();
            model.fit(trainData);
            System.out.println("Completed epoch " + (i + 1));
        }

        System.out.println("Evaluating model...");
        Evaluation eval = model.evaluate(testData);
        System.out.println(eval.stats());

        File modelFile = new File("crop-disease-model.zip");
        ModelSerializer.writeModel(model, modelFile, true);

        System.out.println("Model saved at: " + modelFile.getAbsolutePath());
    }
}
