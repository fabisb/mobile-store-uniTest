import Link from "next/link";
import React from "react";

export default function Products({ data }) {
  return (
    <div className="justify-around flex flex-wrap">
      {data.map((product) => (
        <Link key={product.id} href={`/product/phone/${product.id}`}>
          <div className="w-full cursor-pointer my-3 max-w-sm bg-white rounded-lg shadow-md">
            <img
              className="p-8 rounded-t-lg"
              src={product.img}
              layout="fill"
              width='384'
              height='384'
              alt="product image"
            ></img>
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                {product.marca} {product.model}
              </h5>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-lg font-semibold text-gray-800">
                  {product.capacity} GB -- {product.year}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
