import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TripDetail from './components/TripDetail'
import Home from './components/Home'
import UserLogin from './components/UserLogin'
import UserRegistration from './components/UserRegistration'
import Trips from './components/Trips'
import NewTripForm from './components/NewTripForm'
import {createContext, useState}  from 'react'
import UpdateTripForm from './components/UpdateTripForm'
import DeleteTrip from './components/DeleteTrip'
export const statusContext=createContext<Context>({status:true,setStatus:()=>{}})
export const StorageContext=createContext<ContextStorage>({stutusStorage:true,setstutusStorage:()=>{}})
interface Context{
  status:boolean
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
}
interface ContextStorage{
  stutusStorage:boolean
  setstutusStorage: React.Dispatch<React.SetStateAction<boolean>>
}
function App() {
  const [status, setStatus] = useState<boolean>(true)
  const [stutusStorage, setstutusStorage] = useState<boolean>(true)

  return (
    <>
    <statusContext.Provider value={{status, setStatus}}>
    <StorageContext.Provider value={{stutusStorage, setstutusStorage}}>
      <Router>
        <Routes>
          <Route path='/Trips' element={<Trips />} />
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<UserLogin />} />
          <Route path='/addUser' element={<UserRegistration />} />
          <Route path='/NewTrip' element={<NewTripForm />} />
          <Route path='/TripDetail/:id' element={<TripDetail/>} />
          <Route path='/UpdateTrip/:id' element={<UpdateTripForm/>} />
          <Route path='/deleteTrip/:id' element={<DeleteTrip/>} />
          {/* <Route path='*' element={}/> */}
        </Routes>
      </Router>
      </StorageContext.Provider>
      </statusContext.Provider>

    </>
  )
}

export default App
