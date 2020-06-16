import {Injectable} from '@angular/core';
import {BasicUser, EntityService, ToolbarMode} from '../models/Model';
import {AngularFirestore, QueryDocumentSnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MemberService implements EntityService<BasicUser, BasicUser> {

  public get isActive(): boolean {
    return this.selectedItem !== undefined;
  }

  constructor(public firebase: AngularFirestore) {
    this.observer = this.firebase.collection<BasicUser>('users',
      ref => ref
        .limit(10)
        .orderBy('createdAt'))
      .snapshotChanges()
      .pipe(
        map(docs => docs.map(d => d.payload.doc))
      );
    this.observer.subscribe(v => {
      this.membersSnapshots = v;
      this.items = v
        .map(a => a.data())
        .map(a => new BasicUser(
          a.userId,
          a.displayName,
          a.photoURL,
          a.email,
          a.phoneNumber,
          a.type,
          a.address,
          a.citizenId,
          a.createdAt));
    });
  }

  items: BasicUser[];

  selectedItem: BasicUser;

  public mode: ToolbarMode = ToolbarMode.STATIC;

  private membersSnapshots: QueryDocumentSnapshot<BasicUser>[];

  private observer: Observable<QueryDocumentSnapshot<BasicUser>[]>;

  public isProcessing = false;

  getAll(): void {
  }

  get(id: string): void {
  }

  refresh(): void {
  }

  delete(): void {
  }

  update(patch: BasicUser): void {
  }
}
