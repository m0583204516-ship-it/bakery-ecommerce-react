import { type FC } from 'react';
import './Footer.scss';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-content">
        
        <div className="footer-section">
          <h3>קונדיטוריית הזהב</h3>
          <p>מאז 1985 אנחנו מכינים עבורכם את המתוקים הטעימים ביותר בעיר. כל מוצר מוכן בידיים מיומנות ובאהבה רבה.</p>
         
        </div>

        <div className="footer-section">
          <h4>קישורים מהירים</h4>
          <ul>
            <li>דף הבית</li>
            <li>אודותינו</li>
            <li>המוצרים שלנו</li>
            <li>צור קשר</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>הקטגוריות שלנו</h4>
          <ul>
            <li>עוגות חגיגיות</li>
            <li>עוגות מעוצבות</li>
            <li>עוגיות ומתוקים</li>
            <li>קינוחים אישיים</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>פרטי התקשרות</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="icon">📍</span>
              <span>רחוב הרצל 45, תל אביב</span>
            </div>
            <div className="contact-item">
              <span className="icon">📞</span>
              <span>03-1234567</span>
            </div>
            <div className="contact-item">
              <span className="icon">✉️</span>
              <span>info@goldenbakery.co.il</span>
            </div>
            <div className="contact-item">
              <span className="icon">🕒</span>
              <span>א'-ה': 7:00-20:00<br />ו': 7:00-15:00</span>
            </div>
          </div>
        </div>

      </div>
    
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 קונדיטוריית הזהב. כל הזכויות שמורות.</p>
          <div className="footer-links">
            <a href="#">תנאי שימוש</a>
            <a href="#">מדיניות פרטיות</a>
            <a href="#">עוגיות (Cookies)</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;