import React, { useState, useEffect } from "react"
import Employee from "./Employee"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import "./EmployeeList.css"


export default () => {
    const [employees, setEmployees] = useState([])

    const syncEmployees = () => {
        EmployeeRepository.getAll().then(data => setEmployees(data))
    }

    useEffect(
        () => {
            EmployeeRepository.getAll().then(setEmployees)
            syncEmployees()
        },
        []
    )

    return (
        <>
            <div className="employees">
                {
                    employees.map(a => <Employee key={a.id} employee={a} 
                        syncEmployees={syncEmployees}/>)
                }

            </div>
        </>
    )
}
