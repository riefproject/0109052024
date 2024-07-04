function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}

function countdownTimer(serverTime, endDate) {
    const now = new Date().getTime();
    const timeLeft = endDate - (serverTime + (now - clientStartTime));

    if (timeLeft <= 0) {
        clearInterval(timer);
        window.location.href = "src/html/main.html";
    } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = formatNumber(days);
        document.getElementById("hours").innerHTML = formatNumber(hours);
        document.getElementById("minutes").innerHTML = formatNumber(minutes);
        document.getElementById("seconds").innerHTML = formatNumber(seconds);

        // Update serverTime for the next interval
        serverTime += 1000;
    }
}

function startCountdown() {
    fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta')
        .then(response => response.json())
        .then(data => {
            const serverTime = new Date(data.datetime).getTime();
            const endDate = new Date("Sep 1, 2024 00:00:00 GMT+0700").getTime();
            clientStartTime = new Date().getTime();
            console.log('Server time:', serverTime);
            console.log('End date:', endDate);
            countdownTimer(serverTime, endDate);
            setInterval(() => countdownTimer(serverTime, endDate), 1000);
        })
        .catch(error => console.error('Error fetching server time:', error));
}

let clientStartTime;
startCountdown();


// function countdownTimer() {
//     const endDate = new Date("Sep 1, 2024 00:00:00").getTime();
//     const now = new Date().getTime();
//     const timeLeft = endDate - now;

//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//     if (timeLeft <= 0) {
//         clearInterval(timer);
//         window.location.href = "src/html/main.html";
//     } else {
//         document.getElementById("days").innerHTML = days;
//         document.getElementById("hours").innerHTML = hours;
//         document.getElementById("minutes").innerHTML = minutes;
//         document.getElementById("seconds").innerHTML = seconds;
//     }
// }

// const timer = setInterval(countdownTimer, 1000);