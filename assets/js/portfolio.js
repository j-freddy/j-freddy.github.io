function openModal(index) {
  let modalId = `project-modal-${index}`;
  document.getElementById(modalId).style.display = "block";
}

function closeModal(index) {
  let modalId = `project-modal-${index}`;
  document.getElementById(modalId).style.display = "none";
}

function handleModals() {
  // Add onclick event listener to cards
  const projectCards = document.getElementsByClassName("project-preview");

  for (let card of projectCards) {
    let id = card.id;
    let num = id[id.length - 1];

    card.addEventListener("click", () => {
      openModal(num);
    });
  }

  // Add onclick event listener to modal close button
  const projectModalClose = document
    .getElementsByClassName("project-modal-close");
  
  for (let button of projectModalClose) {
    let id = button.id;
    let num = id[id.length - 1];

    button.addEventListener("click", () => {
      closeModal(num);
    })
  }

  // Add onclick event listener to close modal when user clicks outside
  window.addEventListener("click", (e) => {
    const element = e.target;

    if (element.classList.contains("project-modal")) {
      let id = element.id;
      let num = id[id.length - 1];
      closeModal(num);
    }
  });
}

window.addEventListener("load", () => {
  handleModals();
});
