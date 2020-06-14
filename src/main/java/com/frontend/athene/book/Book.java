package com.frontend.athene.book;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.frontend.athene.user.User;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.annotation.Exclude;
import com.google.cloud.firestore.annotation.PropertyName;

public class Book extends BasicBook {

    private String description;

    private String genre;

    private String publisher;

    private Integer yearOfPublishing;

    private Integer count;

    private String photoURL;

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
                String author,
                String publisher,
                String genre,
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

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
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

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }
}