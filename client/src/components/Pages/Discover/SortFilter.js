//STYLING
import styled from "styled-components";
// ICONS
import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
//HOOKS & CONTEXT
import {useContext} from 'react';
import { PlantContext } from '../../../context/PlantContext';

const SortFilter = ({filteredPlants, setFilteredPlants}) => {

    const {
        allPlants,
        sortOpen,
    } = useContext(PlantContext);

    // SORTING FUNCTIONS - COMMON
    const compareCommonNamesAsc = (a, b) => {
        const nameA = a.commonName.toUpperCase();
        const nameB = b.commonName.toUpperCase();

        let comparison = 0;
        if (nameA > nameB){
            comparison = 1
        }
        else {
            comparison = -1
        }
        return comparison
    }

    const compareCommonNamesDsc = (a, b) => {
        const nameA = a.commonName.toUpperCase();
        const nameB = b.commonName.toUpperCase();

        let comparison = 0;
        if (nameA < nameB){
            comparison = 1
        }
        else {
            comparison = -1
        }
        return comparison
    }

    // SORTING FUNCTIONS - BOTANICAL
    const compareBotanicalNamesAsc = (a, b) => {
        const nameA = a.botanicalName.toUpperCase();
        const nameB = b.botanicalName.toUpperCase();

        let comparison = 0;
        if (nameA > nameB){
            comparison = 1
        }
        else {
            comparison = -1
        }
        return comparison
    }

    const compareBotanicalNamesDsc = (a, b) => {
        const nameA = a.botanicalName.toUpperCase();
        const nameB = b.botanicalName.toUpperCase();

        let comparison = 0;
        if (nameA < nameB){
            comparison = 1
        }
        else {
            comparison = -1
        }
        return comparison
    }

    // SWITCH THAT CALLS THE CORRECT FUNCTION WHEN RADIO BUTTON IS CLICKED
    const handleClick = (e)=> {

        let newArray = [];
        
        switch(e.target.value) {

            case ("commonAscending"):
                newArray = filteredPlants.sort(compareCommonNamesAsc)
                setFilteredPlants((prev)=> [...newArray])
                break;

            case ("commonDescending"):
                newArray = filteredPlants.sort(compareCommonNamesDsc)
                setFilteredPlants((prev)=> [...newArray])
                break;

            case ("botanicalAscending"):
                newArray = filteredPlants.sort(compareBotanicalNamesAsc)
                setFilteredPlants((prev)=> [...newArray])
                break;

            case ("botanicalDescending"):
                newArray = filteredPlants.sort(compareBotanicalNamesDsc)
                setFilteredPlants((prev)=> [...newArray])
                break;

            default:
                console.log("switch default")
                setFilteredPlants(allPlants)
        }
    }
        

    return (
        <>
            {sortOpen && filteredPlants &&
            <>
                <FlexDiv>
                    <NameSpan>Common name</NameSpan>
                    <label htmlFor="commonAscending">
                        <input 
                            type="radio"
                            id="commonAscending"
                            value="commonAscending"
                            name="sortName"
                            onClick={handleClick}
                        />
                        <AiOutlineSortAscending size="20"/>
                    </label>
                    
                    <label htmlFor="commonDescending">
                        <input 
                            type="radio"
                            id="commonDescending"
                            value="commonDescending"
                            name="sortName"
                            onClick={handleClick}
                        />
                        <AiOutlineSortDescending size="20"/>
                    </label>
                    
                    <NameSpan2>Botanical name</NameSpan2>
                    <label htmlFor="botanicalAscending">
                        <input 
                            type="radio"
                            id="botanicalAscending"
                            value="botanicalAscending"
                            name="sortName"
                            onClick={handleClick}
                        />
                        <AiOutlineSortAscending size="20"/>
                    </label>

                    <label htmlFor="botanicalDescending">
                    <input 
                        type="radio"
                        id="botanicalDescending"
                        value="botanicalDescending"
                        // checked={sortType === "botanicalDescending" && true}
                        name="sortName"
                        onClick={handleClick}
                    />
                    <AiOutlineSortDescending size="20"/>
                    </label>
                </FlexDiv>
            </>
            }
        </>
    )
}

const FlexDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const NameSpan = styled.span`
    font-weight: bold;
    color: var(--color-primaryMedium);
    margin-right: 5px;
`
const NameSpan2 = styled.span`
    font-weight: bold;
    color: var(--color-primaryMedium);
    margin: 0 5px 0 25px;
`
export default SortFilter;