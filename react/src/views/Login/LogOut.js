import React from 'react'

export default function LogOut(){
  useEffect(() => {
    localStorage.clear()
    //   return () => {
       
    // }
  },)
    return ( <Redirect from="/" to="/admin/dashboard" />)
}