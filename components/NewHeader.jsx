"use client"
import React from 'react'
import Image from 'next/image'

const NewHeader = ({title,onclick }) => {
  const handleClick = () => {
    onclick(true);
  }
  return (
    <>
        <header className="bg-[#FFFFFF] !w-auto  shadowCust h-[88px] flex items-center relative">
            <div className="container mx-auto px-10">
              <div className="flex justify-between items-center">
                <h3 className="text-blck font-bold">{title}</h3>
      
              </div>
            </div>
        </header>
    </>
  )
}

export default NewHeader
