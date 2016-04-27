describe('The Shopping Bag App', function () {

  // load the controller's module
  beforeEach(function() {
    module('myApp');
  });

  var myCtrl,
    scope, 
    $filter;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    // The injector unwraps the underscores (_) from around the parameter names when matching
    myCtrl =  $controller('myCtrl', {
      $scope: scope
    });
  }));

  it("should attach expect the scope product length to be 3", function () {
    expect(scope.products.length).toBe(3);
  });


  it("should attach expect the cart length to be 1", function () {
    var item = {code: 'FR1', image: 'fruit-tea', title: 'Fruit Tea', description: 'The item is buy one get one free!!', price: 3.11, offerPrice: 3.11, multiBuy: 0, bogof: true, qty:1}
    scope.addItem(item);
    expect(scope.cart.length).toBe(2);
  });

  it("should attach expect the cart value to be 3.11", function () {
    var item = {code: 'FR1', image: 'fruit-tea', title: 'Fruit Tea', description: 'The item is buy one get one free!!', price: 3.11, offerPrice: 3.11, multiBuy: 0, bogof: true, qty:2}
    var totalValue = scope.subTotal(item);
    expect(totalValue).toBe(3.11);
  });

  it("should attach expect the cart value to be 3.11", function () {
    var item = {code: 'FR1', image: 'fruit-tea', title: 'Fruit Tea', description: 'The item is buy one get one free!!', price: 3.11, offerPrice: 3.11, multiBuy: 0, bogof: true, qty:2}
    var subTotal = scope.subTotal(item);
    expect(subTotal).toBe(3.11);
  });

  it("should attach expect the cart value to be 19.34", function () {
    scope.cart = [
      {code: 'FR1', image: 'fruit-tea', title: 'Fruit Tea', description: 'The item is buy one get one free!!', price: 3.11, offerPrice: 3.11, multiBuy: 0, bogof: true, qty: 2, total: 3.11},
      {code: 'SR1', image: 'strawberry', title: 'Strawberries', description: 'Buy 3 or more and get for £4.50 each!!', price: 5.00, offerPrice: 4.50, multiBuy: 3, bogof: false, qty: 1, total: 5.00},
      {code: 'CF1', image: 'coffee', title: 'Coffee', description: '1kg Arabica beans', price: 11.23, offerPrice: 11.23, multiBuy: 0, bogof: false, qty: 1, total: 11.23}
    ];

    var totalValue = scope.total(scope.cart);
    expect(totalValue).toBe(19.34);
  });

  it("should attach expect the cart value to be 3.11", function () {
    scope.cart = [
      {code: 'FR1', image: 'fruit-tea', title: 'Fruit Tea', description: 'The item is buy one get one free!!', price: 3.11, offerPrice: 3.11, multiBuy: 0, bogof: true, qty: 2, total: 3.11}
    ];

    var totalValue = scope.total(scope.cart);
    expect(totalValue).toBe(3.11);
  });

  it("should attach expect the cart value to be 16.61", function () {
    scope.cart = [
      {code: 'FR1', image: 'fruit-tea', title: 'Fruit Tea', description: 'The item is buy one get one free!!', price: 3.11, offerPrice: 3.11, multiBuy: 0, bogof: true, qty: 1, total: 3.11},
      {code: 'SR1', image: 'strawberry', title: 'Strawberries', description: 'Buy 3 or more and get for £4.50 each!!', price: 5.00, offerPrice: 4.50, multiBuy: 3, bogof: false, qty: 3, total: 13.50},
    ];

    var totalValue = scope.total(scope.cart);
    expect(totalValue).toBe(16.61);
  });


  it("should attach expect the cart value to be 16.61", function () {
    scope.cart = [
      {code: 'FR1', image: 'fruit-tea', title: 'Fruit Tea', description: 'The item is buy one get one free!!', price: 3.11, offerPrice: 3.11, multiBuy: 0, bogof: true, qty: 1, total: 3.11},
      {code: 'SR1', image: 'strawberry', title: 'Strawberries', description: 'Buy 3 or more and get for £4.50 each!!', price: 5.00, offerPrice: 4.50, multiBuy: 3, bogof: false, qty: 3, total: 13.50},
    ];

    var totalValue = scope.total(scope.cart);
    expect(totalValue).toBe(16.61);
  });

  it("should attach expect the cart value to be 16.61", function () {
    scope.cart = [
      {code: 'FR1', image: 'fruit-tea', title: 'Fruit Tea', description: 'The item is buy one get one free!!', price: 3.11, offerPrice: 3.11, multiBuy: 0, bogof: true, qty: 1, total: 3.11},
      {code: 'SR1', image: 'strawberry', title: 'Strawberries', description: 'Buy 3 or more and get for £4.50 each!!', price: 5.00, offerPrice: 4.50, multiBuy: 3, bogof: false, qty: 3, total: 13.50},
    ];
    scope.removeItem(0);
    var totalValue = scope.total(scope.cart);
    expect(totalValue).toBe(13.50);
  });


});