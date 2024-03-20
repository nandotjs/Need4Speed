
var resultDisplayed = false;
var cars = document.querySelectorAll('.car');
var bets = {};

function startRace() {
    bet()

    cars.forEach(function(car) {
        var randomDuration = Math.floor(Math.random() * 9) + 5;
        car.style.transitionDuration = randomDuration + 's';
        car.style.left = 'calc(100% - 50px)';
    });

    resultDisplayed = false;

    cars.forEach(function(car) {
        car.addEventListener('transitionend', function() {
            if (!resultDisplayed) {
                var winner = this.id.replace('car', '');
                document.getElementById('result').innerText = "O carro " + winner + " ganhou!";
                document.getElementById('result').style.display = 'block';
                resultDisplayed = true;
                
                checkWinner(winner);
            }
        });
    });
}

function restartRace() {
    cars.forEach(function(car) {
        car.style.transitionDuration = '0s';
        car.style.left = '0';
    });

    document.getElementById('result').style.display = 'none';
    resultDisplayed = false;
}

function bet() {
    var betAmount
    var selectedCar

    do {
        betAmount = prompt("Quanto você quer apostar? (Saldo disponível: $" + document.getElementById('balance').innerText + ")");
        betAmount = parseFloat(betAmount); 
    } while (isNaN(betAmount) || betAmount <= 0 || betAmount > parseFloat(document.getElementById('balance').innerText));

    var currentBalance = parseFloat(document.getElementById('balance').innerText);
    currentBalance -= betAmount;
    document.getElementById('balance').innerText = currentBalance.toFixed(2);

    do {
        selectedCar = prompt("Em qual carro você quer apostar? (Digite o número do carro)");
    } while (isNaN(selectedCar) || selectedCar < 1 || selectedCar > 3);

    bets[selectedCar] = betAmount;
}

function checkWinner(winner) {
    var currentBet = bets[winner];

    if (currentBet !== undefined) {
        var currentBalance = parseFloat(document.getElementById('balance').innerText);
        currentBalance += currentBet * 2; 
        document.getElementById('balance').innerText = currentBalance.toFixed(2);
    }
}