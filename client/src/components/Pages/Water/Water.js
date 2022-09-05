//STYLING
import styled from "styled-components";
// ICONS
import { WiRaindrops } from "react-icons/wi"; //Multi-water
import { RiPlantLine } from "react-icons/ri"; //Plant
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
    const {allPlants}= useContext(PlantContext);
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

            {/* PLACEHOLDER IN CASE THERE ARE NO PLANTS */}
            {allPlants && dueForWater.length === 0 &&
            <CaughtUp>
                <RiPlantLine color="hsl(179, 30% , 29%)" size="80"/>
                <CaughtUpText>No plants need watering</CaughtUpText>
            </CaughtUp>
            }

            {allPlants && dueForWater.length > 0 &&
            <>  
                {/* WATER EVERYTHING BUTTON */}
                    <WaterAllBtn 
                        type="button" 
                        onClick={(e)=> {handleWaterAllClick(e)}}
                    >
                        <WiRaindrops size="50"/>
                        <WaterAllText>Water all plants</WaterAllText>
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
const CaughtUp = styled.div`
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
`
const CaughtUpText = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: hsl(180, 73%, 4%);
    margin-top: 20px;
`
const WaterAllText = styled.span`
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-top: 10px;
`
const WaterAllBtn = styled.button`
    display: flex;
    align-items: center;
    padding: 0 25px 0 10px;
    background-color: var(--color-water);
    &:hover{
        background-color: var(--color-waterHighlight);
    }
`

export default Water;