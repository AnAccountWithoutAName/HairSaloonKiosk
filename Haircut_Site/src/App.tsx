
import Navbar from "./components/navbar"
import  Content  from "./components/content"
import Cart from "./components/cart"
import img_spa_1 from "./assets/Spa_Images/spa_1.jpg"
import img_spa_2 from "./assets/Spa_Images/spa_2.jpg"
import img_spa_3 from "./assets/Spa_Images/spa_3.jpg"
import img_spa_4 from "./assets/Spa_Images/spa_4.jpg"
import img_spa_5 from "./assets/Spa_Images/spa_5.jpg"

import img_haircut_1 from "./assets/Haircut_Images/haircut_1.jpeg"
import img_haircut_2 from "./assets/Haircut_Images/haircut_2.jpeg"
import img_haircut_3 from "./assets/Haircut_Images/haircut_3.jpeg"
import img_haircut_4 from "./assets/Haircut_Images/haircut_4.jpeg"
import img_haircut_5 from "./assets/Haircut_Images/haircut_5.jpeg"

import img_color_1 from "./assets/Coloring_Images/coloring_1.jpeg"
import img_color_2 from "./assets/Coloring_Images/coloring_2.jpeg"
import img_color_3 from "./assets/Coloring_Images/coloring_3.jpeg"
import img_color_4 from "./assets/Coloring_Images/coloring_4.jpeg"
import img_color_5 from "./assets/Coloring_Images/coloring_5.jpeg"



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
  const img_array = [[img_spa_1,img_spa_2,img_spa_3,img_spa_4,img_spa_5],[img_haircut_1,img_haircut_2,img_haircut_3,img_haircut_4,img_haircut_5],[img_color_1,img_color_2,img_color_3,img_color_4,img_color_5]]
  const label_array = [["Classic Hair Spa",
    "Mositurising Hair Spa",
    "Color Shave Hair Spa",
    "Frizz Ease Hair Spa",
    "Rep n Rejuvenate Hair Spa"],["Hair Cut","Shave","Trim","Kids Cut","Beard Design"],["Basic Colour","Ammonia-Free Colour","Fashion Colour","Creative Colour","Fancy Colour"]]
  const price_array = [[600,600,700,800,800],[170,80,100,100,200],[800,1000,1500,2200,2000]]
  const title_array = ["Spa Services","Haircut Services","Hair Colouring Services"]
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
        img_files={img_array[index]} 
        img_labels={label_array[index]} 
        price={price_array[index]}  
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
