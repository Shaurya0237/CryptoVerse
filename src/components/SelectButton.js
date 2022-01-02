import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "4px solid #2FDD92",
      borderRadius: 5,
      padding: 10,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "white" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "#2FDD92",
        color: "black",
      },
      width: "18%",
      textAlign: "center",
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
