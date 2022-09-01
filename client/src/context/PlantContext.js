import { useState, useEffect, createContext } from "react";


export const PlantContext = createContext(null);

export const PlantProvider = ({ children }) => {

const [allPlants, setAllPlants] = useState(null);
const [filteredPlants, setFilteredPlants] = useState(null);
const [filterQueries, setFilterQueries] = useState(null)

// RETRIEVES ALL PLANTS ON MOUNT
useEffect(()=> {
    fetch("/api/get-plants")
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data)
        setAllPlants(data.data)
        setFilteredPlants(data.data)
    })
}, [])

// FIRES WHEN USER SELECTS A NEW FILTER
useEffect(() => {
    fetch(`/api/get-plants/${filterQueries}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        setFilteredPlants(data.data)
    })
}, [filterQueries])

// const getFilteredPlants = (filterQueries) => {
//     fetch(`/api/get-plants/${filterQueries}`)
//     .then((res)=>res.json())
//     .then((data)=>{
//         console.log(data)
//         setFilteredPlants(data.data)
//     })
// }

// useEffect(() => {
//     getFilteredPlants(filterQueries)
// }, [filterQueries])



return (
        <PlantContext.Provider
            value={{
                allPlants,
                setAllPlants,

                filteredPlants,
                setFilteredPlants,

                filterQueries,
                setFilterQueries
            }}
        >
            {children}
        </PlantContext.Provider>
    );
};