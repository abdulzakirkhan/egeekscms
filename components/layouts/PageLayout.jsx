"use client";
import Header from "@/components/Header";

const PageLayout = ({ title, children }) => {
  return (
    <>
      <Header title={title} />
      <section className="bg-[#F6F6F6] py-8">
        <div className="container mx-auto px-6">{children}</div>
      </section>
    </>
  );
};

export default PageLayout;
