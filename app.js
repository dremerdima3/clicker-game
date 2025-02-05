let score = 0; // Начальные очки

// Получаем элементы
const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('clickButton');

// Обработчик события нажатия на кнопку
clickButton.addEventListener('click', () => {
    score += 1; // Увеличиваем счет
    scoreDisplay.textContent = score; // Обновляем отображение счета
});
