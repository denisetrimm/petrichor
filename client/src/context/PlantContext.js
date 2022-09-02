import { useState, useEffect, createContext } from "react";

export const PlantContext = createContext(null);

export const PlantProvider = ({ children }) => {

const [allPlants, setAllPlants] = useState(null);
const [filteredPlants, setFilteredPlants] = useState(null);
const [filterQueries, setFilterQueries] = useState(null);//Remove later if not used
const [searchInputValue, setsearchInputValue] = useState("");
const [searchActive, setSearchActive] = useState(false);

const handleClear = () => {
    setsearchInputValue("")
    setSearchActive(false)
    setFilteredPlants(allPlants);
}

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
// useEffect(() => {
//     fetch(`/api/get-plants/:${filterQueries}`)
//     .then((res)=>res.json())
//     .then((data)=>{
//         console.log(data)
//         setFilteredPlants(data.data)
//     })
// }, [filterQueries])

// SEARCHBAR STATE-FUNCTIONS




return (
        <PlantContext.Provider
            value={{
                allPlants,
                setAllPlants,

                filteredPlants,
                setFilteredPlants,

                searchInputValue,
                setsearchInputValue,

                searchActive,
                setSearchActive,

                handleClear,

                filterQueries,
                setFilterQueries
            }}
        >
            {children}
        </PlantContext.Provider>
    );
};