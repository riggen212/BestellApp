function renderMenuCard(index, numb) {
    return `<div class="menuCard">
                <article class="menuContentCard">
                    <figure>
                        <img id="imagePath${numb}${index}" src="" alt="">
                    </figure>
                    <div class="menu">
                        <div class="menuDescription">
                            <h3 id="name${numb}${index}"></h3>
                            <p id="description${numb}${index}"></p>
                        </div>
                        <div class="menuPrice">
                            <span id="price${numb}${index}"></span>
                            <button>Add to basket</button>
                        </div>
                    </div>
                </article>
            </div>
    `;
}

function renderBasketMember(params) {
    return `<section class="basketMember">
                <p><span id="amountValue">1</span></p>
                <div class="basketAmountArea">
                    <div>
                        <button>
                            <img src="./assets/icons/delete_icon.svg" alt="delete the menu from basket">
                        </button>
                        <button>1+</button>
                    </div>
                    <span id="basketPrice">16,90€</span>
                </div>
            </section>
    `;
}