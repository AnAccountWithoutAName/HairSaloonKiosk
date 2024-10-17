import Navbar from "./components/navbar";
import Content from "./components/content";
import Cart from "./components/cart";
import img_spa_1 from "./assets/Spa_Images/spa_1.jpg";
import img_spa_2 from "./assets/Spa_Images/spa_2.jpg";
import img_spa_3 from "./assets/Spa_Images/spa_3.jpg";
import img_spa_4 from "./assets/Spa_Images/spa_4.jpg";
import img_spa_5 from "./assets/Spa_Images/spa_5.jpg";

import img_haircut_1 from "./assets/Haircut_Images/haircut_1.jpeg";
import img_haircut_2 from "./assets/Haircut_Images/haircut_2.jpeg";
import img_haircut_3 from "./assets/Haircut_Images/haircut_3.jpeg";
import img_haircut_4 from "./assets/Haircut_Images/haircut_4.jpeg";
import img_haircut_5 from "./assets/Haircut_Images/haircut_5.jpeg";

import img_color_1 from "./assets/Coloring_Images/coloring_1.jpeg";
import img_color_2 from "./assets/Coloring_Images/coloring_2.jpeg";
import img_color_3 from "./assets/Coloring_Images/coloring_3.jpeg";
import img_color_4 from "./assets/Coloring_Images/coloring_4.jpeg";
import img_color_5 from "./assets/Coloring_Images/coloring_5.jpeg";

import img_w_hair_1 from "./assets/Female_Haircut_Images/Curls.jfif.jpg";
import img_w_hair_2 from "./assets/Female_Haircut_Images/Ironing.jfif.jpg";
import img_w_hair_3 from "./assets/Female_Haircut_Images/ShampooDry.jfif.jpg";
import img_w_hair_4 from "./assets/Female_Haircut_Images/SplitendsCut.jfif.jpg";
import img_w_hair_5 from "./assets/Female_Haircut_Images/Trim.jfif.jpg";

import img_facial_1 from "./assets/Facial_Services/AcneCLeanup.jfif.jpg";
import img_facial_2 from "./assets/Facial_Services/BasicFacial.jfif.jpg";
import img_facial_3 from "./assets/Facial_Services/FairnessFacial.jfif.jpg";
import img_facial_4 from "./assets/Facial_Services/GoldFacial.jfif.jpg";
import img_facial_5 from "./assets/Facial_Services/UnderEyeRejuv.jfif.jpg";

import img_bleach_1 from "./assets/Bleach_Services/FaceNeck.jfif.jpg";
import img_bleach_2 from "./assets/Bleach_Services/FUlbody.jfif.jpg";
import img_bleach_3 from "./assets/Bleach_Services/Feet.jfif.jpg";
import img_bleach_4 from "./assets/Bleach_Services/FullArms.jfif.jpg";
import img_bleach_5 from "./assets/Bleach_Services/Upperlip.jfif.jpg";

import { Routes, Route, Outlet, BrowserRouter, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "./home";  // Importing the Home component

interface RootInterface {
  cartItems: {
    [itemName: string]: [number, number];
  };
  setCartItems: (updater: (prevCart: RootInterface["cartItems"]) => RootInterface["cartItems"]) => void;
}

function Root(props: RootInterface) {
  const img_array_male = [
    [img_spa_1, img_spa_2, img_spa_3, img_spa_4, img_spa_5],
    [img_haircut_1, img_haircut_2, img_haircut_3, img_haircut_4, img_haircut_5],
    [img_color_1, img_color_2, img_color_3, img_color_4, img_color_5]
  ];
  const label_array_male = [
    ["Classic Hair Spa", "Mositurising Hair Spa", "Color Shave Hair Spa", "Frizz Ease Hair Spa", "Rep n Rejuvenate Hair Spa"],
    ["Hair Cut", "Shave", "Trim", "Kids Cut", "Beard Design"],
    ["Basic Colour", "Ammonia-Free Colour", "Fashion Colour", "Creative Colour", "Fancy Colour"]
  ];
  const price_array_male = [[600, 600, 700, 800, 800], [170, 80, 100, 100, 200], [800, 1000, 1500, 2200, 2000]];
  const title_array_male = ["Spa Services", "Haircut Services", "Hair Colouring Services"];

  const img_array_female = [
    [img_w_hair_1, img_w_hair_2, img_w_hair_3, img_w_hair_4, img_w_hair_5],
    [img_facial_1, img_facial_2, img_facial_3, img_facial_4, img_facial_5],
    [img_bleach_1, img_bleach_2, img_bleach_3, img_bleach_4, img_bleach_5]
  ];
  const label_array_female = [
    ["Dream Curls", "Straight Finish", "Shampoo & Blast Dry", "Splitend Cuts", "Hair Trimming"],
    ["Acne Cleanup", "Basic Cleanup", "Fairness Facial", "Gold Facial", "Under-Eye Rejuvenation"],
    ["Neck Bleach", "Full-Body Bleach", "Feet Bleach", "Full-Arm Bleach", "Upper-Lip Bleach"]
  ];
  const price_array_female = [[700, 600, 250, 600, 300], [700, 600, 1500, 1200, 600], [300, 2000, 130, 400, 50]];
  const title_array_female = ["Haircut, Blowing and Drying", "Facial Services", "Bleaching Services"];

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
          ? title_array_male.map((item: any, index: number) => (
              <div className="m-3">
                <Content
                  key={item}
                  title={item}
                  img_files={img_array_male[index]}
                  img_labels={label_array_male[index]}
                  price={price_array_male[index]}
                  cartItems={cartItems}
                  setCartItems={handlerfunction}
                />
              </div>
            ))
          : title_array_female.map((item: any, index: number) => (
              <div className="m-3">
                <Content
                  key={item}
                  title={item}
                  img_files={img_array_female[index]}
                  img_labels={label_array_female[index]}
                  price={price_array_female[index]}
                  cartItems={cartItems}
                  setCartItems={handlerfunction}
                />
              </div>
            ))}
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Root cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/checkout" element={<Cart cartItems={cartItems} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
