export interface BaseUserApi<T> {
  user: T;
  token: string;
}
export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: null;
  birthday: string;
  avatar: null;
  gender: boolean;
  role: string;
}
