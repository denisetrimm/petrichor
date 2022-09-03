import styled from "styled-components";
import { IoLeafOutline } from "react-icons/io5"; //Leaf
import { MdPets } from "react-icons/md"; //Pets
import { TbShovel } from "react-icons/tb"; //Soil
import { MdOutlineWbSunny } from "react-icons/md"; //Sun - Bright Indirect
import { IoPartlySunnyOutline } from "react-icons/io"; //Partial shade
import { MdOutlineFilterDrama} from "react-icons/md"; //Low
import { WiHumidity } from "react-icons/wi"; //Humidity
import { WiRaindrops } from "react-icons/wi"; //Multi-water

const CareRequirement = ({children, color, backgroundColor}) => {
    return (
        <Requirement color={color} backgroundColor={backgroundColor}>
        {children}
        </Requirement>
    );
}

const Requirement = styled.div`
    /* border: 1px solid red; */
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    padding: 20px 30px;
    margin: 15px;
    border-radius: 20px;
`
export default CareRequirement;