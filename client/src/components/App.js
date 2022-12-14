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
import MyHome from "./Pages/MyHome/MyHome";
import Discover from "./Pages/Discover/Discover";
import PlantDetails from "./Pages/PlantDetails/PlantDetails";
import Water from "./Pages/Water/Water";
import Profile from "./Pages/Profile/Profile";
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
					<Petrichor>Petrichor <Phonetic>/ˈpeˌtrīkôr/</Phonetic>  <Definition>The scent produced when rain falls on dry soil</Definition></Petrichor>
					
					<PageContainer>
						<Routes>
							<Route exact path="/" element={ <Discover /> } />
							<Route exact path="/plants/:plantId" element={ <PlantDetails /> } />
							<Route exact path="/my-home" element={ <MyHome /> } />
							<Route exact path="/water" element={ <Water /> } />
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

const Wrapper = styled.div`
	height: 100%;
	display: flex;
`
const NavContainer = styled.div`
    min-width: 13%;
`
const MainContainer = styled.div`
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
	top: 143px;
`
const Definition = styled.span`
	margin-left: 5px;
	font-weight: lighter;
	font-size: 14px;
`
const Phonetic = styled.span`
	font-weight: normal;
	margin-left: 10px;
	font-size: 18px;
	font-family: var(--font-secondary);
`
const PageContainer = styled.div`
    flex-grow: 15;
    flex-shrink: 1;
    height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`
export default App;