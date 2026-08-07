const STORAGE_KEY = "kyleyingjie-portfolio-site-data-v2";
const EDITOR_MODE = new URLSearchParams(window.location.search).get("edit") === "1";
const DEFAULT_CATEGORIES = ["Personal Project"];

const DEFAULT_SITE_DATA = {
  appearance: {
    tone: "warm",
    accent: "forest",
    density: "spacious"
  },
  categories: DEFAULT_CATEGORIES,
  profile: {
    name: "Kyle Zhen Yingjie",
    role: "Visual Designer & 2D Artist",
    statement: "Visual and UI design for digital games.",
    about: "Detail-oriented, adaptable, and collaborative visual designer with experience creating visual and UI content for digital games.",
    email: "kyleyingjie@gmail.com",
    phone: "+65 8612 3313",
    instagram: "",
    linkedin: "",
    cvUrl: "assets/Kyle_Yingjie_Resume_2026.pdf",
    cvLabel: "Download CV (PDF)"
  },
  experience: [
    {
      years: "Aug 2020 - Mar 2026",
      role: "2D Artist",
      place: "Dynamite Games, Singapore",
      summary: "Created characters, environments, backgrounds, visual effects, UI, and menus for more than 10 launched mobile games."
    },
    {
      years: "Jun - Jul 2021",
      role: "Freelance Visual Designer",
      place: "Iterative Collective, Singapore",
      summary: "Led visual development for Kungfu Dash, covering character design, art direction, animation, and UI/UX."
    },
    {
      years: "Aug 2019 - Aug 2020",
      role: "Digital Artist",
      place: "Digital Mirage, Singapore",
      summary: "Produced photorealistic client visuals from 3D renders through matte painting, digital imaging, and color grading."
    }
  ],
  education: [
    { years: "Jul 2017 - May 2019", role: "Bachelor of Arts (Animation Art)", place: "LASALLE College of the Arts, Singapore - Second Class Honours (Upper Division)" },
    { years: "2011 - 2012", role: "A-Levels", place: "Catholic Junior College, Singapore" }
  ],
  skills: [
    "Illustration",
    "UI Design",
    "Adobe Photoshop",
    "Midjourney",
    "Stable Diffusion",
    "Runway"
  ],
  recognition: [
    "National Youth Film Award 2020 - Best Art Direction (Individual)",
    "Crowbar 2019 - Art Direction Gold, Animation Gold, Editing Silver, Cinematography Bronze (Team)",
    "Cartoons Underground 2019 - Audience Choice and Special Mention (Team)",
    "DigiCon6 Asia 2018 - Next Generation Award (Team)",
    "Crowbar 2018 - Cinematography Silver Award (Team)",
    "Crowbar 2018 - Animation Silver Award (Team)",
    "Crowbar 2018 - Effects Bronze Award (Team)"
  ],
  artworks: [
    {
      id: "for-fun-challenge",
      title: "For Fun Challenge",
      category: "Personal Project",
      aspect: "landscape",
      images: [
        "assets/projects/for-fun-challenge/001_sketches_for_full-team.jpg",
        "assets/projects/for-fun-challenge/002sketches_for_team-indi_start.jpg",
        "assets/projects/for-fun-challenge/003_sketches_for_team-indi_yve.jpg",
        "assets/projects/for-fun-challenge/004sketches_for_team-indi_natan.jpg",
        "assets/projects/for-fun-challenge/005sketches_for_team-indi_balmond.jpg",
        "assets/projects/for-fun-challenge/005sketches_for_team-indi_uranus.jpg",
        "assets/projects/for-fun-challenge/006sketches_for_team-indi_franco.jpg",
        "assets/projects/for-fun-challenge/007sketches_thumbnails_yve.jpg",
        "assets/projects/for-fun-challenge/008sketches_thumbnails_natan.jpg",
        "assets/projects/for-fun-challenge/009sketches_thumbnails_balmond.jpg",
        "assets/projects/for-fun-challenge/010sketches_thumbnails_uranus.jpg",
        "assets/projects/for-fun-challenge/011sketches_thumbnails_franco.jpg",
        "assets/projects/for-fun-challenge/012sketches_for_yve.jpg",
        "assets/projects/for-fun-challenge/013sketches_for_natan.jpg",
        "assets/projects/for-fun-challenge/014sketches_for_balmond.jpg",
        "assets/projects/for-fun-challenge/015sketches_for_uranus.jpg",
        "assets/projects/for-fun-challenge/016sketches_for_franco.jpg"
      ]
    }
  ]
};

