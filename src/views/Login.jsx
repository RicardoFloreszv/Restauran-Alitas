import { Link } from "react-router-dom"
import { createRef, useState } from "react"

import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alerta";

export default function Login() {

    const [errores, setErrores] = useState([])
    const {login} = useAuth({               
        middleware: 'guest',                
        url: '/'                            //En caso de que el usuario se autentique redireccionarlo al inicio.
    })

    
    const emailRef = createRef();
    const passwordRef = createRef();
    

    const handleSubmit = async e => {
        e.preventDefault();

        // Asignamos los datos que coloque el usuario en el input
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        //Enviar peticion al siguente endpoint (usamos el hook de useAuth)
        login(datos, setErrores)

    }

  return (
    <>
    <h1 className='text-4xl font-bold'>Inicia Sesión</h1>
    <p>Para realizar pedidos Inicia sesión</p>

    <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
        <form onSubmit={handleSubmit} noValidate>

                {errores ? errores.map(error => (
                         <Alerta key={error}> 
                            <p>{error}</p>
                        </Alerta>

                    )) : null
                }

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

            <input type="submit"
                    value='iniciar Sesión'
                    className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer' 
            />
        </form>
    </div>

    <nav className='mt-5'>
        <Link to="/auth/registro">
            ¿No tienes Cuenta? Crea una.
        </Link>
    </nav>

</>
  )
}
