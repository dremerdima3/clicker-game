let clicks = 0;

const counter = document.getElementById('counter');
const clickButton = document.getElementById('click-button');

clickButton.addEventListener('click', () => {
    clicks++;
    counter.textContent = `Клики: ${clicks}`;
});
