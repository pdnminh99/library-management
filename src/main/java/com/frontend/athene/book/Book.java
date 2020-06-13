package com.frontend.athene.book;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.frontend.athene.user.User;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.annotation.Exclude;
import com.google.cloud.firestore.annotation.PropertyName;

@JsonIgnoreProperties({"bookId", "createdAt"})
public class Book extends BasicBook {

    private String description;

    @Exclude
    @JsonIgnore
    private Metadata genre;

    @Exclude
    @JsonIgnore
    private Metadata publisher;

    private Integer yearOfPublishing;

    private Integer count;

    private String photoUrl;

    @Exclude
    private User creator;

    @JsonIgnore
    private Timestamp createdAt;

    public Book() {
        super();
    }

    public Book(String bookId,
                String title,
                String description,
                Metadata author,
                Metadata publisher,
                Metadata genre,
                Integer yearOfPublishing,
                Timestamp createdAt) {
        super(bookId, title, author);
        this.publisher = publisher;
        this.description = description;
        this.genre = genre;
        this.yearOfPublishing = yearOfPublishing;
        this.createdAt = createdAt;
    }

    @Exclude
    @JsonGetter("createdAt")
    public Long getCreatedAtByEpoch() {
        return createdAt == null ? null : createdAt.toDate().getTime();
    }

    @JsonIgnore
    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getYearOfPublishing() {
        return yearOfPublishing;
    }

    public void setYearOfPublishing(Integer yearOfPublishing) {
        this.yearOfPublishing = yearOfPublishing;
    }

    @Exclude
    @JsonIgnore
    public Metadata getPublisher() {
        return publisher;
    }

    @Exclude
    @JsonGetter("publisher")
    public String getPublisherDisplay() {
        return publisher == null ? null : publisher.getName();
    }

    @JsonIgnore
    @PropertyName("publisher")
    public String getPublisherId() {
        return publisher == null ? null : publisher.getMetadataId();
    }

    @Exclude
    public void setPublisher(Metadata publisher) {
        this.publisher = publisher;
    }

    @JsonSetter
    public void setPublisher(String publisher) {
        this.publisher = new Metadata(publisher, null, MetadataType.PUBLISHER, null);
    }

    @Exclude
    @JsonIgnore
    public Metadata getGenre() {
        return genre;
    }

    @Exclude
    @JsonGetter("genre")
    public String getGenreDisplay() {
        return genre == null ? null : genre.getName();
    }

    @JsonIgnore
    @PropertyName("genre")
    public String getGenreId() {
        return genre == null ? null : genre.getMetadataId();
    }

    @Exclude
    public void setGenre(Metadata genre) {
        this.genre = genre;
    }

    @JsonSetter
    public void setGenre(String genre) {
        this.genre = new Metadata(genre, null, MetadataType.GENRE, null);
    }

    @JsonIgnore
    @PropertyName("creator")
    public String getCreatorId() {
        return creator == null ? null : creator.getUserId();
    }

    @Exclude
    public User getCreator() {
        return creator;
    }

    @Exclude
    public void setCreator(User creator) {
        this.creator = creator;
    }

    @JsonSetter
    public void setCreator(String userId) {
        this.creator = new User(userId, null, null, null, null);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}