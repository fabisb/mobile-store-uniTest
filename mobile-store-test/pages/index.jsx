import axios from "axios";
import Nav from "../components/navbar";
import Products from "../components/Products";

export default function Home({data}) {
  return (
    <>
      <Nav></Nav>
      <Products data={data}></Products>
      
    </>
  )
}


export const getServerSideProps = async context => {

  const { data } = await axios.get('http://localhost:3000/api/products')

  return {
    props: {
      data
    }
  }
}