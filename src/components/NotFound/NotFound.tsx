import  { type FC } from 'react';
import './NotFound.scss';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = () => {
  const navigate = useNavigate();
  return<div className="NotFound">
    <h1>אופססס הדף שחיפשת אינו קיים .. 😒</h1>
    <h2>נסה לחזור לדף הבית או לבדוק את הקישור שהזנת</h2>
    <button onClick={() => navigate('/home')}>חזור לדף הבית</button>
  </div>
};

export default NotFound;