let siteData = loadSiteData();
let selectedCategory = "All";
let lightboxItems = [];
let lightboxIndex = 0;
let lightboxMediaItems = [];
let lightboxMediaIndex = 0;

const els = {
  navName: document.querySelector("#nav-name"),
  artistRole: document.querySelector("#artist-role"),
  siteTitle: document.querySelector("#site-title"),
  statement: document.querySelector("#artist-statement"),
  about: document.querySelector("#about-copy"),
  resume: document.querySelector("#resume-link"),
  email: document.querySelector("#contact-email"),
  phone: document.querySelector("#contact-phone"),
  socialLinks: document.querySelector("#social-links"),
  experience: document.querySelector("#experience-list"),
  education: document.querySelector("#education-list"),
  skills: document.querySelector("#skills-list"),
  recognition: document.querySelector("#recognition-list"),
  aboutDialog: document.querySelector("#about-dialog"),
  filters: document.querySelector("#filters"),
  gallery: document.querySelector("#gallery"),
  lightbox: document.querySelector("#lightbox"),
  lightboxImage: document.querySelector("#lightbox-image"),
  lightboxTitle: document.querySelector("#lightbox-title"),
  lightboxCategory: document.querySelector("#lightbox-category"),
  editorPanel: document.querySelector("#editor-panel"),
  editorForm: document.querySelector("#editor-form"),
  artworkList: document.querySelector("#editor-artwork-list"),
  artworkTemplate: document.querySelector("#artwork-editor-template")
};

function cloneDefaultData() {
  return JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
}

function loadSiteData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return normaliseData(JSON.parse(stored));
    return window.PORTFOLIO_PUBLISHED_DATA ? normaliseData(window.PORTFOLIO_PUBLISHED_DATA) : cloneDefaultData();
  } catch {
    return window.PORTFOLIO_PUBLISHED_DATA ? normaliseData(window.PORTFOLIO_PUBLISHED_DATA) : cloneDefaultData();
  }
}

function normaliseData(rawData) {
  const fallback = cloneDefaultData();
  if (!rawData || typeof rawData !== "object") return fallback;
  return {
    appearance: { ...fallback.appearance, ...(rawData.appearance || {}) },
    categories: normaliseCategories(rawData.categories, fallback.categories),
    profile: { ...fallback.profile, ...(rawData.profile || {}) },
    experience: Array.isArray(rawData.experience) ? rawData.experience : fallback.experience,
    education: Array.isArray(rawData.education) ? rawData.education : fallback.education,
    skills: Array.isArray(rawData.skills) ? rawData.skills : fallback.skills,
    recognition: Array.isArray(rawData.recognition) ? rawData.recognition : fallback.recognition,
    artworks: Array.isArray(rawData.artworks) ? rawData.artworks : fallback.artworks
  };
}

function normaliseCategories(categories, fallback) {
  const values = Array.isArray(categories) ? categories : fallback;
  const unique = [...new Set(values.map((category) => String(category).trim()).filter(Boolean))];
  return unique.length ? unique : [...fallback];
}

function getCategories() {
  return ["All", ...siteData.categories];
}

function escapeXml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&apos;", "\"": "&quot;"
  })[character]);
}

