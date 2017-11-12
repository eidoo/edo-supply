#!/usr/bin/env node

const Web3 = require('web3')
const argv = require('yargs')
  .option('endpoint', {
    alias: 'e',
    describe: 'ethereum rpc endpoint',
    default: 'http://localhost:8545'
  })
  .help('help')
  .argv

const earlyInvestors = [
  '0xBD277292843283E5308aF447DA322736bbE961DE',
  '0x24409CdBFBFFEf1C5dD02A71AEC9F5b8203020DB',
  '0x9348CB1092743EA510FEab9593DE3238015723D2',
  '0x6446036b98eb76d4e3bd920273f86bE205fC5D0c',
  '0x05d2cf849cfDD557E82B5625a15B09Ec66bac960',
  '0x38676Ca929aAA4E5aca5B94Fd2e4f847b820A2ff',
  '0x6D0aDde6bC61AF8F01f6F7019A4fC9A0d2654B73',
  '0x7A284F06dF76c30968D137B37a15e9263C4A543B',
  '0x49A408f1Ee8951C509DB64bE3Cd47A0Faf81D2a6',
  '0x32Be343B94f860124dC4fEe278FDCBD38C102D88',
  '0x223270e56C3e5cBD381906046e5061131C832DaF',
  '0x227D00556afCdc436A4A9E26a9c8D844d2879F0E',
  '0xd780d5D046D917BdBd633dB591D0c70fAD1C4739',
  '0xff2E2b372fD33D738ec705B4276AC75537db19E2',
  '0xF4a5Db86d86d209062D9e08c04aeE5B8AD4E489f',
  '0x2274bebe2b47Ec99D50BB9b12005c921F28B83bB',
  '0x55A0B2b1A705dD09F15e7120cC0c39ACb9Ea7978',
  '0x46C18eee191D5C5153dA38b25D1c47D35a9E690F',
  '0x39D77219d6347dbDa94BECb53620a55FD6834880',
  '0xFB017d2A44A767b431871d21F9DBC84d96Cb3469',
  '0x7E0278f1d00cc5d100c0b06f2E73D7Bd9b91D59c',
  '0x501E46B8fD81AA45Abf9894236F99Ccd307a3E2c',
  '0x00F28Aa216F11FE63D856AaB998262CF5ca13e0a',
  '0x2aec5B17f0b8a49D48D79F60f1F6833F446770f5',
  '0x639631fc10eA37DF5540E3A6FAf1Bd12Ab02A02c',
  '0x004CBAba62D881A334C3697aF80851EC3d59077b',
  '0x311723C28674d06e3aCb209f84750A1424036eD6',
  '0x3cbeC1096B214c8F30D6299c0d1cc7998B7BE26c',
  '0x611D3D07C82f8f7c552e1F66c4daC5A9F2c9e30F',
  '0xF3E94bEC2B88dDf34FB69321B959A513Ef57925D',
  '0xbA28C1B409664c0893a090d637A027E4162a41bC',
  '0xeD51C7ae6022068ADBa1e4Ce92F1432264b55672',
  '0x0873FeF0ee9fE171F7BFb300372F95377dB40aA1',
  '0x5D66d259Caf4E90b74A2c49ed63b1d147D73eA79',
  '0xB029594324781f2Ee1172CbFEdb48d38b0085EEC',
  '0xb5bB3cdFAF9A3607761c381a2166324452d8e2c3',
  '0x2476C952d54eF069Fd990254c53CB7efA99abAd2',
  '0x3d1C53f967467CA75C5CE545e1967DD2FaFD516F',
  '0xe5B10597d31Ae3cb6c9813a82A3010320fCB1F8d',
  '0xc3ebe9Da3735aa6f8d97eDf5be748e57A41cAa71',
  '0xEdB2470cfab1eE9E94070F9fBeDC43d36E3459F1',
  '0x76070ACb955140e384B07836824c8a04Fd73B7c6',
  '0xf03146d8756Beb08C27AeF09F5Df25e80B64d65c',
  '0x506Ce8F5EB530DfB4579F650532294C96Fe7e975',
  '0x506038706710315ce3Cb30720157d51C94872080',
  '0x3A8bB96304492c6B1CF3f56c23C5C8BC5c6031B7',
  '0x60E36c92a633AF3a49079f13AA254628a76975d2',
  '0x731004F8f08e1c1899Ce7D37bED79F5A06cB0D0a',
  '0x3A361D35f694d48864d4b9559ff6f696f66e816b',
  '0x3B6774f1fD72CC9417ecFaD896a1D0F74c9EDa59',
  '0xa5B034016cbb261D64Fc2d00A2466f64B5c8c1dd'
]

const locks = [
  '0x931f04b2e2c056ec72e3103033db1c32350ac577',
  '0xa78c5085701ffbaba8896ff29d09c37bb8b29995',
  '0xdd1325578f14c8c71be845968e4e983d6da993d8',
  '0xc55bfb0f4b961ecd7f02d93b2e311c30241aa48b',
  '0x01272a648550Bf7d1dB21200D0281E4cfE2B8a8f',
  '0xfC11C43ee5B65B793EcacD62Fc3Ce97076a0A682',
]

const tokenAddress = '0xced4e93198734ddaff8492d525bd258d49eb388e'

const eidooTokenABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "mintingFinished",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "mintLocked",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "lockedBalanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "lockEndBlock",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "transferableFromBlock",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "initiallyLockedAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_transferableFromBlock",
        "type": "uint256"
      },
      {
        "name": "_lockEndBlock",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
]
const tokenTimelockABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "beneficiary",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "release",
    "outputs": [],
    "payable": false,
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "releaseTime",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function",
    "stateMutability": "view"
  },
  {
    "inputs": [
      {
        "name": "_token",
        "type": "address"
      },
      {
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "name": "_releaseTime",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "constructor",
    "stateMutability": "nonpayable"
  }
]

const promisify = (fn, context) => (...args) => new Promise((resolve, reject) => {
  fn.apply(context, [...args, (err, res) => {
    if (err) reject(err)
    else resolve(res)
  }])
})

async function start () {
  let endpoint = argv.endpoint || 'http://localhost:8545'
  // console.log('Web3 provider: ' + endpoint)
  const web3 = new Web3(new Web3.providers.HttpProvider(endpoint))

  const token = web3.eth.contract(eidooTokenABI).at(tokenAddress)

  const lockedBalanceOf = promisify(token.lockedBalanceOf)
  const balanceOf = promisify(token.balanceOf)

  // get locked tokens owned by early investors
  let totalLocked = web3.toBigNumber(0)
  for (let addr of earlyInvestors) {
    totalLocked = totalLocked.add(await lockedBalanceOf(addr))
  }

  // get locked tokens in TokenTimelock contracts
  const now = Math.floor(Date.now() / 1000)
  for (let lockAddr of locks) {
    const lock = web3.eth.contract(tokenTimelockABI).at(lockAddr)

    const releaseTime = (await promisify(lock.releaseTime)()).toNumber()
    if (releaseTime > now) {
      let amount = await balanceOf(lockAddr)
      totalLocked = totalLocked.add(amount)
    }
  }

  const totalSupply = await promisify(token.totalSupply)()
  const circulatingSupply = totalSupply.sub(totalLocked)

  console.log('EDO total suppy', totalSupply.shift(-18).toFixed())
  console.log('EDO locked tokens', totalLocked.shift(-18).toFixed())
  console.log('EDO circulating supply', circulatingSupply.shift(-18).toFixed())
}

start()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
