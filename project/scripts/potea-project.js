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

const signinCard = document.getElementById('signinCard');
const signupCard = document.getElementById('signupCard');

const signupLink = document.getElementById('signupLink');
if (signupLink) {
    signupLink.addEventListener(('click'), () =>{
        signinCard.classList.add('d-none');
        signinCard.classList.remove('d-block');
        
        signupCard.classList.remove('d-none');
        signupCard.classList.add('d-block');
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


// Search Items

const reportedItems = [
    {
        itemName: 'Laptop hp 9210',
        itemLocation: 'Entebe airport, police station',
        contact: '+256778909887'
    },
    {
        itemName: 'Iphone X',
        itemLocation: 'KFC kyanja',
        contact: '+256700122334'
    },
    {
        itemName: 'Iphone 14',
        itemLocation: 'Marybrown Ntinda',
        contact: '+256700435465'
    },
    {
        itemName: 'A pink small purse',
        itemLocation: 'KFC kyanja',
        contact: '+256700122334'
    },
    {
        itemName: 'Dell laptop 28030',
        itemLocation: 'Arcade mall kololo, security office',
        contact: '+256778909887'
    },
    {
        itemName: 'Mens brown wallet',
        itemLocation: 'Shoprite masaki',
        contact: '+256700122334'
    },
    {
        itemName: 'National identity card',
        itemLocation: 'Arcade mall nakasero, security office',
        contact: '+256700435465'
    },
    {
        itemName: 'School bag with books',
        itemLocation: 'KFC kyanja',
        contact: '+256700122334'
    },
    {
        itemName: 'Samsung S10',
        itemLocation: 'KFC masaki',
        contact: '+256778909887'
    },
    {
        itemName: 'Drivers license',
        itemLocation: 'KFC kyanja',
        contact: '+256700122334'
    },
    {
        itemName: 'Iphone 14 promax',
        itemLocation: 'Lanseria airport, police station',
        contact: '+256700435465'
    },
    {
        itemName: 'Bagpack black color',
        itemLocation: 'Lanseria airport, police station',
        contact: '+256700435465'
    },
    {
        itemName: 'Dell laptop 2206',
        itemLocation: 'NSSF office nakasero',
        contact: '+256778909887'
    },
    {
        itemName: 'Drivers license',
        itemLocation: 'Shoppers plaza mikocheni',
        contact: '+256700122334'
    },
    {
        itemName: 'National identity card',
        itemLocation: 'Shoppers plaza mbezi',
        contact: '+256700435465'
    },
    {
        itemName: 'House keys',
        itemLocation: 'Chic-a-fill kkoo branch',
        contact: '+256700122334'
    },
];

const itemDisplayElm = document.getElementById('foundItems');

if (itemDisplayElm) {
    displayItems(reportedItems)
}

function itemHtmlTemplate (item) {
    return `<div class="item-card">
        <table>
            <tbody>
                <tr>
                    <th>Item:</th>
                    <td>${item.itemName}</td>
                </tr>
                <tr>
                    <th>Location:</th>
                    <td>${item.itemLocation}</td>
                </tr>
                <tr>
                    <th>Contact:</th>
                    <td>${item.contact}</td>
                </tr>
            </tbody>
        </table>
    </div>`
}

function displayItems(items) {
    const itemsHtml = items.map(itemHtmlTemplate);
    itemDisplayElm.innerHTML = "";
    itemDisplayElm.innerHTML = itemsHtml.join(' ')
}

const itemFilterBtn = document.getElementById('filterItemBtn');

if (itemFilterBtn) {
    searchInput = document.getElementById('searchTerm');

    searchInput.addEventListener('keyup', () => {
        itemFilterBtn.click();
    } );

    itemFilterBtn.addEventListener(('click'), () => {

        if (searchInput.value.trim() === "") {
            searchInput.focus();
            displayItems(reportedItems);
            return
        }

        const filteredItems = reportedItems.filter((item) => 
            item.itemName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            item.itemLocation.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        displayItems(filteredItems);
    });
}

const reportCard = document.getElementById('reportCard');
const receivedCard = document.getElementById('confirmationCard');

const reportForm = document.getElementById('reportForm');
if (reportForm) {
    reportForm.addEventListener(('submit'), (event) =>{
        event.preventDefault();
        reportCard.classList.add('d-none');
        reportCard.classList.remove('d-block');
        
        reportCount = parseInt(reportCount) +1;
        saveReportCount();
        document.getElementById('report-count').innerHTML = `You have reported ${reportCount} items so far.`;

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

let reportCount = getReportCount() || '0';

function getReportCount () {
    return localStorage.getItem('reportCount')
}
function saveReportCount() {
    localStorage.setItem('reportCount', reportCount)
}

const contactCard = document.getElementById('contactCard');

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener(('submit'), (event) =>{
        event.preventDefault();
        contactCard.classList.add('d-none');
        contactCard.classList.remove('d-block');
        
        receivedCard.classList.remove('d-none');
        receivedCard.classList.add('d-block');
        contactForm.reset();
    });
}

const anotherInquiry = document.getElementById('anotherInquiry');
if (anotherInquiry) {
    anotherInquiry.addEventListener(('click'), () =>{
        receivedCard.classList.add('d-none');
        receivedCard.classList.remove('d-block');

        contactCard.classList.remove('d-none');
        contactCard.classList.add('d-block');

    });
}
