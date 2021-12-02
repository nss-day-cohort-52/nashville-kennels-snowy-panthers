// import React from "react"
import { Link } from "react-router-dom"
import locationImage from "./location.png"
import "./Location.css"
import React, { useState } from "react"


export default ({location}) => {
    const [animals, setAnimals] = useState([])
    return (
        <article className="card location" style={{ width: `18rem` }}>
            <section className="card-body">
                <img alt="Kennel location icon" src={locationImage} className="icon--location" />
                <h5 className="card-title">
                    <Link className="card-link"
                        to={{
                            pathname: `/locations/${location.id}`,
                            state: { location: location }
                        }}>
                        {location.name}
                    </Link>
                </h5>
            </section>
            <section>
                Total animals
                    {/* {
                        ` ${location.animal.locationId.length}`
                    } */}
            </section>
            <section>
            <p className="lead detailCard__info">
                Total Employees 
                    {
                        ` ${location.employeeLocations.length}`
                    }
                </p>
            </section>
        </article>
    )
}
