import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface SideNavigation {
  id: number;
  navigation: string;
  icon: string;
  isActive: boolean;
}

export class BasicBook implements Displayable {

  constructor(public bookId: string, public title: string, public author: string) {
  }

  public get color(): DisplayColor {
    return DisplayColor.NORMAL;
  }

  public get description(): string {
    return this.author;
  }

  public get navigate(): string {
    return this.bookId;
  }
}

export interface Book extends BasicBook {
  description: string;
  genre: string;
  publisher: string;
  yearOfPublishing: number;
  count: number;
  photoURL: string;
  createdAt: number;
  creator: BasicUser;
}

export class BasicUser implements Displayable {

  constructor(
    public userId: string,
    public displayName: string,
    public photoURL: string,
    public email: string,
    public phoneNumber: string,
    public type: UserType,
    public address: string,
    public citizenId: string,
    public createdAt: Timestamp) {
  }

  public get color(): DisplayColor {
    switch (this.type) {
      case UserType.ADMIN:
        return DisplayColor.WARN;
      case UserType.MEMBER:
        return DisplayColor.WARN;
      case UserType.GUEST:
      default:
        return DisplayColor.NORMAL;
    }
  }

  public get description(): string {
    return this.type.toString();
  }

  public get navigate(): string {
    return this.userId;
  }

  public get title(): string {
    return this.displayName;
  }
}

export enum UserType {
  GUEST = 'GUEST', ADMIN = 'ADMIN', MEMBER = 'MEMBER'
}

export enum DisplayColor {
  PRIMARY, WARN, NORMAL
}

export interface Displayable {
  title: string;
  description: string;
  color: DisplayColor;
  navigate: string;
}

export class Loan implements Displayable {

  constructor(public loanId: string,
              public title: string,
              public description: string,
              public isReturned: boolean,
              public createdAt: Timestamp) {
  }

  public get color(): DisplayColor {
    return this.isReturned ? DisplayColor.PRIMARY : DisplayColor.NORMAL;
  }

  public get navigate(): string {
    return this.loanId;
  }

}

export enum ToolbarMode {
  CREATE, EDIT, STATIC
}

export interface EntityService<T extends A, A extends Displayable> {
  items: A[];
  selectedItem: T;
  isActive: boolean;
  isProcessing: boolean;
  mode: ToolbarMode;

  getAll(): void;

  get(id: string): void;

  create(instance: T): void;

  refresh(): void;

  delete(): void;

  update(patch: T): void;
}

export enum MetadataType {
  AUTHOR = "AUTHOR",
  GENRE = "GENRE",
  PUBLISHER = "PUBLISHER"
}

export interface Metadata {
  name: string;
  type: MetadataType;
  createdAt: Timestamp;
  count: number;
}
