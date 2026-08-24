/**
 * pagination.js
 * Wraps body children into A4 page containers for PDF-like preview on screen.
 * Supports: cover, toc, landscape, and normal pages.
 * Adds page footers with page numbering in screen mode.
 */

export function initPagination() {
  const body = document.body;
  const nodes = Array.from(body.childNodes);

  const pages = [];
  let currentGroup = [];

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
      return;
    }
    if (
      node.nodeName === "SCRIPT" ||
      node.nodeName === "STYLE" ||
      node.nodeName === "LINK"
    ) {
      return;
    }

    if (node.classList && node.classList.contains("page-break")) {
      if (currentGroup.length > 0) {
        pages.push({ type: "normal", nodes: currentGroup });
        currentGroup = [];
      }
      node.remove();
    } else if (
      node.classList &&
      (node.classList.contains("cover-container") ||
        node.classList.contains("toc") ||
        node.classList.contains("landscape-section"))
    ) {
      if (currentGroup.length > 0) {
        pages.push({ type: "normal", nodes: currentGroup });
        currentGroup = [];
      }
      let type = "normal";
      if (node.classList.contains("cover-container")) type = "cover";
      else if (node.classList.contains("toc")) type = "toc";
      else if (node.classList.contains("landscape-section"))
        type = "landscape";

      pages.push({ type: type, element: node });
    } else {
      currentGroup.push(node);
    }
  });

  if (currentGroup.length > 0) {
    pages.push({ type: "normal", nodes: currentGroup });
  }

  pages.forEach((pageData, index) => {
    let pageEl;
    if (pageData.element) {
      pageEl = pageData.element;
      pageEl.classList.add("page");
      if (pageData.type === "landscape") {
        pageEl.classList.add("landscape");
      }
    } else {
      pageEl = document.createElement("div");
      pageEl.className = "page";
      pageData.nodes.forEach((n) => pageEl.appendChild(n));
      body.appendChild(pageEl);
    }

    if (pageData.type !== "cover") {
      const footer = document.createElement("div");
      footer.className = "screen-footer";
      const leftText =
        pageData.type === "landscape"
          ? "HIVE4DX — Annexe de Pilotage"
          : "HIVE4DX — Référentiel Interne de Pilotage";
      footer.innerHTML = `
        <div>${leftText}</div>
        <div>Page ${index + 1} / ${pages.length}</div>
      `;
      pageEl.appendChild(footer);
    }
  });
}
