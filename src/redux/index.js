import { actions } from "./actions";

const INITIAL_STATE = {
    products: [],
    isLoading: false,
    categories:[],
    carts: []
}

const reducer = (state = INITIAL_STATE, action) => {
		switch(action.type){

            case actions.setProducts:
                return{
                    ...state,
                    products: action.payload
                }

            case actions.setIsloading:
                return{
                    ...state,
                    isLoading: action.payload
                }

            case actions.setCategories:
                return{
                    ...state,
                    categories: action.payload
                }
            
            case actions.setCarts:
                return{
                    ...state,
                    carts: action.payload
                }

        default:
            return state;
    }
}

export default reducer;