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
                            <button class="btn" onclick="addMenuToBasket(this)">Add to basket</button>
                        </div>
                    </div>
                </article>
            </div>
    `;
}

function renderBasketMember(menuName, menuPrice, amount, menuId) {
    return `<section id="menu${menuId}" class="basketMember">
                <p><span>${amount}</span> ${menuName}</p>
                <div class="basketAmountArea">
                    <div>
                        <button onclick="deleteMenuFromBasket(this)">
                            <img src="./assets/icons/delete_icon.svg" alt="delete the menu from basket">
                        </button>
                        <button onclick="increaseAmount(this)">1+</button>
                        <button onclick="decreaseAmount(this)">1-</button>
                    </div>
                    <span>${menuPrice}€</span>
                </div>
            </section>
    `;
}