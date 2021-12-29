const assert = require("assert");
const anchor = require("@project-serum/anchor");
const {SystemProgram} = anchor.web3;

describe("VotoElectronico", () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.voto_electronico;
  const cuentaVotacion = anchor.web3.Keypair.generate();

  it("Inicializa la votacion con cada candidato con cero votos", async() => {
    await program.rpc.initialize({
      accounts: {
        cuentaVotacion: cuentaVotacion.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [cuentaVotacion]
    });
    const account = await program.account.cuentaVotacion.fetch(cuentaVotacion.publicKey);
    console.log("tim_berners: ", account.tim_berners.toString());
    console.log("alan_turing: ", account.alan_turing.toString());
    console.log("donald_knuth: ", account.donald_knuth.toString());
    console.log("barbara_liskov: ", account.barbara_liskov.toString());
    assert.ok(
      account.tim_berners.toString() == 0 && account.alan_turing.toString() == 0 && account.donald_knuth.toString() == 0 && account.barbara_liskov.toString() == 0
    );
  });

  it("Proceso de voto correcto para tim_berners", async () => {
    await program.rpc.votarPorTimBerners({
      accounts: {
        cuentaVotacion: cuentaVotacion.publicKey
      }
    });
    const account = await program.account.cuentaVotacion.fetch(cuentaVotacion.publicKey);
    console.log("tim_berners: ", account.tim_berners.toString());
    console.log("alan_turing: ", account.alan_turing.toString());
    console.log("donald_knuth: ", account.donald_knuth.toString());
    console.log("barbara_liskov: ", account.barbara_liskov.toString());
    assert.ok(
      account.tim_berners.toString() == 1 && account.alan_turing.toString() == 0 && account.donald_knuth.toString() == 0 && account.barbara_liskov.toString() == 0
    )
  });

  it("Proceso de voto correcto para alan_turing", async () => {
    await program.rpc.votarPorAlanTuring({
      accounts: {
        cuentaVotacion: cuentaVotacion.publicKey
      }
    });
    const account = await program.account.cuentaVotacion.fetch(cuentaVotacion.publicKey);
    console.log("tim_berners: ", account.tim_berners.toString());
    console.log("alan_turing: ", account.alan_turing.toString());
    console.log("donald_knuth: ", account.donald_knuth.toString());
    console.log("barbara_liskov: ", account.barbara_liskov.toString());
    assert.ok(
      account.tim_berners.toString() == 1 && account.alan_turing.toString() == 1 && account.donald_knuth.toString() == 0 && account.barbara_liskov.toString() == 0
    )
  });

  it("Proceso de voto correcto para donald_knuth", async () => {
    await program.rpc.votarPorDonaldKnuth({
      accounts: {
        cuentaVotacion: cuentaVotacion.publicKey
      }
    });
    const account = await program.account.cuentaVotacion.fetch(cuentaVotacion.publicKey);
    console.log("tim_berners: ", account.tim_berners.toString());
    console.log("alan_turing: ", account.alan_turing.toString());
    console.log("donald_knuth: ", account.donald_knuth.toString());
    console.log("barbara_liskov: ", account.barbara_liskov.toString());
    assert.ok(
      account.tim_berners.toString() == 1 && account.alan_turing.toString() == 1 && account.donald_knuth.toString() == 1 && account.barbara_liskov.toString() == 0
    )
  });

  it("Proceso de voto correcto para barbara_liskov", async () => {
    await program.rpc.votarPorBarbaraLiskov({
      accounts: {
        cuentaVotacion: cuentaVotacion.publicKey
      }
    });
    const account = await program.account.cuentaVotacion.fetch(cuentaVotacion.publicKey);
    console.log("tim_berners: ", account.tim_berners.toString());
    console.log("alan_turing: ", account.alan_turing.toString());
    console.log("donald_knuth: ", account.donald_knuth.toString());
    console.log("barbara_liskov: ", account.barbara_liskov.toString());
    assert.ok(
      account.tim_berners.toString() == 1 && account.alan_turing.toString() == 1 && account.donald_knuth.toString() == 1 && account.barbara_liskov.toString() == 1
    )
  });
});