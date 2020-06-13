package com.frontend.athene.book;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.google.cloud.firestore.annotation.DocumentId;
import com.google.cloud.firestore.annotation.Exclude;
import com.google.cloud.firestore.annotation.PropertyName;
import com.google.firebase.database.annotations.NotNull;

public class BasicBook {

    @DocumentId
    private String bookId;

    @NotNull
    private String title;

    @Exclude
    @JsonIgnore
    private Metadata author;

    public BasicBook() {}

    public BasicBook(String bookId, String title, Metadata author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    @NotNull
    public void setTitle(String title) {
        this.title = title;
    }

    @Exclude
    @JsonIgnore
    public Metadata getAuthor() {
        return author;
    }

    @Exclude
    @JsonGetter("author")
    public String getAuthorDisplay() {
        return author == null ? null : author.getName();
    }

    @JsonIgnore
    @PropertyName("author")
    public String getAuthorId() {
        return author == null ? null : author.getMetadataId();
    }

    @Exclude
    public void setAuthor(Metadata author) {
        this.author = author;
    }

    @JsonSetter
    public void setAuthor(String author) {
        this.author = new Metadata(author, null, MetadataType.AUTHOR, null);
    }
}
