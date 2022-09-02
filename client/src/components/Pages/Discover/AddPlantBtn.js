import styled from "styled-components";
import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddCircle } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { PlantContext } from '../../../context/PlantContext';
import { UserContext } from '../../../context/UserContext';

const AddPlantBtn = ({plant}) => {

    const {addPlantToHome} = useContext(UserContext);

    const handleClick = (e, plant) => {
        e.stopPropagation();
        addPlantToHome(plant);
    }

    return (

        <AddBtn type="button" onClick={(e)=> {handleClick(e, plant)}}>
            <MdAdd />
        </AddBtn>

    );
}

const AddBtn = styled.button`
    background-color: var(--color-primaryHighlightThick);
    padding: 10px 10px 6px;
    /* position: relative; */
    /* left: 40px */
    position: absolute;
    top: -15px;
    left: 15px;
    z-index: 80;

`
export default AddPlantBtn;