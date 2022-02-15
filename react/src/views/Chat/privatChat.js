import { useSelector, useDispatch } from "react-redux";
import { BsChatQuote } from 'react-icons/bs';
import { updateChat} from "../../actions/customer";
import { Redirect } from 'react-router';
import React,{useState} from 'react'
import { Button } from "semantic-ui-react";

export default function PrivatChat() {      
const data = useSelector((state) => state.customerReducer);
const dispatch = useDispatch();
const [startChat,setStartChat]=useState(false)

async function update(){
    try{
      await  dispatch(updateChat(data?.currentUser?._id))
        setStartChat(true)
    }catch{
        console.log('canot update room')
    }
    
}
if(startChat==true){
    return <Redirect from="/admin/chat" to='/admin/welcome'></Redirect>
    }
return(
    <>
    {data?.currentUser?.mail!=data?.AdminEmail?
/* <button onClick={async()=>{await dispatch(updateChat(data?.currentUser?._id)),setStartChat(true)}}><BsChatQuote/>מעבר לצ'אט הפרטי</button> */
   <Button color="purple" onClick={()=>update()}><BsChatQuote/>מעבר לצ'אט הפרטי</Button>:null}
   </>
)}