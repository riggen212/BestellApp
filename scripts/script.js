const KEYS = Object.keys(menus);
const BURGERID = 0;
const PIZZAID = 1;
const SALADID = 2;

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
    let arrayLength = menus[KEYS[BURGERID]].burger.length;
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
    let menuCardRef = document.getElementById(`name0${index}`).parentElement.parentElement.parentElement;

    name.innerHTML += menus[KEYS[BURGERID]].burger[index].menuName;
    description.innerHTML += menus[KEYS[BURGERID]].burger[index].menuDescription;
    price.innerHTML += menus[KEYS[BURGERID]].burger[index].menuPrice.toFixed(2) + '€';
    imagePath.setAttribute("src", `./assets/img/${menus[KEYS[BURGERID]].burger[index].menuImageName}`);
    menuCardRef.setAttribute("id", `menu${menus[KEYS[BURGERID]].burger[index].id}`);
}

function renderPizzaMenus(i) {
    let arrayLength = menus[KEYS[PIZZAID]].pizza.length;
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
    let menuCardRef = document.getElementById(`name1${index}`).parentElement.parentElement.parentElement;

    name.innerHTML += menus[KEYS[PIZZAID]].pizza[index].menuName;
    description.innerHTML += menus[KEYS[PIZZAID]].pizza[index].menuDescription;
    price.innerHTML += menus[KEYS[PIZZAID]].pizza[index].menuPrice.toFixed(2) + '€';
    imagePath.setAttribute("src", `./assets/img/${menus[KEYS[PIZZAID]].pizza[index].menuImageName}`);
    menuCardRef.setAttribute("id", `menu${menus[KEYS[PIZZAID]].pizza[index].id}`);
}

function renderSaladMenus(i) {
    let arrayLength = menus[KEYS[SALADID]].salad.length;
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
    let menuCardRef = document.getElementById(`name2${index}`).parentElement.parentElement.parentElement;

    name.innerHTML += menus[KEYS[SALADID]].salad[index].menuName;
    description.innerHTML += menus[KEYS[SALADID]].salad[index].menuDescription;
    price.innerHTML += menus[KEYS[SALADID]].salad[index].menuPrice.toFixed(2) + '€';
    imagePath.setAttribute("src", `./assets/img/${menus[KEYS[SALADID]].salad[index].menuImageName}`);
    menuCardRef.setAttribute("id", `menu${menus[KEYS[SALADID]].salad[index].id}`);
}

// basket logic
function getMenuDataForBasket(currentElement) { 
    let basketRef = document.getElementById('basketMemberCard');
    let menuCategoryIndex = getMenuCategoryIndex(currentElement);
    let menuCategoryName = getMenuCategoryName(menuCategoryIndex);
    let menuId = getMenuId(currentElement);
    let menuName = getMenuName(menuCategoryIndex, menuCategoryName, menuId[1]);
    let amount = getMenuAmount(menuCategoryIndex, menuCategoryName, menuId[1]);
    let menuPrice = getMenuPrice(menuCategoryIndex, menuCategoryName, menuId[1]) * amount;
    hiddenEmptyBasketInfo();
    showCalculationSection();
    renderMenuInBasket(basketRef, menuName, menuPrice, amount, menuId, currentElement);
    document.getElementById('basketArea').style.setProperty('--showBasket', 'visible');
}

function renderMenuInBasket(basketRef, menuName, menuPrice, amount, menuId, currentElement) {
    const DELETDED = false;
    if (basketRef.querySelector(`#menu${menuId}`) == null) {
        if (amount == 1) {
            basketRef.innerHTML += renderBasketMember(menuName, menuPrice, amount, menuId);
            calculateNewPrice(menuId);
            changeButtonText(currentElement, DELETDED);
        }
    } else {
        const BASKETREF = document.getElementById('basketMemberCard');
        increaseBasketMenuAmount(menuId);
        calculateNewPrice(menuId);
        changeButtonText(currentElement, DELETDED);
        showDecreaseButton(currentElement, BASKETREF);
    };
}

function changeButtonText(buttonRef, deleted) {
    const MENUID = buttonRef.parentElement.parentElement.parentElement.id;
    const CURRENTCATEGORYNAME = getMenuCategoryName(MENUID[4] - 1);
    const CURRENTAMOUNT = getMenuAmount(MENUID[4] - 1, CURRENTCATEGORYNAME, MENUID[5]);
    const SECTIONNAME = getSectionIdName(MENUID[4] - 1)
    let btnAddToBasket = document.getElementById(`${SECTIONNAME}`).querySelectorAll('.menuCard');

    btnAddToBasket.forEach(el => {
        if (el.children[0].id === `menu${MENUID.slice(-2)}`) {
            btnAddToBasket = el.children[0].children[1].children[1].children[1];
            if (deleted) {
                btnAddToBasket.textContent = `Add to basket`;
            } else {
                btnAddToBasket.textContent = `Added ${CURRENTAMOUNT}`;
            }
        }
    });
}

