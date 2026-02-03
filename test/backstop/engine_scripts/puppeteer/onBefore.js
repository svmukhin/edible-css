// SPDX-FileCopyrightText: 2026 Sergei Mukhin
// SPDX-License-Identifier: MIT

module.exports = async (page, scenario, viewport) => {
  console.log('SCENARIO > ' + scenario.label);
  
  // Force light color scheme
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'light' }
  ]);
  
  // Disable animations for consistent screenshots
  await page.evaluateOnNewDocument(() => {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `;
    document.head.appendChild(style);
  });
  
  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  
  // Additional delay to ensure rendering is complete
  await new Promise(resolve => setTimeout(resolve, 500));
};
