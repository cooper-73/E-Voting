import React from "react";
import { AppBar, Container, makeStyles, Toolbar } from "@material-ui/core";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  toolbar: {
    justifyContent: "flex-end",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="xl">
        <Toolbar className={classes.toolbar}>
          <WalletMultiButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
