export const getRandomLabel = () => {
    const labels = ['Limited', 'Bestseller', ''];
    const randomIndex = Math.floor(Math.random() * labels.length);
    return { label: labels[randomIndex], class: `label-${randomIndex}` };
}