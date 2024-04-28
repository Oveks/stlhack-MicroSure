var FlightDelay = artifacts.require("./FlightDelay.sol");

module.exports = function(deployer) {
  deployer.deploy(FlightDelay);
};
