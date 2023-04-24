import useQuiosco from "../hooks/useQuiosco"

export default function Categoria({categoria}) {

  const {handleClickCategoria, categoriaActual} = useQuiosco()

  const {icono, id, nombre} = categoria

  return (
    <div className={`flex items-center gap-4  w-full p-4 hover:bg-yellow-800 hover:opacity-90 cursor-pointer     ${categoriaActual.id === id ? "bg-yellow-800 text-white " : "bg-white"}`}
    >

        <img src={`/img/icono_${icono}.svg`} alt="Imagen Icono" 
            className="w-12"/>

        <button className="text-lg font-bold cursor-pointer truncate w-full text-left"
                type="button"
                onClick={() => handleClickCategoria(id)}
        >
          {nombre}
        </button>
    </div>
  )
}
