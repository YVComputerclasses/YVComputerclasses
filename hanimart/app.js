// =========================================================================
// AHI TAMARO GOOGLE APPS SCRIPT WEB APP URL EK VAAR PASTE KARO:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxldXtJcWi8pWT_Hm62t-ZGfMwaM59lrDGjZ0VKdzD94JRW9adNuPEKxTi6MNGsw2RWhA/exec";
// =========================================================================

const defaultItems = [
  { code: "HSG-001", name: "Classmate Notebook 180 Pgs", mrp: 65, jos: 55, narsanda: 45, ajarpura: 35, alert: 15 },
  { code: "HSG-002", name: "Reynolds Trimax Gel Pen", mrp: 50, jos: 42, narsanda: 60, ajarpura: 40, alert: 20 },
  { code: "HSG-003", name: "Faber-Castell 24 Color Pencils", mrp: 160, jos: 135, narsanda: 12, ajarpura: 8, alert: 10 },
  { code: "HSG-004", name: "Wooden Gift Photo Frame 6x8", mrp: 299, jos: 240, narsanda: 15, ajarpura: 10, alert: 8 },
  { code: "HSG-005", name: "Casio MJ-12D Desktop Calculator", mrp: 520, jos: 465, narsanda: 5, ajarpura: 4, alert: 10 }
];

let inventory = JSON.parse(localStorage.getItem("hsg_inventory")) || defaultItems;
let bills = JSON.parse(localStorage.getItem("hsg_bills")) || [];
let currentBillItems = [];
let stickerQueue = [];
let autoSyncTimer = null;
let isSyncing = false;
let html5QrScanner = null;
let lastScanTime = 0;

function getActiveScriptUrl() {
  const codeUrl = (typeof GOOGLE_SCRIPT_URL !== "undefined") ? GOOGLE_SCRIPT_URL.trim() : "";
  if (codeUrl && codeUrl.startsWith("https://script.google.com/") && !codeUrl.includes("TAMARO_DEPLOY_ID")) {
    return codeUrl;
  }
  return "";
}

window.onload = function () {
  document.getElementById("billDate").valueAsDate = new Date();
  generateBillNo();
  refreshAllUI();
  startAutoSync();
};

function startAutoSync() {
  if (autoSyncTimer) clearInterval(autoSyncTimer);
  const url = getActiveScriptUrl();
  if (!url) {
    setStatus("Auto-Sync: Local Mode", false);
    return;
  }
  fetchFromGoogleSheet(true);
  autoSyncTimer = setInterval(() => {
    if (!document.hidden) {
      fetchFromGoogleSheet(true);
    }
  }, 15000);
}

document.addEventListener("visibilitychange", function () {
  if (!document.hidden && getActiveScriptUrl()) {
    fetchFromGoogleSheet(true);
  }
});

function setStatus(text, isOk = true) {
  const el = document.getElementById("syncStatus");
  if (!el) return;
  el.innerText = text;
  el.style.background = isOk ? "#dcfce7" : "#fee2e2";
  el.style.color = isOk ? "#166534" : "#991b1b";
}

function saveLocalData() {
  localStorage.setItem("hsg_inventory", JSON.stringify(inventory));
  localStorage.setItem("hsg_bills", JSON.stringify(bills));
}

function switchTab(tabId, btn) {
  document.querySelectorAll(".tab-section").forEach(el => el.classList.remove("active"));
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  btn.classList.add("active");

  if (getActiveScriptUrl()) {
    fetchFromGoogleSheet(true);
  }
}

function updateBranchDisplay() {
  const branch = document.getElementById("activeBranch").value;
  document.getElementById("billBranchLabel").innerText = branch;
  document.getElementById("adjBranch").value = branch;
  refreshAllUI();
}

function getBranchStock(item, branch) {
  return branch === "Narsanda" ? (Number(item.narsanda) || 0) : (Number(item.ajarpura) || 0);
}

function generateBillNo() {
  let maxNum = 100;
  bills.forEach(b => {
    const match = String(b.billNo || "").match(/(\d+)$/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > maxNum) maxNum = n;
    }
  });
  document.getElementById("billNo").value = "HSG-" + (maxNum + 1);
}

