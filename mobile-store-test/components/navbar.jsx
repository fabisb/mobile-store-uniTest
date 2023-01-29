import Link from "next/link";
import React from "react";

export default function Nav( ) {
  return (
      <div className="p-3 bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-around text-center">
        <Link href="/">
          <h1 className="font-mono text-3xl cursor-pointer text-gray-200 delay-75 transition-all w-80 border-2 hover:bg-slate-800 rounded-lg p-2 hover:text-white">
            Mobile Store
          </h1>
        </Link>
        <Link href="/product/add">
          <button className="font-mono text-xl delay-75 transition-all border-2 hover:bg-slate-800 w-80 rounded-lg p-2 text-gray-200 hover:text-green-400">
            Add
          </button>
        </Link>
        <Link href='/product/brands'>
        <button className="font-mono text-xl w-80 delay-75 transition-all border-2 hover:bg-slate-800 rounded-lg p-2 text-gray-200 hover:text-yellow-400">
          Brands
        </button>
        </Link>
        <Link href='/Invoice'>
        <button className="font-mono text-xl w-80 delay-75 transition-all border-2 hover:bg-slate-800 rounded-lg p-2 text-gray-200 hover:text-rose-300">
          Check Invoice
        </button>
        </Link>
        <Link href='/user'>
        <button className="font-mono text-xl w-80 delay-75 transition-all border-2 hover:bg-slate-800 rounded-lg p-2 text-gray-200 hover:text-rose-300">
          Buy something
        </button>
        </Link>
      </div>
  );
}
