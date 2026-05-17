function renderMenuCard(index, numb) {
    return `<div class="menuCard">
                <article class="menuContentCard">
                    <figure>
                        <img id="imagePath${numb}${index}" src="" alt="">
                    </figure>
                    <div class="menu">
                        <div class="menuDescription">
                            <h3 class="menuName" id="name${numb}${index}"></h3>
                            <p id="description${numb}${index}"></p>
                        </div>
                        <div class="menuPrice">
                            <span id="price${numb}${index}"></span>
                            <button class="btn" onclick="getMenuDataForBasket(this)">Add to basket</button>
                        </div>
                    </div>
                </article>
            </div>
    `;
}

function renderBasketMember(menuName, menuPrice, amount, menuId) {
    return `<article id="menu${menuId}" class="basketMember">
                <p><span>${amount}</span> x ${menuName}</p>
                <div class="basketAmountArea">
                    <div class="btnButton">
                        <button onclick="deleteMenuFromBasket(this)">
                            <img class="btnDelete" src="./assets/icons/delete_icon.svg" alt="delete the menu from basket">
                        </button>
                        <button onclick="increaseAmount(this)">1+</button>
                        <button class="btnDecrease" onclick="decreaseAmount(this)">1-</button>
                    </div>
                    <span>${menuPrice}€</span>
                </<div>
            </article>
    `;
}