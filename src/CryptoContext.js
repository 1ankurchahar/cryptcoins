import React, { useContext, useState, useEffect } from "react";
import { createContext } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");

    function formatAmount(num) {
        return num.toString().replace(/^[+-]?\d+/, function (int) {
            return int.replace(/(\d)(?=(\d{3})+$)/g, "1,");
        });
    }

    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
    }, [currency]);

    return (
        <Crypto.Provider
            value={{ currency, symbol, setCurrency, formatAmount }}>
            {children}{" "}
        </Crypto.Provider>
    );
};

export default CryptoContext;
export const CryptoState = () => useContext(Crypto);
