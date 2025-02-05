let score = 0;              // Начальные очки
let clickPower = 1;          // Начальная сила клика (1 очко за клик)

// Функция для обновления счёта на экране
function updateScore() {
    document.getElementById('score').innerText = `Очки: ${score}`;
}

// Основная кнопка (котик)
document.getElementById('click-button').addEventListener('click', () => {
    score += clickPower;     // Увеличиваем очки на значение clickPower
    updateScore();
    updateShop();            // Проверяем, можно ли купить улучшения
});

// Обработчик покупок
document.querySelectorAll('.upgrade').forEach(button => {
    button.addEventListener('click', () => {
        const cost = parseInt(button.getAttribute('data-cost'));   // Цена улучшения
        const power = parseInt(button.getAttribute('data-power')); // Прибавка к силе клика

        if (score >= cost) {        // Если хватает очков для покупки
            score -= cost;          // Списываем стоимость
            clickPower += power;    // Увеличиваем силу клика
            updateScore();          // Обновляем счёт
            updateShop();           // Проверяем доступность кнопок
        }
    });
});

// Функция для проверки доступности кнопок в магазине
function updateShop() {
    document.querySelectorAll('.upgrade').forEach(button => {
        const cost = parseInt(button.getAttribute('data-cost'));
        button.disabled = score < cost;  // Блокируем кнопку, если не хватает очков
    });
}

// Инициализация интерфейса
updateScore();
updateShop();
