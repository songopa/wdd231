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

const businessElement = document.querySelector("#businesses");

function businessTemplate (business) {
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


function displayBusinesses(data) {
    const businessHtml = data.map(businessTemplate);
    businessElement.innerHTML = '';
    businessElement.innerHTML = businessHtml.join('');
}

async function getBusinessData() {
    try {
        const response = await fetch('data/members.json')
        const data = await response.json()
        
        displayBusinesses(data)
    } catch (err) {
        console.error(err.message)
    }
}

getBusinessData()

document.querySelector('#gridViewBtn').addEventListener('click', function() {
    businessElement.classList.replace('dir-list','dir-grid');
});
document.querySelector('#listViewBtn').addEventListener('click', function() {
    businessElement.classList.replace('dir-grid','dir-list');
});
