import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Container, Typography} from "@mui/material";
import Registration from "./features/User/Registration.tsx";
import Authentication from "./features/User/Authentication.tsx";
import ItemsList from "./features/Item/ItemsList.tsx";
import AddItem from "./features/Item/AddItem.tsx";
import ProtectedRoute from "./components/UI/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/User/userSlice.ts";
import ItemsDetail from "./features/Item/ItemsDetail.tsx";

const App = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <header>
                <AppToolbar/>
            </header>
            <Container>
                <Routes>
                    <Route path="/" element={<ItemsList/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/item-detail/:id" element={<ItemsDetail/>}/>
                    <Route path="/add-new-item" element={
                        <ProtectedRoute isAllowed={Boolean(user)}><AddItem/></ProtectedRoute>
                    }/>
                    <Route path="/login" element={<Authentication/>}/>
                    <Route path="*"
                           element={<Typography variant={"h3"} color="textSecondary">Page not found</Typography>}/>
                </Routes>
            </Container>
        </>
    )
};

export default App
