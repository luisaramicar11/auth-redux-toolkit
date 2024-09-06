"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../redux/slices/authSlice"
import { AppDispatch, RootState } from "../../redux/store";
import {toast} from "react-toastify"

export default function LoginPage(){
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {error, loading} = useSelector((state:RootState)=>state.auth)

    const[form, setForm] = useState({
        email:"",
        password:"",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.email || !form.password ){
            toast.error("Por favor, completa todos los campos")
            return
        }

        const {email, password} = form

        const resultAction = await dispatch(loginUser({email, password}))

        if(loginUser.fulfilled.match(resultAction)){
            const token = resultAction.payload?.access_token
            if(token){
                localStorage.setItem("login_token", token)
                toast.success("Login success")
                router.push("/")
            } else{
                toast.error("Error al iniciar sesión")
            }
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Iniciar Sesión"}	
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )



}