const selectedSeats = [];
async function selectSeat(seatNumber) {
  if (selectedSeats.includes(seatNumber)) {
    await removeSeat(seatNumber);
  } else {
    await addSeat(seatNumber);
  }

  console.log(selectedSeats);
}

function addSeat(seatNumber) {
  if (selectedSeats.length > 3) return;

  if (!selectedSeats.includes(seatNumber)) {
    selectedSeats.push(seatNumber);
    markUiAsSeatTaken(seatNumber);
  }
}

function removeSeat(seatNumber) {
  if (selectedSeats.includes(seatNumber)) {
    const index = selectedSeats.indexOf(seatNumber);
    selectedSeats.splice(index, 1);
    markUiAsSeatRemoved(seatNumber);
  }
}

function markUiAsSeatTaken(seatNumber) {
  const element = document.getElementById(seatNumber);
  element.classList.add("bg-green-500", "text-white", "font-semibold");
}

function markUiAsSeatRemoved(seatNumber) {
  const element = document.getElementById(seatNumber);
  element.classList.remove("bg-green-500", "text-white", "font-semibold");
}
