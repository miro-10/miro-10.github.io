const menuData = [
  { category: "한식", name: "제육" },
  { category: "한식", name: "순대국밥" },
  { category: "한식", name: "김치찌개" },
  { category: "중식", name: "짜장면" },
  { category: "중식", name: "짬뽕" },
  { category: "중식", name: "마라탕" },
  { category: "일식", name: "돈까스" },
  { category: "일식", name: "가츠동" },
  { category: "분식", name: "라볶이" },
  { category: "분식", name: "햄버거" }
];

let currentFilter = "전체";

const menuListEl = document.getElementById("menu-list");
const menuCountEl = document.getElementById("menu-count");
const slotTextEl = document.getElementById("slot-text");
const resultCatEl = document.getElementById("result-category");
const spinBtn = document.getElementById("spin-btn");

function renderMenus() {
  const filtered = currentFilter === "전체"
    ? menuData
    : menuData.filter(item => item.category === currentFilter);

  menuCountEl.textContent = filtered.length;
  menuListEl.innerHTML = "";

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `<span class="tag">#${item.category}</span><h3>${item.name}</h3>`;
    menuListEl.appendChild(card);
  });
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.dataset.category;
    renderMenus();
  });
});

spinBtn.addEventListener("click", () => {
  const pool = currentFilter === "전체"
    ? menuData
    : menuData.filter(item => item.category === currentFilter);

  spinBtn.disabled = true;
  resultCatEl.textContent = "추첨 중...";

  let count = 0;
  const interval = setInterval(() => {
    const randomItem = pool[Math.floor(Math.random() * pool.length)];
    slotTextEl.textContent = randomItem.name;
    count++;

    if (count > 15) {
      clearInterval(interval);
      const finalChoice = pool[Math.floor(Math.random() * pool.length)];
      resultCatEl.textContent = `🎉 ${finalChoice.category} 당첨!`;
      slotTextEl.textContent = finalChoice.name;
      spinBtn.disabled = false;
    }
  }, 70);
});

renderMenus();