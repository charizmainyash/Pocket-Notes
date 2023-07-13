import "./App.css";
import Navbar from "./Component/Navbar"
import Home from "./Component/Home"
import About from "./Component/About"
import NoteState from "./context/notes/NoteState"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Alert from "./Component/Alert";
import SignUp from "./Component/SignUp";
import Login from "./Component/Login";
import { useState } from "react";





function App(){
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
     msg:message,
     type:type
    })
    setTimeout(()=>{
        setAlert(null);
    },1500)
  }
  return (
    <div>
      <NoteState>
      <Router>
       <Navbar/>
       <Alert alert={alert}/>
       <div className="container">
       <Routes>
       <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
       <Route exact path="/about" element={<About/>}/>
       <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
       <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}/>
       </Routes>
       </div>
      </Router>
      </NoteState>
    </div>
  )
}

export default App;
