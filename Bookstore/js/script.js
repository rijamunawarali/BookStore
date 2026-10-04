console.log("BookStore JavaScript is working!");
let books = [
  {
    name: "Atomic Habits",
    author: "James Clear",
    price: "$12.99",
    image: "images/AtomicHabits.PNG",
    category: "Self Help",
  },
  {
    name: "The Psychology of Money",
    author: "Morgan Housel",
    price: "$14.99",
    image: "images/The Psychology of money.PNG",
    category: "Business",
  },
  {
    name: "It Ends with Us",
    author: "Colleen Hoover",
    price: "$11.99",
    image: "images/It ends with us.PNG",
    category: "Fiction",
  },
  {
    name: "Dune",
    author: "Frank Herbert",
    price: "$15.99",
    image: "images/Dune.PNG",
    category: "Science",
  },
  {
    name: "A Little Life",
    author: "Hanya Yanagihara",
    price: "$15.99",
    image: "images/A Little Life.PNG",
    category: "Fiction",
  },
  {
    name: "Clean Code",
    author: "Robert C. Martin",
    price: "$17.99",
    image: "images/Clean Code.PNG",
    category: "Technology",
  },
];
let cart = [];
let savedCart = localStorage.getItem("cart");
if (savedCart) {
  cart = JSON.parse(savedCart);
}
let booksContainer = document.getElementById("books-container");
let searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      let searchValue = searchInput.value.trim().toLowerCase();

      let featuredBooks = [
        "atomic habits",
        "the psychology of money",
        "it ends with us",
        "dune"
      ];

      if (featuredBooks.includes(searchValue)) {
        window.location.href = `books.html?search=${encodeURIComponent(searchValue)}`;
      }
    }
  });
}
let categories = document.querySelectorAll("[data-category]");
categories.forEach((category) => {
  category.addEventListener("click", () => {
    let selectedCategory = category.dataset.category;

    let filterBooks;

    if (selectedCategory === "All") {
      filterBooks = books;
    } else {
      filterBooks = books.filter((book) => {
        return book.category === selectedCategory;
      });
    }

    booksContainer.innerHTML = "";
    if (filterBooks.length === 0) {
      booksContainer.innerHTML = `
    <div class="col-12 text-center">
      <h4>No result found</h4>
    </div>
  `;
      return;
    }
    filterBooks.forEach((book) => {
      let card = `<div class="col-lg-4 col-md-6 col-12">
        <div class="card h-100">
          <img src="${book.image}" class="card-img-top" alt="${book.name}" />
          <div class="card-body">
            <h5 class="card-title">${book.name}</h5>
            <p class="card-text">${book.author}</p>
            <p class="fw-bold">${book.price}</p>
            <button class="btn btn-dark" data-book="${book.name}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>`;

      booksContainer.innerHTML += card;
    });
  });
});
let cartContainer = document.getElementById("cart-container");
let cartTotal = document.getElementById("cart-total");
if (booksContainer) {
  books.forEach((book) => {
    let card = `<div class="col-lg-4 col-md-6 col-12">
              <div class="card h-100">
                <img
                  src="${book.image}"
                  class="card-img-top"
                  alt="${book.name}"
                />
                <div class="card-body">
                  <h5 class="card-title">${book.name}</h5>
                  <p class="card-text">${book.author}</p>
                  <p class="fw-bold">${book.price}</p>
                 <button class="btn btn-dark" data-book="${book.name}">Add to Cart</button>
                </div>
              </div>
            </div>
            `;
    booksContainer.innerHTML += card;
  });
  booksContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-dark")) {
      let bookName = e.target.dataset.book;

      let existingBook = cart.find((item) => item.name === bookName);

      if (existingBook) {
        existingBook.quantity++;
      } else {
        cart.push({
          name: bookName,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
    }
  });
}
if (searchInput) {
  searchInput.addEventListener("input", () => {
    let searchValue = searchInput.value.toLowerCase();
    let filterBooks = books.filter((book) => {
      return book.name.toLowerCase().includes(searchValue);
    });
    booksContainer.innerHTML = "";
    filterBooks.forEach((book) => {
      let card = `<div class="col-lg-4 col-md-6 col-12">
        <div class="card h-100">
          <img src="${book.image}" class="card-img-top" alt="${book.name}" />
          <div class="card-body">
            <h5 class="card-title">${book.name}</h5>
            <p class="card-text">${book.author}</p>
            <p class="fw-bold">${book.price}</p>
            <button class="btn btn-dark" data-book="${book.name}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>`;
      booksContainer.innerHTML += card;
    });
  });
}
if (cartContainer) {
  cartContainer.innerHTML = `
    <div class="row cart-header">
        <div class="col">Book</div>
        <div class="col">Price</div>
        <div class="col">Quantity</div>
        <div class="col">Total</div>
        <div class="col">Action</div>
    </div>
`;
  cart.forEach((bookName) => {
    let book = books.find((book) => book.name === bookName.name);
    console.log(book);
    cartContainer.innerHTML += `
<div class="row">
    <div class="col">
       <img class="cart-book-image" src="${book.image}" alt="${book.name}">
       ${book.name}
    </div>
    <div class="col">
       ${book.price}
    </div>
    <div class="col">
      <div class="quantity-control">
      <button class="quantity-btn">-</button>
        <span>${bookName.quantity}</span>
      <button class="quantity-btn">+</button>
      </div>
    </div>
    <div class="col">
       <span class="item-total">${book.price}</span>
    </div>
    <div class="col">
    <button class="delete-btn">
        <i class="fa-solid fa-trash"></i>
    </button>
</div>
</div>
`;
  });
}
let totalAmount = 0;
cart.forEach((bookName) => {
  let book = books.find((book) => book.name === bookName.name);
  let price = Number(book.price.replace("$", ""));

  totalAmount += price;
});
if (cartTotal) {
  cartTotal.innerHTML = `
    <div class="grand-total">
      <h4>Grand Total: $${totalAmount.toFixed(2)}</h4>
    </div>
  `;
}

