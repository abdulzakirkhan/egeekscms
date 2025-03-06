"use client"
import Image from 'next/image'
import React from 'react'

const Header = ({title}) => {
  return (
    <header className="bg-[#FFFFFF] !w-auto  shadowCust h-[88px] flex items-center">
      <div className="container mx-auto px-10">
        <div className="flex justify-between items-center">
          <h3 className="text-blck font-bold">{title}</h3>

          <div className="flex items-center gap-4">
            <div className="">
              <Image src={"/Header/notification.png"} width={24} height={24} alt='' />
            </div>
            <div className="bg-no-repeat cursor-pointer flex justify-center items-center bg-center w-[40px] h-[40px] rounded-full" style={{backgroundImage:"url(/Header/bg.png)",backgroundSize:"100% 100%"}}>
              <span className="text-[#4F378A]">S</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