function refreshAllUI() {
  const activeBranch = document.getElementById("activeBranch").value;

  const billSel = document.getElementById("billItemSelect");
  billSel.innerHTML = `<option value="">-- Select Item --</option>` +
    inventory.map(item => {
      const avail = getBranchStock(item, activeBranch);
      return `<option value="${item.code}">${item.code} - ${item.name} (JOS: ₹${item.jos} | ${activeBranch} Stock: ${avail})</option>`;
    }).join("");
  billSel.value = "";

  const otherSelects = ["adjItemSelect", "stickerItemSelect"];
  otherSelects.forEach(id => {
    const sel = document.getElementById(id);
    const prevVal = sel.value;
    sel.innerHTML = inventory.map(item =>
      `<option value="${item.code}">${item.code} - ${item.name} (JOS: ₹${item.jos})</option>`
    ).join("");
    if (prevVal && inventory.some(i => i.code === prevVal)) {
      sel.value = prevVal;
    }
  });

  const stockBody = document.getElementById("stockTableBody");
  stockBody.innerHTML = inventory.map(item => {
    const total = Number(item.narsanda) + Number(item.ajarpura);
    const isLow = total <= Number(item.alert);
    return `
      <tr>
        <td><strong>${item.code}</strong></td>
        <td>${item.name}</td>
        <td>₹${item.mrp}</td>
        <td><strong>₹${item.jos}</strong></td>
        <td>${item.narsanda}</td>
        <td>${item.ajarpura}</td>
        <td><strong>${total}</strong></td>
        <td><span class="badge ${isLow ? 'badge-low' : 'badge-ok'}">${isLow ? 'LOW STOCK' : 'OK'}</span></td>
        <td><button class="btn btn-primary btn-sm" onclick="openEditModal('${item.code}')">Edit</button></td>
      </tr>
    `;
  }).join("");

  const histBody = document.getElementById("historyTableBody");
  histBody.innerHTML = bills.slice().reverse().map(b => `
    <tr>
      <td><strong>${b.billNo}</strong></td>
      <td>${b.date}</td>
      <td>${b.branch}</td>
      <td>${b.customer} (${b.mobile || '-'})</td>
      <td>${(b.items || []).map(i => `${i.name} x${i.qty}`).join(", ")}</td>
      <td><strong>₹${Number(b.totalJos).toFixed(2)}</strong></td>
      <td style="color:green;">₹${Number(b.savings).toFixed(2)}</td>
    </tr>
  `).join("");
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {}
}

// 1080p High-Resolution + Autofocus QR & Barcode Scanner
async function openCameraScanner() {
  if (typeof Html5Qrcode === "undefined") {
    alert("Camera library load nathi thai, internet check karo.");
    return;
  }

  document.getElementById("cameraModal").classList.add("open");

  if (html5QrScanner) {
    try { await html5QrScanner.stop(); } catch (e) {}
  }

  html5QrScanner = new Html5Qrcode("cameraReader", {
    verbose: false,
    experimentalFeatures: {
      useBarCodeDetectorIfSupported: true
    }
  });

  const config = {
    fps: 15,
    qrbox: function(viewfinderWidth, viewfinderHeight) {
      const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
      const boxSize = Math.floor(minEdge * 0.72);
      return { width: boxSize, height: boxSize };
    },
    videoConstraints: {
      facingMode: { ideal: "environment" },
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      focusMode: { ideal: "continuous" }
    }
  };

  try {
    await html5QrScanner.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        const now = Date.now();
        if (now - lastScanTime < 1500) return;
        lastScanTime = now;

        const scannedCode = decodedText.trim().toUpperCase();
        const found = inventory.find(i => i.code.toUpperCase() === scannedCode);
        if (found) {
          playBeep();
          addCodeDirectlyToBill(found.code);
          closeCameraScanner();
        } else {
          alert("Scanned Code stock ma nathi: " + scannedCode);
        }
      },
      () => {}
    );
  } catch (err) {
    // Fallback if 1080p constraint is not supported by an older device
    try {
      await html5QrScanner.start(
        { facingMode: "environment" },
        { fps: 15, qrbox: { width: 240, height: 240 } },
        (decodedText) => {
          const now = Date.now();
          if (now - lastScanTime < 1500) return;
          lastScanTime = now;

          const scannedCode = decodedText.trim().toUpperCase();
          const found = inventory.find(i => i.code.toUpperCase() === scannedCode);
          if (found) {
            playBeep();
            addCodeDirectlyToBill(found.code);
            closeCameraScanner();
          } else {
            alert("Scanned Code stock ma nathi: " + scannedCode);
          }
        },
        () => {}
      );
    } catch (err2) {
      alert("Camera open nathi thayu. Website HTTPS par hoy ane Camera permission Allow hoy te check karo.\nError: " + err2);
      closeCameraScanner();
    }
  }
}

