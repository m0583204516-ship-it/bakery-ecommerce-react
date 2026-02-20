
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Login/Login'
import About from './components/About/About'
import NavBar from './components/NavBar/NavBar'
import ProductDetails from './components/Products/ProductDetails/ProductDetails'
import UserDetails from './components/UserDetails/UserDetails'
import ListUsers from './components/ListUsers/ListUsers'
import Register from './components/Register/Register'

function App() {
 
  return (
    <div className='app'>
      <Routes>
       <Route path="/" element={<Navigate to="/login" replace />} />
       <Route path='/login' element={<Login />} />
       <Route path='/register' element={<Register />} />
       <Route path='home' element={<NavBar />}>
              <Route path='' element={<HomePage />} />
              <Route path='user' element={<UserDetails />} />
              <Route path='about' element={<About />} />
              <Route path='product/:id' element={<ProductDetails />} />
              <Route path='list-users' element={<ListUsers />} /> 
              <Route path='not-found' element={<NotFound />} />
        </Route>
        <Route path='*' element={<Navigate to="/home/not-found" replace />} />
      </Routes>
    </div>
  )
}

export default App
