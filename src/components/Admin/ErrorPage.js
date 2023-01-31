import { useRouteError } from "react-router-dom";
import pic from '../../assets/admin/assets/img/error-404.svg'
export default function ErrorPage() {
    const error = useRouteError();
    return (

        <div id="layoutError">
            <div id="layoutError_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center mt-4">
                                    <img className="mb-4 img-error" src={pic} alt="error pic" />
                                    <p className="lead">This requested URL was not found on this server.</p>
                                    <p>
                                        <i className="fas fa-arrow-left me-1" />
                                        <p>
                                            <i>{error.statusText || error.message}</i>
                                        </p>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </div>
    );
}