function closeCameraScanner() {
  document.getElementById("cameraModal").classList.remove("open");
  if (html5QrScanner) {
    html5QrScanner.stop().then(() => {
      html5QrScanner.clear();
      html5QrScanner = null;
    }).catch(() => {
      html5QrScanner = null;
    });
  }
}

function handleScanEnter(e) {
  if (e.key === "Enter") {
    const code = document.getElementById("scanInput").value.trim().toUpperCase();
    if (!code) return;
    const found = inventory.find(i => i.code.toUpperCase() === code);
    if (found) {
      addCodeDirectlyToBill(found.code);
      document.getElementById("scanInput").value = "";
      document.getElementById("billItemSelect").value = "";
    } else {
      alert("Item Code not found: " + code);
    }
  }
}

function selectItemFromDropdown() {
  const val = document.getElementById("billItemSelect").value;
  if (val) {
    document.getElementById("scanInput").value = val;
  }
}

function addCodeDirectlyToBill(code) {
  const qty = parseInt(document.getElementById("billQty").value) || 1;
  if (qty <= 0) {
    alert("Quantity 1 ke tenathi vadhu nakho.");
    return;
  }

  const branch = document.getElementById("activeBranch").value;
  const item = inventory.find(i => i.code.toUpperCase() === code.toUpperCase());
  if (!item) {
    alert("Item not found!");
    return;
  }

  const availableStock = getBranchStock(item, branch);
  const existing = currentBillItems.find(i => i.code.toUpperCase() === item.code.toUpperCase());
  const alreadyInBill = existing ? existing.qty : 0;
  const newTotalQty = alreadyInBill + qty;

  if (availableStock <= 0) {
    alert(`${branch} Office ma "${item.name}" (${item.code}) no stock 0 (Out of Stock) chhe!`);
    return;
  }

  if (newTotalQty > availableStock) {
    alert(`${branch} Office ma "${item.name}" (${item.code}) no khali ${availableStock} stock available chhe! Tame ${newTotalQty} add nathi kari shakta.`);
    return;
  }

  if (existing) {
    existing.qty = newTotalQty;
  } else {
    currentBillItems.push({
      code: item.code,
      name: item.name,
      mrp: Number(item.mrp),
      jos: Number(item.jos),
      qty: qty
    });
  }
  document.getElementById("billQty").value = 1;
  renderBillTable();
}

function addItemToBill() {
  const scanVal = document.getElementById("scanInput").value.trim();
  const dropVal = document.getElementById("billItemSelect").value;
  const code = scanVal || dropVal;

  if (!code) {
    alert("Please scan an Item Code or select an item.");
    return;
  }

  addCodeDirectlyToBill(code);
  document.getElementById("scanInput").value = "";
  document.getElementById("billItemSelect").value = "";
  document.getElementById("scanInput").focus();
}

function removeBillItem(index) {
  currentBillItems.splice(index, 1);
  renderBillTable();
}

function renderBillTable() {
  const tbody = document.getElementById("billTableBody");
  let mrpTotal = 0;
  let josTotal = 0;

  tbody.innerHTML = currentBillItems.map((item, idx) => {
    const lineJos = item.jos * item.qty;
    const lineMrp = item.mrp * item.qty;
    mrpTotal += lineMrp;
    josTotal += lineJos;
    return `
      <tr>
        <td>${item.code}</td>
        <td>${item.name}</td>
        <td>₹${item.mrp}</td>
        <td>₹${item.jos}</td>
        <td>${item.qty}</td>
        <td><strong>₹${lineJos.toFixed(2)}</strong></td>
        <td><button class="btn btn-danger btn-sm" onclick="removeBillItem(${idx})">X</button></td>
      </tr>
    `;
  }).join("");

  document.getElementById("billMrpTotal").innerText = mrpTotal.toFixed(2);
  document.getElementById("billGrandTotal").innerText = josTotal.toFixed(2);
  document.getElementById("billSavings").innerText = (mrpTotal - josTotal).toFixed(2);
}

