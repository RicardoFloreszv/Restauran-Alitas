import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "./ResumenProducto"
import { formatearDinero } from "../helpers"
import { useAuth } from "../hooks/useAuth"

export default function Resumen() {

  const {pedido, total, handleSubmitNuevaOrden} = useQuiosco()
  const {logout} = useAuth({})

  const comprobarPedido = () => pedido.length === 0;

  const handleSubmit = e => {
    e.preventDefault()

    handleSubmitNuevaOrden(logout)
  }

  return (
    <div className="md:w-96 h-screen overflow-y-scroll p-5">
        <h1 className=" text-3xl font-black">
          Mi Pedido
        </h1>

        <p className="text-lg my-5">
          Aqui podras ver el resumen y totales de tu pedido
        </p>

        <div className="py-10">
          {pedido.length === 0 ? (
            <p className="text-center text-xl">
              No hay elementos en tu pedido aún
            </p>

          ) : (
            
            pedido.map(producto => (
              <ResumenProducto
                key={producto.id} 
                producto={producto}
              />
            ))
          )}
        </div>

        <p className="text-xl mt-10">Total: {formatearDinero(total)}</p>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mt-5">
            <input type="submit" 
                  className={`${comprobarPedido() ? "bg-orange-700 opacity-50" : "bg-lime-700 hover:bg-lime-800 "} 
                               uppercase font-bold text-white text-center cursor-pointer px-5 py-2 w-full rounded `}
                  value="Confirmar Pedido"
                  disabled={comprobarPedido()}

            />
          </div>
        </form>
    </div>
  )
}
