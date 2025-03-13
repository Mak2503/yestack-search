import { Product } from "../types"
import "./ProductCard.css"

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt="thumbnail" />
      </div>
      <div className="product-content">
        <h4 className="product-title">{product.title}</h4>
        <p className="product-description">{product.description.slice(0, 100)}...</p>
        <div className="product-info">
          <p className="product-category">Category: {product.category}</p>
          <p className="product-color">Color: {product.color}</p>
        </div>
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard