import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Animal } from "./Animal"
import { AnimalDialog } from "./AnimalDialog"
import AnimalRepository from "../../repositories/AnimalRepository"
import AnimalOwnerRepository from "../../repositories/AnimalOwnerRepository"
import useModal from "../../hooks/ui/useModal"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import OwnerRepository from "../../repositories/OwnerRepository"
import { useLocation } from "react-router-dom";

import "./AnimalList.css"
import "./cursor.css"


export const AnimalListComponent = (props) => {
    const [animals, petAnimals] = useState([])
    const [animalOwners, setAnimalOwners] = useState([])
    const [owners, updateOwners] = useState([])
    const [currentAnimal, setCurrentAnimal] = useState({ treatments: [] })
    const { getCurrentUser } = useSimpleAuth()
    const history = useHistory()
    let { toggleDialog, modalIsOpen } = useModal("#dialog--animal")
    const location = useLocation()

    const syncAnimals = () => {
        AnimalRepository.getAll().then(data => petAnimals(data))
    }

    useEffect(() => {
         
         OwnerRepository.getAllCustomers().then(updateOwners)
         AnimalOwnerRepository.getAll().then(setAnimalOwners)
         syncAnimals()
         
    }, [])

    const test = () => {
        const anim = animals.filter((animal) => {
            for (const a of location.state.animals) {
                if (animal.id === a.id) {
                    return true
                }
                return false
            }
        })
        return anim
    }
    const showTreatmentHistory = animal => {
        setCurrentAnimal(animal)
        toggleDialog()
    }
    const filteredAnimals = animalOwners.filter((a) => {
        if (parseInt(getCurrentUser().id) === a.userId) {
            return true
        }
        return false
    })
    
    useEffect(() => {
        const handler = e => {
            if (e.keyCode === 27 && modalIsOpen) {
                toggleDialog()
            }
        }
        window.addEventListener("keyup", handler)

        return () => window.removeEventListener("keyup", handler)
    }, [toggleDialog, modalIsOpen])

    return (
        <>
            <AnimalDialog toggleDialog={toggleDialog} animal={currentAnimal} />

            {
                getCurrentUser().employee
                    ? ""
                    : <div className="centerChildren btn--newResource">
                        <button type="button"
                            className="btn btn-success "
                            onClick={() => { history.push("/animals/new") }}>
                            Register Animal
                        </button>
                    </div>
            }

            <ul className="animals">

                {
                    !!location.state?.animals.length
                    ? test().map((animal) => {
                        return <Animal key={`animal--${animal.id}`} animal={animal}
                            animalOwners={animalOwners}
                            owners={owners}
                            syncAnimals={syncAnimals}
                            setAnimalOwners={setAnimalOwners}
                            showTreatmentHistory={showTreatmentHistory}
                        />

                    })
                    :  
                        getCurrentUser().employee
                        ?    animals.map(anml => {
                             return <Animal key={`animal--${anml.id}`} animal={anml}
                                animalOwners={animalOwners}
                                owners={owners}
                                syncAnimals={syncAnimals}
                                setAnimalOwners={setAnimalOwners}
                                showTreatmentHistory={showTreatmentHistory}
                            />
                            })
                            
                        :   filteredAnimals.map(a => {
                                return <Animal key={`animal--${a.animal.id}`} animal={a.animal}
                                animalOwners={animalOwners}
                                owners={owners}
                                syncAnimals={syncAnimals}
                                setAnimalOwners={setAnimalOwners}
                                showTreatmentHistory={showTreatmentHistory}
                            />
                            }
                        )
                    
                }
                {/* {
                    getCurrentUser().employee
                    ?    animals.map(anml => {
                         return <Animal key={`animal--${anml.id}`} animal={anml}
                            animalOwners={animalOwners}
                            owners={owners}
                            syncAnimals={syncAnimals}
                            setAnimalOwners={setAnimalOwners}
                            showTreatmentHistory={showTreatmentHistory}
                        />
                        })
                        
                    :   filteredAnimals.map(a => {
                            return <Animal key={`animal--${a.animal.id}`} animal={a.animal}
                            animalOwners={animalOwners}
                            owners={owners}
                            syncAnimals={syncAnimals}
                            setAnimalOwners={setAnimalOwners}
                            showTreatmentHistory={showTreatmentHistory}
                        />
                        }
                    )
                } */}

            </ul>
        </>
    )
}
