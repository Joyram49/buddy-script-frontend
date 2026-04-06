import { JwtPayload } from "jwt-decode";

export interface User {
  id: string;
  email: string;
  role?: string;
  name?: string;
  avatarUrl?: string;
}

export interface AuthSession {
  accessToken: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IJwtUser extends JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export interface IMyProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
  profession?: string;
  createdAt: string;
  updatedAt: string;
}
