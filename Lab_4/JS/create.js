import { Tool, getImage } from "./class_n_function.js";


const toolType = document.getElementById("tool-type");
const description = document.getElementById("description");
const power = document.getElementById("power");
const chainRevolutions = document.getElementById("chainRevolutions");
const totalPrice = document.getElementById("price");
const submitButton = document.getElementById("submit-button");


submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (!toolType.value || !description.value || !power.value || !chainRevolutions.value || !totalPrice.value) {
        alert('Please fill in all fields.');
        return;
    }


    let newTool = new Tool(
        toolType.value,
        description.value,
        parseFloat(power.value),
        parseInt(chainRevolutions.value),
        parseFloat(totalPrice.value),
        getImage(toolType.value),
        uuid.v1()
    );
    // const newTool = {
    //     name: toolType.value,
    //     description: description.value,
    //     power: parseFloat(power.value),
    //     chainRevolutions: parseInt(chainRevolutions.value),
    //     price: parseFloat(totalPrice.value),
    //     imagelink: getImage(toolType.value),
    //     id: uuid.v1()
    // };
    let currentlyDisplayedTools = JSON.parse(localStorage.getItem('tools')) || [];
    const isDuplicate = currentlyDisplayedTools.some(existingTool => 
        existingTool.name === newTool.name && 
        existingTool.power === newTool.power
        // existingTool.chainRevolutions === newTool.chainRevolutions
    );
    const isDuplicate2 = currentlyDisplayedTools.some(existingTool => 
        existingTool.name === newTool.name && 
        // existingTool.power === newTool.power && 
        existingTool.chainRevolutions === newTool.chainRevolutions
    );
    if (isDuplicate) {
        alert('A tool with the same NAME and POWER already exists. Please modify your entry.');
    } else if(isDuplicate2){
        alert('A tool with the same NAME and CHAIN-REVOLUTIONS already exists. Please modify your entry');
    }else {
        currentlyDisplayedTools.push(newTool);
        localStorage.setItem('tools', JSON.stringify(currentlyDisplayedTools));
        document.getElementById('create-tool-form').reset();
        window.location.href = 'index.html'
    }})