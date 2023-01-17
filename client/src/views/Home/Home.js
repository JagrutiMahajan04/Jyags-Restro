import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Home.css";
import { currentUser } from "../../util/CurrentUser";

function Home() {

    const [searchText, setSearchText] = useState('')

    async function fetchAllItems() {
      const response = await axios.get('/allfoodItems')
      console.log(response.data.data)
    }

    async function fetchedSpecificItems() {
        const response = await axios.get(`/foodItems?title=${searchText}`)
        console.log(response.data.data)
    }

    useEffect(() => {
        if (searchText.length > 0) {
            fetchedSpecificItems()
        }
        else {
            fetchAllItems()
        }
    }, [searchText])


    function logOut() {
        localStorage.removeItem('currentUser');
        window.location.href = "/login"
    }

    if (!currentUser) {
        window.location.href = "/login"
    }
    return (
        <div>
            <h1 className="text-center">Home</h1>
            <h2>{currentUser?.name}</h2>

            <div className="search-container">
                <input type="text" placeholder="Search" className="input-search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} />


            </div>

            <button type="button" className="btn btn-primary" onClick={logOut}>Logout</button>
        </div>
    )
}

export default Home