function svgData(markup) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`;
}

function placeholderImage(artwork) {
  const label = escapeXml(artwork.title || "Untitled artwork");
  const common = `font-family="Arial, sans-serif" fill="#f8f7f2"`;
  const scenes = {
    verdant: `<rect width="900" height="1250" fill="#17352c"/><circle cx="730" cy="190" r="145" fill="#b9c990"/><path d="M0 780C180 650 255 775 420 635S670 535 900 600V1250H0Z" fill="#315745"/><path d="M0 930C170 800 330 925 540 770S730 805 900 720V1250H0Z" fill="#091e1a"/><path d="M355 1100V390h110v710M240 540h340M180 690h460" stroke="#d5d6ad" stroke-width="15" fill="none"/>`,
    archipelago: `<rect width="1250" height="780" fill="#7ea0a4"/><rect y="430" width="1250" height="350" fill="#1d4640"/><circle cx="208" cy="165" r="90" fill="#e4dba7"/><path d="M0 470C135 340 235 525 390 400s210 55 370-48 290-15 490-125v553H0Z" fill="#e5e2d1"/><path d="M95 530 440 295l170 120 260-240 160 175" stroke="#214e46" stroke-width="14" fill="none"/>`,
    sunder: `<rect width="900" height="900" fill="#1d2825"/><path d="M0 100h900v690H0z" fill="#cad0be"/><path d="M0 300 420 100 900 350v550H0Z" fill="#759070"/><path d="M100 780 300 410l180 330 210-420 120 460" fill="#193a34"/><circle cx="730" cy="230" r="74" fill="#ecddad"/>`,
    wayfinder: `<rect width="900" height="1250" fill="#e5e2d7"/><rect x="92" y="110" width="716" height="1030" rx="30" fill="#173b32"/><circle cx="450" cy="545" r="218" fill="none" stroke="#d2e0bc" stroke-width="8"/><circle cx="450" cy="545" r="145" fill="none" stroke="#769c83" stroke-width="32" stroke-dasharray="17 23"/><path d="M450 275v540M180 545h540" stroke="#d2e0bc" stroke-width="5"/><path d="m448 355 84 196-84 180-78-180z" fill="#e9d79b"/><rect x="158" y="918" width="584" height="65" rx="10" fill="#6d947c"/><rect x="158" y="1010" width="370" height="28" rx="10" fill="#b9caa8"/>`,
    fieldnotes: `<rect width="1250" height="780" fill="#e7e2d0"/><path d="M0 610 265 270l215 185 165-300 265 260 340-120v485H0Z" fill="#335a4a"/><path d="M0 700 310 430l180 162 170-270 260 230 330-80v308H0Z" fill="#173a33"/><path d="M104 110h350M104 165h260M104 220h420" stroke="#416a56" stroke-width="13"/><circle cx="1010" cy="176" r="82" fill="#e1c985"/>`,
    relic: `<rect width="900" height="1250" fill="#d6d2bd"/><path d="M310 1050 240 350l210-150 190 150-88 700z" fill="#2b4e42"/><circle cx="450" cy="465" r="130" fill="#d8c77e"/><path d="M450 350v225M335 465h230" stroke="#254338" stroke-width="15"/><path d="M125 1080h650" stroke="#577361" stroke-width="12"/><circle cx="180" cy="200" r="44" fill="#517c68"/><circle cx="720" cy="870" r="68" fill="#e8e1c4"/>`,
    marrow: `<rect width="900" height="1250" fill="#233530"/><circle cx="450" cy="430" r="210" fill="#e1d5b6"/><path d="M208 1240c18-330 142-510 242-510s235 178 245 510" fill="#5d7d68"/><path d="M290 365c30-220 305-265 338 12-103-80-231-72-338-12" fill="#1b2523"/><circle cx="375" cy="445" r="13" fill="#17352c"/><circle cx="523" cy="445" r="13" fill="#17352c"/><path d="M388 560q62 48 126 0" stroke="#17352c" stroke-width="13" fill="none"/>`,
    ferro: `<rect width="900" height="900" fill="#bbc8b8"/><circle cx="450" cy="410" r="225" fill="#274b3e"/><path d="M260 820c20-242 102-360 192-360s185 117 198 360" fill="#d7d9c9"/><path d="M325 360c26-155 208-184 250 0v167H325Z" fill="#d8c87f"/><rect x="412" y="460" width="75" height="90" rx="20" fill="#e8e4d3"/><path d="M170 215 320 145M730 215 580 145" stroke="#294d40" stroke-width="25"/>`
  };
  const dimensions = artwork.aspect === "landscape" ? "1250 780" : artwork.aspect === "square" ? "900 900" : "900 1250";
  const scene = scenes[artwork.placeholder] || scenes.sunder;
  return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dimensions}" role="img"><title>${label}</title>${scene}<rect x="30" y="30" width="250" height="42" rx="21" fill="#f8f7f2" fill-opacity=".9"/><text x="50" y="58" font-size="20" ${common} fill="#17352c">PLACEHOLDER STUDY</text></svg>`);
}

function imageSource(artwork) {
  if (Array.isArray(artwork.images) && artwork.images.length) return artwork.images[0];
  return artwork.image && artwork.image.trim() ? artwork.image.trim() : placeholderImage(artwork);
}

