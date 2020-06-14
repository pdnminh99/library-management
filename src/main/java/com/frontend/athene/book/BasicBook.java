package com.frontend.athene.book;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.google.cloud.firestore.annotation.DocumentId;

public class BasicBook {

    @DocumentId
    private String bookId;

    private String title;

    private String author;

    public BasicBook() {}

    public BasicBook(String bookId, String title, String author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
    }

    @JsonGetter("bookId")
    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
