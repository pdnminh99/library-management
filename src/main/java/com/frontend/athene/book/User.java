package com.frontend.athene.book;

public class User {

    private String userId;

    private String displayName;

    private String email;

    private String photoURL;

    private String type;

    public User() {
    }

    public User(String userId,
                String displayName,
                String email,
                String photoURL,
                String type) {
        this.userId = userId;
        this.displayName = displayName;
        this.email = email;
        this.photoURL = photoURL;
        this.type = type;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }
}
