import { Link } from "react-router-dom";

function PageNotFound() {

    return (

        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-primary">Opps!</span> Pagina no encontrada.</p>
                <p className="lead">
                    La pagina que esta buscando no existe.
                </p>
                <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
        </div>

    )
};

export default PageNotFound;