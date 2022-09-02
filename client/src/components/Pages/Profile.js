import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import moment from 'moment';
import BackArrow from "../UI/BackArrow";

const Profile = () => {
    const { user, isAuthenticated, isLoading, logout} = useAuth0();
    const {deleteUserProfile, plantUser} = useContext(UserContext);

    
    return (
        <>
        <BackArrow/>
            { isLoading &&
                <p>Loading...</p>
            }
            {isAuthenticated && plantUser &&
                <>
                <h1>Profile</h1>
                <img src={user.picture} alt="Profile" style={{width: "120px", borderRadius: "50%"}}/>
                <p>{user.given_name} {user.family_name}</p>
                <p>{user.email}</p>
                <p>Joined: {moment(plantUser.dateJoined).format("MMM DD, YYYY")}</p>
                <button type="button" onClick={() => {deleteUserProfile()}}>Delete Profile</button>
                </>
            }
            
        </>
    );
}

export default Profile;