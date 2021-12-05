import { useSelector, useDispatch } from "react-redux";
import { BsChatQuote } from 'react-icons/bs';
import { updateChat} from "../../actions/customer";
import { Redirect } from 'react-router';
import React,{useState} from 'react'

export default function MainChat() {      
const data = useSelector((state) => state.customerReducer);
const dispatch = useDispatch();
const [startChat,setStartChat]=useState(false)

if(startChat==true){
    return <Redirect from="/admin/chat" to='/admin/welcome'></Redirect>
    }
return(
<button onClick={async()=>{await dispatch(updateChat('main',data?.currentUser?.mail)),setStartChat(true)}}><BsChatQuote/>מעבר לצ'אט הכללי</button>
)}