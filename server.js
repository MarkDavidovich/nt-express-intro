const express = require("express");
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

const store = [
  { name: "table", inventory: 3, price: 800 },
  { name: "chair", inventory: 16, price: 120 },
  { name: "couch", inventory: 1, price: 1200 },
  { name: "picture frame", inventory: 31, price: 70 },
];

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running smoothly" });
});

app.get("/priceCheck/:item", (req, res) => {
  const item = getItemByName(req.params.item);

  if (!item) {
    return res.status(404).json({ error: `Item not found!` });
  }

  res.json({ price: item.price });
});

app.post("/buy/:name", (req, res) => {
  const item = getItemByName(req.params.name);
  if (!item) {
    return res.status(404).json({ error: "Item not found!" });
  }

  if (item.inventory === 0) {
    return res.status(400).json({ error: `${item.name} is out of stock!` });
  }

  item.inventory--;
  res.json(item);
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

const getItemByName = (itemName) => {
  const itemInStore = store.find((i) => i.name === itemName.toLowerCase());
  return itemInStore;
};
