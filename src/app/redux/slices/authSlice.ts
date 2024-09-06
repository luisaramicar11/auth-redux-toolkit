import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IUser, IAuthState} from "../../interfaces/authInterfaces";

// Estado inicial

const initialState: IAuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

//Acciones asincronas
// Accion asincrona de login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: {email: string, password: string}, {rejectWithValue}) => {
        try{
            const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", credentials);
            return response.data
        }catch(err){
            return rejectWithValue(err);
        }
    }
)

// Accion asincrona de register

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (newUser: {name: string, email: string, password: string, avatar: string}, {rejectWithValue}) => {
        try{
            const response = await axios.post("https://api.escuelajs.co/api/v1/users", newUser);
            return response.data
        }catch(err){
            return rejectWithValue(err);
        }
    }
)

// Slice de Redux Toolkit

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutState: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>)=>{
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(registerUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.user = action.payload;
        state.error =null;
        state.isAuthenticated = true;
    })
    .addCase(registerUser.rejected,( state, action: PayloadAction<any>)=>{
        state.error = action.payload
        state.loading = false;
    })
}
})

export const {logoutState} = authSlice.actions;

export default authSlice.reducer;