import styled from "styled-components";

import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { PlantContext } from '../../../context/PlantContext';
import { UserContext } from '../../../context/UserContext';

const SortFilter = () => {

    return (
        <>
        SortFilter
        <AiOutlineSortAscending/>
        <AiOutlineSortDescending/>
        </>
    );
}

export default SortFilter;