import React, { useState, useEffect } from "react";
import axios from "axios";
import  swal from "sweetalert";
import "./Tables.css"
import Navbar from "../../components/Navbar/Navbar";

import { loginRequired } from "../../util/loginRequired";
import { currentUser } from "../../util/CurrentUser";

function Tables() {

    const [availableTables, setAvailableTables] = useState([])
     
    useEffect(()=>{
        async function fetchTables() {
            const response = await axios.get("/availableTables")
            console.log(response.data.data);
            localStorage.setItem('table',JSON.stringify(response.data.data))
            setAvailableTables(response.data.data)
        }
        fetchTables()
    })

    useEffect(() => {
        loginRequired()
    }, [])

    async function bookTable() {
        console.log('Table Booked');

        const response = await axios.post('/bookTable', {
            tableNumber: localStorage.getItem("tableNumber"),
            userId: currentUser._id
        })

        if (!localStorage.getItem('bookTable')) {
            await swal({
                icon: 'error',
                title: "Error",
                text: response.data.message,
                button: "Ok!"
            })
        }

        if (localStorage.getItem('bookTable')) {
            if (response.data.success) {
                await swal("Table Booked", response.data.message, "success")
                localStorage.setItem("bookTable")
                window.location.href = "/"
            }
        }
    }

    return (
        <div>
            <div className='tables row'>

                <Navbar />

                <p className='avl-table'>Available Tables</p>


                <div className='col-md-3'>
                    <p className='table-name'>Table : {availableTables.tableNumber}
                        <hr />
                        <img className='table-img' alt='' src='https://media.istockphoto.com/id/1286120728/vector/home-furnishings-table-with-chairs.jpg?s=612x612&w=0&k=20&c=o8yKNC-r0xuhNI-BV_MRdY4d9YsFMBRbBqyR5bromac=' />
                        <button type='button' className='book-btn'  onClick={bookTable}>BOOK TABLE</button>
                    </p>
                    <br />
                </div>



            </div>
        </div>
    )
}

export default Tables