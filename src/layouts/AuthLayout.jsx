import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <main className="max-w-4xl m-auto mt-10 flex flex-col items-center
                     md:mt-28 md:flex-row ">
        <img src="../img/logo.svg" alt="Imagen Logotipo" 
            className="max-w-xs"/>
        
        <div className="p-10 w-full">
            <Outlet />
        </div>
            
    </main>
  )
}
