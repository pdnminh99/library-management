package com.frontend.athene.book;

import com.google.cloud.Timestamp;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class BookService {

    private final BookRepository repository;

    private List<Book> books = Lists.newArrayList();

    private void flush() {
        books = Lists.newArrayList();
        repository.flush();
    }

    @Autowired
    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public List<BasicBook> getAll() throws ExecutionException, InterruptedException {
        return repository.getAll();
    }

    public Book get(String bookId) throws ExecutionException, InterruptedException {
        return repository.get(bookId);
    }

    public Book create(Book book) throws ExecutionException, InterruptedException {
        books.add(book);
        validateBookInfo();

        repository.create(book.getAuthor());
        repository.create(book.getGenre());
        if (book.getPublisherDisplay() != null && book.getPublisherDisplay().trim().length() > 0) {
            repository.create(book.getPublisher());
        }
        book.setCreatedAt(Timestamp.now());
        repository.create(book);
        repository.commit();
        flush();
        return book;
    }

    private void validateBookInfo() {
        Book book = books.get(0);
        Integer count = book.getCount();

        if (count == null) {
            book.setCount(0);
        }
        if (book.getTitle() == null || book.getTitle().trim().length() == 0) {
            books.clear();
            throw new IllegalArgumentException("Title cannot be empty.");
        }
        if (book.getAuthorDisplay() == null || book.getAuthorDisplay().trim().length() == 0) {
            books.clear();
            throw new IllegalArgumentException("Author cannot be empty.");
        }
        if (book.getGenreDisplay() == null || book.getGenreDisplay().trim().length() == 0) {
            books.clear();
            throw new IllegalArgumentException("Genre cannot be empty.");
        }
        if (book.getCreator() == null || book.getCreator().getUserId().trim().length() == 0) {
            books.clear();
            throw new IllegalArgumentException("Invoker not found.");
        }
    }
}