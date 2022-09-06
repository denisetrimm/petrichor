//STYLING
import styled from "styled-components";
//HOOKS & CONTEXT
import { useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
//COMPONENTS
import PlantCardInfo from "./PlantCardInfo";
import TypeAhead from "./TypeAhead";
import SortFilter from "./SortFilter"
import BackArrow from "../../UI/BackArrow";
import { useEffect, useState } from "react";


const Discover = () => {
    const {plantUser} = useContext(UserContext);
    const {allPlants, filteredPlants, sortType}= useContext(PlantContext);
    
    // const [sortedPlants, setSortedPlants] = useState(allPlants||null)

    // useEffect(()=> {
    //     if (filteredPlants){
    //         setSortedPlants(filteredPlants)
    //     }
    //     console.log(`Discover:`)
    //     console.log(filteredPlants)
        
    // },[allPlants, filteredPlants, sortType])

    return (
        <>
            <h2>Discover</h2>

            {/* ALLOW USER TO USE BACK BUTTON WHEN SIGNED IN */}
                {plantUser &&
                    <BackArrow/>
                }

            {/* DISPLAY SEARCH BAR AND PLANT CARDS */}
                {allPlants && filteredPlants &&
                <>  
                    <TypeAhead/>
                    <SortFilter/>
                    <PlantGrid>
                        {filteredPlants.map(plant => {
                            return (
                                <PlantCardInfo key={plant._id} plant={plant}/>
                            )
                        })}
                    </PlantGrid>
                </>
                }
        </>
    );
}

const PlantGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 1%;
    margin-top: 40px;
    width: 100%;
`
export default Discover;