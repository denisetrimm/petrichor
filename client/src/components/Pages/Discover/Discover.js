//STYLING
import styled from "styled-components";
// ICONS
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { TbAdjustments } from "react-icons/tb";
import { TbAdjustmentsOff } from "react-icons/tb";

//HOOKS & CONTEXT
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
//COMPONENTS
import Card from "../../UI/Card";
import PlantCard from "./PlantCard";
import TypeAhead from "./TypeAhead";
import BackArrow from "../../UI/BackArrow";




const Discover = () => {
    const { user, isAuthenticated, isLoading} = useAuth0();
    const {plantUser} = useContext(UserContext);
    const { allPlants, filteredPlants }= useContext(PlantContext);
    const navigate = useNavigate();

    const handleClick = (plantId) => {
        console.log("clicked!");
        navigate(`/plants/${plantId}`);
    }

    return (
        <>

        <h2>Discover</h2>
        {plantUser &&
            <BackArrow/>
        }
        {allPlants && 
        <>  
            <TypeAhead/>

            <PlantGrid>
                {filteredPlants.map(plant => {
                    console.log(plant)
                    return (
                        <Card key={plant._id} id={plant._id} handleFunction={handleClick}>
                            <PlantCard plant={plant}/>
                        </Card>
                    )
                })}
            </PlantGrid>
        </>
        }
        </>
    );
}

const PlantGrid = styled.div`
    /* border: 1px solid blue; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* position: relative; */
    gap: 15px 1%;
    margin-top: 40px;
`
export default Discover;