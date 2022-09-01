import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    
    const { loginWithRedirect } = useAuth0();

    return (
        <LoginBtn onClick={() => loginWithRedirect()}>Log In</LoginBtn>
    );
};

const LoginBtn = styled.button`
    margin-top: 100px;
    align-self: center;
    padding: 10px 20px;
    width: 70%;
`

export default LoginButton;