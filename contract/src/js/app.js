App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Check if Web3 has been injected by the browser (MetaMask)
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // If no injected web3 instance is detected, fallback to localhost
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('FlightDelayInsurance.json', function(insuranceArtifact) {
      // Get the contract artifact file and instantiate it with truffle-contract
      App.contracts.FlightDelayInsurance = TruffleContract(insuranceArtifact);

      // Set the provider for our contract
      App.contracts.FlightDelayInsurance.setProvider(App.web3Provider);

      // Listen for events
      App.listenForEvents();

      // Load account data
      web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
          App.account = account;
          $("#accountAddress").html("Your Account: " + account);
        }
      });

      // Render insurance history
      App.renderInsuranceHistory();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('submit', '#purchaseInsuranceForm', App.handlePurchaseInsurance);
  },

  listenForEvents: function() {
    App.contracts.FlightDelayInsurance.deployed().then(function(instance) {
      instance.InsurancePurchased({}, { fromBlock: 0, toBlock: 'latest' }).watch(function(error, event) {
        console.log("Insurance purchased event triggered", event);
        // Refresh insurance history
        App.renderInsuranceHistory();
      });
    });
  },

  handlePurchaseInsurance: function(event) {
    event.preventDefault();

    var airline = $("#airline").val();
    var flightNumber = $("#flightNumber").val();
    var date = $("#date").val();
    var premium = $("#premium").val();

    console.log("Purchasing insurance...", airline, flightNumber, date, premium);

    App.contracts.FlightDelayInsurance.deployed().then(function(instance) {
      return instance.purchaseInsurance(airline, flightNumber, date, { value: web3.toWei(premium, 'ether'), from: App.account });
    }).then(function(result) {
      console.log("Insurance purchased", result);
    }).catch(function(err) {
      console.error(err);
    });
  },

  renderInsuranceHistory: function() {
    App.contracts.FlightDelayInsurance.deployed().then(function(instance) {
      return instance.getUserInsurances({ from: App.account });
    }).then(function(insurances) {
      var insuranceHistory = $("#insuranceHistory");
      insuranceHistory.empty();

      for (var i = 0; i < insurances.length; i++) {
        var insurance = insurances[i];
        var status = insurance[5] ? "Paid Out" : "Pending";

        var insuranceTemplate = "<tr><td>" + (i + 1) + "</td><td>" + insurance[1] + "</td><td>" + insurance[2] + "</td><td>" + new Date(insurance[3] * 1000) + "</td><td>" + web3.fromWei(insurance[4], 'ether') + " ETH</td><td>" + status + "</td></tr>"
        insuranceHistory.append(insuranceTemplate);
      }
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
