import Nav from "../../components/navbar";
import axios from "axios";
import { useState } from "react";

export default function Brands() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(true);
    const res = await axios.post("/api/brands", marca);
    console.log(res);
  };

  const handleChange = ({ target }) => {
    setMarca({ ...marca, [target.name]: target.value });
  };

  const [alert, setAlert] = useState(false);

  const [marca, setMarca] = useState({
    name: "",
  });

  return (
    <>
      <Nav></Nav>

      {alert ? (
        <div
          className="p-4 text-sm text-green-700 transition-all delay-100 duration-1000 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">Marca agregada con exito!</span>
        </div>
      ) : (
        <></>
      )}

      <form
        className="shadow-inner flex justify-center container mx-auto"
        method="post"
        action="/api/brands"
        onSubmit={handleSubmit}
      >
        <div className="w-96 flex my-4 place-items-center flex-col">
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Marca
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <button className="rounded-xl hover:rounded-none shadow-md hover:shadow-inner transition-all bg-cyan-300 px-5 py-2">
            ADD BRAND
          </button>
        </div>
      </form>
    </>
  );
}
