import React, { useEffect, useState } from "react";
import ChatScreen from "./ChatScreen";
import { Route, Switch } from "react-router";
// import {useParams, withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'


export default function WelcomeScreen(props) {
    //פונקציה זו אחראית להכניס את המשתמש הנוכחי לצאט שבחר עם המייל שלו
    //ושומרת את ההודעות שלו בהיסטוריית ההודעות
    const data = useSelector((state) => state.customerReducer);

    const login = () => {
        if (data?.room && data?.currentUser?.mail) {
            props.history.push("chat", {room:data?.room ,email:data?.currentUser?.mail });
        }
    }

    useEffect(async () => {
        login();
    }, []);
    return (
        <>
        </>
    );

}


