import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { StorageContext } from '../App'

function Home() {
    const { stutusStorage, setstutusStorage } = useContext(StorageContext)
    const [logs, setlogs] = useState('')
    // useEffect(() => {
    //     if(localStorage.getItem('token'))
        
    //     setlogs('log out')
    //     return () => {
    //       setlogs('log in')
    //   }
    // }, [logs])
    
    return (
        <header>
            {/* <button><Link to='/' >home</Link></button> */}
            {stutusStorage?
                <button onClick={()=>{localStorage.removeItem('token');
                setstutusStorage(!stutusStorage)}}>log out</button>:
                <Link to='/Login'><button>log in</button></Link>}
            
            <Link to='/Trips' ><button> Trips</button></Link>
            <Link to='/addUser'><button >add User</button></Link>
        </header>
    )
}

export default Home