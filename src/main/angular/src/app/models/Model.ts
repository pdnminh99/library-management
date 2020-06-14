import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface SideNavigation {
  id: number;
  navigation: string;
  icon: string;
  isActive: boolean;
}

export interface BasicBook {
  bookId: string;
  title: string;
  author: string;
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

export interface BasicUser {
  userId: string;
  displayName: string;
  photoURL: string;
  email: string;
  phoneNumber: string;
  type: UserType;
  address: string;
  citizenId: string;
  createdAt: Timestamp;
}

export enum UserType {
  GUEST = 'GUEST', ADMIN = 'ADMIN', MEMBER = 'MEMBER'
}
