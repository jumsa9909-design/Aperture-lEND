'use strict';
const dialog = document.querySelector('#info-dialog');
const title = document.querySelector('#dialog-title');
const content = document.querySelector('#dialog-content');
let previousFocus;
function openDialog(heading, markup) {
  previousFocus = document.activeElement;
  title.textContent = heading;
  content.innerHTML = markup;
  dialog.showModal();
}
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
dialog.addEventListener('close', () => previousFocus?.focus());
const pages = {
  gear: ['The tools that we use.', '<p>Explore the cameras, lenses and accessories featured in our gear cage.</p><ul><li>Digital cameras and interchangeable lenses</li><li>Film cameras and instant photography</li><li>Lighting and on-location accessories</li></ul><p>This is a portfolio demonstration; no equipment shop is connected.</p>'],
  style: ['Style guide', '<p>Poppins Regular. White and silver text on a black background. Uppercase labels use 2px letter spacing.</p><p>Desktop layout based on the original 1440px Figma frame.</p>'],
  instructions: ['Instructions', '<p>Use the navigation to explore photography services, featured images and equipment. Press Escape to close dialogs.</p><p>Contact and newsletter forms are demonstrations: they do not transmit personal data.</p>'],
  changelog: ['Changelog', '<p>Version 1.0 — desktop implementation in HTML, CSS and vanilla JavaScript, with original Figma assets, anchor navigation and accessible dialogs.</p>'],
  licensing: ['Licensing', '<p>This page is an implementation of the supplied Aperture Figma design for a technical assignment. Images, logos and design belong to their respective owners. No commercial rights are claimed.</p><p>Poppins is distributed under the SIL Open Font License.</p>']
};
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  const card = document.getElementById(button.dataset.service);
  openDialog(card.querySelector('h3').textContent, '<p></p><p>Interested in a project? Use “Get in touch” in the contact section.</p>');
  content.querySelector('p').textContent = card.querySelector('p').textContent;
}));
document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.dialog === 'contact') {
    openDialog('Get in touch', '<p>Demo form — your message will not be sent.</p><form id="contact-form"><label>Your name<input name="name" autocomplete="name" required></label><label>Email address<input type="email" name="email" autocomplete="email" required></label><label>Your project<textarea name="message" required></textarea></label><button class="submit" type="submit">Submit demo</button><p role="status" id="contact-status"></p></form>');
    content.querySelector('form').addEventListener('submit', event => { event.preventDefault(); content.querySelector('#contact-status').textContent = 'Form validated. This demo does not send or save your message.'; });
  } else openDialog(...pages[button.dataset.dialog]);
}));
document.querySelector('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#newsletter-status').textContent = 'Demo only — no subscription created and no email stored.';
});
document.querySelectorAll('[data-social]').forEach(button => button.addEventListener('click', () => openDialog(button.dataset.social, '<p>No official social profile was supplied with this design.</p>')));
