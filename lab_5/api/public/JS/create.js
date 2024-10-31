const toolType = document.getElementById("tool-type");
const description = document.getElementById("description");
const power = document.getElementById("power");
const chainRevolutions = document.getElementById("chainRevolutions");
const totalPrice = document.getElementById("price");
const submitButton = document.getElementById("submit-button");


submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    if (!toolType.value || !description.value || !power.value || !chainRevolutions.value || !totalPrice.value) {
        alert('Please fill in all fields.');
        return;
    }


    const tool = {
        "name": toolType.value.trim(),
        "description": description.value.trim(),
        "power": parseFloat(power.value),
        "chainRevolutions": parseInt(chainRevolutions.value),
        "price": parseFloat(totalPrice.value)
    };

    // const toolsResponse = await fetch('/api/tools');
    // const tools = await toolsResponse.json();

    // const isDuplicate = tools.some(existingTool => 
    //     existingTool.name === tool.name && 
    //     existingTool.power === tool.power
    // );
    // const isDuplicate2 = tools.some(existingTool => 
    //     existingTool.name === tool.name && 
    //     existingTool.chainRevolutions === tool.chainRevolutions
    // );
    // if (isDuplicate) {
    //     alert('A tool with the same NAME and POWER already exists. Please modify your entry.');
    // } else if(isDuplicate2){
    //     alert('A tool with the same NAME and CHAIN-REVOLUTIONS already exists. Please modify your entry');
    // }
    
    const response = await fetch('/api/tools', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tool),
    });

    if (response.ok) {
        document.getElementById('create-tool-form').reset();
        window.location.href = 'index.html'
    } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
    };
})