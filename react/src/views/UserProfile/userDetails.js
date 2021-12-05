import React,{useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updateCustomer,updateCurrentUser } from "../../actions/customer";
import GridItem from "components/Grid/GridItem.js";


export default function UserDetails(){

    const dispatch = useDispatch();
    const data = useSelector((state) => state.customerReducer);
    const [isUpdate, setIsUpdate] = useState(false);
  

    function initUser(e){
        debugger
        let user = data.currentUser
        user.name=e[0].value
        user.lastName=e[1].value
        user.city=e[2].value
        user.mail=e[3].value
        user.phone=e[4].value
        user.password=e[5].value
        dispatch(updateCustomer(user))
        setIsUpdate(false)
    }
    return(
        <>  
        <form onSubmit={(e)=>{e.preventDefault()  
            initUser(e.target)}}>
         <input disabled={!isUpdate} defaultValue={data.currentUser?.name}  placeholder={data.currentUser?.name}></input>
         <input disabled={!isUpdate} defaultValue={data.currentUser?.lastName} placeholder={data.currentUser?.lastName}></input>
         <input disabled={!isUpdate} defaultValue={data.currentUser?.city} placeholder={data.currentUser?.city}></input>
         <input disabled={!isUpdate} defaultValue={data.currentUser?.mail} placeholder={data.currentUser?.mail}></input>
         <input disabled={!isUpdate} defaultValue={data.currentUser?.phone} placeholder={data.currentUser?.phone}></input>
         <input disabled={!isUpdate} defaultValue={data.currentUser?.password} placeholder={data.currentUser?.password}></input>
         {isUpdate?<button type='submit' onClick={()=>setIsUpdate(true)}>אישור</button>:null}
        </form>
        <button type="button" onClick={()=>setIsUpdate(true)}>עדכן פרטים</button>
        </>
    )
}