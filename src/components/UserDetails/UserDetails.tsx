import  { type FC, useState } from 'react';
import './UserDetails.scss';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface UserDetailsProps {}

const UserDetails: FC<UserDetailsProps> = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    let user = JSON.parse(localStorage.getItem('user') || 'null');
  
    const EditForm = useFormik({
        initialValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            password: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, 'שם פרטי חייב להכיל 2 תווים לפחות')
                .required('חובה למלא שדה זה'),
            lastName: Yup.string()
                .min(2, 'שם משפחה חייב להכיל 2 תווים לפחות')
                .required('חובה למלא שדה זה'),
            password: Yup.string()
                .min(6, 'סיסמה חייבת להכיל 6 תווים לפחות')
        }),
        onSubmit: async (values) => {
            setErrorMessage('');
            setSuccessMessage('');
            try {
                const updatedUser = {
                    ...user,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    ...(values.password && { password: values.password })
                };

                await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setSuccessMessage('הפרטים עודכנו בהצלחה');
                setIsEditing(false);
                user = updatedUser;
            } catch (err) {
                console.log('Update error:', err);
                setErrorMessage('שגיאה בעדכון הפרטים');
            }
        }
    });

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('../../login');
    };

    return (
        <div className="UserDetails">
            <h2>פרטי משתמש</h2>
            
            {!isEditing ? (
                <div className="user-info">
                    <p><strong>שם פרטי:</strong> {user?.firstName || 'לא זמין'}</p>
                    <p><strong>שם משפחה:</strong> {user?.lastName || 'לא זמין'}</p>
                    <p><strong>אימייל:</strong> {user?.email || 'לא זמין'}</p>
                    <p><strong>תאריך הרשמה:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('he-IL') : 'לא זמין'}</p>
                    <p><strong>תפקיד:</strong> {user?.role === 'admin' ? 'מנהל' : 'לקוח'}</p>
                    
                    {successMessage && <div className="success">{successMessage}</div>}
                    
                    <div className="buttons">
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>
                            <img src="/images/contract.png" alt="עריכה" />
                            ערוך פרטים
                        </button>
                        <button className="logout-btn" onClick={handleLogout}>
                            <img src="/images/logout.png" alt="יציאה" />
                            התנתק
                        </button>
                        {user?.role === 'admin' && (
                            <button onClick={() => navigate('../list-users')}>רשימת משתמשים</button>
                        )}
                    </div>
                </div>
            ) : (
                <form onSubmit={EditForm.handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label htmlFor="firstName">שם פרטי</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={EditForm.values.firstName}
                            onChange={EditForm.handleChange}
                            onBlur={EditForm.handleBlur}
                        />
                        {EditForm.touched.firstName && EditForm.errors.firstName && (
                            <div className="error">{String(EditForm.errors.firstName)}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">שם משפחה</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={EditForm.values.lastName}
                            onChange={EditForm.handleChange}
                            onBlur={EditForm.handleBlur}
                        />
                        {EditForm.touched.lastName && EditForm.errors.lastName && (
                            <div className="error">{String(EditForm.errors.lastName)}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">סיסמה חדשה (אופציונלי)</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="השאר ריק ללא שינוי"
                            value={EditForm.values.password}
                            onChange={EditForm.handleChange}
                            onBlur={EditForm.handleBlur}
                        />
                        {EditForm.touched.password && EditForm.errors.password && (
                            <div className="error">{String(EditForm.errors.password)}</div>
                        )}
                    </div>

                    {errorMessage && <div className="error">{errorMessage}</div>}

                    <div className="buttons">
                        <button type="submit" disabled={EditForm.isSubmitting}>שמור</button>
                        <button type="button" onClick={() => setIsEditing(false)}>בטל</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UserDetails;
