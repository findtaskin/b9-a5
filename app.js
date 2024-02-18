const selectedSeats = [];

function selectSeat(seatNumber) {
  if (selectedSeats.includes(seatNumber)) {
    removeSeat(seatNumber);
  } else {
    addSeat(seatNumber);
  }
  updateTicketTable();
  updateSeatCount();
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

function updateSeatCount() {
  const element = document.getElementById("seat-count");
  element.innerHTML = selectedSeats.length;
}

function updateTicketTable() {
  const element = document.getElementById("selected-ticket-rows");
  let htmlRowText = "";
  selectedSeats.forEach((seatNumber) => {
    htmlRowText += getTicketRow(seatNumber);
  });
  element.innerHTML = htmlRowText;
}

function getTicketRow(seatNumber) {
  const htmlSection = `
  <div class="flex justify-between border-b-2 border-dashed py-2">
      <div>${seatNumber}</div>
      <div>Economy</div>
      <div>550</div>
  </div>
`;
  return htmlSection;
}
