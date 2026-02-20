import { type FC, useEffect, useState, useMemo } from 'react';
import './Products.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from '../../models/Product';

interface ProductsProps {
  selectedCategory: string;
  searchQuery: string;
  onProductDeleted?: () => void;
}

const PRODUCTS_PER_PAGE = 20;

const Products: FC<ProductsProps> = (props:ProductsProps) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userRole = user?.role;

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [deleteMap, setDeleteMap] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const fetchProducts = async () => {
     setLoading(true);
    setError("");
    try {
      const categoryParam = props.selectedCategory === "כל המוצרים" ? "" : `category=${props.selectedCategory}`;
      
      const totalRes = await axios.get(`http://localhost:3000/products?${categoryParam}`);
      setTotalProducts(totalRes.data.length);

      const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
      const url = `http://localhost:3000/products?${categoryParam ? categoryParam + '&' : ''}_start=${start}&_limit=${PRODUCTS_PER_PAGE}`;
      
    await axios.get(url)
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error("Error fetching products:", err);
        return err;
      })
    } catch {
        setError("שגיאה בטעינת מוצרים");
    }
     setLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [props.selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [props.selectedCategory, currentPage]);

  const filteredProducts = useMemo(() => {
    const query = props.searchQuery.trim().toLowerCase();
    if (!query) return products;
    return products.filter(p => p.name.toLowerCase().includes(query));
  }, [products, props.searchQuery]);

  const toggleDelete = (id: string) => {
    setDeleteMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      fetchProducts();
      props.onProductDeleted?.();
    } catch {
      setError("שגיאה במחיקה");
    }
  };

  const goToDetails = (product: ProductModel) => {
    navigate(`/home/product/${product.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="Products">
      <h1 className="section-title">{props.selectedCategory}</h1>

      {error && <p className="error">{error}</p>}
      {!error && filteredProducts.length === 0 && (
        <div className="no-results">
          <p>😔 לא נמצאו מוצרים</p>
          {props.searchQuery && (
            <p className="suggestion">נסה לחפש משהו אחר או בחר קטגוריה אחרת</p>
          )}
        </div>
      )}

      <div className="products-grid">
        {filteredProducts.map(prod => (
          <div className="product-card" key={prod.id}>
            {userRole === 'admin' && (
              <div className="admin-actions">
                <img
                  id="trash"
                  src="/images/trash.png"
                  alt="מחק"
                  onClick={() => toggleDelete(prod.id)}
                />
                {deleteMap[prod.id] && (
                  <div className="delete-confirmation">
                    <p>למחוק את המוצר סופית?</p>
                    <button onClick={() => deleteProduct(prod.id)}>מחק</button>
                    <button onClick={() => toggleDelete(prod.id)}>בטל</button>
                  </div>
                )}
              </div>
            )}

            <img
              src={prod.imageUrl}
              alt={prod.name}
              onClick={() => goToDetails(prod)}
              loading="lazy"
            />

            <div className="product-info">
              <h3>{prod.name}</h3>
              <div className="price-rating">
                <span className="price">₪{prod.price}</span>
              </div>
              <p className="stock">{prod.stock === 0 && 'אזל מהמלאי'}</p>
              <button onClick={() => goToDetails(prod)}>הצג מוצר</button>
            </div>
          </div>
        ))}
      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
