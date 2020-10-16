getInfoFromDayAndApi = api => day => {
   return {
     main : day.weather[0].main,
     description :day.weather[0].description,
     temp : day.temp.day,
     icon : api.getHTMLElementFromIcon(day.weather[0].icon),
   }
}
insertDayInDom = (day, index) => {
  idx = index ? index : '';
  document.getElementById('today-forecast-main' + idx).innerHTML = day.main;
  document.getElementById('today-forecast-more-info'+ idx).innerHTML = day.description;
  document.getElementById('icon-weather-container'+ idx).innerHTML = day.icon;
  document.getElementById('today-forecast-temp'+ idx).innerHTML = `${day.temp}°C`;
}

// Fonction appelée lors du click du bouton
function start() {
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(document.getElementById('city-input').value);
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(response =>  {
      // Récupère la donnée d'une API
      
      const data = response.data;
    
      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);
    
      // Modifier le DOM
      insertDayInDom({main,description,temp,icon})
    })

    
  apiWeather
    .getThreeDaysForecast()
    .then(res => {
      const days = res.data.list;
      const getInfoFromDay =  getInfoFromDayAndApi(apiWeather);
      days.forEach((day, idx) => insertDayInDom(getInfoFromDay(day),idx+1))
    })
    
}