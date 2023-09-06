import React, { useState, useContext, useRef } from 'react'
import { statusContext } from '../App'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



function NewTripForm() {
    const { status, setStatus } = useContext(statusContext)
    const [name, setName] = useState('')
    const [destination, setDestination] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState('')
    const [activities, setActivities] = useState([''])
    const [activ1, setactiv1] = useState('')
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [createSuccess, setCreateSuccess] = useState<boolean>(false);


    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const body = {
            name: name,
            destination: destination,
            startDate: startDate,
            endDate: endDate,
            description: description,
            price: price,
            image: image,
            activities: activities
        };
        try {
            const response = await fetch(
                'http://localhost:3000/api/trips',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        authorization: localStorage.getItem('token') || ''
                    },
                    body: JSON.stringify(body),
                });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            console.log(data);
            setCreateSuccess(true);
        } catch (error) {
            setError(`Error: ` + error);
        } finally {
            setLoading(false);
        }
    }

    const makeInput = () => {
        setActivities([...activities, activ1]);
        setactiv1('')
    };
    return (
        <div className='newTripDiv'>
            <form onSubmit={create} >
                <input type="text"
                    placeholder='pleas enter trip destination'
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)} />
                <br />
                <input type="text"
                    placeholder='pleas enter trip description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} /><br />

                <input type="text"
                    placeholder='click more activities toadd'
                    value={activ1}
                    onChange={(e) => setactiv1(e.target.value)}
                /><br />
                <button onClick={() => { makeInput() }}>more activities</button><br />

                <input type="text" required
                    placeholder='pleas enter trip price'
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)} /><br />

                <input type="text"
                    placeholder='pleas enter trip startDate'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} /><br />

                <input type="text"
                    placeholder='pleas enter trip name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} /><br />

                <input type="text"
                    placeholder='pleas enter trip endDate'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} /><br />

                <input type="text"
                    placeholder='pleas enter trip image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)} /><br />

                {/* <Link to='/Trips' > */}
                <button type='submit'
                    onClick={() => { setStatus(!status); console.log(status) }}><br />
                    click hir to add trip
                </button><br />
                {/* </Link> */}
            <Link to='/Trips' ><button> Trips</button></Link>
            </form>
        </div>

    )
}

export default NewTripForm