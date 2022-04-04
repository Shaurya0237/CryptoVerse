import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); /* Page Number*/

  const { symbol, coins, loading } = CryptoState();

  const useStyles = makeStyles({
    root: {
      background: "#CCD1E4",
    },
    input: {
      color: "black",
    },
    row: {
      backgroundColor: "#9DC6A7",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#DBCBBD",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "#EEEEEE",
      },
    },
  
  });

  const classes = useStyles();
  const history = useHistory();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#F1EBBB",
      }, 
      secondary:{
        main:"#FF5733",
      }
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) =>
        coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField 
          className={classes.root} InputProps={{className:classes.input}}
          label="Search"
          variant="filled"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}  /* target search value sent in search state */
        />
       
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#EEEEEE" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#2FDD92" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((heading) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {heading}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10) //to display only 10 coins on 1 page.
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "black" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          {symbol}&nbsp;
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            color: profit > 0 ? "green" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="left">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        <Pagination variant="outlined"
          count={parseInt((handleSearch()?.length / 10).toFixed(0))}
          style={{
            marginTop:20,
            padding: 10,
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 300);
          }}
          showFirstButton showLastButton />
      </Container>
    </ThemeProvider>
  );
}
