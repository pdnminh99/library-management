import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth/auth";
import { AngularFireDatabase } from "@angular/fire/database/database";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}
}
