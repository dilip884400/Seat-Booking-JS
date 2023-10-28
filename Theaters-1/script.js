const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const ticketSelect = document.getElementById('ticket');
const bookButton = document.querySelector('.book-tickets');

const premiumSeats = document.querySelectorAll('.premium .seat');
const standardSeats = document.querySelectorAll('.standard .seat');

let ticketPrice = +ticketSelect.value;

populateUI();
updateSelectedCount();

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex1', movieIndex);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

bookButton.addEventListener('click', () => {
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

    updateSelectedCount();
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
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

bookButton.addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    selectedSeats.forEach((seat) => {
        seat.classList.remove('selected');
        seat.classList.add('occupied');
        seat.style.pointerEvents = 'none';
    });
    
    const selectedSeatsIndexes = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    const storedSeats = JSON.parse(localStorage.getItem('selectedSeats1')) || [];

    storedSeats.push(...selectedSeatsIndexes);

    localStorage.setItem('selectedSeats1', JSON.stringify(storedSeats));

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
