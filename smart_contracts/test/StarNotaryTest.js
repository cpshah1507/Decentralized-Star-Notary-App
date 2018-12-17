const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 

    let user1 = accounts[1]
    let user2 = accounts[2]
    let randomMaliciousUser = accounts[3]

    let name = 'awesome star!'
    let starStory = "this star was bought for my wife's birthday"
    let ra = "1"
    let dec = "1"
    let mag = "1"
    let starId = 1

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]})
    })
    
    describe('can create a star', () => { 
        it('can create a star and get its name', async function () { 
            let tokenId = 1

            await this.contract.createStar(name,starStory,ra,dec,mag,tokenId, {from: accounts[0]})
            assert.equal((await this.contract.tokenIdToStarInfo(tokenId))[0], name)
        })
    })

    
    describe('star uniqueness', () => { 
        it('only stars unique stars can be minted', async function() { 
            // first we mint our first star
            let tokenId = 1

            await this.contract.createStar(name,starStory,ra,dec,mag,tokenId, {from: accounts[0]})
            assert.equal((await this.contract.tokenIdToStarInfo(tokenId))[0], name)

            // then we try to mint the same star, and we expect an error
            await expectThrow(this.contract.createStar(name,starStory,ra,dec,mag,tokenId, {from: accounts[0]}));
        })

        
        it('only stars unique stars can be minted even if their ID is different', async function() { 
            // first we mint our first star
            let tokenId1 = 1
            let tokenId2 = 2
            await this.contract.createStar(name,starStory,ra,dec,mag,tokenId1, {from: accounts[0]})
            assert.equal((await this.contract.tokenIdToStarInfo(tokenId1))[0], name)

            // then we try to mint the same star, and we expect an error
            await expectThrow(this.contract.createStar(name,starStory,ra,dec,mag,tokenId2, {from: accounts[0]}));
        })
        
        it('minting unique stars does not fail', async function() { 
            for(let i = 0; i < 10; i ++) { 
                let id = i
                let newRa = i.toString()
                let newDec = i.toString()
                let newMag = i.toString()

                await this.contract.createStar(name, starStory, newRa, newDec, newMag, id, {from: user1})

                let starInfo = await this.contract.tokenIdToStarInfo(id)
                assert.equal(starInfo[0], name)
            }
        })
    })

    describe('buying and selling stars', () => { 
        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async function () {
            await this.contract.createStar(name,starStory,ra,dec,mag, starId, {from: user1})
        })

        describe('user1 can sell a star', () => { 
            it('user1 can put up their star for sale', async function () { 
                await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            
                assert.equal(await this.contract.starsForSale(starId), starPrice)
            })

            it('user1 gets the funds after selling a star', async function () { 
                let starPrice = web3.toWei(.05, 'ether')
                
                await this.contract.putStarUpForSale(starId, starPrice, {from: user1})

                let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
                await this.contract.buyStar(starId, {from: user2, value: starPrice})
                let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)

                assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), 
                            balanceOfUser1AfterTransaction.toNumber())
            })
        })

        
        describe('user2 can buy a star that was put up for sale', () => { 
            beforeEach(async function () { 
                await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            })

            it('user2 is the owner of the star after they buy it', async function () { 
                await this.contract.buyStar(starId, {from: user2, value: starPrice})

                assert.equal(await this.contract.ownerOf(starId), user2)
            })

            it('user2 correctly has their balance changed', async function () { 
                let overpaidAmount = web3.toWei(.05, 'ether')

                const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
                await this.contract.buyStar(starId, {from: user2, value: overpaidAmount, gasPrice:0})
                const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)

                assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice)
            })
        })
    })

    var expectThrow = async function(promise) { 
        try { 
            await promise
        } catch (error) { 
            assert.exists(error)
            return 
        }
    
        assert.fail('expected an error, but none was found')
    }
})