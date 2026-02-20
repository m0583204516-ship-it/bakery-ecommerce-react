import { type FC, useEffect, useState } from 'react';
import './HomePage.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Category from '../Category/Category';
import AddProduct from '../AddProduct/AddProduct';
import Products from '../Products/Products';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userRole = user?.role;

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("כל המוצרים");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      navigate('../login');
    }
    axios.get("http://localhost:3000/Categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log("Error fetching categories:", err));
  }, []);

  const handleAddProductClose = () => {
    setOpenAddProduct(false);
  };

  return (
    <div className="HomePage">
      {userRole === 'admin' && (
        <div className="admin-buttons">
          <button onClick={() => setOpenAddProduct(true)}>הוסף מוצר</button>
          <button onClick={() => navigate('list-users')}>כל המשתמשים</button>
          {openAddProduct && <AddProduct onClose={handleAddProductClose} />}
        </div>
      )}

      <input
        type="text"
        className="search-bar"
        placeholder={`חפש מוצר ב${selectedCategory}...`}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <h1 className="section-title">קטגוריות</h1>
      <div className="categories-container">
        {categories.map(cat => (
          <Category
            key={cat.id}
            name={cat.name}
            imgUrl={cat.imageUrl}
            onClick={() => setSelectedCategory(cat.name)}
          />
        ))}
      </div>

      <Products 
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onProductDeleted={handleAddProductClose}
      />
    </div>
  );
};

export default HomePage;
 