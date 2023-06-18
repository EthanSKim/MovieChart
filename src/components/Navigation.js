import { useState } from "react";

function Navigation({onChangeSearch}) {
    const changeSearchVal = (event) => {
        onChangeSearch(event.target.value);
    }
    return (
    <nav className="navbar bg-light">
        <div className="container-fluid">
            <a className="navbar-brand">Movie Chart Online</a>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search by title" aria-label="Search" onChange={changeSearchVal}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
    )
}

export default Navigation;