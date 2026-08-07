const STORAGE_KEY = "kyleyingjie-portfolio-site-data-v2";
const PUBLISH_TOKEN_STORAGE_KEY = "kyleyingjie-github-publish-token-v1";
const EDITOR_MODE = new URLSearchParams(window.location.search).get("edit") === "1";
const DEFAULT_CATEGORIES = ["Personal Project"];

const DEFAULT_SITE_DATA = {
  appearance: {
    tone: "warm",
    accent: "forest",
    density: "spacious",
    font: "modern",
    textSize: "medium",
    headingSize: "standard"
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
  pages: {
    work: {
      eyebrow: "Visual Designer & 2D Artist",
      title: "Kyle Zhen Yingjie",
      intro: "Visual and UI design for digital games.",
      linkLabel: "Selected work",
      sectionEyebrow: "Selected projects",
      sectionTitle: "Work"
    },
    about: {
      eyebrow: "Profile",
      title: "About",
      experienceTitle: "Experience",
      educationTitle: "Education",
      skillsTitle: "Skills",
      recognitionTitle: "Recognition"
    },
    contact: {
      eyebrow: "Available for projects",
      title: "Let's work together.",
      intro: "For commissions, freelance work, or collaboration enquiries, get in touch.",
      footer: "Kyle Zhen Yingjie - Visual Designer & 2D Artist"
    }
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

const els = {
  navName: document.querySelector("#nav-name"),
  artistRole: document.querySelector("#artist-role"),
  siteTitle: document.querySelector("#site-title"),
  statement: document.querySelector("#artist-statement"),
  workLinkLabel: document.querySelector("#work-link-label"),
  workSectionEyebrow: document.querySelector("#work-section-eyebrow"),
  workSectionTitle: document.querySelector("#work-title"),
  about: document.querySelector("#about-copy"),
  aboutEyebrow: document.querySelector("#about-eyebrow"),
  aboutTitle: document.querySelector("#about-title"),
  experienceTitle: document.querySelector("#experience-title"),
  educationTitle: document.querySelector("#education-title"),
  skillsTitle: document.querySelector("#skills-title"),
  recognitionTitle: document.querySelector("#recognition-title"),
  contactEyebrow: document.querySelector("#contact-eyebrow"),
  contactTitle: document.querySelector("#contact-title"),
  contactCopy: document.querySelector("#contact-copy"),
  contactFooter: document.querySelector("#contact-footer-note"),
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
  lightboxImages: document.querySelector("#lightbox-images"),
  lightboxTitle: document.querySelector("#lightbox-title"),
  lightboxCategory: document.querySelector("#lightbox-category"),
  editorPanel: document.querySelector("#editor-panel"),
  editorForm: document.querySelector("#editor-form"),
  artworkList: document.querySelector("#editor-artwork-list"),
  artworkTemplate: document.querySelector("#artwork-editor-template"),
  timelineTemplate: document.querySelector("#timeline-editor-template"),
  publishButton: document.querySelector("#publish-github"),
  publishStatus: document.querySelector("#publish-status"),
  githubToken: document.querySelector("#github-token"),
  rememberGithubToken: document.querySelector("#remember-github-token"),
  forgetGithubToken: document.querySelector("#forget-github-token")
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
  const profile = { ...fallback.profile, ...(rawData.profile || {}) };
  return {
    appearance: { ...fallback.appearance, ...(rawData.appearance || {}) },
    categories: normaliseCategories(rawData.categories, fallback.categories),
    profile,
    pages: normalisePages(rawData.pages, profile),
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
  const { profile, pages } = siteData;
  applyAppearance();
  const pageName = { about: "About", contact: "Contact" }[document.body.dataset.page];
  document.title = pageName ? `${pageName} - ${profile.name}` : `${profile.name} - ${profile.role}`;
  if (els.navName) els.navName.textContent = profile.name;
  if (els.artistRole) els.artistRole.textContent = pages.work.eyebrow;
  if (els.siteTitle) els.siteTitle.textContent = pages.work.title;
  if (els.statement) els.statement.textContent = pages.work.intro;
  if (els.workLinkLabel) els.workLinkLabel.textContent = pages.work.linkLabel;
  if (els.workSectionEyebrow) els.workSectionEyebrow.textContent = pages.work.sectionEyebrow;
  if (els.workSectionTitle) els.workSectionTitle.textContent = pages.work.sectionTitle;
  if (els.about) els.about.textContent = profile.about;
  if (els.aboutEyebrow) els.aboutEyebrow.textContent = pages.about.eyebrow;
  if (els.aboutTitle) els.aboutTitle.textContent = pages.about.title;
  if (els.experienceTitle) els.experienceTitle.textContent = pages.about.experienceTitle;
  if (els.educationTitle) els.educationTitle.textContent = pages.about.educationTitle;
  if (els.skillsTitle) els.skillsTitle.textContent = pages.about.skillsTitle;
  if (els.recognitionTitle) els.recognitionTitle.textContent = pages.about.recognitionTitle;
  if (els.contactEyebrow) els.contactEyebrow.textContent = pages.contact.eyebrow;
  if (els.contactTitle) els.contactTitle.textContent = pages.contact.title;
  if (els.contactCopy) els.contactCopy.textContent = pages.contact.intro;
  if (els.contactFooter) els.contactFooter.textContent = pages.contact.footer;
  if (els.email) {
    els.email.textContent = profile.email;
    els.email.href = `mailto:${profile.email}`;
  }
  if (els.phone) {
    els.phone.textContent = profile.phone;
    els.phone.href = `tel:${profile.phone.replace(/[^+\d]/g, "")}`;
  }
  if (els.resume) {
    els.resume.textContent = `${profile.cvLabel} \u2197`;
    els.resume.href = profile.cvUrl || "contact.html";
    els.resume.toggleAttribute("download", Boolean(profile.cvUrl && profile.cvUrl.toLowerCase().endsWith(".pdf")));
  }
  renderSocialLinks();
  renderExperience();
  renderEducation();
  renderSkills();
  renderRecognition();
  renderFilters();
  renderGallery();
}

function applyAppearance() {
  const { tone, accent, density, font, textSize, headingSize } = siteData.appearance;
  document.body.dataset.tone = tone;
  document.body.dataset.accent = accent;
  document.body.dataset.density = density;
  document.body.dataset.font = font;
  document.body.dataset.textSize = textSize;
  document.body.dataset.headingSize = headingSize;
}

function renderSocialLinks() {
  if (!els.socialLinks) return;
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
  if (!list) return;
  list.replaceChildren();
  items.forEach((item) => {
    const row = document.createElement("li");
    const summary = item.summary ? `<p class="timeline-summary">${escapeXml(item.summary)}</p>` : "";
    row.innerHTML = `<time>${escapeXml(item.years)}</time><div><strong>${escapeXml(item.role)}</strong><span>${escapeXml(item.place)}</span>${summary}</div>`;
    list.append(row);
  });
}

function renderSkills() {
  if (!els.skills) return;
  els.skills.replaceChildren();
  siteData.skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    els.skills.append(item);
  });
}

function renderRecognition() {
  if (!els.recognition) return;
  els.recognition.replaceChildren();
  siteData.recognition.forEach((award) => {
    const item = document.createElement("li");
    item.textContent = award;
    els.recognition.append(item);
  });
}

function renderFilters() {
  if (!els.filters) return;
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
  if (!els.gallery) return;
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
  if (!els.lightbox) return;
  lightboxIndex = index;
  renderLightboxProject();
  if (!els.lightbox.open) els.lightbox.showModal();
  document.documentElement.classList.add("lightbox-open");
  document.body.classList.add("lightbox-open");
  els.lightbox.scrollTo({ top: 0 });
}

function pageDefaults(profile) {
  return {
    work: {
      eyebrow: profile.role,
      title: profile.name,
      intro: profile.statement,
      linkLabel: "Selected work",
      sectionEyebrow: "Selected projects",
      sectionTitle: "Work"
    },
    about: {
      eyebrow: "Profile",
      title: "About",
      experienceTitle: "Experience",
      educationTitle: "Education",
      skillsTitle: "Skills",
      recognitionTitle: "Recognition"
    },
    contact: {
      eyebrow: "Available for projects",
      title: "Let's work together.",
      intro: "For commissions, freelance work, or collaboration enquiries, get in touch.",
      footer: `${profile.name} - ${profile.role}`
    }
  };
}

function normalisePages(pages, profile) {
  const fallback = pageDefaults(profile);
  return {
    work: { ...fallback.work, ...(pages?.work || {}) },
    about: { ...fallback.about, ...(pages?.about || {}) },
    contact: { ...fallback.contact, ...(pages?.contact || {}) }
  };
}

function closeLightbox() {
  if (els.lightbox && els.lightbox.open) els.lightbox.close();
}

function getArtworkMedia(artwork) {
  if (Array.isArray(artwork.images) && artwork.images.length) return artwork.images;
  return [imageSource(artwork)];
}

function renderLightboxProject() {
  const artwork = lightboxItems[lightboxIndex];
  if (!artwork || !els.lightboxImages) return;
  els.lightboxTitle.textContent = artwork.title;
  els.lightboxCategory.textContent = artwork.category;
  els.lightboxImages.replaceChildren();
  getArtworkMedia(artwork).forEach((source, mediaIndex) => {
    const image = document.createElement("img");
    image.src = source;
    image.alt = `${artwork.title} - image ${mediaIndex + 1}`;
    image.loading = mediaIndex < 2 ? "eager" : "lazy";
    els.lightboxImages.append(image);
  });
}

function setEditorMode() {
  if (!EDITOR_MODE || !els.editorPanel || !els.editorForm) return;
  document.body.classList.add("editor-mode");
  els.editorPanel.hidden = false;
  fillProfileForm();
  renderAppearanceEditor();
  renderCategoryEditor();
  renderCredentialEditors();
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
  const { profile, pages } = siteData;
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
  document.querySelector("#edit-work-eyebrow").value = pages.work.eyebrow;
  document.querySelector("#edit-work-title").value = pages.work.title;
  document.querySelector("#edit-work-intro").value = pages.work.intro;
  document.querySelector("#edit-work-link-label").value = pages.work.linkLabel;
  document.querySelector("#edit-work-section-eyebrow").value = pages.work.sectionEyebrow;
  document.querySelector("#edit-work-section-title").value = pages.work.sectionTitle;
  document.querySelector("#edit-about-eyebrow").value = pages.about.eyebrow;
  document.querySelector("#edit-about-title").value = pages.about.title;
  document.querySelector("#edit-experience-title").value = pages.about.experienceTitle;
  document.querySelector("#edit-education-title").value = pages.about.educationTitle;
  document.querySelector("#edit-skills-title").value = pages.about.skillsTitle;
  document.querySelector("#edit-recognition-title").value = pages.about.recognitionTitle;
  document.querySelector("#edit-contact-eyebrow").value = pages.contact.eyebrow;
  document.querySelector("#edit-contact-title").value = pages.contact.title;
  document.querySelector("#edit-contact-copy").value = pages.contact.intro;
  document.querySelector("#edit-contact-footer").value = pages.contact.footer;
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

function renderTimelineEditor(listId, items, kind) {
  const list = document.querySelector(listId);
  if (!list) return;
  list.replaceChildren();
  items.forEach((item, index) => {
    const fragment = els.timelineTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".timeline-editor-card");
    card.dataset.index = String(index);
    card.querySelector(".timeline-editor-index").textContent = `${kind === "experience" ? "Experience" : "Education"} ${index + 1}`;
    card.querySelector(".timeline-years-input").value = item.years || "";
    card.querySelector(".timeline-role-input").value = item.role || "";
    card.querySelector(".timeline-place-input").value = item.place || "";
    card.querySelector(".timeline-summary-input").value = item.summary || "";
    if (kind === "education") card.querySelector(".timeline-summary-field").hidden = true;
    card.querySelector(".remove-timeline-item").addEventListener("click", () => {
      siteData = normaliseData(readEditorData());
      siteData[kind].splice(index, 1);
      renderCredentialEditors();
    });
    list.append(fragment);
  });
}

function renderLineEditor(listId, items, kind, label) {
  const list = document.querySelector(listId);
  if (!list) return;
  list.replaceChildren();
  items.forEach((item, index) => {
    const row = document.createElement("div");
    const input = document.createElement("input");
    const remove = document.createElement("button");
    row.className = "line-editor-row";
    input.type = "text";
    input.value = item;
    input.placeholder = `${label} ${index + 1}`;
    remove.type = "button";
    remove.className = "quiet-button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      siteData = normaliseData(readEditorData());
      siteData[kind].splice(index, 1);
      renderCredentialEditors();
    });
    row.append(input, remove);
    list.append(row);
  });
}

