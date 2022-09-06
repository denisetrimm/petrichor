//STYLING
import styled from "styled-components";
// ICONS

//HOOKS & CONTEXT
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
//COMPONENTS
import Card from "../../UI/Card";
import HouseplantCardInfo from "./HouseplantCardInfo";
import BackArrow from "../../UI/BackArrow";


const Room = ({room})=> {

    const { user, isAuthenticated, isLoading} = useAuth0();
    const {plantUser} = useContext(UserContext);
    const { allPlants, filteredPlants, handleClear }= useContext(PlantContext);
    // const {roomArray, setRoomArray} = useState([])
    const navigate = useNavigate();

    const handlePlantClick = (plantId) => {
        handleClear();
        navigate(`/plants/${plantId}`);
    }

    return (
        <>
            <RoomTitle>{plantUser.home[room] || "General - Unassigned"}</RoomTitle>
                <PlantGrid>
                {plantUser.houseplants.map(plant => {
                    if (plant.room === room){
                        return (
                            <Card key={plant._id} id={plant.plantId} handleFunction={handlePlantClick}>
                                <HouseplantCardInfo houseplant={plant}/>
                            </Card>
                        )
                    }
                    else{
                        return ""
                    }
                })}
                </PlantGrid>
        </>
    )
}

const RoomTitle = styled.h3`
    margin-top: 40px;
    color: var(--color-primaryMedium);
`
const PlantGrid = styled.div`
    border: 1px solid blue;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 1%;
    margin: 40px 0;
    width: 100%;
`

export default Room;