import styled from "styled-components";
import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddCircle } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { PlantContext } from '../../../context/PlantContext';
import { UserContext } from '../../../context/UserContext';

const AddPlantBtn = ({plant}) => {

    const handleClick = (e, plant) => {
        e.stopPropagation();
        alert(`Added plant ${plant.commonName} to My Home`)
        // Create user context patch function that adds plant
    }

    return (

        <AddBtn type="button" onClick={(e)=> {handleClick(e, plant)}}>
            <MdAdd />
        </AddBtn>

    );
}

const AddBtn = styled.button`
    padding: 10px 10px 6px;
    /* position: absolute;
    top: -65px;
    left: -30px;
    z-index: 3; */
`
export default AddPlantBtn;