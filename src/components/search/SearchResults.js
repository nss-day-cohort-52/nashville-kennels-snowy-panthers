import React from "react"
import { useLocation } from "react-router-dom";
import "./SearchResults.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


import {AnimalListComponent} from "../animals/AnimalList"
import {LocationList} from "../locations/LocationList"
import  EmployeeList from "../employees/EmployeeList"


export default () => {
    const location = useLocation()
    const { getCurrentUser } = useSimpleAuth()
    
    const displayAnimals = () => {
        
        if (location.state?.animals.length && !!getCurrentUser().employee) {
            return (
                <React.Fragment>
                    <h2>Matching Animals</h2>
                    <div>
                        <AnimalListComponent />
                    </div>
                 
                </React.Fragment>
            )} else if (location.state?.animals.length && !getCurrentUser().employee) {
                return (
                    <React.Fragment>
                        <h2>Only employees can search for animals, sorry.</h2>
                    </React.Fragment>
                )
            }
    }

    const displayEmployees = () => {
        if (location.state?.employees.length) {
            return (
                <React.Fragment>
                    <h2>Matching Employees</h2>
                    <section className="employees">
                        <div>
                            <EmployeeList />
                        </div>
                    </section>
                </React.Fragment>
            )
        }
    }

    const displayLocations = () => {
        if (location.state?.locations.length) {
            return (
                <React.Fragment>
                    <h2>Matching Locations</h2>
                    <section className="locations">
                        <div>
                            <LocationList />
                        </div>
                    </section>
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            <article className="searchResults">
                {displayAnimals()}
                {displayEmployees()}
                {displayLocations()}
            </article>
        </React.Fragment>
    )
}
