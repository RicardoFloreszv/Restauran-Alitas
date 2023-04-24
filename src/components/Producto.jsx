import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

export default function Producto({producto, botonAgregar = false, botonDisponible = false}) {

    const {handleClickModal, handleSetProducto, handleClickProductoAgotado} = useQuiosco()

    const {nombre, categoria_id, precio, imagen} = producto

  return (
    <div className="border p-3 shadow bg-white">
        <img src={`/img/${imagen}.jpg`} alt={`imagen ${nombre}`} 
                className="w-full"
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-800">
                {formatearDinero(precio)}
            </p>

            {/* Botones para agregar al pedido o en caso de estar en la pagina de Admin poder marcar como agotado. */}
            {botonAgregar && (
                <button
                    type="button"
                    className="bg-yellow-800 hover:bg-yellow-900 text-white w-full mt-5 p-3 uppercase font-bold  "
                    onClick={() => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}
            >
                Agregar
            </button>
            )}

            {botonDisponible && (
                <button
                    type="button"
                    className="bg-yellow-800 hover:bg-yellow-900 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => handleClickProductoAgotado(producto.id)}
            >
                Producto Agotado
            </button>
            )}

        </div>
    </div>
  )
}
