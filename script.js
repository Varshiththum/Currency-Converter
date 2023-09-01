document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'bb5ffa99ff9c1b512dd94b12'; //  API key
    const fromDropDown = document.getElementById("from-currency-select");
    const toDropDown = document.getElementById("to-currency-select");
  
    // Populate dropdown options from the currencies array
    currencies.forEach((currency) => {
      const fromOption = document.createElement("option");
      fromOption.value = currency.code;
      fromOption.textContent = `${currency.code} - ${currency.name}`;
      fromDropDown.appendChild(fromOption);
  
      const toOption = document.createElement("option");
      toOption.value = currency.code;
      toOption.textContent = `${currency.code} - ${currency.name}`;
      toDropDown.appendChild(toOption);
    });
  
    // Setting default values
    fromDropDown.value = "USD";
    toDropDown.value = "INR";
  
    const convertCurrency = () => {
      const amount = parseFloat(document.querySelector("#amount").value);
      const fromCurrency = fromDropDown.value;
      const toCurrency = toDropDown.value;
  
      if (!isNaN(amount)) {
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
  
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.result === "success") {
              const fromExchangeRate = data.conversion_rates[fromCurrency];
              const toExchangeRate = data.conversion_rates[toCurrency];
              const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
              document.getElementById('result').innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            } else {
              console.error('Error fetching data:', data["error-type"]);
            }
          })
          .catch((error) => console.error('Error fetching data:', error));
      } else {
        alert("Please enter a valid amount");
      }
    };
  
    document.querySelector("#convert-button").addEventListener("click", convertCurrency);
    window.addEventListener("load", convertCurrency);
  });
  