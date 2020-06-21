package com.frontend.athene.book;

import com.google.cloud.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.zip.CRC32;

@Service
public class BookService {

    private final BookRepository repository;

    @Autowired
    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public Book create(String userId, Book book) throws ExecutionException, InterruptedException {
        validateBookInfo(book);

        User user = repository.getUser(userId);
        if (user == null) {
            throw new IllegalArgumentException("User with id [" + userId + "] not found.");
        }
        if (!user.getType().equals("ADMIN")) {
            throw new IllegalArgumentException("user with id [" + userId + "] does not have permission to create.");
        }
        book.setCreator(user);
        book.setBookId(getNewBookId(book.getPrefixId()));
        repository.create(book);
        repository.commit();
        return book;
    }

    private String getNewBookId(String prefix) throws ExecutionException, InterruptedException {
        boolean isCorrect = false;
        var crc = new CRC32();
        String bookId = "";
        long currentMillis;

        while (!isCorrect) {
            currentMillis = System.currentTimeMillis();
            crc.update(longToBytes(currentMillis));
            bookId = Long.toHexString(crc.getValue());
            if (bookId.length() == 7) {
                bookId = "0" + bookId;
            }
            bookId = prefix.trim().toUpperCase() + "-" + bookId;

            isCorrect = !repository.isIdExist(bookId);
        }
        return bookId;
    }

    private byte[] longToBytes(long x) {
        var buffer = ByteBuffer.allocate(Long.BYTES);
        buffer.putLong(x);
        return buffer.array();
    }

    private void validateBookInfo(Book book) {
        Integer count = book.getCount();
        String prefixId = book.getPrefixId();

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
        if (prefixId == null || prefixId.trim().length() < 2 || prefixId.length() > 3) {
            throw new IllegalArgumentException("Invalid book prefix.");
        }
        if (book.getYearOfPublishing() != null && book.getYearOfPublishing() < 1) {
            throw new IllegalArgumentException("Invalid year of publishing.");
        }
    }

    public void validateMutationInfo(String bookId, String userId) throws ExecutionException, InterruptedException {
        if (bookId == null || bookId.trim().length() == 0) {
            throw new IllegalArgumentException("BookId cannot be empty.");
        }
        Book book = repository.get(bookId);
        if (book == null) {
            throw new IllegalArgumentException("Book with id [" + bookId + "] not found.");
        }
        User user = repository.getUser(userId);
        if (user == null) {
            throw new IllegalArgumentException("User with id [" + userId + "] not found.");
        }
        if (!user.getType().equals("ADMIN")) {
            throw new IllegalArgumentException("User with id [" + userId + "] does not have permission to delete this book.");
        }
    }

    public void delete(String bookId, String userId) throws ExecutionException, InterruptedException {
        validateMutationInfo(bookId, userId);
        repository.delete(bookId);
    }

    public void patch(String userId, Book book) throws ExecutionException, InterruptedException {
        validateMutationInfo(book.getBookId(), userId);
        repository.update(book);
    }
}