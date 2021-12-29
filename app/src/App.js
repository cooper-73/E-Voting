import React, { useCallback, useEffect, useState } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { SnackbarProvider, useSnackbar } from "notistack";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { blue, orange } from "@material-ui/core/colors";
import { web3 } from "@project-serum/anchor";
import Main from "./components/Main";
import { programID, network, wallets } from "./utils/config";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[300],
    },
    secondary: {
      main: orange[300],
    },
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: "flex-start",
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: "12px 16px",
        fontWeight: 600,
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
      label: {
        color: "white",
      },
    },
    MuiLink: {
      root: {
        color: "initial",
      },
    },
  },
});

function AppWrappedWithProviders() {
  const { enqueueSnackbar } = useSnackbar();

  const [voteAccount, setVoteAccount] = useState({
    account: null,
    bump: null,
  });

  useEffect(() => {
    const getVoteAccount = async () => {
      let account, bump = null;
      [account, bump] = await web3.PublicKey.findProgramAddress([Buffer.from("vote_account")], programID);
      setVoteAccount({ account, bump });
    };
    getVoteAccount();
  }, []);

  const onWalletError = useCallback(error => {
      enqueueSnackbar(
        error.message ? `${error.name}: ${error.message}` : error.name, { variant: "error" }
      );
      console.error(error);
    },
    [enqueueSnackbar]
  );

  return (
    <WalletProvider wallets={wallets} onError={onWalletError} autoConnect>
      <WalletDialogProvider>
        <Main
          network={network}
          voteAccount={voteAccount.account}
          voteAccountBump={voteAccount.bump}
        />
      </WalletDialogProvider>
    </WalletProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <ConnectionProvider endpoint={network}>
          <AppWrappedWithProviders />
        </ConnectionProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
