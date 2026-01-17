// Theme Toggle Functionality with localStorage Persistence and System Preference Detection

// Get references to DOM elements
const themeToggleBtn = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Theme configuration with icons
const themes = {
    light: { name: 'Light', icon: '☀️', class: null },
    dark: { name: 'Dark', icon: '🌙', class: 'dark-theme' },
    'high-contrast': { name: 'High Contrast', icon: '⚡', class: 'high-contrast-theme' }
};

const themeOrder = ['light', 'dark', 'high-contrast'];
let currentThemeIndex = 0;

// Detect system preference for dark mode
function getSystemThemePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only apply system preference if user hasn't manually set a theme
        if (!localStorage.getItem('theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            applyTheme(systemTheme);
            console.log('System theme changed to:', systemTheme);
        }
    });
}

// Apply theme to the page
function applyTheme(themeName) {
    // Remove all theme classes
    body.classList.remove('dark-theme', 'high-contrast-theme');

    // Add animation class to button
    themeToggleBtn.classList.add('changing');

    // Apply new theme
    const theme = themes[themeName];
    if (theme.class) {
        body.classList.add(theme.class);
    }

    // Update button text and icon
    themeText.textContent = theme.name;
    themeIcon.textContent = theme.icon;

    // Update current theme index
    currentThemeIndex = themeOrder.indexOf(themeName);

    // Remove animation class after animation completes
    setTimeout(() => {
        themeToggleBtn.classList.remove('changing');
    }, 500);
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme && themes[savedTheme]) {
        // Use saved preference
        applyTheme(savedTheme);
    } else {
        // Use system preference if no saved theme
        const systemTheme = getSystemThemePreference();
        applyTheme(systemTheme);
        console.log('Using system preference:', systemTheme);
    }
}

// Cycle through themes when button is clicked
themeToggleBtn.addEventListener('click', () => {
    // Move to next theme in the cycle
    currentThemeIndex = (currentThemeIndex + 1) % themeOrder.length;
    const nextTheme = themeOrder[currentThemeIndex];

    // Apply theme
    applyTheme(nextTheme);

    // Save preference to localStorage
    localStorage.setItem('theme', nextTheme);
});

// Initialize theme on page load
initializeTheme();

// Add smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
