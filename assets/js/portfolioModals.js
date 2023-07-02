let openIndex = -1;

function openModal(index) {
  let modalId = `project-modal-${index}`;
  document.getElementById(modalId).style.display = "block";
  openIndex = index;
}

function closeModal(index) {
  let modalId = `project-modal-${index}`;
  document.getElementById(modalId).style.display = "none";
  openIndex = -1;
}

function handleModals() {
  // Add onclick event listener to cards
  const projectCards = document.getElementsByClassName("project-preview");

  for (let card of projectCards) {
    let id = card.id;
    let arr = id.split("-");
    let num = parseInt(arr[arr.length - 1]);

    card.addEventListener("click", () => {
      openModal(num);
    });
  }

  // Add onclick event listener to close modal
  window.addEventListener("click", (e) => {
    const element = e.target;

    // When user clicks button or outside
    if (element.classList.contains("modal-close") ||
        element.classList.contains("project-modal")) {
      closeModal(openIndex);
    }
  });

  // Close modal by esc
  window.addEventListener("keydown", (e) => {
    if (openIndex !== -1 && e.key === "Escape") {
      closeModal(openIndex);
    }
  });
}

window.addEventListener("load", handleModals);
