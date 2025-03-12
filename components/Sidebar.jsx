"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { MdDashboard, MdOutlineEvent, MdLogout } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { IoBagSharp } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ handleModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <MdDashboard size={28} /> },
    {
      name: "Newsletter",
      href: "/dashboard/newsletter",
      icon: (
        <Image
          src={pathname === "/dashboard/newsletter" ? "/active-blog.png" : "/blog.png"}
          width={28}
          height={28}
          alt="Blog Icon"
        />
      ),
    },
    { name: "Jobs", href: "/dashboard/jobs", icon: <IoBagSharp size={28} /> },
    { name: "Events", href: "/dashboard/events", icon: <MdOutlineEvent size={28} /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 bg-gray-900 text-white p-3 rounded-lg lg:hidden z-30"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white p-6 h-screen w-64 transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:z-0`}
      >
        {/* Close Button (Mobile) */}
        <button
          className="absolute top-4 right-4 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Sidebar Content */}
        <div className="py-10">
          <Link
            href="/dashboard"
            className={`flex gap-4 items-center text-xl font-semibold mb-6 ${
              pathname === "/dashboard" ? "text-red" : "text-gray-700"
            }`}
          >
            <MdDashboard size={30} /> Dashboard
          </Link>
        </div>

        {/* Menu Items */}
        <h2 className="text-lg font-bold text-gray-900 mb-3">Manage</h2>
        <div className="space-y-3">
          {menuItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex gap-4 items-center text-lg px-4 py-2 rounded-lg transition-all duration-200 ${
                pathname === item.href
                  ? "bg-red-100 text-red"
                  : "text-gray-700 hover:text-red hover:bg-gray-100"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </div>

        {/* Settings Section */}
        <h2 className="text-lg font-bold text-grey mt-10 mb-3">Settings</h2>
        <div>
          <Link
            href="/dashboard/my-account"
            className={`flex gap-4 items-center text-lg px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === "/dashboard/my-account"
                ? "bg-red-100 text-red"
                : "text-grey hover:text-red"
            }`}
          >
            <CiUser size={28} /> My Account
          </Link>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-20 left-3 right-8 px-8">
          <button
            className="flex border-t-2 gap-4 items-center px-4 py-2 text-grey hover:text-red transition w-full"
            onClick={handleModal}
          >
            <MdLogout size={28} /> Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;