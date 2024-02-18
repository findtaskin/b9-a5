const selectedSeats = [];

function selectSeat(seatNumber) {
  if (selectedSeats.includes(seatNumber)) {
    removeSeat(seatNumber);
  } else {
    addSeat(seatNumber);
  }
  updateUiTicketTable();
  updateUiSeatCount();
  updateUiTotalPrice();
  updateUiGrandPrice();
}

function addSeat(seatNumber) {
  if (selectedSeats.length > 3) {
    alert("4 seats max");
    return;
  }

  if (!selectedSeats.includes(seatNumber)) {
    selectedSeats.push(seatNumber);
    updateUiSeatTaken(seatNumber);
  }
}

function removeSeat(seatNumber) {
  if (selectedSeats.includes(seatNumber)) {
    const index = selectedSeats.indexOf(seatNumber);
    selectedSeats.splice(index, 1);
    updateUiSeatRemoved(seatNumber);
  }
}

function updateUiSeatTaken(seatNumber) {
  const element = document.getElementById(seatNumber);
  element.classList.add("bg-green-500", "text-white", "font-semibold");
}

function updateUiSeatRemoved(seatNumber) {
  const element = document.getElementById(seatNumber);
  element.classList.remove("bg-green-500", "text-white", "font-semibold");
}

function updateUiSeatCount() {
  const element = document.getElementById("seat-count");
  element.innerHTML = selectedSeats.length;
}

function updateUiTicketTable() {
  const element = document.getElementById("selected-ticket-rows");
  let htmlRowText = "";
  selectedSeats.forEach((seatNumber) => {
    htmlRowText += getTicketRowHtml(seatNumber);
  });
  if (htmlRowText.length == 0) htmlRowText = "No Tickets Selected";
  element.innerHTML = htmlRowText;
}

function getTicketRowHtml(seatNumber) {
  const htmlSection = `
  <div class="flex justify-between border-b-0 border-dashed py-2">
      <div>${seatNumber}</div>
      <div>Economy</div>
      <div>550</div>
  </div>
`;
  return htmlSection;
}

function updateUiTotalPrice() {
  const element = document.getElementById("total-price");
  element.innerHTML = selectedSeats.length * 550;
}

function updateUiGrandPrice(couponPercentage = 0) {
  const element = document.getElementById("grand-price");
  let totalPrice = selectedSeats.length * 550;
  console.log(totalPrice);
  let discount = totalPrice * couponPercentage;
  console.log(discount);
  element.innerHTML = totalPrice - discount;
}

function applyCoupon() {
  let couponElement = document.getElementById("coupon");
  let couponPercentage = 0;
  if (couponElement.value == "") {
  } else if (couponElement.value == "NEW15") {
    couponPercentage = 0.15;
  } else if (couponElement.value == "Couple20") {
    couponPercentage = 0.2;
  }
  updateUiGrandPrice(couponPercentage);
}
