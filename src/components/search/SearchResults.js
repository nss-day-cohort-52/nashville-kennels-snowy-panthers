import React from "react"
import { useLocation } from "react-router-dom";
import "./SearchResults.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


import {AnimalListComponent} from "../animals/AnimalList"


export default () => {
    const location = useLocation()
    const { getCurrentUser } = useSimpleAuth()
    

    const displayAnimals = () => {
        
        if (location.state?.animals.length && !!getCurrentUser().employee) {
            const animalName = location.state?.animals.map((a) => {
                return a.name
            })
            const animalBreed = location.state?.animals.map((a) => {
                return a.breed
            })
            // possibly pass prop to animallist to filter list based on search term, within animal list component with conditional in return, if searching animals, display searched 
            // if no search term exists, proceed as usual 
            return (
                <React.Fragment>
                    <h2>Matching Animals</h2>
                    <div>
                        <AnimalListComponent />
                    </div>
                 
                </React.Fragment>
            )}
        // } else {
        //     return (
        //     <React.Fragment>
        //         <h2>Only Employees can search for animals, sorry.</h2>
        //     </React.Fragment>
        //     )
        // }
    }

    const displayEmployees = () => {
        if (location.state?.employees.length) {
            const employeeName = location.state.employees.map(employee => employee.name)
            return (
                <React.Fragment>
                    <h2>Matching Employees</h2>
                    <section className="employees">
                        Display matching employees
                        <div>{employeeName}</div>
                    </section>
                </React.Fragment>
            )
        }
    }

    const displayLocations = () => {
        if (location.state?.locations.length) {
            const whichLocation = location.state.locations.map(location => location.name)
            return (
                <React.Fragment>
                    <h2>Matching Locations</h2>
                    <section className="locations">
                        Display matching locations: {whichLocation}
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
