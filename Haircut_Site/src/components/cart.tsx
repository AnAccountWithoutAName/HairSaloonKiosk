import { useEffect, useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import serviceData from '../Services_data.json';
import Card from './items'; // Assuming Card is in the same directory

interface ServiceType {
  title: string;
  price: number;
  file_path: string;
}

interface FlattenedServiceType {
  male_categories: ServiceType[];
  female_categories: ServiceType[];
}

const Cart = (props: any) => {
  const { cartItems, setCartItems } = props;
  const [total, setTotal] = useState(0);
  const [recommendedItems, setRecommendedItems] = useState<ServiceType[]>([]);
  const flattenedServices: FlattenedServiceType = {
    male_categories: [],
    female_categories: []
  };
  const [images, setImages] = useState<{ [key: string]: string }>({});

  const imageFiles = import.meta.glob('../assets/**/*.{jpg,jpeg,png,jfif}', { eager: true });

 

  useEffect(() => {
    flattenedServices.male_categories = serviceData.male_categories.flatMap(category => category.services);
    flattenedServices.female_categories = serviceData.female_categories.flatMap(category => category.services);
  }, []);
  useEffect(() => {
    // Create a mapping of file paths to their URLs
    const loadImages = () => {
      const imageMap: { [key: string]: string } = {};
      
      Object.values(flattenedServices).forEach((services) => {
        services.forEach((service:any)=>{
        
        // Convert the relative path to the format that matches import.meta.glob
        const key = service.file_path.startsWith('./') 
          ? service.file_path.slice(2) // Remove './' from the start
          : service.file_path;

        // Find the matching image file
        const matchingFile = Object.entries(imageFiles).find(([path]) => 
          path.includes(key)
        );

        if (matchingFile) {
          imageMap[service.file_path] = (matchingFile[1] as { default: string }).default;
        }
      })});

      setImages(imageMap);
    };

    loadImages();
  }, []);
  useEffect(() => {
    let newTotal = 0;
    Object.keys(cartItems).forEach(item => {
      const [quantity, price] = cartItems[item];
      newTotal += quantity * price;
    });
    setTotal(newTotal);
  }, [cartItems]);

  // Recommendation Logic
  useEffect(() => {
    const cartCategories = Object.keys(cartItems).reduce(
      (acc, item) => {
        const maleMatch = flattenedServices.male_categories.find(service => service.title === item);
        const femaleMatch = flattenedServices.female_categories.find(service => service.title === item);
        
        if (maleMatch) acc.maleCount += 1;
        if (femaleMatch) acc.femaleCount += 1;
        return acc;
      },
      { maleCount: 0, femaleCount: 0 }
    );

    const isMixed = cartCategories.maleCount > 0 && cartCategories.femaleCount > 0;
    const selectedMaleServices = getRandomServices(flattenedServices.male_categories, isMixed ? 2 : 4);
    const selectedFemaleServices = getRandomServices(flattenedServices.female_categories, isMixed ? 2 : 4);
    
    setRecommendedItems(isMixed ? [...selectedMaleServices, ...selectedFemaleServices] : 
      cartCategories.maleCount > 0 ? selectedMaleServices : selectedFemaleServices);
  }, []);

  const getRandomServices = (services: ServiceType[], count: number) => {
    const shuffled = [...services].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-[90%] h-fit border-2 m-4 border-black gap-8">
      <h1 className='text-3xl font-bold text-center'>Your Cart</h1>
      <div className="grid grid-cols-3 w-[60%] text-center gap-2 text-xl">
        <h1 className="font-bold text-2xl p-2">Service</h1>
        <h1 className="font-bold text-2xl p-2">Qty</h1>
        <h1 className="font-bold text-2xl p-2">Price</h1>
        {Object.keys(cartItems).map((item) => (
          cartItems[item][0] !== 0 && (
            <>
              <h1 className="border-b">{item}</h1>
              <h1 className="border-b">{cartItems[item][0]}</h1>
              <h1 className="border-b">{cartItems[item][1]}</h1>
            </>
          )
        ))}
      </div>

      <div className="relative bottom-0 right-0">
        <h1 className="text-2xl"><b className="text-2xl">Total: </b>{total} Rs.</h1>
      </div>

      <h1 className="text-2xl font-bold">Customers Also Viewed: </h1>
      <div className="flex items-center flex-row">
        {recommendedItems.map((item) => (
          <Card
            key={item.title}
            imgsrc={images[item.file_path]}
            label={item.title}
            price={item.price}
            setCartItems={setCartItems}
            cartItems={cartItems}
            showButton = {true}
          />
        ))}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2 w-44"
        onClick={() => navigate('/services')}
      >
        Add More Items
      </button>
    </div>
  );
};

export default Cart;
