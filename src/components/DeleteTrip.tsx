import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { statusContext } from '../App'



export default function DeleteTrip() {
    const { status, setStatus } = useContext(statusContext)

    const [afterDelete, setafterDelete] = useState(false)
    const { id } = useParams()

    const headers = {
        authorization: localStorage.getItem('token') || ''
    };

    fetch(`http://localhost:3000/api/trips/${id}`, {
        method: 'DELETE',
        headers: headers
    })
        .then(response => response.json())
        .then(deletedTrip => {
            console.log('Trip successfully deleted:', deletedTrip);
            setStatus(!status)
        })
        .catch(error => {
            console.error("Error deleting trip:", error);
        });
    return (
        <Link to='/Trips' ><button> Trips</button></Link>
    )
}
