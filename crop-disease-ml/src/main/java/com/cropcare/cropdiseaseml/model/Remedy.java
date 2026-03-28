package com.cropcare.cropdiseaseml.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "remedies")
public class Remedy {

    @Id
    private String id;

    private String crop;
    private String disease;
    private String remedy;
    private String prevention;
    private String organicPesticide;
    private String howToUse;

    // Default constructor
    public Remedy() {}

    // Full constructor
    public Remedy(String crop, String disease, String remedy, String prevention,
                  String organicPesticide, String howToUse) {
        this.crop = crop;
        this.disease = disease;
        this.remedy = remedy;
        this.prevention = prevention;
        this.organicPesticide = organicPesticide;
        this.howToUse = howToUse;
    }

    // Getters

    public String getId() {
        return id;
    }

    public String getCrop() {
        return crop;
    }

    public String getDisease() {
        return disease;
    }

    public String getRemedy() {
        return remedy;
    }

    public String getPrevention() {
        return prevention;
    }

    public String getOrganicPesticide() {
        return organicPesticide;
    }

    public String getHowToUse() {
        return howToUse;
    }

    // Setters

    public void setId(String id) {
        this.id = id;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public void setRemedy(String remedy) {
        this.remedy = remedy;
    }

    public void setPrevention(String prevention) {
        this.prevention = prevention;
    }

    public void setOrganicPesticide(String organicPesticide) {
        this.organicPesticide = organicPesticide;
    }

    public void setHowToUse(String howToUse) {
        this.howToUse = howToUse;
    }
}