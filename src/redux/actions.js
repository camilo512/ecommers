// 1. crear la propiedad en el objeto actions
// 2. creamos el case en el reducer con la propiedad que creamos en el paso 1
// 3. crear la función en el archivo actions
// 4. despachar en el componente o thunk la función creada en el paso 3

import axios from "axios"

export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsloading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
    setCarts: "SETCARTS"
}

// funcion para el token
const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const setProducts = products => ({
    type: actions.setProducts,
    payload: products
})

export const setIsloading = isLoading  => ({
    type: actions.setIsloading,
    payload: isLoading
})

export const setCategories = categories => ({
    type: actions.setCategories,
    payload: categories
})

export const setCarts = carts => ({
    type: actions.setCarts,
    payload: carts
})

export const getProductsThunk = () => {
    return dispatch => {
        dispatch(setIsloading(true));
         return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(()=> dispatch(setIsloading(false)));
    }
}

export const getCategoriesThunk = () =>{
    return dispatch => {
        dispatch(setIsloading(true));
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then(res => dispatch(setCategories(res.data.data.categories)))
        .finally(()=> dispatch(setIsloading(false)));
    }
}

export const filtrerCategoryThunk = id =>{
    return dispatch => {
        dispatch(setIsloading(true));
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(()=> dispatch(setIsloading(false)));
    }
}

export const filtrerProductThunk = search =>{
    return dispatch => {
        dispatch(setIsloading(true));
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${search}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(()=> dispatch(setIsloading(false)));
    }
}

export const loginThunk = credentials =>{
    return dispatch => {
        dispatch(setIsloading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
       
        .finally(()=> dispatch(setIsloading(false)));
    }
}

    
export const addCartThunk = products =>{
    return dispatch => {
        dispatch(setIsloading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', products, getConfig())
        // .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(()=> dispatch(setIsloading(false)));
    }
}

export const getCartThunk = () =>{
    return dispatch => {
        dispatch(setIsloading(true));
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig() )
        .then(res => dispatch(setCarts(res.data.data.cart.products)))
     /*    .catch(error =>{
            if(error.respone.status === 404){
                console.log("the car is empty")
            }
        }) */
        .finally(()=> dispatch(setIsloading(false)));
    }
}

export const deleteCarthunk = id =>{
    return dispatch => {
        dispatch(setIsloading(true));
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(res => dispatch(getCartThunk()))
        .finally(()=> dispatch(setIsloading(false)));
    }
}

// purchases
// axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
