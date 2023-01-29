import React, { useEffect, useState } from "react";

export default function Facturaview({ factura, products }) {
  const [cantidad1, setCantidad1] = useState([]);
  const [price, setPrice] = useState([]);
  const [totalview, setTotalview] = useState(
    "font-semibold hidden text-gray-900"
  );

  console.log(factura);
  console.log(products);

  const e = cantidad1.reduce((prev, next) => prev + next, 0);
  const q = price.reduce((prev, next, i) => prev + next * cantidad1[i], 0);

  useEffect(() => {
    factura.map(async ({ cantidad }) => {
      setCantidad1((comingCantidad) => [...comingCantidad, cantidad]);
    });
  }, []);

  function getPrice({ target }) {
    for (let index = 0; index < factura.length; index++) {
      setPrice((comingPrice) => [...comingPrice, products[index]?.price]);
    }
    target.disabled = "disabled";
    setTotalview("font-semibold text-gray-900");
  }
  console.log(e);
  console.log(q);
  console.log(price);
  console.log(cantidad1);
  console.log(factura.length);

  console.log(products[0]?.price);
  return (
    <div>
      <div className="mt-3">
        <p className="font-semibold antialiased tracking-wide">
          ID de factura: {factura[0].factura}
        </p>
        <p className="font-semibold antialiased tracking-wide">
          Cedula de cliente: {factura[0].user_id}
        </p>
      </div>
      <br />
      <br />

      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
            <tr>
              <th scope="col" className="py-3 px-6 rounded-l-lg">
                Product name
              </th>
              <th scope="col" className="py-3 px-6">
                Qty
              </th>
              <th scope="col" className="py-3 px-6 ">
                Price
              </th>
              <th scope="col" className="py-3 px-6 ">
                Added at
              </th>
              <th scope="col" className="py-3 px-6 rounded-r-lg"></th>
            </tr>
          </thead>
          <tbody>
            {factura.map((data, i) => (
              <tr key={data.id} className="bg-white">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                >
                  {products[i]?.marca} {products[i]?.model}
                </th>
                <td className="py-4 px-6">{data.cantidad}</td>
                <td className="py-4 px-6">${products[i]?.price}</td>
                <td className="py-4 px-6"> {data.date}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={totalview}>
              <th scope="row" className="py-3 px-6 text-base">
                Total
              </th>
              <td className="py-3 px-6">{e}</td>
              <td className="py-3 px-6">${q}</td>
              <td className="py-3 px-6"></td>
              <td className="py-3 px-6"></td>
            </tr>
            <button
              className="font-semibold p-2 bg-yellow-400 rounded"
              onClick={getPrice}
            >
              Show More
            </button>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
