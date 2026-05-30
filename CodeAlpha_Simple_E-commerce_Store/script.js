const registerForm = document.querySelector(".form-register");
const btnRegister = document.querySelector(".link-register");
const registerDiv = document.querySelector(".register-div");
const btnClose = document.querySelector(".btn-close");
const formLogin = document.querySelector(".formLogin");
// const btnAdds = document.querySelectorAll(".btn-add");
// const btnMinus = document.querySelectorAll(".btn-minus");
const quantity = document.querySelectorAll(".quantity");
const listItems = document.querySelector(".items");
const purchases = document.querySelector(".purchases");

const items = [
  {
    imgSrc: "../images/quoka.jpg",
    alt: "renae",
    caption: "bottle for ridders",
    desc: "Lorem ipsum dolor sit amet consectetur.",
    status: "Available",
    condition: "Brand new",
  },
  {
    imgSrc: "../images/sara.jpg",
    alt: "renae",
    caption: "Shaped bottle ",
    desc: "Lorem ipsum dolor sit amet consectetur.",
    status: "Not available",
    condition: "Used",
  },
  {
    imgSrc: "../images/joan.jpg",
    alt: "renae",
    caption: "for ridders",
    desc: "Lorem ipsum dolor sit amet consectetur.",
    status: "Available",
    condition: "Brand new",
  },
  {
    imgSrc: "../images/quoka.jpg",
    alt: "renae",
    caption: "Shaped bottle for ridders",
    desc: "Lorem ipsum dolor sit amet consectetur.",
    status: "Not available",
    condition: "Sem new",
  },
  ,
  {
    imgSrc: "../images/joan.jpg",
    alt: "renae",
    caption: "for ridders",
    desc: "Lorem ipsum dolor sit amet consectetur.",
    status: "Available",
    condition: "Brand new",
  },
  {
    imgSrc: "../images/joan.jpg",
    alt: "renae",
    caption: "for ridders",
    desc: "Lorem ipsum dolor sit amet consectetur.",
    status: "Available",
    condition: "Brand new",
  },
];

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    const res = await fetch("http://localhost:8080/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    alert("New user registered");
  });
}

if (btnRegister) {
  btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    registerDiv.style.display = "flex";
  });
}

if (btnClose) {
  btnClose.addEventListener("click", () => {
    alert("Close me");
    registerDiv.style.display = "none";
  });
}

if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginDetails = new FormData(formLogin);

    const userInfo = {
      email: loginDetails.get("email"),
      password: loginDetails.get("password"),
    };

    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await res.json();

    if (res.ok) {
      // window.location.href = data.location;
      localStorage.setItem("isLoggedIn", "true");
      const redirectPage =
        localStorage.getItem("redirectAfterLogin") || "order.html";
      window.location.href = redirectPage;
    } else {
      alert(data.message);
    }
  });
}

if (listItems) {
  listItems.innerHTML = items
    .map((item) => {
      return `
  <div class="single-item">
    <figure class="item">
      <img src="${item.imgSrc}" alt="${item.alt}" class="item-img"/>
      <figcaption>${item.caption}</figcaption>
    </figure>
    <div class="items-desc">
      <p>${item.desc}</p>
      <strong style = "color: ${item.status === "Available" ? "green" : "red"}">Status: ${item.status}</strong> <br />
      <strong>Condition: ${item.condition}</strong>
    </div>
    <div class="action">
      <img src="../images/cart-1.svg" alt="buy" class="action-cart"/>
      <button class="btn-add">+</button>
      <strong class="quantity">0</strong>
      <button class="btn-minus">-</button>
    </div>
  </div>`;
    })
    .join("");
}
const cart = {};
if (listItems) {
  listItems.addEventListener("click", (e) => {
    // e.preventDefault();
    const parent = e.target.parentElement;
    const quantity = parent.querySelector(".quantity");

    if (e.target.classList.contains("btn-add")) {
      //const quantity = e.target.parentElement.querySelector('.quantity');
      quantity.textContent = Number(quantity.textContent) + 1;
    }

    if (e.target.classList.contains("btn-minus")) {
      //const quantity = e.target.parentElement.querySelector('.quantity');
      let current = Number(quantity.textContent);
      if (current > 0) {
        quantity.textContent = current - 1;
      }
    }

    if (e.target.classList.contains("action-cart")) {
      // document.querySelector(".purchases").style.display = "block";
      const singleItem = e.target.closest(".single-item");
      const caption = singleItem.querySelector("figcaption").textContent;
      const qty = singleItem.querySelector(".quantity").textContent;

      if (qty <= 0) {
        alert("Please add quantity");
        return;
      }

      const sectedItem = {
        item: caption,
        quantity: qty,
      };

      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

      savedCart.push(sectedItem);

      localStorage.setItem("cart", JSON.stringify(savedCart));
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (!isLoggedIn) {
        localStorage.setItem("redirectAfterLogin", "order.html");
        window.location.href = "login.html";
        return;
      }
      window.location.href = "order.html";
    }
  });
}

function renderCart() {
  if (!purchases) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    purchases.innerHTML = "<h2>No orders selected</h2>";
  }

  purchases.innerHTML = `
    <table class="purchase-table">
      <thead>
        <tr>
          <th>Item name</th>
          <th>Quantity</th>
        </tr>
      </thead>

      <tbody>
        ${cart
          .map(
            (item) => `
          <tr>
            <td>${item.item}</td>
            <td>${item.quantity}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
    <button class="logout">Log Out</button>
  `;
  const btnLogout = document.querySelector(".logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("cart");
      window.location.href = "products.html";
    });
  }
}
renderCart();
