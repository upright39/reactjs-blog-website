import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../layout/frontend/NavBar';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function Login() {
    let navigate = useNavigate()
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
        errorlist: []
    })

    let data = {
        email: loginDetails.email,
        password: loginDetails.password,
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then((res) => {

                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token)
                    localStorage.setItem('auth_name', res.data.user_name)
                    swal("Success", res.data.message, 'success')
                    navigate("/")
                } else if (res.data.status === 401) {
                    swal("Warning", res.data.message, 'warning')

                } else {
                    setLoginDetails({ ...loginDetails, errorlist: res.data.error_messages })
                }

            })
        })


    }




    return (
        <div>
            <NavBar />
            <div className="bg-secondary">
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                            <div className="card-body">
                                                <form onSubmit={handleSumbit}>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com"
                                                            value={loginDetails.email}
                                                            onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}

                                                        />
                                                        <label htmlFor="inputEmail">Email address</label>
                                                        <span style={{ color: 'red' }}>  {loginDetails.errorlist.email}</span>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="inputPassword" type="password" placeholder="Password"

                                                            value={loginDetails.passwordl}
                                                            onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
                                                        />
                                                        <label htmlFor="inputPassword">Password</label>
                                                        <span style={{ color: 'red' }}> {loginDetails.errorlist.password}</span>
                                                    </div>
                                                    <div className="form-check mb-3">
                                                        <input className="form-check-input" id="inputRememberPassword" type="checkbox" defaultValue />
                                                        <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                        <Link className="small" to="password.html">Forgot Password?</Link>
                                                        <button className="btn btn-primary" type="submit" >Login</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="card-footer text-center py-3">
                                                <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <div id="layoutAuthentication_footer">
                        <footer className="py-4 bg-light mt-auto">
                            <div className="container-fluid px-4">
                                <div className="d-flex align-items-center justify-content-between small">
                                    <div className="text-muted">Copyright © Your Website 2022</div>
                                    <div>
                                        <Link to="#">Privacy Policy</Link>
                                        ·
                                        <Link to="#">Terms &amp; Conditions</Link>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
