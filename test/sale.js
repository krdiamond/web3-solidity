const Sale = artifacts.require("Sale");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Sale", function (accounts) {
  it("should assert true", async function () {
    await Sale.deployed();
    return assert.isTrue(true);
  });

  it("should get the right accounts ", async function () {
    const contract = await Sale.deployed()

    const owner = await contract.owner.call()
    const charity = await contract.charity.call()

    assert.isTrue(owner == 0x7fD0c7D34A68200242C274CFDaA19FDEb08e0d62)//account1
    assert.isTrue(charity == 0x9A9Cc0B27E4A20784a55E6De400Ca9A4D71Cf542)//account2
  })

  it("should split the payment", async function () {
    const contract = await Sale.deployed()

    const startBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]))

    const purchase = await contract.buy.sendTransaction({
      from: accounts[0],
      value: web3.utils.toWei("0.01", "ether")
    })

    const comission = web3.utils.toBN(web3.utils.toWei("0.008", 'ether'))
    const endbalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]))

    assert.equal(
      startBalance.add(comission).toString(), 
      endbalance.toString()
    )
  })

  it("should split the payment", async function () {
    const contract = await Sale.deployed()

    const startBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[2]))

    const purchase = await contract.buy.sendTransaction({
      from: accounts[3],
      value: web3.utils.toWei("0.01", "ether")
    })

    const comission = web3.utils.toBN(web3.utils.toWei("0.002", 'ether'))
    const endbalance = web3.utils.toBN(await web3.eth.getBalance(accounts[2]))

    assert.equal(
      startBalance.add(comission).toString(), 
      endbalance.toString()
    )
  })


});
