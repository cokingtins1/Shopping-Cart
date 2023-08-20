const cartButton = document.querySelector("[data-cart-button]")
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]")

const addToCartButton = document.querySelectorAll("[data-add-to-cart]")

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

// Add items to cart

export function addToCart(id) {
	shoppingCart.push({ id: id, quantity: 1 })
}

