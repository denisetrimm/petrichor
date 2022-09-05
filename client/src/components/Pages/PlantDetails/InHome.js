import styled from "styled-components";
//HOOKS & CONTEXT
import { useState, useContext } from "react";
import { PlantContext } from "../../../context/PlantContext";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import HouseplantCardInfo from "./HouseplantCardInfo";

const InHome = ({currentPlant, currentHouseplantArray})=> {
    const {plantUser} = useContext(UserContext);
    const { handleClear }= useContext(PlantContext);
    const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false)

    return (

        <>
            {plantUser && currentPlant && currentHouseplantArray &&
            <Wrapper>
                <SubTitle>{currentPlant.commonName}{currentPlant.commonName.charAt(currentPlant.commonName.length -1) === "s" ? "'" : "s" } in your home</SubTitle>
                <PlantGrid>
                {currentHouseplantArray.map(houseplant => {
                        return <HouseplantCardInfo key={houseplant._id} houseplant={houseplant}/>
                    })
                }
                </PlantGrid>
            </Wrapper>
            }
        </>
    );
};

const Wrapper = styled.div`
    /* border: 1px solid orange; */
    display: flex;
    flex-direction: column;
    position: relative;
    /* width: fit-content; Not sure about this */
    /* justify-content: center; */
    align-items: center;
    margin-top: 60px;
    width: 100%;
`
const SubTitle = styled.h3`
    /* box-shadow: 0 4px 2px -2px lightgrey; */
    padding-top: 30px;
    border-top: 2px solid grey;
`
const PlantGrid = styled.div`
    /* border: 1px solid red; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 1%;
    margin-top: 40px;
    width: 100%;
`
export default InHome;