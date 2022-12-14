import styled from "styled-components";
// ICONS
import Logo from "./UI/Logo";
import { GoSearch } from "react-icons/go"; // DISCOVER
import { BiHome } from "react-icons/bi"; // MY HOME
import { MdOutlineWaterDrop } from "react-icons/md"; // THIRSTY BB
import { FaRegUserCircle } from "react-icons/fa"; // PROFILE
// LINKS
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom";
// AUTHENTICATION
import LoginButton from "./Login"
import LogoutButton from "./Logout"
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <>
        <NavDiv>
                <LogoLink exact to="/">
                    <Logo />
                </LogoLink>
            {isAuthenticated &&
                <>
                <NavigationLink exact to="/">
                    <IconSpan>
                        <GoSearch size={40} />
                    </IconSpan> 
                    <NameSpan>Discover</NameSpan>
                </NavigationLink>

                <NavigationLink exact to="/my-home">
                    <IconSpan>
                        <BiHome size={40} />
                    </IconSpan>
                    <NameSpan>My Home</NameSpan>
                </NavigationLink>

                <NavigationLink exact to="/water">
                    <IconSpan>
                        <MdOutlineWaterDrop size={40} />
                    </IconSpan>
                    <NameSpan>Water</NameSpan>
                </NavigationLink>

                <NavigationLink exact to="/profile">
                    <IconSpan>
                        <FaRegUserCircle size={40} />
                    </IconSpan> 
                    <NameSpan>Profile</NameSpan>
                </NavigationLink>

                <LogoutButton/>
                </>
            }
            {!isAuthenticated &&
                <LoginButton/>
            }
        </NavDiv>
        </>
    );
}

export default Sidebar;

const NavDiv = styled.nav`
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    background: rgb(30,12,12);
    background: linear-gradient(0deg, rgba(30,12,12,1) 0%, rgba(3,19,19,1) 100%);
`;
const LogoLink = styled(Link)`
    border-radius: 50%;
    align-self: center;
    margin-top: 40px;
    padding: 5px;
    width: fit-content;
    &:hover {
        background-color: var(--color-primaryHighlight);
    }
`
const NavigationLink = styled(NavLink)`
    color: var(--color-creamAccent);
    text-decoration: none;
    font-weight: bold;
    padding: 20px;
    display: flex;
    align-items: center;
    transition: background-color 400ms ease-out;
    &:nth-of-type(2) {
        margin-top: 140px;
    }
    &:hover {
        background-color: var(--color-primaryHighlightThick);
    }
    &.active {
        background-color: var(--color-primaryHighlight);
    }
    @media (max-width: 1450px) {
        align-self: center;
        border-radius: 40px;
        width: fit-content;
    }
`;

const IconSpan = styled.span`
    margin-right: 20px;
    @media (max-width: 1450px) {
        margin: 0;
    }
`;

const NameSpan = styled.span`
    font-size: 20px;
    @media (max-width: 1650px) {
    font-size: 18px;
    }
    @media (max-width: 1450px) {
    display: none;
    }
`