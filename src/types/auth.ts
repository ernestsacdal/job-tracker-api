export interface RegisterInput {
    email: string;
    password: string;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface PublicUser {
    id: number;
    email: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: PublicUser;
    message?: string;
  }
  