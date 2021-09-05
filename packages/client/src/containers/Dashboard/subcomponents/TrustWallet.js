import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import keccak256 from "keccak256";
import React, {useState, useEffect} from "react";
import InfoText from 'components/InfoText';
import Card from 'components/Card'
import Button from "components/Button";


const TrustWallet  =  () => {

  const [connector, setConnector] = useState();
  const [ walletData, setWalletData] = useState({});

  useEffect(() => {
    async function createSession() {
      if(connector && !connector.connected) {
        await connector.createSession();
      }
    }
    createSession()
    subscribeToEvents()
    
  }, [connector, subscribeToEvents]);

  const handleConnect = async () => {
    const bridge = "https://bridge.walletconnect.org";
    const _connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(_connector);
  }


  const subscribeToEvents = () => {
    if(!connector) return;

    connector.on("session_update", async (error, payload) => {
      console.log(`connector.on("session_update")`);
      if (error) throw error;
      const { chainId, accounts } = payload.params[0];
      onSessionUpdate(accounts, chainId);
    });

    connector.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`);
      if (error) throw error;
      onConnect(payload);
    });

    connector.on("disconnect", (error, payload) => {
      console.log(`connector.on("disconnect")`);
      if (error) throw error;
      onDisconnect();
    });

    if (connector.connected) {
      const { chainId, accounts } = connector;
      const address = accounts[0];
      console.log("******", {walletData})
      setWalletData({
        connected: true,
        chainId,
        accounts,
        address,
      });
      onSessionUpdate(accounts, chainId);
    }
    setConnector(connector);

  }

  const killSession = () => {
    if (connector) {
      connector.killSession();
    }
    resetState();
  }

  const resetState = () => {
    setConnector(undefined);
    setWalletData({
      connected: false,
      accounts: [],
      address: "",
    })
  }

  const onConnect = (payload) => {
    const { chainId, accounts } = payload.params[0];
    const address = accounts[0];
    setWalletData({
      connected: true,
      chainId,
      accounts,
      address,
    })
  }

  const onDisconnect = () => resetState();

  const onSessionUpdate = (accounts, chainId) => {
    const address = accounts[0];
    setWalletData({
      chainId, accounts, address
    });

  }

  const handleSign = () => {
    console.log("clicked")
    const message = "My email is john@doe.com - 1537836206101";
    const msgParams = [
      "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",                      
      keccak256("\x19Ethereum Signed Message:\n" + message)
    ]
    console.log(connector)
    connector
      .signMessage(msgParams)
      .then((result) => {
        // Returns signature.
        alert(result)
        console.log(result)
      })
      .catch(error => {
        // Error returned when rejected
        console.error(error);
      })
  }

  return (
    <Card
      heading="Trust wallet details"
      icon="account_balance_wallet"
      subHeading=""
    >
      {
        connector && connector.connected ?
        <Button type="text" onClick={killSession}> Disconnect </Button> :
        <Button type="text" onClick={handleConnect}> Connect to WalletConnect </Button> 
      }
      <Button type="text" onClick={handleSign}> Sign Message </Button> 
      <InfoText label="Accounts">{walletData.address}</InfoText>
      <InfoText label="Chain Id">{walletData.chainId}</InfoText>
    </Card>
  )
}

export default TrustWallet;