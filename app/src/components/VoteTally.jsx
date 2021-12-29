import React from "react";
import { Box, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { formatWithCommas, percentize } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: 25,
    width: '100%',
  },
  textResult: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

// Show vote counts for each side
export default function VoteTally({ votes, votesCount }) {
  const classes = useStyles();

  function getProgress() {
    console.log(votes)
    if (
      typeof votes.timBerners !== "number" ||
      typeof votes.alanTuring !== "number" ||
      typeof votes.donaldKnuth !== "number" ||
      typeof votes.barbaraLiskov !== "number" ||
      votes.timBerners + votes.alanTuring + votes.donaldKnuth + votes.barbaraLiskov === 0
    ) {
      return 25;
    }
    return (votesCount / (votes.timBerners + votes.alanTuring + votes.donaldKnuth + votes.barbaraLiskov)) * 100;
  }

  return (
    <Box xs="5">
      <LinearProgress
        variant="determinate"
        value={getProgress()}
        color="secondary"
        className={classes.progress}
      />
      <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" className={classes.textResult}>
            {percentize(votesCount / (votes.timBerners + votes.alanTuring + votes.donaldKnuth + votes.barbaraLiskov))}
            {" ("}
            {formatWithCommas(votesCount)}
            {votesCount === 1 ? " voto)" : " votos)"}
          </Typography>
      </Box>
    </Box>
  );
}
