package com.frontend.athene.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.cloud.firestore.annotation.Exclude;
import com.google.firebase.database.annotations.NotNull;

public class User {

    private String userId;

    private String displayName;

    private String email;

    private String photoURL;

    @Exclude
    @JsonIgnore
    private UserType type;

    public User() {}

    public User(String userId,
                String displayName,
                String email,
                String photoURL,
                UserType type) {
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

    @Exclude
    @JsonIgnore
    public UserType getType() {
        return type;
    }

    @Exclude
    public void setType(UserType type) {
        this.type = type;
    }

    @NotNull
    public void setType(String type) {
        this.type = UserType.fromText(type);
    }

    @NotNull
    public String getPhotoURL() {
        return photoURL;
    }

    @NotNull
    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }
}
