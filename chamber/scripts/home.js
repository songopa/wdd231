const currentYear = document.querySelector("#currentYear");
currentYear.innerHTML = new Date().getFullYear();

const modified = document.querySelector("#lastModified");
modified.innerHTML ="Last modified: "+ document.lastModified;

const menuBtn = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

menuBtn.addEventListener('click', function() {
    navigation.classList.toggle('show')
    menuBtn.classList.toggle('show')
})

function convertTimestamp(stamp, type='time') {

    var date = new Date(stamp * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var day = weekday[date.getDay()]
    
    if (type == 'time') {
        return hours + ':' + minutes + ':' + seconds;
    } else {
        return day;
    }
}

const weatherElement = document.querySelector("#currentWeather");
const forecastElement = document.querySelector("#forecastWeather");

async function getCurrentWeather() {
    try {
        
        url = 'https://api.openweathermap.org/data/2.5/weather?lat=-6.1637&lon=39.1931&units=metric&appid=156e53af424b88210910b583a2b3c190';
        const response = await fetch(url);
        const data = await response.json();
    
        weatherElement.innerHTML = '';
        weatherElement.innerHTML = weatherTemplate(data);

    } catch(err) {
        console.error(err.message);
    }
}

function weatherTemplate (data) {
    return `
    <section>
        <p>Temp: ${data.main.temp} <sup>o</sup>C</p>
        <p>${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</p>
        <p>High: ${data.main.temp_max} <sup>o</sup>C</p>
        <p>Low: ${data.main.temp_min} <sup>o</sup>C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Sunrise: ${convertTimestamp(data.sys.sunrise)}</p>
        <p>Sunset: ${convertTimestamp(data.sys.sunset)}</p>
    </section> `
}

getCurrentWeather()

async function getForecastWeather() {
    try {
        url = 'https://api.openweathermap.org/data/2.5/forecast?lat=-6.1637&lon=39.1931&units=metric&appid=156e53af424b88210910b583a2b3c190';
        const response = await fetch(url);
        const data = await response.json();
        
        forecastElement.innerHTML = '';
        forecastElement.innerHTML = forecastTemplate(data);

    } catch(err) {
        console.error(err.message);
    }
}


function forecastTemplate (data) {
    return `
    <section>  
        <p>${convertTimestamp(data.list[3].dt, 'day')}: ${data.list[3].main.temp} <sup>o</sup>C</p>    
        <p>${convertTimestamp(data.list[11].dt, 'day')}: ${data.list[11].main.temp} <sup>o</sup>C</p>    
        <p>${convertTimestamp(data.list[19].dt, 'day')}: ${data.list[19].main.temp} <sup>o</sup>C</p>    
    </section> `
}


getForecastWeather()

const businessElement = document.querySelector("#bizSnapshot");

function businessTemplate (business) {
    return `
    <div class="card">
        <div class="card-header text-center">${business.name}</div>
        <div class="card-body " >
            <img class="biz-snap-img" src="${business.image}" alt="${business.name}" height="64px" width="256px">
            <div>
                <p>Location: ${business.address.location}</p>
                <p>Phone: ${business.phoneNumber}</p>
                <p>Membership: ${business.membershipLevel}</p>
                <a href="${business.website}" target="_blank">Visit Website</a>
            </div> 
        </div>
    </div> `
}


function displayBusinesses(data) {
    const filtered = data.filter(business => business.membershipLevel != 'Member');

    const randomized = [];
    
    while (randomized.length < 3) {
        const randomIndex = Math.floor(Math.random() * filtered.length);
        if (!randomized.includes(filtered[randomIndex])) {
            randomized.push(filtered[randomIndex]);
        }
    }
    const businessHtml = randomized.map(businessTemplate);
    businessElement.innerHTML = '';
    businessElement.innerHTML = businessHtml.join('');
}

async function getBusinessSnapshot() {
    try {
        const response = await fetch('data/members.json')
        const data = await response.json()
        
        displayBusinesses(data)
    } catch (err) {
        console.error(err.message)
    }
}

getBusinessSnapshot()