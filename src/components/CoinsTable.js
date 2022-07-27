import {
    Container,
    createTheme,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ThemeProvider,
    Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { currency, symbol, formatAmount } = CryptoState();

    const navigator = useNavigate();

    const classes = useStyles();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    // console.log(coins);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search),
        );
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: "cursive" }}>
                    Cryptocurrency Price by Market Cap
                </Typography>

                <TextField
                    variant='outlined'
                    label='Seacrh your Crypto Currency...'
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "gold" }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "#eebc1d" }}>
                                <TableRow>
                                    {[
                                        "Coin",
                                        "Price",
                                        "24h Change",
                                        "Market Cap",
                                    ].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "cursive",
                                            }}
                                            key={head}
                                            allign={
                                                head === "Coin" ? "" : "right"
                                            }>
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch()
                                    .slice(
                                        (page - 1) * 10,
                                        (page - 1) * 10 + 10,
                                    )
                                    .map((row) => {
                                        const profit =
                                            row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow
                                                onClick={() =>
                                                    navigator(
                                                        `/coins/${row.id}`,
                                                    )
                                                }
                                                className={classes.row}
                                                key={row.name}>
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                    styles={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}>
                                                    <img
                                                        src={row.image}
                                                        alt={row.name}
                                                        height='50'
                                                        style={{
                                                            marginBottom: 10,
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                        }}>
                                                        <span
                                                            style={{
                                                                textTransform:
                                                                    "uppercase",
                                                                fontSize: 22,
                                                            }}>
                                                            {row.symbol}
                                                        </span>
                                                        <span
                                                            style={{
                                                                color: "darkgrey",
                                                            }}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    align='left'
                                                    style={{
                                                        color:
                                                            profit > 0
                                                                ? "rgb(14,203,129)"
                                                                : "red",
                                                        fontWeight: 700,
                                                        fontSize: 20,
                                                    }}>
                                                    {symbol +
                                                        " " +
                                                        formatAmount(
                                                            row.current_price.toFixed(
                                                                2,
                                                            ),
                                                        )}
                                                </TableCell>

                                                <TableCell
                                                    align='right'
                                                    style={{
                                                        color:
                                                            profit > 0
                                                                ? "rgb(14,203,129)"
                                                                : "red",
                                                        fontWeight: 500,
                                                    }}>
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(
                                                        2,
                                                    )}
                                                </TableCell>

                                                <TableCell align='right'>
                                                    {symbol +
                                                        " " +
                                                        formatAmount(
                                                            row.market_cap
                                                                .toString()
                                                                .slice(0, -6),
                                                        ) +
                                                        "M"}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>

                <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    );
};

export default CoinsTable;

const useStyles = makeStyles(() => ({
    row: {
        fontFamily: ["cursive", "Roboto"],
        cursor: "pointer",
        backgroundColor: "#16171a",
        "&:hover": {
            backgroundColor: "#343434",
        },
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color: "gold",
        },
    },
}));
