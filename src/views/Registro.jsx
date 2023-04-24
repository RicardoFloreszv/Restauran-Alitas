import { Link } from "react-router-dom"
import { createRef, useState } from "react"

import Alerta from "../components/Alerta";

import { useAuth } from "../hooks/useAuth";

export default function Registro() {

    const [errores, setErrores] = useState([])

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const {registro} = useAuth({middleware:'guest', url:'/'})

    const handleSubmit = async e => {
        e.preventDefault();

        // Asignamos los datos que coloque el usuario en el input
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        //Enviar peticion al siguente endpoint (usamos el hook de auth)
        registro(datos, setErrores)

    }

  return (
    <>
        <h1 className='text-4xl font-bold'>Crea Tu Cuenta</h1>
        <p>Crea tu Cuenta llenando el Formulario</p>

        <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
            <form 
                noValidate
                onSubmit={handleSubmit}
            >

                {errores ? errores.map(error => (
                         <Alerta key={error}> 
                            <p>{error}</p>
                        </Alerta>

                    )) : null
                }


                <div className='mb-4'>
                    <label htmlFor="name"
                            className='text-slate-800'>
                        Nombre: 
                    </label>
                    <input type="text" id='name'
                            className='mt-2 w-full p-3 bg-gray-50'
                            name='name'
                            placeholder='Tu Nombre'
                            ref={nameRef} 
                            />
                </div>

                <div className='mb-4'>
                    <label htmlFor="email"
                            className='text-slate-800'>
                        Email: 
                    </label>
                    <input type="email" id='email'
                            className='mt-2 w-full p-3 bg-gray-50'
                            name='email'
                            placeholder='Tu Email' 
                            ref={emailRef} 
                            />
                </div>

                <div className='mb-4'>
                    <label htmlFor="password"
                            className='text-slate-800'>
                        Password: 
                    </label>
                    <input type="password" id='password'
                            className='mt-2 w-full p-3 bg-gray-50'
                            name='password'
                            placeholder='Tu password'
                            ref={passwordRef}  
                            />
                </div>

                <div className='mb-4'>
                    <label htmlFor="password_confirmation"
                            className='text-slate-800'>
                        Repetir Password: 
                    </label>
                    <input type="password" id='password_confirmation'
                            className='mt-2 w-full p-3 bg-gray-50'
                            name='password_confirmation'
                            placeholder='Repetir Password' 
                            ref={passwordConfirmationRef} 
                            />
                </div>

                <input type="submit"
                        value='Crear Cuenta'
                        className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer' 
                />
            </form>
        </div>

        <nav className='mt-5'>
            <Link to="/auth/login">
                ¿Ya tienes Cuenta? Inicia Sesión.
            </Link>
        </nav>
    </>
  )
}