function getSectionIdName(id) {
    let name = "";
    switch (id) {
        case 0:
            name = "burgerMenu";
            break;
        case 1:
            name = "pizzaMenu";
            break;
        case 2:
            name = "saladMenu";
            break;
        default:
            break;
    }
    return name;
}

function hiddenEmptyBasketInfo() {
    let emptyText = document.getElementById('emptyBasket');
    emptyText.style.display = 'none';
}

function showEmptyBasketInfo() {
    let emptyText = document.getElementById('emptyBasket');
    emptyText.style.display = 'flex';
}

function showCalculationSection() {
    let element = document.getElementById('basketCalculation');

    if (element.classList.contains('orderCalculationHidden')) {
        element.classList.remove('orderCalculationHidden');
        element.classList.add('orderCalculationShow');
    };
}

function hiddenCalculationSection() {
    let element = document.getElementById('basketCalculation');

    if (element.classList.contains('orderCalculationShow')) {
        element.classList.remove('orderCalculationShow');
        element.classList.add('orderCalculationHidden');
    };
}

function getMenuName(categoryIndex, categoryName, menuIndex) {
    return menus[KEYS[categoryIndex]][categoryName][menuIndex].menuName;
}

function getMenuPrice(categoryIndex, categoryName, menuIndex) {
    return menus[KEYS[categoryIndex]][categoryName][menuIndex].menuPrice.toFixed(2);
}

function getMenuAmount(categoryIndex, categoryName, menuIndex) {
    return menus[KEYS[categoryIndex]][categoryName][menuIndex].amount;
}

function getMenuId(element) {
    let currentMenu = element.parentElement.parentElement.parentElement.getAttribute("id");
    currentMenu = currentMenu.slice(-2);
    return currentMenu;
}

function getMenuCategoryIndex(element) {
    let currentCategory = element.parentElement.parentElement.parentElement.getAttribute("id");
    currentCategory = currentCategory[4] - 1;
    return currentCategory;
}

function getMenuCategoryName(index) {
    if (index == 0) {
        categoryName = "burger";
    } else if (index == 1) {
        categoryName = "pizza";
    } else {
        categoryName = "salad";
    }
    return categoryName;
}

function increaseBasketMenuAmount(id) {
    const BASKETPARENTREF = document.getElementById('basketMemberCard');
    menus[KEYS[id[0] - 1]][getMenuCategoryName(id[0] - 1)][id[1]].amount++;

    BASKETPARENTREF.querySelector(`#menu${id}`).children[0].children[0].textContent = menus[KEYS[id[0] - 1]][getMenuCategoryName(id[0] - 1)][id[1]].amount;
}

function getMenuIDFromBasket(element) {
    let id = element.parentElement.parentElement.parentElement.getAttribute("id");
    id = id.slice(-2);
    return id;
}

function deleteMenuFromBasket(element) {
    const MENUREF = document.getElementById(`menu${getMenuIDFromBasket(element)}`)
    const DELETDED = true;
    menus[KEYS[MENUREF.id[4] - 1]][getMenuCategoryName(MENUREF.id[4] - 1)][MENUREF.id[5]].amount = 1;
    MENUREF.remove();
    setOrderPrice();
    changeButtonText(element, DELETDED);

    const BASKETPARENTREF = document.getElementById('basketMemberCard');
    if (BASKETPARENTREF.children.length == 1) {
        showEmptyBasketInfo();
        hiddenCalculationSection();
    }
}

function increaseAmount(element) {
    const MENUREF = document.getElementById(`menu${getMenuIDFromBasket(element)}`);
    const BUTTONDEGREASE = element.nextElementSibling;
    const DELETDED = false;
    BUTTONDEGREASE.style.setProperty('--hiddenElement', 'visible');


    increaseBasketMenuAmount(MENUREF.id.slice(-2));
    calculateNewPrice(MENUREF.id.slice(-2));
    changeButtonText(element, DELETDED);
}

