const { network, ethers } = require("hardhat")
const { developmentChain, networkConfig } = require("../helper-hardhat-config")

const VRF_SUB_FUND_AMOUNT = ethers.parseEther("2")
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deployments, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let vrfCoodinatorV2Address, subscriptionId

    if (developmentChain.includes(network.name)) {
        const vrfCoodinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoodinatorV2Address = vrfCoodinatorV2Mock.address
        const transatctionResponse = await vrfCoodinatorV2Mock.createSubscription()
        const transactionReceipt = await transatctionResponse.wait(1)
        subscriptionId = transactionReceipt.events[0].args.subId

        //Fund the subscription
        await vrfCoodinatorV2Mock.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT)
    } else {
        vrfCoodinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }
    const entranceFee = networkConfig[chainId]["entranceFee"]
    const gasLane = networkConfig[chainId]["gasLane"]
    const callBackGasLimit = networkConfig[chainId]["callBackGasLimit"]
    const interval = networkConfig[chainId]["interval"]
    const args = [
        vrfCoodinatorV2Address,
        entranceFee,
        gasLane,
        subscriptionId,
        callBackGasLimit,
        interval,
    ]

    const raffle = await deployer("Raffle", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
}
