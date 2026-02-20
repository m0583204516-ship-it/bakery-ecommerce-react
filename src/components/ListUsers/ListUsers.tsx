import React, {type FC, useEffect } from 'react';
import './ListUsers.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ListUsersProps {
    
}

const ListUsers: FC<ListUsersProps> = () => {
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = React.useState<any[]>([]);
    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then((res: any) => {
                setAllUsers(res.data);
            })
            .catch((err: any) => {
                console.error(" Error fetching users:", err);
            });
    }, [])

    
    return<div className='AllUsers'>
        <h1>כל המשתמשים</h1>
        <table>
            <thead>
                <tr>
                    <th>שם מלא</th>
                    <th>דוא"ל</th>
                    <th>סיסמה</th>
                    <th>תפקיד</th>
                </tr>
            </thead>
            <tbody>
                {allUsers.map((user: any) => (
                    <tr key={user.id}>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.role === 'admin' ? 'מנהל' : 'לקוח'}</td>
                    </tr>
                ))}
            </tbody>
        </table>   
       
     <button onClick={() => navigate('/home')}>חזור לדף הבית</button>
    </div> 

}
export default ListUsers;