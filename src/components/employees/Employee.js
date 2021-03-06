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
    const [location, markLocation] = useState([])
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
        if (resource?.locations?.length > 0) {
            markLocation(resource.locations)
        }
    }, [resource])

    useEffect(() => {
        const counter = resource?.animals?.length
        setCount(counter)
    },
    [resource])

    const func = () => {
        const newArray = location.map((l) => {
            return l.location.name
        })
        return newArray.join(", ")
    }

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
                                Caring for {animalCount} animals
                            </section>
                            <section>
                                Working at {func()} location(s)
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