function clearBill() {
  currentBillItems = [];
  document.getElementById("scanInput").value = "";
  document.getElementById("billItemSelect").value = "";
  renderBillTable();
}

async function saveAndPrintBill() {
  if (currentBillItems.length === 0) {
    alert("Please add at least one item to the bill.");
    return;
  }

  const branch = document.getElementById("activeBranch").value;

  for (let bItem of currentBillItems) {
    const invItem = inventory.find(i => i.code === bItem.code);
    const avail = invItem ? getBranchStock(invItem, branch) : 0;
    if (bItem.qty > avail) {
      alert(`${branch} Office ma "${bItem.name}" no khali ${avail} stock j baki chhe!`);
      return;
    }
  }

  const billNo = document.getElementById("billNo").value;
  const date = document.getElementById("billDate").value;
  const customer = document.getElementById("custName").value.trim() || "Walk-in Customer";
  const mobile = document.getElementById("custMobile").value.trim();

  let totalMrp = 0, totalJos = 0;
  currentBillItems.forEach(bItem => {
    totalMrp += bItem.mrp * bItem.qty;
    totalJos += bItem.jos * bItem.qty;

    const invItem = inventory.find(i => i.code === bItem.code);
    if (invItem) {
      if (branch === "Narsanda") invItem.narsanda = Math.max(0, Number(invItem.narsanda) - bItem.qty);
      else invItem.ajarpura = Math.max(0, Number(invItem.ajarpura) - bItem.qty);
    }
  });

  const billRecord = {
    billNo, date, branch, customer, mobile,
    items: [...currentBillItems],
    totalJos,
    savings: totalMrp - totalJos
  };

  bills.push(billRecord);
  saveLocalData();
  await syncToGoogleSheet({ action: "NEW_BILL", data: billRecord });

  printCustomerReceipt(billRecord);

  clearBill();
  document.getElementById("custName").value = "";
  document.getElementById("custMobile").value = "";
  generateBillNo();
  refreshAllUI();
}

function printCustomerReceipt(bill) {
  const win = window.open("", "_blank", "width=440,height=680");
  const rows = bill.items.map(i => `
    <tr>
      <td>${i.name}<br><small>(${i.code})</small></td>
      <td style="text-align:right;">₹${i.mrp}</td>
      <td style="text-align:right;">₹${i.jos}</td>
      <td style="text-align:center;">${i.qty}</td>
      <td style="text-align:right;">₹${(i.jos * i.qty).toFixed(2)}</td>
    </tr>
  `).join("");

  const doc = win.document;
  doc.open();
  doc.write('<!DOCTYPE html><html><head><title>Bill ' + bill.billNo + '</title>');
  doc.write('<style>');
  doc.write('body{font-family:monospace;padding:15px;font-size:12px;color:#000;}');
  doc.write('h2,p{text-align:center;margin:3px 0;}');
  doc.write('table{width:100%;border-collapse:collapse;margin-top:10px;}');
  doc.write('th,td{border-bottom:1px dashed #000;padding:5px 2px;}');
  doc.write('.tot{font-size:14px;font-weight:bold;text-align:right;margin-top:10px;}');
  doc.write('.sign-area{display:flex;justify-content:space-between;align-items:flex-end;margin-top:28px;padding-top:8px;}');
  doc.write('.stamp-box{border:1px dashed #444;width:110px;height:48px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#555;}');
  doc.write('.sign-line{border-top:1px solid #000;width:130px;text-align:center;padding-top:4px;font-size:11px;font-weight:bold;}');
  doc.write('</style></head><body>');
  doc.write('<h2>Hani Stationery &amp; Gifts Mart</h2>');
  doc.write('<p>C/O JANGID ONLINE SERVICES</p>');
  doc.write('<p>Branch: ' + bill.branch + ' Office</p><hr>');
  doc.write('<div>Bill No: <strong>' + bill.billNo + '</strong> | Date: ' + bill.date + '</div>');
  doc.write('<div>Customer: ' + bill.customer + (bill.mobile ? ' (' + bill.mobile + ')' : '') + '</div>');
  doc.write('<table><thead><tr><th>Item</th><th>MRP</th><th>JOS</th><th>Qty</th><th>Amt</th></tr></thead>');
  doc.write('<tbody>' + rows + '</tbody></table>');
  doc.write('<div class="tot">Grand Total: ₹' + bill.totalJos.toFixed(2) + '</div>');
  doc.write('<p style="margin-top:6px;">You Saved ₹' + bill.savings.toFixed(2) + ' on MRP!</p>');
  doc.write('<div class="sign-area">');
  doc.write('<div class="stamp-box">SHOP STAMP</div>');
  doc.write('<div class="sign-line">Authorized Signatory</div>');
  doc.write('</div>');
  doc.write('<p style="margin-top:14px;">Thank You! Visit Again.</p>');
  doc.write('</body></html>');
  doc.close();
  win.focus();
  setTimeout(function() { win.print(); }, 300);
}

