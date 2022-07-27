import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

const Carousel = () => {
    const [treanding, setTreanding] = useState([]);

    const classes = useStyles();
    const { currency, symbol, formatAmount } = CryptoState();

    const fetchTreandingCoins = async () => {
        // console.log(TrendingCoins(currency));
        const { data } = await axios.get(TrendingCoins(currency));
        setTreanding(data);
    };
    useEffect(() => {
        fetchTreandingCoins();
    }, [currency]);

    // console.log(treanding);

    const items = treanding.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img
                    src={coin.image}
                    alt={coin.name}
                    height='80'
                    style={{ marginBottom: 10 }}
                />
                <span
                    style={{
                        color: profit > 0 ? "rgb(14,203,129)" : "red",
                        fontWeight: 500,
                    }}>
                    {coin.symbol} &nbsp;
                    {profit && "+"}
                    {coin.price_change_percentage_24h.toFixed(2)}
                </span>
                <br />
                <span>{coin.name} </span>
                <span>
                    {symbol}
                    {formatAmount(coin.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    const responsive = {
        0: {
            items: 2,
        },
        300: {
            items: 3,
        },
        758: {
            items: 5,
        },
    };

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1500}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    );
};

export default Carousel;

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
        background: "rgba(0,0,0,0.6)",
        boxShadow: "1px 1px 15px rgba(220,220,220,0.5)",
        marginLeft: "1rem",
        padding: "0.5rem",
        borderRadius: "20px",
    },
}));
