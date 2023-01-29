import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Productform({ data, method, btn, colorbtn }) {
  const btnclass = `rounded-xl hover:rounded-none shadow-md hover:shadow-inner transition-all ${colorbtn} px-5 py-2`;
  const router = useRouter();
  const [product, setProduct] = useState({
    model: "",
    capacity: "",
    price: 0,
    year: 0,
    marca: "",
    img: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (router.query.id) {
      const res = await axios.put("/api/products/" + router.query.id, product);
      console.log(res);
    } else {
      const res = await axios.post("/api/products", product);
      console.log(res);
    }
    router.push("/");
  };
  const handleChange = ({ target }) => {
    setProduct({ ...product, [target.name]: target.value });
  };

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get("/api/products/" + router.query.id);
      setProduct(data);
    };

    if (router.query?.id) {
      getProduct(router.query.id);
    }
  }, []);

  return (
    <>
      <form
        className="shadow-inner flex justify-center container mx-auto"
        method={method}
        action="/api/products"
        onSubmit={handleSubmit}
      >
        <div className="w-96 flex my-4 place-items-center flex-col">
          <select
            selected
            name="marca"
            onChange={handleChange}
            className="bg-gray-50 mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option>Selecciona una marca</option>
            {data.data.map((marca) => (
              <option value={marca.name} key={marca.id}>
                {marca.name}
              </option>
            ))}
          </select>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Modelo
            </label>
            <input
              type="text"
              name="model"
              value={product.model}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <label className="block mb-1 my-2 text-sm font-medium text-gray-900">
              Capacidad
            </label>
            <input
              type="number"
              onChange={handleChange}
              name="capacity"
              value={product.capacity}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <label className="block mb-1 my-2 text-sm font-medium text-gray-900">
              Año de lanzamiento
            </label>
            <input
              type="number"
              min="2000"
              max="2999"
              onChange={handleChange}
              name="year"
              value={product.year}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <label className="block mb-1 my-2 text-sm font-medium text-gray-900">
              Precio
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              onChange={handleChange}
              name="price"
              pattern="^\d+(?:\.\d{1,2})?$"
              value={product.price}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Direccion de la imagen
            </label>
            <textarea
              type="text"
              name="img"
              rows="3"
              cols="50"
              value={product.img}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <button className={btnclass}> {btn} </button>
        </div>
      </form>
    </>
  );
}
