// SELECT FORM ELEMENT FROM DOM
const form = document.getElementById("loan-form");
const loanAmount = document.querySelector("#loan-amount");
const interestAmount = document.querySelector("#interest-amount");
const years = document.querySelector("#years");
const monthlyPayment = document.querySelector("#monthly-payment");
const totalPayment = document.querySelector("#total-payment");
const totalInterest = document.querySelector("#total-interest");

const clearBtn = document.querySelector(".clear");

//Listens to submit
form.addEventListener("submit", (e) => {
  //hide results
  document.querySelector("#results").style.display = "none";

  //show loader
  document.getElementById("loader").style.display = "block";

  //call calculate results after 2 seconds
  setTimeout(() => calculateResults(), 1500);

  //prevent default element behavour
  e.preventDefault();
});

//calculateResults
const calculateResults = () => {
  //variables to calculate compund intersest
  const principal = parseFloat(loanAmount.value);
  const calculatedInterest = parseFloat(interestAmount.value) / 100 / 12;
  const calculatedPayements = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayements);

  //calculate monthly installment
  const monthlyInstallment = (principal * x * calculatedInterest) / (x - 1);

  //check if finite
  if (isFinite(monthlyInstallment)) {
    monthlyPayment.value = monthlyInstallment.toFixed(2);
    totalPayment.value = (monthlyInstallment * calculatedPayements).toFixed(2);
    totalInterest.value = (monthlyInstallment * calculatedPayements - principal).toFixed(2);

    //show results
    document.querySelector("#results").style.display = "block";

    //hide spinner loader
    document.getElementById("loader").style.display = "none";
  } else {
    //show error
    showError("Please check your numbers!");
  }
};

//clear inputs
clearBtn.addEventListener("click", () => {
  loanAmount.value = "";
  interestAmount.value = "";
  years.value = "";
  monthlyPayment.value = "";
  totalPayment.value = "";
  totalInterest.value = "";

  setTimeout(() => {
    //hide spinner loader
    document.getElementById("results").style.display = "none";
  }, 1000);
});

//show Error function
const showError = (error) => {
  //show results
  document.querySelector("#results").style.display = "none";

  //hide spinner loader
  document.getElementById("loader").style.display = "none";

  //create Div
  const errorDiv = document.createElement("div");
  //add classes
  errorDiv.className = "alert alert-danger";
  //create text node
  const text = document.createTextNode(error);

  //get card & heading
  const card = document.querySelector(".card");
  const heading = document.querySelector("h1");

  //append text to alert div
  errorDiv.appendChild(text);

  //append error div to card b4 heading
  card.insertBefore(errorDiv, heading);

  //clear error
  //first way of doing it
  // setTimeout(clearError, 1500);

  //second way of doing it
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 1500);
};

//clear error
// const clearError = () => {
//   document.querySelector(".alert").remove();
// };
