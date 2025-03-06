import Image from "next/image";

const Card = () => {
    const cardsData = [
        { title: "Total", count: "12", bg: "/dashboard/bg1.png", icon: "/dashboard/i1.png" },
        { title: "Published", count: "12", bg: "/dashboard/bg2.png", icon: "/dashboard/i2.png" },
        { title: "Draft", count: "2", bg: "/dashboard/bg3.png", icon: "/dashboard/i3.png" },
      ];
  return (
    <>
        {cardsData.map((card, index) => (
            <div className="w-full p-6 bg-[#FFFFFF] border rounded-xl border-[#E5E5EA] flex items-center lg:min-h-[170px]" key={index}>
            <div className="flex items-center gap-4">
                <div className="bg-no-repeat bg-center w-114 h-108 flex justify-center items-center" style={{ backgroundImage: `url(${card.bg})`, backgroundSize: "100% 100%" }}>
                <Image src={card.icon} width={48} height={48} alt="total" />
                </div>
                <div className="flex flex-col">
                <span className="text-xl font-bold">{card.count}</span>
                <span className="text-grey text-xl">{card.title}</span>
                </div>
            </div>
            </div>
        ))}
    </>
  );
};

export default Card;
