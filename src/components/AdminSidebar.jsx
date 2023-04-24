import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function AdminSidebar() {

    const {logout} = useAuth({middleware: 'auth'});

  return (
    <aside className='md:w-96 h-screen '>
        <div className='p-4 flex justify-center mt-10'>
            <a href="/">
                <img src="/img/logo.png" alt="Imagen logotipo"
                    className='w-72' 
                />
            </a>
        </div>


        <div className="mt-10">
            <nav className="flex flex-col text-white text-center border border-gray-400 bg-yellow-800 hover:bg-yellow-900 ">
                <Link to='/admin' className="font-bold text-lg p-4">Ordenes</Link>
            </nav>
        </div>
        <div>
            <nav className="flex flex-col text-white  text-center border border-gray-400 bg-yellow-800 hover:bg-yellow-900">
                <Link to='/admin/productos' className="font-bold text-lg p-4">Productos</Link>
            </nav>
        </div>

        <div className="my-5 px-5">
            <button
                type="button"
                className="text-center bg-slate-800 w-full p-3 font-bold text-white truncate hover:bg-slate-950" 
                onClick={logout}
            >
              
                Cerrar sesion
            </button>
        </div>
    </aside>
  )
}
