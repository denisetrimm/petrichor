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
import Room from "./Room"


const MyHome = () => {

    const { user, isAuthenticated, isLoading} = useAuth0();
    const {plantUser} = useContext(UserContext);
    const { allPlants, filteredPlants, handleClear }= useContext(PlantContext);
    const [roomArray, setRoomArray] = useState([]);
    const [roomsInUse, setRoomsInUse] = useState([]);
    const navigate = useNavigate();
    // let roomsInUse = [];

    // WHEN PLANT USER IS UPDATED, CHECK FOR OVERDUE PLANTS
    useEffect(()=> {

        if(plantUser && plantUser.houseplants.length > 0){
                const usingRoom = []

                plantUser.houseplants.forEach(plant => {
                    if(!usingRoom.includes(plant.room)){
                        usingRoom.push(plant.room)
                        // roomsInUse.push(plant.room)
                    }
                })
                setRoomsInUse(usingRoom)
            }

    },[plantUser])

    return (
        <>

            <h2>My Home</h2>

            {plantUser &&
                <BackArrow/>
            }

            {allPlants && 
            <>  
                {/* PLACE HOLDER WHEN THERE ARE NO PLANTS */}
                {plantUser && plantUser.houseplants.length === 0 &&
                    <>
                        <p>You haven't added any plants to your home yet.</p>
                        <button onClick={()=> {navigate("/")}}>Add some plants!</button>
                    </>
                }

                {/* IF USER IS SIGNED IN AND HAS AT LEAST 1 PLANT, INDICATE NUMBER OF PLANTS*/}
                {plantUser && plantUser.houseplants.length > 0 &&
                <>
                    <NumPlants>You have {plantUser.houseplants.length} plants in your home.</NumPlants>

                    {/* RENDER ROOMS */}
                    {roomsInUse &&
                    <>
                        {roomsInUse.map(room => {
                            return (
                                <>
                                    <Room room={room}/>
                                </>
                            )
                        })}
                    </>
                    }
                </>
                    }
            </>
            }
        </>
    );
}

const NumPlants = styled.p`
    margin-top: 20px;
`
const NumPlantsSpan = styled.span`
    color: var(--color-primaryDark);
    font-weight: bold;
    font-size: 20px;
`
export default MyHome;