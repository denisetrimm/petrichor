// STYLING
import styled from 'styled-components';
// ICONS
import { GoSearch } from "react-icons/go";
import { TbAdjustments } from "react-icons/tb";
import { TbAdjustmentsOff } from "react-icons/tb";
// CONTEXT & HOOKS
import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantContext } from '../../../context/PlantContext';

const TypeAhead = () => {

    const navigate = useNavigate();
    const {
        allPlants, 
        setFilteredPlants, 
        handleClear, 
        searchInputValue, 
        setsearchInputValue,
        searchActive,
        setSearchActive,
        sortOpen,
        setSortOpen,
    } = useContext(PlantContext);

    // IF THE USER INPUT FIELD IS BLANK, RESET SEARCH. IF USER IS TYPING, SHOW TYPEAHEAD
    const handleInputChange = (e) => {
        e === "" 
            ?   handleClear() 
            :   setsearchInputValue(e); 
                setSearchActive(false)
    }

    // TYPEAHEAD - SEARCH FOR TYPED STRING IN THE PLANT NAMES
    const filteredPlantsCommon = allPlants.filter(plant => {
                return plant.commonName.toLowerCase().includes(searchInputValue.toLowerCase())
            })
    const filteredPlantsBotanical = allPlants.filter(plant => {
                return plant.botanicalName.toLowerCase().includes(searchInputValue.toLowerCase())
            })

    // TYPEAHEAD - WHEN THE USER CLICKS ON A TYPEAHEAD SUGGESTION, NAVIGATE TO THE ITEM DETAILS PAGE AND CLEAR THE INPUT FIELD
    const handleSuggestionClick = (plant) => {
        handleClear();
        navigate(`/plants/${plant._id}`)
    }

    // SEARCH FUNCTION - HIDE TYPEAHEAD, ONLY SHOW FILTERED CARDS
    const handleSearch = () => {
        
        setSearchActive(true)

        // SEARCH FOR TYPED STRING IN THE PLANT NAMES
        const filteredPlantsCommon = allPlants.filter(plant => {
            return plant.commonName.toLowerCase().includes(searchInputValue.toLowerCase())
        })

        const filteredPlantsBotanical = allPlants.filter(plant => {
            return plant.botanicalName.toLowerCase().includes(searchInputValue.toLowerCase())
        })

        // REMOVE DUPLICATES OF PLANTS IF INPUT APPEARS IN BOTH COMMON AND BOTANICAL
        let listOfFilteredPlants = [];

        if (filteredPlantsCommon.length > 0 && filteredPlantsBotanical.length > 0){
            filteredPlantsCommon.forEach(commonPlant => {
                const duplicateplant = listOfFilteredPlants.find( listedPlant => {
                    return listedPlant._id === commonPlant._id
                })
                if(!duplicateplant){
                    listOfFilteredPlants.push(commonPlant)
                }
            });
            filteredPlantsBotanical.forEach(botanicalPlant => {
                const duplicateplant = listOfFilteredPlants.find( listedPlant => {
                    return listedPlant._id === botanicalPlant._id
                })
                if(!duplicateplant){
                    listOfFilteredPlants.push(botanicalPlant)
                }
            });
        }
        else {
            listOfFilteredPlants = [...filteredPlantsCommon, ...filteredPlantsBotanical]
        }
        setFilteredPlants(listOfFilteredPlants)
    }

    return (
        <>
            <SearchDiv>

            {/* SEARCH BAR */}
                <SearchBar 
                    type="text" 
                    value={searchInputValue}
                    placeholder="Plants, plants everywhere..."
                    onChange={(e) => {handleInputChange(e.target.value)}} 
                    onKeyDown={(e) => {
                        e.key === "Enter" && handleSearch()
                    }}
                />
                <SearchBtn onClick={()=> {handleSearch()}}><GoSearch/></SearchBtn>

            {/* SORT & CLEAR BUTTON */}
                {!sortOpen &&
                    <AdjustmentsBtn type="button" onClick={() => {setSortOpen(true)}}>
                        <TbAdjustments size="20"/>
                    </AdjustmentsBtn>
                }
                {sortOpen &&
                    <AdjustmentsBtn type="button" onClick={() => {handleClear()}}>
                        <TbAdjustmentsOff size="20"/>
                    </AdjustmentsBtn>
                }
                <ClearBtn onClick={()=> {handleClear()}}>Clear</ClearBtn>
            
            {/* RENDER TYPEAHEAD SUGGESTIONS */}
                {!searchActive && ( filteredPlantsCommon.length > 0 || filteredPlantsBotanical.length > 0 ) && searchInputValue.length >= 2
                &&
                <PlantList>
                    {
                        filteredPlantsCommon.map(plant => {
                            // FIND INDEX OF WORD IN COMMON NAME AND SPLIT FOR STYLING
                            let indexOfsecondHalf = plant.commonName.toLowerCase().indexOf(searchInputValue.toLowerCase())
                            let firstHalf = plant.commonName.slice(0, indexOfsecondHalf + searchInputValue.length)
                            let secondHalf = plant.commonName.slice(indexOfsecondHalf + searchInputValue.length)
                            
                            // CLICKING A SUGGESTION NAVIGATES TO THE PLANT DETAILS PAGE
                            return <PlantListItem 
                                        key={plant._id} 
                                        onClick={()=> {handleSuggestionClick(plant)}}
                                    >
                                        {firstHalf}<Prediction>{secondHalf}</Prediction> <BotanicalName> &#8226; <BotanicalNameSpan>{plant.botanicalName}</BotanicalNameSpan></BotanicalName>
                                    </PlantListItem>
                        })
                    }
                    {
                        filteredPlantsBotanical.map(plant => {
                            // FIND INDEX OF WORD IN BOTANICAL NAME AND SPLIT FOR STYLING
                            let indexOfsecondHalf = plant.botanicalName.toLowerCase().indexOf(searchInputValue.toLowerCase())
                            let firstHalf = plant.botanicalName.slice(0, indexOfsecondHalf + searchInputValue.length)
                            let secondHalf = plant.botanicalName.slice(indexOfsecondHalf + searchInputValue.length)
                            
                            // CLICKING A SUGGESTION NAVIGATES TO THE PLANT DETAILS PAGE
                            return <PlantListItem 
                                        key={plant._id} 
                                        onClick={()=> {handleSuggestionClick(plant)}}
                                    >
                                        {plant.commonName}<BotanicalName> &#8226; <BotanicalNameSpan>{firstHalf}<Prediction>{secondHalf}</Prediction></BotanicalNameSpan></BotanicalName>
                                    </PlantListItem>
                        })
                    }
                </PlantList> 
                }
        </SearchDiv>
    </>
    );
};

const SearchDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;
const BotanicalName = styled.span`
    font-style: italic;
    font-size: 12px;
`;
const BotanicalNameSpan = styled.span`
    color: var(--color-gold);
`;
const SearchBar = styled.input`
    position: relative;
    font-size: 16px;
    height: 35px;
    width: 400px;
    padding-left: 12px;
    border: 2px solid var(--color-creamAccent);
    border-radius: 40px;
    &:focus-visible {
        outline: 2px solid var(--color-creamAccent);
        border: 2px solid var(--color-creamAccent);
    }
`;
const ClearBtn = styled.button`
    color: #fff;
    background-color: var(--color-primaryHighlightThick);
    border: none;
    border-radius: 40px;
    font-size: 12px;
    margin-left: 5px;
    padding: 8px 12px;
    transition: ease-in-out 100ms;
    &:focus-visible {
        outline: 4px lightblue solid;   
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
const AdjustmentsBtn = styled.button`
    padding: 4px 5px 2px 6px;
    margin-left: 5px;
`
const PlantList = styled.ul`
    z-index: 100;
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 10px;
    width: 530px;
    background-color: white;
    font-size: 18px;
    position: absolute;
    top: 60px;
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

export default TypeAhead;