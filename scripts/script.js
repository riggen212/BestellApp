const KEYS = Object.keys(menus);

function showMenus() {
    for (let i = 0; i < menus.length; i++) {

        if (i == 0) {
            renderBurgerMenus(0);
        } else if (i == 1) {
            renderPizzaMenus(1);
        } else if (i == 2) {
            renderSaladMenus(2);
        } else {
            return;
        }
    };
}

function renderBurgerMenus(i) {
    let arrayLength = menus[KEYS[0]].burger.length;
    let elementId = document.getElementById('burgerMenu');

    for (let cardNumber = 0; cardNumber < arrayLength; cardNumber++) {
        elementId.innerHTML += renderMenuCard(cardNumber, 0);
        getBurgerData(cardNumber);
    }
}

function getBurgerData(index) {
    let name = document.getElementById(`name0${index}`);
    let description = document.getElementById(`description0${index}`);
    let price = document.getElementById(`price0${index}`);
    let imagePath = document.getElementById(`imagePath0${index}`)

    name.innerHTML += menus[KEYS[0]].burger[index].menuName;
    description.innerHTML += menus[KEYS[0]].burger[index].menuDescription;
    price.innerHTML += menus[KEYS[0]].burger[index].menuPrice.toFixed(2) + '€';
    imagePath.setAttribute("src", `./assets/img/${menus[KEYS[0]].burger[index].menuImageName}`);
}

function renderPizzaMenus(i) {
    let arrayLength = menus[KEYS[1]].pizza.length;
    let elementId = document.getElementById('pizzaMenu');

    for (let cardNumber = 0; cardNumber < arrayLength; cardNumber++) {
        elementId.innerHTML += renderMenuCard(cardNumber, 1);
        getPizzaData(cardNumber);
    }
}

function getPizzaData(index) {
    let name = document.getElementById(`name1${index}`);
    let description = document.getElementById(`description1${index}`);
    let price = document.getElementById(`price1${index}`);
    let imagePath = document.getElementById(`imagePath1${index}`)

    name.innerHTML += menus[KEYS[1]].pizza[index].menuName;
    description.innerHTML += menus[KEYS[1]].pizza[index].menuDescription;
    price.innerHTML += menus[KEYS[1]].pizza[index].menuPrice.toFixed(2) + '€';
    imagePath.setAttribute("src", `./assets/img/${menus[KEYS[1]].pizza[index].menuImageName}`);
}

function renderSaladMenus(i) {
    let arrayLength = menus[KEYS[1]].pizza.length;
    let elementId = document.getElementById('saladMenu');

    for (let cardNumber = 0; cardNumber < arrayLength; cardNumber++) {
        elementId.innerHTML += renderMenuCard(cardNumber, 2);
        getSaladData(cardNumber);
    }
}

function getSaladData(index) {
    let name = document.getElementById(`name2${index}`);
    let description = document.getElementById(`description2${index}`);
    let price = document.getElementById(`price2${index}`);
    let imagePath = document.getElementById(`imagePath2${index}`)

    name.innerHTML += menus[KEYS[2]].salad[index].menuName;
    description.innerHTML += menus[KEYS[2]].salad[index].menuDescription;
    price.innerHTML += menus[KEYS[2]].salad[index].menuPrice.toFixed(2) + '€';
    imagePath.setAttribute("src", `./assets/img/${menus[KEYS[2]].salad[index].menuImageName}`);
}

// basket logic
function addMenuToBasket(currentElement) {
    let basket = document.getElementById('basketMemberCard');
    let currentName = getMenuName(currentElement);
    let currentCategoryIndex = getMenuCategoryIndex(currentElement);
    let currentCategoryName = getMenuCategoryName(currentElement);
    let currentMenuId = getCurrentMenuId(currentCategoryIndex, currentCategoryName, currentName) 
    let menuPrice = getMenuPrice(currentElement);
    let amount = getMenuAmount (currentCategoryIndex, currentCategoryName, currentName);

    hiddenEmptyBasketInfo();
    showCalculationSection();
    if (basket.querySelector(`#menu${currentMenuId}`) == null) {
        basket.innerHTML += renderBasketMember(currentName, menuPrice, currentMenuId, amount);
    }
}

function hiddenEmptyBasketInfo() {
    let emptyText = document.getElementById('emptyBasket');
    emptyText.style.display = 'none';
}

function showCalculationSection() {
    let element = document.getElementById('basketCalculation');

    if (element.classList.contains('orderCalculationHidden')) {
        element.classList.remove('orderCalculationHidden');
        element.classList.add('orderCalculationShow');
    }
}

function getMenuName(currentElement) {
    let parent = currentElement.parentElement;
    let siblingContainer = parent.previousElementSibling;
    return targetElement = siblingContainer.querySelector('.menuName').textContent;
}

function getMenuPrice(currentElement) {
    return targetElement = currentElement.previousElementSibling.textContent;
}


function getMenuCategoryIndex(element) {
    let currentCategory = 4;
    let parent = element.parentElement.parentElement.parentElement.parentElement.parentElement;

    if (parent.id === 'burgerMenu') {
        currentCategory = 0;
    } else if (parent.id === 'pizzaMenu') {
        currentCategory = 1;
    } else {
        currentCategory = 2;
    }
    return currentCategory;
}

function getMenuCategoryName(element) {
    let currentCategoryName = "";
    let parent = element.parentElement.parentElement.parentElement.parentElement.parentElement;
    if (parent.id === 'burgerMenu') {
        currentCategoryName = "burger";
    } else if (parent.id === 'pizzaMenu') {
        currentCategoryName = "pizza";
    } else {
        currentCategoryName = "salad";
    }
    return currentCategoryName;
}

function getCurrentMenuId(categoryIndex, categoryName, name) {
    let currentMenu = menus[KEYS[categoryIndex]][categoryName].find(menu => menu.menuName === name);
    return currentMenu.id;
}

function getMenuAmount (categoryIndex, categoryName, name) {
    let currentMenu = menus[KEYS[categoryIndex]][categoryName].find(menu => menu.menuName === name);

    currentMenu.amount ++;
    return currentMenu.amount;
}

function deleteMenuFromBasket(element) {
    let menuId = element.parentElement.parentElement.parentElement;
    menuId.remove();  
}
