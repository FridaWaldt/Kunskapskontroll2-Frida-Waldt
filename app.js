// Selecting my form then add an eventlistener to it for submitting an input.

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




        //Making sure there's an error message depending on the statuscode
        fetch(url).then(
            function(response){
                
                if(response.status >= 200 && response.status < 300) {
                    return response.json();
                }

                else if (response.status === 404){
                    throw "Incorrect city, try again";
                }

                else if(response.status === 401){
                    throw "Unauthorized, please come back later";
                }
                
            }
        //Finding data about city from input
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


                //Calling functions for the data and the background, putting in the data we need
                presentData(searchedCity, description, icon, temp, wind, humid); 
                changeBackground(temp);
            }
        )
        // Catch will catch the errors occuring when not typing correct city
        .catch(function (error){
            removeData();
            console.log('Jag är i catch', error)
            const catchError = document.querySelector('#catch-error');
            catchError.innerText = error; //"Incorrect city"
        })
    }
)


//A function that presents the data from input

function presentData(n, d, i, t, w, h){
    let cityName = document.querySelector('#city-name')
    let cityDescription = document.querySelector('#description');
    let weatherIcon = document.querySelector('#weather-icon');
    let temperature = document.querySelector('#temperature');
    let windSpeed = document.querySelector('#wind-speed');
    let windSpeedTitle = document.querySelector('#wind-speed-title');
    let humidity = document.querySelector('#humidity');
    let humidityTitle = document.querySelector('#humidity-speed-title');
    let error = document.querySelector('#catch-error');
    

    cityName.innerText = n;
    cityDescription.innerText = d;
    cityDescription.style.textTransform = 'capitalize';
    weatherIcon.src = `http://openweathermap.org/img/wn/${i}@2x.png`;
    temperature.innerHTML = `${t}&#8451;`;
    windSpeed.innerText = `${w} m/s`;
    windSpeedTitle.innerText = 'Wind Speed';
    humidity.innerText = `${h}%`;
    humidityTitle.innerText = 'Humidity';
    error.innerText = '';
}


// A function that removes data from .catch

function removeData(){
    let cityName = document.querySelector('#city-name');
    let cityDescription = document.querySelector('#description');
    let weatherIcon = document.querySelector('#weather-icon');
    let temperature = document.querySelector('#temperature');
    let windSpeed = document.querySelector('#wind-speed');
    let windSpeedTitle = document.querySelector('#wind-speed-title');
    let humidity = document.querySelector('#humidity');
    let humidityTitle = document.querySelector('#humidity-speed-title');
    let error = document.querySelector('#catch-error');

    cityName.innerText = '';
    cityDescription.innerText = '';
    weatherIcon.src = '';
    temperature.innerText = '';
    windSpeed.innerText = '';
    windSpeedTitle.innerText = '';
    humidity.innerText = '';
    humidityTitle.innerText = '';
    error.innerText = '';
    
}


//A function that changes background depending on the temperature in the city 
function changeBackground(temp){
    let background = document.querySelector('.background');

    if (temp <= 5){
        background.style.backgroundImage = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('img/winter.jpg')";
    }
    else if(temp > 5 && temp < 10){
        background.style.backgroundImage = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('img/fall.jpg')";
    }
    else if(temp > 10 && temp < 20){
        background.style.backgroundImage = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('img/spring.jpg')";
    }
    else{
        background.style.backgroundImage = "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('img/summer.jpg')";
    }

}


