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

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    });
  });

  // Support pasting image directly from clipboard (Ctrl + V)
  document.addEventListener('paste', (e) => {
    const items = e.clipboardData && e.clipboardData.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          handleImageFile(blob);
          // Switch to mockup tab automatically when image is pasted
          const mockupTabBtn = document.querySelector('[data-tab="tab-mockup"]');
          if (mockupTabBtn) mockupTabBtn.click();
          break;
        }
      }
    }
  });

  dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  btnRemoveImage.addEventListener('click', () => {
    fileInput.value = '';
    mockupImg.src = '';
    mockupImg.classList.add('hidden');
    mockupPlaceholder.classList.remove('hidden');
    imageActions.classList.add('hidden');
  });

  fitRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'cover') {
        mockupImg.classList.add('fit-cover');
      } else {
        mockupImg.classList.remove('fit-cover');
      }
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
    { name: 'AAN', number: '10', size: 'L' },
    { name: 'IKMAL', number: '7', size: 'XL' }
  ];

  function renderPlayerTables() {
    if (!playerTableBody || !p2PlayerBody) return;

    playerTableBody.innerHTML = '';
    p2PlayerBody.innerHTML = '';

    const sizeCounts = {};
    const totalQty = playersData.length;

    playersData.forEach((player, idx) => {
      const sizeVal = (player.size || 'M').toUpperCase();
      sizeCounts[sizeVal] = (sizeCounts[sizeVal] || 0) + 1;

      // 1. Sidebar Input Row
      const trInput = document.createElement('tr');
      trInput.innerHTML = `
        <td style="text-align:center; font-weight:700; color:var(--text-muted);">${idx + 1}</td>
        <td><input type="text" class="inp-player-name" value="${player.name || ''}" placeholder="Nama"></td>
        <td><input type="text" class="inp-player-num" value="${player.number || ''}" placeholder="No"></td>
        <td><input type="text" class="inp-player-size" value="${player.size || 'M'}" placeholder="Size"></td>
        <td>
          <button type="button" class="btn-del-row" data-idx="${idx}" title="Hapus"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></button>
        </td>
      `;
      playerTableBody.appendChild(trInput);

      const inpName = trInput.querySelector('.inp-player-name');
      const inpNum = trInput.querySelector('.inp-player-num');
      const inpSize = trInput.querySelector('.inp-player-size');
      const btnDel = trInput.querySelector('.btn-del-row');

      inpName.addEventListener('input', (e) => { playersData[idx].name = e.target.value; renderSheetPlayerTableOnly(); });
      inpNum.addEventListener('input', (e) => { playersData[idx].number = e.target.value; renderSheetPlayerTableOnly(); });
      inpSize.addEventListener('input', (e) => { playersData[idx].size = e.target.value; renderPlayerTables(); });
      btnDel.addEventListener('click', () => { playersData.splice(idx, 1); renderPlayerTables(); });

      // 2. Sheet Page 2 Output Row
      const trSheet = document.createElement('tr');
      trSheet.innerHTML = `
        <td>${idx + 1}</td>
        <td class="cell-left">${player.name || '-'}</td>
        <td>${player.number || '-'}</td>
        <td><strong>${(player.size || '-').toUpperCase()}</strong></td>
      `;
      p2PlayerBody.appendChild(trSheet);
    });

    if (window.lucide) lucide.createIcons();

    // 3. Render Size Badges in Sidebar
    if (sizeSummaryList) {
      sizeSummaryList.innerHTML = '';
      if (totalQty === 0) {
        sizeSummaryList.innerHTML = '<span class="badge-empty">Belum ada data player</span>';
      } else {
        Object.keys(sizeCounts).forEach(size => {
          const badge = document.createElement('span');
          badge.className = 'size-badge';
          badge.innerHTML = `${size}: <strong>${sizeCounts[size]}</strong>`;
          sizeSummaryList.appendChild(badge);
        });
      }
    }

    // 4. Render Size Summary Bar in Page 1 and Page 2 Sheets
    const summaryHtml = totalQty === 0 
      ? '<span>RINCIAN UKURAN: BELUM ADA DATA</span>'
      : `<span>RINCIAN UKURAN: ${Object.keys(sizeCounts).map(s => `${s}: ${sizeCounts[s]} PCS`).join(' &nbsp;|&nbsp; ')} &nbsp;[TOTAL: ${totalQty} PCS]</span>`;

    if (sheetSizeSummary) sheetSizeSummary.innerHTML = summaryHtml;
    if (p2SizeSummary) p2SizeSummary.innerHTML = summaryHtml;

    // 5. Update Total Pcs field automatically
    if (totalQty > 0 && inputTotalPcs) {
      inputTotalPcs.value = `${totalQty} PCS`;
      inputTotalPcs.dispatchEvent(new Event('input'));
    }
  }

  function renderSheetPlayerTableOnly() {
    if (!p2PlayerBody) return;
    p2PlayerBody.innerHTML = '';
    playersData.forEach((player, idx) => {
      const trSheet = document.createElement('tr');
      trSheet.innerHTML = `
        <td>${idx + 1}</td>
        <td class="cell-left">${player.name || '-'}</td>
        <td>${player.number || '-'}</td>
        <td><strong>${(player.size || '-').toUpperCase()}</strong></td>
      `;
      p2PlayerBody.appendChild(trSheet);
    });
  }

  if (btnAddRow) {
    btnAddRow.addEventListener('click', () => {
      playersData.push({ name: '', number: '', size: 'M' });
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

    // Remove brackets around size e.g. "AAN (XL)" -> "AAN XL"
    clean = clean.replace(/\((XS|S|M|L|XL|2XL|XXL|3XL|4XL|5XL)\)/gi, '$1');

    // Case A: Separated by tab, comma, semicolon, dash, or pipe
    if (/[,;\t\-\|]/.test(clean)) {
      const parts = clean.split(/[,;\t\-\|]/).map(p => p.trim()).filter(Boolean);
      if (parts.length >= 3) {
        if (knownSizeRegex.test(parts[1])) {
          return { name: parts[0], number: parts[2] || '-', size: parts[1].toUpperCase() };
        }
        return { name: parts[0], number: parts[1], size: (parts[2] || 'M').toUpperCase() };
      } else if (parts.length === 2) {
        if (knownSizeRegex.test(parts[1])) {
          return { name: parts[0], number: '-', size: parts[1].toUpperCase() };
        } else if (/^[0-9]+$/.test(parts[1])) {
          return { name: parts[0], number: parts[1], size: 'M' };
        } else {
          return { name: parts[0], number: '-', size: parts[1].toUpperCase() };
        }
      }
    }

    // Case B: Space separated or unformatted line
    let name = clean;
    let number = '-';
    let size = 'M';

    const sizeMatch = clean.match(knownSizeRegex);
    if (sizeMatch) {
      size = sizeMatch[0].toUpperCase();
      name = clean.replace(sizeMatch[0], '').trim();
    }

    const numMatch = name.match(/#?(\d{1,3})\b/);
    if (numMatch) {
      number = numMatch[1];
      name = name.replace(numMatch[0], '').trim();
    }

    name = name.replace(/^[\-\,\.\s]+|[\-\,\.\s]+$/g, '').trim();

    return { name: name || 'PLAYER', number, size };
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
    currentZoom = Math.min(Math.max(newZoom, 0.4), 1.8);
    scaler.style.transform = `scale(${currentZoom})`;
    zoomLevelEl.textContent = `${Math.round(currentZoom * 100)}%`;
  }

  btnZoomIn.addEventListener('click', () => updateZoom(currentZoom + 0.1));
  btnZoomOut.addEventListener('click', () => updateZoom(currentZoom - 0.1));

  btnZoomFit.addEventListener('click', () => {
    const scrollWrapper = document.getElementById('scroll-wrapper');
    const containerWidth = scrollWrapper.clientWidth - 80;
    const sheetWidth = 800; // LK sheet width in px
    const fitZoom = containerWidth / sheetWidth;
    updateZoom(fitZoom);
  });

  // Initial fit adjustment & responsive resize listener
  setTimeout(() => {
    if (btnZoomFit) btnZoomFit.click();
  }, 100);

  window.addEventListener('resize', () => {
    if (btnZoomFit) btnZoomFit.click();
  });

  // MODAL HANDLERS
  const imageModal = document.getElementById('image-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalGeneratedImg = document.getElementById('modal-generated-img');
  const modalDownloadBtn = document.getElementById('modal-download-btn');
  const modalCopyBtn = document.getElementById('modal-copy-btn');

  let currentCanvasBlob = null;

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
      const canvas = await html2canvas(targetEl, {
        scale: 3, // 3x HD rendering
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false
      });

      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
      const dataUrl = canvas.toDataURL(mimeType, 0.95);
      const filename = getExportFilename(targetPageId, format);

      // Save blob for clipboard copy
      canvas.toBlob((blob) => {
        if (blob) currentCanvasBlob = blob;
      }, mimeType);

      // 1. Direct browser download trigger
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 300);

      // 2. Show Modal Preview
      if (modalGeneratedImg && imageModal) {
        modalGeneratedImg.src = dataUrl;
        if (modalDownloadBtn) {
          modalDownloadBtn.href = dataUrl;
          modalDownloadBtn.download = filename;
        }
        imageModal.classList.remove('hidden');
      }

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
