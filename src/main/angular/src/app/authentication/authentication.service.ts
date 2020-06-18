import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {auth, User} from 'firebase';
import {isNullOrUndefined} from 'util';
import {Observable, Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {BasicUser, UserType} from '../models/Model';
import Timestamp = firebase.firestore.Timestamp;
import {Router} from '@angular/router';

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
    private firestore: AngularFirestore,
    private router: Router
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

  public signInWithGoogleAccount(): Promise<void> {
    this._isProcessing = true;
    return this.firebaseAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        this.currentUserDoc = this.firestore.collection('users')
          .doc<BasicUser>(user.user.uid);
        return user.user;
      })
      .then()
      .then(u => this.handleUserInfo(u))
      .then(_ => {
        this._isProcessing = false;
      });
  }

  private async handleUserInfo(user: User): Promise<void> {
    const data = await this.currentUserDoc
      .get()
      .toPromise();

    if (!data.exists) {
      const {uid, displayName, photoURL, phoneNumber, email} = user;
      this._currentUser = {
        userId: uid,
        displayName,
        photoURL,
        email,
        phoneNumber,
        type: UserType.GUEST,
        address: null,
        citizenId: null,
        createdAt: Timestamp.now()
      } as BasicUser;
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
      this.router.navigate(['dashboard']).then(_ => {
      });
    });
  }

  public signIn(
    email: string,
    password: string
  ): Promise<boolean> {
    this._isProcessing = true;
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.user === undefined) {
          throw new Error('User not found!');
        }
        this.currentUserDoc = this.firestore.collection('users')
          .doc<BasicUser>(user.user.uid);
        return this.handleUserInfo(user.user);
      })
      .then(_ => true)
      .catch(_ => false)
      .finally(() => {
        this._isProcessing = false;
      });
  }

  public signUp(email: string, password: string, displayName: string, photoURL: string): Promise<boolean> {
    this._isProcessing = true;
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.user === undefined) {
          throw new Error('User not found!');
        }
        this.currentUserDoc = this.firestore.collection('users')
          .doc<BasicUser>(user.user.uid);
        return this.currentUserDoc.get()
          .toPromise();
      })
      .then(v => {
        if (!v.exists) {
          this._currentUser = {
            userId: v.id,
            displayName,
            photoURL,
            email,
            phoneNumber: undefined,
            type: UserType.GUEST,
            address: null,
            citizenId: null,
            createdAt: Timestamp.now()
          } as BasicUser;
          return this.currentUserDoc.set(this._currentUser);
        } else {
          this._currentUser = v.data() as BasicUser;
        }
      })
      .then(_ => true)
      .catch(_ => false)
      .finally(() => {
        this._isProcessing = false;
      });
  }

  update(newInfo: BasicUser) {
    console.log(newInfo);
    this.firestore.collection('users').doc(this._currentUser.userId)
      .update(newInfo)
      .then(_ => {
        this._currentUser = {...this._currentUser, ...newInfo} as BasicUser;
      });
  }
}
