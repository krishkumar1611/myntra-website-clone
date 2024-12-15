let bagItems;
onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem('bagItems');
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
  
  // Attach the search functionality
  setupSearchBar();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = 'hidden';
  }
}

function displayItemsOnHomePage(filteredItems = items) {
  let itemsContainerElement = document.querySelector('.items-container');
  if (!itemsContainerElement) {
    return;
  }
  let innerHtml = '';
  
  filteredItems.forEach(item => {
    innerHtml += `
    <div class="item-container">
      <img class="item-image" src="${item.image}" alt="item image">
      <div class="rating">
          ${item.rating.stars} ⭐ | ${item.rating.count}
      </div>
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="btn-add-wishlist"  onclick="addToWishlist(${item.id})"><span  style={margin-top=10px} class="material-symbols-outlined">
      <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
      </div>
      
      <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
favorite
</span></div> <!-- Heart Button -->
    </div>`;
  });
  
  itemsContainerElement.innerHTML = innerHtml;
}

function setupSearchBar() {
  const searchInput = document.querySelector('.search_input');
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filter the items based on the search term
    const filteredItems = items.filter(item => 
      item.item_name.toLowerCase().includes(searchTerm) || 
      item.company.toLowerCase().includes(searchTerm)
    );
    
    // Display the filtered items
    displayItemsOnHomePage(filteredItems);
  });
}


let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

// Add item to the wishlist
function addToWishlist(itemId) {
  // Ensure the itemId is a string to match the item ID structure
  itemId = String(itemId);

  // Check if the item is already in the wishlist
  if (!wishlistItems.includes(itemId)) {
    wishlistItems.push(itemId); // Add the item to the wishlist array
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems)); // Store updated wishlist in localStorage
    alert("Item added to Wishlist!");
    displayWishlistIcon(); // Optionally update the wishlist icon count
  } else {
    alert("This item is already in your wishlist!"); // Notify the user
  }
}

// Function to update the wishlist icon with the current count
function displayWishlistIcon() {
  let wishlistItemCount = document.querySelector('.wishlist-item-count');
  if (wishlistItems.length > 0) {
    wishlistItemCount.style.visibility = 'visible';
    wishlistItemCount.innerText = wishlistItems.length; // Update count
  } else {
    wishlistItemCount.style.visibility = 'hidden'; // Hide the icon if there are no items
  }
}

// Attach event listeners to the heart icons (in the product listing)
function setupHeartButtons() {
  const heartButtons = document.querySelectorAll('.heart-icon');
  heartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const itemId = e.target.getAttribute('data-item-id'); // Get item ID from button's data attribute
      addToWishlist(itemId); // Call addToWishlist with the clicked item's ID
    });
  });
}

// Initial setup
function onLoad() {
  let bagItemsStr = localStorage.getItem('bagItems');
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemsOnHomePage();

  setupSearchBar();
  setupHeartButtons(); // Attach event listeners for heart icons
}

onLoad();