import {Injectable} from '@angular/core';
import {BasicUser, EntityService, Filter, ToolbarMode} from '../models/Model';
import {AngularFirestore, QueryDocumentSnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MemberService implements EntityService<BasicUser> {

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
          a.gender,
          a.createdAt));
    });
  }

  pageNumber = 0;

  pageSize = 10;

  items: BasicUser[];

  selectedItem: BasicUser;

  public mode: ToolbarMode = ToolbarMode.STATIC;

  private observer: Observable<QueryDocumentSnapshot<BasicUser>[]>;

  public isProcessing = false;

  filters: Filter[] = [{
    filterId: 0,
    description: 'All',
    icon: undefined
  }, {
    filterId: 1,
    description: 'Admins',
    icon: 'support_agent'
  }, {
    filterId: 2,
    description: 'Members',
    icon: 'people'
  }, {
    filterId: 3,
    description: 'Guests',
    icon: undefined
  }];

  selectedFilter: Filter;

  public get len(): number {
    return this.items?.length ?? 0;
  }

  pageTurn(page: number): void {
  }

  getAll(): void {
  }

  get(id: string): void {
  }

  delete(): void {
  }

  update(patch: BasicUser): void {
  }

  create(instance: BasicUser): void {
  }

  onSearch(key: string): void {
  }

  apply(filter: Filter): void {
  }
}
