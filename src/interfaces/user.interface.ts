export interface PagiUser<T> {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords: null;
  data: T;
}

export interface UserItem {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: null | string;
  birthday: string;
  avatar: null;
  gender: boolean;
  role: string;
}

export interface UserItemAdd {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
}

export interface UserItemEdit {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
}