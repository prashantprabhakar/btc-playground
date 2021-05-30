
const router = require("express").Router()
const { isTestnet } = require('../config/config')
const bitcoin = require('../services/bitcoinlib')
const bip84 = require('../services/bip84')
const {handleResponse, isEmptyWithZero} = require('../utils/')
const l = require('../utils/logger').root.child({ 'module': 'commonCtrl' })


// Test api
router.get("/ping", (_, res) => {
  return res.status(200).json({success: true, message: 'pong'})
})

/**
 * This route genetrates mnemonic seed phrase
 * @return {string} mnemonic
 */
router.get('/create-mnemonic', (req, res) => {
  try {
    // uses crypto.randomBytes under the hood., defaults to 128-bits of entropy
    const mnemonic = bip84.generateMnemonic()
    return handleResponse(res, 200, 'Mnemonic created successfully', {mnemonic})
  } catch(error) {
    l.error(`Error in creating seed phrase`, { error })
    return handleResponse(res, 500, error)
  }
})

/**
 * This route genetrates hd-wallet
 * @param {string} seedPhrase
 * @param {number} accountIndex
 * @param {number} addressIndex
 */
router.get('/hd-wallet', (req, res) => {
  /**
   * Path: m/84'/0'/0'/1/0
   * m: master
   * 84: purpose
   * 0: coin Type
   * 0: Account
   * 1: Change
   * 0: address_index
   * 
   * eg: second receiving address: m/84'/0'/0'/0'/0
  */
  try {
    let {  
      seedPhrase,
      accountIndex,
      addressIndex,
    } = req.query

    if(!seedPhrase || isEmptyWithZero(seedPhrase) || isEmptyWithZero(accountIndex)) {
      return handleResponse(res, 400, 'Missing params')
    }
    try {
      accountIndex = parseInt(accountIndex)
      addressIndex = parseInt(addressIndex)
    } catch(error) {
      l.error(`accountIndex and addressIndex should be number only`, {accountIndex, addressIndex})
      return handleResponse(res, 400, `accountIndex and addressIndex should be number only`)
    }

    const data = bip84.generateHDWallet(seedPhrase, accountIndex, addressIndex, isTestnet)
   
    return handleResponse(res, 200, 'Wallet created successfully', data)
  } catch(error) {
    l.error(`Error in creating segwit  wallet`, { error })
    return handleResponse(res, 500, error)
  }

})

/**
 * This route genetrates n-out-of-m multi-sig P2SH bitcoin address
 * @param {Array<string>} publicKeys
 * @param {number} m
 * @return {object} address: multi sig address
 */
router.post('/multisig-from-publicKeys', (req, res) => {
  try {
    const {publicKeys, m} = req.body;
    if(m > publicKeys.length) return handleResponse(res, 400, 'm can not be greater than number of public keys')
    const pubkeys = publicKeys.map(hex => Buffer.from(hex, 'hex'));
    const address = bitcoin.generatep2shKeys(m, pubkeys)
    return handleResponse(res, 200, 'wallet created', {address})
  } catch(error) {
    l.error(`Error in creating multi-sig`, {error})
    return handleResponse(res, 500, error.message)
  }
})

/**
 * This route genetrates n-out-of-m multi-sig P2SH bitcoin address.
 * Public keys are randomly generated. 
 * @param {number} m
 * @param {number} n
 * @return {object} address: multi sig address, public keys and addresses generated
 */
router.get('/multisig', (req, res) => {
    let {m,n} = req.query
    try {
      m = parseInt(m)
      n = parseInt(n)
    } catch(error) {
      return handleResponse(res, 400, `m and n should be number only`)
    }
    
    const userAddresses = [], pubkeys = []
    for(let i=0; i<n; i++) {
      const keyPair = bitcoin.ECPair.makeRandom();
      const {address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
      userAddresses.push(address)
      pubkeys.push(keyPair.publicKey )
    }
    console.log(pubkeys)
    const address = bitcoin.generatep2shKeys(m, pubkeys)

    return handleResponse(res, 200, '', {address, userAddresses, pubkeys})
})

module.exports = router;
