
export function getLocalCount (itemName) {
    return localStorage.getItem(itemName) || '0';
}
export function updateLocalCount(itemName) {
    let updatedCount = parseInt(getLocalCount(itemName)) + 1;
    localStorage.setItem(itemName, updatedCount)
}
export function getSelectedRadioValue(name) {
    const radios = document.getElementsByName(name);

    for (const radio of radios) {
        if(radio.checked) {
            return radio.value
        }
    }
}