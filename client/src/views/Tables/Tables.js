import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./Tables.css"
import Navbar from "../../components/Navbar/Navbar";

import { loginRequired } from "../../util/loginRequired";
import { currentUser } from "../../util/CurrentUser";

function Tables() {

    const [availableTables, setAvailableTables] = useState([])

    useEffect(() => {
        async function fetchTables() {
            const response = await axios.get("/availableTables")
            setAvailableTables(response.data.data)
        }
        fetchTables()
    })

    useEffect(() => {
        loginRequired()
    }, [])

    async function bookTable(e) {
        //console.log('Table Booked');
        const response = await axios.post('/bookTable', {
            "tableNumber": (e.target.value),
            "userId": (currentUser._id)
        })

        //console.log(response.data.data);

        if (response.data.success) {
            await swal({
                icon: 'success',
                title: "Booked Table",
                text: response.data.message,
                button:"ok"
            })
            localStorage.setItem("bookTable", JSON.stringify.apply(response.data.data))
            window.location.reload()
        }
        else {
            await swal({
                icon: "error",
                title: "Table is already Booked!",
                text: response.data.message,
                button:"OK"
            })
            window.location.reload()
        }
    }

    

    return (
        <div className='tables row'>

            <Navbar />

            <p className='avl-table'>Available Tables</p>

            {
                availableTables &&
                availableTables?.map((availableTables) => {
                    return (
                        <div className= "col-md-3" >
                            <p className={`table-name ${availableTables.booked && 'bg-red'}`}> Table No : {availableTables.tableNumber}
                                <img className='table-img' alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD9UkOc07NjjLhJb_bQJyw9XSn9TmprX27qQ&usqp=CAU' />
                                <button type='button' className='book-btn' value={availableTables.tableNumber} onClick={bookTable}>BOOK TABLE</button>
                            </p>
                            <br />
                        </div>
                    )
                })
            }

        </div>

    )
}

export default Tables