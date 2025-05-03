import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Container, Typography} from "@mui/material";
import Registration from "./features/User/Registration.tsx";
import Authentication from "./features/User/Authentication.tsx";

const App = () => {


  return (
    <>
        <header>
            <AppToolbar/>
        </header>
        <Container>
            <Routes>
                <Route path="/registration" element={<Registration/>} />
                <Route path="/authentication" element={<Authentication/>} />
                <Route path="*" element={<Typography variant={"h2"}>Page not found</Typography>} />
            </Routes>
        </Container>
    </>
  )
};

export default App
