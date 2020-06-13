

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
  photoUrl: string;
  creator: BasicUser;
}

export interface BasicUser {
  userId: string;
  displayName: string;
  photoUrl: string;
  email: string;
}