function decreaseAmount(element) {
    const BASKETPARENTREF = document.getElementById('basketMemberCard');
    const DELETDED = false;
    let menuRef = document.getElementById(`menu${getMenuIDFromBasket(element)}`)

    if (menus[KEYS[menuRef.id[4] - 1]][getMenuCategoryName(menuRef.id[4] - 1)][menuRef.id[5]].amount > 1) {
        menus[KEYS[menuRef.id[4] - 1]][getMenuCategoryName(menuRef.id[4] - 1)][menuRef.id[5]].amount--;
        BASKETPARENTREF.querySelector(`#menu${menuRef.id.slice(-2)}`).children[0].children[0].textContent = menus[KEYS[menuRef.id[4] - 1]][getMenuCategoryName(menuRef.id[4] - 1)][menuRef.id[5]].amount;
        changeButtonText(element, DELETDED);
        calculateNewPrice(menuRef.id.slice(-2));
    }
    if (menus[KEYS[menuRef.id[4] - 1]][getMenuCategoryName(menuRef.id[4] - 1)][menuRef.id[5]].amount < 2) {
        element.style.setProperty('--hiddenElement', 'hidden');
    }
}

function calculateNewPrice(id) {
    const BASKETPARENTREF = document.getElementById('basketMemberCard');
    let menuPrice = BASKETPARENTREF.querySelector(`#menu${id}`).children[1].children[1];
    let newPrice = menus[KEYS[id[0] - 1]][getMenuCategoryName(id[0] - 1)][id[1]].amount * menus[KEYS[id[0] - 1]][getMenuCategoryName(id[0] - 1)][id[1]].menuPrice;

    menuPrice.textContent = `${newPrice.toFixed(2)}€`;
    setOrderPrice();
}

function showDecreaseButton(buttenRef, basketRef) {
    const MENUID = getMenuId(buttenRef);
    const CATEGORYNAME = getMenuCategoryName(MENUID[0] - 1);
    const DECREASEBUTTONREF = basketRef.querySelector(`#menu${MENUID}`).children[1].children[0].children[2];
    DECREASEBUTTONREF.style.setProperty('--hiddenElement', 'visible');
}

// set order costs
function setOrderPrice() {
    let subPrice = document.getElementById('subPrice');
    let deliveryFee = parseFloat(document.getElementById('deliveryFee').textContent);
    let totalPrice = document.getElementById('totalPrice');
    let priceButton = document.getElementById('priceButton');

    subPrice.textContent = `${calculateSubAmount()}€`;
    totalPrice.textContent = `${calculateTotalPrice(calculateSubAmount(), deliveryFee)}€`;
    priceButton.textContent = `${calculateTotalPrice(calculateSubAmount(), deliveryFee)}€`;
}

function calculateSubAmount() {
    let subPrice = 0;
    const menuCardRef = document.getElementById('basketMemberCard').querySelectorAll('[id*="menu"]');
    const menuArray = Array.from(menuCardRef);
    menuArray.forEach(el => {
        subPrice = subPrice + parseFloat(el.children[1].children[1].textContent);
    })
    return subPrice.toFixed(2);
}

function calculateTotalPrice(price, deliveryFee) {
    let totalPrice = parseFloat(price) + deliveryFee;
    return totalPrice.toFixed(2);
}

// dialog logic
function showDialog() {
    let DIALOG = document.getElementById('buyOrder');
    let BTNORDER = document.getElementById('order');
    let BASKETREF = document.getElementById('basketArea');
    DIALOG.showModal();
    clearBasket();
    showEmptyBasketInfo();
    hiddenCalculationSection();
    BASKETREF.style.setProperty('--showBasket', 'hidden');
    setTimeout(() => {
        if (DIALOG.open) {
            DIALOG.close();
        }
    }, 3000);
}

function clearBasket() {
    let menuCardRef = document.getElementById('basketMemberCard').querySelectorAll('[id*="menu"]');
    let menuArray = Array.from(menuCardRef);
    menuArray.forEach(el => {
        setDefaultValues(el.id.slice(-2));
        el.remove();
        resetAddToBasketButton(el.id.slice(-2));
    })
}

function setDefaultValues(id) {
    menus[KEYS[id[0] - 1]][getMenuCategoryName(id[0] - 1)][id[1]].amount = 1;
}

function resetAddToBasketButton(id) {
    const CURRENTCATEGORYNAME = getMenuCategoryName(id[0] - 1);
    const CURRENTAMOUNT = getMenuAmount(id[0] - 1, CURRENTCATEGORYNAME, id[1]);
    const SECTIONNAME = getSectionIdName(id[0] - 1)
    let btnAddToBasket = document.getElementById(`${SECTIONNAME}`).querySelectorAll('.menuCard');

    btnAddToBasket.forEach(el => {
        if (el.children[0].id === `menu${id}`) {
            btnAddToBasket = el.children[0].children[1].children[1].children[1];
            if (true) {
                btnAddToBasket.textContent = `Add to basket`;
            } else {
                btnAddToBasket.textContent = `Added ${CURRENTAMOUNT}`;
            }
        }
    });
}

function closeDialog() {
    const DIALOG = document.getElementById('buyOrder');
    DIALOG.close();
}