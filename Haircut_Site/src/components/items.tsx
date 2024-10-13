import React, { useState } from 'react'

interface CardProps {
  imgsrc: string;
  label: string;
  price: number
  setCartItems: (item: { item: string; quantity: number; price:number }) => void;
}

const Card = (props: CardProps) => {



  const {imgsrc,label,setCartItems,price} = props

  const [active, setActive] = useState(true)




  


  return (
    <div className='flex flex-col items-center border border-black w-fit h-[24rem] m-4 rounded-lg shadow-black '>
        <img src={imgsrc} className='rounded-t-lg w-80 h-[16rem]'></img>
        <h1 className = "text-2xl m-2">{label}</h1>
        <h1 className='p-1'>{price + "Rs."}</h1>
        <button className = {`${active ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow m-2 size-fit text-sm`} onClick={() => { active ? setCartItems({item: label, quantity: 1, price: price}):  setCartItems({item: label, quantity: 0, price: 0}); setActive((prevActive) => !prevActive)}}  >{active ? "Add" : "Remove"}</button>
    </div>
  )
}

export default Card