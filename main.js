const getUsersBtn = document.getElementById("get-users-btn");
const userCardGrid = document.querySelector(".user-card-grid");
const loader = document.getElementById("loader");

let hasFetchedData = false;

getUsersBtn.addEventListener("click", async () => {
  if (!hasFetchedData) {
    loader.style.display = "block";

    try {
      const response = await fetch("https://reqres.in/api/users?page=1");
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 2500)); 

      if (data.data) {
        userCardGrid.innerHTML = "";

          data.data.forEach((user) => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");

            const userImage = document.createElement("img");
            userImage.src = user.avatar;

            const userInfo = document.createElement("div");
            userInfo.classList.add("user-info");

            const userName = document.createElement("span");
            userName.classList.add("user-name");

            userName.textContent = `${user.first_name} ${user.last_name}`;

            const userEmail = document.createElement("span");

            userEmail.classList.add("user-email");
            userEmail.textContent = user.email;

            userInfo.appendChild(userName);

            userInfo.appendChild(userEmail);

            userCard.appendChild(userImage);

            userCard.appendChild(userInfo);

            userCardGrid.appendChild(userCard);

          });
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loader.style.display = "none";
      hasFetchedData = true; // Set flag to prevent further execution
    }
  } else {
    console.log("Data already fetched");
  }
});
