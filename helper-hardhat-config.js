const networkConfig = {
    5: {
        name: "goerli",
        vtfCoordinatorV2: 0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d,
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLanse: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "0",
        callBackGasLimit: "500000",
        interval: "30",
    },
    31337: {
        name: "hardhat",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLanse: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        callBackGasLimit: "500000",
        interval: "30",
    },
}

const depelopmentCahins = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    depelopmentCahins,
}