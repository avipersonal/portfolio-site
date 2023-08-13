public with sharing class WeatherAppController {
  @AuraEnabled
  public static string getWeatherDetails(string cityName) {
    string url =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      cityName +
      '&units=metric&' +
      getKey();
    string response = getWeatherResponse(url);
    return response;
  }

  public static string getWeatherResponse(string url) {
    string responseBody = '';
    Http http = new Http();
    HttpRequest request = new HttpRequest();
    HttpResponse response = new HttpResponse();
    request.setMethod('GET');
    request.setEndpoint(url);
    request.setTimeout(120000);
    response = http.send(request);
    responseBody = response.getBody();
    return responseBody;
  }

  public static string getKey() {
    string key = System.Label.WeatherApiKey;
    string output = 'appId=' + key;
    return output;
  }
}
