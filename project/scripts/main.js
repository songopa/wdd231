import {getItems, searchItems} from "./modules/local-data.js";
import {getLocalCount, updateLocalCount, getSelectedRadioValue} from "./modules/common.js";

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

function activeNav(activeId) {
    const navIds = ['homeNav', 'searchNav', 'contactNav', 'signinNav'];

    document.getElementById(activeId).classList.add('active');
    
    filteredIds = navIds.filter((id) => id != activeId)
    
    filteredIds.forEach(id => {
        document.getElementById(id).classList.remove('active');
    });
}


// Search Page
const itemDisplayElm = document.getElementById('foundItems');
if (itemDisplayElm) {
    
    const itemFilterBtn = document.getElementById('filterItemBtn');
    const searchInput = document.getElementById('searchTerm');
    
    getItems("data/items.json")
    searchItems(itemFilterBtn, searchInput);
}


//Report page
const reportCard = document.getElementById('reportCard');
const receivedCard = document.getElementById('confirmationCard');

const reportForm = document.getElementById('reportForm');
if (reportForm) {
    reportForm.addEventListener(('submit'), (event) =>{
        event.preventDefault();
        reportCard.classList.add('d-none');
        reportCard.classList.remove('d-block');
        
        updateLocalCount('reportCount');
        document.getElementById('report-count').innerHTML = `You have reported ${getLocalCount('reportCount')} items so far.`;

        receivedCard.classList.remove('d-none');
        receivedCard.classList.add('d-block');
        reportForm.reset();
    });
}

const anotherReport = document.getElementById('anotherReport');
if (anotherReport) {
    anotherReport.addEventListener(('click'), () =>{
        receivedCard.classList.add('d-none');
        receivedCard.classList.remove('d-block');

        reportCard.classList.remove('d-none');
        reportCard.classList.add('d-block');

    });
}


//Contact page
const contactDialog = document.getElementById('contactDialog');
const contactInfo = document.getElementById('dialogInfo');
const closeBtn = document.getElementById('closeBtn');

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener(('submit'), (event) =>{
        event.preventDefault();
        contactDialog.showModal();

        const yourName = document.querySelector('#name').value;
        const inquiryType = getSelectedRadioValue('purpose')

        const dialogHtml = `
        <strong class="text-center"> Hello ${yourName}</strong>
        <p>Your ${inquiryType} is received and our team shall work on it and get back to you within 24hours.</p>
        `
        contactInfo.innerHTML = dialogHtml;
    });
    closeBtn.addEventListener('click', () =>{
        contactForm.reset();
        contactDialog.close()
    })
}

//Signin page
const signinCard = document.getElementById('signinCard');
const signupCard = document.getElementById('signupCard');

const signupLink = document.getElementById('signupLink');
if (signupLink) {
    signupLink.addEventListener(('click'), () =>{
        signinCard.classList.toggle('d-none');
        
        signupCard.classList.toggle('d-none');
    });
}

const signinLink = document.getElementById('signinLink');
if (signinLink) {
    signinLink.addEventListener(('click'), () =>{
        signupCard.classList.add('d-none');
        signupCard.classList.remove('d-block');

        signinCard.classList.remove('d-none');
        signinCard.classList.add('d-block');

    });
}
