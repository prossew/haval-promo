// ─── MODAL ───────────────────────────────────────────────────
const overlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalBody = document.querySelector(".modal__body");
const modalSuccess = document.getElementById("modalSuccess");
const phoneInput = document.getElementById("phoneInput");
const submitBtn = document.getElementById("modalSubmit");

function openModal() {
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  setTimeout(() => phoneInput && phoneInput.focus(), 320);
  modalBody.classList.remove("is-hidden");
  modalSuccess.classList.remove("is-visible");
  if (phoneInput) phoneInput.value = "";
}

function closeModal() {
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".open-modal").forEach((btn) => {
  btn.addEventListener("click", openModal);
});

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.startsWith("7") || val.startsWith("8")) val = val.slice(1);

    let result = "+7";
    if (val.length > 0) result += " (" + val.substring(0, 3);
    if (val.length >= 4) result += ") " + val.substring(3, 6);
    if (val.length >= 7) result += "-" + val.substring(6, 8);
    if (val.length >= 9) result += "-" + val.substring(8, 10);

    e.target.value = result;
  });

  phoneInput.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && phoneInput.value === "+7") {
      e.preventDefault();
      phoneInput.value = "";
    }
  });
}

submitBtn.addEventListener("click", () => {
  const phone = phoneInput.value.replace(/\D/g, "");
  if (phone.length < 11) {
    phoneInput.style.borderColor = "#e53e3e";
    phoneInput.focus();
    phoneInput.addEventListener(
      "input",
      () => {
        phoneInput.style.borderColor = "";
      },
      { once: true }
    );
    return;
  }

  console.log("Phone submitted:", phone);
  modalBody.classList.add("is-hidden");
  modalSuccess.classList.add("is-visible");
  setTimeout(closeModal, 3000);
});

document.querySelectorAll(".car-card__colors").forEach((group) => {
  const card = group.closest(".car-card");
  const carImg = card.querySelector(".car-card__img");

  group.querySelectorAll(".color-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      group.querySelectorAll(".color-dot").forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      const newSrc = dot.dataset.img;
      if (newSrc && carImg) {
        carImg.style.opacity = "0";
        setTimeout(() => {
          carImg.src = newSrc;
          carImg.style.opacity = "1";
        }, 200);
      }
    });
  });
});

document.querySelectorAll(".car-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest("button, a")) return;
    document.querySelectorAll(".car-card").forEach((c) => c.classList.remove("car-card--selected"));
    card.classList.add("car-card--selected");
  });
});
