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
      console.log("check your numbers!");
    }
  }),
);
