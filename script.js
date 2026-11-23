const translations = {
  pt: {
    navAbout:"Sobre", navDiscography:"Discografia", navSolo:"Carreiras solo", navTimeline:"Linha do tempo",
    eyebrow:"UM ARQUIVO MUSICAL • 2013 — PRESENTE",
    heroText:"Explore a jornada musical do BTS — dos primeiros lançamentos aos projetos individuais dos sete integrantes.",
    explore:"Explorar discografia", discover:"Conheça o projeto", heroNote:"FEITO PARA ARMY, COM CARINHO.", scroll:"ROLE PARA EXPLORAR",
    aboutLabel:"O PROJETO", aboutTitle:"Uma jornada, muitas histórias.", aboutLead:"BTS Discography é um espaço dedicado a organizar e celebrar a música do BTS e os caminhos artísticos de seus sete integrantes.",
    aboutText:"Do trabalho em grupo às expressões individuais, este arquivo reúne lançamentos, eras e momentos que ajudam a contar essa trajetória. O conteúdo está em construção e será ampliado aos poucos.",
    discLabel:"MÚSICA EM GRUPO", discTitle:"BTS Discography", discAside:"Álbuns, EPs e projetos<br>lançados como grupo.",
    searchPlaceholder:"Buscar lançamento...", filterAll:"Todos", filterAlbums:"Álbuns", filterEP:"EPs",
    typeAlbum:"ÁLBUM", typeEP:"EP", officialInfo:"Informações oficiais ↗",
    catalogNote:"A seleção acima é apenas uma amostra inicial, não a discografia completa. Consulte a fonte oficial para conferir todos os lançamentos.",
    soloLabel:"CAMINHOS INDIVIDUAIS", soloTitle:"Seven voices. Seven worlds.", soloAside:"Explore as identidades<br>artísticas de cada membro.",
    soloNote:"Esta seção será expandida com álbuns, singles, mixtapes e colaborações de cada integrante.",
    timelineLabel:"AO LONGO DOS ANOS", timelineTitle:"The journey continues.",
    time2013:"O início da jornada musical do BTS.", time2015:"Uma nova fase sonora e conceitual.",
    time2017:"Uma era marcada por uma narrativa sobre amor-próprio.", time2020:"Novos capítulos na discografia do grupo.",
    time2022:"Uma antologia que revisita a trajetória do grupo.",
    closingEyebrow:"BORAHAE, ALWAYS", closingText:"Sete artistas, muitas histórias e uma música que continua encontrando pessoas pelo mundo.",
    officialSite:"Visitar site oficial ↗", footerText:"Projeto independente, feito por fã. Não oficial e sem afiliação à BIGHIT MUSIC ou HYBE."
  },
  en: {
    navAbout:"About", navDiscography:"Discography", navSolo:"Solo careers", navTimeline:"Timeline",
    eyebrow:"A MUSICAL ARCHIVE • 2013 — PRESENT",
    heroText:"Explore BTS's musical journey — from the earliest releases to the individual projects of all seven members.",
    explore:"Explore discography", discover:"About this project", heroNote:"MADE FOR ARMY, WITH LOVE.", scroll:"SCROLL TO EXPLORE",
    aboutLabel:"THE PROJECT", aboutTitle:"One journey, many stories.", aboutLead:"BTS Discography is a space dedicated to organizing and celebrating BTS's music and the artistic paths of its seven members.",
    aboutText:"From group work to individual expression, this archive brings together releases, eras and moments that help tell the story. Content is a work in progress and will grow over time.",
    discLabel:"GROUP RELEASES", discTitle:"BTS Discography", discAside:"Albums, EPs and projects<br>released as a group.",
    searchPlaceholder:"Search releases...", filterAll:"All", filterAlbums:"Albums", filterEP:"EPs",
    typeAlbum:"ALBUM", typeEP:"EP", officialInfo:"Official information ↗",
    catalogNote:"The selection above is only an initial sample, not the complete discography. Visit the official source to check all releases.",
    soloLabel:"INDIVIDUAL PATHS", soloTitle:"Seven voices. Seven worlds.", soloAside:"Explore each member's<br>artistic identity.",
    soloNote:"This section will be expanded with each member's albums, singles, mixtapes and collaborations.",
    timelineLabel:"THROUGH THE YEARS", timelineTitle:"The journey continues.",
    time2013:"The beginning of BTS's musical journey.", time2015:"A new sonic and conceptual chapter.",
    time2017:"An era shaped by a narrative about self-love.", time2020:"New chapters in the group's discography.",
    time2022:"An anthology revisiting the group's journey.",
    closingEyebrow:"BORAHAE, ALWAYS", closingText:"Seven artists, countless stories, and music that keeps connecting people around the world.",
    officialSite:"Visit official website ↗", footerText:"Independent fan-made project. Not official and not affiliated with BIGHIT MUSIC or HYBE."
  }
};

let currentLanguage = "pt";
const languageToggle = document.getElementById("languageToggle");

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[language][key]) element.innerHTML = translations[language][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (translations[language][key]) element.placeholder = translations[language][key];
  });
  languageToggle.textContent = language === "pt" ? "EN" : "PT";
  languageToggle.setAttribute("aria-label", language === "pt" ? "Switch to English" : "Mudar para português");
}
languageToggle.addEventListener("click", () => setLanguage(currentLanguage === "pt" ? "en" : "pt"));

const searchInput = document.getElementById("albumSearch");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const releaseCards = [...document.querySelectorAll(".release-card")];
let activeFilter = "all";

function filterReleases() {
  const query = searchInput.value.toLowerCase().trim();
  releaseCards.forEach((card) => {
    const matchesType = activeFilter === "all" || card.dataset.type === activeFilter;
    const matchesSearch = card.dataset.search.toLowerCase().includes(query) ||
      card.querySelector("h3").textContent.toLowerCase().includes(query);
    card.hidden = !(matchesType && matchesSearch);
  });
}
searchInput.addEventListener("input", filterReleases);
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    filterReleases();
  });
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
