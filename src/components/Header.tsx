import React from "react";
import { CourseDeckLogo } from '@/components/icons/CourseDeckLogo';
import Link from 'next/link';
//import Header from "@/components/Header";

export default function Header() {
  return (
    <div className="flex w-full h-16">
      {/* Sidebar */}
      <div className="bg-[#15333B] w-48 flex flex-col justify-center items-center h-16 shadow-md">
        <div className="flex flex-col items-center">
          <span className="text-white text-xl font-semibold">Creator<span className="text-blue-400">+</span></span>
          <span className="text-xs text-gray-300 mt-1">Powered by Marrow</span>
        </div>
      </div>
      {/* Header Content */}
      <div className="flex-1 flex items-center bg-[#15333B] pl-8">
        <span className="text-lg font-medium text-white">Welcome Dr. Himker Jain</span>
      </div>
    </div>
  );
}
