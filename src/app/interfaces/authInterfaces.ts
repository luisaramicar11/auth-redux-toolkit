export interface IUser {
    id:number;
    name:string;
    password:string;
    token:string;
}

export interface IAuthState {
    user: IUser | null;
    isAuthenticated:boolean;
    loading:boolean;
    error: string | null; 
}
