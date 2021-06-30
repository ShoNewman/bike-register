import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './js/bike-service.js';

$(document).ready(function () {
  $('#submit').click(function () {
    let location = $('#location').val(); //Save input in city value
    // clearFields(); 
    //Calling function to empty input fields 

    let promise = BikeService.getBikeService(location); //References WeatherService object in imported function
    promise.then(function (response) { //.then is one of three methods of the XHR object --> it handles both a results response and a rejected response
      const body = JSON.parse(response); //If we get a response then we parse the response --> meaning turning the string into an object
      console.log(body.bikes[0]);
      for (let i = 0; i < body.bikes.length; i++) {
        const item = body.bikes[i];
        if (item.description !== null && item.stolen_location !== null) {
          
          $('.showBikes').append(`<p>${item.serial} : ${item.description} : ${item.stolen_location}</p>`); //shows city(var where the location is saved from user input), body.main.humidity --> pulling the data from the parsed response
        }
      }
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`); //If there we don't get a response then it displays the error message
    });
  });
});