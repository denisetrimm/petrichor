//STYLING
import styled from "styled-components";
//HOOKS & CONTEXT
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
//COMPONENTS
import BackArrow from "../../UI/BackArrow";
import Room from "./Room"


const MyHome = () => {

    const {plantUser} = useContext(UserContext);
    const { allPlants}= useContext(PlantContext);
    const [roomsInUse, setRoomsInUse] = useState([]);
    const navigate = useNavigate();

    // WHEN PLANT USER IS UPDATED, CHECK FOR HOUSEPLANT ROOMS
    useEffect(()=> {

        if(plantUser && plantUser.houseplants.length > 0){
                let usingRoom = []

                plantUser.houseplants.forEach(plant => {
                    if(!usingRoom.includes(plant.room)){
                        usingRoom.push(plant.room)
                    }
                })
                usingRoom = usingRoom.sort()
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
                                <Wrapper>
                                    <Room room={room}/>
                                </Wrapper>
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

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const NumPlants = styled.p`
    margin-top: 20px;
`
export default MyHome;