export const initialState = {
    user: null
};

// Reducer hallitsemaan tapauskohtaisia asioita

const reducer = (state, action) => {


    switch(action.type) {



        // Tämän avulla käyttäjä näkee nimensä home-sivustolla
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            }
        default:
            return state;



    }














};

export default reducer;