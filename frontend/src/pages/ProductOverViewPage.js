import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductOverview from '../components/ProductOverview'
import { useParams } from 'react-router-dom'

const ProductOverViewPage = () => {
  const {id} = useParams()
  return (
    <div>
      <Navbar/>
      <ProductOverview id={id}/>
      <Footer/>
    </div>
  )
}

export default ProductOverViewPage
