const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-image');
const modalId = document.querySelector('.modal-product-id');
const modalClose = document.querySelector('.modal-close');

export const openProductModal = (image, id) => {
    modalImage.src = image;
    modalId.textContent = `ID: ${id}`;
    modal.style.display = 'flex';
}

export function closeProductModal() {
    modal.style.display = 'none';
}

modalClose.addEventListener('click', closeProductModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
});

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-background')) {
        closeProductModal();
    }
});