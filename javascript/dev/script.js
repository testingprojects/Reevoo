"use strict";
var ShoppingBag = ShoppingBag || {};
var myApp = angular.module('myApp', ['ngRoute'])

/* 
 Route for basket
*/
.config(['$routeProvider',function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'pages/bag.html',
      controller  : 'myCtrl'
  })
}])

/*
  Controller for application
*/
myApp.controller('myCtrl',['$scope','$timeout', function($scope, $timeout) {
  $scope.products = ShoppingBag.products();
  $scope.cart = (localStorage.getItem('cartArray') === null) ? [] : JSON.parse(localStorage.getItem('cartArray'));;
  
  var findItemByCode = function(items, id) {
    return _.find(items, function(item) {
      return item.code === id;
    });
  };

  $scope.addItem = function(item) {
    var foundItem = findItemByCode($scope.cart, item.code);

    if (foundItem) {
      for (var value of $scope.cart) {    // don't actually do this
        if(foundItem.code === value.code) {
          value.qty += item.qty;
          break;  
        }
      }

      localStorage.setItem("cartArray", JSON.stringify($scope.cart));
    }
    else {
      ShoppingBag.appendToStorage('cartArray', angular.copy(item));
    }

    $scope.cart = JSON.parse(localStorage.getItem('cartArray'));
  };


  $scope.subTotal = function(item) {
    var totalItem = item.qty;
    var total = (totalItem * item.price);
    item.total = total;

    if(item.bogof) {
      if(totalItem%2 === 0) {
          total = (totalItem* item.price)/2;
          item.total = total;
      } else {
        let even = totalItem - 1;
          total = (even * item.price)/2 + item.price;
          item.total = total;

      }
    } else if (totalItem >= item.multiBuy) {
        total = (totalItem * item.offerPrice);
        item.total = total;

    } 

    return total;
  }

  $scope.removeItem = function(index) {
    var code = $scope.cart[index].code;
    var cartArray = JSON.parse(localStorage.getItem('cartArray'));
    cartArray.splice(index,1);
    localStorage.setItem("cartArray", JSON.stringify(cartArray));

    $scope.cart.splice(index, 1);
    var amendedItem = findItemByCode($scope.products, code); //findInArray(code, $scope.products);
    amendedItem.qty = 1;
  }

  $scope.quantity = ShoppingBag.createQuantity();

  $scope.total = function() {
    let total = 0;
    for (var item of $scope.cart) {
      total += item.total;
    }

    return total;
  }

}]);

ShoppingBag.appendToStorage = function(name, data){
  var currentData = (localStorage.getItem('cartArray') === null) ? [] : JSON.parse(localStorage.getItem('cartArray'));
  currentData.push(data);

  localStorage.setItem(name, JSON.stringify(currentData));  
}

ShoppingBag.products = function () {
  var products = [
    {code: 'FR1', image: 'fruit-tea', title: 'Fruit Tea', description: 'The item is buy one get one free!!', price: 3.11, offerPrice: 3.11, multiBuy: 0, bogof: true, qty:1},
    {code: 'SR1', image: 'strawberry', title: 'Strawberries', description: 'Buy 3 or more and get for £4.50 each!!', price: 5.00, offerPrice: 4.50, multiBuy: 3, bogof: false, qty:1},
    {code: 'CF1', image: 'coffee', title: 'Coffee', description: '1kg Arabica beans', price: 11.23, offerPrice: 11.23, multiBuy: 0, bogof: false, qty:1}
  ];

  return products;
}

ShoppingBag.createQuantity = function () {
   var range = [];
    for(var i = 1; i < 6; i++) {
      range.push(i);
    }

    return range;
}