function renderMenuCard(index) {
    return `<div class="menuCard">
                <article class="menuContentCard">
                    <img id="imagePath${index}" src="./assets/img/veggie_mushroom_black-burger.jpg" alt="">

                    <div class="menu">
                        <div class="menuDescription">
                            <h3 id="name${index}"></h3>
                            <p id="description${index}"></p>
                        </div>
                        <div class="menuPrice">
                            <span id="price${index}"></span>
                            <button>Add to basket</button>
                        </div>
                    </div>
                </article>
            </div>
    `;
}