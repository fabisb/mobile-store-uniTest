import React from "react";
import Nav from "../../components/navbar";
import Productform from "../../components/productForm";
import axios from "axios";

export default function Add(data) {
  return (
    <>
      <Nav></Nav>
      <Productform
        data={data}
        method="POST"
        btn="ADD"
        colorbtn="bg-green-400"
      ></Productform>
    </>
  );
}

export const getServerSideProps = async context => {

  const { data } = await axios.get('http://localhost:3000/api/brands')
  console.log(data)
  return {
    props: {
      data
    }
  }
}