function renderCredentialEditors() {
  renderTimelineEditor("#experience-editor-list", siteData.experience, "experience");
  renderTimelineEditor("#education-editor-list", siteData.education, "education");
  renderLineEditor("#skills-editor-list", siteData.skills, "skills", "Skill");
  renderLineEditor("#recognition-editor-list", siteData.recognition, "recognition", "Recognition");
}

function addExperience() {
  siteData = normaliseData(readEditorData());
  siteData.experience.push({ years: "", role: "", place: "", summary: "" });
  renderCredentialEditors();
}

function addEducation() {
  siteData = normaliseData(readEditorData());
  siteData.education.push({ years: "", role: "", place: "" });
  renderCredentialEditors();
}

function addSkill() {
  siteData = normaliseData(readEditorData());
  siteData.skills.push("");
  renderCredentialEditors();
}

function addRecognition() {
  siteData = normaliseData(readEditorData());
  siteData.recognition.push("");
  renderCredentialEditors();
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
  const pages = {
    work: {
      eyebrow: document.querySelector("#edit-work-eyebrow").value.trim(),
      title: document.querySelector("#edit-work-title").value.trim(),
      intro: document.querySelector("#edit-work-intro").value.trim(),
      linkLabel: document.querySelector("#edit-work-link-label").value.trim(),
      sectionEyebrow: document.querySelector("#edit-work-section-eyebrow").value.trim(),
      sectionTitle: document.querySelector("#edit-work-section-title").value.trim()
    },
    about: {
      eyebrow: document.querySelector("#edit-about-eyebrow").value.trim(),
      title: document.querySelector("#edit-about-title").value.trim(),
      experienceTitle: document.querySelector("#edit-experience-title").value.trim(),
      educationTitle: document.querySelector("#edit-education-title").value.trim(),
      skillsTitle: document.querySelector("#edit-skills-title").value.trim(),
      recognitionTitle: document.querySelector("#edit-recognition-title").value.trim()
    },
    contact: {
      eyebrow: document.querySelector("#edit-contact-eyebrow").value.trim(),
      title: document.querySelector("#edit-contact-title").value.trim(),
      intro: document.querySelector("#edit-contact-copy").value.trim(),
      footer: document.querySelector("#edit-contact-footer").value.trim()
    }
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
  const readTimeline = (listId, includeSummary) => [...document.querySelectorAll(`${listId} .timeline-editor-card`)].map((card) => ({
    years: card.querySelector(".timeline-years-input").value.trim(),
    role: card.querySelector(".timeline-role-input").value.trim(),
    place: card.querySelector(".timeline-place-input").value.trim(),
    ...(includeSummary ? { summary: card.querySelector(".timeline-summary-input").value.trim() } : {})
  }));
  const readLines = (listId) => [...document.querySelectorAll(`${listId} input`)].map((input) => input.value.trim()).filter(Boolean);
  return {
    appearance: { ...siteData.appearance },
    categories: [...siteData.categories],
    profile,
    pages,
    experience: readTimeline("#experience-editor-list", true),
    education: readTimeline("#education-editor-list", false),
    skills: readLines("#skills-editor-list"),
    recognition: readLines("#recognition-editor-list"),
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
  renderCredentialEditors();
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
      renderCredentialEditors();
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
  renderCredentialEditors();
  renderEditorArtworks();
}

function restorePublishToken() {
  if (!els.githubToken) return;
  try {
    const savedToken = localStorage.getItem(PUBLISH_TOKEN_STORAGE_KEY);
    if (savedToken) {
      els.githubToken.value = savedToken;
      els.rememberGithubToken.checked = true;
    }
  } catch {
    // Some privacy modes block local browser storage; manual entry still works.
  }
}

function forgetPublishToken() {
  try {
    localStorage.removeItem(PUBLISH_TOKEN_STORAGE_KEY);
  } catch {
    // The field is still cleared if storage is unavailable.
  }
  els.githubToken.value = "";
  els.rememberGithubToken.checked = false;
  showPublishStatus("Saved publishing access removed from this device.", "success");
}

function showPublishStatus(message, state = "") {
  if (!els.publishStatus) return;
  els.publishStatus.textContent = message;
  els.publishStatus.hidden = false;
  els.publishStatus.className = `publish-status${state ? ` is-${state}` : ""}`;
}

function slugify(value) {
  const cleaned = String(value || "artwork")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "artwork";
}

function dataUrlDetails(value) {
  const match = String(value || "").match(/^data:([\w/+.-]+);base64,([a-z0-9+/=\s]+)$/i);
  if (!match) return null;
  const extensions = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif"
  };
  return { content: match[2].replace(/\s/g, ""), extension: extensions[match[1].toLowerCase()] || "png" };
}

function encodeTextForGitHub(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function githubHeaders(token) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2026-03-10"
  };
}

