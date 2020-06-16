import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface SideNavigation {
  id: number;
  navigation: string;
  icon: string;
  isActive: boolean;
}

export enum Gender { MALE = 'MALE', FEMALE = 'FEMALE', OTHER = 'OTHER'}

export class Book implements Displayable {
  constructor(
    public bookId: string,
    public title: string,
    public author: string,
    public description: string,
    public genre: string,
    public publisher: string,
    public yearOfPublishing: number,
    public count: number,
    public photoURL: string,
    public createdAt: Timestamp,
    public creator: string,
    public creatorInstance: BasicUser) {
  }

  public get navigate(): string {
    return this.bookId;
  }

  public get status(): Status {
    if (this.count === 0) {
      return {
        icon: 'warning',
        color: DisplayColor.WARN
      };
    }
    if (this.count < 10) {
      return {
        icon: 'priority_high',
        color: DisplayColor.PRIMARY
      };
    }
    return {
      icon: undefined,
      color: DisplayColor.NORMAL
    };
  }
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
    public gender: Gender,
    public createdAt: Timestamp) {
  }

  public get status(): Status {
    switch (this.type) {
      case UserType.ADMIN:
        return {
          icon: 'support_agent',
          color: DisplayColor.WARN
        };
      case UserType.MEMBER:
        return {
          icon: 'people',
          color: DisplayColor.PRIMARY
        };
      case UserType.GUEST:
      default:
        return {
          icon: undefined,
          color: DisplayColor.NORMAL
        };
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
  status: Status;
  navigate: string;
}

export class Loan implements Displayable {

  constructor(public loanId: string,
              public title: string,
              public description: string,
              public isReturned: boolean,
              public createdAt: Timestamp) {
  }

  public get status(): Status {
    return {
      icon: undefined,
      color: DisplayColor.NORMAL
    };
  }

  public get navigate(): string {
    return this.loanId;
  }

}

export enum ToolbarMode {
  CREATE, EDIT, STATIC
}

export interface EntityService<T extends Displayable> {
  items: T[];
  selectedItem: T;
  len: number;

  isActive: boolean;
  isProcessing: boolean;

  mode: ToolbarMode;

  filters: Filter[];
  selectedFilter: Filter;

  pageSize: number;
  pageNumber: number;

  getAll(): void;

  get(id: string): void;

  create(instance: T): void;

  delete(): void;

  update(patch: T): void;

  onSearch(key: string): void;

  apply(filter: Filter): void;

  pageTurn(page: number): void;
}

export enum MetadataType {
  AUTHOR = 'AUTHOR',
  GENRE = 'GENRE',
  PUBLISHER = 'PUBLISHER'
}

export interface Metadata {
  name: string;
  type: MetadataType;
  createdAt: Timestamp;
  count: number;
}

export interface Filter {
  filterId: number;
  description: string;
  icon: string;
}

export interface Status {
  icon: string;
  color: DisplayColor;
}
