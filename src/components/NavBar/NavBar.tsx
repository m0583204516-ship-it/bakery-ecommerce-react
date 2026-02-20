import  {type FC } from 'react';
import './NavBar.scss';
import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer/Footer';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => (
  <div className="NavBar">
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/home">
            <img src="/images/logo.png" />        
          </Link>
        </div>
        
        <div className="nav-links">
          <Link to='/home' className="nav-link"><img src="/images/home.png" alt="דף הבית" /></Link>
          <Link to='/home/about' className="nav-link"><img src="/images/about.png" alt="אודותינו" /></Link>
          <Link to='/home/user' className="nav-link"><img src="/images/user.png" alt="פרטי משתמש" /></Link>
        </div>
      </div>
    </nav>

    <main className="main-content">
      <Outlet />
    </main>
    
    <Footer />
  </div>
);

export default NavBar;