async function githubRequest(url, token, options = {}) {
  const response = await fetch(url, { ...options, headers: { ...githubHeaders(token), ...(options.headers || {}) } });
  if (response.ok) return response.status === 204 ? null : response.json();
  let message = `GitHub returned ${response.status}.`;
  try {
    const error = await response.json();
    if (error.message) message = error.message;
  } catch {
    // The status code is enough when GitHub does not return JSON.
  }
  throw new Error(message);
}

async function getGitHubFileSha(owner, repo, branch, path, token) {
  const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(branch)}`;
  const response = await fetch(url, { headers: githubHeaders(token) });
  if (response.status === 404) return null;
  if (!response.ok) {
    let message = `GitHub returned ${response.status}.`;
    try {
      const error = await response.json();
      if (error.message) message = error.message;
    } catch {
      // The status code is enough when GitHub does not return JSON.
    }
    throw new Error(message);
  }
  return (await response.json()).sha;
}

async function saveGitHubFile(owner, repo, branch, path, content, token, message) {
  const sha = await getGitHubFileSha(owner, repo, branch, path, token);
  const endpoint = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path.split("/").map(encodeURIComponent).join("/")}`;
  const body = { message, content, branch };
  if (sha) body.sha = sha;
  await githubRequest(endpoint, token, { method: "PUT", body: JSON.stringify(body) });
}

