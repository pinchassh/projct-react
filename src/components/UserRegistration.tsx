import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { statusContext } from '../App'
import { StorageContext } from '../App'
function UserRegistration() {

    const [password, setpassword] = useState<string>('')
    const [email, setemail] = useState('')
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [createSuccess, setCreateSuccess] = useState<boolean>(false);
    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const body = {
            email,
            password
        }
        try {
            const response = await fetch(
                `http://localhost:3000/api/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "test-token",
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

    return (
        <>
            <form onSubmit={register}>
                <input type="email"
                    placeholder='enter user email'
                    value={email}
                    onChange={(e) => setemail(e.target.value)} />
                <input type="text"
                    placeholder='enter user password'
                    value={password}
                    onChange={(e) => setpassword(e.target.value)} />
                <button type="submit"
                // onClick={() => {
                //     setpassword(''), setemail('')
                // }}
                >
                    submit
                </button>
            </form>
            <div>UserRegistration</div>
            <Link to='/' ><button>home</button></Link>
        </>

    )
}

export default UserRegistration