const checkPriceInput = document.querySelector(".item-check");
const checkPriceBtn = document.querySelector(".price-btn");
const priceText = document.querySelector(".price-text");

const buyItemInput = document.querySelector(".item-buy");
const buyItemBtn = document.querySelector(".buy-btn");
const boughtText = document.querySelector(".bought-text");

const moneyText = document.querySelector(".money");

let balance = 2000;

const updateBalance = () => {
  moneyText.innerText = ` $${balance}`;
};

const getPrice = async (itemName, isRendered = true) => {
  if (!itemName) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/priceCheck/${itemName}`);
    const data = await response.json();

    if (response.status === 404) {
      if (isRendered) {
        priceText.innerText = data.error;
      }

      return null;
    }

    if (isRendered) {
      priceText.innerText = `The price of ${itemName} is $${data.price}`;
    }
    return data.price;
  } catch (err) {
    if (isRendered) {
      priceText.innerText = "Connection error.";
    }
    return null;
  }
};

const buyItem = async (itemName) => {
  const itemPrice = await getPrice(itemName, false);

  if (itemPrice === null) {
    boughtText.innerText = "That item doesn't exist!";
    return;
  }

  if (balance < itemPrice) {
    boughtText.innerText = "You're too broke for this. Get a job!";
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/buy/${itemName}`, { method: "POST" });
    const data = await response.json();

    if (!response.ok) {
      boughtText.innerText = data.error;
    } else {
      boughtText.innerText = `Congratulations, you've just bought ${data.name} for $${data.price}. There are ${data.inventory} left now in the store.`;
      balance -= data.price;
      updateBalance();
    }
  } catch (err) {
    boughtText.innerText = "Connection error.";
  }
};

checkPriceBtn.addEventListener("click", () => {
  const itemName = checkPriceInput.value;
  getPrice(itemName);
});

buyItemBtn.addEventListener("click", () => {
  const itemName = buyItemInput.value;
  buyItem(itemName);
});

updateBalance();
