export interface JwtPayload {
    sub: string;
    email: string;
    ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: string;
    UserId: string;
    ParentId: string;
    exp: number;
    iss: string;
    aud: string;
}