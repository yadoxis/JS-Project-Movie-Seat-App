
const container = document.querySelector('.container');
const notOccupiedSeats = document.querySelectorAll('.row .seat:not(.occupied)');
const allSeats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const film = document.getElementById('film');
const movieSelectBox = document.getElementById('movie');


 // current price
 let ticketPriceFromSelectBox = parseFloat(movieSelectBox.options[movieSelectBox.selectedIndex].value);
 let ticketPriceFromStorage = parseFloat(localStorage.getItem("selectedMoviePrice"));
 let currentTicketPrice = ticketPriceFromStorage ? ticketPriceFromStorage : ticketPriceFromSelectBox;
// current selectedMovieIndex
 let selectedMovieIndexFromSelectBox = movieSelectBox.selectedIndex;
 let selectedMovieIndexFromStorage = localStorage.getItem('selectedMovieIndex');
 let currentMovieIndex = selectedMovieIndexFromStorage ? selectedMovieIndexFromStorage : selectedMovieIndexFromSelectBox;
// Initialize functions
window.onload = () => {

 
  movieSelectBox.selectedIndex = currentMovieIndex;

  displayUI();

  updateMovieInfo(currentTicketPrice);  
}

// Movie select event
movieSelectBox.addEventListener('change', e => {
  let ticketPrice = e.target.value;
  let seatNumber = e.target.selectedIndex;
  updateMovieInfo(ticketPrice);
  setMovieDataToStorage(seatNumber, ticketPrice);
});

// Seat click event(capturing)
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateMovieInfo(currentTicketPrice);
  }
});

// Update total and count
const updateMovieInfo = (price) => {

  const selectedSeats = document.querySelectorAll('.row .seat.selected');


  console.log(Array.from(selectedSeats));
  const seatsIndexArray = [...selectedSeats].map(seat => [...allSeats].indexOf(seat));

  console.log(seatsIndexArray);

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndexArray));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * price;
  film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split("(")[0];
}


const setMovieDataToStorage = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Get data from localstorage and populate UI
const displayUI = () => {
  const selectedSeatsFromStorage = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length > 0) {
      allSeats.forEach((seat, index) => {
   
      if (selectedSeatsFromStorage.indexOf(index) > -1) {
        seat.classList.add('selected');
        // seat.classList.toggle('occupied');
      }
    });
  }
  
}


