"use strict";
const THEME_KEY = 'netflix-theme';
const DARK_MODE_CLASS = 'dark-mode';
const LIGHT_MODE_CLASS = 'light-mode';
class ThemeManager {
    constructor() {
        this.currentTheme = this.getSavedTheme();
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
        this.setupSystemPreference();
    }
    getSavedTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) {
            return saved;
        }
        // Detectar preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    }
    applyTheme(theme) {
        const html = document.documentElement;
        if (theme === 'light') {
            html.classList.remove(DARK_MODE_CLASS);
            html.classList.add(LIGHT_MODE_CLASS);
        }
        else {
            html.classList.remove(LIGHT_MODE_CLASS);
            html.classList.add(DARK_MODE_CLASS);
        }
        localStorage.setItem(THEME_KEY, theme);
        this.currentTheme = theme;
    }
    setupThemeToggle() {
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
            this.updateToggleButtonText();
        }
    }
    updateToggleButtonText() {
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.textContent = this.currentTheme === 'dark' ? '☀️ Claro' : '🌙 Escuro';
        }
    }
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.updateToggleButtonText();
    }
    setupSystemPreference() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
            const handleChange = (e) => {
                if (!localStorage.getItem(THEME_KEY)) {
                    const newTheme = e.matches ? 'light' : 'dark';
                    this.applyTheme(newTheme);
                    this.updateToggleButtonText();
                }
            };
            mediaQuery.addEventListener('change', handleChange);
        }
    }
}
// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeManager();
    });
}
else {
    new ThemeManager();
}
