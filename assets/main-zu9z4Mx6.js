import"./typography-DGofin8Z.js";const i=document.getElementById("documents-container");function n(e){i.innerHTML=e.map(t=>t.status==="active"?`
                <a href="${t.url}" target="_blank" class="doc-card clickable-card">
                  <div class="doc-info">
                    <h2>${t.title}</h2>
                    <p>${t.description}</p>
                  </div>
                </a>
              `:`
                <div class="doc-card doc-card--upcoming">
                  <div class="doc-info">
                    <h2>${t.title}</h2>
                    <p>${t.description}</p>
                  </div>
                </div>
              `).join("")}const a=[{id:"livret-sanaa",title:"Livret de Cadrage, Pilotage & Alternance (Sanaa SHAHUL HAMEED)",description:"<strong>Version :</strong> 1.0 — Inclut le Gantt, la RACI, le registre des risques et les KPI.",url:"livret-sanaa.html",status:"active"},{id:"facture-proposition",title:"Modèle de Facture / Proposition Commerciale HIVE4DX",description:"<strong>Statut :</strong> Bientôt disponible dans le dépôt Git.",url:"#",status:"upcoming"}];async function s(){try{const e=await fetch("./config/documents.json");if(!e.ok)throw new Error(`HTTP ${e.status}`);const t=await e.json();n(t)}catch(e){console.info("[dashboard] Fetch fallback (file:// context). Using inline data.",e.message),n(a)}}s();
