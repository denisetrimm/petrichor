//STYLING
import styled from "styled-components";
// ICONS
import { WiRaindrops } from "react-icons/wi"; //Multi-water
//HOOKS & CONTEXT
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import moment from 'moment';
//COMPONENTS
import WaterPlantCardInfo from "./WaterPlantCardInfo";
import BackArrow from "../../UI/BackArrow";


const Water = () => {

    const {plantUser, waterMultiplePlants} = useContext(UserContext);
    const { allPlants}= useContext(PlantContext);
    const [dueForWater, setDueForWater] = useState([]);
    
    // WHEN PLANT USER IS UPDATED, CHECK FOR OVERDUE PLANTS
    useEffect(()=> {
        if(plantUser && plantUser.houseplants.length > 0){
            const filterPlants = plantUser.houseplants.filter(plant => {
                return moment().isSameOrAfter(plant.nextWatering, "day")
            })
            if (filterPlants.length > 0) {
                setDueForWater(filterPlants)
            }
            else{
                setDueForWater([])
            }
        }
    },[plantUser])

    // WATER EVERYTHING BUTTON
    const handleWaterAllClick = (e) => {
        e.stopPropagation();
        waterMultiplePlants(dueForWater);
    }

    return (
        <>

            <h2>Water</h2>
            
            {plantUser &&
                <BackArrow/>
            }

            {allPlants && dueForWater.length > 0 &&
            <>  
                {/* WATER EVERYTHING BUTTON */}
                    <WaterAllBtn 
                        type="button" 
                        onClick={(e)=> {handleWaterAllClick(e)}}
                    >
                        <WiRaindrops size="50"/>
                        Water all plants
                    </WaterAllBtn>
                    
                {/* RENDER ALL PLANTS THAT ARE OVERDUE OR DUE TODAY */}
                    <PlantGrid>
                        {dueForWater.map(plant => {
                                return (
                                        <WaterPlantCardInfo key={plant.plantId} plant={plant}/>
                                )
                            })
                        }
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
const WaterAllBtn = styled.button`
    padding: 0 10px;
    background-color: var(--color-water);
    &:hover{
        background-color: var(--color-waterHighlight);
    }
`

export default Water;