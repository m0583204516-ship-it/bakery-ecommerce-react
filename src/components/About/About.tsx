
import './About.scss';

const About = () => {
  return (
    <div className="AboutPage">

      <div className="about-wrapper">

        <div className="about-image">
          <img
            src="/images/background.jpg"
            alt="Cookies and milk"
          />
        </div>

        <div className="about-container">
          <h1>אודותינו</h1>

          <p>
            הכול התחיל מרגע קטן אחד. מטבח שקט, ריח של עוגה חמה בתנור
            וספל קפה שמחכה על השיש.
          </p>

          <p>
            לא הייתה חנות, לא היה אתר — רק אהבה אמיתית לאוכל שמחמם את הלב.
          </p>

          <div className="highlight">
            אנחנו מאמינים שאוכל טוב הוא לא רק טעם —  
            הוא זיכרון, חוויה ורגע של שמחה.
          </div>

          <h2>אוכל שנוצר מאהבה</h2>
          <p>
            כל מוצר באתר נבחר בקפידה — החל מחומרי הגלם,
            דרך העיצוב ועד הפרט האחרון.
          </p>

          <h2>הערכים שלנו</h2>
          <ul>
            <li>איכות ללא פשרות</li>
            <li>טריות יומיומית</li>
            <li>שירות אישי וחם</li>
            <li>אהבה לפרטים הקטנים</li>
          </ul>

          <p className="thanks">
            תודה שבחרת להיות חלק מהדרך שלנו 🤍
          </p>
        </div>

      </div>
     
    </div>
  );
};

export default About;
