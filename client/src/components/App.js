// STYLING
import styled from "styled-components";
import GlobalStyles from "./UI/GlobalStyles";

// ROUTER
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// PAGE COMPONENTS
import MyHome from "./Pages/MyHome";
import Discover from "./Pages/Discover";
import PlantDetails from "./Pages/PlantDetails";
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
  max-width: 1200px;
  height: 100vh;
  display: flex;
`
const NavContainer = styled.div`
    /* border: 1px solid purple; */
    min-width: 21%;
    max-width: 200px;
    flex-grow: 2;
    flex-shrink: 5;
`
const MainContainer = styled.div`
    /* border: 1px solid green; */
    width: 75%;
    flex-grow: 15;
    flex-shrink: 1;
    height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: var(--color-cream);
    
`
const PageContainer = styled.div`
    /* border: 1px solid green; */
    flex-grow: 15;
    flex-shrink: 1;
    height: 100vh;
	display: flex;
	flex-direction: column;
	margin-left: 20px;
    
`