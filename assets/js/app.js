'use strict';

/*
 * CONFIGURAÇÃO PRINCIPAL
 * Substitua o endereço abaixo pelo link real do checkout (Hotmart, Kiwify etc.).
 */
const CHECKOUT_URL = 'https://pay.hotmart.com/SEU-CHECKOUT';

const buyButtons = document.querySelectorAll('.js-buy');
const isCheckoutConfigured = !CHECKOUT_URL.includes('SEU-CHECKOUT');

buyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!isCheckoutConfigured) {
      window.alert('Antes de publicar, configure o link de compra no arquivo assets/js/app.js.');
      return;
    }
    window.location.href = CHECKOUT_URL;
  });
});

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('.accordion-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.accordion-item');
    const open = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });
});

const openModal = (name) => {
  const modal = document.getElementById(`modal-${name}`);
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.modal__panel')?.focus();
};

const closeModal = (modal) => {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('[data-modal-open]').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.modalOpen));
});

document.querySelectorAll('[data-modal-close]').forEach((button) => {
  button.addEventListener('click', () => closeModal(button.closest('.modal')));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal(document.querySelector('.modal:not([hidden])'));
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('is-visible'));
}

document.getElementById('ano').textContent = new Date().getFullYear();
