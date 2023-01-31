
import { useState } from 'react';
import { Link } from 'react-router-dom'
import NavBar from '../../../layout/frontend/NavBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function Register() {

    const [user_details, setSetUserDetais] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        errorlist: []
    })
    let navigate = useNavigate()

    const handleSumbit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("first_name", user_details.first_name)
        formData.append("last_name", user_details.last_name)
        formData.append("email", user_details.email)
        formData.append("password", user_details.password)
        formData.append("password_confirmation", user_details.password_confirmation)



        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/register`, formData).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token)
                    localStorage.setItem('auth_name', res.data.user_name)
                    swal("Success", res.data.message, 'success')
                    navigate("/")
                } else {
                    setSetUserDetais({ ...user_details, errorlist: res.data.error_messages })

                }

            })



        })

    }



    return (
        <>
            <div className="bg-secondary">
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-7">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                            <div className="card-body">
                                                <form onSubmit={handleSumbit}>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3 mb-md-0">
                                                                <input className="form-control"
                                                                    id="inputFirstName" type="text"
                                                                    value={user_details.first_name}
                                                                    onChange={(e) => setSetUserDetais({
                                                                        ...user_details, first_name: e.target.value
                                                                    })}
                                                                    placeholder="Enter your first name"
                                                                />
                                                                {user_details.errorlist.first_name}
                                                                <label htmlFor="inputFirstName">First name</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating">
                                                                <input className="form-control" id="inputLastName" type="text"
                                                                    value={user_details.last_name}
                                                                    onChange={(e) => setSetUserDetais({
                                                                        ...user_details, last_name: e.target.value
                                                                    })}
                                                                    placeholder="Enter your last name" />
                                                                {user_details.errorlist.last_name}
                                                                <label htmlFor="inputLastName">Last name</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="inputEmail"
                                                            value={user_details.email}
                                                            onChange={(e) => setSetUserDetais({
                                                                ...user_details, email: e.target.value
                                                            })}
                                                            type="email" placeholder="name@example.com" />
                                                        {user_details.errorlist.email}
                                                        <label htmlFor="inputEmail">Email address</label>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3 mb-md-0">
                                                                <input className="form-control" id="inputPassword" type="password"
                                                                    value={user_details.password}
                                                                    onChange={(e) => setSetUserDetais({
                                                                        ...user_details, password: e.target.value
                                                                    })}
                                                                    placeholder="Create a password"
                                                                />
                                                                {user_details.errorlist.password}
                                                                <label htmlFor="inputPassword">Password</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3 mb-md-0">
                                                                <input className="form-control" id="inputPasswordConfirm" type="password"
                                                                    value={user_details.password_confirmation}
                                                                    onChange={(e) => setSetUserDetais({
                                                                        ...user_details, password_confirmation: e.target.value
                                                                    })}
                                                                    placeholder="Confirm password" />
                                                                {user_details.errorlist.password_confirmation}
                                                                <label htmlFor="inputPasswordConfirm">Confirm Password</label>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 mb-0">
                                                        <div className="d-grid">

                                                            <button className="btn btn-primary btn-block" type='submit' >Create Account</button></div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="card-footer text-center py-3">
                                                <div className="small"><Link to="login.html">Have an account? Go to login</Link></div>
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
        </>

    )
}

export default Register
