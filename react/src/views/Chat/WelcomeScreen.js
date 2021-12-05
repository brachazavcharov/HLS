import React, { useEffect, useState } from "react";
import ChatScreen from "./ChatScreen";
import { Route, Switch } from "react-router";
// import {useParams, withRouter} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { updateCurrentUser} from "../../actions/customer";


export default function WelcomeScreen(props) {
// export default withRouter(function WelcomeScreen(props) {
    debugger;
    // const [email, setEmail] = useState("r05458410430@gmail.com");
    // const [roomId, setRoom] = useState("bnei brak");
    const data = useSelector((state) => state.customerReducer);
    const dispatch = useDispatch();

    // const {email,room} = useParams()


    const login = () => {
        if (data?.room && data?.currentUser?.mail) {
            debugger
            props.history.push("chat", {room:data?.room,email:data?.currentUser?.mail });
        }
    }

    useEffect(async () => {
    if(data.currentUser==null&&localStorage.getItem('CurrentUser')!='undefined'&&localStorage.getItem('CurrentUser')!=null)
          await  dispatch(updateCurrentUser(JSON.parse(localStorage.getItem('CurrentUser')) ))
        login();
    }, []);


    return (
        <>
        </>
    );

}


