import React from "react";
import { Avatar, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useWallet } from "@solana/wallet-adapter-react";
import { capitalize } from "../utils/helpers";
import VoteTally from "./VoteTally";

const useStyles = makeStyles((theme) => ({
  button: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "1.2rem",
  },
  avatar: {
    height: 192,
    width: 108,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: "initial",
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: 25,
  }
}));


export default function VoteOption({ votes, votesCount, side, handleVote }) {
  const classes = useStyles();
  const wallet = useWallet();
  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" textAlign="center">
      <Avatar
        alt=""
        src={`/images/${side}.jpg`}
        className={classes.avatar}
      />
      <VoteTally
        votes={votes}
        votesCount={votesCount}
      />
      <Button
        variant="contained"
        onClick={() => handleVote(side)}
        disabled={!wallet.connected}
        size="large"
        color="secondary"
        className={classes.button}
      >
        {`Votar por ${capitalize(side)}`}
      </Button>
    </Box>
  );
}
