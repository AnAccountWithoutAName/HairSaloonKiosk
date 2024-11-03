import Navbar from "./components/navbar";
import Content from "./components/content";
import Cart from "./components/cart";


import { Routes, Route, Outlet, BrowserRouter, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "./home";  // Importing the Home component
import serviceData from './Services_data.json'

interface RootInterface {
  cartItems: {
    [itemName: string]: [number, number];
  };
  setCartItems: (updater: (prevCart: RootInterface["cartItems"]) => RootInterface["cartItems"]) => void;
}

function Root(props: RootInterface) {


  const { cartItems, setCartItems } = props;
  const navigate = useNavigate();
  const [gender, setGender] = useState(true);

  const handlerfunction = (e: { item: string; quantity: number; price: number }) =>
    setCartItems((prevCart) => ({
      ...prevCart,
      [e.item]: [e.quantity, e.price],
    }));

  return (
    <>
      <div className="flex flex-col items-center p-3">
        <div className="w-fit h-10 -mt-4">
          <button
            className="bg-green-700 hover:bg-green-900 disabled:bg-green-900 text-white font-bold py-2 px-4 border border-green-900 border-transparent h-10 w-32 -ml-[40.5em]"
            disabled={gender}
            onClick={() => setGender((prev) => !prev)}
          >
            Men
          </button>
          <button
            className="bg-green-700 hover:bg-green-900 disabled:bg-green-900 text-white font-bold py-2 px-4 border border-green-900 h-10 w-32"
            disabled={!gender}
            onClick={() => setGender((prev) => !prev)}
          >
            Women
          </button>
        </div>

        {gender
          ? serviceData.male_categories.map((item, index) => 
            <div className="m-3">
            <Content
            key={index}
            title={item.title}
            services = {item.services}
            cartItems={cartItems}
            setCartItems={handlerfunction}
          />
        </div>
          ) 
          : serviceData.female_categories.map((item, index) => 
            <div className="m-3">
            <Content
            key={index}
            title={item.title}
            services = {item.services}
            cartItems={cartItems}
            setCartItems={handlerfunction}
          />
        </div>
            )
          }
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2 w-44"
          onClick={() => navigate("/checkout")}
        >
          Proceed
        </button>
      </div>
    </>
  );
}

function Dashboard() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row justify-center h-screen">
        <Outlet />
      </div>
    </>
  );
}

function App() {
  const [cartItems, setCartItems] = useState({});
  const handlerfunction = (e: { item: string; quantity: number; price: number }) =>
    setCartItems((prevCart) => ({
      ...prevCart,
      [e.item]: [e.quantity, e.price],
    }));


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Root cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/checkout" element={<Cart cartItems={cartItems} setCartItems={handlerfunction} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
