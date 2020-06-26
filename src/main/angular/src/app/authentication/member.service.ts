import {Injectable} from '@angular/core';
import {
  BasicUser,
  EntityService,
  Filter,
  ToolbarMode,
  UserType,
} from '../models/Model';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MemberService implements EntityService<BasicUser> {
  public get isActive(): boolean {
    return this.selectedItem !== undefined;
  }

  constructor(
    public firestore: AngularFirestore,
    private snackBar: MatSnackBar
  ) {
    this.observer = this.firestore
      .collection<BasicUser>('users', (ref) => ref.orderBy('createdAt'))
      .snapshotChanges()
      .pipe(map((docs) => docs.map((d) => d.payload.doc)));
    this.observer.subscribe((v) => {
      this._items = v
        .map((a) => a.data())
        .map(
          (a) =>
            new BasicUser(
              a.userId,
              a.displayName,
              a.photoURL,
              a.email,
              a.phoneNumber,
              a.type,
              a.address,
              a.citizenId,
              a.description,
              a.gender,
              a.createdAt
            )
        );
    });
  }

  public get items(): BasicUser[] {
    if (this.currentKey.length === 0) {
      return this._items
        .filter((value) =>
          MemberService.filterByFilterMethod(
            this.selectedFilter.filterId,
            value
          )
        )
        .slice(
          this.pageNumber * this.pageSize > 0
            ? this.pageNumber * this.pageSize - 1
            : 0,
          this.pageSize
        )
        .map(b => {
          b.isActive = b.userId === this.selectedItem?.userId;
          return b;
        });
    }
    return this._items
      .filter((i) => this.filterByKey(this.currentKey, i))
      .filter((i) =>
        MemberService.filterByFilterMethod(this.selectedFilter.filterId, i)
      )
      .slice(
        this.pageNumber * this.pageSize > 0
          ? this.pageNumber * this.pageSize - 1
          : 0,
        this.pageSize
      )
      .map(b => {
        b.isActive = b.userId === this.selectedItem?.userId;
        return b;
      });
  }

  public get len(): number {
    return this._items?.length ?? 0;
  }

  pageNumber = 0;

  pageSize = 10;

  // tslint:disable-next-line:variable-name
  private _items: BasicUser[] = [];

  selectedItem: BasicUser;

  private currentKey = '';

  public mode: ToolbarMode = ToolbarMode.STATIC;

  private observer: Observable<QueryDocumentSnapshot<BasicUser>[]>;

  public isProcessing = false;

  filters: Filter[] = [
    {
      filterId: 0,
      description: 'All',
      icon: undefined,
    },
    {
      filterId: 1,
      description: 'Admins',
      icon: 'support_agent',
    },
    {
      filterId: 2,
      description: 'Members',
      icon: 'people',
    },
    {
      filterId: 3,
      description: 'Guests',
      icon: undefined,
    },
  ];

  public selectedFilter: Filter = this.filters[0];

  private static filterByFilterMethod(index: number, value: BasicUser) {
    switch (index) {
      case 1:
        return value.type === UserType.ADMIN;
      case 2:
        return value.type === UserType.MEMBER;
      case 3:
        return value.type === UserType.GUEST;
      case 0:
      default:
        return true;
    }
  }

  public filterByKey(key: string, item: BasicUser): boolean {
    key = key.toLowerCase();

    return (
      item.displayName?.toLowerCase().includes(key) ||
      item.gender?.toLowerCase().includes(key) ||
      item.email?.toLowerCase().includes(key) ||
      item.citizenId?.toLowerCase().includes(key) ||
      item.phoneNumber?.toLowerCase().includes(key) ||
      item.address?.toLowerCase().includes(key)
    );
  }

  pageTurn(page: number): void {
    this.pageNumber = page;
  }

  getAll(): void {
  }

  get(id: string): void {
    for (const book of this.items) {
      if (book.userId === id) {
        this.selectedItem = book;
        return;
      }
    }
    this.firestore
      .collection<BasicUser>('users')
      .doc(id)
      .get()
      .subscribe((value) => {
        this.selectedItem = value.data() as BasicUser;
      });
  }

  delete(): void {
  }

  update(patch: BasicUser): void {
    this.isProcessing = true;
    const req = {
      displayName: patch.displayName,
      description: patch.description,
      photoURL: patch.photoURL,
      phoneNumber: patch.phoneNumber,
      address: patch.address,
      citizenId: patch.citizenId,
      email: patch.email,
      gender: patch.gender,
      type: patch.type,
    };
    console.log(req);
    this.firestore
      .collection('users')
      .doc(this.selectedItem.userId)
      .update(req)
      .then((_) => {
        this.selectedItem.displayName = patch.displayName;
        this.selectedItem.description = patch.description;
        this.selectedItem.photoURL = patch.photoURL;
        this.selectedItem.phoneNumber = patch.phoneNumber;
        this.selectedItem.address = patch.address;
        this.selectedItem.citizenId = patch.citizenId;
        this.selectedItem.email = patch.email;
        this.selectedItem.gender = patch.gender;
        this.selectedItem.type = patch.type;

        this.isProcessing = false;
        this.snackBar.open('Update successfully!', 'Close', {
          duration: 5000,
        });
      })
      .catch((_) => {
        this.isProcessing = false;
        this.snackBar.open('Update failed! Please try again.', 'Close', {
          duration: 5000,
        });
      });
  }

  create(instance: BasicUser): void {
  }

  onSearch(key: string): void {
    this.currentKey = key;
  }

  apply(filter: Filter): void {
    this.selectedFilter = filter;
  }
}
