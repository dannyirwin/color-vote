console.log("Page Loaded");
const baseAPIUrl = "http://localhost:3000/colors/";

document
  .querySelector(".form-button")
  .addEventListener("click", handleAddColorButton);

fetch(baseAPIUrl)
  .then((response) => response.json())
  .then((json) => {
    for (let i in json) {
      createCard(json[i]);
    }
  })
  .catch((error) => console.log(error));

function createCard(color) {
  const card = document.createElement("div");
  const name = document.createElement("h2");
  const votes = document.createElement("p");
  const voteBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  card.classList.add("color-card");
  card.style.background = color.hex;
  card.data = color;

  name.textContent = color.name;
  votes.textContent = color.votes + " Votes";

  voteBtn.textContent = "+1 Vote!";
  voteBtn.onclick = handleVoteButton;

  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-button");
  deleteBtn.onclick = handleDeleteButton;

  card.appendChild(name);
  card.appendChild(votes);
  card.appendChild(voteBtn);
  card.appendChild(deleteBtn);

  document.querySelector("#card-container").appendChild(card);
}

function handleVoteButton(e) {
  e.preventDefault();
  const card = this.parentElement;
  addVote(card);
  updateColorOnAPI(card.data);
}

function handleDeleteButton(e) {
  e.preventDefault();
  const card = this.parentElement;
  card.remove();
  removeColorFromAPI(card.data.id);
}

function handleAddColorButton(e) {
  e.preventDefault();
  let newCardData = createCardData();
  createCard(newCardData);
  postNewCardToAPI(newCardData);
}

function postNewCardToAPI(cardData) {
  //TODO This isn't working yet
  fetch(baseAPIUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });
}

function createCardData() {
  const formData = new FormData(document.querySelector("form"));
  let newColorData = {};
  for (var pair of formData.entries()) {
    newColorData[pair[0]] = pair[1];
  }
  newColorData.votes = 0;
  return newColorData;
}

function addVote(card) {
  card.data.votes += 1;
  card.querySelector("p").innerHTML = card.data.votes + " Votes";
}

function updateColorOnAPI(data) {
  fetch(baseAPIUrl + data.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes: data.votes }),
  });
}

function removeColorFromAPI(id) {
  fetch(baseAPIUrl + id, {
    method: "DELETE",
  });
}
