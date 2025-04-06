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

//Directory Page
const gridViewBtn = document.querySelector("#gridViewBtn");
const listViewBtn = document.querySelector("#listViewBtn");

if (gridViewBtn || listViewBtn) {
    gridViewBtn.addEventListener('click', function() {
        businessDirectoryElement.classList.replace('dir-list','dir-grid');
    });
    listViewBtn.addEventListener('click', function() {
        businessDirectoryElement.classList.replace('dir-grid','dir-list');
    });
}

const businessDirectoryElement = document.querySelector("#businesses");

function businessDirectoryTemplate (business) {
    return `
    <section>
    <img src="${business.image}" alt="${business.name}" height="64px" width="256px"> 
    <h3>${business.name}</h3>
    <p>${business.address.location}</p>
    <p>${business.phoneNumber}</p>
    <p>${business.membershipLevel.toUpperCase()}</p>
    <a href="${business.website}">Visit Website</a>
    </section> `
}


function displayDirectoryBusinesses(data) {
    const businessHtml = data.map(businessDirectoryTemplate);
    businessDirectoryElement.innerHTML = '';
    businessDirectoryElement.innerHTML = businessHtml.join('');
}

async function getDirectoryBusinessData() {
    try {
        const response = await fetch('data/members.json')
        const data = await response.json()
        
        displayDirectoryBusinesses(data)
    } catch (err) {
        console.error(err.message)
    }
}

if (businessDirectoryElement) {
    getDirectoryBusinessData()
}

//Home page

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

if(weatherElement) {
    getCurrentWeather()
}

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

if(forecastElement) {
    getForecastWeather()
}

const businessHomeElement = document.querySelector("#bizSnapshot");

function businessHomeTemplate (business) {
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


function displayHomeBusinesses(data) {
    const filtered = data.filter(business => business.membershipLevel != 'Member');

    const randomized = [];
    
    while (randomized.length < 3) {
        const randomIndex = Math.floor(Math.random() * filtered.length);
        if (!randomized.includes(filtered[randomIndex])) {
            randomized.push(filtered[randomIndex]);
        }
    }
    const businessHtml = randomized.map(businessHomeTemplate);
    businessHomeElement.innerHTML = '';
    businessHomeElement.innerHTML = businessHtml.join('');
}

async function getHomeBusiness() {
    try {
        const response = await fetch('data/members.json')
        const data = await response.json()
        
        displayHomeBusinesses(data)
    } catch (err) {
        console.error(err.message)
    }
}

if(businessHomeElement) {
    getHomeBusiness()
}

//Join Page

const positionTitle = document.querySelector('#position-title');
if(positionTitle) {
    const charReg = /^[a-zA-Z\s-]*$/;
    const lengthReg = /(?=.{7,}$)/;
    const titleErr = document.querySelector('#titleErr');

    positionTitle.addEventListener('input', function () {
        if(!charReg.test(positionTitle.value)) {
            positionTitle.value = positionTitle.value.slice(0,-1)
        }
        if(!lengthReg.test(positionTitle.value)) {
            titleErr.textContent = "Title needs to have a minimum of 7 characters"
        } else {
            titleErr.textContent = ""
        }
    });
}

const membershipDialog = document.querySelector('#membershipDialog');
const membershipDetails = document.querySelector('#membershipDetails');
const closeBtn = document.querySelector('.close-button');

const npLearnBtn = document.querySelector('#npLearnBtn');
const bronzeLearnBtn = document.querySelector('#bronzeLearnBtn');
const silverLearnBtn = document.querySelector('#silverLearnBtn');
const goldLearnBtn = document.querySelector('#goldLearnBtn');

if (npLearnBtn || bronzeLearnBtn ||silverLearnBtn || goldLearnBtn) {
    npLearnBtn.addEventListener('click', () => {
        membershipDialog.showModal();
        const npBenefits = `
        <strong>Non Profit Membership</strong>
        <ul>
            <li>For non profit organizations and there is no fee</li>
        </ul>
        `
        membershipDetails.innerHTML = npBenefits;
    })
    bronzeLearnBtn.addEventListener('click', () => {
        membershipDialog.showModal();
        const bronzeBenefits = `
        <strong>Bronze Membership</strong>
        <ul>
            <li>15% discount on events</li>
            <li>10% discount on advertising</li>
            <li>100,000Tzs per month membership fee</li>
        </ul>
        `
        membershipDetails.innerHTML = bronzeBenefits;
    })
    silverLearnBtn.addEventListener('click', () => {
        membershipDialog.showModal();
        const silverBenefits = `
        <strong>Silver Membership</strong>
        <ul>
            <li>25% discount on events</li>
            <li>15% discount on advertising</li>
            <li>Free participation in trade fair</li>
            <li>1 free featured ad per year</li>
            <li>200,000Tzs per month membership fee</li>
        </ul>
        `
        membershipDetails.innerHTML = silverBenefits;
    })
    goldLearnBtn.addEventListener('click', () => {
        membershipDialog.showModal();
        const goldBenefits = `
        <strong>Gold Membership</strong>
        <ul>
            <li>50% discount on events</li>
            <li>50% discount on advertising</li>
            <li>5 free featured ads per year</li>
            <li>2 free free training per year</li>
            <li>Free participation in trade fair</li>
            <li>500,000Tzs per month membership fee</li>
        </ul>
        `
        membershipDetails.innerHTML = goldBenefits;
    })

    closeBtn.addEventListener('click', () =>{
        membershipDialog.close()
    })
}

const joinForm = document.querySelector('#joinForm');

if (joinForm) {
    joinForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const firstName = document.querySelector('#first-name').value;
        const lastName = document.querySelector('#last-name').value;
        const title = document.querySelector('#position-title').value;
        const email = document.querySelector('#email').value;
        const phone = document.querySelector('#phone').value;
        const businessName = document.querySelector('#business-name').value;
        const membership = getSelectedRadioValue('membership');
        const description = document.querySelector('#description').value;
        const joinDate = new Date().toDateString();

        memberInfo = {
            firstName: firstName,
            lastName: lastName,
            title: title,
            email: email,
            phone: phone,
            businessName: businessName,
            membership: membership,
            description: description,
            joinDate: joinDate,
        };
        
        storeNewMember(memberInfo);
        window.location.href = "thankyou.html";
    })
}

function getSelectedRadioValue(name) {
    const radios = document.getElementsByName(name);

    for (const radio of radios) {
        if(radio.checked) {
            return radio.value
        }
    }
}

function storeNewMember(data) {
    localStorage.setItem('newMember', JSON.stringify(data))
}
function displayMemberThanks() {
    const newMember = JSON.parse(localStorage.getItem('newMember')) || {};
    const table = `
    <table>
        <tbody>   
            <tr><td>First Name:</td><td>${newMember.firstName}</td></tr>
            <tr><td>Last Name:</td><td>${newMember.lastName}</td></tr>
            <tr><td>Title:</td><td>${newMember.title}</td></tr>
            <tr><td>Email:</td><td>${newMember.email}</td></tr>
            <tr><td>Phone:</td><td>${newMember.phone}</td></tr>
            <tr><td>Business Name:</td><td>${newMember.businessName}</td></tr>
            <tr><td>Membership Level:</td><td>${newMember.membership}</td></tr>
            <tr><td>Joining Date:</td><td>${newMember.joinDate}</td></tr>
        </tbody>
    </table>`

    newMemberElm.innerHTML = table;

}

const newMemberElm = document.querySelector('#newMemberInfo');

if(newMemberElm) {
    displayMemberThanks();
}

