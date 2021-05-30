import * as  bitcoin from 'bitcoinjs-lib';


export const generatep2shKeys = (publicKeys, m) => {
  const pubkeys = publicKeys.map(hex => Buffer.from(hex.trim(), 'hex'));
  const { address } = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2ms({ m, pubkeys }),
  });
  return address
}