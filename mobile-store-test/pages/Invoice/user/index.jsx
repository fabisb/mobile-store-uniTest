import axios from "axios";
import React, { useState } from "react";
import Nav from "../../../components/navbar";

export default function Invoice() {
  const [facturaid, setFacturaid] = useState("");

  const [factura, setFactura] = useState([]);

  const [facturaview, setFacturaview] = useState(false);

  const handleChange = ({ target }) => {
    setFacturaid(target.value);
  };

  async function handleFacturaview() {
    if (factura.length !== 0) {
      setFacturaview(true);
      console.log(factura);
    }
  }

  const getFactura = async () => {
    if (facturaid != "") {
      const { data } = await axios.get("/api/invoice/user/" + facturaid);

      let hash = {};
      data = data.filter((o) =>
        hash[o.factura] ? false : (hash[o.factura] = true)
      );

      setFactura(data);
      await handleFacturaview();
    }
  };

  return (
    <>
      <Nav></Nav>
      <div className="flex">
        <div className="m-8">
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Buscar facturas
          </label>
          <input
            type="text"
            placeholder="Ingrese cedula"
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
        </div>
        <div>
          {facturaview ? (
            <div>
              <h2 className="font-semibold text-3xl antialiased tracking-wide">
                Facturas
              </h2>

              {factura.map(({ factura }, i) => {
                return (
                  <div key={i}>
                    <p className="mt-1"> {i + 1} </p>
                    <p className="py-2 px-6 font-medium text-gray-900">
                      {factura}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
