const { error } = require("console");
const express = require("express");
const fs = require('fs');
const path = require('path');
const v1 = require('uuid');


const app = express();
const port = 3000;


app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'api', 'public')));
// app.use(express.static(path.join(__dirname, 'api', '/public', 'css')));
// app.use(express.static(path.join(__dirname, 'api', 'public', 'JS')));
// app.use(express.static(path.join(__dirname, 'api', 'public', 'images')));
app.get('/favicon.ico', (req, res) => res.status(204));

const dataFilePath = path.join(__dirname, 'api', 'tools.json');

const readToolsFromFile = () => {
  if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath);
      return JSON.parse(data);
  }
  return [];
};

const writeToolsToFile = (tools) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(tools, null, 2));
};

let imagesLinks = {
  "Husqvarna 450" : "../images/art.jpg",
  "Stihl MS 250" : "../images/modern.jpg",
  "Echo CS-310" : "../images/powerful.jpg",
  "Makita EA3600F1" : "../images/small.jpg",
  "Oregon 2040" : "../images/vintage_.jpg"
};

function getImage(chainsawName) {
  const thisLink = imagesLinks[chainsawName];
  
  if (thisLink) {
    return thisLink; 
  } else {
    return "Image not found"; 
  }
}

app.get("/api/tools", async (req, res) => {
  try{
    const tools = await readToolsFromFile();
    res.status(200).json(tools);
  }catch(error){
    res.status(500).json({message : error.message});
  }
});

app.get("/api/tool/:id", async (req, res) => {
  try{
    const { id } = req.params 
    const tools = await readToolsFromFile();
    const tool = tools.find(tool => tool.id == id)
    res.status(200).json(tool);
  }catch(error){ 
    res.status(500).json({message : error.message});
  }
});

app.post("/api/tools", async (req, res) => {
  try{
    const newTool = req.body;
    const tools = await readToolsFromFile();
    const existingTool = tools.find(tool => tool.name === newTool.name && (tool.power === newTool.power || tool.chainRevolutions === newTool.chainRevolutions));
    if (existingTool) {
        return res.status(400).json({ message: 'The same tool with this power or chain revolutions already exists.' });
    }

    newTool.id = v1.v1();
    newTool.imagelink = getImage(newTool.name);
    tools.push(newTool);
    writeToolsToFile(tools);
    res.status(201).json(newTool);
  }catch(error){
    res.status(500).json({message : error.message});
  }
});


app.put("/api/tool/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const updatedTool = req.body;

    const tools = await readToolsFromFile();
    const toolIndex = tools.findIndex(tool => tool.id === id);

    const existingTool = tools.find(tool => tool.name === updatedTool.name && tool.id !== id && (tool.power === updatedTool.power || tool.chainRevolutions === updatedTool.chainRevolutions));
    if (existingTool) {
        return res.status(400).json({ message: 'The same tool with this power or chain revolutions already exists.' });
    };

    if (toolIndex !== -1) {
      tools[toolIndex] = { ...tools[toolIndex], ...updatedTool };
      writeToolsToFile(tools);
      res.json(updatedTool);
  } else {
      res.status(404).send('Tool not found');
  }
  }catch(error){
    res.status(500).json({message : error.message});
  }
});

app.delete("/api/tool/:id", async (req, res) => {
  try{
    const { id } = req.params;
    let tools = await readToolsFromFile();
    const toolIndex = tools.findIndex(tool => tool.id === id);

    if (toolIndex !== -1) {
        tools.splice(toolIndex, 1);
        writeToolsToFile(tools);
        res.json({message: "Now! The tool is deleted"});
    } else {
        res.status(404).send('Tool not found');
    }
  }catch(error){
    res.status(500).json({message : error.message});
  }
});

app.get('/api/tools/filter', (req, res) => {
  try{
    const searchTerm = req.query.q ? req.query.q.toLowerCase().replace(/\s/g, "") : null;
    const isDescending = req.query.desc === 'true';
    const tools = readToolsFromFile();

    let filteredTools = tools;
    if (searchTerm) {
        filteredTools = filteredTools.filter(tool => tool.name.toLowerCase().replace(/\s/g, "").includes(searchTerm) || tool.description.toLowerCase().replace(/\s/g, "").includes(searchTerm));
    }

    if (req.query.sort) {
        filteredTools = filteredTools.sort((a, b) => 
            isDescending ? b.price - a.price : a.price - b.price
        );
    }

    const totalSum = filteredTools.reduce((sum, tool) => sum + parseFloat(tool.price), 0);

    res.json({ filteredTools, totalSum });
  }catch(error){
    res.status(500).json({message : error.message});
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("🧙‍♂️ Finally this work 🧙‍♂️");
});

