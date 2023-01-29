import axios from "axios";
import React from "react";
import Image from "next/image";
import Nav from "../../../components/navbar";
import { useRouter } from "next/router";

export default function ProductPage({ data }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await axios.delete("/api/products/" + id);

    router.push("/");
  };

  return (
    <>
      <Nav></Nav>
      <div className="w-full my-3 max-w-sm bg-white rounded-lg shadow-md">
        <img
          className="p-8 rounded-t-lg"
          src={data.img}
          layout="fill"
          width="384"
          height="384"
          alt="product image"
        ></img>
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {data.marca} {data.model}
          </h5>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-gray-900">
              ${data.price}
            </span>
            <span className="text-lg font-semibold text-gray-800">
              {data.capacity} GB -- {data.year}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleDelete(data.id)}
            className="focus:outline-none my-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => router.push(`/product/phone/edit/${data.id}`)}
            className="focus:outline-none my-2 text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { data } = await axios.get(
    "http://localhost:3000/api/products/" + context.query.id
  );
  return {
    props: {
      data,
    },
  };
};
