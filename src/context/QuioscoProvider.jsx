import { useState, createContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import clienteAxios from '../config/axios'




const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)


    useEffect(() => {

        const nuevoTotal = pedido.reduce((total, producto) => (producto.cantidad * producto.precio) + total, 0)
        setTotal(nuevoTotal)

    }, [pedido])
    
    //Consumir Api
        const ObtenerCategorias = async () => {

            const token = localStorage.getItem('AUTH_TOKEN')

            try {
                const {data} = await clienteAxios('/api/categorias',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCategorias(data.data)
                setCategoriaActual(data.data[0])
            } catch (error) {
                console.log(error)
            }
            
        }

        useEffect(() => {
            ObtenerCategorias();
        }, [])
        


    const handleClickCategoria = id => {

        const categoria = categorias.filter( categoria => categoria.id === id)[0]       //Filter itera en cada categoria, hace la comparacion Y nos regresa un Array Nuevo con el resultado de la comparacion. el [0] es porque estamos trabajando con un objeto y de esta manera accede a la posicion 0 del arreglo, que es un objeto

        setCategoriaActual(categoria)

    }

    const handleClickModal  = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }


    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        
        //Funcion para comprobar si el producto que va entrar es igual a uno que ya este en el resumen. Si ya esta retorna la informacion nueva. Si no esta pues entra al else y lo agrega, porque es nuevo.
        if(pedido.some( pedidoState => pedidoState.id === producto.id)){
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState )
            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')
        }
        else{
            setPedido([...pedido, producto])
            toast.success('Se añadio Correctamente')
        }
    }

    const handleEditarCantidad = id => {
        

        //.Filter = "Quiero extraer" el producto que su id (producto.id) sea igual al id que viene con el llamado (el del callback)
        const ProductoAcualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(ProductoAcualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        

        //.Filter = "Quiero extraer" el producto que su id (producto.id) sea igual al id que viene con el llamado (el del callback)
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del Pedido')

    }

    const handleSubmitNuevaOrden = async (logout) => {

        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            const {data} = await clienteAxios.post('/api/pedidos',
            //Datos que se enviaran
            { 
                total,
                productos: pedido.map(producto => {
                    return{
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                })
            },
            //Enviar peticion autenticada
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            //Crear la notificacion
            toast.success(data.message)
            setTimeout(() => {
                setPedido([])
            }, 1000);

            //Cerrar sesion despues de realizar el pedido
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCompletarPedido = async (id) => {
        
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {

            //Enviar peticion autenticada

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            })

        } catch (error) {
            console.log(error)
        }

    }


    const handleClickProductoAgotado = async (id) => {
        
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {

            //Enviar peticion autenticada

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            })

        } catch (error) {
            console.log(error)
        }

    }



    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export { 
    QuioscoProvider
}
export default QuioscoContext