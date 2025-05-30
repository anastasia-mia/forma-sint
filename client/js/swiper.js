import {openProductModal} from "./modal.js";

const sliderWrapper = document.querySelector(".swiper-wrapper");

const swiper = new Swiper(".swiper", {
    direction: 'horizontal',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    spaceBetween: 20,
    breakpoints: {
        320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0
        },
        567: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 15
        },
        1280: {
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 20
        }
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    on: {
        init: async function () {
            try {
                const response = await fetch("https://brandstestowy.smallhost.pl/api/random")
                const data = (await response.json()).data;

                const template = document.getElementById('slide-template');

                const fragment = document.createDocumentFragment();

                data.forEach((item) => {
                    const clone = template.content.cloneNode(true);
                    const slide = clone.querySelector('.swiper-slide');

                    const randomLabel = getRandomLabel();
                    const labelElement = slide.querySelector('.slide-label');

                    if (randomLabel.label) {
                        labelElement.textContent = randomLabel.label;
                        labelElement.classList.add(randomLabel.class);
                    } else {
                        labelElement.remove();
                    }

                    slide.querySelector('img').src = item.image;
                    slide.querySelector('.product-title').textContent = item.text;
                    slide.dataset.id = item.id;

                    fragment.appendChild(slide);
                });

                sliderWrapper.appendChild(fragment);
                swiper.update();
                toggleNavButtons(this);
                addHeartToggleListener();
            } catch (error) {
                console.log("Error getting data", error);
            }
        },
        slideChange: function () {
            toggleNavButtons(this);
        }
    },
});

const getRandomLabel = () => {
    const labels = ['Limited', 'Bestseller', ''];
    const randomIndex = Math.floor(Math.random() * labels.length);
    return { label: labels[randomIndex], class: `label-${randomIndex}` };
}

function toggleNavButtons(swiper) {
    document.querySelector('.swiper-button-prev')
        .classList.toggle('hidden', swiper.isBeginning);
    document.querySelector('.swiper-button-next')
        .classList.toggle('hidden', swiper.isEnd);
}

function addHeartToggleListener(){
    sliderWrapper.addEventListener("click", (event) => {
        event.stopPropagation();
        const svgHeart = event.target.closest('svg');
        if (!svgHeart) return;

        const use = svgHeart.querySelector('use');
        if (!use || !use.getAttribute('href')?.includes('heart')) return;

        const isFilled = svgHeart.classList.toggle('filled');
        const newHref = isFilled ? 'assets/sprite.svg#heart-filled' : 'assets/sprite.svg#heart';
        use.setAttribute('href', newHref);
    })
}

sliderWrapper.addEventListener('click', (e) => {
    const svgHeart = e.target.closest('svg');
    if (svgHeart?.querySelector('use')?.getAttribute('href')?.includes('heart')) return;

    const productCard = e.target.closest('.product-card');
    const slide = e.target.closest('.swiper-slide');
    if (!productCard) return;

    const img = productCard.querySelector('img');
    const id = slide.dataset.id || '???';

    if (img && id) {
        openProductModal(img.src, id);
    }
});