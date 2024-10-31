import { Tool, getImage } from "./class_n_function.js";

document.addEventListener('DOMContentLoaded', () => {
    const editTool = localStorage.getItem("editTool");
    const toolType = document.getElementById("tool-type");
    const description = document.getElementById("description");
    const power = document.getElementById("power");
    const chainRevolutions = document.getElementById("chainRevolutions");
    const totalPrice = document.getElementById("price");
    const editButton = document.getElementById("submit-button");


    let currentlyDisplayedTools = JSON.parse(localStorage.getItem('tools')) || [];
    const toolToEdit = currentlyDisplayedTools.find(tool => tool.id === editTool);
    console.log(toolToEdit)

    if(toolToEdit){
        const optionToSelect = Array.from(toolType.options).find(option => option.text === toolToEdit.name);
        toolType.value = optionToSelect.value;
        description.value = toolToEdit.description;
        power.value = toolToEdit.power;
        chainRevolutions.value = toolToEdit.chainRevolutions;
        totalPrice.value = toolToEdit.price;
    };

    editButton.addEventListener('click', (event) => {
        event.preventDefault();

        // const isDuplicate = currentlyDisplayedTools.some(existingTool => 
        //     existingTool.id !== editTool &&
        //     existingTool.name === toolType.value && 
        //     existingTool.power === parseFloat(power.value) && 
        //     existingTool.chainRevolutions === parseInt(chainRevolutions.value)
        // );

        // if (!isDuplicate) {
        //     alert('Please choose a different title.');
        //     return;
        // }
        if (toolType.value !== toolToEdit.name) {
            // *the line below can be uncomented if you don't want aloow to change the name
            // alert('You cannot change the name of the tool.');
            // return;

            // * and the line below this using to change picture if you want to allow changing the name
            toolToEdit.imagelink = getImage(toolType.value);
        }
        const isDuplicate = currentlyDisplayedTools.some(existingTool => 
            existingTool.id !== parseInt(editTool) &&
            existingTool.name === toolType.value  &&
            existingTool.power === parseFloat(power.value) && 
            existingTool.chainRevolutions === parseInt(chainRevolutions.value) &&
            existingTool.price === parseFloat(totalPrice.value)
        );

        const isDuplicate2 = currentlyDisplayedTools.some(existingTool => 
            existingTool.name === toolType.value && 
            existingTool.power === parseFloat(power.value)
        );
        const isDuplicate3 = currentlyDisplayedTools.some(existingTool => 
            existingTool.name === toolType.value &&  
            existingTool.chainRevolutions === parseInt(chainRevolutions.value)
        );

        if (isDuplicate) {
            alert('You didn\'t change anything. Please change something.');
            return;
        } 
        if (toolType.value !== toolToEdit.name) {
            if (isDuplicate2) {
                alert('Please change something, cause A tool with the same NAME and POWER already exists.');
                return;
            } else if (isDuplicate3) {
                alert('Please change something, cause A tool with the same NAME and CHAIN-REVOLUTIONS already exists.');
                return;
            }
        }

        toolToEdit.name = toolType.value;
        toolToEdit.description= description.value;
        toolToEdit.power = parseFloat(power.value);
        toolToEdit.chainRevolutions = parseInt(chainRevolutions.value);
        toolToEdit.price = parseFloat(totalPrice.value);
        localStorage.setItem('tools', JSON.stringify(currentlyDisplayedTools));
        localStorage.removeItem('editTool');
        window.location.href = 'index.html';
    });
});
