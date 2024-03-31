export interface User {
  UserID: number;
  Username: string;
  Password: string;
  Email: string;
  DateOfBirth: Date;
}

export interface ISignIn {
  email: string;
  password: string;
}
export interface IRegister {
  email: string;
  password: string;
  dob: Date;
  username: string;
}
