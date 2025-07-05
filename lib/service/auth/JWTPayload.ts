export interface JwtPayload {
    sub: string;
    ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: string;
    email: string;
    uid: string;
    exp: number;
    iss: string;
    aud: string;
}