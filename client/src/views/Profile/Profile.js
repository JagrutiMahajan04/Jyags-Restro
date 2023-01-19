import React ,{useEffect}from "react";
import "./Profile.css"

import { loginRequired } from "../../util/loginRequired";

function Profile() {

    useEffect(()=>{
            loginRequired()
    }, [])

    return (
        <div><h1>Profile</h1></div>
    )
}

export default Profile