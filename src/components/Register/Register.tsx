import React, {useState, type FC } from 'react';
import '../Login/Login.scss';
import {  useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { UserModel } from '../../models/User';


interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
	const [messageRegister, setMessageRegister] = React.useState<string>('');
    const [toLogin,setToLogin] = useState(false);
	const _navigate=useNavigate()
	
	const RegisterForm = useFormik({
		initialValues:{
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			role: 'user'
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
            .min(2, 'שם פרטי חייב להכיל לפחות 2 תווים')
            .required('חובה למלא שם פרטי'),
        
			lastName: Yup.string()
				.min(2, 'שם משפחה חייב להכיל לפחות 2 תווים')
				.required('חובה למלא שם משפחה'),
			
			email: Yup.string()
				.email('כתובת אימייל לא תקינה')
				.required('חובה למלא אימייל'),
			
			password: Yup.string()
				.min(6, 'סיסמה חייבת להכיל לפחות 6 תווים')
				.matches(/[0-9]/, 'הסיסמה חייבת להכיל לפחות ספרה אחת')
				.required('חובה למלא סיסמה'),
				
		}),
		onSubmit: async(values) => {		
			setMessageRegister('');
			try{
				const newUser: UserModel = {
					...values, 
					id: crypto.randomUUID(), 
					createdAt: new Date()
				};
				const userExists = await axios.get(`http://localhost:3000/users?email=${values.email}`);
				if (userExists.data && userExists.data.length > 0) {
					setMessageRegister("משתמש עם האימייל הזה כבר קיים.");
					return;
				}
				const res = await axios.post(`http://localhost:3000/users`, newUser);
				if (res.status === 201) {
					setMessageRegister("נרשמת בהצלחה!");
						setMessageRegister('');
                        setToLogin(true);						
        		}			
			}
			catch(err){
				console.error('Registration error:', err);
			}		
		}	
				
	});
	return <div className="login-page">
		<div className="login-container">
			<div className="login-header">
				<img src="/images/logo.png" alt="Logo" className="login-logo" />
			</div>
			<form onSubmit={RegisterForm.handleSubmit} className="login-form">
				<h3>הרשמה</h3>
				<div className="form-group">
					<label htmlFor="firstName">שם פרטי</label>
					<input 
						type="text" 
						placeholder="הכנס/י שם פרטי" 
						id="firstName" 
						name="firstName" 
						value={RegisterForm.values.firstName} 
						onChange={RegisterForm.handleChange}
						onBlur={RegisterForm.handleBlur}
						/>
					{RegisterForm.touched.firstName && RegisterForm.errors.firstName && <div className="error">{RegisterForm.errors.firstName}</div>}
				</div>

				<div className="form-group">
					<label htmlFor="lastName">שם משפחה</label>
					<input 
						type="text" 
						placeholder="הכנס/י שם משפחה" 
						id="lastName" name="lastName" 
						value={RegisterForm.values.lastName} 
						onChange={RegisterForm.handleChange} 
						onBlur={RegisterForm.handleBlur}/>
					{RegisterForm.touched.lastName && RegisterForm.errors.lastName && <div className="error">{RegisterForm.errors.lastName}</div>}
				</div>
			
				<div className="form-group">
					<label htmlFor="email">אימייל</label>
					<input 
						placeholder="הכניס/י כתובת אימייל" 
						id="email" name="email" 
						value={RegisterForm.values.email} 
						onChange={RegisterForm.handleChange}
						onBlur={RegisterForm.handleBlur}
					/>
					{RegisterForm.touched.email && RegisterForm.errors.email && <div className="error">{RegisterForm.errors.email}</div>}
				</div>
			
				<div className="form-group">
					<label htmlFor="password">סיסמה</label>
					<input  
						type="password" 
						placeholder="הכנס/י סיסמה" 
						id="password" 
						name="password" 
						value={RegisterForm.values.password} 
						onBlur={RegisterForm.handleBlur}
						onChange={RegisterForm.handleChange}
					/>
					{RegisterForm.touched.password && RegisterForm.errors.password && <div className="error">{RegisterForm.errors.password}</div>}
				</div>
			
				
				{messageRegister && <div className={messageRegister.includes('בהצלחה') ? 'success' : 'error'}>{messageRegister}</div>}
                {toLogin ? <>
					<p>!נרשמת בהצלחה</p>
					<button onClick={()=> _navigate('../login') }>עבור לדף התחברות</button>
				</>:
				<>
					<button type='submit' disabled={RegisterForm.isSubmitting}>הרשמה</button>
					<button type='button'  onClick={() => _navigate('../login')}>כבר יש לך חשבון? התחבר/י כאן</button>
				</>
				}
				
			</form>
		</div>
	</div>	
}

export default Register;








   