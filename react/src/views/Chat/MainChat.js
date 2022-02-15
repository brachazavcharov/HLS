import { useSelector, useDispatch } from "react-redux";
import { BsChatQuote } from 'react-icons/bs';
import { updateChat} from "../../actions/customer";
import { Redirect } from 'react-router';
import React,{useState} from 'react'
import { Button } from "semantic-ui-react";

export default function MainChat() {      
// const data = useSelector((state) => state.customerReducer);
const dispatch = useDispatch();
const [startChat,setStartChat]=useState(false)

if(startChat==true){
    return <Redirect from="/admin/chat" to='/admin/welcome'></Redirect>
    }
return(
<Button color="purple"  onClick={async()=>{await dispatch(updateChat('main')),setStartChat(true)}}><BsChatQuote/>מעבר לצ'אט הכללי</Button>
)}