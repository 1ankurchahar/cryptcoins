import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant='h2'
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "cursive",
                        }}>
                        Crypto Coins
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        style={{
                            color: "darkgray",
                            textTransform: "capitalize",
                            fontFamily: "cursive",
                        }}>
                        Know all about your faviorate Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    );
};

export default Banner;

const useStyles = makeStyles(() => ({
    banner: {
        // backgroundImage: "url('./banner.png')",
        backgroundImage: "url('./bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        objectFit: "cover",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
}));
