const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        
        const response = await fetch(url);
        const data = await response.json();

        displayProphets(data.prophets);
    } catch(err) {
        console.error(err.message);
    }
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        let card = document.createElement('section');
        let fullName= document.createElement('h2');
        let birthDate= document.createElement('div');
        let birthPlace= document.createElement('div');
        let potrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`

        card.setAttribute('class', 'card card-body text-center')

        potrait.setAttribute('src', prophet.imageurl);
        potrait.setAttribute('alt', `Potrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}th Latter-day President`);
        potrait.setAttribute('loading', 'lazy');
        potrait.setAttribute('width', '479');
        potrait.setAttribute('height', '594');

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(potrait);      
        cards.appendChild(card)
    });
}