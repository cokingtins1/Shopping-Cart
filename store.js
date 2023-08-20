import items from "./items.json"
import formatCurrency from "./utilities/formatCurrency.js"
import { addToCart } from "./shoppingCart.js"

const storeItemTemplate = document.querySelector("#store-item-template")
const storeItemContainer = document.querySelector("[data-store-container]")


const IMAGE_URL = "https://dummyimage.com/210x130"

export function setUpStore() {
	// Render store with items first
    items.forEach(renderStoreItem)
    
    // Listen for click to 'add to cart'
    document.addEventListener("click", (e) => {
		if (e.target.matches("[data-add-to-cart-button]")) {

            // Grabs the id of the cart item of the whose "Add To Cart" button was clicked"
			const id = e.target.closest("[data-store-item]").dataset.itemId
            
            // Runs function to add item to cart
			addToCart(parseInt(id)) //Since ID is string
		}
	})
	
}

function renderStoreItem(item) {
    // Clone the template
	const storeItem = storeItemTemplate.content.cloneNode(true)

    // Select the overall container of the template and hook it up to items.json by adding itemId to dataset 
	const container = storeItem.querySelector("[data-store-item]")
	container.dataset.itemId = item.id

    // Set innerTexts to item properties
	const name = storeItem.querySelector("[data-name]")
	name.innerText = item.name

	const category = storeItem.querySelector("[data-category]")
	category.innerText = item.category

	const image = storeItem.querySelector("[data-image]")
	image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

	const price = storeItem.querySelector("[data-price]")
	price.innerText = formatCurrency(item.priceCents / 100)


    // Add template to proper section of page
	storeItemContainer.append(storeItem)

}