let quantityButtons = document.querySelectorAll(".quantity-btn");
quantityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let quantitySpan = button.parentElement.querySelector("span");
    let quantity = Number(quantitySpan.innerText);
    if (button.innerText === "+") {
      quantity++;
    }
    if (button.innerText === "-") {
      if (quantity > 1) {
        quantity--;
      }
    }
    quantitySpan.innerText = quantity;
    let row = button.closest(".row");
    let bookName = row.querySelector(".col:first-child").innerText.trim();
    let cartItem = cart.find((item) => item.name === bookName);
    if (cartItem) {
      cartItem.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    let price = Number(
      row.querySelector(".col:nth-child(2)").innerText.replace("$", ""),
    );
    let total = price * quantity;
    row.querySelector(".item-total").innerText = "$" + total.toFixed(2);
    let grandTotal = 0;
    document.querySelectorAll(".item-total").forEach((item) => {
      grandTotal += Number(item.innerText.replace("$", ""));
    });
    cartTotal.innerHTML = `
      <div class="grand-total">
      <h4>Grand Total: $${grandTotal.toFixed(2)}</h4>
      </div>
      `;
  });
});
let deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let row = button.closest(".row");
    let bookName = row.querySelector(".col:first-child").innerText.trim();
    cart = cart.filter((item) => item.name !== bookName);
    localStorage.setItem("cart", JSON.stringify(cart));
    row.remove();
    let grandTotal = 0;

    cart.forEach((item) => {
      let book = books.find((book) => book.name === item.name);
      let price = Number(book.price.replace("$", ""));

      grandTotal += price * item.quantity;
    });

    cartTotal.innerHTML = `
      <div class="grand-total">
        <h4>Grand Total: $${grandTotal.toFixed(2)}</h4>
      </div>
    `;
  });
});
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("Please fill all fields.");
      return;
    }

    alert("Message sent successfully!");
  });
}
let confirmOrder = document.getElementById("confirmOrder");

if (confirmOrder) {
  confirmOrder.addEventListener("click", () => {
    alert("Order Successful! Thank you for your order.");
  });
}