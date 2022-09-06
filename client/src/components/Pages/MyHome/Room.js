//STYLING
import styled from "styled-components";
// ICONS
import { WiRaindrops } from "react-icons/wi"; //Multi-water
//HOOKS & CONTEXT
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import moment from 'moment';
//COMPONENTS
import HouseplantCardInfo from "./HouseplantCardInfo";

const Room = ({room})=> {

    const { user, isAuthenticated, isLoading} = useAuth0();
    const {plantUser, waterMultiplePlants} = useContext(UserContext);
    const { allPlants, filteredPlants, handleClear }= useContext(PlantContext);
    
    const [currentRoomHouseplants, setCurrentRoomHouseplants] = useState();


    // WHEN PLANT USER IS UPDATED, CHECK FOR HOUSEPLANT ROOMS
    useEffect(()=> {
        if(plantUser && plantUser.houseplants.length > 0){
                const plantRoomFilter = plantUser.houseplants.filter(plant => {
                    return plant.room === room
                })
                setCurrentRoomHouseplants(plantRoomFilter)
        }
    },[plantUser, room])

    // WATER EVERYTHING  IN ROOM BUTTON
    const handleWaterAllClick = (e) => {
        e.stopPropagation();
        let overdue = currentRoomHouseplants.filter(plant => {
            return moment().isSameOrAfter(plant.nextWatering, "day")
        })
        if (overdue.length > 0) {
            waterMultiplePlants(overdue);
        }
        else {
            alert("No plants in this room need water")
        }
    }

    return (
        <>
            {currentRoomHouseplants &&
            <>
                <RoomTitle>{plantUser.home[room] || "General - Unassigned"}</RoomTitle>
                    {/* WATER EVERYTHING BUTTON */}
                    <WaterAllBtn 
                        type="button" 
                        onClick={(e)=> {handleWaterAllClick(e)}}
                    >
                        <WiRaindrops size="50"/>
                        <WaterAllText>Water overdue plants in {plantUser.home[room] || "General"}</WaterAllText>
                    </WaterAllBtn>
                <PlantGrid>
                    {currentRoomHouseplants.map(plant => {
                            return (
                                    <HouseplantCardInfo key={plant._id} plant={plant}/>
                            )
                        })
                    }
                </PlantGrid>
            </>
            }
        </>
    )
}

const RoomTitle = styled.h3`
    margin-top: 40px;
    color: var(--color-primaryMedium);
    border-top: 1px solid lightgrey;
    padding: 40px 200px 0;
`
const PlantGrid = styled.div`
    /* border: 1px solid lightgrey;
    padding: 20px;
    border-radius: 15px; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 1%;
    margin: 40px 0;
    width: 100%;
`
const WaterAllText = styled.span`
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-top: 10px;
`
const WaterAllBtn = styled.button`
    display: flex;
    align-self: flex-end;
    align-items: center;
    padding: 0 25px 0 10px;
    background-color: var(--color-water);
    &:hover{
        background-color: var(--color-waterHighlight);
    }
`
export default Room;