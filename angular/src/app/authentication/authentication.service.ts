import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User, auth } from "firebase";
import { isNullOrUndefined } from "util";
import { Observable, Subscription } from "rxjs";

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
    console.log(this._currentUser);
    return !isNullOrUndefined(this._currentUser);
  }

  private _isProcessing = false;

  public get isProcessing(): boolean {
    return this._isProcessing;
  }

  constructor(private firebaseAuth: AngularFireAuth) {
    this.userObservable = firebaseAuth.user;
    // this.userSubscription = this.userObservable.subscribe({
    //   next: (user: User) => {
    //     this._currentUser = user;
    //   },
    //   error: console.log,
    //   complete: () => console.log("Completed."),
    // });
  }

  public signIn(): void {
    this.firebaseAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((user) => {
        this._currentUser = user.user;
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
