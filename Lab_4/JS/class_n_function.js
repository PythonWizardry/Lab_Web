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

let imagesLinks = {
  "Husqvarna 450" : "../images/art.jpg",
  "Stihl MS 250" : "../images/modern.jpg",
  "Echo CS-310" : "../images/powerful.jpg",
  "Makita EA3600F1" : "../images/small.jpg",
  "Oregon 2040" : "../images/vintage_.jpg"
};

export function getImage(chainsawName) {
  const thisLink = imagesLinks[chainsawName];
  
  if (thisLink) {
    return thisLink; 
  } else {
    return "Image not found"; 
  }
}
