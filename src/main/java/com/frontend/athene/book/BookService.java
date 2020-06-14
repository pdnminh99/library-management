package com.frontend.athene.book;

import com.frontend.athene.user.User;
import com.google.cloud.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class BookService {

    private final BookRepository repository;

    @Autowired
    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public List<BasicBook> getAll() throws ExecutionException, InterruptedException {
        return repository.getAll();
    }

    public Book get(String bookId) throws ExecutionException, InterruptedException {
        Book book = repository.get(bookId);
        User creator = repository.getUser(book.getCreator().getUserId());
        if (creator != null) {
            System.out.println(creator.toString());
            book.setCreator(creator);
        }
        return book;
    }

    public Book create(Book book) throws ExecutionException, InterruptedException {
        validateBookInfo(book);

        User user = repository.getUser(book.getCreatorId());
        if (user != null) {
            book.setCreator(user);
        }
        repository.create(book.getAuthor(), MetadataType.AUTHOR);
        repository.create(book.getGenre(), MetadataType.GENRE);
        if (book.getPublisher() != null && book.getPublisher().trim().length() > 0) {
            repository.create(book.getPublisher(), MetadataType.AUTHOR);
        }
        book.setCreatedAt(Timestamp.now());
        repository.create(book);
        repository.commit();
        return book;
    }

    private void validateBookInfo(Book book) {
        Integer count = book.getCount();

        if (count == null || count < 0) {
            book.setCount(0);
        }
        if (book.getTitle() == null || book.getTitle().trim().length() == 0) {
            throw new IllegalArgumentException("Title cannot be empty.");
        }
        if (book.getAuthor() == null || book.getAuthor().trim().length() == 0) {
            throw new IllegalArgumentException("Author cannot be empty.");
        }
        if (book.getGenre() == null || book.getGenre().trim().length() == 0) {
            throw new IllegalArgumentException("Genre cannot be empty.");
        }
        if (book.getCreator() == null || book.getCreator().getUserId().trim().length() == 0) {
            throw new IllegalArgumentException("Invoker not found.");
        }
    }

    public void delete(String bookId, String userId) {

    }
}