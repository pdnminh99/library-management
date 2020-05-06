import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { User } from "firebase";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public currentUser: User;

  constructor(private router: Router, public firebaseAuth: AngularFireAuth) {}

  public login(email: string, password: string): void {
    var provider = new auth.GoogleAuthProvider();
  }

  public logout(): void {
    this.firebaseAuth.signOut();
  }
}
