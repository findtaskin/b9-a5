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
  updateUiNextButton();
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
  let discount = totalPrice * couponPercentage;
  element.innerHTML = totalPrice - discount;
}

function applyCoupon() {
  let couponElement = document.getElementById("coupon");
  let couponPercentage = 0;
  if (selectedSeats.length == 0) {
    alert("No ticket selected");
    return;
  } else if (couponElement.value == "") {
    alert("No coupon text provided");
    return;
  } else if (couponElement.value == "NEW15") {
    couponPercentage = 0.15;
  } else if (couponElement.value == "Couple 20") {
    couponPercentage = 0.2;
  } else {
    alert("Wrong coupon code");
    return;
  }
  updateUiGrandPrice(couponPercentage);
  document.getElementById("coupon-section").remove();
}

function applyNext() {
  const phone = document.getElementById("phone");
  const successModal = document.getElementById("success-modal");
  if (selectedSeats.length == 0) {
    alert("No ticket selected");
    return;
  } else if (!phone.value) {
    alert("No Phone Number provided. \nPhone number is mandatory.");
    return;
  } else {
    successModal.classList.toggle("hidden");
    successModal.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function applyContinue() {
  const successModal = document.getElementById("success-modal");
  successModal.classList.toggle("hidden");
}

function applyGetStarted() {
  const seatSelection = document.getElementById("seat-selection");
  seatSelection.scrollIntoView({ behavior: "smooth", block: "start" });
}
