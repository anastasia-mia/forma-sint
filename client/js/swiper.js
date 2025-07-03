import {openProductModal} from "./modal.js";
import {getRandomLabel} from "../utils/getRandomLabel.js";

export class Slider{
    constructor({container, endpoint, templateId}) {
        this.container = document.querySelector(container);
        this.sliderWrapper = this.container.querySelector('.swiper-wrapper');
        this.endpoint = endpoint;
        this.template = document.getElementById(templateId);
        this.likes = JSON.parse(localStorage.getItem('likes')) || [];
        this.swiper = null;

        this.init();
    }

    async init(){
        this.showSkeleton();
        await this.loadData();
        this.removeSkeleton();
        this.initSwiper();
        this.setupSliderListener();
        this.setupResizeThrottle();
    }

    showSkeleton(count = 4){
        const skeleton = document.createElement('div');
        skeleton.className = 'swiper-slide skeleton';
        skeleton.innerHTML = `
                <div class="skeleton-img"></div>
                <div class="skeleton-line"></div>
         `;

        for(let i = 0; i < count; i++){
            this.sliderWrapper.appendChild(skeleton.cloneNode(true));
        }
    }

    removeSkeleton() {
        this.sliderWrapper.querySelectorAll('.skeleton').forEach(el => el.remove());
    }

    async loadData(){
        try{
            const response = await fetch(this.endpoint)
            const data = (await response.json()).data;

            const fragment = document.createDocumentFragment();
            data.forEach(item => {
                const slide = this.renderSlide(item);
                fragment.appendChild(slide);
            })

            this.sliderWrapper.appendChild(fragment);
        }catch(error){
            console.log("Error loading data");
        }
    }

    renderSlide(item){
        const clone = this.template.content.cloneNode(true);
        const slide = clone.querySelector('.swiper-slide');

        const randomLabel = getRandomLabel();
        const labelElement = slide.querySelector('.slide-label');

        if(randomLabel){
            labelElement.textContent = randomLabel.label;
            labelElement.classList.add(randomLabel.class);
        }else{
            labelElement.remove();
        }

        slide.querySelector('img').src = item.image;
        slide.querySelector('.product-title').textContent = item.text;
        slide.dataset.id = item.id;

        if (this.likes.includes(String(item.id))) {
            const svgHeart = slide.querySelector('svg');
            const use = svgHeart.querySelector('use');
            svgHeart.classList.add('filled');
            use.setAttribute('href', 'assets/sprite.svg#heart-filled');
        }

        return slide;
    }

    initSwiper(){
        this.swiper = new Swiper(this.container, {
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
                init: () => {
                    this.toggleNavButtons();
                },
                slideChange: () => {
                    this.toggleNavButtons();
                }
            },
        })
        this.swiper.update();
    }

    toggleNavButtons() {
        if(!this.swiper) return;

        this.container.querySelector('.swiper-button-prev')
            .classList.toggle('hidden', this.swiper.isBeginning);
        this.container.querySelector('.swiper-button-next')
            .classList.toggle('hidden', this.swiper.isEnd);
    }

    setupSliderListener() {
        this.sliderWrapper.addEventListener("click", (e) => {
            const svgHeart = e.target.closest('svg');

            if(svgHeart){
                const use = svgHeart.querySelector('use');
                if (!use || !use.getAttribute('href')?.includes('heart')) return;

                const slide = e.target.closest('.swiper-slide');
                const id = slide.dataset.id;

                const isFilled = svgHeart.classList.toggle('filled');
                const newHref = isFilled ? 'assets/sprite.svg#heart-filled' : 'assets/sprite.svg#heart';
                use.setAttribute('href', newHref);

                if (!isFilled) {
                    this.likes = this.likes.filter(likeId => likeId !== id);
                } else {
                    this.likes.push(id);
                }
                localStorage.setItem('likes', JSON.stringify(this.likes));

                return;
            }

            const productCard = e.target.closest('.product-card');
            const slide = e.target.closest('.swiper-slide');
            if (!productCard || !slide) return;

            const img = productCard.querySelector('img');
            const id = slide.dataset.id;
            if (img && id) {
                openProductModal(img.src, id);
            }
        });
    }
}