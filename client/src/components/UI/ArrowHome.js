import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const ArrowHome = ({title}) => {

    return(
        <div>
            <HoverLink exact to={`/`}><FiArrowLeft/></HoverLink><PageTitle>{title}</PageTitle>
        </div>
    )
}

export default ArrowHome;

const PageTitle = styled.h2`
    display: inline-block;
    font-weight: bold;
    margin: 20px;
`;

const HoverLink = styled(Link)`
    padding: 5px;
    padding-bottom: 1px;
    &:hover {
        border-radius: 50%;
        background-color: green;
    }
`