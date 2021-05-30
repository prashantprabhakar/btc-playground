import BIP84 from 'bip84'

// internally uses bip39
export const generateMnemonic = () => BIP84.generateMnemonic() 

export const generateHDWallet = (seedPhrase, accountIndex, addressIndex) => {
  const root = getRootAccountFromSeed(seedPhrase)
  const childAccount = new BIP84.fromZPrv(root.deriveAccount(accountIndex))
  return {
    rootPrivKey: root.getRootPrivateKey(),
    rootPubKey: root.getRootPublicKey(),
    childAccount: getChildAddress(childAccount, addressIndex)
  }
}

export const getRootAccountFromSeed = (seedPhrase) => new BIP84.fromSeed(seedPhrase, '')

export const getChildAccount = (root, accountIndex) => new BIP84.fromZPrv(root.deriveAccount(accountIndex))

export const getChildAddress = (childAccount, addressIndex) => ({
  privateKey: childAccount.getAccountPrivateKey(addressIndex),
  publicKey: childAccount.getAccountPublicKey(addressIndex),
  address: childAccount.getAddress(addressIndex)
})