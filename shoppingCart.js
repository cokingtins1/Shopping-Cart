import items from "./items.json"
import formatCurrency from "./utilities/formatCurrency.js"

const cartButton = document.querySelector("[data-cart-button]")
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]")

const cartItemTemplate = document.querySelector("#cart-item-template")
const cartItemContainer = document.querySelector("[data-cart-items-container]")

const IMAGE_URL = "https://dummyimage.com/210x130"

let shoppingCart = []

export function setUpShoppingCart() {}

// Remove items from cart
// Show/Hide the cart when it has no items or when it goes from 0 to 1 item
// Persist across multiple pages
// Calculate an accurate total
// Handle multiple of the same item in the cart

// Show/Hide the cart when clicked
cartButton.addEventListener("click", () => {
	cartItemsWrapper.classList.toggle("invisible")
})

export function addToCart(id) {
	// Handle adding multiple of the same item
    // existingItem is undefined unil an item of the same id has been added to the cart. Finds the id of the item that already exists and adds 1 to quantity.
	const existingItem = shoppingCart.find((entry) => entry.id === id)
    console.log(existingItem)
	if (existingItem) {
		existingItem.quantity++
	} else {
		shoppingCart.push({ id: id, quantity: 1 })
	}

	renderCart()
}

function renderCart() {
	cartItemContainer.innerHTML = ""
	shoppingCart.forEach((entry) => {
		// Finds the item from items.json whose id matches the entry's id and saves as object 'item'
		const item = items.find((i) => entry.id === i.id)

		// Clone the template
		const cartItem = cartItemTemplate.content.cloneNode(true)

		// Select the overall container of the template and hook it up to items.json by adding itemId to dataset
		const container = cartItem.querySelector("[data-item]")
		container.dataset.itemId = item.id

		// Set innerTexts to item properties
		const name = cartItem.querySelector("[data-name]")
		name.innerText = item.name

		const image = cartItem.querySelector("[data-image]")
		image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

		const price = cartItem.querySelector("[data-price]")
		price.innerText = formatCurrency(
			(item.priceCents * entry.quantity) / 100
		)

		if (entry.quantity > 1) {
			const quantity = cartItem.querySelector("[data-quantity]")
			quantity.innerText = `x${entry.quantity}`
		}

		// Add template to proper section of page
		cartItemContainer.appendChild(cartItem)
	})
}
