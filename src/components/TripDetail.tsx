import React from 'react'
import '../App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'

type Vacation = {
    id: 'string';
    name: 'string';
    destination: 'string';
    startDate: 'string';
    endDate: 'string';
    image: 'string';
};

function TripDetail(): JSX.Element {
    const { id } = useParams()
    console.log(id);

    const [byId, setbyId] = useState<Vacation>({
        id: 'string',
        name: 'string',
        destination: 'string',
        startDate: 'string',
        endDate: 'string',
        image: 'string'
    })
    useEffect(() => {
        const trips = async () => {
            return await fetch(`http://localhost:3000/api/trips/${id}`)
        }
        trips().then(data => data.json())
            .then(data => setbyId(data))
    }, [])
    console.log(byId);

    // const tripById=byId.filter((trip:Vacation)=>trip.id===id.id)
    // console.log(tripById);
    return (
        <>
            <div className='div'>
                <div className='divCard' style={{ border: '2px solid black' }}>
                    {byId.name}
                    <img style={{ width: '100px' }} src={byId.image} alt="img" />
                    {byId.destination}
                    {byId.startDate}
                    {byId.endDate}
                </div>
            </div>
            <Link to='/Trips' ><button> Trips</button></Link>

        </>
    )
}

export default TripDetail