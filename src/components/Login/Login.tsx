import React, {type FC, useEffect } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { UserModel } from '../../models/User';


interface LoginProps {}

const Login: FC<LoginProps> = () => {
	const [errorMessageLogin, setErrorMessageLogin] = React.useState<string>('');
	const _navigate = useNavigate()
	useEffect(() => {
		localStorage.removeItem('user');
	}, []);
	const LoginForm = useFormik({
		initialValues:{
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('כתובת המייל לא חוקית')
				.required('חובה למלא שדה זה'),
			password: Yup.string()
				.required('חובה למלא שדה זה')
		}),
		onSubmit: async(values) => {
			console.log('Login values:', values);
			setErrorMessageLogin('');
			try{
				const res = await axios.get(`http://localhost:3000/users?email=${values.email}&password=${values.password}`);
				if (res.data && res.data.length > 0) {
					const user: UserModel = res.data[0];
					localStorage.setItem("user", JSON.stringify(user));			
					_navigate('/home');
				} else {
					setErrorMessageLogin('אימייל או סיסמה שגויים');
				}
			}
			catch(err){
				console.log('Login error:', err);
				setErrorMessageLogin('שגיאה בהתחברות לשרת. אנא ודא שהשרת רץ');
			}
		}				
	});
		return <div className="login-page">
		<div className="login-container">
				<div className="login-header">
					<img src="/images/logo.png" alt="Logo" className="login-logo" />
				</div>
				<form onSubmit={LoginForm.handleSubmit} className="login-form">
				<h3>התחברות</h3>
				<div className="form-group">
					<label htmlFor="useremail">אימייל</label>
					<input 
						type="email" 
						placeholder="הכניס/י כתובת אימייל" 
						id="useremail" name="email" 
						value={LoginForm.values.email} 
						onBlur={LoginForm.handleBlur}
						onChange={LoginForm.handleChange}
					/>
					{LoginForm.touched.email && LoginForm.errors.email && <div className="error">{LoginForm.errors.email}</div>}
				</div>
				<div className="form-group">
					<label htmlFor="password">סיסמה</label>
					<input  
						type="password" 
						placeholder="הכנס/י סיסמה" 
						id="password" 
						name="password" 
						value={LoginForm.values.password} 
						onChange={LoginForm.handleChange}
						onBlur={LoginForm.handleBlur}
					/>
					{LoginForm.touched.password && LoginForm.errors.password && <div className="error">{LoginForm.errors.password}</div>}
				</div>
				<button type='submit' disabled={LoginForm.isSubmitting}>התחברות</button>
				{errorMessageLogin && <div className="error">{errorMessageLogin}</div>}
				<button type='button' onClick={() => _navigate('../register')}>אין לך חשבון? הרשם/י כאן</button>
			</form>
		</div>
	</div>
}
export default Login;








   