async function publishToGitHub() {
  const owner = document.querySelector("#github-owner").value.trim();
  const repo = document.querySelector("#github-repo").value.trim();
  const branch = document.querySelector("#github-branch").value.trim() || "main";
  const tokenInput = document.querySelector("#github-token");
  const token = tokenInput.value.trim();
  if (!owner || !repo || !token) {
    showPublishStatus("Enter your GitHub account, repository, and publishing token first.", "error");
    return;
  }

  try {
    if (els.rememberGithubToken.checked) localStorage.setItem(PUBLISH_TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(PUBLISH_TOKEN_STORAGE_KEY);
  } catch {
    // Publishing continues even when this browser does not allow storage.
  }

  els.publishButton.disabled = true;
  showPublishStatus("Preparing your changes...");
  try {
    siteData = normaliseData(readEditorData());
    const publishData = JSON.parse(JSON.stringify(siteData));
    let uploadedImages = 0;

    for (const artwork of publishData.artworks) {
      const image = dataUrlDetails(artwork.image);
      if (!image) continue;
      const fileStem = slugify(artwork.id || artwork.title);
      const path = `assets/projects/${fileStem}/${fileStem}.${image.extension}`;
      showPublishStatus(`Uploading image ${uploadedImages + 1}...`);
      await saveGitHubFile(owner, repo, branch, path, image.content, token, `Upload ${artwork.title || "artwork"}`);
      artwork.image = path;
      uploadedImages += 1;
    }

    showPublishStatus("Publishing your portfolio...");
    const source = `// Generated by the portfolio editor. Replace this project's site-data.js with this file when publishing.\nwindow.PORTFOLIO_PUBLISHED_DATA = ${JSON.stringify(publishData, null, 2)};\n`;
    await saveGitHubFile(owner, repo, branch, "site-data.js", encodeTextForGitHub(source), token, "Publish portfolio updates");

    siteData = normaliseData(publishData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
    renderSite();
    fillProfileForm();
    renderCredentialEditors();
    renderEditorArtworks();
    showPublishStatus(`Published${uploadedImages ? ` ${uploadedImages} image${uploadedImages === 1 ? "" : "s"} and` : ""} your portfolio. Your live site will refresh shortly.`, "success");
  } catch (error) {
    showPublishStatus(`Publish failed: ${error.message}`, "error");
  } finally {
    if (!els.rememberGithubToken.checked) tokenInput.value = "";
    els.publishButton.disabled = false;
  }
}

if (els.lightbox) {
  document.querySelector("#close-lightbox").addEventListener("click", closeLightbox);
  els.lightbox.addEventListener("click", (event) => {
    if (event.target === els.lightbox) closeLightbox();
  });
  els.lightbox.addEventListener("close", () => {
    document.documentElement.classList.remove("lightbox-open");
    document.body.classList.remove("lightbox-open");
  });
}
window.addEventListener("keydown", (event) => {
  if (!els.lightbox || !els.lightbox.open) return;
  if (event.key === "Escape") {
    closeLightbox();
  }
});

if (els.editorForm) {
  restorePublishToken();
  document.querySelector("#add-artwork").addEventListener("click", addArtwork);
  document.querySelector("#add-experience").addEventListener("click", addExperience);
  document.querySelector("#add-education").addEventListener("click", addEducation);
  document.querySelector("#add-skill").addEventListener("click", addSkill);
  document.querySelector("#add-recognition").addEventListener("click", addRecognition);
  document.querySelector("#add-category").addEventListener("click", addCategory);
  document.querySelector("#new-category").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCategory();
    }
  });
  els.editorForm.addEventListener("submit", saveLocalData);
  els.publishButton.addEventListener("click", publishToGitHub);
  els.forgetGithubToken.addEventListener("click", forgetPublishToken);
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
}

renderSite();
setEditorMode();
document.querySelectorAll(".editor-entry").forEach((entry) => {
  entry.hidden = window.location.protocol !== "file:";
});
