package com.frontend.athene.book;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.annotation.DocumentId;
import com.google.cloud.firestore.annotation.Exclude;
import com.google.cloud.firestore.annotation.PropertyName;

public class Metadata {

    @DocumentId
    private String metadataId;

    private String name;

    @JsonIgnore
    private Timestamp createdAt;

    private Integer count;

    @Exclude
    @JsonIgnore
    private MetadataType type;

    public Metadata() {}

    public Metadata(String name,
                    Integer count,
                    MetadataType type,
                    Timestamp createdAt) {
        this.name = name;
        this.count = count;
        this.type = type;
        this.createdAt = createdAt;
    }

    public String getMetadataId() {
        return metadataId;
    }

    public void setMetadataId(String metadataId) {
        this.metadataId = metadataId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonIgnore
    public Timestamp getCreatedAt() {
        return createdAt;
    }

    @Exclude
    @JsonGetter("createdAt")
    public Long getCreatedAtByEpoch() {
        return createdAt == null ? null : createdAt.toDate().getTime();
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    @Exclude
    public MetadataType getType() {
        return type;
    }

    @PropertyName("type")
    @JsonGetter("type")
    public String getTypeName() {
        return type == null ? null : type.toString();
    }

    @Exclude
    public void setType(MetadataType type) {
        this.type = type;
    }

    @PropertyName("type")
    public void setTypeName(String type) {
        this.type = MetadataType.fromText(type);
    }
}
