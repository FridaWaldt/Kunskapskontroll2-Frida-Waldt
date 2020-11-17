/* 
1. All info ska presenteras i metric units - CHECK
2. Ett formulär med en text-input och en submit-knapp där användaren anger en stad. - CHECK
3. Det nuvarande vädret för den inmatade staden hämtas och  presenteras. Du behöver ha med följande: 
    a. Description
    b. Väderikon, se https://openweathermap.org/weather-conditions 
    c. Temperatur
    d. Vindhastighet
    e. Luftfuktighet
4. Temperaturdatan ska användas för att ändra färg på något i appen. Kan vara hela bakgrunden eller en liten ikon, du väljer själv.
5. Utifall den inmatade staden inte kan hittas ska det visas ett tydligt och informerande meddelande.
6. Kommentera all kod med beskrivning av vad den gör




*/

let form = document.querySelector('#weather-form');



form.addEventListener('submit',
    function(event){
        event.preventDefault();

        let cityInput = document.querySelector('#city');

        let city = cityInput.value
        if(!city){
            city = 'Helsingborg';
        }
        /* console.log(city); */
        const apiKey = '8585cdd9fdf63cf77114d6e385663f90';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sve&appid=${apiKey}`;





        fetch(url).then(
            function(response){
                return response.json();
            }
        ).then(
            function(data){
                console.log(data);
                const searchedCity = data.name;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const temp = Math.floor(data.main.temp);
                const wind = data.wind.speed;
                const humid = data.main.humidity;
                console.log(data.weather[0].icon);


                presentData(searchedCity, description, icon, temp, wind, humid); 
            }
        )
        .catch(function (error){
            removeData()
            console.log('Jag är i catch')
            const catchError = document.querySelector('#catch-error');
            catchError.innerText = "Incorrect city, try again";
            
        })
    }
)

/* För att få fram land: data.sys.country */

function presentData(n, d, i, t, w, h){
    let cityName = document.querySelector('#city-name')
    let cityDescription = document.querySelector('#description');
    let weatherIcon = document.querySelector('#weather-icon');
    let temperature = document.querySelector('#temperature');
    let windSpeed = document.querySelector('#wind-speed');
    let humidity = document.querySelector('#humidity');
    let error = document.querySelector('#catch-error');

    cityName.innerText = n;
    cityDescription.innerText = d;
    weatherIcon.src = `http://openweathermap.org/img/wn/${i}@2x.png`;
    temperature.innerText = t;
    windSpeed.innerText = w;
    humidity.innerText = h;
    error.innerText = '';



}



// en funktion som tar bort data från .catch

function removeData(){
    let cityName = document.querySelector('#city-name')
    let cityDescription = document.querySelector('#description');
    let weatherIcon = document.querySelector('#weather-icon');
    let temperature = document.querySelector('#temperature');
    let windSpeed = document.querySelector('#wind-speed');
    let humidity = document.querySelector('#humidity');
    let error = document.querySelector('#catch-error');

    cityName.innerText = '';
    cityDescription.innerText = '';
    weatherIcon.src = '';
    temperature.innerText = '';
    windSpeed.innerText = '';
    humidity.innerText = '';
    error.innerText = '';
}