function renderSite() {
  const { profile } = siteData;
  applyAppearance();
  document.title = `${profile.name} - ${profile.role}`;
  els.navName.textContent = profile.name;
  els.artistRole.textContent = profile.role;
  els.siteTitle.textContent = profile.name;
  els.statement.textContent = profile.statement;
  els.about.textContent = profile.about;
  els.email.textContent = profile.email;
  els.email.href = `mailto:${profile.email}`;
  els.phone.textContent = profile.phone;
  els.phone.href = `tel:${profile.phone.replace(/[^+\d]/g, "")}`;
  els.resume.textContent = `${profile.cvLabel} \u2197`;
  els.resume.href = profile.cvUrl || "#contact";
  els.resume.toggleAttribute("download", Boolean(profile.cvUrl && profile.cvUrl.toLowerCase().endsWith(".pdf")));
  renderSocialLinks();
  renderExperience();
  renderEducation();
  renderSkills();
  renderRecognition();
  renderFilters();
  renderGallery();
}

function applyAppearance() {
  const { tone, accent, density } = siteData.appearance;
  document.body.dataset.tone = tone;
  document.body.dataset.accent = accent;
  document.body.dataset.density = density;
}

function renderSocialLinks() {
  els.socialLinks.replaceChildren();
  [["Instagram", siteData.profile.instagram], ["LinkedIn", siteData.profile.linkedin]].forEach(([label, url]) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = label;
    els.socialLinks.append(link);
  });
}

function renderExperience() {
  renderTimeline(els.experience, siteData.experience);
}

function renderEducation() {
  renderTimeline(els.education, siteData.education);
}

function renderTimeline(list, items) {
  list.replaceChildren();
  items.forEach((item) => {
    const row = document.createElement("li");
    const summary = item.summary ? `<p class="timeline-summary">${escapeXml(item.summary)}</p>` : "";
    row.innerHTML = `<time>${escapeXml(item.years)}</time><div><strong>${escapeXml(item.role)}</strong><span>${escapeXml(item.place)}</span>${summary}</div>`;
    list.append(row);
  });
}

function renderSkills() {
  els.skills.replaceChildren();
  siteData.skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    els.skills.append(item);
  });
}

function renderRecognition() {
  els.recognition.replaceChildren();
  siteData.recognition.forEach((award) => {
    const item = document.createElement("li");
    item.textContent = award;
    els.recognition.append(item);
  });
}

