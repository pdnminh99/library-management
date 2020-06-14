package com.frontend.athene.book;

import com.frontend.athene.user.User;
import com.google.api.core.ApiFuture;
import com.google.api.core.ApiFutures;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
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

    public void create(String name, MetadataType type) throws ExecutionException, InterruptedException {
        if (name == null || type == null) {
            return;
        }
        List<QueryDocumentSnapshot> docs = metadataCollection
                .whereEqualTo("type", type.toString())
                .whereEqualTo("name", name)
                .get()
                .get()
                .getDocuments();
        Metadata metadata;
        if (docs.size() == 0) {
            metadata = new Metadata(name, 1, type, Timestamp.now());
            metadataCollection.add(metadata);
            return;
        }
        metadata = docs.get(0).toObject(Metadata.class);
        int count = metadata.getCount();
        count += 1;
        metadataCollection.document(metadata.getMetadataId())
                .update("count", count);
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

    public List<Metadata> getMetadata(List<String> name, MetadataType type) throws ExecutionException, InterruptedException {
        return metadataCollection.whereEqualTo("type", type.toString())
                .whereIn("name", name)
                .get()
                .get()
                .getDocuments()
                .stream()
                .map(m -> m.toObject(Metadata.class))
                .collect(Collectors.toList());
    }

    public User getUser(String userId) throws ExecutionException, InterruptedException {
        return usersCollection.document(userId)
                .get()
                .get()
                .toObject(User.class);
    }
}
