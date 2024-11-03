import React, { useEffect } from "react";
import Card from "./items";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";



interface ServiceType {
  title: string;
  price: number;
  file_path: string;
}

interface ContentProps {
  title: string;
  services: Array<ServiceType>;
  cartItems: {
    [itemName: string]: [number, number];
  };
  setCartItems: (item: {
    item: string;
    quantity: number;
    price: number;
  }) => void;
}

const Content = (props: ContentProps) => {
  const { title, services, setCartItems, cartItems } = props;
  const [count, setCount] = useState(0);
  const size = services.length;
  const [images, setImages] = useState<{ [key: string]: string }>({});

  // Get all images
  const imageFiles = import.meta.glob('../assets/**/*.{jpg,jpeg,png,jfif}', { eager: true });

  useEffect(() => {
    // Create a mapping of file paths to their URLs
    const loadImages = () => {
      const imageMap: { [key: string]: string } = {};
      
      services.forEach((service) => {
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
      });

      setImages(imageMap);
    };

    loadImages();
  }, [services]);

  const onclickhandlerforward = () => setCount((prevCount) => prevCount + 1);
  const onclickhandlerbackward = () => setCount((prevCount) => prevCount - 1);

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center">
          <button onClick={onclickhandlerbackward} disabled={!(count > 0)}>
            <IoIosArrowBack size="5em" />
          </button>
        </div>
        {services.map((item: ServiceType, index: number) =>
          index >= count && index < count + 4 ? (
            <Card
              key={item.title}
              imgsrc={images[item.file_path] || ''} // Pass the resolved image URL
              label={item.title}
              price={item.price}
              setCartItems={setCartItems}
              cartItems={cartItems}
            />
          ) : null
        )}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={onclickhandlerforward}
            disabled={!(count + 4 < size)}
          >
            <IoIosArrowForward size="5em" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;