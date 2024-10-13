
import Navbar from "./components/navbar"
import  Content  from "./components/content"
import Cart from "./components/cart"
import img_spa_1 from "./assets/Spa_Images/spa_1.jpg"
import img_spa_2 from "./assets/Spa_Images/spa_2.jpg"
import img_spa_3 from "./assets/Spa_Images/spa_3.jpg"
import img_spa_4 from "./assets/Spa_Images/spa_4.jpg"
import img_spa_5 from "./assets/Spa_Images/spa_5.jpg"
import {
  Routes, Route, Outlet, BrowserRouter,
  useNavigate
} from "react-router-dom";
import { useState } from "react"


interface RootInterface {
  cartItems: {
    [itemName: string]: [number, number]; 
  };
  setCartItems: (updater: (prevCart: RootInterface["cartItems"]) => RootInterface["cartItems"]) => void; 
}


function Root(props: RootInterface) {
  const img_array = [[img_spa_1,img_spa_2,img_spa_3,img_spa_4,img_spa_5],[]]
  const label_array = [["Classic Hair Spa",
    "Mositurising Hair Spa",
    "Color Shave Hair Spa",
    "Frizz Ease Hair Spa",
    "Rep n Rejuvenate Hair Spa"]]
  const price_array = [[600,600,700,800,800]]
  const title_array = ["Spa Services","Hair Colouring Services","Haircut Services"]
  const {cartItems, setCartItems} = props
  const navigate = useNavigate()



      




  const handlerfunction = (e:{ item: string; quantity: number; price: number }) => setCartItems((prevCart) => ({
    ...prevCart, 
    [e.item]: [e.quantity,e.price]
  }))

  return (
    
    <div className="flex flex-col items-center p-3">
    {title_array.map((item: any,index:number) => ( 

      <div className = "m-3">
      <Content 
        key={item} 
        title={item} 
        img_files={img_array[0]} 
        img_labels={label_array[0]} 
        price={price_array[0]}  
        setCartItems={handlerfunction} />
        </div>


      
      
    ))}
  
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2 w-44" onClick={() => navigate('/checkout')}>Proceed</button>
  
  </div>
 
  
 

  
 

    




  )

}

function Dashboard(){
  return(
    <>
    <div>
    <Navbar /> 
    </div>
    <div className = "flex flex-row justify-center h-screen">
      <Outlet />
    </div>
    </>
  )
}

function App(){

  const [cartItems, setCartItems] = useState({})


  return(
    <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<Dashboard />} >
      <Route path = '/' element = {<Root cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path = '/checkout' element = {<Cart cartItems = {cartItems} />} />
      </Route>

      

    </Routes>
    </BrowserRouter>
  )
}
export default App
