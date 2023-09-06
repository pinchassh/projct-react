import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { statusContext } from '../App'
import './up.css';


interface UpdatedTrip {
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    description: string;
    price: number;
    image: string;
    activities: string[];
}

function UpdateTripForm() {
    const { status, setStatus } = useContext(statusContext)
    const [name, setName] = useState('')
    const [destination, setDestination] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState<number>(0)
    const [description, setDescription] = useState('')
    const [activities, setActivities] = useState([''])
    const [activ1, setactiv1] = useState('click more activities toadd')

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [createSuccess, setCreateSuccess] = useState<boolean>(false);
    const { id } = useParams()


    useEffect(() => {
        const trips = async () => {
            return await fetch(`http://localhost:3000/api/trips/${id}`)
        }
        trips().then(data => data.json())
            .then(data => {
                setActivities(data.activities)
                setDescription(data.description)
                setDestination(data.destination)
                setEndDate(data.endDate)
                setImage(data.image)
                setName(data.name)
                setPrice(data.price)
                setStartDate(data.startDate)
                console.log(data);
            })
    }, [])




    const UpdateTrip = async (e: React.FormEvent<HTMLFormElement>) => {
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
                `http://localhost:3000/api/trips/${id}`,
                {
                    method: 'PUT',
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
        console.log(activ1);
        setactiv1('')
    };

    return (
        <>
            <form onSubmit={UpdateTrip}>
                <input type="text"
                    placeholder='pleas enter trip destination'
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)} />

                <input type="text"
                    placeholder='pleas enter trip description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                {activities.map((activ) => {
                    return <input type="text"
                        placeholder='pleas enter trip activities'
                        value={activ}
                        onChange={(e) => { setactiv1(e.target.value); makeInput() }}
                    />
                })}

                <button onClick={() => { }}>more activities</button>

                <input type="text"
                    placeholder='pleas enter trip price'
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)} />

                <input type="text"
                    placeholder='pleas enter trip startDate'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} />

                <input type="text"
                    placeholder='pleas enter trip name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <input type="text"
                    placeholder='pleas enter trip endDate'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} />

                <input type="text"
                    placeholder='pleas enter trip image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)} />

                {/* <Link to='/Trips' > */}
                <button type='submit'
                    onClick={() => { setStatus(!status); console.log(status) }}>
                    click hir to add trip
                </button>
                {/* </Link> */}
            </form>
            <Link to='/Trips' ><button> Trips</button></Link>

        </>
    )
}

export default UpdateTripForm