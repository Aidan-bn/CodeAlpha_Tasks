const friendsList = document.querySelector(".friends-list");
const posts = document.querySelector(".posts");
const btnLogin = document.querySelector(".login");
const loginDiv = document.querySelector(".login-div");

const connections = [
  {
    name: "Aidan Banteze",
    img: "./assets/images/user.svg",
  },
  {
    name: "Banteze Aidan",
    img: "./assets/images/user.svg",
  },
  {
    name: "Habayo Banteze",
    img: "./assets/images/user.svg",
  },
  {
    name: "Flavian Aidan",
    img: "./assets/images/user.svg",
  },
];

const postsList = [
  {
    name: "Aidan Banteze",
    img: "./assets/images/user.svg",
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit., I like it",
    comment: {
      name: "commenter",
      type: {
        text: "text reply 1",
        image: "./assets/images/user.svg",
      },
    },
  },
  {
    name: "Banteze Aidan",
    img: "./assets/images/user.svg",
    message:
      "Very coll, Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    comment: {
      name: "commenter",
      type: {
        text: "text reply",
        image: "./assets/images/user.svg",
      },
    },
  },
  {
    name: "Habayo Banteze",
    img: "./assets/images/user.svg",
    message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    comment: {
      name: "commenter",
      type: {
        text: "text reply",
        image: "./assets/images/user.svg",
      },
    },
  },
  {
    name: "Flavian Aidan",
    img: "./assets/images/user.svg",
    message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    comment: {
      name: "commenter",
      type: {
        text: "text reply",
        image: "./assets/images/user.svg",
      },
    },
  },
];

const renderConnections = () => {
  friendsList.innerHTML = connections
    .map(
      (connection) => `
        <div class="friend-div">
          <img src='${connection.img}' alt='${connection.name}' class="img-person"/>
          <p>${connection.name}</p>
        </div>`,
    )
    .join("");
};
renderConnections();

const renderPosts = () => {
  posts.innerHTML = postsList
    .map(
      (post) => `
        <div class="post-container">
          <div class="post-header">
            <figure >
              <img src='${post.img}' alt='img' class="post-img">
              <figcaption>${post.name}</figcaption>
            </figure>
            <p>${post.message}</p>
            <button>reply</button>
          </div>
          <p class="commenter">
            <img src="${post.comment.type.image}" alt="commenter" class="commenter-img" />
            ${post.comment.type.text}
          </p>
        </div>
      `,
    )
    .join("");
};
renderPosts();

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  // alert("Clicked once");

  if (loginDiv.innerHTML.trim()) {
    loginDiv.innerHTML = "";
  }

  loginDiv.innerHTML = `
    <form class="login-form">
    <label for="name" class="login-lbl" >
      User name:
        <input type="text" name="name" placeholder="Enter user name" class="login-input" />
      </label>
      <label for="password">
      Password:
        <input type="password" name="password" placeholder="Enter user name" class="login-input" />
      </label>
        <button class="btn-login">Log In</button>
      <div class="register-link">
        <a href="" class="registerLink">Register</a>
      </div>
    </form>
  `;
});

loginDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("registerLink")) {
  
    e.preventDefault();

    loginDiv.innerHTML = `
    <form class="register-form">
    <label for="name" class="register-lbl" >
      User name:
        <input type="text" name="name" placeholder="Enter user name" class="register-input" />
      </label>
      <label for="password">
    <label for="name" class="phone-lbl" >
      User name:
        <input type="text" name="phone" placeholder="Enter phone number" class="register-input" />
      </label>
      <label for="password">
      Password:
        <input type="password" name="password" placeholder="Enter user name" class="register-input" />
      </label>
        <button class="btn-register">Register</button>
    </form>
  `;
  }
});
