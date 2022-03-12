// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Sale {

  //variables need to be declared and provided a type
  //public allows people to see these variables
  uint public totalSales;
  uint public maxSales;

  address public owner;
  address public charity;

  mapping (address => bool) sales;

  constructor() { //set variables in here
    totalSales = 0;
    maxSales = 100;

    owner = msg.sender;
    charity = 0xF5AD7e98c10Cd22f340EF799B2a51BfF7664a041;
  }

  function canBuy () public view returns (bool) { 
    //checks to see if the address is allowed to buy or not depending on how many have been previously bought
    //returns true/false depending on if the sales have exceeded the max sales
    return totalSales < maxSales;
  }

  function hasAccess () public view returns (bool) { 
    //checks to see if the address is allowed to buy depending on if they have already bought or not
    //if an address makes a purchase, their address is set to true in the below buy function
    //this follows the mapping variable above
    //if their address is set to true, they cannot make the purchase
    //returns how the maping variable has been set in the buy function below - true/false
    return sales[msg.sender];
  }

  function buy () public payable returns (bool) { //why does this return bool? 
    //function to actually make a purchase
    //require that the below all pass to be true (kind of like an if statement), otherwise they get an error message 
    require(canBuy() == true, "can't buy this"); 
    require(msg.value == 0.01 ether, "you didn't send the correct amount");
    require(hasAccess() == false, "already bought");
    
    payable(owner).transfer(msg.value * 80 / 100); //send 80% to owner (there is a security issue with this function though)
    payable(charity).transfer(msg.value * 20 /100); //send 20% to owner (there is a security issue with this function though)
    
    totalSales = totalSales + 1;

    sales[msg.sender] = true;

    return true;
  }
}


