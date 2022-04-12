import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk, loginThunk } from '../redux/actions';
import '../styles/navbar.css'
import Cart from './Cart';

const Navbar = () => {

    const [ isLoginOpen, setIsLoginOpen ] = useState(false);
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState(""); 

    const [ loginError, setLoginError ] = useState("");

    const dispatch = useDispatch();

    const openCart = ()=>{
        setIsCartOpen(!isCartOpen);
        dispatch(getCartThunk())
      /*   .catch(error => {
            setLoginError(error?.response.data.message)
        }) */
    }

    const login = e =>{
        e.preventDefault();
        const credentials = {email, password }
            dispatch(loginThunk(credentials))
            .then(res => {
                localStorage.setItem("token", res.data.data.token);
                setLoginError("");
                setIsLoginOpen(false)
            }) 
            .catch(error => {
                setLoginError(error.response.data.message)
            })
    }

    return (
        
   
        <nav className='navbar navbar-light bg-light'>
            <Link to={'/'} className="text-decoration-none"  ><strong>e-commerce </strong></Link>
            
            <form>
            <button onClick={()=> setIsLoginOpen(!isLoginOpen)} className="btn btn-outline-danger me-2" type="button" >
            <i className="fas fa-user"></i>
            </button>
            <button className="btn btn-outline-danger me-2" type="button"><i className="fas fa-archive"></i></button>
            {/* este boton abre modal de Cart y ejecuta el thank "getCartThunk" */}
            <button onClick={openCart} className="btn btn-outline-danger me-2" type="button" >
            <i className="fas fa-shopping-cart"></i>
            </button>
            </form>
            
        

            <form onSubmit={login} className={`login ${isLoginOpen ? 'open' : ''}`}>

                {

                localStorage.getItem("token") ?  (
                    <button onClick={()=> localStorage.setItem("token", "")} type="button">
                        LogOut
                    </button> 
                    ) : (
                        <>
                         <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            placeholder='email' 
                            />
                            <input 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='password' 
                            />
                            <p>{loginError}</p>
                            <button className="btn btn-danger">Login</button>
                        </>
                    )
                }
        
            </form>
            <Cart isOpen = {isCartOpen} />
            </nav>
    );
};

export default Navbar;