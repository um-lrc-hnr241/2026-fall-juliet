/* Progressive enhancement: without JavaScript, all stop articles remain readable. */
(() => {
  const cards = Array.from(document.querySelectorAll(".stop-card"));
  const progress = document.getElementById("journey-progress");
  const previous = document.getElementById("previous-stop");
  const next = document.getElementById("next-stop");
  const scene = document.querySelector(".travel-scene");
  if (!cards.length || !progress || !previous || !next) return;

  let current = 0;

  function showStop(index, moveFocus = false) {
    current = Math.max(0, Math.min(index, cards.length - 1));
    cards.forEach((card, cardIndex) => {
      card.hidden = cardIndex !== current;
    });
    progress.textContent = `Stop ${current + 1} of ${cards.length}`;
    previous.disabled = current === 0;
    next.disabled = current === cards.length - 1;
    if (scene) scene.dataset.stop = String(current + 1);
    if (moveFocus) cards[current].querySelector("h3").focus({ preventScroll: true });
  }

  cards.forEach((card, index) => {
    const heading = card.querySelector("h3");
    if (heading) heading.tabIndex = -1;
    const link = document.querySelector(`.journey-stops a[href="#${card.id}"]`);
    if (link) link.addEventListener("click", () => showStop(index));
  });

  previous.addEventListener("click", () => showStop(current - 1));
  next.addEventListener("click", () => showStop(current + 1));
  showStop(0);
})();
