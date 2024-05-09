const mongoose = require('mongoose');
const Product = require('./models/product');

//If we don't want to make function at last then we have to add these lines
mongoose.connect('mongodb://localhost:27017/shopping-app')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


const products = [
    {
        name: 'Iphone 12',
        img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 500,
        desc: "The iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system. The first-generation iPhone was announced by then–Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates. As of November 1, 2018, more than 2.2 billion iPhones had been sold. As of 2022, the iPhone accounts for 15.6% of global smartphone market share."
    },

    {
        name: 'Mackbook Pro',
        img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 1500,
        desc: "The MacBook is a brand of Mac notebook computers designed and marketed by Apple Inc. that use Apple's macOS operating system since 2006. It replaced the PowerBook and iBook brands during the Mac transition to Intel processors, announced in 2005. The current lineup consists of the MacBook Air (2008–present) and the MacBook Pro (2006–present)."
    },
    {
        name: 'Hamilton Watch',
        img: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 2000,
        desc: "The Hamilton Watch Company is a Swiss manufacturer of wristwatches based in Bienne, Switzerland. Founded in 1892 as an American firm, the Hamilton Watch Company ended American manufacture in 1969. Through a series of mergers and acquisitions, the Hamilton Watch Company eventually became integrated into the Swatch Group, the world's largest watch manufacturing and marketing conglomerate."
    },
    {
        name: 'Phantom Drone',
        img: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 700,
        desc: "The DJI Phantom (Chinese: 精灵; pinyin: Jīng Líng) is a series of unmanned aerial vehicles (UAVs), typically quadcopters, developed by Chinese technology company DJI. DJI Phantom devices were released between 2013 and 2019."
    },
    {
        name: 'Cambell Sofa set',
        img: 'https://images.unsplash.com/photo-1565374395542-0ce18882c857?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 400,
        desc: "Campbell Furniture Gallery is a full service, home furnishings showroom and design center.We provide some of the best manufacturers and products for our clients, as well as custom furniture.Customers from all over the Bay Area come to visit our beautiful 7,000 square foot showroom, located in the heart of downtown Campbell."
    },    
    {
        name: 'Bicycle',
        img: 'https://images.unsplash.com/photo-1484920274317-87885fcbc504?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnljaWNsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: 350,
        desc: "The iPhone is a line of smartphones designed and marketed by Apple Inc. that use Apple's iOS mobile operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates. As of November 1, 2018, more than 2.2 billion iPhones had been sold."
    },
    {
        name: 'Rebook Shoes',
        img: 'https://images.unsplash.com/photo-1530389912609-9a007b3c38a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 100,
        desc: "Reebok International Limited is an American fitness footwear and clothing brand that is a part of Authentic Brands Group. It was established in England in 1958 as a companion company to J.W. Foster and Sons, a sporting goods company which had been founded in 1895 in Bolton, Lancashire"
    },
];

Product.insertMany(products)
.then(() => {
    console.log('Products Seeded');
});

