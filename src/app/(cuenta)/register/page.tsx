"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../redux/slices/authSlice"
import { AppDispatch, RootState } from "../../redux/store";
import {toast} from "react-toastify"

export default function RegisterPage(){
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {error, loading} = useSelector((state:RootState)=>state.auth)

    const[form, setForm] = useState({
        email:"",
        name:"",
        password:"",
        avatar:"",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.email || !form.name || !form.password || !form.avatar){
            toast.error("Por favor, completa todos los campos")
            return
        }

        try {
            await dispatch(registerUser(form)).unwrap;
            toast.success("Registro exitoso. Inicia sesión para continuar")
            router.push("/login")
        } catch (error) {
            toast.error("Oucrrio un error")
        }
    }
    return(
        <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="avatar"
          placeholder="Avatar"
          value={form.avatar}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    )
}