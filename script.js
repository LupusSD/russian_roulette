// 1. При нажатии на кнопку "Начать"
//  *  1.1 Сделать кнопку не активной
//  *  1.2 Вставить патрон в барабан
//  *  1.3 Начать крутить барабан
//  *  1.4 Скрыть пулю
//  *  1.5 Записать случайное число от 1 до 6, это число отвечает за место пули в барабане
//  *  1.6 Отобразить револьвер
//  *  1.7 Изменить текст кнопки на "Сделать выстрел"
//  *  1.8 Сделать кнопку активной
// 2. При нажатии на кнопку "Сделать выстрел"
//  *  2.1 Проверяется число выстрела
//  *  2.2 Если пуля совпадает числу пули в барабане, то персонаж убит
//  *  2.3 Иначе револьвер переворачивается и далее повторяестя п.2
//  *  2.4 При успешном выстреле залить соответствующую иконку красной жидкостью
//  *  2.5 Прокрутить барабан
// 3. При завершении игры
//  *  3.1 Изменить текст кнопки на "Рестарт"
//  *  3.2 При нажатии на эту кнопку перезагрузить страницу


// Задаем переменные
var countShot = 0;
var bulletPosition = random(1, 6);
var btnShot = document.querySelector("#shot");
var currentPlayer = 1;
var baraban = document.querySelector("#baraban");



// Первый клик по кнопке "начать"
btnShot.onclick = start;

function start() {
    // Делаем кнопку неактивной
    btnShot.className = "off";
    // Отображаем пулю
    var bullet = document.querySelector("#bullet");
    bullet.style.display = "block";
    // Отображаем револьвер
    var revolver = document.querySelector("#revolver");
    revolver.style.display = "block";
    // Делаем кнопку некликабельной
    btnShot.onclick = "";
    // Вращение барабана
    var rotate = 0;
    var timer = setInterval(function () {
        rotate = rotate + 10;
        baraban.style.transform = "rotate(" + rotate + "deg)";
        if (rotate > 300) {
            bullet.style.display = "none";
        }
        // Остановка барабана
        if (rotate == 720) {
            clearInterval(timer);
            // Кнопка меняется на "Сделать выстрел"
            btnShot.innerText = "Сделать выстрел";
            // Принажатии функция "выстрел"
            btnShot.onclick = shot;
            // Кнопка активна
            btnShot.className = "";
        }
    }, 50)
}
// Для получения случайного числа положения пули
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
//Функция "выстрел"
var rotateBaraban = 0;
function shot() {
    countShot = countShot + 1;
    // Если игрок убит
    if (bulletPosition == countShot) {
        var blood = document.createElement("div");
        blood.id = "blood";
        var player = document.querySelector("#player" + currentPlayer);
        player.appendChild(blood)
        endGame();
    } else {
        // Иначе переход хода и поворот револьвера
        if (currentPlayer == 1) {
            rotationRight();
            currentPlayer = 2;
        } else {
            rotationLeft();
            currentPlayer = 1;
        }
        // Вращение барабана после выстрела
        var rotate = rotateBaraban;
        var timer = setInterval(function() {
            rotate = rotate + 10;
            baraban.style.transform = "rotate(" + rotate + "deg)";
            if(rotate == rotateBaraban + 60) {
                clearInterval(timer);
                rotateBaraban = rotate
            }
        }, 10)
    }
}

// Поворот револьвера вправо или влево
var revolver = document.querySelector("#revolver");
function rotationRight() {
    revolver.style.background = 'url("images/revolver-right.png") no-repeat';
}
function rotationLeft() {
    revolver.style.background = 'url("images/revolver-left.png") no-repeat';
}
// Окончание игры
function endGame() {
    // alert("Game over!!!")
    btnShot.innerText = "Рестарт";
    btnShot.onclick = restart;
}
// Перезагрузка страницы
function restart() {
    location.reload();
}
