import React, {useContext,useEffect} from 'react'
import bookContext from '../Context/bookContext';
const Contact = () => {
    const {user, navigate} = useContext(bookContext);
    useEffect(()=>{
      if(!user) {
        navigate('/login')
      }
    })
  return (
    <div>
      Contact
    </div>
  )
}

export default Contact
