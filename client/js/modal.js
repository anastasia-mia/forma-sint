const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-image');
const modalId = document.querySelector('.modal-product-id');
const modalClose = document.querySelector('.modal-close');
const modalImageLens = document.querySelector('.modal-image-lens');

export const openProductModal = (image, id) => {
    modalImage.src = image;
    modalId.textContent = `ID: ${id}`;
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
}

export function closeProductModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

modalImage.addEventListener('dragstart', (e) => e.preventDefault());

modalClose.addEventListener('click', closeProductModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
});

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-background')) {
        closeProductModal();
    }
});

modalImage.addEventListener('mousedown', (e) => {
    function moveLens(e){
        const imageRect = modalImage.getBoundingClientRect();
        let x = e.pageX - imageRect.left - window.scrollX;
        let y = e.pageY - imageRect.top - window.scrollY;

        x = Math.max(0, Math.min(x, modalImage.width));
        y = Math.max(0, Math.min(y, modalImage.height));

        document.body.classList.add('lens-active');

        modalImageLens.style.display = 'block';
        modalImageLens.style.left = (x + modalImageLens.offsetWidth / 2)  + 'px';
        modalImageLens.style.top = (y - modalImageLens.offsetHeight / 2) + 'px';
        modalImageLens.style.backgroundImage = `url('${modalImage.src}')`;
        modalImageLens.style.backgroundSize = (modalImage.width * 2) + 'px ' + (modalImage.height * 2) + 'px';
        modalImageLens.style.backgroundPosition = `-${x * 2 - modalImageLens.offsetWidth / 2}px -${y * 2 - modalImageLens.offsetHeight / 2}px`;
    }

    window.addEventListener('mousemove', moveLens);
    window.addEventListener('mouseup', () => {
        modalImageLens.style.display = 'none';
        document.body.classList.remove('lens-active');
        window.removeEventListener('mousemove', moveLens);
    }, {once: true});
})