let score = 0;

document.getElementById('click-button').addEventListener('click', () => {
    score++;
    document.getElementById('score').innerText = score;
});
