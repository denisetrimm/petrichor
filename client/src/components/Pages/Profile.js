import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

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
                </>
            }
            
        </>
    );
}

export default Profile;