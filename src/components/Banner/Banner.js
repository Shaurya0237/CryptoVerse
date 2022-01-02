import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
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
  carousel: {
    height: "70%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              marginTop:10,
              fontWeight: "bold",
              marginBottom: 12,
              fontFamily: "Shizuru",
            }}
          >
            Crypto-Verse
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "lightblue",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
           All you need to know about Cryptocurrency !
            </Typography>
        </div>
        <Carousel /> 
        {/* Displaying Coins */}
      </Container>
    </div>
  );
}

export default Banner;
