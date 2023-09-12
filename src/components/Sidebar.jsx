import Categoria from "./Categoria"
import useQuiosco from "../hooks/useQuiosco"
import { useAuth } from "../hooks/useAuth"


export default function Sidebar() {

  const {categorias} = useQuiosco()

  const {logout, user} = useAuth({Middleware: 'auth'})



  return (
    <aside className='md:w-96 '>
        <div className="p-4  flex justify-center ">
          <a href="/">
            <img src="img/logo.png" alt="Imagen Logo" 
                className="w-48"
                />
          </a>
        </div>

        <p className=" text-xl text-center">Pedido de {user?.name} {':)'} </p>

        <div className="mt-10">
            {categorias.map( categoria => (
              
              <Categoria 
                key={categoria.id}
                categoria={categoria}
              />
            ) )}
        </div>

        <div className="my-5">
            <button
                type="button"
                className="text-center text-lg bg-slate-900 w-full p-3 font-bold text-white truncate" 
                onClick={logout}
            >
              
                Cancelar Orden
            </button>
        </div>

        {
          user?.admin === 1 ? (
            <div className="my-5">
              <a href="/admin">
                <button
                    type="button"
                    className="text-center text-lg bg-slate-900 w-full p-3 font-bold text-white truncate" 
                >
                    Admin
                </button>
              </a>
            </div>
          ) : ""
        }






    </aside>
  )
}
