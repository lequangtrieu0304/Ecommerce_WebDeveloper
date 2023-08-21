
export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
    return cartItems;
}

export const clearCart = () => {
    localStorage.removeItem('cartItems');
}

export const setShipping = ({
    name = '',
    phone = '',
    address = '',
    city = '',
    note = '',
}) => {
    localStorage.setItem('shipping', JSON.stringify({name, phone, address, city, note}));
}   

export const getShipping = () => {
    const shipping = localStorage.getItem('shipping')
        ? JSON.parse(localStorage.getItem('shipping'))
        : {name: '', phone: '', address: '', city: '', note: ''};
    return shipping;
}

export const clearShipping = (payment) => {
    localStorage.removeItem('shipping')
}

export const setPayment = (payment) => {
    localStorage.setItem('payment', JSON.stringify(payment))
}

export const getPayment = () => {
    const payment = localStorage.getItem('payment')
        ? JSON.parse(localStorage.getItem('payment'))
        : '';
    return payment;
}

export const clearPayment = () => {
    localStorage.removeItem('payment');
}

export const setUserInfo = (data) => {
    localStorage.setItem('user', JSON.stringify(data))
}


export const getUserInfo = () => {
    const info = localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user'))
        : {
            username: '', 
            phone: '',
            birthday: '',
            email: '',
            address: '',
            token: '',
            image: '',
            isAdmin: '',
            sex: '',
        };
    return info;
}

export const clearUserInfo = () => {
    localStorage.removeItem('user');
}
