import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { statusContext } from '../App'
type Vacation = {
    id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    image: string;
};

// const 
function Trips() {
    const { status, setStatus } = useContext(statusContext)

    const [allTrips, setallTrips] = useState([])

    useEffect(() => {
        const trips = async () => {
            return await fetch('http://localhost:3000/api/trips')
        }
        trips().then(data => data.json())
            .then(data => setallTrips(data))
    }, [status])


    return (
        <>
            <div className='div'>{allTrips.map((prop: Vacation) =>
                <Link to={`/TripDetail/${prop.id}`}>
                    <div className='divCard' style={{ border: '2px solid black', cursor: 'pointer' }}>
                        {prop.name}
                        <img style={{ width: '100px' }} src={prop.image} alt="img" />
                        {prop.destination}
                        {prop.startDate}
                        {prop.endDate}
                        <Link to={`/UpdateTrip/${prop.id}`}><button>uppdate</button></Link>
                        <Link to={`/deleteTrip/${prop.id}`}><button>delete</button></Link>
                    </div></Link>
            )}</div>
            <Link to='/' ><button>home</button></Link>
            <Link to='/NewTrip' ><button>New Trip</button></Link>
        </>

    )
}

export default Trips