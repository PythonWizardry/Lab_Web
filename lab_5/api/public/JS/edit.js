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

document.addEventListener('DOMContentLoaded', async () => {
    const editToolId = localStorage.getItem("editToolId");
    const toolType = document.getElementById("tool-type");
    const description = document.getElementById("description");
    const power = document.getElementById("power");
    const chainRevolutions = document.getElementById("chainRevolutions");
    const totalPrice = document.getElementById("price");
    const editButton = document.getElementById("submit-button");


    const response = await fetch(`/api/tool/${editToolId}`, {method: 'GET' });

    const thistool = await response.json();
    if(thistool){
        toolType.value = thistool.name;
        description.value = thistool.description;
        power.value = thistool.power;
        chainRevolutions.value = thistool.chainRevolutions;
        totalPrice.value = thistool.price;
    }else{
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
    }

    editButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const updateTool = {
            "name": toolType.value.trim(),
            "description": description.value.trim(),
            "power": parseFloat(power.value),
            "chainRevolutions": parseInt(chainRevolutions.value),
            "price": parseFloat(totalPrice.value),
            "imagelink": getImage(toolType.value)
        }

        const response = await fetch(`/api/tool/${editToolId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateTool),
        });

        if (response.ok) {
            localStorage.removeItem('editToolId');
            window.location.href = 'index.html';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        };
    });
});
