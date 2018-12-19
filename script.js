if (typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider) // what Metamask injected 
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/a856027ad70e421ca9a78101814d6893"));
}

// The user account used for testing
web3.eth.getAccounts(function (error, accounts) {
    if (error) {
        console.log(error)
        return
    }
    else {
        web3.eth.defaultAccount = accounts[0];
    }
});

// The interface definition for your smart contract (the ABI) 
var StarNotary = web3.eth.contract([
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "starsForSale",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_approved",
                "type": "address"
            },
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tokenIdToStarInfo",
        "outputs": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "starStory",
                "type": "string"
            },
            {
                "name": "ra",
                "type": "string"
            },
            {
                "name": "dec",
                "type": "string"
            },
            {
                "name": "mag",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
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
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
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
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
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
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_operator",
                "type": "address"
            },
            {
                "name": "_approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
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
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
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
                "name": "_operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_approved",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_tokenId",
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
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_operator",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_starStory",
                "type": "string"
            },
            {
                "name": "_ra",
                "type": "string"
            },
            {
                "name": "_dec",
                "type": "string"
            },
            {
                "name": "_mag",
                "type": "string"
            },
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "createStar",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "putStarUpForSale",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_ra",
                "type": "string"
            },
            {
                "name": "_dec",
                "type": "string"
            },
            {
                "name": "_mag",
                "type": "string"
            }
        ],
        "name": "checkIfStarExist",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "buyStar",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
]);

// Grab the contract at specified deployed address with the interface defined by the ABI            
var starNotary = StarNotary.at('0x740955EFee65f9cD07EE9Ed94D523219f5cb2b91');

// Lookup star by token ID
function lookUpStar() {
    var tokenID = parseInt(document.getElementById('starTokenId').value);
    starNotary.tokenIdToStarInfo(tokenID, function (err, result) {
        if (!err) {
            document.getElementById('star-name').innerText = result[0];
        }
        else {
            alert(err);
        }
    });

    starNotary.ownerOf(tokenID, function (err, result) {
        if (!err) {
            document.getElementById('star-owner').innerText = result;
        }
        else {
            alert(err);
        }
    });
}

// Enable claim button being clicked
function claimButtonClicked() {
    var starName = document.getElementById('starName').value;
    var starStory = document.getElementById('starStory').value;
    var dec = document.getElementById('dec').value;
    var mag = document.getElementById('mag').value;
    var cent = document.getElementById('cent').value;
    var tokenId = parseInt(document.getElementById('tokenId').value);

    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            console.log(error)
            return
        }
        var account = accounts[0]
        starNotary.createStar(starName, starStory, cent, dec, mag, tokenId, { from: account, gas: 5000000 }, function (error, result) {        
            if (!error) {
                var starClaimedEvent = starNotary.Transfer({ to: account });
                starClaimedEvent.watch(function (error, result) {
                    if (!error) {
                        location.reload();
                    } else {
                        console.log('watching for star claimed event is failing');
                    }
                });
            } else {
                console.log(error);
            }
        });
    })
}