package com.frontend.athene.book;

import com.google.api.core.ApiFuture;
import com.google.api.core.ApiFutures;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Repository
public class BookRepository {

    private final CollectionReference booksCollection;

    private final CollectionReference metadataCollection;

    private final CollectionReference usersCollection;

    private final Firestore firestore;

    private WriteBatch batch;

    @Autowired
    public BookRepository(@Qualifier("booksCollection") CollectionReference booksCollection,
                          @Qualifier("metadataCollection") CollectionReference metadataCollection,
                          @Qualifier("usersCollection") CollectionReference usersCollection,
                          Firestore firestore) {
        this.booksCollection = booksCollection;
        this.metadataCollection = metadataCollection;
        this.usersCollection = usersCollection;
        this.firestore = firestore;
    }

    private boolean isBatchActive() {
        return batch != null;
    }

    private void resetBatch() {
        batch = firestore.batch();
    }

    private String nextBookId() {
        return booksCollection.document().getId();
    }

    public void create(Book book) {
        if (!isBatchActive()) {
            resetBatch();
        }
        var now = Timestamp.now();

        book.setCreatedAt(now);
        if (book.getBookId() == null || book.getBookId().trim().length() == 0) {
            book.setBookId(nextBookId());
        }
        batch.set(booksCollection.document(book.getBookId()), book);
    }

    public void commit() {
        if (isBatchActive()) {
            batch.commit();
        }
        flush();
    }

    public void flush() {
        batch = null;
    }

    public List<BasicBook> getAll() throws ExecutionException, InterruptedException {
        List<ApiFuture<DocumentSnapshot>> futures = StreamSupport.stream(booksCollection.listDocuments().spliterator(), false)
                .map(DocumentReference::get).collect(Collectors.toList());
        return ApiFutures.allAsList(futures)
                .get()
                .stream()
                .map(m -> m.toObject(BasicBook.class))
                .collect(Collectors.toList());
    }

    public Book get(String bookId) throws ExecutionException, InterruptedException {
        return booksCollection.document(bookId)
                .get()
                .get()
                .toObject(Book.class);
    }

    public User getUser(String userId) throws ExecutionException, InterruptedException {
        return usersCollection.document(userId)
                .get()
                .get()
                .toObject(User.class);
    }

    public void delete(String bookId) {
        booksCollection.document(bookId)
                .delete();
    }

    public void update(Book book) {
        Map<String, Object> updateMap = Maps.newHashMap();
        if (book.getTitle() != null) {
            updateMap.put("title", book.getTitle());
        }
        if (book.getAuthor() != null) {
            updateMap.put("author", book.getAuthor());
        }
        if (book.getDescription() != null) {
            updateMap.put("description", book.getDescription());
        }
        if (book.getGenre() != null) {
            updateMap.put("genre", book.getGenre());
        }
        if (book.getPublisher() != null) {
            updateMap.put("publisher", book.getPublisher());
        }
        if (book.getYearOfPublishing() != null) {
            updateMap.put("yearOfPublishing", book.getYearOfPublishing());
        }
        if (book.getCount() != null) {
            updateMap.put("count", book.getCount());
        }
        if (book.getPhotoURL() != null) {
            updateMap.put("photoURL", book.getPhotoURL());
        }
        if (book.getPhotoURL() != null) {
            updateMap.put("position", book.getPosition());
        }
        booksCollection.document(book.getBookId())
                .update(updateMap);
    }

    public boolean isIdExist(String bookId) throws ExecutionException, InterruptedException {
        return booksCollection.document(bookId)
                .get()
                .get()
                .exists();
    }
}
