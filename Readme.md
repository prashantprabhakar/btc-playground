## [Bitcoin Playground](https://btc-playground.realitygamingpay.com/)

This project is a assignment for crypto.com. 

#### Requirement:

* Generate a random mnemonic words following BIP39 standard
* Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
* (Bonus) Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and public keys can be specified

**Note:**  The requirement can be fullfilled by client side code only and is recommended way for current requirement. However same functionalities are implemented on server side as well just for demonstration of backed work to the team


#### Run the project
### Run server
```
$ cd packages/server
$ npm install
$ npm start
$ npm test // to run unit tests
```

#### Run client
```
$ cd packages/client
$ npm install
$ npm start //(to start app)
$ npm run build // (to build app)
```

#### Libearies used
* [bitcoinjo-lib](https://www.npmjs.com/package/bitcoinjs-lib): Liberary used to generate multi-sig wallet key
* [bip84](https://www.npmjs.com/package/bip84): A wrapper around bitcoinjs-lib for deriving segwit + bech32 addresses. Internaly uses [bip39](https://www.npmjs.com/package/bip39)