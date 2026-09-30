const menu = document.getElementById('menu');
    const notice = document.getElementById('notice');
    document.getElementById('close').addEventListener('click', () => notice.close());
    for (let n = 1; n <= 16; n++) {
      const button = document.createElement('button');
      button.className = 'meeting';
      button.type = 'button';
      button.innerHTML = `<span class="number">${String(n).padStart(2,'0')}</span><span class="label">Pertemuan ${n}</span><span class="arrow" aria-hidden="true">›</span>`;
      button.addEventListener('click', async () => {
        const folder = `pertemuan${n}/index.html`;
        if (location.protocol === 'file:') { location.href = folder; return; }
        try {
          const response = await fetch(folder, { method: 'HEAD', cache: 'no-store' });
          if (response.ok) location.href = folder;
          else notice.showModal();
        } catch { notice.showModal(); }
      });
      menu.append(button);
    }