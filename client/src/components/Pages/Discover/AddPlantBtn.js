import styled from "styled-components";
import {useContext} from 'react';
import { MdAdd } from "react-icons/md";
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
    position: absolute;
    top: -10px;
    left: 15px;
    z-index: 80;
`
export default AddPlantBtn;