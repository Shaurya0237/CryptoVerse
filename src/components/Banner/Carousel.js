import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const Carousel = () => {
  const [trending, setTrending] = useState([]);  //will fetch trending coins in it.
  const { currency, symbol } = CryptoState();    //Imported from Context Api.

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));  // Calling Api.

    setTrending(data);   //update trending state.
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]); //call everytime when currency changes.

  const useStyles = makeStyles(() => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));

  const classes = useStyles();

  const CarouselItems = trending.map((coin) => {        //getting all items from trending state.
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="90"
          style={{ marginBottom: 12 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red", // color would be green if profit else red color for loss.
              fontWeight: 500,
            }}
          >
            {profit && "+"}  
            {/* if profit exists, add + infront of it. */}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))} 
          {/* imported function from CoinsTable */}
        </span>
      </Link>
    );
  });

  const responsive = {  //number of elements to dispaly on resizing.
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
    // 1024: {
    //   items: 8,
    // }
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={800}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={CarouselItems}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
