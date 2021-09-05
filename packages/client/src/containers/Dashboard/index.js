import React from 'react';
import Header from './subcomponents/Header';
import CreateMnemonic from './subcomponents/CreateMnemonic';
import { Container } from './styledComponents';
import GenerateWallet from './subcomponents/GenerateWallet';
import GenerateMultiSigWallet from './subcomponents/GenerateMultiSigWallet';
import TrustWallet from './subcomponents/TrustWallet';

const Dashboard = () => {
  return (
    <Container>
      <Header/>
      <main className="content">
        <TrustWallet />
        <CreateMnemonic/>
        <GenerateWallet/>
        <GenerateMultiSigWallet/>
      </main>
    </Container>
  )
}

export default Dashboard;