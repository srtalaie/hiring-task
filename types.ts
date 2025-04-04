export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string[];
  summary: string;
  owner: User;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  bookCollection: Book[];
}

export interface Credentials {
  username: string;
  password: string;
}

export interface BookCollectionState {
  bookCollection: Book[];
}