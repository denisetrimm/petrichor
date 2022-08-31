import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
    const { user, isAuthenticated, isLoading, logout} = useAuth0();
    const {deleteUserProfile} = useContext(UserContext);

    
    return (
        <>
            { isLoading &&
                <p>Loading...</p>
            }
            { isAuthenticated &&
                <>
                <h1>Profile</h1>
                <img src={user.picture} alt="Profile" style={{width: "120px", borderRadius: "50%"}}/>
                <p>{user.given_name} {user.family_name}</p>
                <button type="button" onClick={() => {deleteUserProfile()}}>Delete Profile</button>
                </>
            }
            
        </>
    );
}

export default Profile;