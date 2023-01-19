import React ,{useState,useEffect}from "react";
import "./BookTable.css"

import { currentUser } from "../../util/CurrentUser";
import { loginRequired } from "../../util/loginRequired";

function BookTable() {
    const [currentUserVar, setCurrentUserVar] = useState(currentUser)

    useEffect(()=>{
        if(!currentUserVar){
            loginRequired()
        }
    }, [currentUserVar])

    return (
        <div><h1>booktable</h1></div>
    )
}

export default BookTable