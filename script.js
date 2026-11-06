const restaurantName = "Spooky Bites";
let isOpen = true;

let customerName = "";
let mealPrice = 0;
let quantity = 1;
let total = 0;

const DISCOUNT_THRESHOLD = 300;
const DISCOUNT_RATE = 0.10;

const prices = {
    "Spider Pizza": 150,
    "Pumpkin Pasta": 180,
    "Ghost Burger": 120
};

const status = document.getElementById("status");
const result = document.getElementById("result");
const greeting = document.getElementById("greeting");

function displayStatus() {
    status.textContent = isOpen
    ? "We are OPEN!"
    : "We are CLOSED!";
    status.className = isOpen ? "open" : "closed";
}

function toggleStatus() {
    isOpen = !isOpen;
    displayStatus();
    if (!isOpen) {
        result.textContent = "The restaurant is Closed. Orders are paused."; 
    } else {
        result.textContent = "We're open! Your order summary will appear here.";
    }
}

function showGreeting(name) {
    greeting.textContent = "Peeka Boo, " + name + "! Welcome to " + restaurantName + ". Hope you're hungry for a fright!";
}

function calculateDiscount(subtotal) {
    return subtotal >= DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
}

function recommendMeal (orderTotal) {
    if (orderTotal < 200) {
        return "Try our Bat Wing Fries as a side!";
    } else if (orderTotal < 400) {
        return "Pair it with our Witch's Brew Float!";
    } else {
        return "Treat yourself to our Vampire velvet Cake for dessert!";
    }
}

function placeOrder() {
    customerName = document.getElementById("customer").value.trim();
    const selectedMeal = document.getElementById("meal").value;
    quantity = Number(document.getElementById("quantity").value);

if (!isOpen) {
    greeting.textContent= "";
    result.textContent = "Sorry! The restaurant is closed.";
    return;
}

if (!customerName) {
    greeting.textContent = "";
    result.textContent = "Please enter your name first!";
    return;
}
if (!Number.isInteger(quantity) || quantity < 1) {
    result.textContent = "Please enter a valid Quantity.";
return;
}

showGreeting(customerName);

mealPrice = prices[selectedMeal];
const subtotal = mealPrice * quantity;
const discount = calculateDiscount(subtotal);
total = subtotal - discount;
const recommendation = recommendMeal(total);

const confirmed = confirm(
"Confirm your order, " + customerName + "?\n\n" + quantity + " x " + selectedMeal + "\n" + 
"Subtotal: ₱" + subtotal.toFixed(2) + "\n" + "Discount: ₱" + discount.toFixed(2) + "\n" +
"Total: ₱" + total.toFixed(2)
);

if (!confirmed) {
    result.textContent = "Order cancelled. Feel free to change your order, " + customerName + "!";
    return;
}

result.textContent = "Thank you, " + customerName + "! Your order: " + quantity + " " + selectedMeal + "(s).\n" + "Subtotal: ₱" + subtotal.toFixed(2) + "\n"
 + (discount > 0
    ? "10% Discount: -₱" + discount.toFixed(2) + "\n"
    : "No discount (spend ₱" +DISCOUNT_THRESHOLD + " or more to get 10% off)\n") +
    "Total: ₱" + total.toFixed(2) + "\n" +
    "Recommended: " + recommendation + "\n" +
    "Enjoy your spooky meal!";
}

function showMenuMessage() {
    alert("Welcome to " + restaurantName + "! Choose your spooky meal.");
}
displayStatus();

document.getElementById("orderBtn")
.addEventListener("click", placeOrder);

document.getElementById("toggleBtn")
.addEventListener("click", toggleStatus);

document.querySelector('a[href="#menu"]')
.addEventListener("click", showMenuMessage);
