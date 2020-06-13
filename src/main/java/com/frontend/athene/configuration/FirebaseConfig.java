package com.frontend.athene.configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Scope;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.Optional;

@Configuration
public class FirebaseConfig {

    private Firestore firestore;

    private final boolean isDeploymentEnvironment = Boolean.parseBoolean(System.getenv("envi"));

    @Bean("firebase")
    public void initializeFirebaseApp() throws IOException {
        if (!FirebaseApp.getApps().isEmpty()) {
            return;
        }

        FirebaseOptions options;
        var env = System.getenv("GOOGLE_CLOUD_PROJECT");

        if (env != null) {
            options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.getApplicationDefault())
                    .build();
        } else {
            String pathToCredential = Paths.get(".").toAbsolutePath().normalize().toString() + "//key.json";
            InputStream credentialFile = new FileInputStream(pathToCredential);
            GoogleCredentials credentials = GoogleCredentials.fromStream(credentialFile);

            options = new FirebaseOptions.Builder()
                    .setCredentials(credentials)
                    .build();
        }
        FirebaseApp.initializeApp(options);
    }

    @Bean("firestore")
    @DependsOn("firebase")
    public Firestore getFirestore() {
        firestore = FirestoreClient.getFirestore();
        return firestore;
    }

    @Bean("booksCollection")
    @DependsOn("firestore")
    @Scope("singleton")
    public CollectionReference getBooksCollection() throws Exception {
        return Optional.ofNullable(firestore)
                .map(db -> db.collection(isDeploymentEnvironment ? "books" : "books_dev"))
                .orElseThrow(Exception::new);
    }

    @Bean("metadataCollection")
    @DependsOn("firestore")
    @Scope("singleton")
    public CollectionReference getMetadataCollection() throws Exception {
        return Optional.ofNullable(firestore)
                .map(db -> db.collection(isDeploymentEnvironment ? "metadata" : "metadata_dev"))
                .orElseThrow(Exception::new);
    }
}
