export default interface Ipayload{
  exp: number;
  iat: number;
  sub: Isub;
}

export interface Isub{
  userId: number;
  userEmail: string;
}