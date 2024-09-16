document.addEventListener('DOMContentLoaded', () => {
    let searchInput = document.querySelector('#search');
    let button = document.querySelector('#searchButton');
    let brand = document.querySelector('#brand');
    let namee = document.querySelector('#namee');
    let price = document.querySelector('#price');
    let imagee = document.querySelector('#imagee');

    console.log('Element selectors:', {
        searchInput,
        button,
        brand,
        namee,
        price,
        imagee
    });

    const searching = async (searchTerms) => {
        let url = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${searchTerms}`;
        console.log('Fetching URL:', url);

        try {
            let response = await fetch(url);
            console.log('Fetch response status:', response.status);

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            let parsed = await response.json();
            console.log('Parsed Response:', parsed);

            if (Array.isArray(parsed) && parsed.length > 0) {
                let product = parsed[0];

                brand.innerHTML = `Brand: ${product.brand}`;
                namee.innerHTML = `Product name: ${product.name}`;
                if (imagee) { // Check if imagee is not null
                    imagee.src = product.image_link;  // Set image source
                } else {
                    console.error('imagee element is null');
                }
                price.innerHTML = `Price: $${product.price}`;
            } else {
                console.error('No products found or invalid data structure');
                brand.innerHTML = 'No products found';
                namee.innerHTML = '';
                price.innerHTML = '';
                if (imagee) {
                    imagee.src = '';
                }
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };

    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission and page reload
        const searchTerms = searchInput.value.trim();
        console.log('Search Term:', searchTerms); // Debugging line

        if (searchTerms) {
            searching(searchTerms);
        } else {
            console.error('Please enter a search term');
            brand.innerHTML = 'Please enter a search term';
            namee.innerHTML = '';
            price.innerHTML = '';
            if (imagee) {
                imagee.src = '';
            }
        }
    });
});









// let brandInput = document.querySelector('#searchh');
// let butt= document.querySelector('button');

// const searchings = async (searchTerms) => {
//     let url = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${searchTerms}`;
//     try {
//         let data = await fetch(url);
//         if (!data.ok) throw new Error('Product not found or network error.');

//         let parsed = await data.json();
//         console.log(parsed);

//     } catch (error) {
//         console.error(error);
//     }
// };

// butt.addEventListener('click', () => {
//     const searchTerms = brandInput.value.trim(); // Get the input value
//     if (searchTerms) {
//         searching(searchTerms); // Call the function with the search term
//     } else {
//         console.error('Please enter a search term');
//     }
// });