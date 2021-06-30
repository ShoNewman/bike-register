import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './js/bike-service.js';

function clearFields() {
  $('#location').val('');
}

function getElements(response) {
  if (response) {
    for (let i = 0; i < response.bikes.length; i++) {
      const item = response.bikes[i];
      if (item.description !== null && item.stolen_location !== null) {
        $('.showBikes').append(`<p>${item.serial} : ${item.description} : ${item.stolen_location}</p>`);
      } else {
        $('.showErrors').text(`There was an error: ${response.message}`);
      }
    }
  }
}

async function makeApiCall(location) {
  const response = await BikeService.getBikeService(location);
  getElements(response);
}

$('#submit').on("click", function () {
  let location = $('#location').val();
  clearFields();
  makeApiCall(location);
});