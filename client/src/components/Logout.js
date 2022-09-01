import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    
    const { logout } = useAuth0();

    return (
        <LogoutBtn onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </LogoutBtn>
    );
};

const LogoutBtn = styled.button`
    align-self: center;
    padding: 10px 20px;
    width: 70%;
`
export default LogoutButton;