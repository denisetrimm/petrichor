//STYLING
import styled from "styled-components";
// ICONS
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { TbAdjustments } from "react-icons/tb";
import { TbAdjustmentsOff } from "react-icons/tb";
import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
//HOOKS & CONTEXT
import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantContext } from '../../../context/PlantContext';
import { UserContext } from '../../../context/UserContext';
import { useEffect } from "react";

const SortFilter = () => {

    const {
        allPlants, 
        filteredPlants, 
        setFilteredPlants,
        sortOpen,
        sortType, 
        setSortType, 
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
    useEffect(()=> {

        switch(sortType) {

            case ("commonAscending"):
                setFilteredPlants(filteredPlants.sort(compareCommonNamesAsc))
                console.log("ca complete")
                break;

            case ("commonDescending"):
                setFilteredPlants(filteredPlants.sort(compareCommonNamesDsc))
                console.log("cd complete")
                break;

            case ("botanicalAscending"):
                setFilteredPlants(filteredPlants.sort(compareBotanicalNamesAsc))
                console.log("ba complete")
                break;

            case ("botanicalDescending"):
                setFilteredPlants(filteredPlants.sort(compareBotanicalNamesDsc))
                console.log("bd complete")
                break;

            default:
                console.log("switch default")
                setFilteredPlants(allPlants)
        }
        console.log(filteredPlants)
        console.log(sortType)

    }, [sortType, allPlants])

    // const handleChange = (e) => {
    //     setSortType(e.target.value)
    // }

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
                        checked={sortType === "commonAscending" && true}
                        onChange={(e)=> {setSortType(e.target.value)}}
                    />
                    <AiOutlineSortAscending size="20"/>
                </label>
                <label htmlFor="commonDescending">
                    <input 
                        type="radio"
                        id="commonDescending"
                        value="commonDescending"
                        name="sortName"
                        checked={sortType === "commonDescending" && true}
                        onChange={(e)=> {setSortType(e.target.value)}}
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
                        checked={sortType === "botanicalAscending" && true}
                        onChange={(e)=> {setSortType(e.target.value)}}
                    />
                    <AiOutlineSortAscending size="20"/>
                </label>

                <label htmlFor="botanicalDescending">
                <input 
                    type="radio"
                    id="botanicalDescending"
                    value="botanicalDescending"
                    checked={sortType === "botanicalDescending" && true}
                    name="sortName"
                    onChange={(e)=> {setSortType(e.target.value)}}
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