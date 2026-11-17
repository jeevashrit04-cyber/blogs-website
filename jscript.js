
// ===== MOBILE NAVIGATION =====

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

// ===== DARK MODE =====

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeBtn.textContent = "☀️";
        } else {
            themeBtn.textContent = "🌙";
        }
    });
}

// ===== ARTICLE SEARCH =====

const searchInput = document.getElementById("searchInput");
const articles = document.querySelectorAll(".article-card");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";

function filterArticles() {

    const searchText = searchInput
        ? searchInput.value.toLowerCase()
        : "";

    let visibleCount = 0;

    articles.forEach(article => {

        const title = article.querySelector("h3")
            .textContent.toLowerCase();

        const description = article.querySelector("p")
            .textContent.toLowerCase();

        const category = article.dataset.category;

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            article.style.display = "block";
            visibleCount++;
        } else {
            article.style.display = "none";
        }
    });

    if (noResults) {
        noResults.hidden = visibleCount !== 0;
    }
}

if (searchInput) {
    searchInput.addEventListener("input", filterArticles);
}

// ===== CATEGORY FILTER =====

const categoryButtons =
    document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterArticles();
    });
});

// ===== CONTACT FORM =====

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formMessage.textContent =
                "Please fill in all the fields.";
            return;
        }

        formMessage.textContent =
            "Thank you, " + name +
            "! Your message has been received in this demo.";

        contactForm.reset();
    });
}
