const express = require('express')
const app = express()
const port = 3000
const xpubConverter = require('./core.js')
const { getAddressBIP44, getAddressBIP49, getAddressBIP84 } = require('./bitcoin.js')


/* 
 @request wallet/keys?secret=..&addr=xpub6Brj1doPB...
 
 @response
 {
  "xpub": "xpub6Brj1doPBv...",
  "ypub": "ypubxvbgSspTkk...",
  "zpub": "zpub1CdyvHigYq..."
 }
*/ 
app.get('/wallet/keys', (req, res) => {
  if (req.query.code !== 'mc-1a2b3c4d0'){
    res.send('You donot have access to this endpoint')
  }else{
    let addr = req.query.addr
    res.json({
      xpub: xpubConverter(addr, 'xpub'),
      ypub: xpubConverter(addr, 'ypub'),
      zpub: xpubConverter(addr, 'zpub')
    })
  }
})

/* 
 @request wallet/keys?count=20&secret=..&addr=xpub6Brj1doPB...
 
 @response
  {
    "bip44": {
      "main_address":["18A8BoQCZuP..."],
      "change_address":["1CJZYPr5d..."]
    },
    "bip49": {
      "main_address":["3L3RT4ctCBk..."],
      "change_address":["3JCKNDpSJ..."]
    },
    "bip84": {
      "main_address":["bc1qf6pf7at5..."],
      "change_address":["bc1q00aeu7..."]
    }
  }
*/ 

app.get('/wallet/address', (req, res) => {
  if (req.query.code !== 'mc-1a2b3c4d0'){
    res.send('You donot have access to this endpoint')
  }else{
    let addr = req.query.addr
    let totalAddrCount = req.query.count || 10
    if(!isNaN(totalAddrCount) && totalAddrCount < 200){
      addr = xpubConverter(addr, 'xpub');
      let address_list_44 = getAddressBIP44(addr, totalAddrCount)
      let address_list_49 = getAddressBIP49(addr, totalAddrCount)
      let address_list_84 = getAddressBIP84(addr, totalAddrCount)
      res.json({
        bip44: address_list_44,
        bip49: address_list_49,
        bip84: address_list_84
      })
    }else{
      res.send('Invalid address count provided')
    }
  }
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;



