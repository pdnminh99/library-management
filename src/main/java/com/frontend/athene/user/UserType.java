package com.frontend.athene.user;

public enum UserType {
    GUEST("GUEST"),
    MEMBER("MEMBER"),
    ADMIN("ADMIN");

    private final String type;

    UserType(String type) {
        this.type = type;
    }

    public static UserType fromText(String type) {
        if (type == null) {
            return null;
        }
        switch (type) {
            case "GUEST":
                return GUEST;
            case "MEMBER":
                return MEMBER;
            case "ADMIN":
                return ADMIN;
            default:
                return null;
        }
    }
}
