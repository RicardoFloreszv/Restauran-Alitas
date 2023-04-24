import useSWR  from 'swr'

import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'
import clienteAxios from '../config/axios'


export default function Inicio() {

  const {categoriaActual} = useQuiosco()

  //Consultar el JSON de productos con SWR

  //Consulta SWR                                      Este data en naranja es la respuesta, osea el JSON y con => decimos que nos retorne data.data que es todos los productos. 
    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clienteAxios('/api/productos', {

      headers: {
        Authorization: `Bearer ${token}`
      }

    }).then(data => data.data)
    const {data, error, isLoading} = useSWR('/api/productos', fetcher, {
      refreshInterval: 1000
    })

    //isLoading    -   gracias a su comportamiento que retorna true or false podemos crear un spinner
    if(isLoading) return 'cargando...'

    
    //Filtrando para que nos traiga los productos de la misma categoria
  const productos = data.data.filter( producto => producto.categoria_id === categoriaActual.id)


  return (
    <>
      <h1 className='text-4xl font-black'>{categoriaActual.nombre}</h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación
        </p>

      <div className='grid gap-4 grid-cols-1 
                      md:grid-cols-2
                      xl:grid-cols-3'
      >
          {productos.map( producto => (
              <Producto
                key={producto.imagen}
                producto={producto}
                botonAgregar={true}
              />
          ))}

      </div>
    </>
  )
}
