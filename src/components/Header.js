import {
    AppBar,
    Container,
    createTheme,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const Header = () => {
    const classes = useStyles();

    const { currency, setCurrency } = CryptoState();

    // console.log(currency, setCurrency);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#FFF",
            },
            type: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography className={classes.title} variant='h6'>
                            <Link to='/'>Crypt Coins</Link>
                        </Typography>
                        <Select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            variant='outlined'
                            className={classes.selectmenu}>
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: ["cursive", "Roboto"],
        fontWeight: "bold",
        letterSpacing: "1.5px",
        cursor: "pointer",
    },
    selectmenu: {
        width: 100,
        height: 40,
        marginRight: 15,
    },
}));
