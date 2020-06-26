import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {auth, User} from 'firebase';
import {Observable, Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument,} from '@angular/fire/firestore';
import {BasicUser, UserType} from '../models/Model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
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
    return this._currentUser !== undefined && this._currentUser !== null;
  }

  // tslint:disable-next-line:variable-name
  private _isProcessing = false;

  public get isProcessing(): boolean {
    return this._isProcessing;
  }

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userObservable = firebaseAuth.user;
    this.userObservable.subscribe(async (user) => {
      if (user === null) {
        return;
      }
      this.currentUserDoc = firestore
        .collection('users')
        .doc<BasicUser>(user.uid);
      await this.handleUserInfo(user);
    });
  }

  public signInWithGoogleAccount(): Promise<void> {
    this._isProcessing = true;
    return this.firebaseAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((user) => {
        this.currentUserDoc = this.firestore
          .collection('users')
          .doc<BasicUser>(user.user.uid);
        return user.user;
      })
      .then()
      .then((u) => this.handleUserInfo(u))
      .then((_) => {
        this._isProcessing = false;
      })
      .catch((_) => {
        this._isProcessing = false;
      });
  }

  private async handleUserInfo(user: User): Promise<void> {
    const data = await this.currentUserDoc.get().toPromise();

    if (!data.exists) {
      const {uid, displayName, photoURL, phoneNumber, email} = user;
      this._currentUser = {
        userId: uid,
        displayName,
        photoURL,
        email,
        phoneNumber,
        type: UserType.GUEST,
        address: '',
        citizenId: '',
        createdAt: Timestamp.now(),
      } as BasicUser;
      await this.currentUserDoc.set(this._currentUser);
    } else {
      this._currentUser = data.data() as BasicUser;
      this._currentUser.userId = data.id;
    }
    this.userSubscription = this.currentUserDoc
      .valueChanges()
      .subscribe((value) => {
        this._currentUser = value as BasicUser;
        this.router.navigate(['dashboard']).then(_ => {
        });
        this.snackBar.open('Your role was changed', 'Close', {
          duration: 5000
        });
      });
  }

  signOut() {
    this.firebaseAuth.signOut().then(() => {
      this._currentUser = null;
      this.currentUserDoc = null;
      this.userSubscription?.unsubscribe();
      this.userSubscription = null;
      this.router.navigate(['dashboard']).then((_) => {
      });
    });
  }

  public signIn(email: string, password: string): Promise<boolean> {
    this._isProcessing = true;
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.user === undefined) {
          throw new Error('User not found!');
        }
        this.currentUserDoc = this.firestore
          .collection('users')
          .doc<BasicUser>(user.user.uid);
        return this.handleUserInfo(user.user);
      })
      .then((_) => true)
      .catch((_) => false)
      .finally(() => {
        this._isProcessing = false;
      });
  }

  public signUp(
    email: string,
    password: string,
    displayName: string = ''
  ): Promise<boolean> {
    this._isProcessing = true;
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.user === undefined) {
          throw new Error('User not found!');
        }
        this.currentUserDoc = this.firestore
          .collection('users')
          .doc<BasicUser>(user.user.uid);
        return this.currentUserDoc.get().toPromise();
      })
      .then((v) => {
        if (!v.exists) {
          this._currentUser = {
            userId: v.id,
            displayName,
            photoURL: '',
            email,
            phoneNumber: '',
            type: UserType.GUEST,
            address: '',
            citizenId: '',
            createdAt: Timestamp.now(),
          } as BasicUser;
          return this.currentUserDoc.set(this.currentUser);
        } else {
          this._currentUser = v.data() as BasicUser;
          this._currentUser.userId = v.id;
        }
      })
      .then((_) => true)
      .catch((_) => {
        this.snackBar.open(
          'Fail to sign up due to invalid user info! Please try again.',
          'Close',
          {
            duration: 5000,
          }
        );
        return false;
      })
      .finally(() => {
        this._isProcessing = false;
      });
  }

  public update(newInfo: BasicUser): void {
    this._isProcessing = true;
    let req = {
      displayName: newInfo.displayName ?? '',
      description: newInfo.description ?? '',
      photoURL: newInfo.photoURL ?? '',
      phoneNumber: newInfo.phoneNumber ?? '',
      address: newInfo.address ?? '',
      citizenId: newInfo.citizenId ?? '',
      email: newInfo.email ?? '',
      gender: newInfo.gender,
    };
    this.firestore
      .collection('users')
      .doc(this._currentUser.userId)
      .update(req)
      .then((_) => {
        this._currentUser.displayName = newInfo.displayName;
        this._currentUser.description = newInfo.description;
        this._currentUser.photoURL = newInfo.photoURL;
        this._currentUser.phoneNumber = newInfo.phoneNumber;
        this._currentUser.address = newInfo.address;
        this._currentUser.citizenId = newInfo.citizenId;
        this._currentUser.email = newInfo.email;
        this._currentUser.gender = newInfo.gender;

        this._isProcessing = false;
        this.snackBar.open('Update successfully!', 'Close', {
          duration: 5000,
        });
      })
      .catch((_) => {
        this._isProcessing = false;
        this.snackBar.open('Update failed! Please try again.', 'Close', {
          duration: 5000,
        });
      });
  }

  public isCurrentUserMatch(type: UserType) {
    return this.currentUser?.type === type;
  }
}
