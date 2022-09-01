//STYLING
import styled from "styled-components";
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
        <BackArrow/>
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 1%
`
export default Discover;