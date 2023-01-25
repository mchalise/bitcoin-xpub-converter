const bitcoin = require("bitcoinjs-lib"); 
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
const xpubConverter = require('./core.js');

// 
// BIP44 Legacy Addr (Addr starting with 1) xPub
// m/44'/0'/0'
// 

const getAddressBIP44 = (xpub_addr, no_addr) => {
	child_44h = bip32.fromBase58(xpub_addr);
	let mainAddress = []
	let changeAddress = []
	for (c = 0; c < no_addr; c++) {
	    address = bitcoin.payments.p2pkh({pubkey: child_44h.derive(0).derive(c).publicKey}).address;
	    mainAddress.push(address)
	}
	for (c = 0; c < no_addr; c++) {
	    c_address = bitcoin.payments.p2pkh({pubkey: child_44h.derive(1).derive(c).publicKey}).address;
	    changeAddress.push(c_address)
	}
	return {
		'main_address': mainAddress,
		'change_address': changeAddress
	}
}

// 
// BIP49 (P2WPKH-nested-in-P2SH): m/49'/0'/{account}'/{change}/{idx} (Addr starting with 3) yPub
// m/49'/0'/0'
// 

const getAddressBIP49 = (xpub_addr, no_addr) => {
	child_49h  = bip32.fromBase58(xpub_addr);
	let mainAddress = []
	let changeAddress = []
	for (c = 0; c < no_addr; c++) {
		address = bitcoin.payments.p2sh({
			redeem: bitcoin.payments.p2wpkh({
				pubkey: child_49h.derive(0).derive(c).publicKey
			}),
		}).address;
		mainAddress.push(address)
	}

	for (c = 0; c < no_addr; c++) {
		c_address = bitcoin.payments.p2sh({
			redeem: bitcoin.payments.p2wpkh({
				pubkey: child_49h.derive(1).derive(c).publicKey
			}),
		}).address;
		changeAddress.push(c_address)
	}
	return {
		'main_address': mainAddress,
		'change_address': changeAddress
	}
}

// 
// BIP84 (Native Segwit P2PKH): m/84'/0'/{account}'/{change}/{idx} (Addr starting with bc) zPub
// m/84'/0'/0' 
// 
const getAddressBIP84 = (xpub_addr, no_addr) => {
	child_84h  = bip32.fromBase58(xpub_addr);
	let mainAddress = []
	let changeAddress = []
	for (c = 0; c < no_addr; c++) {
		address = bitcoin.payments.p2wpkh({pubkey: child_84h.derive(0).derive(c).publicKey}).address;
		mainAddress.push(address)
	}

	for (c = 0; c < no_addr; c++) {
		c_address = bitcoin.payments.p2wpkh({pubkey: child_84h.derive(1).derive(c).publicKey}).address;
		changeAddress.push(c_address)
	}
	return {
		'main_address': mainAddress,
		'change_address': changeAddress
	}

}


module.exports = { getAddressBIP44, getAddressBIP49, getAddressBIP84 }






