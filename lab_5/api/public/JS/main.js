const sortToggle = document.getElementById("sort-toggle");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const clearButton = document.getElementById("clear-btn");
const countButton = document.getElementById("count-btn");
const clearTotalButton = document.getElementById("clear-btn_another");
const totalPriceSpan = document.getElementById("total-price");
const toolGrid = document.querySelector(".tool-grid");


let tools = [];

const fetchTools = async () => {
  const response = await fetch("/api/tools");
  tools = await response.json();
  renderTools(tools);
};

const removeTool = async (id) => {
  await fetch(`/api/tool/${id}`, { method: 'DELETE' });
  fetchTools();
};

const editTool = (id) => {
  localStorage.setItem('editToolId', id);
  window.location.href = 'edit_page.html';
};

const fetchFilteredTools = async () => {
  const searchTerm = searchInput.value;
  const isDescending = sortToggle.checked;
  const response = await fetch(`/api/tools/filter?q=${searchTerm}&desc=${isDescending}&sort=true`);
  const data = await response.json();
  console.log(data);
  renderTools(data.filteredTools);
};

const renderTools = (tools) => {
  toolGrid.innerHTML = "";
  tools.forEach((tool) => {
    const card = document.createElement("div");
    card.className = "tool-card";
    card.innerHTML = `
              <div>
                <div class="tool-image">
                    <img src="${tool.imagelink}" alt="${tool.name}" >
                </div>
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <p>Main Сharacteristics</p>
                <ul class="ul_below">
                    <li>Power: ${tool.power}</li>
                    <li>Chain-Revolutions: ${tool.chainRevolutions}</li>
                </ul>
                <p class="price">Total price:$ ${tool.price}</p>
              </div>
              <div>
                <div class="tool-actions">
                    <a href="" class="edit-btn">Edit</a>
                    <a href="" class="remove-btn">Remove</a>
                </div>
              </div>
          `;

    card.querySelector(".remove-btn").addEventListener("click", (event) => {
      event.preventDefault();
      removeTool(tool.id); 
    });
    card.querySelector(".edit-btn").addEventListener("click", (event) => {
      event.preventDefault(); 
      editTool(tool.id)
    });

    toolGrid.appendChild(card);
  });
};



searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (!searchInput.value){
    console.log("don't click this button if you don't type nothing at input👿👿👿");
  }else{
    fetchFilteredTools();
  };
});

clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (!searchInput.value){
    console.log("don't click this button if you see nothing at input👿👿👿")
  }else{
    searchInput.value = "";
    fetchTools();
  };

});

sortToggle.addEventListener("change", function (event) {
  event.preventDefault();
  fetchFilteredTools();
});

countButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value; 
  const isDescending = sortToggle.checked;
  const response = await fetch(`/api/tools/filter?q=${searchTerm}&desc=${isDescending}&sort=true`);
  const data = await response.json();
  totalPriceSpan.textContent = `$${data.totalSum}`;
});

clearTotalButton.addEventListener("click", (event) => {
  event.preventDefault();
  totalPriceSpan.textContent = `$0`;
});

fetchTools();