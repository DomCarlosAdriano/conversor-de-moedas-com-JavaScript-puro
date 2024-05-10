const key = `3e40e063a82cabd5f2d2117e`;
const url = `https://v6.exchangerate-api.com/v6/${key}/latest/USD`;

const currencyOneEl = document.querySelector('[data-js="currency-one"]');
const currencyTwoEl = document.querySelector('[data-js="currency-two"]');
const howMuch = document.querySelector('[data-js="currency-one-times"]');

const conversion = document.querySelector('[data-js="converted-value"]');
const conversionPrecision = document.querySelector(
  '[data-js="conversion-precision"]'
);

async function createTheOption() {
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.conversion_rates;
    })
    .then((coins) => {
      let arry = Object.keys(coins);
      let newArry = arry.map((item) => {
        return `<option value="${item}">${item}</option>`;
      });
      return newArry.join("");
    })
    .then((arryOption) => {
      currencyOneEl.innerHTML = arryOption;
      currencyTwoEl.innerHTML = arryOption;
    });
}

createTheOption();

async function ConversionPair(coin1, coin2) {
  let url = `https://v6.exchangerate-api.com/v6/${key}/pair/${coin1}/${coin2}`;

  let response = await fetch(url);
  let data = await response.json();

  return data.conversion_rate;
}

currencyOneEl.addEventListener("change", async () => {
  let indexSelectedOP1 = currencyOneEl.selectedIndex;
  let indexSelectedOP2 = currencyTwoEl.selectedIndex;

  let coin1 = currencyOneEl.options[indexSelectedOP1].value;
  let coin2 = currencyOneEl.options[indexSelectedOP2].value;
  let valueInput = howMuch.value === "" ? 0 : howMuch.value;

  let cotacao = await ConversionPair(coin1, coin2);
  let convertedValue = valueInput * Number(cotacao.toFixed(2));

  conversionPrecision.innerHTML = `${valueInput} ${coin1} = ${convertedValue} ${coin2}`;
  conversion.innerHTML = `${convertedValue}`;
});

currencyTwoEl.addEventListener("change", async () => {
  let indexSelectedOP1 = currencyOneEl.selectedIndex;
  let indexSelectedOP2 = currencyTwoEl.selectedIndex;

  let coin1 = currencyOneEl.options[indexSelectedOP1].value;
  let coin2 = currencyOneEl.options[indexSelectedOP2].value;
  let valueInput = howMuch.value === "" ? 0 : howMuch.value;

  let cotacao = await ConversionPair(coin1, coin2);
  let convertedValue = valueInput * Number(cotacao.toFixed(2));

  conversionPrecision.innerHTML = `${valueInput} ${coin1} = ${convertedValue} ${coin2}`;
  conversion.innerHTML = `${convertedValue}`;
});

howMuch.addEventListener("keyup", async () => {
  let indexSelectedOP1 = currencyOneEl.selectedIndex;
  let indexSelectedOP2 = currencyTwoEl.selectedIndex;

  let coin1 = currencyOneEl.options[indexSelectedOP1].value;
  let coin2 = currencyOneEl.options[indexSelectedOP2].value;
  let valueInput = howMuch.value === "" ? 0 : howMuch.value;

  let cotacao = await ConversionPair(coin1, coin2);
  let convertedValue = valueInput * Number(cotacao.toFixed(2));

  conversionPrecision.innerHTML = `${valueInput} ${coin1} = ${convertedValue} ${coin2}`;
  conversion.innerHTML = `${convertedValue}`;
});
