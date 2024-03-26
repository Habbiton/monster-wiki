export interface JWTPayload {
  username: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
}
