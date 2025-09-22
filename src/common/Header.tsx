import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContest";

const Header: React.FC = () => {
    const name: string = "EMS";
    const {Auth,Role,userName,logout} = useAuthContext();
    const navigate = useNavigate();
    useEffect(() =>{
      if(Auth && Role)navigate('/'+ (Role === 'HR' ? 'hrinfo' : 'emsinfo  '));
    },[])
    // console.log(Auth,Role);
  return (
     <nav className="navbar navbar-expand-lg bg-light border-bottom shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold text-primary" href="#">
                    {name}
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">UserList</a>
                        </li> */}
                    </ul>

                   

                    <div className="nav-item">
                      <div className="d-flex align-items-center gap-3">
                        {!Auth ? (
                          <>
                            <Link className="btn btn-outline-primary" to="/login">
                              Login
                            </Link>
                            <Link className="btn btn-primary" to="/register">
                              Register
                            </Link>
                          </>
                        ) : (
                          <>
                            <span className="fw-semibold text-primary">Howdy, {userName}</span>
                            <button className="btn btn-outline-danger" onClick={logout}>
                              Logout
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                </div>
            </div>
        </nav>
  );
};

export default Header;
