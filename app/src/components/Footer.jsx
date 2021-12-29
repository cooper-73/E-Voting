import React from "react";
import { AppBar, Container, Link, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderTop: "1px solid #e6e6e5",
    flexShrink: 0,
    marginTop: theme.spacing(2),
  },
  toolbar: {
    justifyContent: "space-between",
  },
  twitter: {
    marginRight: theme.spacing(1),
  },
}));

export default function Footer({ programID, voteAccount }) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="xl">
        <Toolbar className={classes.toolbar}>
          <Typography variant="caption">
            <Link
              underline="always"
              href={`https://explorer.solana.com/address/${programID.toString()}?cluster=devnet`}
            >
              ID del Programa
            </Link>
            {" | "}
            <Link
              underline="always"
              href={`https://explorer.solana.com/address/${voteAccount?.toString()}?cluster=devnet`}
            >
              Cuenta de la Votación
            </Link>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
