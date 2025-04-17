import {openProductModal} from "./modal.js";

let pageNumber = 1;
let pageSize = 14;
let loading = false;
let bannerInserted = false;

const select = document.getElementById('page-select');
const catalogBody = document.querySelector('.catalog-body');
const loader = document.querySelector('.loader');
const template = document.getElementById('product-template');
const catalogBottom = document.querySelector('.catalog-bottom')


select.addEventListener('change', (event) => {
    pageSize = event.target.value;
    pageNumber = 1;
    catalogBody.innerHTML = '';
    bannerInserted = false;
    loadProducts();
});

function loadProducts() {
    if (loading) return;
    loading = true;
    loader.style.display = 'block';
    loader.textContent = "Loading products..."

    fetch(`https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then(res => res.json())
        .then(res => res.data)
        .then(data => {
            const fragment = document.createDocumentFragment();

            const banner = document.createElement('div');
            banner.classList.add('catalog-banner');
            banner.innerHTML = `<img src="assets/BANNER.png" alt="banner"/>`

            data.forEach((item, index) => {
                const clone = template.content.cloneNode(true);
                clone.querySelector('.product-id').textContent = `ID: ${item.id}`;
                clone.querySelector('img').src = item.image;

                if(!bannerInserted && index === 5){
                    fragment.appendChild(banner);
                    bannerInserted = true;
                }

                fragment.appendChild(clone);
            });
            catalogBody.appendChild(fragment);
            loader.style.display = 'none';
            pageNumber++;
            loading = false;
        })
        .catch(err => {
            console.log('Error getting products', err);
            loader.textContent = 'Error getting products';
            loading = false;
        })
}

const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting && !loading){
        loadProducts();
    }
})

observer.observe(catalogBottom);

catalogBody.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    if (!productCard) return;

    const img = productCard.querySelector('img');
    const id = productCard.querySelector('.product-id')?.textContent?.replace('ID: ', '') || '???';

    if (img && id) {
        openProductModal(img.src, id);
    }
});

loadProducts()