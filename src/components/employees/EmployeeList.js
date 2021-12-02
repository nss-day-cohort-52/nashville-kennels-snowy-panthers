import React, { useState, useEffect } from "react"
import Employee from "./Employee"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import "./EmployeeList.css"
import { useLocation } from "react-router-dom";


export default () => {
    const [employees, setEmployees] = useState([])
    const location = useLocation()

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
                    !!location.state?.employees.length
                    ? location.state.employees.map(a => <Employee key={a.id} employee={a} 
                        syncEmployees={syncEmployees}/>)
                    : employees.map(a => <Employee key={a.id} employee={a} 
                        syncEmployees={syncEmployees}/>)
                }

            </div>
        </>
    )
}
