import React, { useEffect, useState } from "react"
import LocationRepository from "../../repositories/LocationRepository";
import Location from "./Location"
import "./LocationList.css"
import { useLocation } from "react-router-dom";


export const LocationList = () => {
    const [ locationss, updateLocations ] = useState([])
    const location = useLocation()

    useEffect(() => {
        LocationRepository.getAll().then(updateLocations)
    }, [])
    
    return (
        <div className="locations">
            {   !!location.state?.locations.length
                ? location.state.locations.map(l => <Location key={l.id} location={l} />)
                : locationss.map(l => <Location key={l.id} location={l} />)
            }
        </div>
    )
}
