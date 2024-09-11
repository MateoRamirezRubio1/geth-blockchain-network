require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "private",
  networks: {
    private: {
      url: "http://127.0.0.1:8545",
      accounts: [`0xcf7c173e5393ab10322627e679a31791d80829fa053b896899250b6c09689e9b`],
    },
  },
  solidity: "0.8.24",
};
