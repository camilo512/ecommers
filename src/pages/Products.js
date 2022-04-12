import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCartThunk, getProductsThunk } from '../redux/actions'

const Products = () => {

    const dispatch = useDispatch();
    const { id } = useParams(); 

    //LISTA DE PRODCUTOS FILTRADOS
    const [ productsFiltered, setProductsFiltered ] = useState([]);

    //estado para controlar la cantidada agregar al carr0
    const [ quantity, setQuantity ] = useState(0); 


    const products = useSelector(state => state.products);
    
      useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch]);
    
    const productsFound = products.find(productsDetail => productsDetail.id === Number(id));
    // console.log(productsFound?.category)
    // console.log(products[0].id, id)
    // console.log(productsFound);

    useEffect(()=>{
        if(productsFound){

            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productsFound?.category.id}`)
            .then(res => setProductsFiltered(res.data.data.products));
        }
    }, [dispatch, productsFound ]);


    const addCar = ()=>{
        const products = {
            id: id,
            quantity:  quantity
        }
        dispatch(addCartThunk(products));
    }
       
//    console.log(productsFiltered)

    return (

        <div>


            <section className='news-detail'>
 
                    <h1>{productsFound?.title}</h1>
                    <p>{productsFound?.description}</p>
                    <p>Price: <b>{productsFound?.price}</b></p>
                    <img src={productsFound?.productImgs[2]} alt="" />

                    <div className="carts">
                        <div className="input-container">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="text" id="quantity" 
                            value={quantity} 
                            onChange={e => setQuantity(e.target.value)}
                            />
                        </div>
                        <button onClick={addCar}>Add to Cart </button>
                    </div>

                    <ul className='products-list'>
                        <p>More Products</p>
                        {
                            productsFiltered.map(product => (
                                
                                <li key={product.id}>
                                    <Link to={`/product/${product.id}`}> {product.title} </Link>
                                    <img src={product.productImgs[0]} alt="" />
                                <p>$ {product.price}</p>
                                </li>
                            ))
                        }
                    </ul>

                        

                </section>
                
        </div>
    
        
    );
};

export default Products;