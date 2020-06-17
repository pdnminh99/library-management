package com.frontend.athene.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("api/v1/book")
public class BookController {

    private final BookService service;

    @Autowired
    public BookController(BookService service) {
        this.service = service;
    }

    @PostMapping("{userId}")
    @CrossOrigin
    public Book create(@PathVariable String userId, @RequestBody Book book) throws ExecutionException, InterruptedException {
        return service.create(userId, book);
    }

    @CrossOrigin
    @ResponseStatus(HttpStatus.ACCEPTED)
    @DeleteMapping("{bookId}/{userId}")
    public void delete(@PathVariable String bookId, @PathVariable String userId) throws ExecutionException, InterruptedException {
        service.delete(bookId, userId);
    }

    @CrossOrigin
    @PatchMapping("{userId}")
    public void patch(@PathVariable String userId, @RequestBody Book book) throws ExecutionException, InterruptedException {
        service.patch(userId, book);
    }

    @CrossOrigin
    @ExceptionHandler({IllegalArgumentException.class})
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public String handleIllegalArgsExc(IllegalArgumentException exception) {
        return exception.getMessage();
    }
}
