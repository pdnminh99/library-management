import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {auth, User} from 'firebase';
import {isNullOrUndefined} from 'util';
import {Observable, Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {BasicUser, UserType} from '../models/Model';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserDoc: AngularFirestoreDocument;

  private userObservable: Observable<any>;

  private userSubscription: Subscription;

  // tslint:disable-next-line:variable-name
  private _currentUser?: BasicUser;

  public get currentUser(): BasicUser {
    return this._currentUser;
  }

  public get isLoggedIn(): boolean {
    return !isNullOrUndefined(this._currentUser);
  }

  // tslint:disable-next-line:variable-name
  private _isProcessing = false;

  public get isProcessing(): boolean {
    return this._isProcessing;
  }

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.userObservable = firebaseAuth.user;
    this.userObservable.subscribe(async (user) => {
      if (user == null) {
        return;
      }
      this.currentUserDoc = firestore.collection('users')
        .doc<BasicUser>(user.uid);
      await this.handleUserInfo(user);
    });
  }

  public signIn(): void {
    this.firebaseAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        this.currentUserDoc = this.firestore.collection('users')
          .doc<BasicUser>(user.user.uid);
        return user.user;
      })
      .then(this.handleUserInfo)
      .then(_ => console.log('User login successfully!'));
  }

  private async handleUserInfo(user: User): Promise<void> {
    const data = await this.currentUserDoc
      .get()
      .toPromise();

    if (!data.exists) {
      const {uid, displayName, photoURL, phoneNumber, email} = user;
      this._currentUser = new BasicUser(
        uid, displayName, photoURL, email, phoneNumber, UserType.GUEST, null, null, Timestamp.now()
      );
      await this.currentUserDoc.set(this._currentUser);
    } else {
      this._currentUser = data.data() as BasicUser;
    }
    this.userSubscription = this.currentUserDoc.valueChanges()
      .subscribe(value => {
        this._currentUser = value as BasicUser;
      });
  }

  signOut() {
    this.firebaseAuth.signOut().then(() => {
      this._currentUser = null;
      this.currentUserDoc = null;
      this.userSubscription?.unsubscribe();
      this.userSubscription = null;
    });
  }

  // public signIn(
  //   email: string,
  //   password: string,
  //   onSuccess?: (user: User) => void,
  //   onError?: (reason: string) => void
  // ): void {
  //   this._isProcessing = true;
  //   this.firebaseAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       if (isNullOrUndefined(user.user)) {
  //         throw new Error("User not found.");
  //       }
  //       onSuccess(user.user);
  //       this._currentUser = user.user;
  //       return user.user;
  //     })
  //     .catch((err) => {
  //       onError(err);
  //     })
  //     .finally(() => {
  //       this._isProcessing = false;
  //     });
  // }

  // public signUp(email: string, password: string): void {
  //   this.firebaseAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       this.currentUser = user.user;
  //     });
  // }

  // public logout(): void {
  //   this.firebaseAuth.signOut().then(() => {
  //     router
  //   });
  // }
}
