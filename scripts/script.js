const KEYS = Object.keys(menus);
let categoryName = [];

function showMenus() {
    for (let i = 0; i < menus.length; i++) {
        categoryName = menus[KEYS[i]];

        renderBurgerMenus(categoryName, i);
    };
}

function renderBurgerMenus(category, i) {
    if (category = menus[KEYS[i]].burger) {
        let arrayLength = menus[KEYS[i]].burger.length;
        let elementId = document.getElementById('burgerMenu');

        for (let cardNumber = 0; cardNumber < arrayLength; cardNumber++) {
            console.log(cardNumber);
            elementId.innerHTML += renderMenuCard(cardNumber);
            getBurgerData(cardNumber);
        }
    }
}

function getBurgerData(index) {    
    let name = document.getElementById(`name${index}`);
    let description = document.getElementById(`description${index}`);
    let price = document.getElementById(`price${index}`);

    name.innerHTML += menus[KEYS[0]].burger[index].menuName;   
    description.innerHTML += menus[KEYS[0]].burger[index].menuDescription;
    price.innerHTML += menus[KEYS[0]].burger[index].menuPrice.toFixed(2) + '€';
}