/* ==========================================================================
   AutoLK Generator - Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // ELEMENT MAPPINGS (Input ID => Output Sheet Element ID)
  const bindings = [
    { input: 'input-judul-lk', output: 'val-judul-lk' },
    { input: 'input-no-order', output: 'val-no-order' },
    { input: 'input-nama-team', output: 'val-nama-team' },
    { input: 'input-admin-cs', output: 'val-admin-cs' },
    { input: 'input-designer', output: 'val-designer' },
    { input: 'input-layouter', output: 'val-layouter' },
    { input: 'input-no-nota', output: 'val-no-nota' },
    { input: 'input-mesin-icc', output: 'val-mesin-icc' },
    { input: 'input-jenis-sublim', output: 'val-jenis-sublim' },
    { input: 'input-tgl-masuk', output: 'val-tgl-masuk' },
    { input: 'input-tgl-design', output: 'val-tgl-design' },
    { input: 'input-tgl-layout', output: 'val-tgl-layout' },
    { input: 'input-tgl-print', output: 'val-tgl-print' },
    { input: 'input-tgl-press', output: 'val-tgl-press' },
    { input: 'input-tgl-jahit', output: 'val-tgl-jahit' },
    { input: 'input-kerah', output: 'val-kerah' },
    { input: 'input-total-pcs', output: 'val-total-pcs' },
    { input: 'input-kain', output: 'val-kain' },
    { input: 'input-ket-kumis', output: 'val-ket-kumis' },
    { input: 'input-ket-bantalan', output: 'val-ket-bantalan' },
    { input: 'input-ket-celana', output: 'val-ket-celana' },
    { input: 'input-ket-lengan', output: 'val-ket-lengan' },
    { input: 'input-ket-gender', output: 'val-ket-gender' },
    { input: 'input-ket-logo', output: 'val-ket-logo' },
    { input: 'input-keterangan', output: 'val-keterangan' },
    { input: 'input-no-order', output: 'val-p2-no-order' },
    { input: 'input-nama-team', output: 'val-p2-nama-team' },
    { input: 'input-admin-cs', output: 'val-p2-admin-cs' },
    { input: 'input-total-pcs', output: 'val-p2-total-pcs' }
  ];

  // 1. LIVE INPUT BINDING
  bindings.forEach(({ input, output }) => {
    const inputEl = document.getElementById(input);
    const outputEl = document.getElementById(output);

    if (inputEl && outputEl) {
      inputEl.addEventListener('input', () => {
        outputEl.textContent = inputEl.value;
      });
    }
  });

  // TEMA WARNA HANDLER
  const inputWarnaLk = document.getElementById('input-warna-lk');
  const colorHexText = document.getElementById('color-hex-text');
  const presetBtns = document.querySelectorAll('.btn-color-preset');

  function setLkThemeColor(colorHex) {
    document.documentElement.style.setProperty('--lk-blue', colorHex);
    if (inputWarnaLk) inputWarnaLk.value = colorHex;
    if (colorHexText) colorHexText.textContent = colorHex.toUpperCase();

    presetBtns.forEach(btn => {
      if (btn.getAttribute('data-color').toLowerCase() === colorHex.toLowerCase()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  if (inputWarnaLk) {
    inputWarnaLk.addEventListener('input', (e) => {
      setLkThemeColor(e.target.value);
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      setLkThemeColor(color);
    });
  });

  // 2. TAB SWITCHING LOGIC
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // 3. IMAGE UPLOAD & DROPZONE LOGIC
  const dropzone = document.getElementById('dropzone');
  const btnPickFile = document.getElementById('btn-pick-file');
  const fileInput = document.getElementById('input-mockup-file');
  const mockupImg = document.getElementById('mockup-img');
  const mockupPlaceholder = document.getElementById('mockup-placeholder');
  const imageActions = document.getElementById('image-actions');
  const btnRemoveImage = document.getElementById('btn-remove-image');
  const fitRadios = document.querySelectorAll('input[name="fit-mode"]');

  function handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      mockupImg.src = e.target.result;
      mockupImg.classList.remove('hidden');
      mockupPlaceholder.classList.add('hidden');
      imageActions.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  // Trigger file input when mobile pick button or dropzone is tapped/clicked
  if (btnPickFile) {
    btnPickFile.addEventListener('click', () => fileInput.click());
  }

  if (dropzone) {
    dropzone.addEventListener('click', () => fileInput.click());
  }

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    if (dropzone) {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    }
  });

  ['dragleave', 'drop'].forEach(eventName => {
    if (dropzone) {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    }
  });

  if (dropzone) {
    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageFile(e.dataTransfer.files[0]);
      }
    });
  }

  // Support pasting image directly from clipboard (Ctrl + V)
  document.addEventListener('paste', (e) => {
    const items = e.clipboardData && e.clipboardData.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          handleImageFile(blob);
          const mockupTabBtn = document.querySelector('[data-tab="tab-mockup"]');
          if (mockupTabBtn) mockupTabBtn.click();
          break;
        }
      }
    }
  });

  btnRemoveImage.addEventListener('click', () => {
    fileInput.value = '';
    mockupImg.src = '';
    mockupImg.classList.add('hidden');
    mockupPlaceholder.classList.remove('hidden');
    imageActions.classList.add('hidden');
  });

  // Fit Mode Toggle (Contain vs Cover)
  function updateFitModeUI(val) {
    const containOpt = document.getElementById('fit-option-contain');
    const coverOpt = document.getElementById('fit-option-cover');

    if (val === 'cover') {
      mockupImg.classList.add('fit-cover');
      if (coverOpt) coverOpt.classList.add('active');
      if (containOpt) containOpt.classList.remove('active');
    } else {
      mockupImg.classList.remove('fit-cover');
      if (containOpt) containOpt.classList.add('active');
      if (coverOpt) coverOpt.classList.remove('active');
    }
  }

  fitRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      updateFitModeUI(e.target.value);
    });
  });

  // 4. "TODAY" BUTTON FUNCTIONALITY FOR DATES
  const monthNamesID = [
    "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
    "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
  ];

  function getFormattedToday() {
    const today = new Date();
    const d = today.getDate();
    const m = monthNamesID[today.getMonth()];
    const y = today.getFullYear();
    return `${d} ${m} ${y}`;
  }

  document.querySelectorAll('.btn-today').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetInput = document.getElementById(targetId);
      if (targetInput) {
        targetInput.value = getFormattedToday();
        targetInput.dispatchEvent(new Event('input'));
      }
    });
  });

  // 4. DAFTAR NAMA & SIZE MANAGEMENT LOGIC
  const playerTableBody = document.getElementById('player-table-body');
  const p2PlayerBody = document.getElementById('p2-player-table-body');
  const sheetSizeSummary = document.getElementById('sheet-size-summary');
  const p2SizeSummary = document.getElementById('p2-size-summary');
  const sizeSummaryList = document.getElementById('size-summary-list');
  const btnAddRow = document.getElementById('btn-add-row');
  const btnParseQuick = document.getElementById('btn-parse-quick');
  const inputQuickPaste = document.getElementById('input-quick-paste');
  const inputTotalPcs = document.getElementById('input-total-pcs');

  let playersData = [
    { name: 'AAN', number: '10', size: 'M', sleeve: 'Panjang', gender: 'Laki-Laki', logo: true },
    { name: 'IKMAL', number: '7', size: 'M', sleeve: 'Pendek', gender: 'Laki-Laki', logo: true },
    { name: 'RINA', number: '05', size: 'S', sleeve: 'Panjang', gender: 'Perempuan', logo: false }
  ];

  function renderPlayerTables() {
    if (!playerTableBody || !p2PlayerBody) return;

    playerTableBody.innerHTML = '';
    p2PlayerBody.innerHTML = '';

    const sizeMap = {};
    let totalQty = playersData.length;
    let grandPjg = 0, grandPdk = 0, grandPria = 0, grandWanita = 0, grandLogo = 0, grandNoLogo = 0;

    playersData.forEach((player, idx) => {
      const sizeVal = (player.size || 'M').toUpperCase();
      const sleeveVal = player.sleeve || 'Pendek';
      const genderVal = player.gender || 'Laki-Laki';
      const isLogo = player.logo !== false;

      if (!sizeMap[sizeVal]) {
        sizeMap[sizeVal] = { total: 0, pjg: 0, pdk: 0, pria: 0, wanita: 0, logo: 0, nologo: 0 };
      }
      sizeMap[sizeVal].total += 1;

      if (sleeveVal === 'Panjang') { sizeMap[sizeVal].pjg++; grandPjg++; }
      else { sizeMap[sizeVal].pdk++; grandPdk++; }

      if (genderVal === 'Perempuan') { sizeMap[sizeVal].wanita++; grandWanita++; }
      else { sizeMap[sizeVal].pria++; grandPria++; }

      if (isLogo) { sizeMap[sizeVal].logo++; grandLogo++; }
      else { sizeMap[sizeVal].nologo++; grandNoLogo++; }

      // 1. Sidebar Input Row
      const trInput = document.createElement('tr');
      trInput.innerHTML = `
        <td style="text-align:center; font-weight:700; color:var(--text-muted);">${idx + 1}</td>
        <td><input type="text" class="inp-player-name" value="${player.name || ''}" placeholder="Nama"></td>
        <td><input type="text" class="inp-player-num" value="${player.number || ''}" placeholder="No"></td>
        <td><input type="text" class="inp-player-size" value="${player.size || 'M'}" placeholder="Size"></td>
        <td>
          <select class="inp-player-sleeve">
            <option value="Pendek" ${sleeveVal === 'Pendek' ? 'selected' : ''}>Pendek</option>
            <option value="Panjang" ${sleeveVal === 'Panjang' ? 'selected' : ''}>Panjang</option>
          </select>
        </td>
        <td>
          <select class="inp-player-gender">
            <option value="Laki-Laki" ${genderVal === 'Laki-Laki' ? 'selected' : ''}>Laki-Laki</option>
            <option value="Perempuan" ${genderVal === 'Perempuan' ? 'selected' : ''}>Perempuan</option>
          </select>
        </td>
        <td>
          <select class="inp-player-logo">
            <option value="true" ${isLogo ? 'selected' : ''}>Logo</option>
            <option value="false" ${!isLogo ? 'selected' : ''}>No Logo</option>
          </select>
        </td>
        <td>
          <button type="button" class="btn-del-row" data-idx="${idx}" title="Hapus"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></button>
        </td>
      `;
      playerTableBody.appendChild(trInput);

      const inpName = trInput.querySelector('.inp-player-name');
      const inpNum = trInput.querySelector('.inp-player-num');
      const inpSize = trInput.querySelector('.inp-player-size');
      const inpSleeve = trInput.querySelector('.inp-player-sleeve');
      const inpGender = trInput.querySelector('.inp-player-gender');
      const inpLogo = trInput.querySelector('.inp-player-logo');
      const btnDel = trInput.querySelector('.btn-del-row');

      inpName.addEventListener('input', (e) => { playersData[idx].name = e.target.value; renderSheetPlayerTableOnly(); });
      inpNum.addEventListener('input', (e) => { playersData[idx].number = e.target.value; renderSheetPlayerTableOnly(); });
      inpSize.addEventListener('input', (e) => { playersData[idx].size = e.target.value; renderPlayerTables(); });
      inpSleeve.addEventListener('change', (e) => { playersData[idx].sleeve = e.target.value; renderPlayerTables(); });
      inpGender.addEventListener('change', (e) => { playersData[idx].gender = e.target.value; renderPlayerTables(); });
      inpLogo.addEventListener('change', (e) => { playersData[idx].logo = e.target.value === 'true'; renderPlayerTables(); });
      btnDel.addEventListener('click', () => { playersData.splice(idx, 1); renderPlayerTables(); });

      // 2. Sheet Page 2 Output Row
      const trSheet = document.createElement('tr');
      trSheet.innerHTML = `
        <td>${idx + 1}</td>
        <td class="cell-left">${player.name || '-'}</td>
        <td>${player.number || '-'}</td>
        <td><strong>${(player.size || '-').toUpperCase()}</strong></td>
        <td>${sleeveVal === 'Panjang' ? '<span class="tag-sleeve-long">PANJANG</span>' : 'PENDEK'}</td>
        <td>${genderVal === 'Perempuan' ? '<span class="tag-gender-f">PEREMPUAN</span>' : 'LAKI-LAKI'}</td>
        <td>${isLogo ? 'LOGO' : '<span class="tag-no-logo">TANPA LOGO</span>'}</td>
      `;
      p2PlayerBody.appendChild(trSheet);
    });

    if (window.lucide) lucide.createIcons();

    // 3. Render Size Summary Table in Sidebar (Tab 4)
    if (sizeSummaryList) {
      sizeSummaryList.innerHTML = '';
      if (totalQty === 0) {
        sizeSummaryList.innerHTML = '<span class="badge-empty">Belum ada data player</span>';
      } else {
        const table = document.createElement('table');
        table.className = 'sidebar-summary-table';
        
        let tableRowsHtml = '';
        Object.keys(sizeMap).forEach(size => {
          const item = sizeMap[size];
          
          let sleeveStr = [];
          if (item.pdk > 0) sleeveStr.push(`${item.pdk} Pendek`);
          if (item.pjg > 0) sleeveStr.push(`${item.pjg} Panjang`);

          let genderStr = [];
          if (item.pria > 0) genderStr.push(`${item.pria} Laki-Laki`);
          if (item.wanita > 0) genderStr.push(`${item.wanita} Perempuan`);

          let logoStr = [];
          if (item.logo > 0) logoStr.push(`${item.logo} Logo`);
          if (item.nologo > 0) logoStr.push(`${item.nologo} No Logo`);

          tableRowsHtml += `
            <tr>
              <td class="col-size"><span class="size-pill">${size}</span></td>
              <td class="col-qty"><strong>${item.total}</strong> <small>PCS</small></td>
              <td class="col-detail">
                <div class="detail-tags">
                  <span class="tag-chip sleeve">${sleeveStr.join(' • ')}</span>
                  <span class="tag-chip gender">${genderStr.join(' • ')}</span>
                  ${logoStr.length > 0 ? `<span class="tag-chip logo">${logoStr.join(' • ')}</span>` : ''}
                </div>
              </td>
            </tr>
          `;
        });

        table.innerHTML = `
          <thead>
            <tr>
              <th>UKURAN</th>
              <th>JUMLAH</th>
              <th>RINCIAN DETAIL (LENGAN, GENDER, LOGO)</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        `;
        sizeSummaryList.appendChild(table);
      }
    }

    // 4. Render Size Summary Bar in Page 1 and Page 2 Sheets
    let summaryHtml = '';
    if (totalQty === 0) {
      summaryHtml = `
        <div class="size-table-wrapper">
          <div class="size-table-title">
            <span>TABEL RINCIAN UKURAN &amp; SPESIFIKASI PRODUKSI</span>
            <span class="total-badge">TOTAL: 0 PCS</span>
          </div>
          <div class="size-table-empty">BELUM ADA DATA PEMESAN</div>
        </div>
      `;
    } else {
      let rowsHtml = '';
      Object.keys(sizeMap).forEach(size => {
        const item = sizeMap[size];

        let sleeveArr = [];
        if (item.pdk > 0) sleeveArr.push(`<span class="badge-sleeve-pdk">${item.pdk} Lengan Pendek</span>`);
        if (item.pjg > 0) sleeveArr.push(`<span class="badge-sleeve-pjg">${item.pjg} Lengan Panjang</span>`);

        let genderArr = [];
        if (item.pria > 0) genderArr.push(`<span class="badge-gender-m">${item.pria} Model Laki-Laki</span>`);
        if (item.wanita > 0) genderArr.push(`<span class="badge-gender-f">${item.wanita} Model Perempuan</span>`);

        let logoArr = [];
        if (item.logo > 0) logoArr.push(`<span class="badge-logo-yes">${item.logo} Pakai Logo</span>`);
        if (item.nologo > 0) logoArr.push(`<span class="badge-logo-no">${item.nologo} Tanpa Logo</span>`);

        rowsHtml += `
          <tr>
            <td class="col-size-code"><strong>${size}</strong></td>
            <td class="col-size-qty"><strong>${item.total}</strong> PCS</td>
            <td class="col-size-detail">${sleeveArr.join(' &bull; ')}</td>
            <td class="col-size-detail">${genderArr.join(' &bull; ')}</td>
            <td class="col-size-detail">${logoArr.join(' &bull; ')}</td>
          </tr>
        `;
      });

      const grandTotalHtml = `
        <tr class="row-grand-total">
          <td class="col-size-code">TOTAL</td>
          <td class="col-size-qty"><strong>${totalQty}</strong> PCS</td>
          <td class="col-size-detail"><span class="badge-sleeve-pdk">${grandPdk} Pendek</span> &bull; <span class="badge-sleeve-pjg">${grandPjg} Panjang</span></td>
          <td class="col-size-detail"><span class="badge-gender-m">${grandPria} Laki-Laki</span> &bull; <span class="badge-gender-f">${grandWanita} Perempuan</span></td>
          <td class="col-size-detail"><span class="badge-logo-yes">${grandLogo} Logo</span> &bull; <span class="badge-logo-no">${grandNoLogo} Tanpa Logo</span></td>
        </tr>
      `;

      summaryHtml = `
        <div class="size-table-wrapper">
          <div class="size-table-title">
            <span>TABEL RINCIAN UKURAN &amp; SPESIFIKASI PRODUKSI</span>
            <span class="total-badge">TOTAL ORDER: ${totalQty} PCS</span>
          </div>
          <table class="lk-size-breakdown-table">
            <thead>
              <tr>
                <th style="width: 12%;">UKURAN</th>
                <th style="width: 16%;">JUMLAH</th>
                <th style="width: 26%;">JENIS LENGAN</th>
                <th style="width: 26%;">MODEL GENDER</th>
                <th style="width: 20%;">LOGO / EMBLEM</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
              ${grandTotalHtml}
            </tbody>
          </table>
        </div>
      `;
    }

    if (sheetSizeSummary) sheetSizeSummary.innerHTML = summaryHtml;
    if (p2SizeSummary) p2SizeSummary.innerHTML = summaryHtml;

    // 5. Update Total Pcs & Notes fields automatically
    if (totalQty > 0) {
      if (inputTotalPcs) {
        inputTotalPcs.value = `${totalQty} PCS`;
        inputTotalPcs.dispatchEvent(new Event('input'));
      }
      const inpKetLengan = document.getElementById('input-ket-lengan');
      const inpKetGender = document.getElementById('input-ket-gender');
      const inpKetLogo = document.getElementById('input-ket-logo');

      if (inpKetLengan) {
        inpKetLengan.value = `PENDEK: ${grandPdk} | PANJANG: ${grandPjg}`;
        inpKetLengan.dispatchEvent(new Event('input'));
      }
      if (inpKetGender) {
        inpKetGender.value = `LAKI-LAKI: ${grandPria} | PEREMPUAN: ${grandWanita}`;
        inpKetGender.dispatchEvent(new Event('input'));
      }
      if (inpKetLogo) {
        inpKetLogo.value = `PAKAI LOGO: ${grandLogo} | NON LOGO: ${grandNoLogo}`;
        inpKetLogo.dispatchEvent(new Event('input'));
      }
    }
  }

  function renderSheetPlayerTableOnly() {
    if (!p2PlayerBody) return;
    p2PlayerBody.innerHTML = '';
    playersData.forEach((player, idx) => {
      const sleeveVal = player.sleeve || 'Pendek';
      const genderVal = player.gender || 'Laki-Laki';
      const isLogo = player.logo !== false;
      const trSheet = document.createElement('tr');
      trSheet.innerHTML = `
        <td>${idx + 1}</td>
        <td class="cell-left">${player.name || '-'}</td>
        <td>${player.number || '-'}</td>
        <td><strong>${(player.size || '-').toUpperCase()}</strong></td>
        <td>${sleeveVal === 'Panjang' ? '<span class="tag-sleeve-long">PANJANG</span>' : 'PENDEK'}</td>
        <td>${genderVal === 'Perempuan' ? '<span class="tag-gender-f">PEREMPUAN</span>' : 'LAKI-LAKI'}</td>
        <td>${isLogo ? 'LOGO' : '<span class="tag-no-logo">TANPA LOGO</span>'}</td>
      `;
      p2PlayerBody.appendChild(trSheet);
    });
  }

  if (btnAddRow) {
    btnAddRow.addEventListener('click', () => {
      playersData.push({ name: '', number: '', size: 'M', sleeve: 'Pendek', gender: 'Laki-Laki', logo: true });
      renderPlayerTables();
    });
  }

  const knownSizeRegex = /\b(XS|S|M|L|XL|2XL|XXL|3XL|XXXL|4XL|5XL|6XL)\b/i;

  function parseSingleLine(line) {
    let clean = line.trim();
    if (!clean) return null;

    // Strip leading row numbering e.g. "1. ", "1 - ", "1) ", "#1 "
    clean = clean.replace(/^[#0-9]+[\.\-\)\s]+/, '').trim();
    if (!clean) return null;

    let sleeve = 'Pendek';
    let gender = 'Laki-Laki';
    let logo = true;

    // Detect Sleeve keyword
    if (/\b(panjang|pjg|pj|long|longsleeve|lengan\s*panjang)\b/i.test(clean)) {
      sleeve = 'Panjang';
    }

    // Detect Gender keyword
    if (/\b(perempuan|wanita|cewe|cewek|female|p|cew)\b/i.test(clean)) {
      gender = 'Perempuan';
    }

    // Detect Logo keyword
    if (/\b(tanpa\s*logo|no\s*logo|non\s*logo|nologo|tanpa|tidak\s*logo)\b/i.test(clean)) {
      logo = false;
    }

    // Remove brackets around size e.g. "AAN (XL)" -> "AAN XL"
    clean = clean.replace(/\((XS|S|M|L|XL|2XL|XXL|3XL|4XL|5XL)\)/gi, '$1');

    // Case A: Separated by tab, comma, semicolon, dash, or pipe
    if (/[,;\t\-\|]/.test(clean)) {
      const parts = clean.split(/[,;\t\-\|]/).map(p => p.trim()).filter(Boolean);
      let name = parts[0] || 'PLAYER';
      let number = '-';
      let size = 'M';

      for (let i = 1; i < parts.length; i++) {
        const p = parts[i];
        if (knownSizeRegex.test(p)) {
          size = p.toUpperCase();
        } else if (/^\d{1,3}$/.test(p) && number === '-') {
          number = p;
        } else if (name === parts[0] && !/^(panjang|pendek|pria|wanita|logo|no logo|tanpa logo)$/i.test(p) && number === '-' && !knownSizeRegex.test(p)) {
          number = p;
        }
      }

      return { name, number, size, sleeve, gender, logo };
    }

    // Case B: Space separated or unformatted line
    let name = clean;
    let number = '-';
    let size = 'M';

    const sizeMatch = clean.match(knownSizeRegex);
    if (sizeMatch) {
      size = sizeMatch[0].toUpperCase();
      name = name.replace(sizeMatch[0], '').trim();
    }

    const numMatch = name.match(/#?(\d{1,3})\b/);
    if (numMatch) {
      number = numMatch[1];
      name = name.replace(numMatch[0], '').trim();
    }

    // Clean up keywords from name
    name = name.replace(/\b(panjang|pjg|pj|pendek|pdk|pd|perempuan|wanita|pria|laki|cowo|cewe|logo|no\s*logo|tanpa\s*logo|non\s*logo)\b/gi, '').trim();
    name = name.replace(/^[\-\,\.\s]+|[\-\,\.\s]+$/g, '').trim();

    return { name: name || 'PLAYER', number, size, sleeve, gender, logo };
  }

  function executeImportData() {
    if (!inputQuickPaste) return;
    const rawText = inputQuickPaste.value.trim();
    if (!rawText) {
      alert('Silakan tempel teks data player terlebih dahulu!');
      return;
    }

    const lines = rawText.split('\n');
    const newPlayers = [];

    lines.forEach(line => {
      const parsed = parseSingleLine(line);
      if (parsed) newPlayers.push(parsed);
    });

    if (newPlayers.length > 0) {
      playersData = newPlayers;
      renderPlayerTables();
      alert(`Berhasil mengimpor ${newPlayers.length} data player!`);
    } else {
      alert('Format teks tidak terdeteksi. Gunakan format seperti: Nama, No, Size');
    }
  }

  if (btnParseQuick) {
    btnParseQuick.addEventListener('click', (e) => {
      e.preventDefault();
      executeImportData();
    });
  }

  if (inputQuickPaste) {
    inputQuickPaste.addEventListener('paste', () => {
      setTimeout(executeImportData, 100);
    });
  }

  // Initial render
  renderPlayerTables();

  // 5. ZOOM CONTROLS FOR CANVAS PREVIEW
  const scaler = document.getElementById('canvas-scaler');
  const zoomLevelEl = document.getElementById('zoom-level');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnZoomFit = document.getElementById('btn-zoom-fit');

  let currentZoom = 0.9;

  function updateZoom(newZoom) {
    currentZoom = Math.min(Math.max(newZoom, 0.25), 1.8);
    if (scaler) scaler.style.transform = `scale(${currentZoom})`;
    document.documentElement.style.setProperty('--canvas-scale', currentZoom);
    if (zoomLevelEl) zoomLevelEl.textContent = `${Math.round(currentZoom * 100)}%`;
  }

  function autoFitCanvas() {
    const scrollWrapper = document.getElementById('scroll-wrapper');
    if (!scrollWrapper) return;
    const isMobile = window.innerWidth <= 768;
    const paddingOffset = isMobile ? 8 : 60;
    const containerWidth = scrollWrapper.clientWidth - paddingOffset;
    const sheetWidth = 800; // LK sheet width in px
    const fitZoom = Math.min(Math.max(containerWidth / sheetWidth, 0.25), 1.5);
    updateZoom(fitZoom);
  }

  btnZoomIn.addEventListener('click', () => updateZoom(currentZoom + 0.1));
  btnZoomOut.addEventListener('click', () => updateZoom(currentZoom - 0.1));
  btnZoomFit.addEventListener('click', autoFitCanvas);

  // Initial fit adjustment & responsive resize listener
  setTimeout(autoFitCanvas, 100);
  window.addEventListener('resize', autoFitCanvas);

  // MODAL HANDLERS
  const imageModal = document.getElementById('image-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalGeneratedImg = document.getElementById('modal-generated-img');
  const modalDownloadBtn = document.getElementById('modal-download-btn');
  const modalShareBtn = document.getElementById('modal-share-btn');
  const modalCopyBtn = document.getElementById('modal-copy-btn');

  let currentCanvasBlob = null;
  let currentBlobUrl = null;

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      imageModal.classList.add('hidden');
    });
  }

  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        imageModal.classList.add('hidden');
      }
    });
  }

  if (modalShareBtn && navigator.share) {
    modalShareBtn.classList.remove('hidden');
    modalShareBtn.addEventListener('click', async () => {
      if (!currentCanvasBlob) return;
      try {
        const file = new File([currentCanvasBlob], 'LK_BAJU.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'LK Baju',
            text: 'Lembar Kerja Produksi Baju AutoLK',
            files: [file]
          });
        } else if (currentBlobUrl) {
          window.open(currentBlobUrl, '_blank');
        }
      } catch (e) {
        console.log('Share canceled or unsupported', e);
      }
    });
  }

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', async () => {
      if (!currentCanvasBlob) return;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ [currentCanvasBlob.type]: currentCanvasBlob })
        ]);
        alert('Gambar LK berhasil disalin ke clipboard!');
      } catch (err) {
        console.error('Clipboard copy error:', err);
        alert('Browser Anda tidak mendukung salin gambar langsung ke clipboard.');
      }
    });
  }

  // EXPORT DOM REFERENCES
  const btnExportP1 = document.getElementById('btn-export-p1');
  const btnExportP2 = document.getElementById('btn-export-p2');

  function getExportFilename(targetPageId = 'lk-sheet', extension = 'png') {
    const orderNo = document.getElementById('input-no-order')?.value || 'LK_BAJU';
    const teamName = document.getElementById('input-nama-team')?.value || 'PRODUCTION';
    const cleanOrder = orderNo.replace(/[^a-zA-Z0-9_\-]/g, '');
    const cleanTeam = teamName.replace(/[^a-zA-Z0-9_\-]/g, '_');
    const pageLabel = targetPageId === 'lk-sheet-page2' ? 'DETAIL_SIZE' : 'HAL1_UTAMA';
    return `LK_${pageLabel}_${cleanOrder}_${cleanTeam}.${extension}`;
  }

  async function exportSheet(targetPageId = 'lk-sheet', format = 'png') {
    if (typeof html2canvas === 'undefined') {
      alert('Library html2canvas belum dimuat!');
      return;
    }

    const targetEl = document.getElementById(targetPageId);
    if (!targetEl) {
      alert('Elemen LK Sheet tidak ditemukan!');
      return;
    }

    const origTransform = scaler.style.transform;
    scaler.style.transform = 'scale(1)';

    const btn = targetPageId === 'lk-sheet-page2' ? btnExportP2 : btnExportP1;
    const origHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Memproses...`;
      if (window.lucide) lucide.createIcons();
    }

    try {
      // Safe render scale for mobile memory compatibility
      const renderScale = window.innerWidth <= 768 ? 2 : 2.5;

      const canvas = await html2canvas(targetEl, {
        scale: renderScale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false
      });

      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
      const filename = getExportFilename(targetPageId, format);
      const dataUrl = canvas.toDataURL(mimeType, 0.95);

      // Convert canvas to Blob for reliable browser download & mobile share
      canvas.toBlob((blob) => {
        if (!blob) return;
        currentCanvasBlob = blob;

        if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
        currentBlobUrl = URL.createObjectURL(blob);

        // 1. Trigger automatic file download
        const link = document.createElement('a');
        link.download = filename;
        link.href = currentBlobUrl;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
        }, 500);

        // 2. Display Modal Preview
        if (modalGeneratedImg && imageModal) {
          modalGeneratedImg.src = dataUrl;
          if (modalDownloadBtn) {
            modalDownloadBtn.href = currentBlobUrl;
            modalDownloadBtn.download = filename;
          }
          imageModal.classList.remove('hidden');
        }
      }, mimeType, 0.95);

    } catch (err) {
      console.error('Export Error:', err);
      alert('Gagal membuat gambar: ' + (err.message || err));
    } finally {
      scaler.style.transform = origTransform;
      if (btn) {
        btn.innerHTML = origHtml;
        if (window.lucide) lucide.createIcons();
      }
    }
  }

  if (btnExportP1) btnExportP1.addEventListener('click', () => exportSheet('lk-sheet', 'png'));
  if (btnExportP2) btnExportP2.addEventListener('click', () => exportSheet('lk-sheet-page2', 'png'));

  // 7. DRAFT SAVE / LOAD / RESET LOGIC
  const btnSaveDraft = document.getElementById('btn-save-draft');
  const btnLoadDraft = document.getElementById('btn-load-draft');
  const btnReset = document.getElementById('btn-reset');

  btnSaveDraft.addEventListener('click', () => {
    const draftData = {};
    bindings.forEach(({ input }) => {
      draftData[input] = document.getElementById(input).value;
    });
    draftData['mockupImgSrc'] = mockupImg.src || '';
    draftData['warnaLk'] = inputWarnaLk ? inputWarnaLk.value : '#0c3f87';
    draftData['playersData'] = playersData;

    localStorage.setItem('autolk_draft', JSON.stringify(draftData));
    alert('Draft LK berhasil disimpan di browser!');
  });

  btnLoadDraft.addEventListener('click', () => {
    const saved = localStorage.getItem('autolk_draft');
    if (!saved) {
      alert('Belum ada draft tersimpan!');
      return;
    }
    const draftData = JSON.parse(saved);
    bindings.forEach(({ input }) => {
      if (draftData[input] !== undefined) {
        const el = document.getElementById(input);
        el.value = draftData[input];
        el.dispatchEvent(new Event('input'));
      }
    });

    if (draftData['warnaLk']) setLkThemeColor(draftData['warnaLk']);

    if (draftData['mockupImgSrc']) {
      mockupImg.src = draftData['mockupImgSrc'];
      mockupImg.classList.remove('hidden');
      mockupPlaceholder.classList.add('hidden');
      imageActions.classList.remove('hidden');
    }

    if (draftData['playersData']) {
      playersData = draftData['playersData'];
      renderPlayerTables();
    }

    alert('Draft berhasil dimuat!');
  });

  btnReset.addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin mereset form ke awal?')) {
      document.getElementById('lk-form').reset();
      bindings.forEach(({ input }) => {
        const el = document.getElementById(input);
        el.dispatchEvent(new Event('input'));
      });
      btnRemoveImage.click();
      playersData = [];
      renderPlayerTables();
    }
  });

});
