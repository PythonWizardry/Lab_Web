const { error } = require("console");
const express = require("express");
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
// const port = 3000;


app.use(cors());
app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(200));


const dataFilePath = path.join(__dirname, 'chainsaws.json');


let imagesLinks = {
  "Husqvarna 450" : "./images/art.jpg",
  "Stihl MS 250" : "./images/modern.jpg",
  "Echo CS-310" : "./images/powerful.jpg",
  "Makita EA3600F1" : "./images/small.jpg",
  "Oregon 2040" : "./images/vintage_.jpg"
};

function getImage(chainsawName) {
  const thisLink = imagesLinks[chainsawName];
  
  if (thisLink) {
    return thisLink; 
  } else {
    return "Image not found"; 
  }
}

const readToolsFromFile = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const writeToolsToFile = (tools) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(tools, null, ' '));
};


app.get('/api/home', (req, res) => {
  const tools = readToolsFromFile();
  const result = tools.map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      imagelink: tool.imagelink
  }))
  res.status(200).json(result);
});

app.get('/api/catalog', (req, res) => {
  const { powerFilter, chainRevolutionsFilter, priceFilter, searchQuery } = req.query;

  const chainsaws = readToolsFromFile();
  console.log(chainsaws);

  const filteredChainsaws = chainsaws.filter((chainsaw) => {
    const powerMatch = powerFilter === "All" || chainsaw.power <= Number(powerFilter);
    const chainRevolutionsMatch = chainRevolutionsFilter === "All" || chainsaw.chainRevolutions <= Number(chainRevolutionsFilter);
    const priceMatch = priceFilter === "All" || chainsaw.price <= Number(priceFilter);
    const searchMatch = !searchQuery || chainsaw.name.toLowerCase().replace(/\s/g, '').includes(searchQuery.toLowerCase().replace(/\s/g, ''))
      || chainsaw.description.toLowerCase().replace(/\s/g, '').includes(searchQuery.toLowerCase().replace(/\s/g, ''));

    return powerMatch && chainRevolutionsMatch && priceMatch && searchMatch;
  });

  res.status(200).json(filteredChainsaws);
});


app.get('/api/item/:id', (req, res) => {
  const {id} = req.params;
  const tools = readToolsFromFile();

  let foundTool = tools.find(tool => tool.id === id);
  if (foundTool) res.status(200).json(foundTool);
  else res.status(404).json({message: 'Tool not found'});
})

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3000');
})
