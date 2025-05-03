import {AppBar, Grid, Toolbar, Box, Typography} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {systemLogout, selectUser} from "../../../features/User/userSlice.ts";
import {Nav} from "react-bootstrap";

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onLogout = () => {
        const warning = confirm("Do you really want to log out?");
        if (!warning) return;
        dispatch(systemLogout());
        navigate("/");
    }

    return (
        <AppBar position="static" sx={{backgroundColor: "#5F9EA0", marginBottom: "50px"}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <Grid>
                    <Typography variant="h5">
                        <NavLink style={{color: "white", textDecoration: "none"}} to="/">
                            Flea market
                        </NavLink>
                    </Typography>
                </Grid>
                <Grid>
                    {
                        user ? <Box display="flex" alignItems="center">
                                <span className="d-block me-3">Hello, <b>{user.username}!</b></span>
                                <NavLink
                                    className="nav-item text-white"
                                    to="/add-new-item"
                                >Add new item</NavLink>
                                <span className="mx-2">or</span>
                                <NavLink
                                    className="nav-item text-white"
                                    to="/"
                                    onClick={onLogout}
                                >Logout</NavLink>
                            </Box>
                            : <Nav>
                                <NavLink
                                    className="nav-item text-white"
                                    to="/registration"
                                >Registration</NavLink>
                                <span className="mx-2">or</span>
                                <NavLink
                                    className="nav-item text-white"
                                    to="/login"
                                >Login</NavLink>
                            </Nav>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;