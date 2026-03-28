package com.cropcare.cropdiseaseml.ml.dataset;

import org.datavec.api.io.labels.ParentPathLabelGenerator;
import org.datavec.api.split.FileSplit;
import org.datavec.image.loader.NativeImageLoader;
import org.datavec.image.recordreader.ImageRecordReader;
import org.deeplearning4j.datasets.datavec.RecordReaderDataSetIterator;
import org.nd4j.linalg.dataset.api.iterator.DataSetIterator;
import org.nd4j.linalg.dataset.api.preprocessor.ImagePreProcessingScaler;

import java.io.File;
import java.util.Random;

public class ImageDatasetLoader {

    private static final int HEIGHT = 128;
    private static final int WIDTH = 128;
    private static final int CHANNELS = 3;
    private static final int BATCH_SIZE = 16;
    private static final int NUM_CLASSES = 10;   // 🔥 UPDATED TO 11
    private static final long SEED = 123;

    public static DataSetIterator loadData(String datasetPath, boolean train) throws Exception {

        File dataDir;

        if (train) {
            dataDir = new File(datasetPath + "/train");
        } else {
            dataDir = new File(datasetPath + "/test");
        }

        if (!dataDir.exists()) {
            throw new IllegalArgumentException("Dataset folder not found: " + dataDir.getAbsolutePath());
        }

        FileSplit fileSplit = new FileSplit(
                dataDir,
                NativeImageLoader.ALLOWED_FORMATS,
                new Random(SEED)
        );

        ParentPathLabelGenerator labelMaker = new ParentPathLabelGenerator();

        ImageRecordReader recordReader =
                new ImageRecordReader(HEIGHT, WIDTH, CHANNELS, labelMaker);

        recordReader.initialize(fileSplit);

        DataSetIterator dataSetIterator =
                new RecordReaderDataSetIterator(
                        recordReader,
                        BATCH_SIZE,
                        1,
                        NUM_CLASSES
                );

        ImagePreProcessingScaler scaler = new ImagePreProcessingScaler(0, 1);
        dataSetIterator.setPreProcessor(scaler);

        return dataSetIterator;
    }
}