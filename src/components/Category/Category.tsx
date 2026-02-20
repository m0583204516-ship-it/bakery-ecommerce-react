import { type FC } from 'react';
import './Category.scss';

interface CategoryProps {
  imgUrl: string;
  name: string;
  onClick: (name: string) => void;
}

const Category: FC<CategoryProps> = ({ imgUrl, name, onClick }) => {
  return (
    <div 
     className="Category row"
      onClick={() => onClick(name)}
    >
      <img src={imgUrl} alt={name} loading="lazy" />
      <h3>{name}</h3>
    </div>
  );
};

export default Category;
