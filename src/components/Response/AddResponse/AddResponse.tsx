import React, {  useRef, type FC} from 'react';
import './AddResponse.scss';
import axios from 'axios';
import type { ResponseModel } from '../../../models/Response';

interface AddResponseProps {
    onClose: () => void;
    productId: string;
    productName: string;
}


const AddResponse: FC<AddResponseProps> = ({ onClose , productId, productName}) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [message, setMessage] = React.useState<string>("");
    const [rating, setRating] = React.useState<string>("5");
    const commentRef = useRef<HTMLTextAreaElement>(null);

    const addRess = async(event: React.FormEvent) => {
        event.preventDefault();
        const comment = commentRef.current?.value || "";
        const responseData: ResponseModel = {
            id: crypto.randomUUID(),
            productId: productId,
            userID: user.id,
            productName: productName,
            rating: Number(rating),
            comment: comment,
            createdAt: new Date()
          };    
		try{
			const res = await axios.post(`http://localhost:3000/reviews`, responseData);
			if (res.data) {
                setMessage("התגובה נוספה בהצלחה!"); 
                setTimeout(() => {
                    (event.target as HTMLFormElement).reset();     
                    onClose(); 
                }, 1500);
                                       
			} else {
                setMessage("הוספת התגובה נכשלה. אנא נסה שוב.");
			}
	    }
	    catch(err){
			console.log('Error adding product:', err);
			setMessage('שגיאה בהתחברות לשרת. אנא ודא שהשרת רץ');
		}

    };

    const handleCancel = () => {
        setRating("5");
        setMessage("");
        if (commentRef.current) commentRef.current.value = "";
        onClose();
    };
   
    return<div className="response">
             <h1>הוספת תגובה חדשה</h1>
            <form onSubmit={addRess} >
                <div className="rating">
                    <label htmlFor="rating">דירוג (1-5) כוכבים:</label>
                    <select id="rating" name="rating" value={rating} onChange={(e) => setRating(e.target.value)}>                   
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="1">⭐</option>
                    </select>
                </div>
                <div className="comment">
                    <label htmlFor="comment">תגובה:</label>
                    <textarea id="comment" name="comment" placeholder="כתוב את התגובה שלך כאן..." ref={commentRef}></textarea>
                </div>
                <button type='submit'>הוסף תגובה</button>
                <button type='button' onClick={handleCancel}>ביטול</button>
            </form>
            {message && <p className="message">{message}</p>}                        
        </div>                 
}



export default AddResponse;