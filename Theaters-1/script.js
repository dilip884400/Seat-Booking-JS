const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const ticketSelect = document.getElementById('ticket');
const bookButton = document.querySelector('.book-tickets');
const numTicketsSelect = document.getElementById('num-tickets');

const premiumSeats = document.querySelectorAll('.premium .seat');
const standardSeats = document.querySelectorAll('.standard .seat');

let ticketPrice = +ticketSelect.value;
let selectedSeatsCount = 0;

populateUI();
updateSelectedCount();

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex1', movieIndex);
    localStorage.setItem('selectedMoviePrice1', moviePrice);
}

function updateSelectedCount() {
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

bookButton.addEventListener('click', () => {
    if (selectedSeatsCount === numTicketsSelect.value) {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');

        selectedSeats.forEach((seat) => {
            seat.classList.remove('selected');
            seat.classList.add('occupied');
            seat.style.pointerEvents = 'none';
        });

        const storedSeatsIndexes = JSON.parse(localStorage.getItem('selectedSeatsIndexes')) || [];

        const selectedSeatsIndexes = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
        const updatedSeatsIndexes = [...storedSeatsIndexes, ...selectedSeatsIndexes];
        localStorage.setItem('selectedSeatsIndexes', JSON.stringify(updatedSeatsIndexes));

        selectedSeatsCount = 0; 
        updateSelectedCount();
    } else {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');

        selectedSeats.forEach((seat) => {
            seat.classList.remove('selected');
            seat.classList.add('occupied');
            seat.style.pointerEvents = 'none';
        });

        const storedSeatsIndexes = JSON.parse(localStorage.getItem('selectedSeatsIndexes')) || [];

        const selectedSeatsIndexes = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
        const updatedSeatsIndexes = [...storedSeatsIndexes, ...selectedSeatsIndexes];
        localStorage.setItem('selectedSeatsIndexes', JSON.stringify(updatedSeatsIndexes));

        selectedSeatsCount = 0; 
        updateSelectedCount();
    }
});

function populateUI() {
    const selectedSeatsIndexes = JSON.parse(localStorage.getItem('selectedSeatsIndexes'));

    if (selectedSeatsIndexes !== null) {
        selectedSeatsIndexes.forEach((seatIndex) => {
            seats[seatIndex].classList.add('occupied');
            seats[seatIndex].style.pointerEvents = 'none';
        });
    }
    const selectedMovieIndex1 = localStorage.getItem('selectedMovieIndex1');

    if (selectedMovieIndex1 !== null) {
        ticketSelect.selectedIndex = selectedMovieIndex1;
        ticketPrice = +ticketSelect.value;
    }

    if (ticketSelect.selectedIndex === 0) {
        disableSeats(premiumSeats);
        enableSeats(standardSeats);
    } else if (ticketSelect.selectedIndex === 1) {
        disableSeats(standardSeats);
        enableSeats(premiumSeats);
    }
}

ticketSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();

    if (e.target.selectedIndex === 0) {
        disableSeats(premiumSeats);
        enableSeats(standardSeats);
    } else if (e.target.selectedIndex === 1) {
        disableSeats(standardSeats);
        enableSeats(premiumSeats);
    }
});

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        if (selectedSeatsCount < numTicketsSelect.value) {
            e.target.classList.toggle('selected');
            selectedSeatsCount += e.target.classList.contains('selected') ? 1 : -1;
            updateSelectedCount();
        }
    }
});

numTicketsSelect.addEventListener('change', (e) => {
    // Update the selected seats count when the number of tickets select changes
    selectedSeatsCount = 0;
    updateSelectedCount();
});

function disableSeats(seatList) {
    seatList.forEach((seat) => {
        seat.style.pointerEvents = 'none';
    });
}

function enableSeats(seatList) {
    seatList.forEach((seat) => {
        seat.style.pointerEvents = 'auto';
    });
}
