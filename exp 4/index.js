const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" }
];
let nextId = 3;

function validateCard(card) {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const values = [
    "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "Jack", "Queen", "King"
  ];

  if (!card.suit || !card.value) {
    return "Suit and value are required.";
  }
  if (!suits.includes(card.suit)) {
    return "Invalid suit. Must be Hearts, Diamonds, Clubs, or Spades.";
  }
  if (!values.includes(card.value)) {
    return "Invalid value. Must be Ace, 2–10, Jack, Queen, or King.";
  }
  return null;
}

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.get("/cards/:id", (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ error: "Card not found" });
  res.json(card);
});

app.post("/cards", (req, res) => {
  const error = validateCard(req.body);
  if (error) return res.status(400).json({ error });

  const newCard = { id: nextId++, ...req.body };
  cards.push(newCard);
  res.status(201).json(newCard);
});

app.put("/cards/:id", (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ error: "Card not found" });

  const error = validateCard(req.body);
  if (error) return res.status(400).json({ error });

  card.suit = req.body.suit;
  card.value = req.body.value;
  res.json(card);
});

app.delete("/cards/:id", (req, res) => {
  const index = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Card not found" });

  const deleted = cards.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
