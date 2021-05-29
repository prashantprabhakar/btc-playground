const BIP84 = require('bip84')


const generateHDWallet = (seedPhrase, accountIndex, addressIndex) => {
  const root = getRootAccountFromSeed(seedPhrase)
  const childAccount = new BIP84.fromZPrv(root.deriveAccount(accountIndex))
  return {
    rootPrivKey: root.getRootPrivateKey(),
    rootPubKey: root.getRootPublicKey(),
    childAccount: getChildAddress(childAccount, addressIndex)
  }
}

const getRootAccountFromSeed = (seedPhrase) => new BIP84.fromSeed(seedPhrase)

const getChildAccount = (root, accountIndex) => new BIP84.fromZPrv(root.deriveAccount(accountIndex))

const getChildAddress = (childAccount, addressIndex) => ({
  privateKey: childAccount.getAccountPrivateKey(addressIndex),
  publicKey: childAccount.getAccountPublicKey(addressIndex),
  address: childAccount.getAddress(addressIndex)
})


module.exports = {
  generateHDWallet,
  // Exported only for testing
  getRootAccountFromSeed,
  getChildAccount,
  getChildAddress
}
