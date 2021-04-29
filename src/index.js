fetch("http://localhost:3000/colors")
    .then(response => response.json())
    .then(json => {
        for (let i in json) {
            createCard(json[i]);
        }
    })

function createCard(color) {

    const card = document.createElement("div");
    const name = document.createElement("h2");
    const votes = document.createElement("p");
    const voteBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    card.classList.add("color-card");
    card.style.background = color.hex;

    name.textContent = color.name;
    votes.textContent = color.votes + " Votes";

    voteBtn.textContent = "+1 Vote!";
    voteBtn.onclick = addVoteToDisplay;

    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-button");

    card.appendChild(name);
    card.appendChild(votes);
    card.appendChild(voteBtn);
    card.appendChild(deleteBtn);

    document.querySelector("#card-container").appendChild(card);
}

function addVoteToDisplay() {
    const currentText = this.parentElement.querySelector("p").innerHTML;
}
