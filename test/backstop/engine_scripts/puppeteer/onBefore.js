// SPDX-FileCopyrightText: 2026 Sergei Mukhin
// SPDX-License-Identifier: MIT

module.exports = async (page, scenario, viewport) => {
  console.log('SCENARIO > ' + scenario.label);
  
  // Force light color scheme
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'light' }
  ]);
};
