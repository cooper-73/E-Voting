import React from "react";
import { Box, Link, List, ListItem, Typography } from "@material-ui/core";

export default function VoteHistory({ voteTxHistory }) {
  if (voteTxHistory.length < 1) {
    return <Box />;
  }
  return (
    <Box textAlign="center" marginTop="16px">
      <Typography variant="h4">¡Realizaste tu voto correctamente!</Typography>
      <Typography variant="body1">
        Revisa el registro de {voteTxHistory.length === 1 ? "tu voto" : "tus votos"} en la blockchain de Solana:
      </Typography>
      <List>
        {voteTxHistory.map((txID, i) => (
          <ListItem key={txID} style={{ justifyContent: "center" }}>
            <Link
              href={`https://explorer.solana.com/tx/${txID}?cluster=devnet`}
              underline="always"
            >{`Tu Voto`}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
