const checkPriceInput = document.querySelector(".item-check");
const checkPriceBtn = document.querySelector(".price-btn");
const priceText = document.querySelector(".price-text");

const buyItemInput = document.querySelector(".item-buy");
const buyItemBtn = document.querySelector(".buy-btn");
const boughtText = document.querySelector(".bought-text");

checkPriceBtn.addEventListener("click", async () => {
  const itemName = checkPriceInput.value;

  if (!itemName) return;

  try {
    const response = await fetch(`http://localhost:3000/priceCheck/${itemName}`);
    const data = await response.json();

    if (response.status === 404) {
      priceText.innerText = data.error;
    } else {
      priceText.innerText = `The price of ${itemName} is $${data.price}`;
    }
  } catch (err) {
    console.error(`Could not fetch data: ${err}`);
    priceText.innerText = "Could not connect to the server";
  }
});

buyItemBtn.addEventListener("click", async () => {
  const itemName = buyItemInput.value;

  if (!itemName) return;

  try {
    const response = await fetch(`http://localhost:3000/buy/${itemName}`, {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);

    if (response.status === 404 || response.status === 400) {
      boughtText.innerText = data.error;
    } else {
      boughtText.innerText = `Congratulations, you've just bought ${data.name} for ${data.price}. There are ${data.inventory} left now in the store.`;
    }
  } catch (err) {
    console.error(`Could not fetch data: ${err}`);
    boughtText.innerText = "Could not connect to the server";
  }
});
