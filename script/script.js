document.addEventListener('DOMContentLoaded', () => {
    let searchInput = document.querySelector('#search');
    let button = document.querySelector('#searchButton');
    let resultsContainer = document.querySelector('#resultsContainer');

// gsap.from(".image",{
//    delay:1,
//    duration:1,
// opacity:0,

    
//   stagger:2,
    
// })
gsap.from(".image img", {
    delay: 1,
    duration: 1,
    opacity: 0,
    stagger: 1,
    backgroundColor:"pink"

});

    // gsap.from(".parra",{
    //     duration:1,
    //     delay:1,
    //     stagger:2,
    //     y:20,
    //     opacity:0,
    //     rotate:360,
    // })



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

            resultsContainer.innerHTML = ''; // Clear previous results

            if (Array.isArray(parsed) && parsed.length > 0) {
                parsed.forEach(product => {
                    // Create elements for each product
                    let productDiv = document.createElement('div');
                    productDiv.classList.add('product');

                    let brand = document.createElement('h1');
                    brand.innerHTML = `Brand: ${product.brand}`;

                    let namee = document.createElement('h2');
                    namee.innerHTML = `Product name: ${product.name}`;

                    let price = document.createElement('h3');
                    price.innerHTML = `Price: $${product.price}`;

                    let imagee = document.createElement('img');
                    imagee.src = product.image_link;
                    imagee.alt = `${product.name} image`;
                    imagee.style.width = '150px'; // Set size for the image

                    // Append all elements to the product div
                    productDiv.appendChild(brand);
                    productDiv.appendChild(namee);
                    productDiv.appendChild(price);
                    productDiv.appendChild(imagee);

                    // Append the product div to the results container
                    resultsContainer.appendChild(productDiv);
                    
                });

                gsap.from('.product', {
                    duration: 0.5,
                    opacity: 0,
                    y: 20,
                    stagger: 0.1
                });




            } else {
                console.error('No products found or invalid data structure');
                resultsContainer.innerHTML = '<p>No products found</p>';
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            resultsContainer.innerHTML = '<p>Error fetching products</p>';
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
            resultsContainer.innerHTML = '<p>Please enter a search term</p>';
        }
    });
});




// function sendmail(){
//     let parms={
// name:document.getElementById('#name').value,
// email:document.getElementById("#email").value,
// subject:document.getElementById("#subject").value,
// message:document.getElementById("#message").value,


//     }
//     emailjs.send("itvtjrXjEi2SBZCDI","template_xlbkq7b",parms).then(alert("place order🎀"))
// }


function sendMail(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Get the form data
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("quantity").value,  // Assuming message is for quantity
    };

    // Send the email using emailjs
    emailjs.send("service_xpafp5w","template_i3mfnro", params)
        .then(function(response) {
            alert("Order placed successfully! 🎀");
        })
        .catch(function(error) {
            alert("Error sending order: " + error.text);
        });
}

// Attach the sendMail function to the form's submit event
document.getElementById("orderForm").addEventListener("submit", sendMail);







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