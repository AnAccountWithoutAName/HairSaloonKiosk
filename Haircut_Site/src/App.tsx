
import Navbar from "./components/navbar"
import  Content  from "./components/content"
import Cart from "./components/cart"
import img_style_1 from "./components/Style_1.jpg"
import img_style_2 from "./components/Shaving.jpg"
import img_style_3 from "./components/headwash.jpg"
import img_style_4 from "./components/Style_1.jpg"
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
  const img_array = [img_style_1,img_style_2,img_style_3,img_style_4]
  const label_array = ["Cutting","Shaving","Hairwash","PlaceHolder"]
  const price_array = [120,30,100,1000]
  const title_array = ["Haircuts","Shavings","Massages","Hairwash"]
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
        img_files={img_array} 
        img_labels={label_array} 
        price={price_array}  
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
