// Gerencia seleção de perfil e salva dados no localStorage para catálogo
const profiles = document.querySelectorAll(".profile");

profiles.forEach((profile) => {
  profile.addEventListener("click", (event) => {
    event.preventDefault();

    const nome =
      profile.querySelector("figcaption")?.textContent?.trim() || "Perfil";
    const img = profile.querySelector("img")?.src || "";

    localStorage.setItem("perfilAtivoNome", nome);
    localStorage.setItem("perfilAtivoImagem", img);

    window.location.href = profile.href;
  });
});

console.log("index.js carregado");
