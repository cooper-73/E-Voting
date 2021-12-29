import React from "react";
import { Box, Button, Link, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    "&.hidden": {
      visibility: "hidden",
    },
  },
  connected: {
    color: green[500],
  },
  connectedBubble: {
    backgroundColor: green[500],
    height: 12,
    width: 12,
    borderRadius: "50%",
    marginRight: theme.spacing(0.5),
  },
  title: {
    fontWeight: 700,
  },
}));

export default function Intro({ votes, initializeVoting, programID, voteAccount }) {
  const wallet = useWallet();
  const classes = useStyles();
  return (
    <Box textAlign="center">
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        className={classes.title}
      >
        ¿Quién es tu personaje favorito de la Ciencia de la Computación?
      </Typography>
      <Typography variant="body1">
        Escoja entre estos 4 candidatos a su personaje favorito, cada uno de estos personajes hizo un gran aporte en su respectivo campo.
      </Typography>
      <Box marginTop="8px">
        {wallet.connected ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box className={classes.connectedBubble} />
            <Typography variant="body1" className={classes.connected}>
              Conectado
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1">
            Para empezar, conecte su billetera con el botón de abajo:
          </Typography>
        )}
        <WalletMultiButton
          className={
            wallet.connected
              ? [classes.button, "hidden"].join(" ")
              : classes.button
          }
        />
      </Box>
      {(typeof votes.timBerners !== "number" ||
        typeof votes.alanTuring !== "number" ||
        typeof votes.donaldKnuth !== "number" ||
        typeof votes.barbaraLiskov !== "number") &&
        wallet.connected && (
          <Box marginTop="8px">
            <Typography variant="body1">
              La{" "}
              <Link
                href={`https://explorer.solana.com/address/${voteAccount?.toString()}?cluster=devnet`}
                underline="always"
              >
                cuenta de votación
              </Link>
              {" "}de este{" "}
              <Link
                href={`https://explorer.solana.com/address/${programID.toString()}?cluster=devnet`}
                underline="always"
              >
                programa
              </Link>
              {" "}aún no ha sido inicializada.
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={initializeVoting}
              className={classes.button}
            >
              Inicializar Programa
            </Button>
          </Box>
        )}
    </Box>
  );
}
