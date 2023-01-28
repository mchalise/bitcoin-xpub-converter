# Extended Public Key Address Generator

1. Convert any extended key provided into all associated public extended key. (xPub, yPub, xPub)

***Endpoints and response***

```

 @request wallet/keys?addr=xpub6Brj1doPB...&code=..

 @response
 {
  "xpub": "xpub6Brj1doPBv...",
  "ypub": "ypubxvbgSspTkk...",
  "zpub": "zpub1CdyvHigYq..."
 }
```
2. Convert any extended key provided into all 3 types of addresses. (BEP44, BEP49, BEP84)
```

 @request wallet/keys?addr=xpub6Brj1doPB...&count=20&secret=..

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
```
  
 Node version: `v14.20.0` 
 To start server: `node index.js` or `npm start`

