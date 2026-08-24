/**
 * metadata-loader.js
 * Fetches metadata from a JSON config file and injects values
 * into DOM elements by their ID. Falls back silently when running
 * from file:// protocol.
 */

/**
 * @param {Object} fieldMap - Maps element IDs to accessor functions: { id: meta => value }
 * @param {string} configUrl - Path to the JSON metadata file
 * @param {Function} [onApply] - Optional callback after metadata is applied
 */
export async function loadMetadata(fieldMap, configUrl, onApply) {
  try {
    const res = await fetch(configUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const meta = await res.json();

    for (const [id, getValue] of Object.entries(fieldMap)) {
      const el = document.getElementById(id);
      if (el) el.textContent = getValue(meta);
    }

    if (onApply) onApply(meta);
  } catch (err) {
    // Running via file:// or fetch unavailable — values already in HTML, do nothing.
    console.info(
      "[cadrage] Metadata fetch skipped (file:// context). Using static HTML values.",
      err.message,
    );
  }
}
