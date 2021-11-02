import React, { useEffect, useState } from "react";
import ChatScreen from "./ChatScreen";
import { Route, Switch } from "react-router";

export function WelcomeScreen(props) {
    debugger;
    const [email, setEmail] = useState("r05458410430@gmail.com");
    const [room, setRoom] = useState("bnei brak");

    const login = () => {
        if (email && room) {
            props.history.push("chat", { room, email });
        }
    }

    useEffect(() => {
        login();
    }, []);


    return (
        <>
        </>
    );

}


export default WelcomeScreen;
