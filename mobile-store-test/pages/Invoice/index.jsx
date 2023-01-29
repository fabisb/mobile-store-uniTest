import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Facturaview from "../../components/Facturaview";
import Nav from "../../components/navbar";

export default function Invoice() {
  const [facturaid, setFacturaid] = useState("");

  const [factura, setFactura] = useState([]);

  const [products, setProducts] = useState([]);

  const [facturaview, setFacturaview] = useState(false);

  const handleChange = ({ target }) => {
    setFacturaid(target.value);
  };

  const getProduct = async () => {
    factura.map(async ({ products_id }) => {
      const { data } = await axios.get("/api/products/" + products_id);
      setProducts((comingProducts) => [...comingProducts, data]);
    });
    await handleFacturaview();
  };

  async function handleFacturaview() {
    if (factura.length !== 0) {
      setFacturaview(true);
    }
  }

  const getFactura = async () => {
    if (facturaid != "") {
      const { data } = await axios.get("/api/invoice/" + facturaid);
      setFactura(data);
      await getProduct();
    }
  };

  return (
    <>
      <Nav></Nav>
      <div className="flex">
        <div className="m-8">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Buscar factura
          </label>
          <input
            type="text"
            placeholder="Ingrese id de factura"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 w-60 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          />
          <button
            onClick={getFactura}
            className="rounded-xl my-3 hover:rounded-none shadow-md hover:shadow-inner transition-all bg-yellow-300 px-5 py-2"
          >
            Buscar
            <br />
            (doble click)
          </button>
          <label className="block mb-1 text-sm font-medium text-gray-900"></label>
          <Link href='Invoice/user'>
          <button className="rounded-xl my-3 hover:rounded-none shadow-md hover:shadow-inner transition-all bg-orange-400 px-5 py-2">
            Si desea buscar facturas
            <br />
            por medio de cedula
            <br />
            click aqui
          </button>
          </Link>
        </div>
        <div>
          {facturaview ? (
            <Facturaview factura={factura} products={products}></Facturaview>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
