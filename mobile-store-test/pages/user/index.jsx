import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Nav from "../../components/navbar";
import { v4 as uuidv4 } from "uuid";

export default function UserView({ data }) {
  const [user, setUser] = useState("");
  const [facturaid, setFacturaid] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [btoclass, setBtoclass] = useState("flex hidden");

  useEffect(() => {
    const idfactura = uuidv4();
    setFacturaid(idfactura);
  }, []);

  const handleUser = ({ target }) => {
    console.log(target.value);
    setUser(target.value);

    if (target.value != "") {
      setBtoclass("flex");
    } else {
      setBtoclass("flex hidden");
    }
  };

  const handleQuantity = ({ target }) => {
    console.log(target.value);
    setCantidad(target.value);
  };

  const [post, setPost] = useState({
    products_id: 0,
    user_id: 0,
  });

  const handleData = async () => {
    if (user != "") {
      const res = await axios.post("/api/invoice", post);
      console.log(res);
      alert("Producto añadido a factura");
    } else {
      alert("cedula invalida");
    }
  };

  function handlePurcharse({ target }) {
    setPost({
      products_id: target.id,
      user_id: user,
      factura: facturaid,
      cantidad,
    });
    console.log(post);
  }

  return (
    <>
      <Nav></Nav>

      <div className="mx-4">
        <label className="block mb-1 text-sm font-medium text-gray-900">
          Ingrese cedula
        </label>
        <div className="flex">
          <input
            type="number"
            min="0"
            onChange={handleUser}
            name="user_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          />
          <label className="block mb-1 text-sm font-medium mx-4 text-gray-900">
            <p>ID de factura (consultar en `Check Invoice`)</p>
            {facturaid}
          </label>
        </div>
      </div>

      <div className="justify-around flex flex-wrap">
        {data.map((product) => (
          <div
            key={product.id}
            onPointerEnter={handlePurcharse}
            className="w-full my-3 max-w-sm bg-white rounded-lg shadow-md"
          >
            <img
              className="p-8 rounded-t-lg"
              src={product.img}
              layout="fill"
              width="384"
              height="384"
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
            <div className={btoclass}>
              <button
                type="button"
                id={product.id}
                onPointerEnter={handlePurcharse}
                onClick={handleData}
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4 my-2 inline-flex items-center mr-2"
              >
                <svg
                  aria-hidden="true"
                  className="mr-2 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Add to shopping cart
              </button>
              <input
                type="number"
                min="1"
                onPointerEnter={handlePurcharse}
                onChange={handleQuantity}
                name="user_id"
                placeholder="1"
                className="bg-gray-50 border my-2 border-gray-300 w-12 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { data } = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      data,
    },
  };
};
