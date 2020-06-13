import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User, auth } from "firebase";
import { isNullOrUndefined } from "util";
import { Observable, Subscription } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private userObservable: Observable<User>;

  private userSubscription: Subscription;

  private _currentUser?: User;

  public get currentUser(): User {
    return this._currentUser;
  }

  public get isLoggedIn(): boolean {
    return !isNullOrUndefined(this._currentUser);
  }

  private _isProcessing = false;

  public get isProcessing(): boolean {
    return this._isProcessing;
  }

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.userObservable = firebaseAuth.user;
    this.userObservable.subscribe((user) => {
      this._currentUser = user;
    });
  }

  public signIn(): void {
    this.firebaseAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((user) => {
        this._currentUser = user.user;
      });
  }

  signOut() {
    this.firebaseAuth.signOut().then(() => (this._currentUser = null));
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
