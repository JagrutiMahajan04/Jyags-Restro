import React, {useEffect} from "react";

function Home(){
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        console.log(currentUser)
    }, [])
    return (
        <div>
           <h1 className="text-center">Home</h1>
        </div>
    )
}

export default Home