function renderFilters() {
  els.filters.replaceChildren();
  const categories = getCategories();
  if (!categories.includes(selectedCategory)) selectedCategory = "All";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${category === selectedCategory ? " is-active" : ""}`;
    button.textContent = category;
    button.setAttribute("aria-pressed", String(category === selectedCategory));
    button.addEventListener("click", () => {
      selectedCategory = category;
      renderFilters();
      renderGallery();
    });
    els.filters.append(button);
  });
}

function renderGallery() {
  els.gallery.replaceChildren();
  lightboxItems = siteData.artworks.filter((artwork) => selectedCategory === "All" || artwork.category === selectedCategory);
  if (!lightboxItems.length) {
    els.gallery.innerHTML = '<p class="empty-gallery">No artwork in this category yet.</p>';
    return;
  }
  lightboxItems.forEach((artwork, index) => {
    const card = document.createElement("button");
    const image = document.createElement("img");
    const meta = document.createElement("span");
    const title = document.createElement("span");
    const category = document.createElement("span");
    card.type = "button";
    card.className = "artwork-card";
    image.src = imageSource(artwork);
    image.alt = artwork.title;
    image.loading = "lazy";
    meta.className = "artwork-meta";
    title.textContent = artwork.title;
    category.textContent = artwork.category;
    meta.append(title, category);
    card.append(image, meta);
    card.addEventListener("click", () => openLightbox(index));
    els.gallery.append(card);
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  lightboxMediaItems = getArtworkMedia(lightboxItems[lightboxIndex]);
  lightboxMediaIndex = 0;
  showLightboxItem();
  if (!els.lightbox.open) els.lightbox.showModal();
}

function getArtworkMedia(artwork) {
  if (Array.isArray(artwork.images) && artwork.images.length) return artwork.images;
  return [imageSource(artwork)];
}

function showLightboxItem() {
  const artwork = lightboxItems[lightboxIndex];
  if (!artwork) return;
  els.lightboxImage.src = lightboxMediaItems[lightboxMediaIndex] || imageSource(artwork);
  els.lightboxImage.alt = artwork.title;
  els.lightboxTitle.textContent = artwork.title;
  els.lightboxCategory.textContent = lightboxMediaItems.length > 1
    ? `${artwork.category} - ${lightboxMediaIndex + 1} / ${lightboxMediaItems.length}`
    : artwork.category;
}

function moveLightbox(direction) {
  if (!lightboxItems.length) return;
  if (lightboxMediaItems.length > 1) {
    lightboxMediaIndex = (lightboxMediaIndex + direction + lightboxMediaItems.length) % lightboxMediaItems.length;
    showLightboxItem();
    return;
  }
  lightboxIndex = (lightboxIndex + direction + lightboxItems.length) % lightboxItems.length;
  lightboxMediaItems = getArtworkMedia(lightboxItems[lightboxIndex]);
  lightboxMediaIndex = 0;
  showLightboxItem();
}

function setEditorMode() {
  if (!EDITOR_MODE) return;
  document.body.classList.add("editor-mode");
  els.editorPanel.hidden = false;
  fillProfileForm();
  renderAppearanceEditor();
  renderCategoryEditor();
  renderEditorArtworks();
}

function renderCategoryEditor() {
  const categoryList = document.querySelector("#category-editor-list");
  categoryList.replaceChildren();
  siteData.categories.forEach((category) => {
    const chip = document.createElement("div");
    const removeButton = document.createElement("button");
    chip.className = "category-editor-chip";
    chip.textContent = category;
    removeButton.type = "button";
    removeButton.className = "quiet-button";
    removeButton.textContent = "Remove";
    removeButton.disabled = siteData.categories.length === 1;
    removeButton.addEventListener("click", () => removeCategory(category));
    chip.append(removeButton);
    categoryList.append(chip);
  });
}

function renderAppearanceEditor() {
  document.querySelectorAll(".style-choice").forEach((button) => {
    const isSelected = siteData.appearance[button.dataset.styleGroup] === button.dataset.styleValue;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function fillProfileForm() {
  const { profile } = siteData;
  document.querySelector("#edit-name").value = profile.name;
  document.querySelector("#edit-role").value = profile.role;
  document.querySelector("#edit-statement").value = profile.statement;
  document.querySelector("#edit-about").value = profile.about;
  document.querySelector("#edit-email").value = profile.email;
  document.querySelector("#edit-phone").value = profile.phone;
  document.querySelector("#edit-instagram").value = profile.instagram;
  document.querySelector("#edit-linkedin").value = profile.linkedin;
  document.querySelector("#edit-cv-url").value = profile.cvUrl;
  document.querySelector("#edit-cv-label").value = profile.cvLabel;
}

function renderEditorArtworks() {
  els.artworkList.replaceChildren();
  siteData.artworks.forEach((artwork, index) => {
    const fragment = els.artworkTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".artwork-editor-card");
    card.dataset.id = artwork.id;
    card.querySelector(".artwork-index").textContent = `Artwork ${index + 1}`;
    card.querySelector(".artwork-title-input").value = artwork.title;
    const category = card.querySelector(".artwork-category-input");
    getCategories().slice(1).forEach((categoryName) => {
      const option = new Option(categoryName, categoryName, false, categoryName === artwork.category);
      category.add(option);
    });
    card.querySelector(".artwork-image-input").value = artwork.image || "";
    card.querySelector(".delete-artwork").addEventListener("click", () => {
      siteData.artworks = siteData.artworks.filter((item) => item.id !== artwork.id);
      renderEditorArtworks();
    });
    card.querySelector(".artwork-upload-input").addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        card.querySelector(".artwork-image-input").value = reader.result;
      });
      reader.readAsDataURL(file);
    });
    els.artworkList.append(fragment);
  });
}

function readEditorData() {
  const profile = {
    name: document.querySelector("#edit-name").value.trim(),
    role: document.querySelector("#edit-role").value.trim(),
    statement: document.querySelector("#edit-statement").value.trim(),
    about: document.querySelector("#edit-about").value.trim(),
    email: document.querySelector("#edit-email").value.trim(),
    phone: document.querySelector("#edit-phone").value.trim(),
    instagram: document.querySelector("#edit-instagram").value.trim(),
    linkedin: document.querySelector("#edit-linkedin").value.trim(),
    cvUrl: document.querySelector("#edit-cv-url").value.trim(),
    cvLabel: document.querySelector("#edit-cv-label").value.trim()
  };
  const cards = [...els.artworkList.querySelectorAll(".artwork-editor-card")];
  const artworks = cards.map((card) => {
    const existing = siteData.artworks.find((artwork) => artwork.id === card.dataset.id) || {};
    return {
      ...existing,
      id: card.dataset.id,
      title: card.querySelector(".artwork-title-input").value.trim() || "Untitled artwork",
      category: card.querySelector(".artwork-category-input").value,
      image: card.querySelector(".artwork-image-input").value.trim()
    };
  });
  return {
    appearance: { ...siteData.appearance },
    categories: [...siteData.categories],
    profile,
    experience: siteData.experience,
    education: siteData.education,
    skills: siteData.skills,
    recognition: siteData.recognition,
    artworks
  };
}

function addArtwork() {
  siteData = normaliseData(readEditorData());
  siteData.artworks.push({
    id: `artwork-${Date.now()}`,
    title: "Untitled artwork",
    category: siteData.categories[0],
    placeholder: "sunder",
    aspect: "square",
    image: ""
  });
  renderEditorArtworks();
}

function addCategory() {
  const input = document.querySelector("#new-category");
  const category = input.value.trim();
  if (!category || siteData.categories.includes(category)) return;
  siteData = normaliseData(readEditorData());
  siteData.categories.push(category);
  input.value = "";
  renderCategoryEditor();
  renderEditorArtworks();
}

function removeCategory(category) {
  if (siteData.categories.length === 1) return;
  siteData = normaliseData(readEditorData());
  siteData.categories = siteData.categories.filter((item) => item !== category);
  const fallbackCategory = siteData.categories[0];
  siteData.artworks = siteData.artworks.map((artwork) => artwork.category === category ? { ...artwork, category: fallbackCategory } : artwork);
  renderCategoryEditor();
  renderEditorArtworks();
}

function saveLocalData(event) {
  event.preventDefault();
  siteData = normaliseData(readEditorData());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
  renderSite();
  fillProfileForm();
  renderEditorArtworks();
}

function downloadData() {
  siteData = normaliseData(readEditorData());
  const file = new Blob([JSON.stringify(siteData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "portfolio-site-data.json";
  link.click();
  URL.revokeObjectURL(url);
}

function downloadPublishFile() {
  siteData = normaliseData(readEditorData());
  const source = `// Generated by the portfolio editor. Replace this project's site-data.js with this file when publishing.\nwindow.PORTFOLIO_PUBLISHED_DATA = ${JSON.stringify(siteData, null, 2)};\n`;
  const file = new Blob([source], { type: "text/javascript" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "site-data.js";
  link.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      siteData = normaliseData(JSON.parse(reader.result));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
      renderSite();
      fillProfileForm();
      renderEditorArtworks();
    } catch {
      window.alert("That file is not valid portfolio site data.");
    }
  });
  reader.readAsText(file);
  event.target.value = "";
}

