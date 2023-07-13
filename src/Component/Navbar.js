import React from 'react'
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

const Navbar = () => {
  let location=useLocation();
  let navigate=useNavigate();
  const Logout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNoteBook</Link>
    <button className ="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className ="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
  </ul>
      {!localStorage.getItem("token")?
      <form className="d-flex" role="search">
      <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link>
      </form>
      :
      <button className="btn btn-primary" onClick={Logout}>Logout</button>

}
    </div>
  </div>
</nav>
  )
}

export default Navbar
