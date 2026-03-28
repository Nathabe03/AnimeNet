// Importações ajustadas para a estrutura de pastas interna do catálogo
// Como o data.js está na mesma pasta que o main.js, usamos './'
import { categories } from "./data.js"; 
import { createCarousel } from "./components/Carousel.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Recupera os dados que o index.js salvou no clique do perfil
  const nomePerfil = localStorage.getItem("perfilAtivoNome");
  const imagemPerfil = localStorage.getItem("perfilAtivoImagem");

  // 2. Localiza os elementos da Navbar no catalogo.html
  const kidsLink = document.querySelector(".kids-link");
  const profileIcon = document.querySelector(".profile-icon");

  // Atualiza o nome do perfil na Navbar
  if (kidsLink) {
    kidsLink.textContent = nomePerfil || "Seu nome";
  }

  // Atualiza a imagem do perfil na Navbar
  if (profileIcon) {
    // Se não houver imagem salva, usa o avatar padrão da Netflix
    profileIcon.src = imagemPerfil || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";
    profileIcon.alt = nomePerfil ? `${nomePerfil} avatar` : "Perfil";
  }

  // 3. Define um padrão caso o localStorage esteja vazio (ex: acesso direto à página)
  if (!nomePerfil || !imagemPerfil) {
    localStorage.setItem("perfilAtivoNome", "Choso");
    // Caminho da imagem ajustado para sair da pasta 'catalogo' e acessar 'assets' na raiz
    localStorage.setItem("perfilAtivoImagem", "../assets/choso-img.jpg");
    
    if (kidsLink) kidsLink.textContent = "Choso";
    if (profileIcon) profileIcon.src = "../assets/choso-img.jpg";
  }

  // 4. Renderiza os conteúdos do data.js no container principal
  const container = document.getElementById("main-content");

  if (container) {
    // Limpa o container antes de injetar os dados para evitar duplicatas
    container.innerHTML = ""; 

    // Percorre cada categoria definida no data.js e cria o carrossel
    categories.forEach((category) => {
      const carousel = createCarousel(category);
      container.appendChild(carousel);
    });
  }
});