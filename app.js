let clicks = 0;
let clickPower = 1;


const counter = document.getElementById('counter');
const clickButton = document.getElementById('click-button');
const shopButton = document.getElementById('shop-button');
const shop = document.getElementById('shop');

const upgrades = [
    { name: "+1 клик", cost: 10, bonus: 1 },
    { name: "+5 кликов", cost: 50, bonus: 5 },
    { name: "+10 кликов", cost: 100, bonus: 10 },
    { name: "Автокликер", cost: 200, auto: 1 },
    { name: "Ускорение", cost: 500, bonus: 20 },
    { name: "Бонус 2x", cost: 1000, multiplier: 2 },
    { name: "Бонус 5x", cost: 3000, multiplier: 5 },
    { name: "Супер Автокликер", cost: 5000, auto: 5 },
    { name: "Бонус 10x", cost: 10000, multiplier: 10 },
    { name: "Гиперклик", cost: 20000, bonus: 100 }
];

clickButton.addEventListener('click', () => {
    clicks += clickPower;
    updateCounter();
});

shopButton.addEventListener('click', () => {
    shop.style.display = shop.style.display === 'block' ? 'none' : 'block';
});

function updateCounter() {
    counter.textContent = `Клики: ${clicks}`;
}

function buyUpgrade(index) {
    const upgrade = upgrades[index];
    if (clicks >= upgrade.cost) {
        clicks -= upgrade.cost;
        if (upgrade.bonus) clickPower += upgrade.bonus;
        if (upgrade.multiplier) clickPower *= upgrade.multiplier;
        if (upgrade.auto) setInterval(() => {
            clicks += upgrade.auto;
            updateCounter();
        }, 1000);
        updateCounter();
        renderShop();
    }
}

function renderShop() {
    shop.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
        const upgradeEl = document.createElement('div');
        upgradeEl.className = 'upgrade';
        upgradeEl.textContent = `${upgrade.name} - ${upgrade.cost} кликов`;
        upgradeEl.onclick = () => buyUpgrade(index);
        shop.appendChild(upgradeEl);
    });
}

renderShop();

updateScore();
updateShop();