function openEditModal(code) {
  const item = inventory.find(i => i.code === code);
  if (!item) return;
  document.getElementById("editCode").value = item.code;
  document.getElementById("editName").value = item.name;
  document.getElementById("editMrp").value = item.mrp;
  document.getElementById("editJos").value = item.jos;
  document.getElementById("editNarStock").value = item.narsanda;
  document.getElementById("editAjaStock").value = item.ajarpura;
  document.getElementById("editAlert").value = item.alert;
  document.getElementById("editModal").classList.add("open");
}

function closeEditModal() {
  document.getElementById("editModal").classList.remove("open");
}

async function saveEditedItem() {
  const code = document.getElementById("editCode").value;
  const item = inventory.find(i => i.code === code);
  if (!item) return;

  item.name = document.getElementById("editName").value.trim();
  item.mrp = parseFloat(document.getElementById("editMrp").value) || 0;
  item.jos = parseFloat(document.getElementById("editJos").value) || 0;
  item.narsanda = parseInt(document.getElementById("editNarStock").value) || 0;
  item.ajarpura = parseInt(document.getElementById("editAjaStock").value) || 0;
  item.alert = parseInt(document.getElementById("editAlert").value) || 10;

  saveLocalData();
  await syncToGoogleSheet({ action: "EDIT_ITEM", data: item });
  closeEditModal();
  refreshAllUI();
  alert("Item Updated Successfully!");
}

async function addNewProduct() {
  const code = document.getElementById("newCode").value.trim().toUpperCase();
  const name = document.getElementById("newName").value.trim();
  const mrp = parseFloat(document.getElementById("newMrp").value);
  const jos = parseFloat(document.getElementById("newJos").value);
  const narsanda = parseInt(document.getElementById("newNarStock").value) || 0;
  const ajarpura = parseInt(document.getElementById("newAjaStock").value) || 0;
  const alertVal = parseInt(document.getElementById("newAlert").value) || 10;

  if (!code || !name || isNaN(mrp) || isNaN(jos)) {
    alert("Please fill Code, Name, MRP, and JOS Price properly.");
    return;
  }
  if (inventory.some(i => i.code.toUpperCase() === code)) {
    alert("This Item Code already exists!");
    return;
  }

  const newItem = { code, name, mrp, jos, narsanda, ajarpura, alert: alertVal };
  inventory.push(newItem);
  saveLocalData();
  await syncToGoogleSheet({ action: "NEW_ITEM", data: newItem });
  refreshAllUI();

  document.getElementById("newCode").value = "";
  document.getElementById("newName").value = "";
  document.getElementById("newMrp").value = "";
  document.getElementById("newJos").value = "";
  alert("Item Added Successfully!");
}

