const BIP84 = require('bip84')

// internally uses bip39
const generateMnemonic = () => BIP84.generateMnemonic() 

const generateHDWallet = (seedPhrase, accountIndex, addressIndex, isTestnet) => {
  const root = getRootAccountFromSeed(seedPhrase, isTestnet)
  const childAccount = new BIP84.fromZPrv(root.deriveAccount(accountIndex))
  return {
    rootPrivKey: root.getRootPrivateKey(),
    rootPubKey: root.getRootPublicKey(),
    childAccount: getChildAddress(childAccount, addressIndex)
  }
}

const getRootAccountFromSeed = (seedPhrase, isTestnet) => new BIP84.fromSeed(seedPhrase, '', isTestnet)

const getChildAccount = (root, accountIndex) => new BIP84.fromZPrv(root.deriveAccount(accountIndex))

const getChildAddress = (childAccount, addressIndex) => ({
  privateKey: childAccount.getAccountPrivateKey(addressIndex),
  publicKey: childAccount.getAccountPublicKey(addressIndex),
  address: childAccount.getAddress(addressIndex)
})


module.exports = {
  generateMnemonic,
  generateHDWallet,
  // Exported only for testing
  getRootAccountFromSeed,
  getChildAccount,
  getChildAddress
}
