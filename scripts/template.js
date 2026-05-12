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

function renderBasketMember(name, price, id, amount) {
    return `<section id="menu${id}" class="basketMember">
                <p><span id="amountValue">${amount}</span> ${name}</p>
                <div class="basketAmountArea">
                    <div>
                        <button onclick="deleteMenuFromBasket(this)">
                            <img src="./assets/icons/delete_icon.svg" alt="delete the menu from basket">
                        </button>
                        <button>1+</button>
                    </div>
                    <span id="basketPrice">${price}</span>
                </div>
            </section>
    `;
}