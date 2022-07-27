import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@material-ui/core";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";

function App() {
    const useStyles = makeStyles(() => ({
        App: {
            backgroundColor: "#14161a",
            color: "white",
            minHeight: "100vh",
        },
    }));

    const classes = useStyles();
    return (
        <BrowserRouter>
            <div className={classes.App}>
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />

                    <Route path='/coins/:id' element={<CoinPage />} />

                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
