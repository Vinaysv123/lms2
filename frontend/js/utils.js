import { auth } from './api.js';

export function showAlert(message, type = 'info') {
  const alertsContainer = document.getElementById('alerts');
  if (!alertsContainer) return;

  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; font-size: 1.2rem;">×</button>
  `;

  alertsContainer.appendChild(alert);

  if (type !== 'error') {
    setTimeout(() => alert.remove(), 5000);
  }
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 6;
}

export async function ensureAuthenticated() {
  if (!auth.isAuthenticated()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

export function renderNavigation() {
  const nav = document.createElement('nav');
  nav.innerHTML = `
    <a href="/" class="nav-brand">LMS Platform</a>
    <ul class="nav-links" id="nav-links">
      ${auth.isAuthenticated() ? `
        <li><a href="/dashboard.html">Dashboard</a></li>
        <li><a href="/courses.html">Courses</a></li>
      ` : `
        <li><a href="/">Home</a></li>
      `}
    </ul>
    <div class="user-menu" id="user-menu"></div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);

  if (auth.isAuthenticated()) {
    loadUserMenu();
  }
}

async function loadUserMenu() {
  const userMenu = document.getElementById('user-menu');
  try {
    const user = await auth.getCurrentUser();
    userMenu.innerHTML = `
      <div class="user-avatar" title="${user.name}">${getInitials(user.name)}</div>
      <button class="logout-btn" onclick="handleLogout()">Logout</button>
    `;
  } catch (error) {
    console.error('Failed to load user:', error);
  }
}

export function handleLogout() {
  auth.logout();
  window.location.href = '/';
}

export function renderAlertContainer() {
  const container = document.createElement('div');
  container.id = 'alerts';
  document.body.appendChild(container);
}

export function createLoadingSpinner() {
  const spinner = document.createElement('div');
  spinner.className = 'loading';
  return spinner;
}
