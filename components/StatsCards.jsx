"use client"
import Image from "next/image"

export default function StatsCards({ cardsData }) {
  return (
    <section className="bg-[#F6F6F6] py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData.map((card, index) => (
            <div className="w-full p-6 bg-white border rounded-xl border-[#E5E5EA] flex items-center lg:min-h-[170px]" key={index}>
              <div className="flex items-center gap-4">
                <div className="bg-no-repeat bg-center w-114 h-108 flex justify-center items-center" 
                     style={{ backgroundImage: `url(${card.bg})`, backgroundSize: "100% 100%" }}>
                  <Image src={card.icon} width={48} height={48} alt={card.title} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">{card.count}</span>
                  <span className="text-grey text-xl">{card.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}