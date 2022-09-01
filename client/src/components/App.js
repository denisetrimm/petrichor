// STYLING
import styled from "styled-components";
import GlobalStyles from "./UI/GlobalStyles";

// ROUTER
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// PAGE COMPONENTS
import MyHome from "./Pages/MyHome";
import Discover from "./Pages/Discover/Discover";
import PlantDetails from "./Pages/PlantDetails/PlantDetails";
import ThirstyBB from "./Pages/ThirstyBB";
import Profile from "./Pages/Profile";
import Sidebar from "./Sidebar";
import NotFound from "./Pages/NotFound";
import Banner from "./UI/Banner"


const App = () => {

	return (
		<>
		<GlobalStyles/>
		<BrowserRouter>
			<Wrapper>
				<NavContainer>
					<Sidebar />
				</NavContainer>
				<MainContainer>
					<Banner/>
					<Petrichor>Petrichor <Definition>/ˈpeˌtrīkôr/  The scent produced when rain falls on dry soil</Definition></Petrichor>
					<PageContainer>
						<Routes>
							<Route exact path="/" element={ <Discover /> } />
							<Route exact path="/plants/:plantId" element={ <PlantDetails /> } />
							<Route exact path="/my-home" element={ <MyHome /> } />
							<Route exact path="/thirsty-bb" element={ <ThirstyBB /> } />
							<Route exact path="/profile" element={ <Profile /> } />
							<Route path="*" element={ <NotFound /> } />
						</Routes>
					</PageContainer>
				</MainContainer>
			</Wrapper>
		</BrowserRouter>
		</>
	);
}

export default App;

const Wrapper = styled.div`
  /* border: 1px solid red; */
	height: 100vh;
	display: flex;
`
const NavContainer = styled.div`
    /* border: 1px solid purple; */
    min-width: 13%;
    /* max-width: 180px; */
	/* height: 100vh; */
    /* flex-grow: 2;
    flex-shrink: 5; */
`
const MainContainer = styled.div`
    /* border: 1px solid blue; */
    width: 80%;
    flex-grow: 15;
    flex-shrink: 1;
    height: 100%;
	display: relative;
	background-color: var(--color-cream);
    
`
const Petrichor = styled.h1`
	color: var(--color-cream);
	font-size: 40px;
	font-weight: bold;
	position: absolute;
	top: 145px;
`
const Definition = styled.span`
	margin-left: 10px;
	font-weight: lighter;
	font-size: 14px;
`
const PageContainer = styled.div`
    /* border: 1px solid green; */
    flex-grow: 15;
    flex-shrink: 1;
    height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* margin: 20px; */
    
`