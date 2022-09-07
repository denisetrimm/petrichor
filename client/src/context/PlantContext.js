import { useState, useEffect, createContext } from "react";

export const PlantContext = createContext(null);

export const PlantProvider = ({ children }) => {

const [allPlants, setAllPlants] = useState(null);
const [filteredPlants, setFilteredPlants] = useState(null);
const [filterQueries, setFilterQueries] = useState(null);//Remove later if not used
const [searchInputValue, setsearchInputValue] = useState("");
const [searchActive, setSearchActive] = useState(false);
const [sortType, setSortType] = useState("");
const [sortOpen, setSortOpen] = useState(false)

const handleClear = () => {
    setsearchInputValue("")
    setSearchActive(false)
    setSortOpen(false)
    setSortType("commonAscending")
    setFilteredPlants(allPlants)
}

// RETRIEVES ALL PLANTS ON MOUNT
useEffect(()=> {
    fetch("/api/get-plants")
    .then((res)=>res.json())
    .then((data)=>{
        if(data.status === 200){
            setAllPlants(data.data)
            setFilteredPlants(data.data)
        }
        else {
            alert(data.message)
        }
    })
}, [])

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

                sortType,
                setSortType,

                sortOpen,
                setSortOpen,

                handleClear,

                filterQueries,
                setFilterQueries
            }}
        >
            {children}
        </PlantContext.Provider>
    );
};