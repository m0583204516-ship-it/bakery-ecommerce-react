
import React, { useState } from "react";
import { ResponseModel } from "../../models/Response";
import "./Response.scss";
import axios from "axios";

interface ResponseProps {
  response: ResponseModel;
  onDelete?: (id: string) => void; 
}

const Response: React.FC<ResponseProps> = ({ response, onDelete }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [toDelete, setToDelete] = useState<boolean>(false); 
   const deleteProduct = (id: string) => {
    axios.delete(`http://localhost:3000/reviews/${id}`)
      .then(() => {
        console.log("Response deleted successfully");
        onDelete && onDelete(response.id);
      })
      .catch(err => console.log("Error deleting response:", err));
  };
  return (
    <div className="response-card">
      <div className="response-header">
        <span className="date">
          {new Date(response.createdAt).toLocaleDateString("he-IL")}
        </span>
      </div>
      <div className="response-info">
        <div className="info-row">
          <span className="label">מוצר:</span>
          <span className="value">{response.productName}</span>
        </div>
        <div className="info-row">
          <span className="label">דירוג:</span>
          <span className="value">{"⭐".repeat(response.rating)}</span>
        </div>
        <div className="info-row">
          <span className="label">תגובה:</span>
          <p className="value comment">{response.comment}</p>
        </div>
        <div className="info-row ids">
          <span className="label">משתמש מאומת</span>{
              user?.id === response.userID && (
                <div className="deleteResponse">
                <img id="trash" src="/images/trash.png" onClick={() => setToDelete(!toDelete)}/> 
                {
                  toDelete && (
                        <div className="delete-confirmation">
                          <p>למחוק את התגובה סופית?</p>
                          <button  onClick={() => deleteProduct(response.id)}>מחק</button>
                          <button onClick={() => setToDelete(false)}>בטל</button>
                        </div>    
                      )
                }
                </div>
            )}       
        </div>
      </div>
    </div>
  );
};

export default Response;
