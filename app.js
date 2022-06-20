// SELECT FORM ELEMENT FROM DOM
const form = document.getElementById("loan-form");
const loanAmount = document.querySelector("#loan-amount");
const interestAmount = document.querySelector("#interest-amount");
const years = document.querySelector("#years");
const monthlyPayment = document.querySelector("#monthly-payment");
const totalPayment = document.querySelector("#total-payment");
const totalInterest = document.querySelector("#total-interest");

//Listens to submit
form.addEventListener(
  "submit",
  (calculateResults = (e) => {
    //variables to calculate compund intersest
    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(interestAmount.value) / 100 / 12;
    const calculatedPayements = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayements);

    //calculate monthly installment
    const monthlyInstallment = (principal * x * calculatedInterest) / (x - 1);

    //prevent default element behavour
    e.preventDefault();

    //check if finite
    if (isFinite(monthlyInstallment)) {
      monthlyPayment.value = monthlyInstallment.toFixed(2);
      totalPayment.value = (monthlyInstallment * calculatedPayements).toFixed(2);
      totalInterest.value = (monthlyInstallment * calculatedPayements - principal).toFixed(2);
    } else {
      //show error
      showError("Please check your numbers!");
    }
  }),
);

//show Error function
const showError = (error) => {
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
};
