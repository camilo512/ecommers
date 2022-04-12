import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filtrerCategoryThunk, filtrerProductThunk, getCategoriesThunk, getProductsThunk } from '../redux/actions';

const Home = () => {
    const products = useSelector (state => state.products);
    const categories = useSelector (state => state.categories);
    const [ search, setSearch ] = useState("");
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    const searchProduct = e => {
        e.preventDefault();
       dispatch(filtrerProductThunk(search));
    }

    // console.log(products)
    //console.log(categories)
    


    return (

        
        
        <div>    
            <form onSubmit={searchProduct} className="container">
                <div className="row height d-flex justify-content-center align-items-center" >
                <div className="col-md-8">
                <div className="search" >  
       
                <input 
                type="text" 
                className="form-control" 
                placeholder='search product'
                value={search}
                onChange={e => setSearch(e.target.value)}
                
                />
                <button className="btn btn-danger">
                    Search 
                    </button>
                </div>
                </div>
                </div>
            </form>

            
            <div className="container-aside">
                <aside>
                <p><strong>filter category</strong></p>
                    {
                     categories.map(category => (
                         
                    <button  type="button" className="list-group-item list-group-item-action list-group-item-light" 
                    key={category.id} 
                    onClick={() => dispatch(filtrerCategoryThunk(category.id))}
                    >
                    {category.name}
                    </button>
                         ))  
                    }
                </aside>

           

                <section className="row row-cols-1 row-cols-md-3 g-3 w-75" >

                {
                products.lenght === 0 ? (
                    <p>We didnt found products with the filters</p>
                    ) : (
                        products.map(product => (
                         <div key={product.id} className="col">
                             <div className="card h-100">

                                <div className='images-hover'>
                                <img className='over' src={product.productImgs[1]}  width="390" height="180" alt=""  />
                                <img src={product.productImgs[0]}   width="390" height="180" alt=""  />
                                </div>
                                
                           
                                <div className="card-body">
                                     <h5 className="card-title"> <Link className="text-decoration-none" to={`/product/${product.id}`}>{product.title}</Link></h5>
                                <p  className="text-secondary">$ {product.price}</p>
                                </div>
                                 <div className="card-footer">
                                    <small className="text-muted"> <Link to={`/product/${product.id}`}><button className="btn btn-danger"><i className="fas fa-shopping-cart"></i> </button></Link></small>
                                </div>
                            </div>
                         
                        </div>
                        
                    ))  
                )
               
            } 
                    </section>
            </div>
                
            
        </div> 
        
    );
    
};

export default Home;