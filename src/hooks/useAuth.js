import { useEffect } from "react"
import useSWR  from "swr"
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/axios"



export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const {data: user, error, mutate} = useSWR('/api/user', () => (
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error  => {
            throw Error(error?.response?.data?.errors)
        })
    ))

    const login = async (datos, setErrores) => {

        //Enviar peticion al siguente endpoint 
        try {
            const {data} = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
    }


    const registro = async (datos, setErrores) => {
        
        //Enviar peticion al siguente endpoint
        try {
            const {data} = await clienteAxios.post('/api/registro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
    }

    
    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout/', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            //Remover el token
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }


    //Este useEffect estara escuchando en caso de que el usuario se autentique o que No lo haga(le de error).
    useEffect(() => {

        //Recordar que si esta en la pagina de login es porque es un guest. Un guest que busca autenticarse.


        //Entonces si el middleware es tipo guest y tiene una url y un user SIGNIFICA QUE SI se autentico bien. Entonces lo mandamos al inicio
        if(middleware === 'guest' && url && user){
            
            //Lo redireccionamos al inicio. la url se la especificamos en el backend
            navigate(url)
        }

        //¿Que necesito para que alguien pueda acceder a /admin? Que este en una pantalla de guest, exista un user y exista user.admin como 1
        if(middleware === 'guest' && user && user.admin){
            navigate('/admin')
        }

        //Cuando un usuario con cuenta quiere entrar a la seccion de admin.. pues lo redireccionamos a inicio
        if(middleware === 'admin' && user && !user.admin){
            navigate('/')
        }


        //Cuando alguien busque ingresar a una url de tipo auth redireccionarlo al login. (por ejemplo cuando alguien no autenticado busque entrar al inicio que lo mande a login)
        if(middleware === 'auth' && error){
            navigate('/auth/login')

        }

    }, [user, error])
    
    
    return {
        login,
        registro,
        logout,
        user,
        error
    }
}

