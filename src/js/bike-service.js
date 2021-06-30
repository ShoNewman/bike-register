export default class BikeService {  
  static getBikeService(location) { //static allows you to add function to all instances of WeatherService objects
    return new Promise(function(resolve, reject) {//Creates a Promise object --> wraps our API call request
      let request = new XMLHttpRequest(); // Saves XHR object in variable --> This object is used to interact with servers --> This it the acutual request from server for data
      const url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${location}&distance=10&stolenness=proximity`; //Saves our API call url in variable
      request.onload = function () { //.onload only triggered once when the response has already loaded
        if (this.status === 200) { //if we get a response, then load the data from the API call
          resolve(request.response);
        } else {
          reject(request.response); //if we don't get a response we still load the response from the API call
        }
      };
      request.open("GET", url, true); //three arguements are passed into .open method --> "GET" or "Post" the method of the request, url (var we saved above), Boolean value for whether the request is async or not
      request.send(); //Sends request to server --> This is the part that takes time, we have to wait for the response and load and parse it
    });
  }
}
