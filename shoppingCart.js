import items from "./items.json"
import formatCurrency from "./utilities/formatCurrency.js"
import addGlobalEventListener from "./utilities/addGlobalEventListener.js"

const cart = document.querySelector("[data-cart]")

const cartButton = document.querySelector("[data-cart-button]")
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]")

const cartItemTemplate = document.querySelector("#cart-item-template")
const cartItemContainer = document.querySelector("[data-cart-items]")

const cartQuantity = document.querySelector("[data-cart-quantity]")
const cartTotal = document.querySelector("[data-cart-total]")

const SESSION_STORAGE_KEY = "SHOPPING_CART-cart"

const IMAGE_URL = "https://dummyimage.com/210x130"

let shoppingCart = loadCart()

export function setUpShoppingCart() {
	addGlobalEventListener("click", "[data-remove-from-cart-button]", (e) => {
		const id = parseInt(e.target.closest("[data-item]").dataset.itemId)
		removeFromCart(id)
	})

	cartButton.addEventListener("click", () => {
		cartItemsWrapper.classList.toggle("invisible")
	})

	renderCart()
}

function saveCart() {
	sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))
}

function loadCart() {
	const cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
	return JSON.parse(cart) || [] // Default to empty array if nothing in cart
}

export function addToCart(id) {
	// Handle adding multiple of the same item
	// existingItem is undefined unil an item of the same id has been added to the cart. Finds the id of the item that already exists and adds 1 to quantity.
	const existingItem = shoppingCart.find((entry) => entry.id === id)

	if (existingItem) {
		existingItem.quantity++
	} else {
		shoppingCart.push({ id: id, quantity: 1, price: 0 })
	}

	renderCart()
	saveCart()
}

function renderCartItems() {
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

	// Render cart quantity total
	let count = 0
	shoppingCart.forEach((item) => {
		count += item.quantity
	})
	cartQuantity.innerText = count

	// Sum cart total
	const totalCents = shoppingCart.reduce((accumulator, entry) => {
		const item = items.find((i) => entry.id === i.id)
		return accumulator + item.priceCents * entry.quantity
	}, 0)
	cartTotal.innerText = formatCurrency(totalCents / 100)
}

function renderCart() {
	if (shoppingCart.length === 0) {
		hideCart()
	} else {
		showCart()
		renderCartItems()
	}
}

function hideCart() {
	cart.classList.add("invisible")
	cartItemsWrapper.classList.add("invisible")
}

function showCart() {
	cart.classList.remove("invisible")
}

function removeFromCart(id) {
	const existingItem = shoppingCart.find((entry) => entry.id === id)
	if (existingItem == null) return
	shoppingCart = shoppingCart.filter((entry) => entry.id !== id)
	renderCart()
	saveCart()
}
