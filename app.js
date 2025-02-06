let score = 0;
let clickPower = 1;
let autoClickPower = 0;

// Обновление счёта
function updateScore() {
    document.getElementById('score').innerText = `Очки: ${score}`;
}

// Клик по большой кнопке
document.getElementById('click-button').addEventListener('click', () => {
    score += clickPower;
    updateScore();
    updateShop();
});

// Автоклик каждую секунду
setInterval(() => {
    score += autoClickPower;
    updateScore();
    updateShop();
}, 1000);

// Покупки в магазине
document.querySelectorAll('.upgrade').forEach(button => {
    button.addEventListener('click', () => {
        const cost = parseInt(button.getAttribute('data-cost'));
        const power = parseInt(button.getAttribute('data-power')) || 0;
        const click = parseInt(button.getAttribute('data-click')) || 0;

        if (score >= cost) {
            score -= cost;
            autoClickPower += power;
            clickPower += click;
            button.disabled = true; // Улучшение можно купить только один раз
            updateScore();
            updateShop();
        }
    });
});

// Проверка доступности покупок
function updateShop() {
    document.querySelectorAll('.upgrade').forEach(button => {
        const cost = parseInt(button.getAttribute('data-cost'));
        button.disabled = score < cost || button.disabled;
    });
}

// ====== Работа с магазином ======
const shopModal = document.getElementById('shop-modal');
const openShopButton = document.getElementById('open-shop');
const closeButton = document.querySelector('.close-button');

// Открытие магазина
openShopButton.addEventListener('click', () => {
    shopModal.style.display = 'flex';
});

// Закрытие магазина
closeButton.addEventListener('click', () => {
    shopModal.style.display = 'none';
});

// Закрытие по клику вне окна
window.addEventListener('click', (event) => {
    if (event.target === shopModal) {
        shopModal.style.display = 'none';
    }
});

// Инициализация
updateScore();
updateShop();
