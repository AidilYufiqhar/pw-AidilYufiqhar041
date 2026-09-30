(() => {
  const grid = document.getElementById("meeting-grid");
  const dialog = document.getElementById("notice");
  const message = document.getElementById("notice-message");
  const closeButton = document.getElementById("close-notice");

  if (!grid || !dialog || !message || !closeButton) return;

  const prefix = document.body.dataset.pathPrefix || "";

  const showNotice = (text) => {
    message.textContent = text;
    if (dialog.showModal) dialog.showModal();
    else alert(text);
  };

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  const renderSessions = () => {
    const isEnglish = window.siteLanguage === "en";
    grid.innerHTML = "";

    for (let number = 1; number <= 16; number += 1) {
      const button = document.createElement("button");
      const label = isEnglish ? "Session " : "Pertemuan ";
      button.className = "meeting";
      button.type = "button";
      button.innerHTML = `<span class="number">${String(number).padStart(2, "0")}</span><span class="label">${label}${number}</span><span class="arrow" aria-hidden="true">›</span>`;

      button.addEventListener("click", async () => {
        const path = `${prefix}pertemuan${number}/index.html`;
        const unavailable = isEnglish
          ? `Session ${number} is not available yet. Its index.html page has not been created.`
          : `Halaman Pertemuan ${number} belum tersedia. File index.html belum dibuat.`;

        if (location.protocol === "file:") {
          if (number <= 2) location.href = path;
          else showNotice(unavailable);
          return;
        }

        try {
          const response = await fetch(path, { method: "HEAD", cache: "no-store" });
          if (response.ok) location.href = path;
          else showNotice(unavailable);
        } catch {
          showNotice(isEnglish
            ? "Could not check this page. Please check your connection and try again."
            : "Tidak dapat memeriksa halaman ini. Periksa koneksi lalu coba lagi.");
        }
      });

      grid.append(button);
    }
  };

  window.addEventListener("languagechange", renderSessions);
  renderSessions();
})();
