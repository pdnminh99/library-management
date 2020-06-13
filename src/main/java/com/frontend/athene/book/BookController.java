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

    @GetMapping("{bookId}")
    @CrossOrigin
    public ResponseEntity<Book> get(@PathVariable String bookId) throws ExecutionException, InterruptedException {
        Book book = service.get(bookId);
        return Optional.of(book)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    @CrossOrigin
    public List<BasicBook> get() throws ExecutionException, InterruptedException {
        return service.getAll();
    }

    @PostMapping
    public Book create(@RequestBody Book book) throws ExecutionException, InterruptedException {
        return service.create(book);
    }

    @DeleteMapping("{bookId}")
    public void delete(@PathVariable String bookId) {
    }

    @PatchMapping
    public Book patch(@RequestBody Book book) {
        return null;
    }

    @ExceptionHandler({ IllegalArgumentException.class })
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public String handleIllegalArgsExc(IllegalArgumentException exception) {
        return exception.getMessage();
    }
}
