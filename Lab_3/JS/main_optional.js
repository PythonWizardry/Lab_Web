export class Tool {
  constructor(
    name,
    description,
    power,
    chainRevolutions,
    price,
    imagelink,
    id
  ) {
    this.name = name;
    this.description = description;
    this.power = power;
    this.chainRevolutions = chainRevolutions;
    this.price = price;
    this.imagelink = imagelink;
    this.id = id;
  }
}

export let tools = [
  new Tool(
    "Husqvarna 450",
    "A reliable and powerful chainsaw suitable for both professional and homeowner use. Features a durable engine, easy start technology, and low vibration levels.",
    3.5,
    10000,
    650,
    "../images/art.jpg",
    uuid.v1()
  ),
  new Tool(
    "Stihl MS 250",
    "A well-balanced and easy-to-handle chainsaw designed for occasional use. Offers good performance and value for money.",
    2.8,
    11000,
    500,
    "../images/modern.jpg",
    uuid.v1()
  ),
  new Tool(
    "Echo CS-310",
    "A lightweight and maneuverable chainsaw ideal for pruning and trimming. Features a low-emission engine and a comfortable ergonomic design.",
    2.6,
    12000,
    450,
    "../images/powerful.jpg",
    uuid.v1()
  ),
  new Tool(
    "Makita EA3600F1",
    "A powerful electric chainsaw with a long-lasting battery. Suitable for various applications, including cutting firewood and limbing.",
    3.2,
    10500,
    700,
    "../images/small.jpg",
    uuid.v1()
  ),
  new Tool(
    "Oregon 2040",
    "A budget-friendly chainsaw that offers decent performance for occasional use. Ideal for homeowners and their light-duty tasks.",
    2.4,
    13000,
    300,
    "../images/vintage_.jpg",
    uuid.v1()
  ),
];

const sortToggle = document.getElementById("sort-toggle");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const clearButton = document.getElementById("clear-btn");
const countButton = document.getElementById("count-btn");
const clearTotalButton = document.getElementById("clear-btn_another");
const totalPriceSpan = document.getElementById("total-price");
const toolGrid = document.querySelector(".tool-grid");

export let currentlyDisplayedTools = tools;

function sortTools() {
  currentlyDisplayedTools.sort((a, b) =>
    sortToggle.checked ? b.price - a.price : a.price - b.price
  );
  renderTools();
}

function searchTools() {
  const searchTerm = searchInput.value.toLowerCase().replace(/\s/g, "");
  currentlyDisplayedTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().replace(/\s/g, "").includes(searchTerm) ||
      tool.description.toLowerCase().replace(/\s/g, "").includes(searchTerm)
  );
  renderTools(currentlyDisplayedTools);
}

function clearSearch() {
  searchInput.value = "";
  currentlyDisplayedTools = tools;
  renderTools();
}

function clearTotal() {
  totalPriceSpan.textContent = "$0";
}

function countTotalPrice() {
  const total = currentlyDisplayedTools.reduce(
    (sum, tool) => sum + tool.price,
    0
  );
  totalPriceSpan.textContent = `$${total.toFixed(2)}`;
}

export const renderTools = () => {
  toolGrid.innerHTML = "";
  currentlyDisplayedTools.forEach((tool) => {
    const card = document.createElement("div");
    card.className = "tool-card";
    card.innerHTML = `
              <div class="tool-image">
                  <img src="${tool.imagelink}" alt="${tool.name}" >
              </div>
              <h3>${tool.name}</h3>
              <p>${tool.description}</p>
              <p>Main Сharacteristics</p>
              <ul class="ul_below">
                  <li>Power: ${tool.power}</li>
                  <li>chainRevolutions: ${tool.chainRevolutions}</li>
              </ul>
              <p class="price">Total price:$ ${tool.price}</p>
              <div class="tool-actions">
                  <a href="" class="edit-btn">Edit</a>
                  <a href="" class="remove-btn">Remove</a>
              </div>
          `;

    card.querySelector(".remove-btn").addEventListener("click", (event) => {
      event.preventDefault();
      removeTool(tool.id); // Pass tool.id to the removeTool function
    });

    toolGrid.appendChild(card);
  });
};

function removeTool(id) {
  tools = tools.filter((tool) => tool.id !== id);
  currentlyDisplayedTools = tools;
  renderTools();
}

sortToggle.addEventListener("change", sortTools);
searchButton.addEventListener("click", searchTools);
clearButton.addEventListener("click", clearSearch);
countButton.addEventListener("click", countTotalPrice);
clearTotalButton.addEventListener("click", clearTotal);

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  searchTools();
});

clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  clearSearch();
});

countButton.addEventListener("click", function (event) {
  event.preventDefault();
  countTotalPrice();
});

sortToggle.addEventListener("change", function (event) {
  event.preventDefault();
  sortTools();
});

renderTools();
