export interface UserAuth {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: number;
  iat?: number;
  exp?: number;
}