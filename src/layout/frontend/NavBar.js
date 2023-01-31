import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function NavBar() {
    let navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault()

        axios.post(`api/logout`).then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_name')
                swal("Success", res.data.message, 'success')
                navigate("/")
            }
        })
    }

    let AuthButons = ""
    if (!localStorage.getItem('auth_token')) {
        AuthButons = (
            < ul className='navbar-nav' >
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/register"}>Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/login"}>Login</Link>
                </li>
            </ul >
        )
    } else {
        AuthButons = (

            <li className="nav-item">
                <button className="btn btn-danger btn-sm mt-2" onClick={handleLogout}>Logout</button>
            </li>

        )
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary shadow sticky-top">
                <div className="container">
                    <Link className="navbar-brand" to="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                            </li>
                            {AuthButons}
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
