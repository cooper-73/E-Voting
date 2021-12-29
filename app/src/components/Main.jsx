import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { Program, Provider, web3, BN } from "@project-serum/anchor";
import { Box, Container, Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
import idl from "../idl.json";
import { preflightCommitment, programID } from "../utils/config";
import { capitalize } from "../utils/helpers";
import Navbar from "./Navbar";
import VoteOption from "./VoteOption";
import Footer from "./Footer";
import Intro from "./Intro";
import VoteHistory from "./VoteHistory";

const propTypes = {};

const defaultProps = {};

export default function Main({ voteAccount, voteAccountBump, network }) {
  const { enqueueSnackbar } = useSnackbar();
  const wallet = useWallet();

  const [votes, setVotes] = useState({
    timBerners: null,
    alanTuring: null,
    donaldKnuth: null,
    barbaraLiskov: null
  });
  const [voteTxHistory, setVoteTxHistory] = useState([]);

  useEffect(() => {
    async function getVotes() {
      const connection = new Connection(network, preflightCommitment);
      const provider = new Provider(connection, wallet, preflightCommitment);
      const program = new Program(idl, programID, provider);
      try {
        const account = await program.account.votingState.fetch(voteAccount);
        setVotes({
          timBerners: account.timBerners,
          alanTuring: account.alanTuring,
          donaldKnuth: account.donaldKnuth,
          barbaraLiskov: account.barbaraLiskov
        });
      } catch (error) {
        console.log("No se pudo obtener los votos: ", error);
      }
    }

    if (!!voteAccount) {
      getVotes();
    }
  }, [voteAccount, network, wallet]);

  async function getProvider() {
    const connection = new Connection(network, preflightCommitment);
    const provider = new Provider(connection, wallet, preflightCommitment);
    return provider;
  }

  async function initializeVoting() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      await program.rpc.initialize(new BN(voteAccountBump), {
        accounts: {
          user: provider.wallet.publicKey,
          voteAccount: voteAccount,
          systemProgram: web3.SystemProgram.programId,
        },
      });
      const account = await program.account.votingState.fetch(voteAccount);
      setVotes({
        timBerners: account.timBerners,
        alanTuring: account.alanTuring,
        donaldKnuth: account.donaldKnuth,
        barbaraLiskov: account.barbaraLiskov
      });
      enqueueSnackbar("Cuenta de Votación inicializada", { variant: "success" });
    } catch (error) {
      console.log("Error en la transacción: ", error);
      console.log(error.toString());
      enqueueSnackbar(`Error: ${error.toString()}`, { variant: "error" });
    }
  }

  async function handleVote(side) {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      let tx = null;
      switch (side) {
        case "timBerners":
          tx = await program.rpc.voteForTimBerners({
            accounts: {
              voteAccount
            }
          });
          break;
        case "alanTuring":
          tx = await program.rpc.voteForAlanTuring({
            accounts: {
              voteAccount
            }
          });
          break;
        case "donaldKnuth":
          tx = await program.rpc.voteForDonaldKnuth({
            accounts: {
              voteAccount
            }
          });
          break;
        case "barbaraLiskov":
          tx = await program.rpc.voteForBarbaraLiskov({
            accounts: {
              voteAccount
            }
          });
          break;
        default:
          break;
      }
      const account = await program.account.votingState.fetch(voteAccount);
      setVotes({
        timBerners: account.timBerners,
        alanTuring: account.alanTuring,
        donaldKnuth: account.donaldKnuth,
        barbaraLiskov: account.barbaraLiskov
      });
      // console.log(account);
      enqueueSnackbar(`Votaste por ${capitalize(side)}!`, { variant: "success" });
      setVoteTxHistory((oldVoteTxHistory) => [...oldVoteTxHistory, tx]);
    } catch (error) {
      console.log("Error en la transacción: ", error);
      console.log(error.toString());
      enqueueSnackbar(`Error: ${error.toString()}`, { variant: "error" });
    }
  }

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flex="1 0 auto">
        <Navbar />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Intro
                votes={votes}
                initializeVoting={initializeVoting}
                programID={programID}
                voteAccount={voteAccount}
              />
            </Grid>
            <Grid item xs={3}>
              <VoteOption votes={votes} votesCount={votes.timBerners} side="timBerners" handleVote={handleVote} />
            </Grid>
            <Grid item xs={3}>
              <VoteOption votes={votes} votesCount={votes.alanTuring} side="alanTuring" handleVote={handleVote} />
            </Grid>
            <Grid item xs={3}>
              <VoteOption votes={votes} votesCount={votes.donaldKnuth} side="donaldKnuth" handleVote={handleVote} />
            </Grid>
            <Grid item xs={3}>
              <VoteOption votes={votes} votesCount={votes.barbaraLiskov} side="barbaraLiskov" handleVote={handleVote} />
            </Grid>
            <Grid item xs={12}>
              <VoteHistory voteTxHistory={voteTxHistory} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer programID={programID} voteAccount={voteAccount} />
    </Box>
  );
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;
