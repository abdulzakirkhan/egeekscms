"use client"
import React from 'react'
import Image from 'next/image'

const NewHeader = ({title,onclick }) => {
  const handleClick = () => {
    onclick(true);
  }
  return (
    <>
        <header className="bg-[#FFFFFF] shadowCust h-[88px] flex items-center relative">
            <div className="container mx-auto px-10">
              <div className="flex justify-between items-center">
                <h3 className="text-blck font-bold">{title}</h3>
      
                <div className="flex w-1/4 items-center gap-4">
                  <button className="btntext bg-blck px-4 py-2 rounded-lg">Save as Draft</button>
                  {/* <button type="button" className="btntext bg-red px-4 py-2 rounded-lg" onClick={handleClick} >Publish</button> */}
                </div>
              </div>
            </div>
        </header>
    </>
  )
}

export default NewHeader
