export interface CustomerJwtDto{
    cardId: string;
    fullname: string;
    numberCellPhone: number;
    email: string;
    iat: number;
    exp: number;
    rol: string;
}