function resetData() {
  siteData = cloneDefaultData();
  localStorage.removeItem(STORAGE_KEY);
  renderSite();
  fillProfileForm();
  renderAppearanceEditor();
  renderCategoryEditor();
  renderEditorArtworks();
}

document.querySelector("#close-lightbox").addEventListener("click", () => els.lightbox.close());
document.querySelector("#previous-artwork").addEventListener("click", () => moveLightbox(-1));
document.querySelector("#next-artwork").addEventListener("click", () => moveLightbox(1));
els.lightbox.addEventListener("click", (event) => {
  if (event.target === els.lightbox) els.lightbox.close();
});
document.querySelector("#open-about").addEventListener("click", () => els.aboutDialog.showModal());
document.querySelector("#close-about").addEventListener("click", () => els.aboutDialog.close());
els.aboutDialog.addEventListener("click", (event) => {
  if (event.target === els.aboutDialog) els.aboutDialog.close();
});
window.addEventListener("keydown", (event) => {
  if (!els.lightbox.open) return;
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

document.querySelector("#add-artwork").addEventListener("click", addArtwork);
document.querySelector("#add-category").addEventListener("click", addCategory);
document.querySelector("#new-category").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addCategory();
  }
});
els.editorForm.addEventListener("submit", saveLocalData);
document.querySelector("#export-data").addEventListener("click", downloadData);
document.querySelector("#export-publish-file").addEventListener("click", downloadPublishFile);
document.querySelector("#import-data").addEventListener("change", importData);
document.querySelector("#reset-data").addEventListener("click", resetData);
document.querySelectorAll(".style-choice").forEach((button) => {
  button.addEventListener("click", () => {
    siteData.appearance[button.dataset.styleGroup] = button.dataset.styleValue;
    applyAppearance();
    renderAppearanceEditor();
  });
});
document.querySelector("#edit-cv-upload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    document.querySelector("#edit-cv-url").value = reader.result;
  });
  reader.readAsDataURL(file);
});

renderSite();
setEditorMode();
document.querySelector(".editor-entry").hidden = window.location.protocol !== "file:";
