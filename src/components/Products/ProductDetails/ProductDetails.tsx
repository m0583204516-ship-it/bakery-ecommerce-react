import {type FC, useEffect, useState } from 'react';
import './ProductDetails.scss';
import { ProductModel } from '../../../models/Product';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ResponseModel } from '../../../models/Response';
import Response from '../../Response/Response';
import AddResponse from '../../Response/AddResponse/AddResponse';

const ProductDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [allResponses, setAllResponses] = useState<ResponseModel[]>([]);

  const handleDeleteResponse = (id: string) => {
    setAllResponses(prevResponses => prevResponses.filter(r => r.id !== id));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    axios.get(`http://localhost:3000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log('Error fetching product:', err));

    axios.get(`http://localhost:3000/reviews?productId=${id}`)
      .then(res => setAllResponses(res.data))
      .catch(err => console.log('Error fetching responses:', err));
  }, [id]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [addResponse, setAddResponse] = useState<boolean>(false);

  const addRess = async()=>{
      await axios.get(`http://localhost:3000/reviews?productId=${id}`)
        .then(res => setAllResponses(res.data))
        .catch(err => console.log('Error fetching responses:', err));
      setAddResponse(false);
  }

  if (!product) return <div>טוען מוצר...</div>;

  return (
    <div className="ProductPage">
      <div className="product-main">
        <div className="details-container">
          <h1 className="product-name">{product.name}</h1>
          <p className="description">{product.description}</p>
          <div className="price-rating">
            <span className="price">₪{product.price}</span>
          </div>
          <div className="quantity-stock">        
            <p className="stock">מלאי: {product.stock}</p>
          </div>
          <p className="created">נוצר בתאריך: {new Date(product.createdAt).toLocaleDateString('he-IL')}</p>
        </div>
        <div className="image-container">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      </div>
      <div className="responses-section">
        {user?.role === 'user' && (
          <div className="add-response">
          <button onClick={() => setAddResponse(!addResponse)}>הוסף תגובה</button>
          {
            addResponse && <AddResponse onClose={addRess} productId={product.id} productName={product.name} />
          }
          </div>
        )}
        <h2>תגובות על המוצר</h2>
        {allResponses.length === 0 ? (
          <p>אין תגובות עדיין. תהיה הראשון להגיב!</p>
        ) : (
          <div className="responses-list">
            {allResponses.map(response => (
              <Response key={response.id} response={response} onDelete={handleDeleteResponse} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
