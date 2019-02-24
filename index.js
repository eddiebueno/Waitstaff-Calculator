'use strict';

const store={
  // Variable used to store customer subtotal, tip, and total & earnings based off of each customer's meal

  customer:{
    subtotal: 0,
    tip: 0,
    total: 0
  },
  earnings:{
    tiptotal: 0,
    mealcount: 0,
    averagetip: 0
  }
};

function reset(){
  // Function resets the store's contents all to 0

  store.customer.subtotal = 0;
  store.customer.tip = 0;
  store.customer.total = 0;
  store.earnings.tiptotal = 0;
  store.earnings.mealcount = 0;
  store.earnings.averagetip = 0;

}

function roundToHundreths(num){
  // Function used to make sure numbers only go to the hundreths place

  return Math.round(num * 100) / 100;
}

function calculateCustomerCharges(price,tax,tip){
  // Function that calculates the customer's subtotal, tip, and total given the provided price tax and tip in the meal form

  console.log('Calculating...');
  store.customer.subtotal = roundToHundreths(price + (price * tax / 100));
  store.customer.tip = roundToHundreths(store.customer.subtotal * tip / 100);
  store.customer.total = roundToHundreths(store.customer.tip + store.customer.subtotal);
}

function addToEarnings(){
  // Function that will add to the earnings based off of the customer charges

  console.log('Adding to Earnings...');
  store.earnings.tiptotal += store.customer.tip;
  store.earnings.mealcount += 1;
  store.earnings.averagetip = roundToHundreths(store.earnings.tiptotal / store.earnings.mealcount);
}

function clearInputs(){
  // Function to clear the input fields in the meal form

  console.log('Clearing...');
  $('.meal-details-form')[0].reset();
}

function render(){
  // Function to display the stored info from the store variable

  $('#customer-subtotal').html(store.customer.subtotal);
  $('#customer-tip').html(store.customer.tip);
  $('#customer-total').html(store.customer.total);
  $('#tip-total').html(store.earnings.tiptotal);
  $('#meal-count').html(store.earnings.mealcount);
  $('#avg-tip').html(store.earnings.averagetip);

}

function handleMealCancel(){
  // Function to handle when the cancel button has been clicked

  $('.meal-details-form').on('click','#meal-cancel-btn',function(e){
    e.preventDefault();
    console.log('Canceling Inputs...');
    clearInputs();
  })
}

function handleMealSubmit(){
  // Function to handle when the submit button has been clicked

  $('.meal-details-form').on('click','#meal-submit-btn',function(e){
    console.log('Submiting Meal...');
    let price = parseFloat($('#base-price').val());
    let tax = parseFloat($('#tax-rate').val());
    let tip = parseFloat($('#tip-percent').val());
    e.preventDefault();
    calculateCustomerCharges(price,tax,tip);
    addToEarnings();
    clearInputs();
    render();
  });
}

function handleReset(){
  // Function to handle when the reset button has been clicked

  $('#reset-btn').on('click',function(e){
    e.preventDefault();
    console.log('Reseting...');
    reset();
    render();
  });
}


function main(){
  // Main function handling all of the functions

  reset();
  render();
  handleMealSubmit();
  handleMealCancel();
  handleReset();
}

$(main());