let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
let wishlistItemObjects = [];

onLoad();

function onLoad() {
  loadWishlistItems();
  displayWishlistItems();
}

function loadWishlistItems() {
  wishlistItemObjects = wishlistItems.map(itemId => {
    // Find the item by comparing string IDs
    return items.find(item => String(item.id) === String(itemId)); // Ensure both item.id and itemId are strings
  }).filter(item => item !== undefined); // Remove undefined values in case some IDs don't match
}

function displayWishlistItems() {
  const containerElement = document.querySelector('#container');
  if (!containerElement) {
    return;
  }
  
  let innerHTML = '';

  if (wishlistItemObjects.length > 0) {
    wishlistItemObjects.forEach(wishlistItem => {
      innerHTML += generateWishlistItemHTML(wishlistItem);
    });
  } else {
    innerHTML = `<div class="empty-wishlist-message">Your wishlist is empty. Start adding items!</div>`;
  }

  containerElement.innerHTML = innerHTML;
}

function generateWishlistItemHTML(item) {
  return `
    <div class="wishlist-item-container">
      <div class="item-left-part">
        <img class="wishlist-item-img" src="../${item.image}" alt="${item.item_name}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
        </div>
      </div>
      <div class="remove-from-wishlist" onclick="removeFromWishlist(${item.id})">Remove From Whislist</div>
    </div>`;
}
function removeFromWishlist(itemId) {
    // Ensure itemId is a string to match the stored data in wishlistItems
    itemId = String(itemId);
  
    // Remove the item from the wishlist array
    wishlistItems = wishlistItems.filter(itemIdInWishlist => itemIdInWishlist !== itemId);
    
    // Update the localStorage with the new wishlist
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    
    // Refresh the wishlist UI
    loadWishlistItems();
    displayWishlistItems();
  }