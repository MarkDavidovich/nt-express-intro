const inputText = document.querySelector(".item-input");
const checkPriceBtn = document.querySelector(".price-btn");
const outputText = document.querySelector(".price-text");

checkPriceBtn.addEventListener("click", async () => {
  const itemName = inputText.value;

  if (!itemName) return;

  try {
    const response = await fetch(`http://localhost:3000/priceCheck/${itemName}`);
    const data = await response.json();

    if (response.status === 404) {
      outputText.innerText = "Item not found!";
    } else {
      outputText.innerText = `The price of ${itemName} is $${data.price}`;
    }
  } catch (err) {
    console.error(`could not fetch data: ${err}`);
    outputText.innerText = "Could not connect to the server";
  }
});
