// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Инициализация
tg.expand(); // Развернуть приложение на весь экран
tg.MainButton.show();
tg.MainButton.setText("Закрыть");
tg.MainButton.onClick(() => tg.close());

// Получение данных пользователя
const user = tg.initDataUnsafe.user;
if (user) {
    console.log("Привет, " + user.first_name + "!");
}

let counter = 0;
let energy = 300;
let maxEnergy = 300;
let clickMultiplier = 1; // Множитель очков за клик
let energyCostMultiplier = 1; // Множитель затрат энергии
let restoreInterval = 1500; // Интервал восстановления энергии
let upgradeClickPrice = 50;
let upgradeEnergyPrice = 50;
let upgradeRestorePrice = 50;

const counterElement = document.getElementById('counter');
const clickButton = document.getElementById('clickButton');
const energyElement = document.getElementById('energy');
const energyValueElement = document.getElementById('energy-value');
const maxEnergyElement = document.getElementById('max-energy');

// Элементы магазина
const shopButton = document.getElementById('shopButton');
const shopModal = document.getElementById('shopModal');
const closeModal = document.querySelector('.close');
const upgradeClickButton = document.getElementById('upgradeClick');
const upgradeEnergyButton = document.getElementById('upgradeEnergy');
const upgradeRestoreButton = document.getElementById('upgradeRestore');
const upgradeClickPriceElement = document.getElementById('upgradeClickPrice');
const upgradeEnergyPriceElement = document.getElementById('upgradeEnergyPrice');
const upgradeRestorePriceElement = document.getElementById('upgradeRestorePrice');

// Функция для обновления шкалы энергии
function updateEnergy() {
    const energyPercent = (energy / maxEnergy) * 100;
    energyElement.style.width = `${energyPercent}%`;
    energyValueElement.textContent = energy;
    maxEnergyElement.textContent = maxEnergy;
}

// Функция для восстановления энергии
function restoreEnergy() {
    if (energy < maxEnergy) {
        energy++;
        updateEnergy();
    }
}

// Восстановление энергии с заданным интервалом
setInterval(restoreEnergy, restoreInterval);

// Обработчик клика
clickButton.addEventListener('click', () => {
    const energyCost = 1 * energyCostMultiplier;
    if (energy >= energyCost) {
        counter += 1 * clickMultiplier;
        counterElement.textContent = counter;
        energy -= energyCost;
        updateEnergy();

        if (energy === 0) {
            clickButton.disabled = true;
        }
    }
});

// Разблокировка кнопки, если энергия восстановилась
energyElement.addEventListener('transitionend', () => {
    if (energy > 0) {
        clickButton.disabled = false;
    }
});

// Открытие модального окна магазина
shopButton.addEventListener('click', () => {
    shopModal.style.display = 'flex';
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    shopModal.style.display = 'none';
});

// Покупка улучшения клика
upgradeClickButton.addEventListener('click', () => {
    if (counter >= upgradeClickPrice) {
        counter -= upgradeClickPrice;
        counterElement.textContent = counter;
        clickMultiplier *= 2;
        energyCostMultiplier *= 2;
        upgradeClickPrice += 50;
        upgradeClickPriceElement.textContent = upgradeClickPrice;
    }
});

// Покупка увеличения энергии
upgradeEnergyButton.addEventListener('click', () => {
    if (counter >= upgradeEnergyPrice) {
        counter -= upgradeEnergyPrice;
        counterElement.textContent = counter;
        maxEnergy += 60;
        upgradeEnergyPrice += 50;
        upgradeEnergyPriceElement.textContent = upgradeEnergyPrice;
        updateEnergy();
    }
});

// Покупка ускорения восстановления
upgradeRestoreButton.addEventListener('click', () => {
    if (counter >= upgradeRestorePrice) {
        counter -= upgradeRestorePrice;
        counterElement.textContent = counter;
        restoreInterval *= 0.9;
        clearInterval(restoreInterval);
        setInterval(restoreEnergy, restoreInterval);
        upgradeRestorePrice += 50;
        upgradeRestorePriceElement.textContent = upgradeRestorePrice;
    }
});

// Инициализация
updateEnergy();
