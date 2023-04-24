import useSWR from "swr"
import clienteAxios from "../config/axios"
import Producto from "../components/Producto"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"


export default function Ordenes() {

// Para traernos las ordenes de la base dedatos

  //Enviando una peticion Autenticada a la BD 
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/pedidos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const {data, error, isLoading} = useSWR('/api/pedidos', fetcher, {refreshInterval: 1000})


  //useQuiosco
  const {handleClickCompletarPedido} = useQuiosco()

  if(isLoading) return 'cargando...'

  console.log(data.data.data)


  return (
    <div className="">

      <h1 className='text-4xl font-black'>Ordenes</h1>
      <p className='text-2xl my-10'>
        Maneja la ordenes desde aqui
      </p>

      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-5 items-baseline">
        {data.data.data.map(pedido => (
          <div key={pedido.id} className="p-5 bg-white shadow space-y-2 border-b ">
            <div className="flex justify-between">
                <p className="text-xl font-bold text-slate-600">
                  Contenido del pedido:
                </p>

                <p>{pedido.id}</p>
            </div>


              {pedido.productos.map(producto => (
                <div 
                  key={producto.id} 
                  className=" border-b border-b-slate-200 last-of-type:border-none py-4 flex"
                >
                    <img src={`/img/${producto.imagen}.jpg`} alt="Imagen del producto"  className="w-80"/>


                    <div className="flex flex-col justify-between p-3">
                      <div>
                          <p className="font-bold text-xl">{producto.nombre}</p>                        
                          <p className="text-sm">ID: {producto.id}</p>    
                      </div>
                      <div>
                          <p className=" text-lg">
                            Cantidad: {''}
                            <span className="font-bold">{producto.pivot.cantidad}</span>
                          </p>
                      </div>
      
                    </div>



                    



                </div>
              ))}

                <p className="text-lg font-bold text-slate-600">
                  Cliente: {''}
                    <span className="font-normal">{pedido.user.name}</span>
                </p>
                
                <p className="text-lg font-bold text-amber-700">
                  Total a pagar: {''}
                    <span className="font-normal text-slate-600">{formatearDinero(pedido.total)}</span>
                </p>

                <button
                  type="button"
                  className="bg-lime-800 hover:bg-lime-900 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
                  onClick={() => handleClickCompletarPedido(pedido.id)}
                >
                  Completar
                </button>
              

          </div>
        ) )}
      </div>

    </div>
  )
}
