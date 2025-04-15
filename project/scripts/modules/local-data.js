
function displayItems( items) {
    const itemDisplayElm = document.getElementById('foundItems');
    const itemsHtml = items.map(itemHtmlTemplate);
    itemDisplayElm.innerHTML = "";
    itemDisplayElm.innerHTML = itemsHtml.join(' ')
}

export async function getItems(path, filter = false) {
    try {
        const response  = await fetch (path);
        const items = await response.json();

        if(filter) {
            return items;
        } else {
            displayItems(items)
        }
    } catch (error) {
        console.log(error.message)
    }
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

export function searchItems (itemFilterBtn, searchInput) {
    
    searchInput.addEventListener('keyup', () => {
        itemFilterBtn.click();
    } );

    itemFilterBtn.addEventListener(('click'), async () => {

        if (searchInput.value.trim() === "") {
            searchInput.focus();
            getItems("data/items.json");
            return
        }
        const reportedItems = await getItems("data/items.json", true);
        const filteredItems = reportedItems.filter((item) => 
            item.itemName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            item.itemLocation.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        displayItems(filteredItems);
    });
}