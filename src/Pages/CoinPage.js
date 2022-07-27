import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { makeStyles } from "@material-ui/core/styles";
import CoinInfo from "../components/CoinInfo";
import { Container, LinearProgress, Typography } from "@material-ui/core";
import parse from "html-react-parser";

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();

    const { currency, symbol, formatAmount } = CryptoState();
    // console.log(id);
    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
    };
    useEffect(() => {
        fetchCoin();
    }, []);
    // console.log(coin);

    const classes = useStyles();

    if (!coin) return <LinearProgress />;

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height='200'
                    style={{ marginBottom: 20 }}
                />
                <Typography variant='h3' className={classes.heading}>
                    {coin?.name}
                </Typography>
                <Typography variant='subtitle1' className={classes.description}>
                    {parse(`<p> ${coin?.description.en.split(". ")[0]} </p>`)}
                </Typography>
                <div className={classes.marketData}>
                    <span style={{ display: "flex" }}>
                        <Typography variant='h5' className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant='h5'
                            style={{ fontFamily: "cursive" }}>
                            {coin.coingecko_rank}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography variant='h5' className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant='h5'
                            style={{ fontFamily: "cursive" }}>
                            {symbol}{" "}
                            {formatAmount(
                                coin.market_data.current_price[
                                    currency.toLowerCase()
                                ],
                            )}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography variant='h5' className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant='h5'
                            style={{ fontFamily: "cursive" }}>
                            {symbol}{" "}
                            {formatAmount(
                                coin.market_data.market_cap[
                                    currency.toLowerCase()
                                ]
                                    .toString()
                                    .slice(0, -6),
                            )}
                            M
                        </Typography>
                    </span>
                </div>
            </div>
            <CoinInfo coin={coin} />
        </div>
    );
};

export default CoinPage;
const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },
    sidebar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
            borderLeft: "2px solid grey",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
    },
    heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "cursive",
    },
    description: {
        width: "100%",
        fontFamily: "cursive",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
    },
    marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
            alignItems: "start",
        },
    },
}));
