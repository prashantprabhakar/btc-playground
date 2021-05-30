const bitcoin = require('bitcoinjs-lib')

exports.generatep2shKeys = (m, pubkeys) => {
  const { address } = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2ms({ m, pubkeys }),
  });
  return address
}