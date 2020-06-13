package com.frontend.athene.book;

public enum MetadataType {
    GENRE("GENRE"),
    AUTHOR("AUTHOR"),
    PUBLISHER("PUBLISHER");

    private final String type;

    MetadataType(String type) {
        this.type = type;
    }

    public static MetadataType fromText(String text) {
        if (text == null) {
            return null;
        }
        switch (text) {
            case "GENRE":
                return GENRE;
            case "AUTHOR":
                return AUTHOR;
            case "PUBLISHER":
                return PUBLISHER;
            default:
                return null;
        }
    }
}
