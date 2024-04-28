// SPDX-License-Identifier: MIT
pragma solidity 0.4.25;

contract FlightDelayInsurance {
    struct Insurance {
        address user;
        string airline;
        string flightNumber;
        uint256 date;
        uint256 premium;
        bool paidOut;
    }

    mapping(address => Insurance[]) private userInsurances;

    event InsurancePurchased(address indexed user, string airline, string flightNumber, uint256 date, uint256 premium);
    event Payout(address indexed user, uint256 amount);

    function purchaseInsurance(string _airline, string _flightNumber, uint256 _date) external payable {
        require(msg.value > 0, "Premium must be greater than 0");
        
        Insurance memory newInsurance = Insurance({
            user: msg.sender,
            airline: _airline,
            flightNumber: _flightNumber,
            date: _date,
            premium: msg.value,
            paidOut: false
        });

        userInsurances[msg.sender].push(newInsurance);

        emit InsurancePurchased(msg.sender, _airline, _flightNumber, _date, msg.value);
    }

    function claimPayout(uint256 _index) external {
        require(_index < userInsurances[msg.sender].length, "Invalid index");
        Insurance storage insurance = userInsurances[msg.sender][_index];
        require(!insurance.paidOut, "Payout already claimed");

        // Simulate flight delay check, for demonstration purposes
        bool flightDelayed = true;

        if (flightDelayed) {
            // Payout insurance amount
            msg.sender.transfer(insurance.premium * 5);
            insurance.paidOut = true;

            emit Payout(msg.sender, insurance.premium);
        }
    }

    function getUserInsurances() external view returns (Insurance[] memory) {
        return userInsurances[msg.sender];
    }
}
