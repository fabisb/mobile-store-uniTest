import axios from "axios";
import React from "react";
import Nav from "../../../../components/navbar";
import Productform from "../../../../components/productForm";


export default function EditProduct(data) {
  return (
    <>
      <Nav></Nav>
      <Productform
        data={data}
        method="POST"
        btn="Edit"
        colorbtn="bg-yellow-400"
      ></Productform>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { data } = await axios.get("http://localhost:3000/api/brands");
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
