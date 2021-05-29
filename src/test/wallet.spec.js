const { describe, it } = require('mocha')
const { expect } = require('chai');  // Using Assert style

const bitcoin = require('../services/bitcoinlib')
const bip39 = require('../services/bip39')
const bip84 = require('../services/bip84')


describe('wallets', () => {
  it('[bip39] generates seed phrase', () => {
    let seedPhrase = bip39.generateMnemonic()
    expect(seedPhrase.split(' ')).to.have.lengthOf(12)
  })

  it('[bip84] get SegWit from seed phrase', () => {
    const seedPhrase = "spice admit drop obvious style odor fence huge unaware myself purity avocado"
    let root = bip84.getRootAccountFromSeed(seedPhrase)
    let childAccount = bip84.getChildAccount(root, 0)
    let {address} = bip84.getChildAddress(childAccount, 0)
    expect(address).to.equal('bc1q7gdsljutr3q24kzcvz6k9er5h3k602a6u9fg7z')
  })

  it('generating p2sh keys from given public keys and m', () => {
    const publicKeys = [
      "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
      "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
      "023e4740d0ba639e28963f3476157b7cf2fb7c6fdf4254f97099cf8670b505ea59",
      "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9"
    ]
    const pubkeys = publicKeys.map(hex => Buffer.from(hex, 'hex'));
    let addresss = bitcoin.generatep2shKeys(3, pubkeys )
    expect(addresss).to.equal('3CBx211K7VqDaZ4ZEmUWbuE7BneNgyPNMH')
  })

})


