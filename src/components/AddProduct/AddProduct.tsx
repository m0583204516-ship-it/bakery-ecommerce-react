import React, { type FC } from 'react';
import './AddProduct.scss';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup";
import { ProductModel } from '../../models/Product';

interface AddProductProps {
    onClose: () => void;
}

const AddProduct: FC<AddProductProps> = ({ onClose }) => {

    const [massage, setMassage] = React.useState<string>("");
    const addProd = useFormik({
		initialValues:{
            name: "",
            description: "",
            price: 0,
            category: "",
            imageUrl: "",
            stock: 0,
            rating: 0,
		},
		validationSchema: Yup.object({
			name: Yup.string().required("שדה חובה"),
            description: Yup.string().required("שדה חובה").min(10, "התיאור חייב להיות לפחות 10 תווים"),
            price: Yup.number().required("שדה חובה").min(0),
            category: Yup.string().required("שדה חובה").oneOf(["עוגות", "עוגות מעוצבות", "קינוחים", "עוגיות"]),
            imageUrl: Yup.string().url("כתובת תמונה חייבת להיות URL תקף"),
            stock: Yup.number().min(0),
		}),

		onSubmit: async(values) => {
            const productData: ProductModel = {
                id: crypto.randomUUID(),
                name: values.name,
                description: values.description,
                price: values.price,
                category: values.category,
                imageUrl: values.imageUrl,
                stock: values.stock,
                createdAt: new Date().toISOString()
            };
			
			try{
				const res = await axios.post(`http://localhost:3000/products`, productData);
				if (res.data) {
                    setMassage("המוצר נוסף בהצלחה!"); 
                    addProd.resetForm(); 
                    setTimeout(() =>{
                        setMassage("");
                         onClose();
                    },1000)
                                                
				} else {
                    setMassage("הוספת המוצר נכשלה. אנא נסה שוב.");
				}
			}
			catch(err){
				console.log('Error adding product:', err);
				setMassage('שגיאה בהתחברות לשרת. אנא ודא שהשרת רץ');
			}
		}				
	});


    return<div className='dialog'>
             <h1>הוספת מוצר חדש</h1>
            <form onSubmit={addProd.handleSubmit}>
                <div className="nameProduct">
                    <label htmlFor="name">שם מוצר:</label>
                    <input type="text"
                     id="name" 
                     name="name" 
                     placeholder="שם מוצר" 
                     onChange={addProd.handleChange} 
                     value={addProd.values.name} />
                    {addProd.errors.name && addProd.touched.name && <p className="error">{addProd.errors.name}</p>}
                </div>
                <div className="description">
                    <label htmlFor="description">תיאור:</label>
                    <input type="text" id="description" name="description" placeholder="תיאור מוצר" onChange={addProd.handleChange} value={addProd.values.description} />
                    {addProd.errors.description && addProd.touched.description && <p className="error">{addProd.errors.description}</p>}
                </div>
                <div className="price">
                    <label htmlFor="price">מחיר:</label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        placeholder="מחיר" 
                        onChange={addProd.handleChange} 
                        value={addProd.values.price} />
                    {addProd.errors.price && addProd.touched.price && <p className="error">{addProd.errors.price}</p>}
                </div>
                <div className="category">
                    <label htmlFor="category">קטגוריה:</label>
                    <select
                        id="category"
                        name="category"
                        onChange={addProd.handleChange}
                        value={addProd.values.category}>
                        <option value="">בחר קטגוריה</option>
                        <option value="עוגות">עוגות</option>
                        <option value="עוגות מעוצבות">עוגות מעוצבות</option>
                        <option value="קינוחים">קינוחים</option>
                        <option value="עוגיות">עוגיות</option>
                    </select>
                    {addProd.errors.category && addProd.touched.category && (
                        <p className="error">{addProd.errors.category}</p>
                    )}
                </div>
                <div className='img'>
                    <label htmlFor="imageUrl">URL של תמונה:</label>
                    <input 
                        type="text" 
                        id="imageUrl" 
                        name="imageUrl" 
                        placeholder="URL של תמונה" 
                        onChange={addProd.handleChange} 
                        value={addProd.values.imageUrl} />
                    {addProd.errors.imageUrl && addProd.touched.imageUrl && <p className="error">{addProd.errors.imageUrl}</p>}
                </div>
                <div className="stock">
                    <label htmlFor="stock">מלאי:</label>
                    <input 
                        type="number" 
                        id="stock" name="stock" 
                        placeholder="מלאי" 
                        onChange={addProd.handleChange} 
                        value={addProd.values.stock} />
                    {addProd.errors.stock && addProd.touched.stock && <p className="error">{addProd.errors.stock}</p>}
                </div>  
                <button type='submit'>הוסף מוצר</button>
                <button type='button' onClick={onClose}>ביטול</button>
            </form>  
             {massage && <p className="message">{massage}</p>}        
        </div>  
                
}
export default AddProduct;