import React, { useState } from 'react'
import BookContext from './bookContext'
import axios from 'axios';
const BookState = (props) => {
    const [user,setUser] = useState("");
    const [cartItem,setCartItem] = useState(0);
    const [cart,setCart] = useState([]);
    const [books,setBooks] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [quantity,setQuantity] = useState();
    const [bookId,setBookId] = useState(0);
    const [keyword,setKeyword] = useState("");
    const [pageIndex,setPageIndex] = useState(1);
    const [pageSize,setPageSize] = useState(5);
    const [totalPages,setTotalPages] = useState(0);
    const [totalBooks,setTotalBooks] = useState(0);
    const [loading,setLoading] = useState(false);
    const makeAddCartReq = ()=>{
      const payload = {
        "bookId": bookId,
        "userId": user.id,
        "quantity": quantity
      }
      axios.post('https://book-e-sell-node-api.vercel.app/api/cart',payload)
      .then((response)=>{
        // console.log(response)
        getCartData()
      })
      .catch((error)=>{
        console.log(error)
      })
      setQuantity(0)
      setBookId(0)
      handleClose()
    }
    const getCartData = ()=>{
      axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${user.id}` )
      .then((response)=>{

        // console.log(response) 
        setCart(response.data.result)
        return response.code
      })
      .catch((error)=>{
        return error.message
      })
    }
    const deleteFromCart = (cartId)=>{
      axios.delete(`https://book-e-sell-node-api.vercel.app/api/cart?id=${cartId}` )
      .then((response)=>{
        // console.log(response)
        getCartData()
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    const getBooks = ()=>{
      setLoading(true)
      const url = keyword?`https://book-e-sell-node-api.vercel.app/api/book?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`:`https://book-e-sell-node-api.vercel.app/api/book?pageSize=${pageSize}&pageIndex=${pageIndex}`
      axios.get(url)
      .then((response)=>{
        // console.log(response.data.result)
        console.log(response)
        setBooks(response.data.result.items)
        setTotalPages(response.data.result.totalPages)
        setTotalBooks(response.data.result.totalItems)
        setLoading(false)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    const placeOrder = ()=>{
      const cartItems = cart.map(item => item.id)
      console.log(cartItems)
      const payload = {
        userId: user.id,
        cartIds: cartItems
      }
      axios.post(`https://book-e-sell-node-api.vercel.app/api/order`, payload )
      .then((response)=>{
        console.log(response);
        getCartData()
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  return (
    <BookContext.Provider value={{user,books,cartItem,cart,open,quantity,keyword,pageIndex,totalPages,totalBooks,pageSize,setPageSize,setTotalBooks,setTotalPages,setPageIndex,setKeyword,setQuantity, setUser,getBooks,setCartItem,setCart,setOpen,handleOpen,handleClose,makeAddCartReq,setBookId,getCartData,deleteFromCart,placeOrder}}>
        {props.children}
    </BookContext.Provider>
  );
};

export default BookState
