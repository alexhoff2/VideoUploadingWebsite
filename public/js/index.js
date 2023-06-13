var url = "https://dummyjson.com/products";

async function fetchWithString() {
    try {
        var response = await fetch(url);
        var data = await response.json();
        var htmlString = data.products.reduce(function (prev, product) {
            return (
                prev +
                `<div class="product-card">
                    <img class="product-img" src="${product.thumbnail}" />
                    <div class="product-info">
                        <p class="product-title fade-out">${product.title}</p>
                        <p class="product-cost fade-out">${product.price}</p>
                    </div>
                </div>`
            );
        }, "");
        document.getElementById('product-list').innerHTML = htmlString;
        let cards = document.getElementsByClassName('product-card');
        productCount = cards.length;
        document.getElementById('product-count').innerHTML = `Products: ${productCount}`;
        [...cards].forEach(function (ele) {
            ele.addEventListener('click', function (ev) {
                let img = this.querySelector('.product-img');
                let title = this.querySelector('.product-title');
                let cost = this.querySelector('.product-cost');
                img.style.transition = "opacity .25s";
                title.style.transition = "opacity .25s";
                cost.style.transition = "opacity .25s";
                img.style.opacity = 0;
                title.style.opacity = 0;
                cost.style.opacity = 0;

                setTimeout(() => {
                    this.parentNode.removeChild(this);
                    productCount--;
                    document.getElementById('product-count').innerHTML = `Products: ${productCount}`;
                }, 1000);
            })
        })
    } catch (error) {
        console.log(error);
    }
}
fetchWithString();


