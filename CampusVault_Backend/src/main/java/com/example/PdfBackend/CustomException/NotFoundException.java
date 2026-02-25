package com.example.PdfBackend.CustomException;


public class NotFoundException extends RuntimeException {
    public NotFoundException(String msg) {
        super(msg);
    }
}

