
import styled from 'styled-components';
import { GoSearch } from "react-icons/go";

import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantContext } from '../../../context/PlantContext';
import { UserContext } from '../../../context/UserContext';

const TypeAhead = () => {

    const navigate = useNavigate();
    const {allPlants} = useContext(PlantContext);
    const [inputValue, setInputValue] = useState("");

    // Return results that match what the user types
    const filteredPlantsCommon = allPlants.filter(plant => {
                return plant.commonName.toLowerCase().includes(inputValue.toLowerCase())
            })
    const filteredPlantsBotanical = allPlants.filter(plant => {
                return plant.botanicalName.toLowerCase().includes(inputValue.toLowerCase())
            })
    // const filteredPlantsAdditional = allPlants.filter(plant => {
    //             return plant.additionalName.toLowerCase().includes(inputValue.toLowerCase())
    //         })
    
    // When a user clicks on a suggestion, navigate to the item details page and clear the input field
    const handleSuggestionClick = (plant) => {
        navigate(`/plants/${plant._id}`)
        setInputValue("");
    }

    return (
        <>
        <FlexCol>
            <SearchDiv>
                <SearchBar 
                    type="text" 
                    value={inputValue}
                    placeholder="Plants, plants everywhere..."
                    onChange={(e) => {setInputValue(e.target.value)}} 
                    // onKeyDown={(e) => {
                    //     e.key === "Enter" && ; Might have to add filtering logic later
                    // }}
                />
                <SearchBtn onClick={()=> {setInputValue("")}}><GoSearch/></SearchBtn>
                {/* <ClearBtn onClick={()=> {setInputValue("")}}>Clear</ClearBtn> */}
            

        {
            // Render matches
            // (filteredPlantsCommon.length > 0 || filteredPlantsBotanical.length > 0 || filteredPlantsAdditional.length > 0) && inputValue.length >= 2 
            (filteredPlantsCommon.length > 0 || filteredPlantsBotanical.length > 0 ) && inputValue.length >= 2
            &&
            <PlantList>
                {
                    filteredPlantsCommon.map(plant => {
                        // Find index of word and split for styling
                        let indexOfsecondHalf = plant.commonName.toLowerCase().indexOf(inputValue.toLowerCase())
                        let firstHalf = plant.commonName.slice(0, indexOfsecondHalf + inputValue.length)
                        let secondHalf = plant.commonName.slice(indexOfsecondHalf + inputValue.length)
                        // Clicking a suggestion navigates to the plant details page
                        return <PlantListItem 
                                    key={plant._id} 
                                    onClick={()=> {handleSuggestionClick(plant)}}
                                >
                                    {firstHalf}<Prediction>{secondHalf}</Prediction> <Family> &#8226; <FamilySpan>{plant.botanicalName}</FamilySpan></Family>
                                </PlantListItem>
                    })}
                    {
                    filteredPlantsBotanical.map(plant => {
                        // Find index of word and split for styling
                        let indexOfsecondHalf = plant.botanicalName.toLowerCase().indexOf(inputValue.toLowerCase())
                        let firstHalf = plant.botanicalName.slice(0, indexOfsecondHalf + inputValue.length)
                        let secondHalf = plant.botanicalName.slice(indexOfsecondHalf + inputValue.length)
                        // Clicking a suggestion navigates to the plant details page
                        return <PlantListItem 
                                    key={plant._id} 
                                    onClick={()=> {handleSuggestionClick(plant)}}
                                >
                                    {firstHalf}<Prediction>{secondHalf}</Prediction> <Family> &#8226; <FamilySpan>{plant.commonName}</FamilySpan></Family>
                                </PlantListItem>
                    })
                }
                    {/* {
                    filteredPlantsAdditional.map(plant => {
                        // Find index of word and split for styling
                        let indexOfsecondHalf = plant.additionalName.toLowerCase().indexOf(inputValue.toLowerCase())
                        let firstHalf = plant.additionalName.slice(0, indexOfsecondHalf + inputValue.length)
                        let secondHalf = plant.additionalName.slice(indexOfsecondHalf + inputValue.length)
                        // Clicking a suggestion navigates to the plant details page
                        return <PlantListItem 
                                    key={plant._id} 
                                    onClick={()=> {handleSuggestionClick(plant)}}
                                >
                                    {firstHalf}<Prediction>{secondHalf}</Prediction> <Family> &#8226; <FamilySpan>{plant.commonName}</FamilySpan></Family>
                                </PlantListItem>
                    })
                } */}
            </PlantList> 
        }
        </SearchDiv>
        </FlexCol>
    </>
    );
};

export default TypeAhead;

const SearchDiv = styled.div`
    display: relative;
`;
const Family = styled.span`
    font-style: italic;
    font-size: 12px;
`;
const FamilySpan = styled.span`
    color: var(--color-gold);
`;
const SearchBar = styled.input`
border: 1px solid purple;
    position: relative;
    font-size: 16px;
    height: 35px;
    width: 400px;
    padding-left: 12px;
    border: 2px solid var(--color-creamAccent);
    border-radius: 40px;
    &:focus-visible {
        outline: 2px solid var(--color-secondary);
    }
`;
const ClearBtn = styled.button`
    color: #fff;
    background-color: var(--color-primaryHighlightThick);
    border: none;
    border-radius: 40px;
    font-size: 18px;
    margin-left: 10px;
    padding: 8px 12px;
    transition: ease-in-out 100ms;
    &:focus-visible {
        outline: 4px lightblue solid ;
    }
    &:hover{
        transform: scale(1.05);
    }
    &:active{
        transform: scale(.95);
        background-color: var(--color-lightBlue);
    }
`;
const SearchBtn = styled.button`
    color: #fff;
    background-color: var(--color-primaryMedium);
    border: none;
    border-radius: 50%;
    /* font-size: 18px; */
    margin-left: 10px;
    padding: 5px 8px;
    transition: ease-in-out 100ms;
    &:focus-visible {
        outline: 4px lightblue solid ;
    }
    &:hover{
        transform: scale(1.05);
        background-color: var(--color-primaryDark);
    }
    &:active{
        transform: scale(.95);
        background-color: var(--color-lightBlue);
    }
`;
const PlantList = styled.ul`
    z-index: 1;
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 10px;
    width: 500px;
    margin-top: 5px;
    background-color: white;
    font-size: 18px;
    position: absolute;
`;
const PlantListItem = styled.li`
    z-index: 1;
    padding: 10px;
    font-size: 18px;
    &:hover {
        background-color: whitesmoke;
        border-radius: 5px;
    }
`;
const Prediction = styled.span`
    font-weight: bold;
`;
const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 30px;
`;