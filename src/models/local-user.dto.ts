import { User } from "./user.dto";

export interface LocalUser {
  token: string;
  user: User;
}