async function adjustStock() {
  const branch = document.getElementById("adjBranch").value;
  const code = document.getElementById("adjItemSelect").value;
  const type = document.getElementById("adjType").value;
  const qty = parseInt(document.getElementById("adjQty").value) || 0;
  const remarks = document.getElementById("adjRemarks").value.trim() || "Website Entry";

  const item = inventory.find(i => i.code === code);
  if (!item || qty <= 0) return;

  const avail = getBranchStock(item, branch);
  if (type === "LESS" && qty > avail) {
    alert(`${branch} Office ma khali ${avail} stock available chhe, ${qty} LESS nahi thay!`);
    return;
  }

  const delta = type === "ADD" ? qty : -qty;
  if (branch === "Narsanda") {
    item.narsanda = Math.max(0, Number(item.narsanda) + delta);
  } else {
    item.ajarpura = Math.max(0, Number(item.ajarpura) + delta);
  }

  saveLocalData();
  await syncToGoogleSheet({
    action: "STOCK_LOG",
    data: { branch, code, name: item.name, type, qty, remarks }
  });
  refreshAllUI();
  document.getElementById("adjRemarks").value = "";
  alert(`Stock Updated (${type} ${qty}) for ${branch} Office!`);
}

function addStickersToSheet() {
  const code = document.getElementById("stickerItemSelect").value;
  const qty = parseInt(document.getElementById("stickerQty").value) || 1;
  const item = inventory.find(i => i.code === code);
  if (!item) return;

  for (let i = 0; i < qty; i++) {
    stickerQueue.push(item);
  }
  renderStickers();
}

function clearStickers() {
  stickerQueue = [];
  renderStickers();
}

// A4 Stickers with Both Barcode & QR Code for Instant 1080p Phone Scan
function renderStickers() {
  const sheet = document.getElementById("print-area");
  sheet.innerHTML = stickerQueue.map((item, idx) => `
    <div class="sticker-box">
      <div class="sticker-shop">Hani Stationery &amp; Gifts Mart</div>
      <div class="sticker-sub">C/O JANGID ONLINE SERVICES</div>
      <div class="sticker-item">${item.name}</div>
      <div style="display:flex; align-items:center; justify-content:space-around; width:100%; gap:2px;">
        <svg id="barcode-${idx}"></svg>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent(item.code)}" alt="QR" style="width:24px; height:24px;" />
      </div>
      <div class="sticker-prices">
        <span>MRP: ₹${item.mrp}</span>
        <span class="jos">JOS: ₹${item.jos}</span>
      </div>
    </div>
  `).join("");

  stickerQueue.forEach((item, idx) => {
    JsBarcode(`#barcode-${idx}`, item.code, {
      format: "CODE128",
      width: 1.1,
      height: 18,
      fontSize: 8,
      margin: 0
    });
  });
}

function printStickers() {
  if (stickerQueue.length === 0) {
    alert("Please add stickers to the A4 sheet first.");
    return;
  }
  window.print();
}

async function syncToGoogleSheet(payload) {
  const url = getActiveScriptUrl();
  if (!url) return;
  try {
    isSyncing = true;
    setStatus("Auto-Syncing...", true);
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    setTimeout(() => {
      isSyncing = false;
      fetchFromGoogleSheet(true);
    }, 1500);
  } catch (err) {
    isSyncing = false;
    console.error("Sync error:", err);
    setStatus("Sync Failed (Local Saved)", false);
  }
}

async function fetchFromGoogleSheet(silent = false) {
  const url = getActiveScriptUrl();
  if (!url || isSyncing) return;

  try {
    isSyncing = true;
    if (!silent) setStatus("Auto-Syncing...", true);
    const cacheBusterUrl = url + (url.includes("?") ? "&" : "?") + "t=" + Date.now();
    const res = await fetch(cacheBusterUrl);
    const data = await res.json();

    if (data.status === "success") {
      if (Array.isArray(data.items)) {
        inventory = data.items;
      }
      if (Array.isArray(data.bills)) {
        bills = data.bills;
      }
      saveLocalData();
      generateBillNo();
      refreshAllUI();
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setStatus("Auto-Synced (" + timeNow + ")", true);
    } else {
      setStatus("Auto-Sync Error", false);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setStatus("Auto-Sync Offline", false);
  } finally {
    isSyncing = false;
  }
}