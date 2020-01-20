window.onload = initPage;

//Variaveis globais
let dataShoppingItem = [[], [], []];

//Funções Auxiliares
function currencyFormat(currency_input) {
    return currency_input.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
}

function titleize(text) {
    let words = text.toLowerCase().split(" ");
    for (let a = 0; a < words.length; a++) {
        let w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
}

function ordination(vector, content) {
    switch (content) {
        case 'title':
            vector.sort((a, b) => {
                return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
            });
            break;
        case 'biggest_price':
            vector.sort((a, b) => {
                return a.price > b.price ? -1 : a.price > b.price ? 1 : 0;
            });
            break;
        case 'lowest_price':
            vector.sort((a, b) => {
                return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
            });
            break;
        case 'brand':
            vector.sort((a, b) => {
                return a.brand < b.brand ? -1 : a.brand > b.brand ? 1 : 0;
            });
            break;
    }
}

function elementPreventDefault(element) {
    element.addEventListener('click', function (e) {
        e.preventDefault();
    });
}

//Funções de Criação e Manipulação de Elmentos
function creatingCard(image, title, price, brand) {

    let container = document.createElement("a");
    container.classList.add(".col-sm-");
    container.classList.add("card-test");
    container.setAttribute("href", "#");
    elementPreventDefault(container);


    let breakline = document.createElement("br");

    let div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("div_element");

    let img = document.createElement("img");
    img.setAttribute("src", image);
    img.classList.add("card-img-top");
    img.classList.add("test_p");

    div.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let titleCard = document.createElement("h6");
    titleCard.classList.add("card-title");
    titleCard.textContent = title;


    let priceCard = document.createElement("p");
    priceCard.classList.add("font-italic");
    priceCard.classList.add("price");
    priceCard.textContent = currencyFormat(price);

    let installmentPriceCard = document.createElement("p");
    installmentPriceCard.classList.add("font-italic");
    installmentPriceCard.classList.add("installmentPrice");
    installmentPriceCard.textContent = `em até 10x de ${currencyFormat(price / 10)} sem juros`;

    let brandCard = document.createElement('p');
    brandCard.classList.add("brand");
    brandCard.textContent = `MARCA: ${titleize(brand)}`;


    let buttonCard = document.createElement("a");
    buttonCard.setAttribute("href", "#");
    buttonCard.classList.add("btn");
    buttonCard.classList.add("btn-outline-primary");
    buttonCard.classList.add("float-left");
    buttonCard.addEventListener('click', function (e) {
        elementPreventDefault(buttonCard);
        shoppingItem(dataShoppingItem, title, price)
    });
    buttonCard.textContent = "Adicionar ao Carinho";

    cardBody.appendChild(titleCard);
    title.length <= 28 ? cardBody.appendChild(breakline) : null;
    cardBody.appendChild(priceCard);
    cardBody.appendChild(installmentPriceCard);
    cardBody.appendChild(brandCard);
    cardBody.appendChild(buttonCard);
    div.appendChild(cardBody);
    container.appendChild(div);

    return container;
}

function renderingElements(data) {
    data.forEach((element) => {
        contentBox("rendering", element.image, element.title, element.price, element.brand);
    });
}

function contentBox(id, image, title, price, brand) {
    let element = creatingCard(image, title, price, brand);
    document.getElementById(id).appendChild(element);
}

function loadding() {
    document.getElementById('body').classList.remove('body-opacity-no-data');
    document.getElementById("loader").style.display = "none";
    document.getElementById("content-box").style.display = "block";
}

function positioningContentBox(windowWidth) {
    let contentBox = document.getElementById('content-box');
    contentBox.style.margin = `${valuesPositionContentBox(windowWidth)} 0`;
}

function positioningNavbar(windowWidth) {
    if (window.pageYOffset === 0) {
        let navBar = document.getElementById('navBar');
        navBar.style.top = `${valuesPositionNavBar(windowWidth)}`;

    }
}

function resetContentElement(id) {
    document.getElementById(id).innerHTML = "";
}

function toggleElement(windowHeight, element, value, forward, navBar, elementNavBar, elementContentBox, windowWidth) {
    if (forward) {
        if (windowHeight >= value) {
            element.classList.add('visibility');
            element.classList.remove('hidden');
        } else if (windowHeight < value) {
            element.classList.add('hidden');
            element.classList.remove('visibility');
        }
    } else if (navBar) {
        if (windowHeight <= value) {
            element.classList.add('visibility');
            elementNavBar.style.top = `${valuesPositionNavBar(windowWidth)}`;
            elementContentBox.style.margin = `${valuesPositionContentBox(windowWidth)} 0`;
            element.classList.remove('hidden');
        } else if (windowHeight > value) {
            element.classList.add('hidden');
            elementNavBar.style.top = '4%';
            elementContentBox.style.margin = '14% 0';
            element.classList.remove('visibility');
        }
    }
}

function shoppingItem(vector, title, price) {
    let cartAmunt = document.getElementById('cart-amunt');
    let productCount = document.getElementById('product-count');
    let shoppingItem = document.getElementById('shopping-item');

    shoppingItem.style.width = "157px";

    vector[0].push(title);
    vector[1].push(price);
    vector[2] = vector[1].reduce((ac, vl) => ac + vl);

    productCount.textContent = vector[1].length;
    cartAmunt.textContent = currencyFormat(vector[2]);
}

function insertClassTab(element, element2, sense) {
    if (sense === 'forward') {
        element.addEventListener('mouseover', function () {
            element.classList.add('tab');
            element2.classList.add('tab-ul');
            element.addEventListener('mouseout', function () {
                element.classList.remove('tab');
                element2.classList.remove('tab-ul');
            });
        });
    } else if (sense === 'reverse') {
        element.addEventListener('mouseover', function () {
            element2.classList.add('tab');
            element.classList.add('tab-ul');
            element.addEventListener('mouseout', function () {
                element2.classList.remove('tab');
                element.classList.remove('tab-ul');
            });
        });
    }

}

function elementInsertTab(vectorElements) {
    vectorElements.forEach((element, idx, arr) => {
        arr[idx].forEach((element, idx, arr) => {
            (arr[idx + 1]) ? insertClassTab(element, arr[idx + 1], 'forward') : null;
            (arr[idx - 1]) ? insertClassTab(element, arr[idx - 1], 'reverse') : null;

        });
    });
}


//Funções de Cálculos
function valuesPositionNavBar(windowWidth) {
    let calc = (20 * Math.pow(10, -3) * windowWidth) + 3;
    return `${calc > 41 ? 40.5 : calc}%`;
}

function valuesPositionContentBox(windowWidth) {
    let valueContentBox = 20;
    return `${valueContentBox + (-14.73 * Math.log(windowWidth) + 115.48)}%`;
}

function resizingWidthFlexBox(windowWidth) {
    let main = document.getElementById('content-box');
    main.classList.remove('content-width');

    if (windowWidth >= 1442) main.style.width = "89.5rem";
    else if (windowWidth < 1442 && windowWidth > 1160) main.style.width = "71.5rem";
    else if (windowWidth < 1160 && windowWidth > 874) main.style.width = "53.9rem";
    else if (windowWidth < 874 && windowWidth > 589) main.style.width = "35.9rem";
    else if (windowWidth < 589) main.style.width = "18rem";

}

function valuesPositionError(windowWidth) {
    let calc = (-67.9 * Math.log(windowWidth) + 537.87);

    calc = windowWidth > 1061 ? 65 : calc;
    calc = windowWidth < 850 ? 80 : calc;
    return `${calc}%`;

}

//Função Busca dados na API
async function searchingData() {
    setTimeout(loadding, 800);
    let data = [];
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url_origin = "http://challenge-api.luizalabs.com/api/product/?page=1";
    const url = proxy + url_origin;

    let response = await fetch(url);

    await response.json().then(response => {
        data.push(response.products);
    });
    return data[0];
}

//Funções Relacionadas a responsividade
function scrollPosition(windowHeight) {
    let back = document.getElementById('back-top');
    let banner = document.getElementById('banner');
    let navBar = document.getElementById('navBar');
    let contentBox = document.getElementById('content-box');

    let windowWidth = window.innerWidth;
    toggleElement(windowHeight, back, 500, true);
    toggleElement(windowHeight, banner, 0, false, true, navBar, contentBox, windowWidth);
}

function windowHeightResponsive() {
    window.addEventListener('scroll', function () {
        let windowHeight = window.pageYOffset;
        scrollPosition(windowHeight);
    })
}

function windowWidthResponsive() {
    window.addEventListener('resize', function () {
        let windowWidth = window.innerWidth;
        resizingWidthFlexBox(windowWidth);
        positioningNavbar(windowWidth);
        positioningContentBox(windowWidth);

        (windowWidth < 992) ? document.getElementById('dropdown-container').style.marginLeft = '3%'
            : document.getElementById('dropdown-container').style.marginLeft = '0%'
    })
}


function insertTab() {
    let categories = document.getElementById('categories');
    let dropdownMenuCategories = document.getElementById('dropdown-menu-categories');
    let filter = document.getElementById('filter');
    let dropdownMenuFilter = document.getElementById('dropdown-menu-filter');

    let allElements = [[categories, dropdownMenuCategories], [filter, dropdownMenuFilter]];
    elementInsertTab(allElements);
}


function elementResponsiveness() {
    let windowWidth = window.innerWidth;

    resizingWidthFlexBox(windowWidth);
    positioningNavbar(windowWidth);
    positioningContentBox(windowWidth);

    windowWidthResponsive();
    windowHeightResponsive();
    insertTab();
}

function errorOccurred() {
    let erro = document.getElementById('erro');
    let banner = document.getElementById('banner');
    let navBar = document.getElementById('navBar');

    banner.classList.add('hidden');
    navBar.style.top = '4%';
    banner.style.display = 'none';
    erro.style.display = 'block';

    window.addEventListener('resize', function () {
        let windowWidth = window.innerWidth;
        erro.style.paddingBottom = valuesPositionError(windowWidth);
        erro.style.marginRight = windowWidth > 600 ? '28%' : 0;
    });

    console.log("Ocorreu um erro!!!");
    console.log(err);
}

//Funções Principais

//Função Inicial
async function initPage() {
    try {
        renderingElements(await searchingData());
        elementResponsiveness();

    } catch (err) {
        insertTab();
        errorOccurred()
    }
}

//Função Filtro
async function filter(content) {
    let data = await searchingData();

    ordination(data, content);
    resetContentElement('rendering');
    renderingElements(data);
}