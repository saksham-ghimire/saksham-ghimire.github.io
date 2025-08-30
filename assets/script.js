// Functions to show and hide the menu
function showMenu() {
  document.getElementById("sidebar").classList.remove("hidden");
  document
    .getElementById("sidebar")
    .classList.add("fixed", "inset-0", "z-40", "w-full");
  document.getElementById("mobileMenuBtn").classList.add("hidden");
}

function hideMenu() {
  document.getElementById("sidebar").classList.add("hidden");
  document
    .getElementById("sidebar")
    .classList.remove("fixed", "inset-0", "z-40", "w-full");
  document.getElementById("mobileMenuBtn").classList.remove("hidden");
}

// Toggle menu on burger icon click
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const closeMenu = document.getElementById("closeMenu");

  if (menuToggle) {
    menuToggle.addEventListener("click", showMenu);
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", hideMenu);
  }

  // Hide menu when clicking navigation links on mobile
  document.querySelectorAll("#sidebar a").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 768) {
        hideMenu();
      }
    });
  });

  // accordion-functionality
  document.querySelectorAll(".accordion-toggle").forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetId = btn.getAttribute("data-target");
      const content = document.getElementById(targetId);
      const arrow = btn.querySelector(".accordion-arrow");
      if (content.classList.contains("hidden")) {
        content.classList.remove("hidden");
        btn.parentElement.classList.add("self-stretch");
        arrow.classList.add("rotate-180");
      } else {
        content.classList.add("hidden");
        btn.parentElement.classList.remove("self-stretch");
        arrow.classList.remove("rotate-180");
      }
    });
  });

  // Project filtering functionality
  document.querySelectorAll(".project-tab").forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      // Remove active state from all tabs
      document.querySelectorAll(".project-tab").forEach((t) => {
        t.classList.remove("border-primary", "text-primary");
        t.classList.add("border-transparent");
      });
      // Set active state on clicked tab
      tab.classList.add("border-primary", "text-primary");
      tab.classList.remove("border-transparent");

      const category = tab.getAttribute("data-target-category");
      document.querySelectorAll(".project-card").forEach((card) => {
        const cardCategories = card.dataset.category
          ? card.dataset.category.split(",")
          : [];
        if (category === "all" || cardCategories.includes(category)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // scroll functionality
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  if (sections.length > 0 && navLinks.length > 0) {
    // Create the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Loop through each entry (section)
        entries.forEach((entry) => {
          // If a section is intersecting (visible in the viewport)
          if (entry.isIntersecting) {
            // Remove 'active' class from all nav links
            navLinks.forEach((link) => link.classList.remove("text-white"));
            navLinks.forEach((link) => link.classList.add("text-white/60"));

            // Find the nav link that corresponds to the active section and add the 'active' class
            const id = entry.target.id;
            const activeLink = document.querySelector(
              `nav a[data-target="#${id}"]`
            );

            if (activeLink) {
              activeLink.classList.remove("text-white/60");
              activeLink.classList.add("text-white");
            }
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    // Observe each section
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
});

// Articles page
let currentTag = "all";

document.querySelectorAll(".tag-filter").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".tag-filter")
      .forEach((b) => b.classList.remove("bg-primary", "text-white"));
    btn.classList.add("bg-primary", "text-white");
    currentTag = btn.getAttribute("data-tag");
    filterArticles();
  });
});

document
  .getElementById("articleSearch")
  .addEventListener("input", filterArticles);

function filterArticles() {
  const query = document.getElementById("articleSearch").value.toLowerCase();
  document.querySelectorAll(".article-card").forEach((card) => {
    const text = card.innerText.toLowerCase();
    const tags = card.getAttribute("data-tags");
    const tagMatch =
      currentTag === "all" || (tags && tags.includes(currentTag));
    const searchMatch = text.includes(query);
    card.style.display = tagMatch && searchMatch ? "" : "none";
  });
}
