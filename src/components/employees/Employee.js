import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import "./Employee.css"
import person from "./person.png"


export default ({ employee, syncEmployees }) => {
    const [isEmployee, setAuth] = useState(false)
    const [animalCount, setCount] = useState(0)
    const [location, markLocation] = useState({ name: "" })
    const [classes, defineClasses] = useState("card employee")
    const { employeeId } = useParams()
    const { getCurrentUser } = useSimpleAuth()
    const { resolveResource, resource } = useResourceResolver()
    
    useEffect(() => {
        setAuth(getCurrentUser().employee)
        resolveResource(employee, employeeId, EmployeeRepository.get)
    }, [])

   useEffect(
        () => {
            if (employeeId) {
                defineClasses("card employee--single")
            }
            resolveResource(employee, employeeId, EmployeeRepository.get)
        },
        []
    )

    useEffect(() => {
        if (resource?.employeeLocations?.length > 0) {
            markLocation(resource.employeeLocations[0])
        }
    }, [resource])

     return (
        <article className={classes}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    {
                        employeeId
                            ? resource.name
                            : <Link className="card-link"
                                to={{
                                    pathname: `/employees/${resource.id}`,
                                    state: { employee: resource }
                                }}>
                                {resource.name}
                            </Link>
                    }
                </h5>
                {
                    employeeId
                        ? <>
                            <section>
                                Caring for 0 animals
                            </section>
                            <section>
                                Working at unknown location
                            </section>
                        </>
                        : ""
                }
                

                {
                    isEmployee
                        ?
                        <button className="btn--fireEmployee" onClick={() => 
                            EmployeeRepository
                                .delete(employee.id)
                                .then(() => {
                                    syncEmployees()
                                })}>Fire</button>
                    : ""
                }
            </section>
        </article>
    )
}
