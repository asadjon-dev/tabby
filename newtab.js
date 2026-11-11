/* Copyright (c) 2026 Asadjon. Licensed under the MIT License (see LICENSE). */
const DB_NAME = 'open-canvas-backgrounds';
const STORE_NAME = 'settings';
const BACKGROUND_KEY = 'background';
const FONT_KEY = 'uploaded-font';
const FONT_MODE_KEY = 'tabby-font-mode';
const INTERFACE_COLOR_KEY = 'tabby-interface-color';
const UI_BACKGROUND_KEY = 'tabby-ui-background-color';
const BUTTON_BACKGROUND_KEY = 'tabby-button-background-color';
const WALLPAPER_SOUND_ON_ICON = 'icons/wallpaper-sound-on.svg';
const WALLPAPER_SOUND_OFF_ICON = 'icons/wallpaper-sound-off.svg';
const TRASH_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.11686 7.7517C5.53016 7.72415 5.88754 8.03685 5.91509 8.45015L6.37503 15.3493C6.46489 16.6971 6.52892 17.6349 6.66948 18.3406C6.80583 19.025 6.99617 19.3873 7.26958 19.6431C7.54299 19.8989 7.91715 20.0647 8.60915 20.1552C9.32255 20.2485 10.2626 20.25 11.6134 20.25H12.3868C13.7376 20.25 14.6776 20.2485 15.391 20.1552C16.083 20.0647 16.4572 19.8989 16.7306 19.6431C17.004 19.3873 17.1943 19.025 17.3307 18.3406C17.4713 17.6349 17.5353 16.6971 17.6251 15.3493L18.0851 8.45015C18.1126 8.03685 18.47 7.72415 18.8833 7.7517C19.2966 7.77925 19.6093 8.13663 19.5818 8.54993L19.1183 15.5017C19.0328 16.7844 18.9638 17.8206 18.8018 18.6336C18.6334 19.4789 18.347 20.185 17.7554 20.7385C17.1638 21.2919 16.4402 21.5308 15.5856 21.6425C14.7635 21.7501 13.7251 21.7501 12.4395 21.75H11.5607C10.2751 21.7501 9.23664 21.7501 8.4146 21.6425C7.55995 21.5308 6.8364 21.2919 6.2448 20.7385C5.65321 20.185 5.36679 19.4789 5.19839 18.6336C5.03642 17.8205 4.96736 16.7844 4.88186 15.5017L4.41841 8.54993C4.39086 8.13663 4.70357 7.77925 5.11686 7.7517Z" fill="#ff0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.3553 2.25004L10.3094 2.25002C10.093 2.24988 9.90445 2.24976 9.72643 2.27819C9.02313 2.39049 8.41453 2.82915 8.08559 3.46084C8.00232 3.62074 7.94282 3.79964 7.87452 4.00496L7.86 4.04858L7.76291 4.33984C7.74392 4.39681 7.73863 4.41251 7.73402 4.42524C7.55891 4.90936 7.10488 5.23659 6.59023 5.24964C6.5767 5.24998 6.56013 5.25004 6.50008 5.25004H3.5C3.08579 5.25004 2.75 5.58582 2.75 6.00004C2.75 6.41425 3.08579 6.75004 3.5 6.75004L6.50865 6.75004L6.52539 6.75004H17.4748L17.4915 6.75004L20.5001 6.75004C20.9143 6.75004 21.2501 6.41425 21.2501 6.00004C21.2501 5.58582 20.9143 5.25004 20.5001 5.25004H17.5001C17.44 5.25004 17.4235 5.24998 17.4099 5.24964C16.8953 5.23659 16.4413 4.90933 16.2661 4.42522C16.2616 4.41258 16.2562 4.39653 16.2373 4.33984L16.1402 4.04858L16.1256 4.00494C16.0573 3.79961 15.9978 3.62073 15.9146 3.46084C15.5856 2.82915 14.977 2.39049 14.2737 2.27819C14.0957 2.24976 13.9072 2.24988 13.6908 2.25002L13.6448 2.25004H10.3553ZM9.14458 4.93548C9.10531 5.04404 9.05966 5.14902 9.00815 5.25004H14.992C14.9405 5.14902 14.8949 5.04405 14.8556 4.9355L14.8169 4.82216L14.7171 4.52292C14.626 4.2494 14.605 4.19363 14.5842 4.15364C14.4745 3.94307 14.2716 3.79686 14.0372 3.75942C13.9927 3.75231 13.9331 3.75004 13.6448 3.75004H10.3553C10.067 3.75004 10.0075 3.75231 9.96296 3.75942C9.72853 3.79686 9.52566 3.94307 9.41601 4.15364C9.39519 4.19363 9.37419 4.24942 9.28302 4.52292L9.18322 4.82234C9.1682 4.86742 9.1565 4.90251 9.14458 4.93548Z" fill="#ff0000"></path></svg>';

const backdrop = document.getElementById('backdrop');
const fileInput = document.getElementById('fileInput');
const settingsButton = document.getElementById('settingsButton');
const moveModeButton = document.getElementById('moveModeButton');
const wallpaperPanel = document.getElementById('wallpaperPanel');
const uploadButton = document.getElementById('uploadButton');
const wallpaperList = document.getElementById('wallpaperList');
const tabs = [...document.querySelectorAll('.panel-tab')];
const tabViews = [...document.querySelectorAll('.tab-content')];

// ---- Segmented control -----------------------------------------------------------
// A track with one thumb that slides under the selected item. The tabs use
// aria-selected and the widget editor's groups use aria-pressed, so the same
// painter covers both.
function paintSegmented(group) {
  const thumb = group.querySelector(':scope > .segmented-thumb');
  if (!thumb) return;
  const active = group.querySelector('[aria-selected="true"], [aria-pressed="true"], .active');
  if (!active) {
    thumb.style.opacity = '0';
    group.querySelectorAll('button').forEach(button => { button.tabIndex = 0; });
    return;
  }
  // One tab stop for the group, like a real segmented control.
  group.querySelectorAll('button').forEach(button => { button.tabIndex = button === active ? 0 : -1; });
  thumb.style.opacity = '1';
  thumb.style.width = `${active.offsetWidth}px`;
  thumb.style.height = `${active.offsetHeight}px`;
  thumb.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
}

function enhanceSegmented(group) {
  if (!group) return group;
  if (!group.querySelector(':scope > .segmented-thumb')) {
    const thumb = document.createElement('span');
    thumb.className = 'segmented-thumb';
    thumb.setAttribute('aria-hidden', 'true');
    group.prepend(thumb);
  }
  paintSegmented(group);
  if (group.dataset.segmentedThumb) return group;
  group.dataset.segmentedThumb = 'true';
  group.addEventListener('click', () => paintSegmented(group));
  // The panel is built while hidden, so re-measure whenever it is shown,
  // scrolled or resized - not just when the selection changes.
  const repaint = () => paintSegmented(group);
  const scheduleRepaint = () => requestAnimationFrame(repaint);
  window.addEventListener('resize', scheduleRepaint);
  window.addEventListener('scroll', scheduleRepaint, true);
  document.addEventListener('transitionend', scheduleRepaint, true);
  repaint();
  scheduleRepaint();
  requestAnimationFrame(scheduleRepaint);
  // Arrows move focus inside the group, Home and End jump to the ends; Space or
  // Enter picks the segment, as the React Aria toggle group does.
  group.addEventListener('keydown', event => {
    const items = [...group.querySelectorAll('button')];
    const index = items.indexOf(document.activeElement);
    if (index < 0) return;
    let next = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % items.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = items.length - 1;
    else return;
    event.preventDefault();
    items[next].focus();
  });
  new MutationObserver(() => paintSegmented(group)).observe(group, {
    attributes: true, subtree: true, attributeFilter: ['aria-selected', 'aria-pressed', 'class']
  });
  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver(() => paintSegmented(group));
    observer.observe(group);
    group.querySelectorAll('button').forEach(button => observer.observe(button));
  }
  return group;
}

function enhanceTabs(nav) {
  if (!nav) return nav;
  const activeTab = () => nav.querySelector('[aria-selected="true"], .active');
  const sync = () => {
    const active = activeTab();
    nav.querySelectorAll('button').forEach(button => { button.tabIndex = !active || button === active ? 0 : -1; });
  };
  sync();
  if (nav.dataset.tabsReady) return nav;
  nav.dataset.tabsReady = 'true';
  nav.addEventListener('click', sync);
  // React Aria activates a tab as soon as an arrow lands on it.
  nav.addEventListener('keydown', event => {
    const items = [...nav.querySelectorAll('button')];
    const index = items.indexOf(document.activeElement);
    if (index < 0) return;
    let next = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % items.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = items.length - 1;
    else return;
    event.preventDefault();
    items[next].focus();
    items[next].click();
    sync();
  });
  new MutationObserver(sync).observe(nav, { attributes: true, subtree: true, attributeFilter: ['aria-selected', 'class'] });
  return nav;
}

document.querySelectorAll('.segmented').forEach(enhanceSegmented);
document.querySelectorAll('.panel-tabs').forEach(enhanceTabs);
new MutationObserver(records => {
  records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType !== 1) return;
    if (node.matches?.('.segmented')) enhanceSegmented(node);
    if (node.matches?.('.panel-tabs')) enhanceTabs(node);
    node.querySelectorAll?.('.segmented').forEach(enhanceSegmented);
    node.querySelectorAll?.('.panel-tabs').forEach(enhanceTabs);
  }));
}).observe(document.body, { childList: true, subtree: true });
const widgetLayer = document.getElementById('widgetLayer');
const widgetList = document.getElementById('widgetList');
const widgetEditorSlot = document.getElementById('widgetEditorSlot');
const addWidgetButton = document.getElementById('addWidgetButton');
const createWidgetDialog = document.getElementById('createWidgetDialog');
const createWidgetForm = document.getElementById('createWidgetForm');
const widgetNameInput = document.getElementById('widgetNameInput');
const shortcutDialog = document.getElementById('shortcutDialog');
const shortcutForm = document.getElementById('shortcutForm');
const shortcutName = document.getElementById('shortcutName');
const shortcutUrl = document.getElementById('shortcutUrl');
const shortcutDialogTitle = document.getElementById('shortcutDialogTitle');
const SHORTCUTS_KEY = 'tabby-shortcuts-v1';
const FOLDER_WIDGET_KEY = 'tabby-folder-widget-enabled';
const WIDGET_POSITION_KEY = 'tabby-favorites-position';
const WIDGETS_KEY = 'tabby-widgets-v1';
const AUTOHIDE_KEY = 'tabby-autohide-controls';
const SITE_ICONS_KEY = 'tabby-site-icons';
const siteIconsOn = () => localStorage.getItem(SITE_ICONS_KEY) !== 'off';
function siteIconUrl(pageUrl) {
  try {
    const url = new URL(chrome.runtime.getURL('/_favicon/'));
    url.searchParams.set('pageUrl', pageUrl);
    url.searchParams.set('size', '32');
    return url.href;
  } catch { return ''; }
}
const VOLUME_KEY = 'tabby-wallpaper-volume';

// ---- Storage safety: friendly notices, safe localStorage writes, one shared IndexedDB connection ----
const MAX_WALLPAPER_BYTES = 2 * 1024 * 1024 * 1024;
const MAX_FONT_BYTES = 15 * 1024 * 1024;
const MAX_BACKUP_BYTES = 3 * 1024 * 1024 * 1024;
let lastStorageNotice = 0;
let noticeTimer = 0;

// ---- Notifications ---------------------------------------------------------------
// Four kinds: success and error (3s), news about a newer GitHub release (10s) and
// the support note (15s), which only appears once per browser session.
const TOAST_ICONS = {
  success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16.5v.01"/></svg>',
  news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>',
  support: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-7-9.2A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7 2.8C19 15.6 12 20 12 20Z"/></svg>'
};
const TOAST_MAX = 3;

function openTab(url) {
  if (chrome?.tabs?.create) chrome.tabs.create({ url });
  else window.open(url, '_blank', 'noopener');
}

function notify({ type = 'success', title = '', message = '', duration = 3000, action = null } = {}) {
  const stack = document.getElementById('toastStack');
  if (!stack) return null;
  const card = document.createElement('div');
  card.className = `toast toast-${type}`;
  card.setAttribute('role', type === 'error' ? 'alert' : 'status');
  card.innerHTML = `<span class="toast-icon">${TOAST_ICONS[type] || TOAST_ICONS.success}</span><div class="toast-body"><strong class="toast-title"></strong><p class="toast-message"></p></div><button class="toast-close" type="button" aria-label="Dismiss">×</button>`;
  card.querySelector('.toast-title').textContent = title;
  card.querySelector('.toast-message').textContent = message;
  const body = card.querySelector('.toast-body');
  let gone = false;
  let timer = 0;
  const dismiss = () => {
    if (gone) return;
    gone = true;
    clearTimeout(timer);
    card.classList.remove('is-in');
    card.classList.add('is-leaving');
    setTimeout(() => card.remove(), 220);
  };
  if (action) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'toast-action';
    button.textContent = action.label;
    button.addEventListener('click', () => { action.onClick?.(); dismiss(); });
    body.append(button);
  }
  card.querySelector('.toast-close').addEventListener('click', dismiss);
  timer = setTimeout(dismiss, duration);
  stack.append(card);
  while (stack.children.length > TOAST_MAX) stack.firstElementChild.remove();
  requestAnimationFrame(() => card.classList.add('is-in'));
  return card;
}

// ---- New release notice (GitHub) --------------------------------------------------
const UPDATE_REPO = 'asadjon-dev/tabby';
const UPDATE_CHECK_KEY = 'tabby-update-check';
const UPDATE_INTERVAL = 6 * 60 * 60 * 1000;

function versionParts(value) {
  return String(value || '').replace(/^v/i, '').split(/[.+-]/).map(part => parseInt(part, 10) || 0);
}

function isNewerVersion(candidate, current) {
  const next = versionParts(candidate);
  const now = versionParts(current);
  for (let i = 0; i < Math.max(next.length, now.length); i += 1) {
    if ((next[i] || 0) > (now[i] || 0)) return true;
    if ((next[i] || 0) < (now[i] || 0)) return false;
  }
  return false;
}

function offerUpdate(latest, url, current) {
  if (!latest || !isNewerVersion(latest, current)) return;
  notify({
    type: 'news',
    title: 'A new Tabby is out',
    message: `Version ${String(latest).replace(/^v/i, '')} is available. You are on ${current}.`,
    duration: 10000,
    action: { label: 'See the update', onClick: () => openTab(url) }
  });
}

async function latestPublishedVersion() {
  try {
    const response = await fetch(`https://api.github.com/repos/${UPDATE_REPO}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } });
    if (response.ok) {
      const release = await response.json();
      const latest = String(release.tag_name || release.name || '').trim();
      if (latest) return { latest, url: release.html_url || `https://github.com/${UPDATE_REPO}/releases/latest` };
    }
  } catch { /* no release yet: fall back to the version in the repo manifest */ }
  const response = await fetch(`https://raw.githubusercontent.com/${UPDATE_REPO}/main/manifest.json`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`GitHub answered ${response.status}`);
  const manifest = await response.json();
  return { latest: String(manifest.version || '').trim(), url: `https://github.com/${UPDATE_REPO}` };
}

async function checkForUpdate() {
  if (!UPDATE_REPO) return;
  const current = chrome?.runtime?.getManifest?.().version || '0.0.0';
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(UPDATE_CHECK_KEY) || 'null'); } catch { cached = null; }
  if (cached?.latest && Date.now() - (cached.at || 0) < UPDATE_INTERVAL) {
    offerUpdate(cached.latest, cached.url, current);
    return;
  }
  try {
    const { latest, url } = await latestPublishedVersion();
    safeSetItem(UPDATE_CHECK_KEY, JSON.stringify({ at: Date.now(), latest, url }));
    offerUpdate(latest, url, current);
  } catch (error) {
    console.warn('[Tabby] Could not check for updates:', error);
  }
}

// ---- Support note ------------------------------------------------------------------
// Once per browser session: chrome.storage.session is cleared when the browser quits,
// so the note does not come back on every new tab. Without that area (a plain page)
// it falls back to an eight hour gap.
const SUPPORT_URL = 'https://guns.lol/asadjon';
const SUPPORT_SEEN_KEY = 'tabby-support-seen';
const SUPPORT_FALLBACK_HOURS = 8;

async function supportToastShown() {
  const area = chrome?.storage?.session;
  if (area) {
    try {
      const data = await area.get(SUPPORT_SEEN_KEY);
      return Boolean(data?.[SUPPORT_SEEN_KEY]);
    } catch { /* fall through to the timestamp */ }
  }
  const at = Number(localStorage.getItem(SUPPORT_SEEN_KEY) || 0);
  return Boolean(at) && Date.now() - at < SUPPORT_FALLBACK_HOURS * 60 * 60 * 1000;
}

async function markSupportToast() {
  const area = chrome?.storage?.session;
  if (area) {
    try {
      await area.set({ [SUPPORT_SEEN_KEY]: true });
      return;
    } catch { /* fall through to the timestamp */ }
  }
  safeSetItem(SUPPORT_SEEN_KEY, String(Date.now()));
}

async function offerSupport() {
  if (await supportToastShown()) return;
  await markSupportToast();
  notify({
    type: 'support',
    title: 'Support Tabby',
    message: 'Tabby is free and has no ads. If it makes your new tab nicer, a tip keeps it going.',
    duration: 15000,
    action: { label: 'Support me', onClick: () => openTab(SUPPORT_URL) }
  });
}

function showNotice(message) {
  notify({ type: 'error', title: 'Something went wrong', message, duration: 3000 });
}

function isQuotaError(error) {
  return Boolean(error) && (error.name === 'QuotaExceededError' || error.code === 22 || error.code === 1014 || /quota|storage is full|not enough/i.test(String(error.message || '')));
}

function describeStorageError(error, fallback = 'Tabby could not save that.') {
  if (isQuotaError(error) && !/^There is not enough/.test(String(error.message))) {
    return 'Your browser storage is full, so Tabby could not save that. Free up some space (for example remove a wallpaper or font) and try again.';
  }
  return error?.message && !(error instanceof DOMException) ? error.message : fallback;
}

// Same as localStorage.setItem, but a full or blocked storage shows a notice instead of silently losing the change.
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Could not save', key, error);
    const now = Date.now();
    if (now - lastStorageNotice > 4000) {
      lastStorageNotice = now;
      showNotice(isQuotaError(error)
        ? 'Your browser storage is full, so your latest change was not saved. Free up some space and try again.'
        : 'Tabby could not save your latest change because browser storage is not available.');
    }
    return false;
  }
}

let databasePromise = null;
function openDatabase() {
  if (databasePromise) return databasePromise;
  databasePromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) { reject(new Error('Browser storage is not available here.')); return; }
    let request;
    try { request = indexedDB.open(DB_NAME, 1); } catch (error) { reject(error); return; }
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => { db.close(); databasePromise = null; };
      db.onclose = () => { databasePromise = null; };
      resolve(db);
    };
    request.onerror = () => reject(request.error || new Error('Could not open browser storage.'));
    request.onblocked = () => reject(new Error('Browser storage is busy. Close other Tabby tabs and try again.'));
  });
  databasePromise.catch(() => { databasePromise = null; });
  return databasePromise;
}

async function readRecord(key) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    let request;
    try { request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(key); } catch (error) { reject(error); return; }
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function putRecord(key, value) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    let transaction;
    try {
      transaction = db.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put(value, key);
    } catch (error) { reject(error); return; }
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error || new Error('The browser cancelled the save.'));
  });
}

// Refuses a file that clearly will not fit, with a message that says how much space is left.
async function ensureSpaceFor(bytes, replacing = 0) {
  if (!navigator.storage?.estimate) return;
  let estimate;
  try { estimate = await navigator.storage.estimate(); } catch { return; }
  if (!estimate?.quota) return;
  const free = estimate.quota - (estimate.usage || 0) + replacing;
  if (bytes > free * 0.95) {
    throw new Error(`There is not enough free browser storage for this file (it needs ${formatBytes(bytes)}, about ${formatBytes(Math.max(0, free))} is free).`);
  }
}

function releaseVideo(video) {
  try { video.pause(); video.removeAttribute('src'); video.load(); } catch {}
}

// A font file must start with a known font signature and actually load.
async function verifyFontFile(blob) {
  if (!blob || blob.size < 12) throw new Error('That font file is empty or damaged.');
  if (blob.size > MAX_FONT_BYTES) throw new Error(`That font file is too large (${formatBytes(blob.size)}). The limit is ${formatBytes(MAX_FONT_BYTES)}.`);
  const head = new Uint8Array(await blob.slice(0, 4).arrayBuffer());
  const tag = String.fromCharCode(...head);
  const known = ['wOFF', 'wOF2', 'OTTO', 'true', 'ttcf'].includes(tag) || (head[0] === 0 && head[1] === 1 && head[2] === 0 && head[3] === 0);
  if (!known) throw new Error('That file is not a real font file.');
  const url = URL.createObjectURL(blob);
  try {
    await new FontFace('TabbyCheck', `url("${url}")`).load();
  } catch {
    throw new Error('That font file could not be read by the browser.');
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Freeze videos (picture and sound) while the tab is in the background to save CPU and memory.
function pauseVideo(video) {
  if (video.paused) return;
  video.pause();
  video.dataset.resume = '1';
}

async function resumeVideo(video) {
  if (video.dataset.resume !== '1') return;
  delete video.dataset.resume;
  try {
    await video.play();
  } catch {
    video.muted = true;
    video.play().catch(() => {});
  }
}

document.addEventListener('visibilitychange', () => {
  document.querySelectorAll('video').forEach(video => (document.hidden ? pauseVideo(video) : resumeVideo(video)));
});

function savedWallpaperVolume() {
  const value = Number(localStorage.getItem(VOLUME_KEY));
  return Number.isFinite(value) && localStorage.getItem(VOLUME_KEY) !== null ? Math.max(0, Math.min(100, value)) : 50;
}

let widgets = loadWidgets();
let currentWallpaperVideo = null;
let editingSlot = null;
let editingWidgetId = null;
let openEditorWidgetId = null;
let currentObjectUrl = null;
let moveMode = false;
let dragState = null;

const fontChoices = {
  system: 'system-ui, sans-serif',
  arial: 'Arial, sans-serif',
  georgia: 'Georgia, serif',
  verdana: 'Verdana, sans-serif',
  trebuchet: '"Trebuchet MS", sans-serif',
  courier: '"Courier New", monospace'
};

const legacyFontKeys = { 'trebuchet ms': 'trebuchet', 'courier new': 'courier' };

function normalizeFontKey(value) {
  const key = String(value || '').trim().toLowerCase();
  return legacyFontKeys[key] || key;
}

function applyFont(fontStack) {
  document.documentElement.style.setProperty('--tabby-font', fontStack);
}

function applyInterfaceColor(color) {
  const root = document.documentElement.style;
  root.setProperty('--tabby-accent', color);
  root.setProperty('--tabby-widget-accent', color);
  root.setProperty('--tabby-accent-light', `color-mix(in srgb, ${color} 68%, white)`);
  root.setProperty('--tabby-accent-muted', `color-mix(in srgb, ${color} 82%, white)`);
  root.setProperty('--tabby-accent-border', `color-mix(in srgb, ${color} 76%, black)`);
  root.setProperty('--tabby-accent-deep', `color-mix(in srgb, ${color} 70%, black)`);
  root.setProperty('--tabby-accent-dark', `color-mix(in srgb, ${color} 62%, black)`);
  const hex = color.slice(1);
  const channels = [0, 2, 4].map(index => parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = channels.map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  root.setProperty('--tabby-accent-ink', luminance > 0.21 ? '#1b2030' : '#ffffff');
}

function enhanceGlideSelect(select, { ariaLabel = 'Select', menuWidth = 176, placement = 'bottom', align = 'left' } = {}) {
  if (!select || select.dataset.glideReady) return null;
  select.dataset.glideReady = 'true';
  const root = document.createElement('div');
  root.className = 'glide-select';
  root.dataset.size = 'md';
  root.style.setProperty('--gs-menu-width', `${menuWidth}px`);
  const trigger = document.createElement('button');
  trigger.className = 'glide-select__trigger';
  trigger.type = 'button';
  trigger.id = `${select.id}-glide-trigger`;
  trigger.setAttribute('role', 'combobox');
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-label', ariaLabel);
  const value = document.createElement('span');
  value.className = 'glide-select__value';
  const chevron = document.createElement('span');
  chevron.className = 'glide-select__chevron';
  chevron.setAttribute('aria-hidden', 'true');
  chevron.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  trigger.append(value, chevron);
  const menu = document.createElement('div');
  menu.id = `${select.id}-glide-listbox`;
  trigger.setAttribute('aria-controls', menu.id);
  menu.className = 'glide-select__menu';
  menu.setAttribute('role', 'listbox');
  menu.setAttribute('aria-label', ariaLabel);
  menu.hidden = true;
  menu.dataset.placement = placement;
  menu.dataset.align = align;
  const glide = document.createElement('span');
  glide.className = 'glide-select__glide';
  glide.setAttribute('aria-hidden', 'true');
  menu.append(glide);
  const optionButtons = [];
  function buildRows() {
    optionButtons.forEach(row => row.remove());
    optionButtons.length = 0;
    [...select.options].forEach((option, index) => {
      const row = document.createElement('button');
      row.className = 'glide-select__option';
      row.type = 'button';
      row.id = `${select.id}-glide-option-${index}`;
      row.dataset.index = String(index);
      row.dataset.value = option.value;
      if (option.dataset.action) row.dataset.action = option.dataset.action;
      row.setAttribute('role', 'option');
      row.tabIndex = -1;
      const label = document.createElement('span');
      label.textContent = option.textContent.trim();
      row.append(label);
      const deletable = option.dataset.deletable === 'true';
      if (option.dataset.tag || deletable) {
        const meta = document.createElement('span');
        meta.className = 'glide-select__meta';
        if (option.dataset.tag) {
          const tag = document.createElement('span');
          tag.className = 'glide-select__tag';
          tag.textContent = option.dataset.tag;
          meta.append(tag);
        }
        if (deletable) {
          const del = document.createElement('span');
          del.className = 'glide-select__delete';
          del.setAttribute('role', 'button');
          del.setAttribute('aria-label', `Delete ${option.textContent.trim()}`);
          del.title = 'Delete';
          del.textContent = '×';
          del.addEventListener('click', event => { event.stopPropagation(); requestDelete(row); });
          meta.append(del);
        }
        row.append(meta);
      }
      row.addEventListener('pointerenter', () => setActive(index));
      row.addEventListener('click', () => pick(index));
      menu.append(row);
      optionButtons.push(row);
    });
  }
  function requestDelete(row) {
    const del = row.querySelector('.glide-select__delete');
    if (!del) return;
    if (row.dataset.confirm === 'true') {
      select.dispatchEvent(new CustomEvent('glidedelete', { detail: { value: row.dataset.value } }));
      return;
    }
    row.dataset.confirm = 'true';
    del.dataset.confirm = 'true';
    del.textContent = 'Delete?';
    setTimeout(() => {
      if (!row.isConnected) return;
      delete row.dataset.confirm;
      delete del.dataset.confirm;
      del.textContent = '×';
    }, 2500);
  }
  select.insertAdjacentElement('afterend', root);
  root.append(trigger, menu);
  select.classList.add('glide-select-native');
  select.tabIndex = -1;
  select.setAttribute('aria-hidden', 'true');
  document.querySelectorAll(`label[for="${CSS.escape(select.id)}"]`).forEach(label => { label.htmlFor = trigger.id; });
  let activeIndex = -1;
  let typeahead = '';
  let typeaheadTimer;
  const selectedIndex = () => Math.max(0, [...select.options].findIndex(option => option.value === select.value));
  function sync() {
    const option = select.options[select.selectedIndex];
    value.textContent = option?.textContent.trim() || 'Select…';
    optionButtons.forEach((row, index) => {
      const selected = index === select.selectedIndex;
      row.setAttribute('aria-selected', String(selected));
      row.disabled = select.options[index].disabled;
    });
  }
  function setActive(index) {
    activeIndex = Math.max(0, Math.min(optionButtons.length - 1, index));
    glide.style.transform = `translateY(${activeIndex * 34}px)`;
    if (optionButtons[activeIndex]) trigger.setAttribute('aria-activedescendant', optionButtons[activeIndex].id);
    else trigger.removeAttribute('aria-activedescendant');
    optionButtons.forEach((row, i) => row.dataset.active = String(i === activeIndex));
  }
  function close() {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.removeAttribute('aria-activedescendant');
    root.dataset.open = 'false';
  }
  function open(viaKeyboard = false) {
    if (trigger.disabled) return;
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    root.dataset.open = 'true';
    setActive(viaKeyboard ? selectedIndex() : selectedIndex());
    requestAnimationFrame(() => {
      const rect = trigger.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      let side = placement;
      if (side === 'bottom' && rect.bottom + menuRect.height + 8 > innerHeight) side = 'top';
      else if (side === 'top' && rect.top - menuRect.height - 8 < 0) side = 'bottom';
      menu.dataset.side = side;
      menu.dataset.state = 'open';
    });
  }
  function pick(index) {
    const option = select.options[index];
    if (!option || option.disabled) return;
    select.value = option.value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    sync();
    close();
    trigger.focus({ preventScroll: true });
  }
  trigger.addEventListener('click', () => menu.hidden ? open() : close());
  trigger.addEventListener('keydown', event => {
    const current = activeIndex >= 0 ? activeIndex : selectedIndex();
    if (menu.hidden && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      open(true);
      return;
    }
    if (menu.hidden) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(current + (event.key === 'ArrowDown' ? 1 : -1));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setActive(event.key === 'Home' ? 0 : optionButtons.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      pick(current);
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      if (optionButtons[current]?.querySelector('.glide-select__delete')) { event.preventDefault(); requestDelete(optionButtons[current]); }
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      close();
      if (event.key === 'Escape') event.preventDefault();
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      typeahead += event.key.toLowerCase();
      clearTimeout(typeaheadTimer);
      typeaheadTimer = setTimeout(() => { typeahead = ''; }, 650);
      const found = [...select.options].findIndex(option => !option.disabled && option.textContent.trim().toLowerCase().startsWith(typeahead));
      if (found >= 0) setActive(found);
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!root.contains(event.target)) close();
  }, true);
  select.addEventListener('change', sync);
  select.glideSelectRefresh = sync;
  select.glideSelectRebuild = () => {
    buildRows();
    sync();
    if (!menu.hidden) setActive(Math.min(activeIndex < 0 ? selectedIndex() : activeIndex, optionButtons.length - 1));
  };
  buildRows();
  sync();
  return root;
}


// ---- Custom color picker (replaces the native color input look) ----
function hexToHsv(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return { h, s: max ? d / max : 0, v: max };
}
function hsvToHex({ h, s, v }) {
  const f = n => {
    const k = (n + h / 60) % 6;
    return Math.round((v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255);
  };
  return '#' + [f(5), f(3), f(1)].map(x => x.toString(16).padStart(2, '0')).join('');
}

let openColorPopover = null;
function closeColorPopover() {
  if (!openColorPopover) return;
  openColorPopover.remove();
  openColorPopover = null;
}
document.addEventListener('pointerdown', event => {
  if (openColorPopover && !event.target.closest?.('.color-pop, .color-swatch')) closeColorPopover();
}, true);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && openColorPopover) { event.stopImmediatePropagation(); closeColorPopover(); }
}, true);

// Any CSS colour the hex field accepts, normalised to #rrggbb. The probe keeps
// its previous value when the text is not a colour, so a sentinel catches typos.
function cssColorToHex(value) {
  const text = String(value || '').trim();
  if (!text) return null;
  if (/^#[\da-f]{6}$/i.test(text)) return text.toLowerCase();
  if (/^#[\da-f]{3}$/i.test(text)) return '#' + text.slice(1).split('').map(c => c + c).join('').toLowerCase();
  const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  if (!probe) return null;
  probe.fillStyle = '#010203';
  probe.fillStyle = text;
  if (probe.fillStyle === '#010203' && text.toLowerCase() !== '#010203') return null;
  probe.fillRect(0, 0, 1, 1);
  const data = probe.getImageData(0, 0, 1, 1).data;
  return '#' + [data[0], data[1], data[2]].map(channel => channel.toString(16).padStart(2, '0')).join('');
}

function enhanceColorInput(input) {
  if (input.dataset.picker) return;
  input.dataset.picker = 'true';
  input.classList.add('color-native');
  const proto = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `color-swatch${input.classList.contains('widget-background-color') ? ' wide' : ''}`;
  button.setAttribute('aria-label', input.getAttribute('aria-label') || 'Choose color');
  const chip = document.createElement('span');
  chip.className = 'color-chip';
  const text = document.createElement('span');
  text.className = 'color-hex';
  button.append(chip, text);
  input.after(button);
  const paintButton = () => {
    const v = proto.get.call(input);
    chip.style.background = v;
    text.textContent = v.toUpperCase();
  };
  Object.defineProperty(input, 'value', {
    get() { return proto.get.call(this); },
    set(v) { proto.set.call(this, v); paintButton(); }
  });
  paintButton();

  button.addEventListener('click', () => {
    if (openColorPopover?.ownerButton === button) { closeColorPopover(); return; }
    closeColorPopover();
    const pop = document.createElement('div');
    pop.className = 'color-pop';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', 'Color');
    pop.ownerButton = button;
    let hsv = hexToHsv(input.value);
    const presets = ['#ffffff', '#e6e6e6', '#8a8a8a', '#34322e', '#ef4444', '#eab308', '#22c55e', '#6366f1'];
    pop.innerHTML = `
      <div class="color-area" tabindex="0" role="slider" aria-label="Saturation and brightness" aria-valuemin="0" aria-valuemax="100">
        <span class="color-hairline"></span>
        <div class="color-thumb"></div>
      </div>
      <div class="color-hue" tabindex="0" role="slider" aria-label="Hue" aria-valuemin="0" aria-valuemax="360">
        <span class="color-hairline"></span>
        <div class="color-thumb"></div>
      </div>
      <div class="color-pop-row">
        <span class="color-chip"></span>
        <input class="color-pop-hex-input" type="text" maxlength="7" spellcheck="false" dir="ltr" aria-label="Hex color">
      </div>
      <div class="color-presets" role="group" aria-label="Presets">
        ${presets.map(value => `<button type="button" class="color-preset" data-color="${value}" aria-label="Use ${value}" title="${value}"><span style="background: ${value}"></span></button>`).join('')}
      </div>`;
    const area = pop.querySelector('.color-area');
    const hue = pop.querySelector('.color-hue');
    const hexInput = pop.querySelector('.color-pop-hex-input');
    const popChip = pop.querySelector('.color-chip');
    const areaThumb = area.querySelector('.color-thumb');
    const hueThumb = hue.querySelector('.color-thumb');
    const presetButtons = Array.from(pop.querySelectorAll('.color-preset'));
    const render = (fromHex) => {
      const hex = hsvToHex(hsv);
      area.style.setProperty('--color-hue', `hsl(${hsv.h} 100% 50%)`);
      area.setAttribute('aria-valuenow', String(Math.round(hsv.s * 100)));
      area.setAttribute('aria-valuetext', `${Math.round(hsv.s * 100)}% saturation, ${Math.round(hsv.v * 100)}% brightness`);
      areaThumb.style.left = `${hsv.s * 100}%`;
      areaThumb.style.top = `${(1 - hsv.v) * 100}%`;
      areaThumb.style.background = hex;
      hueThumb.style.left = `${hsv.h / 360 * 100}%`;
      hueThumb.style.background = `hsl(${hsv.h} 100% 50%)`;
      hue.setAttribute('aria-valuenow', String(Math.round(hsv.h)));
      popChip.style.background = hex;
      presetButtons.forEach(item => item.classList.toggle('is-selected', item.dataset.color.toLowerCase() === hex.toLowerCase()));
      if (!fromHex && document.activeElement !== hexInput) hexInput.value = hex.toUpperCase();
      return hex;
    };
    const commit = (fromHex) => {
      const hex = render(fromHex);
      if (proto.get.call(input).toLowerCase() === hex.toLowerCase()) return;
      input.value = hex;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const drag = (el, onMove) => {
      el.addEventListener('pointerdown', event => {
        event.preventDefault();
        el.setPointerCapture(event.pointerId);
        const move = e => {
          const r = el.getBoundingClientRect();
          onMove(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
          commit(false);
        };
        move(event);
        el.addEventListener('pointermove', move);
        const stop = () => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerup', stop);
          el.removeEventListener('pointercancel', stop);
          // stop the release click from closing the settings panel
          window.addEventListener('click', e => e.stopPropagation(), { capture: true, once: true });
        };
        el.addEventListener('pointerup', stop);
        el.addEventListener('pointercancel', stop);
      });
    };
    drag(area, (x, y) => { hsv = { ...hsv, s: x, v: 1 - y }; });
    drag(hue, (x) => { hsv = { ...hsv, h: x * 359.99 }; });
    area.addEventListener('keydown', event => {
      const step = event.shiftKey ? 0.1 : 0.02;
      let s = hsv.s;
      let v = hsv.v;
      if (event.key === 'ArrowLeft') s = Math.max(0, s - step);
      else if (event.key === 'ArrowRight') s = Math.min(1, s + step);
      else if (event.key === 'ArrowUp') v = Math.min(1, v + step);
      else if (event.key === 'ArrowDown') v = Math.max(0, v - step);
      else return;
      event.preventDefault();
      hsv = { ...hsv, s, v };
      commit(false);
    });
    hue.addEventListener('keydown', event => {
      const step = event.shiftKey ? 20 : 2;
      let h = hsv.h;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') h = (h - step + 360) % 360;
      else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') h = (h + step) % 360;
      else return;
      event.preventDefault();
      hsv = { ...hsv, h };
      commit(false);
    });
    const readHexField = () => {
      const hex = cssColorToHex(hexInput.value);
      if (!hex) return false;
      hsv = hexToHsv(hex);
      commit(true);
      return true;
    };
    hexInput.addEventListener('input', readHexField);
    hexInput.addEventListener('blur', () => {
      readHexField();
      hexInput.value = hsvToHex(hsv).toUpperCase();
    });
    hexInput.addEventListener('keydown', event => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      readHexField();
      hexInput.value = hsvToHex(hsv).toUpperCase();
      hexInput.blur();
      hexInput.focus();
    });
    presetButtons.forEach(item => {
      item.addEventListener('click', event => {
        event.stopPropagation();
        hsv = hexToHsv(item.dataset.color);
        commit(false);
      });
    });
    pop.addEventListener('click', event => event.stopPropagation());
    document.body.append(pop);
    openColorPopover = pop;
    render(false);
    const rect = button.getBoundingClientRect();
    const width = pop.offsetWidth;
    const height = pop.offsetHeight;
    const left = Math.max(8, Math.min(window.innerWidth - width - 8, rect.right - width));
    let top = rect.bottom + 8;
    if (top + height > window.innerHeight - 8) top = Math.max(8, rect.top - height - 8);
    pop.style.left = `${left}px`;
    pop.style.top = `${top}px`;
  });
}

function initInterfaceColor() {
  const input = document.getElementById('interfaceColorInput');
  const saved = localStorage.getItem(INTERFACE_COLOR_KEY);
  const color = /^#[\da-f]{6}$/i.test(saved || '') ? saved : '#a5a58d';
  input.value = color;
  applyInterfaceColor(color);
  input.addEventListener('input', () => {
    applyInterfaceColor(input.value);
    safeSetItem(INTERFACE_COLOR_KEY, input.value);
  });
}

function initUiBackgroundColor() {
  const input = document.getElementById('uiBackgroundColorInput');
  const saved = localStorage.getItem(UI_BACKGROUND_KEY);
  const color = /^#[\da-f]{6}$/i.test(saved || '') ? saved : '#1e1d1a';
  input.value = color;
  document.documentElement.style.setProperty('--tabby-ui-background', color);
  input.addEventListener('input', () => {
    document.documentElement.style.setProperty('--tabby-ui-background', input.value);
    safeSetItem(UI_BACKGROUND_KEY, input.value);
  });
}

function initButtonBackgroundColor() {
  const input = document.getElementById('buttonBackgroundColorInput');
  const saved = localStorage.getItem(BUTTON_BACKGROUND_KEY);
  const color = /^#[\da-f]{6}$/i.test(saved || '') ? saved : '#34322e';
  input.value = color;
  document.documentElement.style.setProperty('--tabby-button-bg', color);
  input.addEventListener('input', () => {
    document.documentElement.style.setProperty('--tabby-button-bg', input.value);
    safeSetItem(BUTTON_BACKGROUND_KEY, input.value);
  });
}

const THEMES_KEY = 'tabby-themes-v1';
const BUILTIN_THEMES = [
  { id: 'stone', name: 'Stone path', tag: 'Default', accent: '#a5a58d', surface: '#34322e', ui: '#1e1d1a' },
  { id: 'lavender', name: 'Lavender', tag: 'Soft lilac', accent: '#c3b1ff', surface: '#3a3354', ui: '#2a2439' },
  { id: 'pumpkin', name: 'Pumpkin spice', tag: 'Warm & cozy', accent: '#be5103', surface: '#544823', ui: '#332216' },
  { id: 'winter', name: 'Winter chill', tag: 'Icy & calm', accent: '#b8e3e9', surface: '#4f7c82', ui: '#0b2e33' },
  { id: 'autumn', name: 'Autumn leaves', tag: 'Golden brown', accent: '#ffb343', surface: '#614419', ui: '#2c1f0b' },
  { id: 'honeycomb', name: 'Honeycomb', tag: 'Sweet amber', accent: '#ffc107', surface: '#442814', ui: '#1e1209' },
  { id: 'salt', name: 'Salt and pepper', tag: 'Clean mono', accent: '#d4d4d4', surface: '#3a3a3a', ui: '#2b2b2b' },
  { id: 'golden', name: 'Golden hour', tag: 'Gold & lilac', accent: '#ffbf00', surface: '#312738', ui: '#1b151f' },
  { id: 'forest', name: 'Lush forest', tag: 'Fresh green', accent: '#68ba7f', surface: '#2e6f40', ui: '#253d2c' }
];
const MAX_CUSTOM_THEMES = 30;

function sanitizeThemeStore(raw) {
  const hex = /^#[\da-f]{6}$/i;
  const custom = [];
  const seen = new Set();
  for (const item of Array.isArray(raw?.custom) ? raw.custom : []) {
    const id = String(item?.id || '').replace(/[^\w-]/g, '').slice(0, 24);
    const name = String(item?.name || '').trim().slice(0, 24);
    if (!id || !name || seen.has(id) || BUILTIN_THEMES.some(t => t.id === id)) continue;
    if (!hex.test(item.accent || '') || !hex.test(item.surface || '') || !hex.test(item.ui || '')) continue;
    seen.add(id);
    custom.push({ id, name, accent: item.accent, surface: item.surface, ui: item.ui });
    if (custom.length >= MAX_CUSTOM_THEMES) break;
  }
  const hidden = (Array.isArray(raw?.hidden) ? raw.hidden : []).filter(id => BUILTIN_THEMES.some(t => t.id === id));
  return { custom, hidden: [...new Set(hidden)] };
}

function loadThemeStore() {
  try { return sanitizeThemeStore(JSON.parse(localStorage.getItem(THEMES_KEY) || '{}')); }
  catch { return { custom: [], hidden: [] }; }
}

function applyThemeColors(theme) {
  safeSetItem(INTERFACE_COLOR_KEY, theme.accent);
  safeSetItem(UI_BACKGROUND_KEY, theme.ui);
  safeSetItem(BUTTON_BACKGROUND_KEY, theme.surface);
}

// The old Lavender (dark blue) palette moves on to the theme that is the default now,
// but only if the user never changed those colors.
function migrateOldLavender() {
  const old = { [INTERFACE_COLOR_KEY]: '#b6a3ff', [UI_BACKGROUND_KEY]: '#182333', [BUTTON_BACKGROUND_KEY]: '#202e41' };
  const stored = Object.keys(old).map(key => (localStorage.getItem(key) || '').toLowerCase());
  if (stored.every((value, i) => value === Object.values(old)[i])) applyThemeColors(BUILTIN_THEMES[0]);
}

// Stone path is the new default. A tab still showing the old out-of-the-box Lavender colors moves
// over once; the stored key stops that from overriding a Lavender choice made afterwards.
const THEME_DEFAULT_KEY = 'tabby-default-stone-v1';
function migrateDefaultThemeToStone() {
  if (localStorage.getItem(THEME_DEFAULT_KEY)) return;
  safeSetItem(THEME_DEFAULT_KEY, 'done');
  const previous = { [INTERFACE_COLOR_KEY]: '#c3b1ff', [UI_BACKGROUND_KEY]: '#2a2439', [BUTTON_BACKGROUND_KEY]: '#3a3354' };
  const stored = Object.keys(previous).map(key => (localStorage.getItem(key) || '').toLowerCase());
  if (stored.every((value, i) => value === Object.values(previous)[i])) applyThemeColors(BUILTIN_THEMES[0]);
}

function initThemePresets() {
  const select = document.getElementById('themeSelect');
  const accentInput = document.getElementById('interfaceColorInput');
  const surfaceInput = document.getElementById('buttonBackgroundColorInput');
  const uiInput = document.getElementById('uiBackgroundColorInput');
  const createBox = document.getElementById('themeCreate');
  const nameInput = document.getElementById('themeNameInput');
  const saveButton = document.getElementById('themeSaveButton');
  const cancelButton = document.getElementById('themeCancelButton');
  const restoreButton = document.getElementById('restoreThemesButton');
  const status = document.getElementById('themeStatus');
  let store = loadThemeStore();
  let applying = false;
  const persist = () => safeSetItem(THEMES_KEY, JSON.stringify(store));
  const themes = () => [
    ...BUILTIN_THEMES.filter(t => !store.hidden.includes(t.id)),
    ...store.custom.map(t => ({ ...t, tag: 'Yours', deletable: true }))
  ];
  const matches = t => t.accent.toLowerCase() === accentInput.value.toLowerCase()
    && t.surface.toLowerCase() === surfaceInput.value.toLowerCase()
    && t.ui.toLowerCase() === uiInput.value.toLowerCase();
  const say = text => { status.textContent = text; };
  function sync() {
    if (applying) return;
    const list = themes().filter(matches);
    const match = list.find(t => t.id === select.value) || list[0];
    select.value = match ? match.id : 'custom';
    select.glideSelectRefresh?.();
  }
  function rebuild(preferId) {
    select.textContent = '';
    for (const t of themes()) {
      const option = document.createElement('option');
      option.value = t.id;
      option.textContent = t.name;
      option.dataset.tag = t.tag;
      option.dataset.deletable = 'true';
      select.append(option);
    }
    const custom = document.createElement('option');
    custom.value = 'custom';
    custom.textContent = 'Custom';
    custom.dataset.tag = 'Unsaved';
    custom.disabled = true;
    select.append(custom);
    const create = document.createElement('option');
    create.value = '__create';
    create.textContent = '＋ Create custom';
    create.dataset.action = 'create';
    select.append(create);
    restoreButton.hidden = store.hidden.length === 0;
    if (preferId) select.value = preferId;
    select.glideSelectRebuild?.();
    sync();
  }
  select.addEventListener('change', () => {
    if (select.value === '__create') {
      createBox.hidden = false;
      say('');
      nameInput.focus();
      sync();
      return;
    }
    const theme = themes().find(t => t.id === select.value);
    if (!theme) return;
    applying = true;
    accentInput.value = theme.accent;
    surfaceInput.value = theme.surface;
    uiInput.value = theme.ui;
    for (const input of [accentInput, surfaceInput, uiInput]) input.dispatchEvent(new Event('input', { bubbles: true }));
    applying = false;
    select.value = theme.id;
    select.glideSelectRefresh?.();
  });
  select.addEventListener('glidedelete', event => {
    const id = event.detail.value;
    if (BUILTIN_THEMES.some(t => t.id === id)) store.hidden = [...new Set([...store.hidden, id])];
    else store.custom = store.custom.filter(t => t.id !== id);
    persist();
    rebuild();
    say('Theme deleted.');
  });
  saveButton.addEventListener('click', () => {
    const name = nameInput.value.trim().slice(0, 24);
    if (!name) { say('Give your theme a name first.'); nameInput.focus(); return; }
    if (store.custom.length >= MAX_CUSTOM_THEMES) { say('You have too many custom themes. Delete one first.'); return; }
    const id = `c${Date.now().toString(36)}`;
    store.custom.push({ id, name, accent: accentInput.value, surface: surfaceInput.value, ui: uiInput.value });
    persist();
    nameInput.value = '';
    createBox.hidden = true;
    rebuild(id);
    say(`Saved “${name}”.`);
  });
  nameInput.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); saveButton.click(); } });
  cancelButton.addEventListener('click', () => { createBox.hidden = true; nameInput.value = ''; say(''); });
  restoreButton.addEventListener('click', () => { store.hidden = []; persist(); rebuild(); say('Default themes restored.'); });
  for (const input of [accentInput, surfaceInput, uiInput]) input.addEventListener('input', sync);
  rebuild();
}

let uploadedFontFace = null;
async function loadUploadedFont(item) {
  if (!item?.blob) return false;
  const url = URL.createObjectURL(item.blob);
  try {
    const face = new FontFace('TabbyUploaded', `url("${url}")`);
    await face.load(); // the font data is in memory now, so the temporary URL is no longer needed
    if (uploadedFontFace) document.fonts.delete(uploadedFontFace);
    document.fonts.add(face);
    uploadedFontFace = face;
  } finally {
    URL.revokeObjectURL(url);
  }
  applyFont('TabbyUploaded, Arial, sans-serif');
  return true;
}

async function getStoredFont() {
  return readRecord(FONT_KEY);
}

async function storeFont(file) {
  const existing = await getStoredFont().catch(() => null);
  await ensureSpaceFor(file.size, existing?.blob?.size || 0);
  await putRecord(FONT_KEY, { blob: file, name: file.name });
}

async function initFontSettings() {
  const select = document.getElementById('fontSelect');
  const customOption = document.getElementById('customFontOption');
  const uploadButton = document.getElementById('uploadFontButton');
  const input = document.getElementById('fontInput');
  const status = document.getElementById('fontStatus');
  const stored = await getStoredFont().catch(() => null);
  const mode = normalizeFontKey(localStorage.getItem(FONT_MODE_KEY)) || 'system';
  if (stored?.blob) {
    customOption.disabled = false;
    customOption.textContent = `Uploaded: ${stored.name || 'Custom font'}`;
  }
  if (mode === 'custom' && stored?.blob) {
    try {
      await loadUploadedFont(stored);
      select.value = 'custom';
      status.textContent = `Using ${stored.name || 'your uploaded font'}.`;
    } catch {
      applyFont(fontChoices.system);
      select.value = 'system';
      status.textContent = 'That font could not be loaded. Choose another font file.';
    }
  } else {
    const selected = fontChoices[mode] ? mode : 'system';
    select.value = selected;
    applyFont(fontChoices[selected]);
  }
  select.addEventListener('change', async () => {
    if (select.value === 'custom') {
      try {
        await loadUploadedFont(await getStoredFont());
        safeSetItem(FONT_MODE_KEY, 'custom');
        status.textContent = 'Using your uploaded font.';
      } catch {
        status.textContent = 'That font could not be loaded. Upload a different file.';
      }
      return;
    }
    applyFont(fontChoices[normalizeFontKey(select.value)] || fontChoices.system);
    safeSetItem(FONT_MODE_KEY, select.value);
    status.textContent = 'Choose a font for Tabby.';
  });
  uploadButton.addEventListener('click', () => input.click());
  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    if (!file) return;
    const allowed = /\.(woff2?|ttf|otf)$/i.test(file.name);
    if (!allowed) {
      status.textContent = 'Choose a WOFF, WOFF2, TTF, or OTF font file.';
      input.value = '';
      return;
    }
    try {
      await verifyFontFile(file);
      await storeFont(file);
      await loadUploadedFont({ blob: file });
      customOption.disabled = false;
      customOption.textContent = `Uploaded: ${file.name}`;
      select.value = 'custom';
      select.glideSelectRefresh?.();
      safeSetItem(FONT_MODE_KEY, 'custom');
      status.textContent = `Using ${file.name}.`;
      notify({ type: 'success', title: 'Font applied', message: `Using ${file.name}.`, duration: 3000 });
    } catch (error) {
      status.textContent = describeStorageError(error, 'This font file could not be loaded. Try another file.');
      notify({ type: 'error', title: 'Something went wrong', message: status.textContent, duration: 3000 });
    }
    input.value = '';
  });
}

function emptyShortcuts(source = []) {
  return Array.from({ length: 9 }, (_, index) => source[index] || null);
}

function loadWidgets() {
  try {
    const saved = JSON.parse(localStorage.getItem(WIDGETS_KEY) || 'null');
    if (Array.isArray(saved)) return saved.map(item => (item && item.type === 'timer-v2' ? { ...item, type: 'timer-v3' } : item));
  } catch {}
  let legacyShortcuts = [];
  let legacyPosition = null;
  try { legacyShortcuts = JSON.parse(localStorage.getItem(SHORTCUTS_KEY) || '[]'); } catch {}
  try { legacyPosition = JSON.parse(localStorage.getItem(WIDGET_POSITION_KEY) || 'null'); } catch {}
  // First run starts with an empty canvas: nothing is added for the user.
  // Shortcuts saved by an older version are the one thing worth carrying over.
  const hasLegacyShortcuts = legacyShortcuts.some(item => item && item.url);
  const migrated = hasLegacyShortcuts ? [{
    id: 'favorites-default',
    type: 'favorites',
    name: 'Favorites',
    enabled: true,
    shortcuts: emptyShortcuts(legacyShortcuts),
    position: Number.isFinite(legacyPosition?.x) ? { x: legacyPosition.x, y: legacyPosition.y } : null,
    size: Number.isFinite(legacyPosition?.width) ? { width: legacyPosition.width, height: legacyPosition.height } : null
  }] : [];
  safeSetItem(WIDGETS_KEY, JSON.stringify(migrated));
  return migrated;
}

function saveWidgets() {
  safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
  renderWidgets();
}

// Returns the address only if it is a normal http(s) link, otherwise ''. Used wherever a saved link is turned into a clickable one.
function safeHttpUrl(value) {
  try {
    const parsed = new URL(String(value || ''));
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : '';
  } catch { return ''; }
}

function normalizeWebsite(value) {
  let address = value.trim();
  if (!/^https?:\/\//i.test(address)) address = `https://${address}`;
  const parsed = new URL(address);
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error('Enter a website address such as youtube.com.');
  }
  return parsed.href;
}

// ---- Widget types ---------------------------------------------------------
const SEARCH_ENGINES = {
  google: { label: 'Google', url: 'https://www.google.com/search?q=' },
  brave: { label: 'Brave', url: 'https://search.brave.com/search?q=' },
  duckduckgo: { label: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  youtube: { label: 'YouTube', url: 'https://www.youtube.com/results?search_query=' }
};
const WIDGET_TYPES = {
  favorites: { label: 'Favorites folder', minWidth: 160, minHeight: 176, defaultName: 'Favorites' },
  'favorites-v2': { label: 'Favorites folder V2', minWidth: 160, minHeight: 176, defaultName: 'Favorites' },
  clock: { label: 'Clock', minWidth: 110, minHeight: 56, defaultName: 'Clock' },
  search: { label: 'Search bar', minWidth: 250, minHeight: 52, defaultName: 'Search' },
  timer: { label: 'Pomodoro timer', minWidth: 180, minHeight: 110, defaultName: 'Pomodoro' },
  'timer-v3': { label: 'Pomodoro timer V2', minWidth: 220, minHeight: 220, defaultName: 'Pomodoro' },
  weather: { label: 'Weather', minWidth: 180, minHeight: 80, defaultName: 'Weather' },
  notes: { label: 'Notes', minWidth: 220, minHeight: 150, defaultName: 'Notes' }
};
const NOTES_MAX = 20;
const NOTE_CHARS = 20000;
const isTimerType = type => type === 'timer' || type === 'timer-v3';
const isSimpleType = type => type === 'clock' || type === 'search' || isTimerType(type) || type === 'weather' || type === 'notes';
const isFavoritesType = type => type === 'favorites' || type === 'favorites-v2';

function clockOptions(widget) {
  const options = widget.options || {};
  return { format: options.format === '12' ? '12' : '24', seconds: Boolean(options.seconds), date: options.date !== false };
}

function cleanCustomUrl(value) {
  const text = String(value || '').trim();
  if (!/^https:\/\/[^\s]+$/i.test(text) || !text.includes('%s')) return '';
  return text.slice(0, 300);
}

function searchOptions(widget) {
  const o = widget.options || {};
  const customUrl = cleanCustomUrl(o.customUrl);
  const customName = String(o.customName || '').trim().slice(0, 16) || 'Custom';
  const engines = { ...SEARCH_ENGINES };
  if (customUrl) engines.custom = { label: customName, url: customUrl };
  const engine = engines[o.engine] ? o.engine : 'google';
  return { engines, engine, switcher: o.switcher === true, customUrl, customName: customUrl ? customName : '' };
}

function searchUrl(engine, query) {
  return engine.url.includes('%s') ? engine.url.replace('%s', encodeURIComponent(query)) : engine.url + encodeURIComponent(query);
}

function searchEngineKey(widget) { return searchOptions(widget).engine; }

function persistWidgets() {
  safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
}

// ---- Motion, haptics and the celebration ---------------------------------------
// Every animation in this block is about 0.2s, and all of it backs off when the
// person asks for less motion.
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Haptics: phones buzz, desktops silently ignore it.
function haptic(kind = 'soft') {
  if (typeof navigator.vibrate !== 'function' || reduceMotion()) return;
  navigator.vibrate(kind === 'success' ? [12, 40, 18] : kind === 'error' ? [26, 60, 26] : 8);
}

// Rolling digits: one slot per character, and a changed digit slides out while the
// new one slides in. Unchanged characters (the colon, the 1 in 12) stay put.
function paintRollingText(el, text) {
  const previous = el.dataset.roll;
  if (previous === text) return;
  el.dataset.roll = text;
  const animate = previous !== undefined && previous.length === text.length && !reduceMotion();
  const oldFaces = animate ? [...el.querySelectorAll('.roll-face:not(.leaving)')] : [];
  el.replaceChildren(...[...text].map((char, index) => {
    const slot = document.createElement('span');
    slot.className = 'roll-slot';
    const face = document.createElement('span');
    face.className = 'roll-face';
    face.textContent = char;
    const old = oldFaces[index]?.textContent;
    if (animate && old !== undefined && old !== char) {
      const leaving = document.createElement('span');
      leaving.className = 'roll-face leaving';
      leaving.textContent = old;
      slot.append(leaving);
      face.classList.add('entering');
      setTimeout(() => leaving.remove(), 240);
    }
    slot.append(face);
    return slot;
  }));
}

// One big celebration for the biggest moment: a finished focus session.
function celebrate(card) {
  haptic('success');
  if (!card || reduceMotion()) return;
  const body = card.querySelector('.timer3-body, .timer-body');
  if (body) {
    body.classList.add('celebrate-pop');
    setTimeout(() => body.classList.remove('celebrate-pop'), 420);
  }
  const rect = card.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-layer';
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) { canvas.remove(); return; }
  const styles = getComputedStyle(document.documentElement);
  const colors = ['--tabby-accent', '--tabby-accent-light', '--tabby-button-bg', '--tabby-ui-background']
    .map(name => styles.getPropertyValue(name).trim())
    .filter(Boolean);
  const originX = (rect.left + rect.width / 2) * ratio;
  const originY = (rect.top + rect.height / 2) * ratio;
  const pieces = Array.from({ length: 90 }, () => ({
    x: originX,
    y: originY,
    vx: (Math.random() - 0.5) * 9 * ratio,
    vy: (-Math.random() * 9 - 3) * ratio,
    size: (4 + Math.random() * 5) * ratio,
    spin: Math.random() * Math.PI,
    spinSpeed: (Math.random() - 0.5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)] || '#a5a58d'
  }));
  const started = performance.now();
  const frame = now => {
    const age = now - started;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(piece => {
      piece.vy += 0.3 * ratio;
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.spin += piece.spinSpeed;
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.spin);
      ctx.globalAlpha = Math.max(0, 1 - age / 1600);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6);
      ctx.restore();
    });
    if (age < 1600) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}

function updateClock(widget, body) {
  const options = clockOptions(widget);
  const parts = new Intl.DateTimeFormat(undefined, {
    hour: options.format === '24' ? '2-digit' : 'numeric',
    minute: '2-digit',
    second: options.seconds ? '2-digit' : undefined,
    hour12: options.format === '12',
    hourCycle: options.format === '24' ? 'h23' : undefined
  }).formatToParts(new Date());
  const get = type => parts.find(part => part.type === type)?.value || '';
  let text = `${get('hour')}:${get('minute')}`;
  if (options.seconds) text += `:${get('second')}`;
  const period = options.format === '12' ? get('dayPeriod') : '';
  const timeEl = body.querySelector('.clock-time');
  let digits = timeEl.querySelector('.clock-digits');
  if (!digits) {
    digits = document.createElement('span');
    digits.className = 'clock-digits';
    timeEl.prepend(digits);
  }
  paintRollingText(digits, text);
  const stamp = `${text}|${period}`;
  if (timeEl.dataset.stamp !== stamp) {
    timeEl.dataset.stamp = stamp;
    timeEl.querySelector('.clock-period')?.remove();
    if (period) {
      const suffix = document.createElement('span');
      suffix.className = 'clock-period';
      suffix.textContent = period;
      timeEl.append(suffix);
    }
  }
  body.style.setProperty('--clock-chars', String(text.length * 0.97 + (period ? 2 : 0)));
  const dateEl = body.querySelector('.clock-date');
  dateEl.hidden = !options.date;
  if (options.date) {
    const label = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
    if (dateEl.textContent !== label) dateEl.textContent = label;
  }
  body.dataset.hasDate = String(options.date);
}

function tickClocks() {
  widgetLayer.querySelectorAll('.home-folder[data-widget-type="clock"]:not([hidden])').forEach(card => {
    const widget = widgets.find(item => item.id === card.dataset.widgetId);
    const body = card.querySelector('.clock-body');
    if (widget && body) updateClock(widget, body);
  });
}

function buildClockBody(widget) {
  const body = document.createElement('div');
  body.className = 'clock-body';
  const time = document.createElement('div');
  time.className = 'clock-time';
  const date = document.createElement('div');
  date.className = 'clock-date';
  body.append(time, date);
  updateClock(widget, body);
  return body;
}

function buildSearchBody(widget) {
  const opts = searchOptions(widget);
  const form = document.createElement('form');
  form.className = 'search-body';
  form.setAttribute('role', 'search');
  const icon = document.createElement('span');
  icon.className = 'search-icon';
  icon.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>';
  const input = document.createElement('input');
  input.className = 'search-input';
  input.type = 'search';
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.setAttribute('aria-label', `Search ${widget.name}`);
  let current = opts.engine;
  const engines = document.createElement('div');
  engines.className = 'search-engines';
  engines.setAttribute('role', 'group');
  engines.setAttribute('aria-label', 'Search engine');
  const paint = () => {
    input.placeholder = `Search ${opts.engines[current].label}`;
    engines.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.engine === current)));
  };
  if (opts.switcher) {
    Object.entries(opts.engines).forEach(([key, engine]) => {
      const button = document.createElement('button');
      button.className = 'search-engine';
      button.type = 'button';
      button.dataset.engine = key;
      button.textContent = engine.label;
      button.addEventListener('click', () => {
        current = key;
        widget.options = { ...widget.options, engine: key };
        persistWidgets();
        paint();
        input.focus();
      });
      engines.append(button);
    });
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) { input.focus(); return; }
    window.location.assign(searchUrl(opts.engines[current], query));
  });
  form.append(icon, input);
  if (opts.switcher) form.append(engines);
  paint();
  return form;
}


// ---- Pomodoro timer ---------------------------------------------------------
const TIMER_MODES = { focus: 'Focus', short: 'Short break', long: 'Long break' };

function timerOptions(widget) {
  const o = widget.options || {};
  const mins = (value, fallback, max) => Math.round(cleanNumber(value, 1, max) ?? fallback);
  return { focus: mins(o.focus, 25, 180), short: mins(o.short, 5, 60), long: mins(o.long, 15, 90), longEvery: mins(o.longEvery, 4, 8), sound: o.sound !== false, notify: o.notify === true };
}

function timerState(widget) {
  const options = timerOptions(widget);
  const saved = widget.state || {};
  const mode = TIMER_MODES[saved.mode] ? saved.mode : 'focus';
  const total = options[mode] * 60;
  const running = saved.running === true && Number.isFinite(saved.endsAt);
  const left = running ? Math.max(0, Math.ceil((saved.endsAt - Date.now()) / 1000))
    : Math.min(total, Math.max(1, Math.round(Number.isFinite(saved.left) ? saved.left : total)));
  return { mode, total, running, left, endsAt: saved.endsAt, cycle: Math.max(0, Math.round(saved.cycle || 0)) };
}

function setTimerState(widget, changes) {
  widget.state = { ...widget.state, ...changes };
  persistWidgets();
}

function timerBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.25, 0.5].forEach(delay => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.22);
    });
    setTimeout(() => ctx.close(), 1200);
  } catch {}
}

function timerDesktopNotification(widget, mode) {
  try {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const modeName = TIMER_MODES[mode] || 'Session';
    const widgetName = widget.name ? `${widget.name}: ` : '';
    new Notification('Tabby Timer', {
      body: `${widgetName}${modeName} complete!`,
      icon: 'icons/icon128.png'
    });
  } catch {}
}

function timerNextMode(state, longEvery = 4) {
  if (state.mode !== 'focus') return { mode: 'focus', cycle: state.cycle };
  const cycle = state.cycle + 1;
  return { mode: cycle % longEvery === 0 ? 'long' : 'short', cycle };
}

function paintTimer(widget, body) {
  const state = timerState(widget);
  const minutes = String(Math.floor(state.left / 60)).padStart(2, '0');
  const seconds = String(state.left % 60).padStart(2, '0');
  if (body.dataset.editing !== '1') paintRollingText(body.querySelector('.timer-time'), `${minutes}:${seconds}`);
  body.querySelector('.timer-mode').textContent = TIMER_MODES[state.mode];
  body.querySelector('.timer-progress-fill').style.width = `${(1 - state.left / state.total) * 100}%`;
  const toggle = body.querySelector('.timer-toggle');
  toggle.textContent = state.running ? 'Pause' : state.left < state.total ? 'Resume' : 'Start';
  body.dataset.running = String(state.running);
  body.dataset.mode = state.mode;
  body.querySelectorAll('.timer-mode-tab').forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.mode === state.mode)));
}

function tickTimers() {
  widgetLayer.querySelectorAll('.home-folder[data-widget-type="timer"]:not([hidden]), .home-folder[data-widget-type="timer-v3"]:not([hidden])').forEach(card => {
    const widget = widgets.find(item => item.id === card.dataset.widgetId);
    const body = card.querySelector('.timer-body, .timer3-body');
    if (!widget || !body) return;
    const state = timerState(widget);
    if (state.running && state.left <= 0) {
      const completedMode = state.mode;
      const next = timerNextMode(state, timerOptions(widget).longEvery);
      setTimerState(widget, { mode: next.mode, cycle: next.cycle, running: false, left: timerOptions(widget)[next.mode] * 60, endsAt: null });
      if (timerOptions(widget).sound) timerBeep();
      if (timerOptions(widget).notify) timerDesktopNotification(widget, completedMode);
      celebrate(card);
    }
    if (body.classList.contains('timer3-body')) paintTimer3(widget, body);
    else paintTimer(widget, body);
  });
}

function buildTimerBody(widget) {
  const body = document.createElement('div');
  body.className = 'timer-body';
  const modes = document.createElement('div');
  modes.className = 'timer-modes';
  Object.entries(TIMER_MODES).forEach(([key, label]) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'timer-mode-tab';
    tab.dataset.mode = key;
    tab.textContent = label;
    tab.addEventListener('click', () => {
      setTimerState(widget, { mode: key, running: false, left: timerOptions(widget)[key] * 60, endsAt: null });
      paintTimer(widget, body);
    });
    modes.append(tab);
  });
  const time = document.createElement('div');
  time.className = 'timer-time';
  time.title = 'Click to set minutes';
  time.addEventListener('click', () => {
    const state = timerState(widget);
    if (state.running || body.dataset.editing === '1') return;
    body.dataset.editing = '1';
    const max = state.mode === 'focus' ? 180 : state.mode === 'short' ? 60 : 90;
    const input = document.createElement('input');
    input.className = 'timer-time-input';
    input.type = 'number';
    input.min = '1';
    input.max = String(max);
    input.value = String(Math.max(1, Math.round(state.total / 60)));
    input.setAttribute('aria-label', `${TIMER_MODES[state.mode]} minutes`);
    time.replaceChildren(input);
    input.focus();
    input.select();
    let done = false;
    const finish = save => {
      if (done) return;
      done = true;
      const value = Math.round(cleanNumber(input.value, 1, max) ?? state.total / 60);
      if (save) {
        widget.options = { ...timerOptions(widget), [state.mode]: value };
        widget.state = { ...widget.state, mode: state.mode, running: false, left: value * 60, endsAt: null };
        persistWidgets();
      }
      delete body.dataset.editing;
      paintTimer(widget, body);
      if (save) renderWidgetsPanel();
    };
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') finish(true);
      else if (event.key === 'Escape') { event.stopPropagation(); finish(false); }
    });
    input.addEventListener('blur', () => finish(true));
  });
  const mode = document.createElement('div');
  mode.className = 'timer-mode';
  mode.hidden = true;
  const progress = document.createElement('div');
  progress.className = 'timer-progress';
  progress.append(Object.assign(document.createElement('div'), { className: 'timer-progress-fill' }));
  const actions = document.createElement('div');
  actions.className = 'timer-actions';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'timer-toggle';
  toggle.addEventListener('click', () => {
    const state = timerState(widget);
    if (state.running) setTimerState(widget, { running: false, left: state.left, endsAt: null });
    else setTimerState(widget, { running: true, endsAt: Date.now() + state.left * 1000, left: state.left });
    paintTimer(widget, body);
  });
  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'timer-reset';
  reset.textContent = 'Reset';
  reset.addEventListener('click', () => {
    const state = timerState(widget);
    setTimerState(widget, { running: false, left: state.total, endsAt: null });
    paintTimer(widget, body);
  });
  actions.append(toggle, reset);
  body.append(modes, time, mode, progress, actions);
  paintTimer(widget, body);
  return body;
}

// ---- Pomodoro timer V3 (dark card) --------------------------------------------
// Same timer engine again, shown as a dark card with a burning ring, session dots
// and settings inside the card (Duration / Notifications, with +/- steppers).
const T3_ICON = (paths, size = 20) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const T3_PATHS = {
  focus: '<path d="M2.5 12s3.6-6.5 9.5-6.5S21.5 12 21.5 12 17.9 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  short: '<path d="M5 9h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 3.5c0 1 1 1.2 1 2.2M12 3.5c0 1 1 1.2 1 2.2"/>',
  reset: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  back: '<path d="m15 6-6 6 6 6"/>',
  next: '<path d="m9 6 6 6-6 6"/>',
  minus: '<path d="M6 12h12"/>',
  plus: '<path d="M12 6v12M6 12h12"/>'
};
T3_PATHS.long = T3_PATHS.short;
// Same gear as the main Settings button (filled, so it needs its own wrapper).
const T3_GEAR = size => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 8.25C9.92881 8.25 8.24988 9.92893 8.24988 12C8.24988 14.0711 9.92881 15.75 11.9999 15.75C14.0709 15.75 15.7499 14.0711 15.7499 12C15.7499 9.92893 14.0709 8.25 11.9999 8.25ZM9.74988 12C9.74988 10.7574 10.7572 9.75 11.9999 9.75C13.2425 9.75 14.2499 10.7574 14.2499 12C14.2499 13.2426 13.2425 14.25 11.9999 14.25C10.7572 14.25 9.74988 13.2426 9.74988 12Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.00227 12.8734C1.80404 13.5665 1.39452 15.1002 2.0855 16.2991L3.32494 18.4497C4.01637 19.6495 5.5489 20.0616 6.7479 19.3681C7.41601 18.9816 8.2552 19.4633 8.2552 20.2416C8.2552 21.6257 9.37555 22.75 10.7604 22.75H13.2392C14.6241 22.75 15.7445 21.6256 15.7445 20.2416C15.7445 19.4632 16.5837 18.9816 17.2518 19.368C18.4508 20.0614 19.9833 19.6494 20.6747 18.4496L21.9142 16.299C22.6052 15.1 22.1957 13.5664 20.9975 12.8734C20.3267 12.4854 20.3267 11.5143 20.9975 11.1264C22.1957 10.4334 22.6052 8.8997 21.9142 7.70078L20.6747 5.55011C19.9833 4.35038 18.4508 3.93833 17.2518 4.6318C16.5837 5.01823 15.7445 4.53654 15.7445 3.7583C15.7445 2.37427 14.6242 1.25 13.2393 1.25H10.7603C9.37552 1.25 8.2552 2.37425 8.2552 3.75827C8.2552 4.53644 7.41606 5.01814 6.74793 4.6317C5.54896 3.93824 4.01638 4.35027 3.32494 5.55001L2.0855 7.70061C1.39452 8.89956 1.80404 10.4333 3.00227 11.1263C3.6731 11.5143 3.6731 12.4854 3.00227 12.8734ZM3.38512 15.5502C3.10671 15.0671 3.27247 14.45 3.75327 14.1719C5.42276 13.2063 5.42276 10.7935 3.75327 9.82786C3.27247 9.54977 3.10671 8.93268 3.38512 8.4496L4.62456 6.29901C4.90249 5.81675 5.51691 5.65253 5.99693 5.93016C7.66898 6.89724 9.7552 5.68712 9.7552 3.75827C9.7552 3.20015 10.2065 2.75 10.7603 2.75L13.2393 2.75C13.7932 2.75 14.2445 3.20017 14.2445 3.7583C14.2445 5.68715 16.3307 6.89737 18.0028 5.93026C18.4828 5.65263 19.0972 5.81685 19.3751 6.29911L20.6146 8.44978C20.893 8.93282 20.7273 9.54986 20.2465 9.82792C18.577 10.7935 18.577 13.2063 20.2465 14.1718C20.7273 14.4499 20.893 15.0669 20.6146 15.55L19.3751 17.7006C19.0972 18.1829 18.4828 18.3471 18.0028 18.0695C16.3306 17.1023 14.2445 18.3128 14.2445 20.2416C14.2445 20.7998 13.7932 21.25 13.2392 21.25H10.7604C10.2065 21.25 9.7552 20.7998 9.7552 20.2416C9.7552 18.3128 7.66905 17.1025 5.99689 18.0696C5.51689 18.3472 4.9025 18.183 4.62456 17.7008L3.38512 15.5502Z" fill="currentColor"/></svg>`;
const T3_FIELDS = {
  focus: { label: 'Focus Session', unit: 'min', min: 1, max: 180 },
  short: { label: 'Short break', unit: 'min', min: 1, max: 60 },
  long: { label: 'Long break', unit: 'min', min: 1, max: 90 },
  longEvery: { label: 'Long break after', unit: 'Sess.', min: 1, max: 8 }
};

function timerApplyOptions(widget, changes) {
  widget.options = { ...timerOptions(widget), ...changes };
  const state = timerState(widget);
  if (!state.running) widget.state = { ...widget.state, mode: state.mode, left: timerOptions(widget)[state.mode] * 60, endsAt: null };
  persistWidgets();
}

function t3El(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function t3Button(className, label, icon, onClick) {
  const button = t3El('button', className);
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.title = label;
  button.innerHTML = icon === 'gear' ? T3_GEAR(20) : T3_ICON(T3_PATHS[icon]);
  button.addEventListener('click', onClick);
  return button;
}

function paintTimer3(widget, body) {
  const state = timerState(widget);
  const options = timerOptions(widget);
  const minutes = String(Math.floor(state.left / 60)).padStart(2, '0');
  const seconds = String(state.left % 60).padStart(2, '0');
  paintRollingText(body.querySelector('.timer3-time'), `${minutes}:${seconds}`);
  body.querySelector('.timer3-label').textContent = TIMER_MODES[state.mode];
  const icon = body.querySelector('.timer3-icon');
  if (icon.dataset.mode !== state.mode) {
    icon.dataset.mode = state.mode;
    icon.innerHTML = T3_ICON(T3_PATHS[state.mode], 22);
  }
  const lit = state.mode === 'focus' ? (state.cycle % options.longEvery) + 1 : state.mode === 'long' ? options.longEvery : state.cycle % options.longEvery;
  const dots = body.querySelector('.timer3-dots');
  if (dots.children.length !== options.longEvery) {
    dots.replaceChildren(...Array.from({ length: options.longEvery }, () => t3El('i')));
  }
  [...dots.children].forEach((dot, index) => dot.classList.toggle('on', index < lit));
  body.querySelector('.timer3-toggle').textContent = state.running ? 'Pause' : state.left < state.total ? 'Resume' : 'Start';
  // Ring: the red arc is the time that is left, and its glowing end moves toward the bottom.
  const fraction = Math.max(0, Math.min(1, state.left / state.total));
  const small = Math.abs(fraction - (body._fraction ?? fraction)) < 0.05;
  body.classList.toggle('smooth', state.running && small);
  body._fraction = fraction;
  body.querySelector('.timer3-arc').style.strokeDashoffset = String(1000 * (1 - fraction));
  body.querySelector('.timer3-head-rot').style.transform = `rotate(${-fraction * 360}deg)`;
  body.querySelector('.timer3-head-rot').style.opacity = fraction > 0.003 && fraction < 0.999 ? '1' : '0';
  body.dataset.running = String(state.running);
  body.dataset.mode = state.mode;
}

function buildTimer3Body(widget) {
  const body = t3El('div', 'timer3-body');
  let view = 'main';
  let tab = 'duration';
  let editing = 'focus';

  // ---- main view ----
  const main = t3El('div', 'timer3-main');
  const ring = t3El('div', 'timer3-ring');
  ring.innerHTML = '<svg viewBox="0 0 200 200" aria-hidden="true"><circle class="timer3-track" cx="100" cy="100" r="88"/>' +
    '<g class="timer3-flip"><circle class="timer3-arc" cx="100" cy="100" r="88" pathLength="1000"/></g>' +
    '<g class="timer3-head-rot"><circle class="timer3-head" cx="100" cy="188" r="5.5"/></g></svg>';
  const center = t3El('div', 'timer3-center');
  const modeIcon = t3El('div', 'timer3-icon');
  const time = t3El('div', 'timer3-time');
  const dots = t3El('div', 'timer3-dots');
  const label = t3El('button', 'timer3-label');
  label.type = 'button';
  label.title = 'Switch session';
  label.addEventListener('click', () => {
    const keys = Object.keys(TIMER_MODES);
    const next = keys[(keys.indexOf(timerState(widget).mode) + 1) % keys.length];
    setTimerState(widget, { mode: next, running: false, left: timerOptions(widget)[next] * 60, endsAt: null });
    paintTimer3(widget, body);
  });
  center.append(modeIcon, time, dots, label);
  ring.append(center);
  const bar = t3El('div', 'timer3-bar');
  const reset = t3Button('timer3-round', 'Reset timer', 'reset', () => {
    const state = timerState(widget);
    setTimerState(widget, { running: false, left: state.total, endsAt: null });
    paintTimer3(widget, body);
  });
  const toggle = t3El('button', 'timer3-toggle');
  toggle.type = 'button';
  toggle.addEventListener('click', () => {
    const state = timerState(widget);
    if (state.running) setTimerState(widget, { running: false, left: state.left, endsAt: null });
    else setTimerState(widget, { running: true, endsAt: Date.now() + state.left * 1000, left: state.left });
    paintTimer3(widget, body);
  });
  const gear = t3Button('timer3-round', 'Timer settings', 'gear', () => { view = 'settings'; showView(); });
  bar.append(reset, toggle, gear);
  main.append(ring, bar);

  // ---- settings panel (rebuilt each time it opens) ----
  const panel = t3El('div', 'timer3-panel');
  panel.hidden = true;

  function renderSettings() {
    const options = timerOptions(widget);
    const head = t3El('div', 'timer3-panel-head');
    head.append(t3El('div', 'timer3-panel-title', 'Settings'), t3Button('timer3-round', 'Close settings', 'close', () => { view = 'main'; showView(); renderWidgetsPanel(); }));
    const tabs = t3El('div', 'timer3-tabs');
    [['duration', 'Duration'], ['notifications', 'Notifications']].forEach(([key, text]) => {
      const button = t3El('button', '', text);
      button.type = 'button';
      button.setAttribute('aria-pressed', String(tab === key));
      button.addEventListener('click', () => { tab = key; renderSettings(); });
      tabs.append(button);
    });
    const list = t3El('div', 'timer3-list');
    if (tab === 'duration') {
      Object.entries(T3_FIELDS).forEach(([key, field]) => {
        const row = t3El('button', 'timer3-row');
        row.type = 'button';
        const value = t3El('span', 'timer3-row-value');
        const number = t3El('b', '', field.unit === 'min' ? String(options[key]).padStart(2, '0') : String(options[key]));
        value.append(number, t3El('small', '', field.unit));
        const chevron = t3El('span', 'timer3-chevron');
        chevron.innerHTML = T3_ICON(T3_PATHS.next, 16);
        row.append(t3El('span', '', field.label), value, chevron);
        row.addEventListener('click', () => { editing = key; view = 'edit'; showView(); });
        list.append(row);
      });
    } else {
      const soundRow = t3El('button', 'timer3-row');
      soundRow.type = 'button';
      soundRow.setAttribute('role', 'switch');
      soundRow.setAttribute('aria-checked', String(options.sound));
      const soundState = t3El('span', 'timer3-switch');
      soundRow.append(t3El('span', '', 'Sound when a session ends'), soundState);
      soundRow.addEventListener('click', () => {
        timerApplyOptions(widget, { sound: !timerOptions(widget).sound });
        renderSettings();
      });

      const notifyRow = t3El('button', 'timer3-row');
      notifyRow.type = 'button';
      notifyRow.setAttribute('role', 'switch');
      notifyRow.setAttribute('aria-checked', String(options.notify));
      const notifyState = t3El('span', 'timer3-switch');
      notifyRow.append(t3El('span', '', 'Desktop notification when finished'), notifyState);
      notifyRow.addEventListener('click', async () => {
        const nextState = !timerOptions(widget).notify;
        if (nextState && 'Notification' in window && Notification.permission !== 'granted') {
          try {
            const res = await Notification.requestPermission();
            if (res !== 'granted') return;
          } catch {}
        }
        timerApplyOptions(widget, { notify: nextState });
        renderSettings();
      });

      list.append(soundRow, notifyRow);
    }
    panel.replaceChildren(head, tabs, list);
  }

  function renderEditor() {
    const field = T3_FIELDS[editing];
    const head = t3El('div', 'timer3-panel-head');
    head.append(t3Button('timer3-round', 'Back', 'back', () => { view = 'settings'; showView(); }), t3El('div', 'timer3-panel-title', ''));
    const title = t3El('div', 'timer3-edit-title', field.label);
    const stepper = t3El('div', 'timer3-stepper');
    const value = t3El('div', 'timer3-edit-value', String(timerOptions(widget)[editing]));
    const unit = t3El('div', 'timer3-edit-unit', field.unit === 'Sess.' ? 'sessions' : field.unit);
    const change = delta => {
      const next = Math.max(field.min, Math.min(field.max, timerOptions(widget)[editing] + delta));
      timerApplyOptions(widget, { [editing]: next });
      value.textContent = String(next);
      paintTimer3(widget, body);
    };
    const minus = t3Button('timer3-square', 'Decrease', 'minus', () => change(-1));
    const plus = t3Button('timer3-square', 'Increase', 'plus', () => change(1));
    stepper.append(minus, value, plus);
    panel.replaceChildren(head, title, stepper, unit);
  }

  function showView() {
    main.hidden = view !== 'main';
    panel.hidden = view === 'main';
    if (view === 'settings') renderSettings();
    else if (view === 'edit') renderEditor();
    if (view === 'main') paintTimer3(widget, body);
  }

  body.append(main, panel);
  paintTimer3(widget, body);
  body.classList.remove('smooth');
  return body;
}

// ---- Weather ----------------------------------------------------------------
const WEATHER_CACHE_KEY = 'tabby-weather-cache';
const WEATHER_MAX_AGE = 20 * 60 * 1000;
const WEATHER_ICONS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>',
  partly: '<circle cx="8.5" cy="8.5" r="2.8"/><path d="M8.5 2.5v1.2M2.5 8.5h1.2M4.3 4.3l.9.9M12.7 4.3l-.9.9"/><path d="M8 19h9a3.5 3.5 0 0 0 .4-7A5 5 0 0 0 8 13a3 3 0 0 0 0 6Z"/>',
  cloud: '<path d="M7 19h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 12.5 3.3 3.3 0 0 0 7 19Z"/>',
  fog: '<path d="M7 14h10a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.5 8.5 2.8 2.8 0 0 0 7 14Z"/><path d="M5 18h14M8 21h8"/>',
  rain: '<path d="M7 15h10a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.5 9.5 2.8 2.8 0 0 0 7 15Z"/><path d="m8 18-1 2.5M12 18l-1 2.5M16 18l-1 2.5"/>',
  snow: '<path d="M7 14h10a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.5 8.5 2.8 2.8 0 0 0 7 14Z"/><path d="M8 18v.01M12 19.5v.01M16 18v.01M10 21v.01M14 21v.01"/>',
  storm: '<path d="M7 14h10a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.5 8.5 2.8 2.8 0 0 0 7 14Z"/><path d="m12.5 14-2 3.5h3l-2 3.5"/>'
};

function weatherInfo(code, isDay) {
  if (code === 0) return isDay ? { icon: 'sun', label: 'Clear' } : { icon: 'moon', label: 'Clear' };
  if (code === 1 || code === 2) return { icon: isDay ? 'partly' : 'cloud', label: 'Partly cloudy' };
  if (code === 3) return { icon: 'cloud', label: 'Cloudy' };
  if (code === 45 || code === 48) return { icon: 'fog', label: 'Fog' };
  if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { icon: 'rain', label: code >= 80 ? 'Showers' : 'Rain' };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { icon: 'snow', label: 'Snow' };
  if (code >= 95) return { icon: 'storm', label: 'Thunderstorm' };
  return { icon: 'cloud', label: 'Cloudy' };
}

function weatherOptions(widget) {
  const o = widget.options || {};
  const lat = cleanNumber(o.lat, -90, 90);
  const lon = cleanNumber(o.lon, -180, 180);
  const city = String(o.city || '').trim().slice(0, 60);
  const located = lat !== null && lon !== null && Boolean(city);
  return { city: located ? city : '', lat: located ? lat : null, lon: located ? lon : null, units: o.units === 'f' ? 'f' : 'c' };
}

const WEATHER_STALE_LIMIT = 24 * 60 * 60 * 1000; // a city's last reading stays usable for a day (offline / service down)
const WEATHER_CACHE_MAX_ENTRIES = 24;
const WEATHER_RETRY_AFTER = 60 * 1000;
const weatherInflight = new Map();
const weatherFailedAt = new Map();

const weatherKey = (lat, lon) => `${lat.toFixed(2)},${lon.toFixed(2)}`;

function validWeatherEntry(entry) {
  const data = entry?.data;
  return Number.isFinite(entry?.time) && Boolean(data) && [data.temp, data.code, data.high, data.low].every(Number.isFinite);
}

function readWeatherCache() {
  try {
    const raw = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY) || '{}');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    return Object.fromEntries(Object.entries(raw).filter(([key, entry]) => /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(key) && validWeatherEntry(entry)));
  } catch { return {}; }
}

// Adds or updates ONE city and keeps all the others (old entries are dropped after a day, newest 24 are kept).
function writeWeatherCache(key, data) {
  const cache = readWeatherCache();
  cache[key] = { time: Date.now(), data };
  const now = Date.now();
  const kept = Object.entries(cache)
    .filter(([entryKey, entry]) => entryKey === key || now - entry.time < WEATHER_STALE_LIMIT)
    .sort((a, b) => b[1].time - a[1].time)
    .slice(0, WEATHER_CACHE_MAX_ENTRIES);
  safeSetItem(WEATHER_CACHE_KEY, JSON.stringify(Object.fromEntries(kept)));
}

// One request with a timeout. Errors say whether trying again straight away makes sense.
async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    let response;
    try {
      response = await fetch(url, { signal: controller.signal, cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' });
    } catch (cause) {
      const error = new Error(cause?.name === 'AbortError' ? 'The weather service took too long to answer.' : 'Could not reach the weather service.');
      error.retryable = true;
      throw error;
    }
    if (!response.ok) {
      const error = new Error(response.status === 429 ? 'The weather service is busy. Try again in a minute.' : 'The weather service had a problem.');
      error.retryable = response.status >= 500;
      throw error;
    }
    const text = await response.text();
    if (text.length > 200000) throw new Error('The weather service sent too much data.');
    try {
      return JSON.parse(text);
    } catch {
      throw new Error('The weather service sent an answer Tabby cannot read.');
    }
  } finally {
    clearTimeout(timeout);
  }
}

function parseWeather(json) {
  const current = json?.current;
  const daily = json?.daily;
  const high = Array.isArray(daily?.temperature_2m_max) ? daily.temperature_2m_max[0] : undefined;
  const low = Array.isArray(daily?.temperature_2m_min) ? daily.temperature_2m_min[0] : undefined;
  const data = { temp: current?.temperature_2m, code: current?.weather_code, isDay: current?.is_day === 1, high, low };
  const sensible = value => Number.isFinite(value) && value > -100 && value < 70;
  if (![data.temp, data.high, data.low].every(sensible) || !Number.isInteger(data.code) || data.code < 0 || data.code > 99) {
    throw new Error('Unexpected weather data');
  }
  return data;
}

async function requestWeather(lat, lon) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: String(lat), longitude: String(lon),
    current: 'temperature_2m,weather_code,is_day', daily: 'temperature_2m_max,temperature_2m_min',
    timezone: 'auto', forecast_days: '1'
  }).toString();
  let lastError;
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt) await new Promise(resolve => setTimeout(resolve, 1200));
    try {
      return parseWeather(await fetchJson(url.href));
    } catch (error) {
      lastError = error;
      if (!error.retryable) break;
    }
  }
  throw lastError;
}

// Several widgets (or a refresh and a re-render) asking for the same city share ONE request.
function fetchWeather(lat, lon) {
  const key = weatherKey(lat, lon);
  const cached = readWeatherCache()[key];
  const age = cached ? Date.now() - cached.time : Infinity;
  if (cached && age >= 0 && age < WEATHER_MAX_AGE) return Promise.resolve(cached.data);
  if (weatherInflight.has(key)) return weatherInflight.get(key);
  const failedAt = weatherFailedAt.get(key);
  if (failedAt && Date.now() - failedAt < WEATHER_RETRY_AFTER) {
    return cached ? Promise.resolve(cached.data) : Promise.reject(new Error('Weather is unavailable right now.'));
  }
  const request = requestWeather(lat, lon)
    .then(data => { weatherFailedAt.delete(key); writeWeatherCache(key, data); return data; })
    .catch(error => {
      weatherFailedAt.set(key, Date.now());
      if (cached) return cached.data; // a slightly old reading beats an error
      throw error;
    })
    .finally(() => weatherInflight.delete(key));
  weatherInflight.set(key, request);
  return request;
}

function paintWeather(widget, body, data, message) {
  const options = weatherOptions(widget);
  const empty = body.querySelector('.weather-empty');
  const main = body.querySelector('.weather-main');
  const skeleton = body.querySelector('.weather-skeleton');
  const loading = !data && message === 'Loading weather…';
  empty.hidden = Boolean(data) || loading;
  main.hidden = !data;
  if (!data) {
    skeleton.hidden = !loading;
    empty.textContent = loading ? '' : message;
    return;
  }
  skeleton.hidden = true;
  const info = weatherInfo(data.code, data.isDay);
  const convert = value => Math.round(options.units === 'f' ? value * 9 / 5 + 32 : value);
  body.querySelector('.weather-icon').innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${WEATHER_ICONS[info.icon] || WEATHER_ICONS.cloud}</svg>`;
  paintRollingText(body.querySelector('.weather-temp'), `${convert(data.temp)}°`);
  body.querySelector('.weather-label').textContent = info.label;
  body.querySelector('.weather-city').textContent = options.city;
  body.querySelector('.weather-range').textContent = `H ${convert(data.high)}° · L ${convert(data.low)}°`;
}

async function updateWeather(widget, body) {
  const options = weatherOptions(widget);
  if (options.lat === null) { paintWeather(widget, body, null, 'Choose a city in the widget editor.'); return; }
  // Only the newest request for this widget may paint it, and never after the widget has been replaced.
  const token = (body._weatherToken || 0) + 1;
  body._weatherToken = token;
  try {
    const data = await fetchWeather(options.lat, options.lon);
    if (!body.isConnected || body._weatherToken !== token) return;
    paintWeather(widget, body, data);
  } catch {
    if (!body.isConnected || body._weatherToken !== token) return;
    paintWeather(widget, body, null, navigator.onLine === false ? 'You are offline. Weather updates when you are back online.' : 'Weather unavailable right now.');
  }
}

function refreshWeathers() {
  widgetLayer.querySelectorAll('.home-folder[data-widget-type="weather"]:not([hidden])').forEach(card => {
    const widget = widgets.find(item => item.id === card.dataset.widgetId);
    const body = card.querySelector('.weather-body');
    if (widget && body) updateWeather(widget, body);
  });
}

// ---- Notes widget: several notes in tabs, saved as you type ----
function newNote() {
  return { id: `n${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`, text: '' };
}
function ensureNotes(widget) {
  if (!Array.isArray(widget.notes) || !widget.notes.length) widget.notes = [newNote()];
  if (!widget.notes.some(note => note.id === widget.activeNote)) widget.activeNote = widget.notes[0].id;
  return widget.notes;
}
function noteLabel(note) {
  const line = note.text.split('\n').find(l => l.trim());
  return line ? line.trim().slice(0, 14) : 'New note';
}
function buildNotesBody(widget) {
  ensureNotes(widget);
  const body = document.createElement('div');
  body.className = 'notes-body';
  const head = document.createElement('div');
  head.className = 'notes-head';
  const tabs = document.createElement('div');
  tabs.className = 'notes-tabs';
  tabs.setAttribute('role', 'tablist');
  const add = document.createElement('button');
  add.className = 'notes-add';
  add.type = 'button';
  add.textContent = '+';
  add.title = 'New note';
  add.setAttribute('aria-label', 'New note');
  head.append(tabs, add);
  const area = document.createElement('textarea');
  area.className = 'notes-text';
  area.maxLength = NOTE_CHARS;
  area.spellcheck = false;
  area.placeholder = 'Write something…';
  area.setAttribute('aria-label', `${widget.name} note`);
  const foot = document.createElement('div');
  foot.className = 'notes-foot';
  const status = document.createElement('span');
  status.className = 'notes-status';
  const del = document.createElement('button');
  del.className = 'notes-delete';
  del.type = 'button';
  del.textContent = 'Delete note';
  foot.append(status, del);
  body.append(head, area, foot);

  const active = () => widget.notes.find(note => note.id === widget.activeNote);
  let timer = null;
  let confirmTimer = null;
  const resetDelete = () => { clearTimeout(confirmTimer); del.textContent = 'Delete note'; del.dataset.confirm = ''; };
  const flush = () => {
    if (timer === null) return;
    clearTimeout(timer);
    timer = null;
    persistWidgets();
    status.textContent = 'Saved';
  };
  const leave = () => { if (body.isConnected) flush(); else window.removeEventListener('pagehide', leave); };
  window.addEventListener('pagehide', leave);

  function paint(focus) {
    ensureNotes(widget);
    tabs.replaceChildren();
    widget.notes.forEach(note => {
      const tab = document.createElement('button');
      tab.className = 'notes-tab';
      tab.type = 'button';
      tab.dataset.noteId = note.id;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(note.id === widget.activeNote));
      tab.textContent = noteLabel(note);
      tab.addEventListener('click', () => {
        if (note.id === widget.activeNote) return;
        flush();
        resetDelete();
        widget.activeNote = note.id;
        persistWidgets();
        paint(true);
      });
      tabs.append(tab);
    });
    add.hidden = widget.notes.length >= NOTES_MAX;
    area.value = active().text;
    status.textContent = '';
    tabs.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    if (focus) area.focus();
  }
  area.addEventListener('input', () => {
    const note = active();
    note.text = area.value;
    const tab = tabs.querySelector(`[data-note-id="${CSS.escape(note.id)}"]`);
    if (tab) tab.textContent = noteLabel(note);
    status.textContent = 'Saving…';
    clearTimeout(timer);
    timer = setTimeout(() => { timer = 0; flush(); }, 400);
  });
  area.addEventListener('blur', flush);
  add.addEventListener('click', () => {
    if (widget.notes.length >= NOTES_MAX) return;
    flush();
    resetDelete();
    const note = newNote();
    widget.notes.push(note);
    widget.activeNote = note.id;
    persistWidgets();
    paint(true);
  });
  del.addEventListener('click', () => {
    const note = active();
    if (note.text.trim() && del.dataset.confirm !== 'true') {
      del.dataset.confirm = 'true';
      del.textContent = 'Sure?';
      confirmTimer = setTimeout(resetDelete, 2500);
      return;
    }
    clearTimeout(timer);
    timer = null;
    resetDelete();
    const index = widget.notes.indexOf(note);
    widget.notes.splice(index, 1);
    widget.activeNote = widget.notes[Math.min(index, widget.notes.length - 1)]?.id;
    ensureNotes(widget);
    persistWidgets();
    paint(true);
  });
  paint(false);
  return body;
}

function buildWeatherBody(widget) {
  const body = document.createElement('div');
  body.className = 'weather-body';
  body.innerHTML = '<p class="weather-empty" hidden></p><div class="weather-skeleton" hidden><span></span><span></span><span></span></div><div class="weather-main" hidden><span class="weather-icon"></span><span class="weather-temp"></span><span class="weather-details"><span class="weather-label"></span><span class="weather-city"></span><span class="weather-range"></span></span></div>';
  const options = weatherOptions(widget);
  const cached = options.lat === null ? null : readWeatherCache()[weatherKey(options.lat, options.lon)]?.data;
  paintWeather(widget, body, cached || null, options.lat === null ? 'Choose a city in the widget editor.' : 'Loading weather…');
  updateWeather(widget, body);
  return body;
}

async function geocodeCity(query) {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.search = new URLSearchParams({ name: query.slice(0, 100), count: '5', language: 'en', format: 'json' }).toString();
  const json = await fetchJson(url.href);
  const results = Array.isArray(json?.results) ? json.results : [];
  return results.map(item => ({
    name: String(item?.name || '').slice(0, 60),
    detail: [item?.admin1, item?.country].filter(value => typeof value === 'string' && value).join(', ').slice(0, 60),
    lat: item?.latitude,
    lon: item?.longitude
  })).filter(item => item.name && Number.isFinite(item.lat) && Number.isFinite(item.lon) && Math.abs(item.lat) <= 90 && Math.abs(item.lon) <= 180);
}

function refreshWidgetCard(widget) {
  const old = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
  renderWidgetInstance(widget);
  old?.remove();
  applyWidgetStacking();
}

// The widget at the top of the list sits on top of every other widget on the page.
function applyWidgetStacking() {
  widgets.forEach((widget, index) => {
    const card = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
    if (card) card.style.zIndex = String(2 + widgets.length - index);
  });
}

function renderWidgetInstance(widget) {
  const card = document.createElement('aside');
  card.className = `home-folder${moveMode ? ' move-mode' : ''}`;
  card.hidden = !widget.enabled;
  card.dataset.widgetId = widget.id;
  card.dataset.widgetType = widget.type || 'favorites';
  card.setAttribute('aria-label', `${widget.name} widget`);
  const heading = document.createElement('h2');
  heading.textContent = widget.name;
  const grid = document.createElement('div');
  grid.className = 'home-folder-grid';
  const isV2 = widget.type === 'favorites-v2';
  const isFavorites = isFavoritesType(widget.type || 'favorites');
  const visibleShortcuts = !isFavorites ? [] : isV2 ? (widget.shortcuts || []).filter(Boolean) : emptyShortcuts(widget.shortcuts);
  if (isV2 && visibleShortcuts.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'folder-empty-message';
    emptyMessage.textContent = 'Add sites from the Widgets settings.';
    grid.append(emptyMessage);
  }
  visibleShortcuts.forEach((savedShortcut, index) => {
    const safeUrl = savedShortcut && typeof savedShortcut === 'object' ? safeHttpUrl(savedShortcut.url) : '';
    const shortcut = safeUrl ? { name: String(savedShortcut.name || '').slice(0, 60), url: safeUrl } : null;
    if (!shortcut) {
      const add = document.createElement('button');
      add.className = 'home-folder-cell empty';
      add.type = 'button';
      add.innerHTML = '<svg class="shortcut-add-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 12H18" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 18V6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      add.setAttribute('aria-label', `Add shortcut to ${widget.name} slot ${index + 1}`);
      add.addEventListener('click', () => openShortcutEditor(widget.id, index));
      grid.append(add);
      return;
    }
    const link = document.createElement('a');
    link.className = 'home-folder-cell';
    link.href = shortcut.url;
    link.target = '_self';
    link.rel = 'noopener noreferrer';
    link.title = shortcut.name;
    link.setAttribute('aria-label', shortcut.name);
    const initial = document.createElement('span');
    initial.className = 'shortcut-fallback';
    initial.textContent = shortcut.name.trim().charAt(0).toUpperCase();
    const label = document.createElement('span');
    label.className = 'shortcut-label';
    label.textContent = shortcut.name;
    link.append(initial);
    const iconUrl = siteIconsOn() ? siteIconUrl(shortcut.url) : '';
    if (iconUrl) {
      const icon = document.createElement('img');
      icon.className = 'shortcut-site-icon';
      icon.alt = '';
      icon.hidden = true;
      icon.addEventListener('load', () => { icon.hidden = false; initial.hidden = true; });
      icon.src = iconUrl;
      link.append(icon);
    }
    if (isV2) link.append(label);
    grid.append(link);
  });
  const resizeHandle = document.createElement('button');
  resizeHandle.className = 'widget-resize-handle';
  resizeHandle.type = 'button';
  resizeHandle.setAttribute('aria-label', `Resize ${widget.name} widget`);
  resizeHandle.title = 'Drag to resize';
  let body = grid;
  if (widget.type === 'clock') body = buildClockBody(widget);
  else if (widget.type === 'search') body = buildSearchBody(widget);
  else if (widget.type === 'timer') body = buildTimerBody(widget);
  else if (widget.type === 'timer-v3') body = buildTimer3Body(widget);
  else if (widget.type === 'weather') body = buildWeatherBody(widget);
  else if (widget.type === 'notes') body = buildNotesBody(widget);
  heading.hidden = !isFavorites;
  if (isFavorites && scaleTogether(widget)) {
    // Favorites scale as one piece: everything inside grows and shrinks together.
    const inner = document.createElement('div');
    inner.className = 'fav-inner';
    inner.append(heading, body);
    card.append(inner, resizeHandle);
    card.dataset.fav = 'true';
    card.style.setProperty('--fav-scale', String(favScale(widget)));
  } else {
    card.append(heading, body, resizeHandle);
    if (Number.isFinite(widget.size?.width)) card.style.width = `${widget.size.width}px`;
    if (Number.isFinite(widget.size?.height)) card.style.height = `${widget.size.height}px`;
  }
  applyWidgetAppearance(widget, card);
  card.addEventListener('pointerdown', event => startWidgetDrag(widget, card, event));
  card.addEventListener('pointermove', event => moveWidget(widget, card, event));
  card.addEventListener('pointerup', event => finishWidgetDrag(widget, card, event));
  card.addEventListener('pointercancel', event => finishWidgetDrag(widget, card, event));
  card.addEventListener('click', event => {
    if (moveMode) { event.preventDefault(); event.stopPropagation(); }
  });
  widgetLayer.append(card);
  requestAnimationFrame(() => applyWidgetPosition(widget, card));
}

function scaleTogether(widget) {
  const saved = widget.options?.scaleTogether;
  return typeof saved === 'boolean' ? saved : widget.type !== 'favorites-v2';
}
const FAV_BASE_WIDTH = { favorites: 216, 'favorites-v2': 260 };
function favScale(widget) {
  if (Number.isFinite(widget.scale)) return Math.max(0.5, Math.min(2.5, widget.scale));
  const base = FAV_BASE_WIDTH[widget.type] || 216;
  if (Number.isFinite(widget.size?.width)) return Math.max(0.5, Math.min(2.5, widget.size.width / base));
  return 1;
}

// The button/panel surface of the theme that is on screen right now, as a hex
// string, so a new widget can start out matching the rest of the page.
function themeSurfaceColor(fallback = '#34322e') {
  if (typeof getComputedStyle !== 'function' || !document.documentElement) return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--tabby-button-bg').trim();
  if (!raw) return fallback;
  if (/^#[\da-f]{6}$/i.test(raw)) return raw.toLowerCase();
  const probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;left:-9999px;top:0;width:0;height:0';
  probe.style.color = raw;
  document.body.append(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  const parts = String(resolved).match(/\d+(\.\d+)?/g);
  if (!parts || parts.length < 3) return fallback;
  return '#' + parts.slice(0, 3).map(value => Math.round(Number(value)).toString(16).padStart(2, '0')).join('');
}

function applyWidgetAppearance(widget, card) {
  const color = /^#[\da-f]{6}$/i.test(widget.appearance?.backgroundColor || '') ? widget.appearance.backgroundColor : themeSurfaceColor();
  const savedOpacity = widget.appearance?.opacity;
  const opacity = Math.max(0, Math.min(100, savedOpacity == null ? 85 : Number(savedOpacity)));
  card.style.backgroundColor = `color-mix(in srgb, ${color} ${opacity}%, transparent)`;
  card.classList.toggle('no-outline', widget.appearance?.outline === false);
  const textColor = /^#[\da-f]{6}$/i.test(widget.appearance?.textColor || '') ? widget.appearance.textColor : '';
  card.classList.toggle('has-text-color', Boolean(textColor));
  if (textColor) card.style.setProperty('--widget-text', textColor);
  else card.style.removeProperty('--widget-text');
  const blur = blurAmount(widget);
  card.style.backdropFilter = blur ? `blur(${blur * 0.32}px) saturate(1.2)` : 'none';
}

function blurAmount(widget) {
  const saved = widget.appearance?.blur;
  if (typeof saved === 'number' && Number.isFinite(saved)) return Math.max(0, Math.min(100, saved));
  if (typeof saved === 'boolean') return saved ? 50 : 0;
  return isSimpleType(widget.type) ? 50 : 0;
}

// Widgets are positioned by a fraction of the empty space, so a narrow window can
// land two of them on top of each other. This pushes the later ones into free space,
// on screen only: the saved position is untouched, so widening the window again puts
// everything back exactly where the user left it.
let overlapPassFrame = 0;

function scheduleOverlapPass() {
  if (overlapPassFrame) cancelAnimationFrame(overlapPassFrame);
  overlapPassFrame = requestAnimationFrame(() => {
    overlapPassFrame = 0;
    resolveWidgetOverlaps();
  });
}

function resolveWidgetOverlaps() {
  const layer = widgetLayer.getBoundingClientRect();
  if (!layer.width || !layer.height) return;
  const gap = 12;
  const edge = 4;
  const boxes = widgets
    .filter(widget => widget.enabled)
    .map(widget => widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`))
    .filter(card => card && card.isConnected && (card.offsetWidth || card.offsetHeight))
    .map(card => {
      const rect = card.getBoundingClientRect();
      return { card, left: rect.left - layer.left, top: rect.top - layer.top, width: rect.width, height: rect.height };
    });
  if (boxes.length < 2) return;
  const overlaps = (a, b) => a.left < b.left + b.width + gap && a.left + a.width + gap > b.left
    && a.top < b.top + b.height + gap && a.top + a.height + gap > b.top;
  const placed = [];
  boxes.forEach(box => {
    let left = box.left;
    let top = box.top;
    if (placed.some(other => overlaps(box, other))) {
      const tries = [];
      placed.forEach(other => {
        tries.push({ left: other.left - box.width - gap, top: other.top });
        tries.push({ left: other.left, top: other.top + other.height + gap });
        tries.push({ left: other.left, top: other.top - box.height - gap });
        tries.push({ left: other.left + other.width + gap, top: other.top });
      });
      tries.push({ left: left, top: layer.height - box.height - edge });
      tries.push({ left: layer.width - box.width - edge, top: top });
      const found = tries.find(candidate => {
        if (candidate.left < edge || candidate.top < edge) return false;
        if (candidate.left + box.width > layer.width - edge || candidate.top + box.height > layer.height - edge) return false;
        return !placed.some(other => overlaps({ ...candidate, width: box.width, height: box.height }, other));
      });
      if (found) {
        left = found.left;
        top = found.top;
      }
    }
    const shiftX = left - box.left;
    const shiftY = top - box.top;
    if (Math.abs(shiftX) > 0.5 || Math.abs(shiftY) > 0.5) {
      const currentLeft = parseFloat(box.card.style.left) || 0;
      const currentTop = parseFloat(box.card.style.top) || 0;
      box.card.style.left = `${Math.round(currentLeft + shiftX)}px`;
      box.card.style.top = `${Math.round(currentTop + shiftY)}px`;
    }
    placed.push({ left, top, width: box.width, height: box.height });
  });
}

function applyWidgetPosition(widget, card) {
  if (!widget.enabled || !card.isConnected) return;
  const rect = card.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - rect.width);
  const maxTop = Math.max(0, window.innerHeight - rect.height);
  const x = Number.isFinite(widget.position?.x) ? widget.position.x : 0.5;
  const y = Number.isFinite(widget.position?.y) ? widget.position.y : 0.5;
  card.style.transform = 'none';
  card.style.left = `${Math.min(maxLeft, Math.max(0, x * maxLeft))}px`;
  card.style.top = `${Math.min(maxTop, Math.max(0, y * maxTop))}px`;
}

function saveWidgetGeometry(widget, card) {
  const rect = card.getBoundingClientRect();
  // A drag writes left/top and a resize writes width/height as inline pixels. Those
  // are the values the user chose, and unlike the rect they are never a frame behind,
  // so prefer them and keep the rect only as the fallback.
  const styledLeft = parseFloat(card.style.left);
  const styledTop = parseFloat(card.style.top);
  const styledWidth = parseFloat(card.style.width);
  const styledHeight = parseFloat(card.style.height);
  const width = Number.isFinite(styledWidth) ? styledWidth : rect.width;
  const height = Number.isFinite(styledHeight) ? styledHeight : rect.height;
  const left = Number.isFinite(styledLeft) ? styledLeft : rect.left;
  const top = Number.isFinite(styledTop) ? styledTop : rect.top;
  const maxLeft = Math.max(1, window.innerWidth - width);
  const maxTop = Math.max(1, window.innerHeight - height);
  widget.position = {
    x: Math.min(1, Math.max(0, left / maxLeft)),
    y: Math.min(1, Math.max(0, top / maxTop))
  };
  widget.size = { width, height };
  safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
}

function renderWidgetsPanel() {
  const orderHelp = document.getElementById('widgetOrderHelp');
  if (orderHelp) orderHelp.hidden = widgets.length < 2;
  widgetList.replaceChildren();
  widgetEditorSlot.replaceChildren();
  widgets.forEach(widget => {
    const manager = document.createElement('div');
    manager.className = 'widget-manager';
    const row = document.createElement('div');
    row.className = 'widget-toggle-row';
    const label = document.createElement('div');
    label.className = 'widget-toggle-label';
    const edit = document.createElement('button');
    edit.className = 'manage-bookmarks-button';
    edit.type = 'button';
    edit.setAttribute('aria-label', `Edit ${widget.name} widget`);
    edit.setAttribute('aria-expanded', String(openEditorWidgetId === widget.id));
    edit.title = 'Edit widget';
    edit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"/><path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"/><path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"/></svg>';
    edit.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      openEditorWidgetId = openEditorWidgetId === widget.id ? null : widget.id;
      renderWidgetsPanel();
    });
    const name = document.createElement('span');
    name.className = 'widget-manager-name';
    name.textContent = widget.name;
    manager.dataset.widgetId = widget.id;
    const grip = document.createElement('button');
    grip.className = 'widget-grip';
    grip.type = 'button';
    grip.title = 'Drag to reorder. The top widget stays above the others.';
    grip.setAttribute('aria-label', `Reorder ${widget.name}. Press arrow up or down to move it.`);
    grip.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>';
    label.append(grip, name);
    const actions = document.createElement('div');
    actions.className = 'widget-manager-actions';
    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'toggle-control';
    toggleLabel.setAttribute('aria-label', `Show ${widget.name} widget`);
    const toggle = document.createElement('input');
    toggle.className = 'widget-toggle-input';
    toggle.type = 'checkbox';
    toggle.checked = Boolean(widget.enabled);
    const slider = document.createElement('span');
    slider.className = 'widget-toggle';
    slider.setAttribute('aria-hidden', 'true');
    slider.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><g transform="scale(1.33333)"><path d="M6,13.75h6c2.623,0,4.75-2.127,4.75-4.75h0c0-2.623-2.127-4.75-4.75-4.75H6" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><circle cx="6" cy="9" r="4.75" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle></g></svg>';
    toggleLabel.append(toggle, slider);
    toggle.addEventListener('change', () => {
      widget.enabled = toggle.checked;
      saveWidgets();
    });
    const remove = document.createElement('button');
    remove.className = 'bookmark-delete widget-remove';
    remove.type = 'button';
    remove.innerHTML = TRASH_ICON;
    remove.title = `Delete ${widget.name} widget`;
    remove.setAttribute('aria-label', `Delete ${widget.name} widget`);
    remove.addEventListener('click', () => askDeleteWidget(widget));
    actions.append(edit, toggleLabel, remove);
    row.append(label, actions);
    manager.append(row);
    if (openEditorWidgetId === widget.id) {
      const dropdown = document.createElement('section');
      dropdown.className = 'bookmarks-dropdown';
      const title = document.createElement('h2');
      title.textContent = `Edit ${widget.name}`;
      const renameLabel = document.createElement('label');
      renameLabel.className = 'widget-appearance-label';
      renameLabel.textContent = 'Widget name';
      const rename = document.createElement('input');
      rename.className = 'widget-name-input';
      rename.id = `widget-name-${widget.id}`;
      renameLabel.htmlFor = rename.id;
      rename.type = 'text';
      rename.maxLength = 24;
      rename.value = widget.name;
      rename.setAttribute('aria-label', `Widget name for ${widget.name}`);
      rename.addEventListener('input', () => {
        const nextName = rename.value.trim();
        if (!nextName) return;
        widget.name = nextName;
        name.textContent = nextName;
        title.textContent = `Edit ${nextName}`;
        rename.setAttribute('aria-label', `Widget name for ${nextName}`);
        edit.setAttribute('aria-label', `Edit ${nextName} widget`);
        toggleLabel.setAttribute('aria-label', `Show ${nextName} widget`);
        remove.title = `Delete ${nextName} widget`;
        remove.setAttribute('aria-label', `Delete ${nextName} widget`);
        const card = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
        if (card) {
          card.setAttribute('aria-label', `${nextName} widget`);
          card.querySelector('h2').textContent = nextName;
        }
        safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
      });
      rename.addEventListener('blur', () => {
        rename.value = widget.name;
      });
      const list = document.createElement('div');
      list.className = 'bookmark-editor-list';
      renderBookmarkEditor(widget, list);
      const appearance = document.createElement('section');
      appearance.className = 'widget-appearance';
      const appearanceTitle = document.createElement('h3');
      appearanceTitle.textContent = 'Widget appearance';
      const opacityLabel = document.createElement('label');
      opacityLabel.className = 'widget-appearance-label';
      opacityLabel.textContent = 'Background opacity';
      const opacityValue = document.createElement('output');
      opacityValue.className = 'widget-opacity-value';
      const opacity = document.createElement('input');
      opacity.className = 'widget-opacity-input';
      opacity.type = 'range';
      opacity.min = '0';
      opacity.max = '100';
      opacity.step = '1';
      const savedOpacity = widget.appearance?.opacity;
      opacity.value = String(Math.max(0, Math.min(100, savedOpacity == null ? 85 : Number(savedOpacity))));
      opacityValue.value = `${opacity.value}%`;
      opacityLabel.append(opacityValue);
      opacity.addEventListener('input', () => {
        widget.appearance = { ...widget.appearance, opacity: Number(opacity.value) };
        opacityValue.value = `${opacity.value}%`;
        const card = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
        if (card) applyWidgetAppearance(widget, card);
        safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
      });
      const colorLabel = document.createElement('label');
      colorLabel.className = 'widget-appearance-label';
      colorLabel.textContent = 'Background color';
      const color = document.createElement('input');
      color.className = 'widget-background-color';
      color.type = 'color';
      color.value = /^#[\da-f]{6}$/i.test(widget.appearance?.backgroundColor || '') ? widget.appearance.backgroundColor : themeSurfaceColor();
      color.setAttribute('aria-label', `${widget.name} background color`);
      color.addEventListener('input', () => {
        widget.appearance = { ...widget.appearance, backgroundColor: color.value };
        const card = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
        if (card) applyWidgetAppearance(widget, card);
        safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
      });
      const textLabel = document.createElement('label');
      textLabel.className = 'widget-appearance-label';
      textLabel.textContent = 'Text color';
      const textColor = document.createElement('input');
      textColor.className = 'widget-background-color widget-text-color';
      textColor.type = 'color';
      const hasText = () => /^#[\da-f]{6}$/i.test(widget.appearance?.textColor || '');
      textColor.value = hasText() ? widget.appearance.textColor : '#ffffff';
      textColor.setAttribute('aria-label', `${widget.name} text color`);
      const resetText = document.createElement('button');
      resetText.type = 'button';
      resetText.className = 'widget-reset-text';
      resetText.textContent = 'Reset text color';
      resetText.hidden = !hasText();
      const applyText = () => {
        const card = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
        if (card) applyWidgetAppearance(widget, card);
        safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
        resetText.hidden = !hasText();
      };
      textColor.addEventListener('input', () => {
        widget.appearance = { ...widget.appearance, textColor: textColor.value };
        applyText();
      });
      resetText.addEventListener('click', () => {
        const { textColor: _removed, ...rest } = widget.appearance || {};
        widget.appearance = rest;
        textColor.value = '#ffffff';
        applyText();
      });
      const outlineRow = switchRow('Turn off outline', 'Hides the border around this widget.', widget.appearance?.outline === false, on => {
        widget.appearance = { ...widget.appearance, outline: !on };
        const card = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
        if (card) applyWidgetAppearance(widget, card);
        safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
      });
      const blurLabel = document.createElement('label');
      blurLabel.className = 'widget-appearance-label';
      blurLabel.textContent = 'Background blur';
      const blurValue = document.createElement('output');
      blurValue.className = 'widget-opacity-value';
      const blur = document.createElement('input');
      blur.className = 'widget-opacity-input';
      blur.type = 'range';
      blur.min = '0';
      blur.max = '100';
      blur.step = '1';
      blur.value = String(blurAmount(widget));
      blurValue.value = `${blur.value}%`;
      blurLabel.append(blurValue);
      blur.addEventListener('input', () => {
        widget.appearance = { ...widget.appearance, blur: Number(blur.value) };
        blurValue.value = `${blur.value}%`;
        const card = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
        if (card) applyWidgetAppearance(widget, card);
        safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
      });
      appearance.append(appearanceTitle, opacityLabel, opacity, blurLabel, blur, colorLabel, color, textLabel, textColor, resetText, outlineRow);
      enhanceColorInput(color);
      enhanceColorInput(textColor);
      if (isFavoritesType(widget.type || 'favorites')) {
        appearance.append(switchRow('Scale together', 'On: resizing scales everything as one. Off: change width and height freely.', scaleTogether(widget), on => {
          widget.options = { ...widget.options, scaleTogether: on };
          delete widget.scale;
          safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
          refreshWidgetCard(widget);
        }));
      }
      const editorHeader = document.createElement('div');
      editorHeader.className = 'widget-editor-header';
      const editorClose = document.createElement('button');
      editorClose.className = 'panel-close';
      editorClose.type = 'button';
      editorClose.title = 'Close editor';
      editorClose.setAttribute('aria-label', 'Close widget editor');
      editorClose.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      editorClose.addEventListener('click', () => { openEditorWidgetId = null; renderWidgetsPanel(); });
      editorHeader.append(title, editorClose);
      dropdown.append(editorHeader, renameLabel, rename, list, appearance);
      widgetEditorSlot.append(dropdown);
    }
    widgetList.append(manager);
  });
}

function switchRow(labelText, helpText, checked, onChange) {
  const row = document.createElement('div');
  row.className = 'custom-color-row';
  const copy = document.createElement('div');
  const label = document.createElement('label');
  label.textContent = labelText;
  const help = document.createElement('p');
  help.className = 'interface-color-help';
  help.textContent = helpText;
  copy.append(label, help);
  const input = document.createElement('input');
  input.className = 'switch-input';
  input.type = 'checkbox';
  input.setAttribute('role', 'switch');
  input.id = `switch-${Math.random().toString(36).slice(2, 9)}`;
  label.htmlFor = input.id;
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));
  row.append(copy, input);
  return row;
}

function renderOptionsEditor(widget, list) {
  list.classList.add('widget-options');
  if (widget.type === 'notes') return;
  if (widget.type === 'clock') {
    const apply = changes => {
      widget.options = { ...widget.options, ...changes };
      persistWidgets();
      tickClocks();
    };
    const options = clockOptions(widget);
    list.append(
      switchRow('24-hour time', 'Off shows 12-hour time with AM/PM.', options.format === '24', on => apply({ format: on ? '24' : '12' })),
      switchRow('Show seconds', 'Updates every second.', options.seconds, on => apply({ seconds: on })),
      switchRow('Show date', 'Weekday and date under the time.', options.date, on => apply({ date: on }))
    );
    return;
  }
  if (isTimerType(widget.type)) {
    const options = timerOptions(widget);
    const apply = changes => {
      widget.options = { ...options, ...widget.options, ...changes };
      const state = timerState(widget);
      if (!state.running) widget.state = { ...widget.state, mode: state.mode, left: timerOptions(widget)[state.mode] * 60, endsAt: null };
      persistWidgets();
      refreshWidgetCard(widget);
    };
    [['focus', 'Focus minutes', 180], ['short', 'Short break minutes', 60], ['long', 'Long break minutes', 90], ['longEvery', 'Long break after (sessions)', 8]].forEach(([key, label, max]) => {
      const row = document.createElement('label');
      row.className = 'widget-appearance-label';
      row.textContent = label;
      const input = document.createElement('input');
      input.className = 'widget-name-input';
      input.type = 'number';
      input.min = '1';
      input.max = String(max);
      input.value = String(options[key]);
      input.setAttribute('aria-label', label);
      input.addEventListener('change', () => {
        const value = Math.round(cleanNumber(input.value, 1, max) ?? options[key]);
        input.value = String(value);
        apply({ [key]: value });
      });
      list.append(row, input);
    });
    list.append(switchRow('Sound', 'Plays a short beep when a session ends.', options.sound, on => apply({ sound: on })));
    list.append(switchRow('Desktop notification', 'Shows a desktop alert when a session ends.', options.notify, async on => {
      if (on && 'Notification' in window && Notification.permission !== 'granted') {
        try {
          const res = await Notification.requestPermission();
          if (res !== 'granted') return;
        } catch {}
      }
      apply({ notify: on });
    }));
    return;
  }
  if (widget.type === 'weather') {
    const options = weatherOptions(widget);
    const change = changes => {
      widget.options = { ...widget.options, ...changes };
      persistWidgets();
      refreshWidgetCard(widget);
    };
    const help = document.createElement('p');
    help.className = 'interface-color-help';
    help.textContent = options.city ? `City: ${options.city}` : 'Search for your city.';
    const input = document.createElement('input');
    input.className = 'widget-name-input';
    input.maxLength = 60;
    input.placeholder = 'City, e.g. Tashkent';
    input.setAttribute('aria-label', 'City');
    const find = document.createElement('button');
    find.className = 'font-upload-button';
    find.type = 'button';
    find.textContent = 'Find city';
    const results = document.createElement('div');
    results.className = 'weather-results';
    const search = async () => {
      if (find.disabled) return; // a search is already running (Enter can fire while the button is disabled)
      const query = input.value.trim();
      if (!query) { input.focus(); return; }
      results.replaceChildren();
      find.disabled = true;
      try {
        const found = await geocodeCity(query);
        if (!found.length) { help.textContent = 'No city found. Try another spelling.'; return; }
        help.textContent = 'Choose your city:';
        found.forEach(place => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'weather-result';
          button.textContent = place.detail ? `${place.name}, ${place.detail}` : place.name;
          button.addEventListener('click', () => {
            change({ city: place.name, lat: place.lat, lon: place.lon });
            renderWidgetsPanel();
          });
          results.append(button);
        });
      } catch {
        help.textContent = navigator.onLine === false ? 'You are offline. Connect to the internet to search for a city.' : 'Could not search right now. Check your connection and try again.';
      } finally {
        find.disabled = false;
      }
    };
    find.addEventListener('click', search);
    input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); search(); } });
    list.append(
      help, input, find, results,
      switchRow('Fahrenheit', 'Off shows Celsius.', options.units === 'f', on => change({ units: on ? 'f' : 'c' }))
    );
    return;
  }
  const opts = searchOptions(widget);
  const change = changes => {
    widget.options = { ...widget.options, ...changes };
    persistWidgets();
    refreshWidgetCard(widget);
  };
  const title = document.createElement('p');
  title.className = 'interface-color-help';
  title.textContent = 'Search engine';
  const group = document.createElement('div');
  group.className = 'segmented';
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', 'Search engine');
  Object.entries(opts.engines).forEach(([key, engine]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = engine.label;
    button.setAttribute('aria-pressed', String(opts.engine === key));
    button.addEventListener('click', () => {
      group.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      change({ engine: key });
    });
    group.append(button);
  });
  const customTitle = document.createElement('p');
  customTitle.className = 'interface-color-help';
  customTitle.textContent = 'Add your own engine. Use %s where the search words go.';
  const customName = document.createElement('input');
  customName.className = 'widget-name-input';
  customName.maxLength = 16;
  customName.placeholder = 'Name, e.g. Ecosia';
  customName.value = opts.customName;
  customName.setAttribute('aria-label', 'Custom engine name');
  const customUrl = document.createElement('input');
  customUrl.className = 'widget-name-input';
  customUrl.placeholder = 'https://www.ecosia.org/search?q=%s';
  customUrl.value = opts.customUrl;
  customUrl.setAttribute('aria-label', 'Custom engine address');
  const save = document.createElement('button');
  save.className = 'font-upload-button';
  save.type = 'button';
  save.textContent = 'Save engine';
  save.addEventListener('click', () => {
    const url = cleanCustomUrl(customUrl.value);
    if (!url) { customUrl.setCustomValidity('Use an https address with %s in it.'); customUrl.reportValidity(); return; }
    customUrl.setCustomValidity('');
    change({ customName: customName.value.trim() || 'Custom', customUrl: url, engine: 'custom' });
    renderWidgetsPanel();
  });
  customUrl.addEventListener('input', () => customUrl.setCustomValidity(''));
  list.append(
    title, group,
    switchRow('Engine switcher', 'Show engine buttons on the search bar.', opts.switcher, on => change({ switcher: on })),
    customTitle, customName, customUrl, save
  );
}

// Joined [ name | website ] bar for one shortcut row.
function buildShortcutInputGroup(shortcut) {
  const group = document.createElement('div');
  group.className = 'input-group';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'form-control';
  nameInput.maxLength = 28;
  nameInput.placeholder = 'Name';
  nameInput.setAttribute('aria-label', 'Name');
  nameInput.value = shortcut?.name || '';
  const urlInput = document.createElement('input');
  urlInput.type = 'text';
  urlInput.className = 'form-control';
  urlInput.inputMode = 'url';
  urlInput.placeholder = 'youtube.com';
  urlInput.setAttribute('aria-label', 'Website, e.g. youtube.com');
  urlInput.value = shortcut?.url?.replace(/^https?:\/\//i, '') || '';
  group.append(nameInput, urlInput);
  return { group, nameInput, urlInput };
}

function wireShortcutAutoSave(widget, index, nameInput, urlInput, missingNameMessage) {
  let timer = null;
  const flush = () => {
    if (timer !== null) { clearTimeout(timer); timer = null; }
    if (!nameInput.isConnected) return; // the panel was re-rendered while this save was queued
    const name = nameInput.value.trim();
    const site = urlInput.value.trim();
    if (!name && !site) {
      if (widget.shortcuts[index]) { widget.shortcuts[index] = null; persistWidgets(); refreshWidgetCard(widget); }
      return;
    }
    if (!name || !site) return;
    let url;
    try { url = normalizeWebsite(site); } catch { return; }
    const saved = widget.shortcuts[index];
    if (saved?.name === name && saved?.url === url) return;
    widget.shortcuts[index] = { name, url };
    persistWidgets();
    refreshWidgetCard(widget);
  };
  for (const input of [nameInput, urlInput]) {
    input.addEventListener('input', () => {
      nameInput.setCustomValidity('');
      urlInput.setCustomValidity('');
      clearTimeout(timer);
      timer = setTimeout(flush, 400);
    });
    input.addEventListener('change', flush);
  }
  nameInput.addEventListener('blur', () => {
    flush();
    if (urlInput.value.trim() && !nameInput.value.trim()) {
      nameInput.setCustomValidity(missingNameMessage);
      nameInput.reportValidity();
    }
  });
  urlInput.addEventListener('blur', () => {
    flush();
    const site = urlInput.value.trim();
    if (!site) return;
    try { normalizeWebsite(site); } catch (error) { urlInput.setCustomValidity(error.message); urlInput.reportValidity(); }
  });
}

function renderBookmarkEditor(widget, list) {
  if (!isFavoritesType(widget.type || 'favorites')) {
    renderOptionsEditor(widget, list);
    return;
  }
  if (widget.type === 'favorites-v2') {
    renderExpandableBookmarkEditor(widget, list);
    return;
  }
  emptyShortcuts(widget.shortcuts).forEach((shortcut, index) => {
    const row = document.createElement('div');
    row.className = 'bookmark-editor-row';
    const { group, nameInput, urlInput } = buildShortcutInputGroup(shortcut);
    wireShortcutAutoSave(widget, index, nameInput, urlInput, 'Enter a name for this bookmark.');
    const remove = document.createElement('button');
    remove.className = 'bookmark-delete';
    remove.type = 'button';
    remove.innerHTML = TRASH_ICON;
    remove.title = 'Delete bookmark';
    remove.setAttribute('aria-label', `Delete bookmark ${index + 1}`);
    remove.addEventListener('click', () => { widget.shortcuts[index] = null; saveWidgets(); });
    row.append(group, remove);
    list.append(row);
  });
}

function renderExpandableBookmarkEditor(widget, list) {
  if (!Array.isArray(widget.shortcuts)) widget.shortcuts = [];
  widget.shortcuts.forEach((shortcut, index) => {
    const row = document.createElement('div');
    row.className = 'bookmark-editor-row bookmark-editor-row-v2';
    const { group, nameInput, urlInput } = buildShortcutInputGroup(shortcut);
    wireShortcutAutoSave(widget, index, nameInput, urlInput, 'Enter a name for this site.');
    const remove = document.createElement('button');
    remove.className = 'bookmark-delete';
    remove.type = 'button';
    remove.innerHTML = TRASH_ICON;
    remove.title = `Delete ${shortcut?.name || `site ${index + 1}`}`;
    remove.setAttribute('aria-label', `Delete site ${index + 1}`);
    remove.addEventListener('click', () => {
      widget.shortcuts.splice(index, 1);
      saveWidgets();
    });
    row.append(group, remove);
    list.append(row);
  });
  const addSite = document.createElement('button');
  addSite.className = 'bookmark-add-site';
  addSite.type = 'button';
  addSite.textContent = '＋ Add site';
  addSite.addEventListener('click', () => {
    widget.shortcuts.push(null);
    safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
    renderWidgetsPanel();
    widgetList.querySelector('.bookmark-editor-row-v2:last-of-type input')?.focus();
  });
  list.append(addSite);
}

// ---- Reorder widgets by dragging (list order = layer order) -------------------
function moveWidgetTo(id, newIndex) {
  const from = widgets.findIndex(item => item.id === id);
  const to = Math.max(0, Math.min(widgets.length - 1, newIndex));
  if (from < 0 || from === to) return false;
  const [item] = widgets.splice(from, 1);
  widgets.splice(to, 0, item);
  safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
  haptic('soft');
  applyWidgetStacking();
  renderWidgetsPanel();
  return true;
}

let reorderDrag = null;
function endReorder(commit) {
  const drag = reorderDrag;
  if (!drag) return;
  reorderDrag = null;
  window.removeEventListener('pointermove', onReorderMove);
  window.removeEventListener('pointerup', onReorderUp);
  window.removeEventListener('pointercancel', onReorderCancel);
  window.removeEventListener('keydown', onReorderKey, true);
  widgetList.classList.remove('is-reordering');
  [...widgetList.children].forEach(row => { row.classList.remove('reordering'); row.style.transform = ''; });
  if (drag.active && commit) moveWidgetTo(drag.id, drag.newIndex);
}
function onReorderMove(event) {
  const drag = reorderDrag;
  if (!drag || event.pointerId !== drag.pointerId) return;
  const dy = event.clientY - drag.startY;
  if (!drag.active) {
    if (Math.abs(dy) < 5) return;
    drag.active = true;
    widgetList.classList.add('is-reordering');
    drag.row.classList.add('reordering');
  }
  const rows = [...widgetList.children];
  const clamped = Math.max(-drag.index * drag.step, Math.min((rows.length - 1 - drag.index) * drag.step, dy));
  drag.row.style.transform = `translateY(${clamped}px)`;
  drag.newIndex = Math.max(0, Math.min(rows.length - 1, Math.round(drag.index + clamped / drag.step)));
  rows.forEach((row, i) => {
    if (i === drag.index) return;
    let shift = 0;
    if (drag.index < drag.newIndex && i > drag.index && i <= drag.newIndex) shift = -drag.step;
    else if (drag.newIndex < drag.index && i >= drag.newIndex && i < drag.index) shift = drag.step;
    row.style.transform = shift ? `translateY(${shift}px)` : '';
  });
}
function onReorderUp(event) { if (reorderDrag && event.pointerId === reorderDrag.pointerId) endReorder(true); }
function onReorderCancel(event) { if (reorderDrag && event.pointerId === reorderDrag.pointerId) endReorder(false); }
function onReorderKey(event) { if (event.key === 'Escape') { event.stopPropagation(); endReorder(false); } }

widgetList.addEventListener('pointerdown', event => {
  if (event.button !== 0 || reorderDrag) return;
  const row = event.target.closest('.widget-manager');
  const blocked = event.target.closest('button, label, input');
  const onGrip = Boolean(blocked && blocked.classList.contains('widget-grip'));
  if (!row || (blocked && !onGrip)) return;
  if (event.pointerType === 'touch' && !onGrip) return; // on touch screens only the grip drags, so the list can still scroll
  const rows = [...widgetList.children];
  const rects = rows.map(item => item.getBoundingClientRect());
  const step = rows.length > 1 ? rects[1].top - rects[0].top : rects[0].height + 12;
  reorderDrag = { id: row.dataset.widgetId, row, index: rows.indexOf(row), newIndex: rows.indexOf(row), startY: event.clientY, step, pointerId: event.pointerId, active: false };
  window.addEventListener('pointermove', onReorderMove);
  window.addEventListener('pointerup', onReorderUp);
  window.addEventListener('pointercancel', onReorderCancel);
  window.addEventListener('keydown', onReorderKey, true);
});
widgetList.addEventListener('keydown', event => {
  const grip = event.target.closest?.('.widget-grip');
  if (!grip || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return;
  event.preventDefault();
  const id = grip.closest('.widget-manager').dataset.widgetId;
  const index = widgets.findIndex(item => item.id === id);
  if (moveWidgetTo(id, index + (event.key === 'ArrowUp' ? -1 : 1))) {
    widgetList.querySelector(`[data-widget-id="${CSS.escape(id)}"] .widget-grip`)?.focus();
  }
});

function renderWidgets() {
  widgetLayer.replaceChildren();
  widgets.forEach(renderWidgetInstance);
  applyWidgetStacking();
  renderWidgetsPanel();
  scheduleOverlapPass();
}

function openShortcutEditor(widgetId, index) {
  const widget = widgets.find(item => item.id === widgetId);
  if (!widget) return;
  editingWidgetId = widgetId;
  editingSlot = index;
  const existing = widget.shortcuts?.[index];
  shortcutDialogTitle.textContent = existing ? 'Edit shortcut' : 'Add shortcut';
  shortcutName.value = existing?.name || '';
  shortcutUrl.value = existing?.url || '';
  shortcutDialog.showModal();
  shortcutName.focus();
}

addWidgetButton.addEventListener('click', () => {
  createWidgetForm.reset();
  createWidgetDialog.showModal();
  widgetNameInput.focus();
});
document.getElementById('cancelCreateWidget').addEventListener('click', () => createWidgetDialog.close());
createWidgetForm.addEventListener('submit', event => {
  event.preventDefault();
  const type = document.getElementById('widgetTypeSelect').value;
  const name = widgetNameInput.value.trim() || WIDGET_TYPES[type]?.defaultName || 'Widget';
  const isFavorites = isFavoritesType(type);
  widgets.push({
    id: `widget-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    name,
    enabled: true,
    shortcuts: type === 'favorites-v2' ? [] : isFavorites ? Array(9).fill(null) : [],
    ...(type === 'notes' ? (() => { const note = newNote(); return { notes: [note], activeNote: note.id }; })() : {}),
    options: type === 'clock' ? { format: '24', seconds: false, date: true } : type === 'search' ? { engine: 'google', switcher: false } : isTimerType(type) ? { focus: 25, short: 5, long: 15, sound: true } : type === 'weather' ? { units: 'c' } : undefined,
    position: { x: Math.min(0.82, 0.42 + ((widgets.length % 4) * 0.07)), y: Math.min(0.82, 0.22 + ((widgets.length % 5) * 0.09)) },
    size: null,
    appearance: { backgroundColor: type === 'timer-v3' ? '#050505' : themeSurfaceColor(), opacity: 30, blur: 30 }
  });
  openEditorWidgetId = null;
  safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
  createWidgetDialog.close();
  renderWidgets();
});
widgetNameInput.addEventListener('input', () => widgetNameInput.setCustomValidity(''));

moveModeButton.addEventListener('click', () => {
  moveMode = !moveMode;
  moveModeButton.setAttribute('aria-pressed', String(moveMode));
  moveModeButton.setAttribute('aria-label', moveMode ? 'Lock widget sizes and positions' : 'Enable widget moving and resizing');
  moveModeButton.title = moveMode ? 'Lock widgets' : 'Move or resize widgets';
  if (!moveMode && dragState) finishWidgetDrag(dragState.widget, dragState.element, { pointerId: dragState.pointerId });
  renderWidgets();
});

function startWidgetDrag(widget, card, event) {
  if (!moveMode || !widget.enabled || event.button !== 0) return;
  event.preventDefault();
  // The stylesheet centres a card with translate(-50%, -50%). Turn that off before
  // measuring, or the card jumps by half its size on the first move and the drop
  // lands somewhere the pointer never went.
  if (card.style.transform !== 'none') {
    const start = card.getBoundingClientRect();
    card.style.transform = 'none';
    card.style.left = `${start.left}px`;
    card.style.top = `${start.top}px`;
  }
  const rect = card.getBoundingClientRect();
  const resizing = event.target.classList.contains('widget-resize-handle');
  dragState = {
    widget, element: card, mode: resizing ? 'resize' : 'move', pointerId: event.pointerId,
    offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top,
    startX: event.clientX, startY: event.clientY, width: rect.width, height: rect.height,
    startScale: card.dataset.fav === 'true' ? favScale(widget) : 1
  };
  card.classList.add('moving');
  card.setPointerCapture(event.pointerId);
}

function moveWidget(widget, card, event) {
  if (!dragState || dragState.widget.id !== widget.id || event.pointerId !== dragState.pointerId) return;
  if (dragState.mode === 'resize' && card.dataset.fav === 'true') {
    const ratio = ((dragState.width + event.clientX - dragState.startX) / dragState.width + (dragState.height + event.clientY - dragState.startY) / dragState.height) / 2;
    dragState.scale = Math.max(0.5, Math.min(2.5, dragState.startScale * ratio));
    card.style.setProperty('--fav-scale', String(dragState.scale));
    return;
  }
  if (dragState.mode === 'resize') {
    const limits = WIDGET_TYPES[widget.type] || WIDGET_TYPES.favorites;
    card.style.width = `${Math.max(limits.minWidth, Math.min(window.innerWidth - 24, dragState.width + event.clientX - dragState.startX))}px`;
    card.style.height = `${Math.max(limits.minHeight, Math.min(window.innerHeight - 24, dragState.height + event.clientY - dragState.startY))}px`;
    return;
  }
  const rect = card.getBoundingClientRect();
  const left = Math.min(Math.max(0, event.clientX - dragState.offsetX), window.innerWidth - rect.width);
  const top = Math.min(Math.max(0, event.clientY - dragState.offsetY), window.innerHeight - rect.height);
  card.style.transform = 'none';
  card.style.left = `${left}px`;
  card.style.top = `${top}px`;
}

function finishWidgetDrag(widget, card, event) {
  if (!dragState || dragState.widget.id !== widget.id || event.pointerId !== dragState.pointerId) return;
  try { card.releasePointerCapture(event.pointerId); } catch {}
  card.classList.remove('moving');
  if (dragState.mode === 'resize' && Number.isFinite(dragState.scale)) widget.scale = dragState.scale;
  saveWidgetGeometry(widget, card);
  dragState = null;
}

window.addEventListener('resize', () => {
  widgets.forEach(widget => {
    const card = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
    if (card) applyWidgetPosition(widget, card);
  });
  scheduleOverlapPass();
});

shortcutForm.addEventListener('submit', event => {
  event.preventDefault();
  const widget = widgets.find(item => item.id === editingWidgetId);
  if (!widget || editingSlot === null) return;
  try {
    widget.shortcuts[editingSlot] = { name: shortcutName.value.trim(), url: normalizeWebsite(shortcutUrl.value) };
    safeSetItem(WIDGETS_KEY, JSON.stringify(widgets));
    shortcutDialog.close();
    editingSlot = null;
    editingWidgetId = null;
    renderWidgets();
  } catch {
    shortcutUrl.setCustomValidity('Enter a valid website address, such as youtube.com.');
    shortcutUrl.reportValidity();
  }
});
shortcutUrl.addEventListener('input', () => shortcutUrl.setCustomValidity(''));
document.getElementById('cancelShortcut').addEventListener('click', () => {
  shortcutDialog.close();
  editingSlot = null;
  editingWidgetId = null;
});

async function readBackground() {
  return readRecord(BACKGROUND_KEY);
}

async function saveBackground(file) {
  if (!file || !(file.type.startsWith('image/') || file.type.startsWith('video/'))) throw new Error('Choose a photo or a video.');
  if (file.size <= 0) throw new Error('That file is empty.');
  if (file.size > MAX_WALLPAPER_BYTES) throw new Error(`That file is too large (${formatBytes(file.size)}). The limit is ${formatBytes(MAX_WALLPAPER_BYTES)}.`);
  const existing = await readBackground().catch(() => null);
  await ensureSpaceFor(file.size, existing?.blob?.size || 0);
  await putRecord(BACKGROUND_KEY, { blob: file, type: file.type, name: file.name });
}

async function clearBackground() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).delete(BACKGROUND_KEY);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error || new Error('The browser cancelled the change.'));
  });
}

function showBackground(item) {
  backdrop.querySelectorAll('video').forEach(releaseVideo);
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  currentObjectUrl = null;
  backdrop.replaceChildren();
  backdrop.style.backgroundImage = '';
  currentWallpaperVideo = null;
  if (!item?.blob) { renderWallpaper(null); return; }
  currentObjectUrl = URL.createObjectURL(item.blob);
  if ((item.type || item.blob?.type || '').startsWith('video/')) {
    const video = document.createElement('video');
    video.src = currentObjectUrl;
    video.autoplay = true;
    video.muted = true;
    video.volume = savedWallpaperVolume() / 100;
    currentWallpaperVideo = video;
    video.addEventListener('playing', () => {
      if (document.hidden) pauseVideo(video);
    });
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('aria-hidden', 'true');
    backdrop.append(video);
  } else {
    backdrop.style.backgroundImage = `url("${currentObjectUrl}")`;
  }
  renderWallpaper(item);
}

let previewObjectUrl = null;

function renderWallpaper(item) {
  wallpaperList.querySelectorAll('video').forEach(releaseVideo);
  wallpaperList.replaceChildren();
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = null;
  }
  if (!item?.blob) return;
  const itemType = item.type || item.blob.type || '';
  const card = document.createElement('div');
  card.className = 'wallpaper-card';
  const preview = document.createElement('div');
  preview.className = 'wallpaper-preview';
  const previewUrl = URL.createObjectURL(item.blob);
  previewObjectUrl = previewUrl;
  if (itemType.startsWith('video/')) {
    const video = document.createElement('video');
    video.src = previewUrl;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    preview.append(video);
  } else {
    preview.style.backgroundImage = `url("${previewUrl}")`;
  }
  const name = document.createElement('div');
  name.className = 'wallpaper-name';
  name.textContent = item.name || 'Current wallpaper';
  const actions = document.createElement('div');
  actions.className = 'wallpaper-actions';
  let volumeRow = null;
  if (itemType.startsWith('video/')) {
    const sound = document.createElement('button');
    sound.className = 'wallpaper-sound-button';
    sound.type = 'button';
    const setSoundIcon = on => {
      const image = document.createElement('img');
      image.src = on ? WALLPAPER_SOUND_ON_ICON : WALLPAPER_SOUND_OFF_ICON;
      image.alt = '';
      sound.replaceChildren(image);
    };
    setSoundIcon(false);
    sound.setAttribute('aria-label', 'Enable wallpaper sound');
    sound.setAttribute('aria-pressed', 'false');
    sound.title = 'Enable wallpaper sound';
    sound.addEventListener('click', async () => {
      if (!currentWallpaperVideo) return;
      const enableSound = currentWallpaperVideo.muted;
      currentWallpaperVideo.muted = !enableSound;
      setSoundIcon(enableSound);
      sound.setAttribute('aria-label', enableSound ? 'Mute wallpaper sound' : 'Enable wallpaper sound');
      sound.setAttribute('aria-pressed', String(enableSound));
      sound.title = enableSound ? 'Mute wallpaper sound' : 'Enable wallpaper sound';
      if (enableSound) {
        try {
          await currentWallpaperVideo.play();
        } catch {
          currentWallpaperVideo.muted = true;
          setSoundIcon(false);
          sound.setAttribute('aria-label', 'Enable wallpaper sound');
          sound.setAttribute('aria-pressed', 'false');
          sound.title = 'Enable wallpaper sound';
        }
      }
    });
    actions.append(sound);
    volumeRow = document.createElement('div');
    volumeRow.className = 'wallpaper-volume-row';
    const volume = document.createElement('input');
    volume.className = 'wallpaper-volume';
    volume.type = 'range';
    volume.min = '0';
    volume.max = '100';
    volume.step = '1';
    volume.value = String(savedWallpaperVolume());
    volume.setAttribute('aria-label', 'Wallpaper volume');
    const volumeValue = document.createElement('span');
    volumeValue.className = 'wallpaper-volume-value';
    const paintVolume = () => {
      volumeValue.textContent = `${volume.value}%`;
      volume.style.setProperty('--fill', `${volume.value}%`);
    };
    paintVolume();
    volume.addEventListener('input', () => {
      const level = Number(volume.value);
      safeSetItem(VOLUME_KEY, String(level));
      paintVolume();
      if (!currentWallpaperVideo) return;
      currentWallpaperVideo.volume = level / 100;
      const muted = currentWallpaperVideo.muted;
      if ((level > 0 && muted) || (level === 0 && !muted)) sound.click();
    });
    volumeRow.append(volume, volumeValue);
  }
  const remove = document.createElement('button');
  remove.className = 'delete-button';
  remove.type = 'button';
  remove.setAttribute('aria-label', 'Remove wallpaper');
  remove.title = 'Remove wallpaper';
  remove.innerHTML = TRASH_ICON;
  remove.addEventListener('click', async () => {
    try {
      await clearBackground();
      showBackground(null); // frees the wallpaper and preview URLs and stops the videos
    } catch (error) {
      console.error('Could not remove wallpaper:', error);
      showNotice('Tabby could not remove the wallpaper. Try again.');
    }
  });
  actions.append(remove);
  card.append(preview, name, ...(volumeRow ? [volumeRow] : []), actions);
  wallpaperList.append(card);
}

settingsButton.addEventListener('click', () => {
  if (!wallpaperPanel.hidden) { closeWallpaperPanel(); return; }
  wallpaperPanel.hidden = false;
  wallpaperPanel.setAttribute('aria-hidden', 'false');
  settingsButton.setAttribute('aria-expanded', 'true');
});
uploadButton.addEventListener('click', () => fileInput.click());
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  tabViews.forEach(view => { view.hidden = view.id !== tab.getAttribute('aria-controls'); });
}));

// ---- Floating windows ----------------------------------------------------------
// The settings panel and the widget editor are two separate windows. Each one can be dragged
// by its header and resized from any edge or corner, and remembers where you left it.
const FRAME_MIN_W = 320;
const FRAME_MIN_H = 360;
const PANEL_FRAME_KEY = 'tabby-panel-frame-v1';
const EDITOR_FRAME_KEY = 'tabby-editor-frame-v1';
const FRAME_EDGES = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
const panelHeader = wallpaperPanel.querySelector('.panel-header');

function clampFrame(frame) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = Math.min(vw, Math.max(Math.min(FRAME_MIN_W, vw), frame.w));
  const h = Math.min(vh, Math.max(Math.min(FRAME_MIN_H, vh), frame.h));
  return { w, h, x: Math.min(vw - w, Math.max(0, frame.x)), y: Math.min(vh - h, Math.max(0, frame.y)) };
}
function readFrame(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && ['x', 'y', 'w', 'h'].every(name => Number.isFinite(saved[name]))) return clampFrame(saved);
  } catch {}
  return null;
}
function makeResizeLayer(anchor, extraClass) {
  const layer = document.createElement('div');
  layer.className = `panel-frame ${extraClass}`.trim();
  layer.hidden = true;
  FRAME_EDGES.forEach(edge => {
    const handle = document.createElement('i');
    handle.className = `pf-${edge}`;
    handle.dataset.edge = edge;
    layer.append(handle);
  });
  anchor.after(layer);
  return layer;
}
function defaultPanelFrame() {
  const w = Math.min(window.innerWidth - 16, Math.round(Math.max(340, Math.min(420, window.innerWidth * 0.26))));
  return { x: Math.max(0, window.innerWidth - w - 16), y: 16, w, h: Math.max(200, window.innerHeight - 32) };
}

const panelLayer = makeResizeLayer(wallpaperPanel, '');
const editorLayer = makeResizeLayer(widgetEditorSlot, 'editor-frame');
let panelFrame = readFrame(PANEL_FRAME_KEY) || defaultPanelFrame();
let panelFrameCustom = Boolean(localStorage.getItem(PANEL_FRAME_KEY));
let editorFrame = readFrame(EDITOR_FRAME_KEY); // null = open beside the settings window
let editorShown = null;

function applyFrames() {
  const root = document.documentElement.style;
  const f = panelFrame;
  root.setProperty('--pf-x', `${f.x}px`);
  root.setProperty('--pf-y', `${f.y}px`);
  root.setProperty('--pf-w', `${f.w}px`);
  root.setProperty('--pf-h', `${f.h}px`);
  // Until you move the editor yourself it opens beside the settings window (left if there is room, else right).
  const gap = 8;
  const ew = Math.min(f.w, 460);
  let ex = f.x - ew - gap;
  if (ex < gap) ex = f.x + f.w + gap;
  if (ex + ew > window.innerWidth - gap) ex = f.x;
  editorShown = editorFrame ? clampFrame(editorFrame) : clampFrame({ x: ex, y: f.y, w: ew, h: f.h });
  root.setProperty('--ed-x', `${editorShown.x}px`);
  root.setProperty('--ed-y', `${editorShown.y}px`);
  root.setProperty('--ed-w', `${editorShown.w}px`);
  root.setProperty('--ed-h', `${editorShown.h}px`);
}

function startFrameDrag(event, edge, start, update, done) {
  const startX = event.clientX;
  const startY = event.clientY;
  const pointerId = event.pointerId;
  document.body.classList.add('panel-dragging');
  document.body.dataset.panelEdge = edge;
  const move = e => {
    if (e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    let { x, y, w, h } = start;
    if (edge === 'move') {
      x += dx; y += dy;
    } else {
      if (edge.includes('e')) w = start.w + dx;
      if (edge.includes('s')) h = start.h + dy;
      if (edge.includes('w')) { w = start.w - dx; x = start.x + dx; }
      if (edge.includes('n')) { h = start.h - dy; y = start.y + dy; }
      if (w < FRAME_MIN_W) { if (edge.includes('w')) x = start.x + start.w - FRAME_MIN_W; w = FRAME_MIN_W; }
      if (h < FRAME_MIN_H) { if (edge.includes('n')) y = start.y + start.h - FRAME_MIN_H; h = FRAME_MIN_H; }
      if (x < 0) { w += x; x = 0; }
      if (y < 0) { h += y; y = 0; }
      if (x + w > window.innerWidth) w = window.innerWidth - x;
      if (y + h > window.innerHeight) h = window.innerHeight - y;
    }
    update(clampFrame({ x, y, w, h }));
  };
  const finish = e => {
    if (e.pointerId !== pointerId) return;
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', finish);
    window.removeEventListener('pointercancel', finish);
    document.body.classList.remove('panel-dragging');
    delete document.body.dataset.panelEdge;
    done();
  };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', finish);
  window.addEventListener('pointercancel', finish);
}

const movePanel = (event, edge) => startFrameDrag(event, edge, { ...panelFrame },
  frame => { panelFrame = frame; applyFrames(); },
  () => { panelFrameCustom = true; safeSetItem(PANEL_FRAME_KEY, JSON.stringify(panelFrame)); });
const moveEditor = (event, edge) => startFrameDrag(event, edge, { ...editorShown },
  frame => { editorFrame = frame; applyFrames(); },
  () => safeSetItem(EDITOR_FRAME_KEY, JSON.stringify(editorFrame)));

// Settings window
panelHeader.addEventListener('pointerdown', event => {
  if (event.button !== 0 || event.target.closest('button')) return;
  event.preventDefault();
  movePanel(event, 'move');
});
panelHeader.addEventListener('dblclick', event => {
  if (event.target.closest('button')) return;
  panelFrame = defaultPanelFrame();
  panelFrameCustom = false;
  localStorage.removeItem(PANEL_FRAME_KEY);
  applyFrames();
});
panelLayer.addEventListener('pointerdown', event => {
  const handle = event.target.closest('[data-edge]');
  if (!handle || event.button !== 0) return;
  event.preventDefault();
  movePanel(event, handle.dataset.edge);
});

// Widget editor window (works like any other window: move it, resize it, double-click its header to snap it back)
widgetEditorSlot.addEventListener('pointerdown', event => {
  if (event.button !== 0 || !event.target.closest('.widget-editor-header') || event.target.closest('button')) return;
  event.preventDefault();
  moveEditor(event, 'move');
});
widgetEditorSlot.addEventListener('dblclick', event => {
  if (!event.target.closest('.widget-editor-header') || event.target.closest('button')) return;
  editorFrame = null;
  localStorage.removeItem(EDITOR_FRAME_KEY);
  applyFrames();
});
editorLayer.addEventListener('pointerdown', event => {
  const handle = event.target.closest('[data-edge]');
  if (!handle || event.button !== 0) return;
  event.preventDefault();
  moveEditor(event, handle.dataset.edge);
});

// Whichever window you touched last sits in front.
const bringToFront = which => () => { document.body.dataset.front = which; };
[wallpaperPanel, panelLayer].forEach(node => node.addEventListener('pointerdown', bringToFront('panel'), true));
[widgetEditorSlot, editorLayer].forEach(node => node.addEventListener('pointerdown', bringToFront('editor'), true));
new MutationObserver(() => { panelLayer.hidden = wallpaperPanel.hidden; })
  .observe(wallpaperPanel, { attributes: true, attributeFilter: ['hidden'] });
new MutationObserver(() => {
  const open = widgetEditorSlot.childElementCount > 0;
  if (open && editorLayer.hidden) document.body.dataset.front = 'editor';
  editorLayer.hidden = !open;
}).observe(widgetEditorSlot, { childList: true });
window.addEventListener('resize', () => {
  panelFrame = panelFrameCustom ? clampFrame(panelFrame) : defaultPanelFrame();
  applyFrames();
});
applyFrames();

function closeWallpaperPanel() {
  openEditorWidgetId = null;
  renderWidgetsPanel();
  wallpaperPanel.hidden = true;
  wallpaperPanel.setAttribute('aria-hidden', 'true');
  settingsButton.setAttribute('aria-expanded', 'false');
}

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || wallpaperPanel.hidden) return;
  if (document.querySelector('dialog[open]')) return;
  closeWallpaperPanel();
});

// ---- Drop window ------------------------------------------------------------------
// Dragging a file over the page opens a drop target; dropping it or choosing one in
// the explorer closes the window again.
const dropWindow = document.getElementById('dropWindow');
const dropWindowButton = document.getElementById('dropWindowButton');
let dropDepth = 0;
function closeDropWindow() {
  dropDepth = 0;
  if (dropWindow && !dropWindow.hidden) dropWindow.hidden = true;
}
function openDropWindow() {
  if (dropWindow && dropWindow.hidden) dropWindow.hidden = false;
}
const carriesFiles = event => Array.from(event.dataTransfer?.types || []).includes('Files');
document.addEventListener('dragenter', event => {
  if (!carriesFiles(event)) return;
  dropDepth += 1;
  openDropWindow();
});
document.addEventListener('dragleave', event => {
  if (!carriesFiles(event)) return;
  dropDepth = Math.max(0, dropDepth - 1);
  if (!dropDepth) closeDropWindow();
});
document.addEventListener('dragend', closeDropWindow);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && dropWindow && !dropWindow.hidden) closeDropWindow();
});
dropWindowButton?.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  closeDropWindow();
  if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
    fileInput.value = '';
    showNotice('Choose a photo or a video for the wallpaper.');
    return;
  }
  try {
    await saveBackground(file);
    showBackground({ blob: file, type: file.type, name: file.name });
    notify({ type: 'success', title: 'Wallpaper set', message: 'Your new tab background is ready.', duration: 3000 });
  } catch (error) {
    console.error('Could not save background:', error);
    showNotice(describeStorageError(error, 'Tabby could not use that file as a wallpaper.'));
  }
  fileInput.value = '';
});

document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => {
  event.preventDefault();
  const file = event.dataTransfer?.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) return;
  fileInput.files = event.dataTransfer.files;
  fileInput.dispatchEvent(new Event('change'));
});

readBackground().then(showBackground).catch(error => {
  console.error('Could not load saved background:', error);
});
renderWidgets();
const siteIconsToggle = document.getElementById('siteIconsToggle');
siteIconsToggle.checked = siteIconsOn();
siteIconsToggle.addEventListener('change', () => {
  safeSetItem(SITE_ICONS_KEY, siteIconsToggle.checked ? 'on' : 'off');
  renderWidgets();
});
const autoHideToggle = document.getElementById('autoHideControlsToggle');
autoHideToggle.checked = localStorage.getItem(AUTOHIDE_KEY) === 'on';
document.body.classList.toggle('autohide-controls', autoHideToggle.checked);
autoHideToggle.addEventListener('change', () => {
  safeSetItem(AUTOHIDE_KEY, autoHideToggle.checked ? 'on' : 'off');
  document.body.classList.toggle('autohide-controls', autoHideToggle.checked);
});

enhanceGlideSelect(document.getElementById('themeSelect'), { ariaLabel: 'Color theme', menuWidth: 260 });
enhanceGlideSelect(document.getElementById('fontSelect'), { ariaLabel: 'Interface font', menuWidth: 220 });
enhanceGlideSelect(document.getElementById('widgetTypeSelect'), { ariaLabel: 'Widget type', menuWidth: 190 });
initFontSettings()
  .then(() => document.getElementById('fontSelect').glideSelectRefresh?.())
  .catch(error => console.error('Could not initialize font settings:', error));
migrateOldLavender();
migrateDefaultThemeToStone();
initInterfaceColor();
initUiBackgroundColor();
initButtonBackgroundColor();
// ---- Range sliders ---------------------------------------------------------------
// The input keeps the native drag and keyboard behaviour; a wrapper draws the
// filled track and the exact value in a bubble above the thumb.
function enhanceRangeInput(input) {
  if (!input || input.dataset.range) return;
  input.dataset.range = 'true';
  const field = document.createElement('span');
  field.className = 'range-field';
  input.before(field);
  field.append(input);
  const bubble = document.createElement('span');
  bubble.className = 'range-bubble';
  bubble.setAttribute('aria-hidden', 'true');
  const text = document.createElement('span');
  bubble.append(text);
  field.append(bubble);
  const decimals = (String(input.step).split('.')[1] || '').length;
  const paint = () => {
    const min = Number(input.min) || 0;
    const max = Number(input.max) || 100;
    const value = Number(input.value);
    const percent = max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0;
    input.style.setProperty('--range-fill', `${percent * 100}%`);
    bubble.style.left = `${percent * 100}%`;
    text.textContent = value.toFixed(decimals);
  };
  paint();
  input.addEventListener('input', paint);
  input.addEventListener('change', paint);
}
document.querySelectorAll('input[type="range"]').forEach(enhanceRangeInput);
document.querySelectorAll('input[type="color"]').forEach(enhanceColorInput);
initThemePresets();

// ---- Moving water background ---------------------------------------------------
// Plain canvas sines, drawn about 30 times a second. It stops when the tab is hidden,
// when Reduce Motion is on, on battery saver, or when it is switched off.
const WATER_KEY = 'tabby-water-background';
const waterLayer = document.getElementById('waterLayer');
const waterToggle = document.getElementById('waterToggle');
const waterInteractive = document.getElementById('waterInteractive');
const WATER_INTERACTIVE_KEY = 'tabby-water-interactive';
const WATER_SPEED_KEY = 'tabby-water-speed';
const WATER_STYLE_KEY = 'tabby-water-style';
const waterStyleSelect = document.getElementById('waterStyle');
const waterClickQueue = [];
const waterSpeed = document.getElementById('waterSpeed');
const waterSpeedValue = document.getElementById('waterSpeedValue');
const water = { on: false, frame: null, last: 0, time: 0, timeAt: 0, reveal: 0, interactive: true, speed: 0.25, style: 'flux', colors: null, colorsAt: 0, light: false, batteryPaused: false, gl: null, program: null, uniforms: null, vao: null, palette: null, initTried: false, bands: false, broken: false };

const WATER_MAX_COLORS = 8;
const WATER_VERTEX = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

// FluxLines field: two layers of smooth noise merged so the lines melt into each
// other instead of crossing. Ported from the React Bits component.
const WATER_FIELD = `
float hash(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float smin(float a, float b, float k) {
  float r = exp2(-a / k) + exp2(-b / k);
  return -k * log2(r);
}

float sinlerp(float a, float b, float w) {
  return mix(a, b, (sin(w * 3.14159265 - 3.14159265 / 2.0) + 1.0) / 2.0);
}

float vn(vec2 p, float s, float seed) {
  vec2 cellp = floor(p / s);
  vec2 relp = mod(p, s);
  float g1 = hash(vec3(cellp, seed));
  float g2 = hash(vec3(cellp.x + 1.0, cellp.y, seed));
  float g3 = hash(vec3(cellp.x + 1.0, cellp.y + 1.0, seed));
  float g4 = hash(vec3(cellp.x, cellp.y + 1.0, seed));
  float bx = sinlerp(g1, g2, relp.x / s);
  float tx = sinlerp(g4, g3, relp.x / s);
  return sinlerp(bx, tx, relp.y / s);
}

float dbn(vec2 p, float s, float seed) {
  float o = s / 2.0;
  float n0 = vn(p, s, seed);
  float n1 = vn(p + vec2(o, o), s, seed + 0.1);
  float n2 = vn(p + vec2(-o, o), s, seed + 0.2);
  float n3 = vn(p + vec2(o, -o), s, seed + 0.3);
  float n4 = vn(p + vec2(-o, -o), s, seed + 0.4);
  return (2.0 * n0 + 1.5 * n1 + 1.25 * n2 + 1.125 * n3 + n4) / 7.0;
}
`;

const WATER_FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uFlow;
uniform float uSpeed;
uniform float uScale;
uniform float uTurbulence;
uniform float uFluidity;
uniform float uRimWidth;
uniform float uSharpness;
uniform float uShimmer;
uniform float uGlow;
uniform float uLine;
uniform float uMaxHalf;
uniform vec3 uColors[8];
uniform int uColorCount;
uniform vec4 uMagnet;
uniform vec4 uSwirl;
uniform float uReveal;
uniform float uLight;
uniform float uOpaque;
uniform vec3 uBackground;
uniform float uOpacity;
out vec4 outColor;
${WATER_FIELD}

vec3 palette(float h) {
  float x = clamp(h, 0.0, 1.0) * float(uColorCount - 1);
  int i = int(floor(x));
  int j = min(i + 1, uColorCount - 1);
  return mix(uColors[i], uColors[j], smoothstep(0.0, 1.0, x - float(i)));
}

void main() {
  float ref = 700.0 / max(uScale, 0.05);
  vec2 frag = gl_FragCoord.xy;
  vec2 toMagnet = (frag - uMagnet.xy) / uResolution.y;
  float pull = uMagnet.z * exp(-dot(toMagnet, toMagnet) / (uMagnet.w * uMagnet.w));
  if (pull > 0.001) {
    float angle = pull * 0.55;
    float c = cos(angle);
    float s = sin(angle);
    frag = uMagnet.xy + mat2(c, s, -s, c) * (frag - uMagnet.xy);
  }
  if (uSwirl.w > 0.0) {
    vec2 d = frag - uSwirl.xy;
    float reach = uSwirl.z;
    float angle = uSwirl.w * exp(-dot(d, d) / (reach * reach));
    float c = cos(angle);
    float s = sin(angle);
    frag = uSwirl.xy + mat2(c, s, -s, c) * d;
  }
  vec2 p = frag / uResolution.y * ref;

  float spd = 200.0 * uSpeed;
  float t = uTime;
  vec2 dir = uFlow;
  vec2 perp = vec2(-dir.y, dir.x);
  float distort1 = vn(p + perp * (t * spd), 60.0, 10.0) * 50.0 * uTurbulence;
  float distort2 = vn(p - perp * (t * spd), 120.0, 15.0) * 100.0 * uTurbulence;
  float peaks = dbn(p + distort1 + dir * (t * spd * 0.5), 40.0, 1.0);
  float peaks2 = dbn(p + distort2 - dir * (t * spd * 0.5), 40.0, 0.0);
  float field = smin(peaks, peaks2, max(uFluidity, 0.001));

  float slope = length(vec2(dFdx(field), dFdy(field)));
  float gap = abs(field - 0.4);
  float pixels = gap / max(slope, 1e-6);
  float halfBand = max(uRimWidth, 0.001) * 0.5;
  float across = max(gap / halfBand, pixels / uMaxHalf);
  float band = 5.0 * uRimWidth * (1.0 - across);
  float reveal = smoothstep(0.2, 0.85, pull);
  float shimmer = vn(p + dir * (t * spd * 0.5), 60.0, 12.0) * uShimmer * (1.0 - reveal * 0.75);
  float lit = clamp(band - shimmer, 0.0, 1.0);
  float glow = pow(lit, uSharpness) * uGlow * (1.0 + reveal * 0.25);
  float core = uLine > 0.0 ? smoothstep(uLine + 0.75, uLine - 0.75, pixels) * max(smoothstep(0.08, 0.6, glow), reveal) : 0.0;
  float shine = clamp(glow, 0.0, 1.0);
  float energy = max(shine * shine, core * 0.85) * uReveal;

  float h = clamp(0.5 + (peaks - peaks2) * 0.8, 0.0, 1.0);
  vec3 tint = palette(h);

  if (uLight > 0.5) {
    float chroma = max(tint.r, max(tint.g, tint.b)) - min(tint.r, min(tint.g, tint.b));
    vec3 ink = mix(vec3(0.07, 0.07, 0.08), tint * 0.55, clamp(chroma * 1.6, 0.0, 1.0));
    float cover = energy * uOpacity;
    outColor = uOpaque > 0.5 ? vec4(mix(uBackground, ink, cover), 1.0) : vec4(ink * cover, cover);
    return;
  }

  vec3 light = tint * energy * uOpacity;
  outColor = uOpaque > 0.5 ? vec4(uBackground + light, 1.0) : vec4(light, max(light.r, max(light.g, light.b)));
}`;

// A light theme needs ink on top of the page instead of glowing light.
function waterLightTheme() {
  const back = waterParse(getComputedStyle(document.documentElement).getPropertyValue('--tabby-ui-background'));
  return back[0] * 0.299 + back[1] * 0.587 + back[2] * 0.114 > 0.6;
}

const waterColors = () => {
  const styles = getComputedStyle(document.documentElement);
  const read = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
  return [read('--tabby-accent', '#a5a58d'), read('--tabby-accent-light', '#c9c9b9'), read('--tabby-accent', '#a5a58d')];
};

const waterParseCache = new Map();
function waterParse(value) {
  if (!value) return [1, 1, 1];
  if (waterParseCache.has(value)) return waterParseCache.get(value);
  let rgb = [1, 1, 1];
  const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  if (probe) {
    probe.fillStyle = '#000000';
    probe.fillStyle = value;
    probe.fillRect(0, 0, 1, 1);
    const data = probe.getImageData(0, 0, 1, 1).data;
    rgb = [data[0] / 255, data[1] / 255, data[2] / 255];
  }
  waterParseCache.set(value, rgb);
  return rgb;
}

function waterCompile(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

function waterBuild(gl, vertexSource = WATER_VERTEX, fragmentSource = WATER_FRAGMENT, attribute = 'aPosition') {
  const vertex = waterCompile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = waterCompile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  if (attribute) gl.bindAttribLocation(program, 0, attribute);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i += 1) {
    const info = gl.getActiveUniform(program, i);
    if (info) uniforms[info.name.replace('[0]', '')] = gl.getUniformLocation(program, info.name);
  }
  return { program, uniforms };
}

function waterInit() {
  if (water.initTried) return false;
  water.initTried = true;
  const gl = waterLayer.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  if (!gl) {
    // No WebGL2 (usually hardware acceleration switched off in the browser): fall
    // back to plain canvas bands so the switch still does something.
    water.bands = true;
    console.warn('[Tabby] Flowing lines: WebGL2 is unavailable in this browser, drawing simple bands instead.');
    return false;
  }
  const built = waterBuild(gl);
  if (!built) {
    water.broken = true;
    console.warn('[Tabby] Flowing lines: the shader failed to compile, so the background stays empty.');
    return false;
  }
  const buffer = gl.createBuffer();
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  water.gl = gl;
  water.program = built.program;
  water.uniforms = built.uniforms;
  water.vao = vao;
  water.palette = new Float32Array(WATER_MAX_COLORS * 3);
  return true;
}

// Plain canvas bands, used only when the browser has no WebGL2 to run the shader on.
function drawWaterBands(now) {
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  const width = waterLayer.clientWidth;
  const height = waterLayer.clientHeight;
  if (!width || !height) return;
  if (waterLayer.width !== Math.round(width * ratio) || waterLayer.height !== Math.round(height * ratio)) {
    waterLayer.width = Math.round(width * ratio);
    waterLayer.height = Math.round(height * ratio);
  }
  const ctx = waterLayer.getContext('2d');
  if (!ctx) return;
  if (!water.colors || now - water.colorsAt > 1000) {
    water.colors = waterColors();
    water.colorsAt = now;
  }
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  const time = now / 1000;
  for (let band = 0; band < 4; band += 1) {
    const base = height * (0.55 + band * 0.1);
    const amplitude = height * 0.02 + band * 4;
    const phase = time / 2.4 + band * 0.85;
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += 10) {
      ctx.lineTo(x, base
        + Math.sin(x / (150 + band * 45) + phase) * amplitude
        + Math.sin(x / 61 - phase * 1.6) * amplitude * 0.35);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.globalAlpha = 0.14 + band * 0.045;
    ctx.fillStyle = band % 2 ? water.colors[0] : water.colors[1];
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

const waterPointer = { x: 0, y: 0, cx: window.innerWidth / 2, cy: window.innerHeight / 2, inside: false, radius: 0.35 };
const waterMagnet = { x: 0, y: 0, active: 0 };
const waterSwirl = { x: 0, y: 0, age: 99 };

function drawFlux(now) {
  if (!water.gl && !waterInit()) {
    if (water.bands) drawWaterBands(now);
    return;
  }
  const gl = water.gl;
  const width = waterLayer.clientWidth;
  const height = waterLayer.clientHeight;
  if (!width || !height) return;
  // The shader is per-pixel work, so cap the buffer at about 2.6 million pixels:
  // full detail on a laptop screen, cheaper on a 4K monitor.
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const pixelWidth = Math.round(width * ratio);
  const pixelHeight = Math.round(height * ratio);
  if (waterLayer.width !== pixelWidth || waterLayer.height !== pixelHeight) {
    waterLayer.width = pixelWidth;
    waterLayer.height = pixelHeight;
  }
  if (!water.colors || now - water.colorsAt > 1000) {
    water.colors = waterColors();
    water.light = waterLightTheme();
    water.colorsAt = now;
  }
  const dt = water.timeAt ? Math.min((now - water.timeAt) / 1000, 0.05) : 1 / 60;
  water.timeAt = now;
  water.time += dt;
  if (water.reveal < 1) water.reveal = Math.min(1, water.reveal + dt / 1.8);
  waterSwirl.age += dt;

  // The cursor works as a magnet that pulls the lines around it.
  const engaged = water.on && water.interactive && waterPointer.inside;
  const follow = 1 - Math.exp(-dt / 0.15);
  if (engaged) {
    waterMagnet.x += (waterPointer.x - waterMagnet.x) * follow;
    waterMagnet.y += (waterPointer.y - waterMagnet.y) * follow;
  }
  const target = engaged ? 1 : 0;
  waterMagnet.active += (target - waterMagnet.active) * (1 - Math.exp(-dt / 0.3));

  const u = water.uniforms;
  const palette = water.palette;
  water.colors.forEach((value, index) => palette.set(waterParse(value), index * 3));
  const intro = water.reveal;
  gl.viewport(0, 0, pixelWidth, pixelHeight);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(water.program);
  gl.bindVertexArray(water.vao);
  gl.uniform2f(u.uResolution, pixelWidth, pixelHeight);
  gl.uniform1f(u.uTime, water.time);
  gl.uniform2f(u.uFlow, 0, -1);
  gl.uniform1f(u.uSpeed, water.speed);
  gl.uniform1f(u.uScale, 1.6);
  gl.uniform1f(u.uTurbulence, 1);
  gl.uniform1f(u.uFluidity, 0.1);
  gl.uniform1f(u.uRimWidth, 0.2);
  gl.uniform1f(u.uSharpness, 2.5);
  gl.uniform1f(u.uShimmer, 1.5);
  gl.uniform1f(u.uGlow, 2);
  gl.uniform1f(u.uLine, 1 * ratio * 0.5);
  gl.uniform1f(u.uMaxHalf, 28 * ratio);
  gl.uniform3fv(u.uColors, palette);
  gl.uniform1i(u.uColorCount, water.colors.length);
  // The shader measures the reach against the height, so the radius goes in as a
  // fraction of the height (0.35 = 35%), not as pixels.
  gl.uniform4f(u.uMagnet, waterMagnet.x, waterMagnet.y, waterMagnet.active, waterPointer.radius);
  const twist = water.interactive && waterSwirl.age < 2 ? 1.9 * Math.min(1, waterSwirl.age / 0.23) * Math.exp(-Math.max(0, waterSwirl.age - 0.23) * 1.1) : 0;
  gl.uniform4f(u.uSwirl, waterSwirl.x, waterSwirl.y, pixelHeight * 0.22 * (1 + waterSwirl.age * 0.5), twist);
  gl.uniform1f(u.uReveal, intro * intro * (3 - 2 * intro));
  gl.uniform3fv(u.uBackground, waterParse('#000000'));
  gl.uniform1f(u.uOpacity, 1);
  gl.uniform1f(u.uLight, water.light ? 1 : 0);
  gl.uniform1f(u.uOpaque, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function pumpWater() {
  waterLayer.hidden = !water.on;
  const paused = !water.on || document.hidden || water.batteryPaused;
  if (paused) {
    if (water.frame) cancelAnimationFrame(water.frame);
    water.frame = null;
    // Still show one frame, so a paused background is a picture rather than a hole.
    if (water.on && !document.hidden) { water.reveal = 1; drawWater(performance.now()); }
    return;
  }
  if (!water.frame) { water.last = 0; water.frame = requestAnimationFrame(tickWater); }
}

function tickWater(now) {
  water.frame = null;
  if (!water.on || document.hidden || water.batteryPaused) return;
  water.last = now;
  drawWater(now);
  water.frame = requestAnimationFrame(tickWater);
}

// On for anyone who has never touched the switch, off the moment they turn it off.
const savedWater = localStorage.getItem(WATER_KEY);
water.on = savedWater === null ? true : savedWater === '1';
waterToggle.checked = water.on;
waterToggle.addEventListener('change', () => {
  water.on = waterToggle.checked;
  safeSetItem(WATER_KEY, water.on ? '1' : '0');
  pumpWater();
  haptic('soft');
});
const savedSpeed = Number(localStorage.getItem(WATER_SPEED_KEY));
water.speed = Number.isFinite(savedSpeed) && savedSpeed > 0 ? Math.min(1.5, Math.max(0.05, savedSpeed)) : 0.25;
if (waterSpeed) {
  waterSpeed.value = String(water.speed);
  if (waterSpeedValue) waterSpeedValue.textContent = water.speed.toFixed(2);
  waterSpeed.addEventListener('input', () => {
    water.speed = Math.min(1.5, Math.max(0.05, Number(waterSpeed.value) || 0.25));
    if (waterSpeedValue) waterSpeedValue.textContent = water.speed.toFixed(2);
    safeSetItem(WATER_SPEED_KEY, String(water.speed));
  });
}

const savedInteractive = localStorage.getItem(WATER_INTERACTIVE_KEY);
water.interactive = savedInteractive === null ? true : savedInteractive === '1';
if (waterInteractive) {
  waterInteractive.checked = water.interactive;
  waterInteractive.addEventListener('change', () => {
    water.interactive = waterInteractive.checked;
    safeSetItem(WATER_INTERACTIVE_KEY, water.interactive ? '1' : '0');
    if (!water.interactive) {
      waterPointer.inside = false;
      waterMagnet.active = 0;
      waterSwirl.age = 99;
    }
    haptic('soft');
  });
}
document.addEventListener('visibilitychange', pumpWater);
window.addEventListener('pointermove', event => {
  if (!water.on || !water.interactive || document.hidden) return;
  const rect = waterLayer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  waterPointer.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
  waterPointer.x = x * (waterLayer.width / Math.max(1, rect.width));
  waterPointer.y = (rect.height - y) * (waterLayer.height / Math.max(1, rect.height));
  waterPointer.cx = event.clientX;
  waterPointer.cy = event.clientY;
  if (waterPointer.inside && waterMagnet.active < 0.05) {
    waterMagnet.x = waterPointer.x;
    waterMagnet.y = waterPointer.y;
  }
}, { passive: true });
window.addEventListener('pointerdown', () => {
  if (!water.on || !water.interactive || document.hidden || !waterPointer.inside) return;
  waterSwirl.x = waterPointer.x;
  waterSwirl.y = waterPointer.y;
  waterSwirl.age = 0;
  waterClickQueue.push({ x: waterPointer.cx, y: waterPointer.cy });
  if (waterClickQueue.length > 4) waterClickQueue.shift();
}, { passive: true });
document.documentElement.addEventListener('pointerleave', () => { waterPointer.inside = false; });
waterLayer.addEventListener('webglcontextlost', event => {
  event.preventDefault();
  water.gl = null;
  water.uniforms = null;
});
window.addEventListener('resize', () => { water.last = 0; });
if (typeof navigator.getBattery === 'function') {
  navigator.getBattery().then(battery => {
    const sync = () => {
      water.batteryPaused = battery.level <= 0.2 && !battery.charging;
      pumpWater();
    };
    ['levelchange', 'chargingchange'].forEach(name => battery.addEventListener(name, sync));
    sync();
  }).catch(() => {});
}
pumpWater();

// ---- Liquid Ether ---------------------------------------------------------------
// A fluid simulation in WebGL2, ported from the React Bits component: velocity is
// splatted by the cursor, made incompressible by a pressure solve, then advected and
// drawn through a palette. No React, no three.js.
const ETHER_PRESSURE_STEPS = 20;
const ETHER_MAX_CELLS = 80000;
const ETHER_PIXEL_BUDGET = 2.0e6;
const ETHER_PALETTE_SIZE = 256;

const ETHER_VERTEX = `#version 300 es
const vec2 corners[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
out vec2 vUv;
void main() {
  vUv = corners[gl_VertexID] * 0.5 + 0.5;
  gl_Position = vec4(corners[gl_VertexID], 0.0, 1.0);
}`;

const ETHER_HEADER = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 fragColor;
uniform vec2 uTexel;
`;

const ETHER_SPLAT = `${ETHER_HEADER}
uniform sampler2D uVelocity;
uniform vec2 uSize;
uniform vec4 uSegment;
uniform vec2 uForce;
uniform float uRadius;

float segment(vec2 p, vec2 a, vec2 b) {
  vec2 ab = b - a;
  float t = clamp(dot(p - a, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
  return length(p - a - ab * t);
}

void main() {
  float d = segment(vUv * uSize, uSegment.xy, uSegment.zw) / uRadius;
  vec2 velocity = texture(uVelocity, vUv).xy + uForce * exp(-d * d * 6.0);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

const ETHER_SMOOTH = `${ETHER_HEADER}
uniform sampler2D uVelocity;
uniform float uAmount;

void main() {
  vec2 center = texture(uVelocity, vUv).xy;
  vec2 around =
    texture(uVelocity, vUv - vec2(uTexel.x, 0.0)).xy +
    texture(uVelocity, vUv + vec2(uTexel.x, 0.0)).xy +
    texture(uVelocity, vUv - vec2(0.0, uTexel.y)).xy +
    texture(uVelocity, vUv + vec2(0.0, uTexel.y)).xy;
  fragColor = vec4(mix(center, around * 0.25, uAmount), 0.0, 1.0);
}`;

const ETHER_DIVERGENCE = `${ETHER_HEADER}
uniform sampler2D uVelocity;
uniform float uWalls;

void main() {
  vec2 center = texture(uVelocity, vUv).xy;
  float left = texture(uVelocity, vUv - vec2(uTexel.x, 0.0)).x;
  float right = texture(uVelocity, vUv + vec2(uTexel.x, 0.0)).x;
  float down = texture(uVelocity, vUv - vec2(0.0, uTexel.y)).y;
  float up = texture(uVelocity, vUv + vec2(0.0, uTexel.y)).y;
  float edge = uWalls > 0.5 ? -1.0 : 0.0;
  if (vUv.x - uTexel.x < 0.0) left = edge * center.x;
  if (vUv.x + uTexel.x > 1.0) right = edge * center.x;
  if (vUv.y - uTexel.y < 0.0) down = edge * center.y;
  if (vUv.y + uTexel.y > 1.0) up = edge * center.y;
  fragColor = vec4(0.5 * (right - left + up - down), 0.0, 0.0, 1.0);
}`;

const ETHER_EDGE = `
uniform float uWalls;

float pressureAt(sampler2D field, vec2 uv) {
  vec2 inside = step(vec2(0.0), uv) * step(uv, vec2(1.0));
  return texture(field, uv).x * mix(inside.x * inside.y, 1.0, uWalls);
}
`;

const ETHER_PRESSURE = `${ETHER_HEADER}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
${ETHER_EDGE}
void main() {
  vec2 reach = uTexel * 2.0;
  float sum =
    pressureAt(uPressure, vUv - vec2(reach.x, 0.0)) +
    pressureAt(uPressure, vUv + vec2(reach.x, 0.0)) +
    pressureAt(uPressure, vUv - vec2(0.0, reach.y)) +
    pressureAt(uPressure, vUv + vec2(0.0, reach.y));
  fragColor = vec4(sum * 0.25 - texture(uDivergence, vUv).x, 0.0, 0.0, 1.0);
}`;

const ETHER_PROJECT = `${ETHER_HEADER}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
${ETHER_EDGE}
void main() {
  float left = pressureAt(uPressure, vUv - vec2(uTexel.x, 0.0));
  float right = pressureAt(uPressure, vUv + vec2(uTexel.x, 0.0));
  float down = pressureAt(uPressure, vUv - vec2(0.0, uTexel.y));
  float up = pressureAt(uPressure, vUv + vec2(0.0, uTexel.y));
  vec2 velocity = texture(uVelocity, vUv).xy - 0.5 * vec2(right - left, up - down);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

const ETHER_ADVECT = `${ETHER_HEADER}
uniform sampler2D uVelocity;
uniform vec2 uStep;
uniform float uKeep;
uniform float uWalls;

vec2 at(vec2 uv) {
  vec2 outside = max(-uv, uv - 1.0) / uTexel;
  float open = clamp(1.0 - max(outside.x, outside.y) / 1.5, 0.0, 1.0);
  return texture(uVelocity, uv).xy * mix(open, 1.0, uWalls);
}

void main() {
  vec2 start = vUv - at(vUv) * uStep;
  vec2 back = start + at(start) * uStep;
  vec2 corrected = vUv - (back - vUv) * 0.5;
  vec2 origin = corrected - at(corrected) * uStep;
  vec2 a = at(origin + vec2(-0.5, -0.5) * uTexel);
  vec2 b = at(origin + vec2(0.5, -0.5) * uTexel);
  vec2 c = at(origin + vec2(-0.5, 0.5) * uTexel);
  vec2 d = at(origin + vec2(0.5, 0.5) * uTexel);
  vec2 velocity = clamp(at(origin), min(min(a, b), min(c, d)), max(max(a, b), max(c, d)));
  fragColor = vec4(velocity * uKeep, 0.0, 1.0);
}`;

const ETHER_DISPLAY = `${ETHER_HEADER}
uniform sampler2D uVelocity;
uniform sampler2D uPalette;
uniform vec2 uSimSize;
uniform float uSpeedScale;
uniform float uLight;
uniform vec4 uBackground;

vec2 velocityAt(vec2 uv) {
  vec2 st = uv * uSimSize - 0.5;
  vec2 i = floor(st);
  vec2 f = st - i;
  vec2 f2 = f * f;
  vec2 f3 = f2 * f;
  vec2 w0 = (-f3 + 3.0 * f2 - 3.0 * f + 1.0) / 6.0;
  vec2 w1 = (3.0 * f3 - 6.0 * f2 + 4.0) / 6.0;
  vec2 w2 = (-3.0 * f3 + 3.0 * f2 + 3.0 * f + 1.0) / 6.0;
  vec2 w3 = f3 / 6.0;
  vec2 g0 = w0 + w1;
  vec2 g1 = w2 + w3;
  vec2 h0 = (i - 0.5 + w1 / g0) / uSimSize;
  vec2 h1 = (i + 1.5 + w3 / g1) / uSimSize;
  vec2 a = texture(uVelocity, vec2(h0.x, h0.y)).xy;
  vec2 b = texture(uVelocity, vec2(h1.x, h0.y)).xy;
  vec2 c = texture(uVelocity, vec2(h0.x, h1.y)).xy;
  vec2 d = texture(uVelocity, vec2(h1.x, h1.y)).xy;
  return g0.y * (g0.x * a + g1.x * b) + g1.y * (g0.x * c + g1.x * d);
}

void main() {
  float speed = length(velocityAt(vUv)) * uSpeedScale;
  float level = speed < 0.75 ? speed : 0.75 + 0.25 * tanh((speed - 0.75) * 4.0);
  vec3 ink = texture(uPalette, vec2(level, 0.5)).rgb;
  float alpha = level;
  if (uLight > 0.5) {
    float hollow = smoothstep(0.7, 1.6, speed);
    alpha = smoothstep(0.08, 0.5, level) * mix(0.85, 0.1, hollow);
  } else {
    float hot = 1.0 - exp(-max(speed - 0.75, 0.0) * 1.2);
    ink = mix(ink, min(ink * 1.8 + 0.06, vec3(1.0)), hot);
  }
  vec3 color = ink * alpha + uBackground.rgb * uBackground.a * (1.0 - alpha);
  float coverage = alpha + uBackground.a * (1.0 - alpha);
  float grain = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  color += (grain - 0.5) / 255.0 * step(0.002, coverage);
  fragColor = vec4(clamp(color, vec3(0.0), vec3(coverage)), coverage);
}`;

const ether = {
  gl: null, programs: null, vao: null, palette: null, paletteKey: '',
  targets: {}, grid: { width: 0, height: 0 }, size: { width: 1, height: 1 },
  splats: [], puffs: [], energy: 1, last: 0, lastInput: 0, ready: false,
  pointer: { x: 0, y: 0, fromX: 0, fromY: 0, inside: false, ready: false, moved: false },
  auto: { phase: Math.random() * 6.28, x: 0, y: 0, ready: false, ramp: 0 },
  opening: { active: true, time: 0 }, lastCx: -1, lastCy: -1, failed: false
};

const ETHER_KEEP = (persistence, dt) => Math.pow(0.5, dt / (0.35 + persistence * persistence * 12));

function etherLink(gl, fragmentSource) {
  const vertex = waterCompile(gl, gl.VERTEX_SHADER, ETHER_VERTEX);
  const fragment = waterCompile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = vertex && fragment ? gl.createProgram() : null;
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('[Tabby] Liquid Ether: ' + gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i += 1) {
    const info = gl.getActiveUniform(program, i);
    if (info) uniforms[info.name.replace('[0]', '')] = gl.getUniformLocation(program, info.name);
  }
  return { program, uniforms };
}

const etherLinear = value => (value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4));

function etherPaletteData() {
  const stops = waterColors().map(value => waterParse(value).map(etherLinear));
  const data = new Uint8Array(ETHER_PALETTE_SIZE * 4);
  for (let index = 0; index < ETHER_PALETTE_SIZE; index += 1) {
    const t = Math.min(Math.max((index / (ETHER_PALETTE_SIZE - 1)) * stops.length - 0.5, 0), stops.length - 1);
    const from = Math.min(Math.floor(t), Math.max(stops.length - 2, 0));
    const to = Math.min(from + 1, stops.length - 1);
    const k = t - from;
    const eased = k * k * (3 - 2 * k);
    for (let channel = 0; channel < 3; channel += 1) {
      const value = stops[from][channel] + (stops[to][channel] - stops[from][channel]) * eased;
      data[index * 4 + channel] = Math.round(Math.min(1, Math.max(0, value)) * 255);
    }
    data[index * 4 + 3] = 255;
  }
  return data;
}

function etherTarget(width, height, channels) {
  const gl = ether.gl;
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, channels === 2 ? gl.RG16F : gl.R16F, width, height, 0, channels === 2 ? gl.RG : gl.RED, gl.HALF_FLOAT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return { texture, framebuffer };
}

function etherDropTargets() {
  const gl = ether.gl;
  if (!gl) return;
  Object.keys(ether.targets).forEach(key => {
    gl.deleteTexture(ether.targets[key].texture);
    gl.deleteFramebuffer(ether.targets[key].framebuffer);
  });
  ether.targets = {};
  ether.grid.width = 0;
  ether.grid.height = 0;
}

function etherDispose() {
  const gl = ether.gl;
  if (gl && !gl.isContextLost()) {
    etherDropTargets();
    if (ether.palette) gl.deleteTexture(ether.palette);
    if (ether.vao) gl.deleteVertexArray(ether.vao);
    if (ether.programs) Object.values(ether.programs).forEach(entry => entry && gl.deleteProgram(entry.program));
  }
  ether.gl = null;
  ether.programs = null;
  ether.palette = null;
  ether.paletteKey = '';
  ether.vao = null;
  ether.ready = false;
  ether.failed = false;
  ether.splats.length = 0;
  ether.puffs.length = 0;
  ether.last = 0;
}

function etherInit() {
  if (ether.ready) return true;
  if (ether.failed) return false;
  const gl = waterLayer.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance' });
  if (!gl) { ether.failed = true; water.bands = true; console.warn('[Tabby] Liquid Ether: WebGL2 is unavailable.'); return false; }
  if (!gl.getExtension('EXT_color_buffer_float') && !gl.getExtension('EXT_color_buffer_half_float')) {
    ether.failed = true;
    console.warn('[Tabby] Liquid Ether: this device cannot render the fluid to half-float textures.');
    return false;
  }
  const programs = {
    splat: etherLink(gl, ETHER_SPLAT),
    smooth: etherLink(gl, ETHER_SMOOTH),
    divergence: etherLink(gl, ETHER_DIVERGENCE),
    pressure: etherLink(gl, ETHER_PRESSURE),
    project: etherLink(gl, ETHER_PROJECT),
    advect: etherLink(gl, ETHER_ADVECT),
    display: etherLink(gl, ETHER_DISPLAY)
  };
  if (Object.values(programs).some(entry => !entry)) { ether.failed = true; return false; }
  ether.gl = gl;
  ether.programs = programs;
  ether.vao = gl.createVertexArray();
  ether.palette = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, ether.palette);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  ether.paletteKey = '';
  ether.ready = true;
  ether.opening = { active: true, time: 0 };
  ether.last = 0;
  return true;
}

function etherResize() {
  const gl = ether.gl;
  const width = Math.max(1, waterLayer.clientWidth);
  const height = Math.max(1, waterLayer.clientHeight);
  const ratio = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(ETHER_PIXEL_BUDGET / (width * height)));
  const pixelWidth = Math.max(1, Math.round(width * ratio));
  const pixelHeight = Math.max(1, Math.round(height * ratio));
  if (waterLayer.width !== pixelWidth || waterLayer.height !== pixelHeight) {
    waterLayer.width = pixelWidth;
    waterLayer.height = pixelHeight;
  }
  ether.size.width = width;
  ether.size.height = height;
  const base = 0.5 * 0.5;
  const scale = base * Math.min(1, Math.sqrt(ETHER_MAX_CELLS / (width * height * base * base)));
  const gridWidth = Math.min(1024, Math.max(16, Math.round(width * scale)));
  const gridHeight = Math.min(1024, Math.max(16, Math.round(height * scale)));
  if (gridWidth === ether.grid.width && gridHeight === ether.grid.height) return;
  etherDropTargets();
  ether.grid.width = gridWidth;
  ether.grid.height = gridHeight;
  ether.targets.velocity = etherTarget(gridWidth, gridHeight, 2);
  ether.targets.velocityNext = etherTarget(gridWidth, gridHeight, 2);
  ether.targets.divergence = etherTarget(gridWidth, gridHeight, 1);
  ether.targets.pressure = etherTarget(gridWidth, gridHeight, 1);
  ether.targets.pressureNext = etherTarget(gridWidth, gridHeight, 1);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

function etherRun(entry, output, bind) {
  const gl = ether.gl;
  gl.useProgram(entry.program);
  gl.uniform2f(entry.uniforms.uTexel, 1 / ether.grid.width, 1 / ether.grid.height);
  if (bind) bind(entry.uniforms);
  gl.bindFramebuffer(gl.FRAMEBUFFER, output ? output.framebuffer : null);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function etherBind(unit, texture, location) {
  const gl = ether.gl;
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(location, unit);
}

function etherSwap(a, b) {
  const held = ether.targets[a];
  ether.targets[a] = ether.targets[b];
  ether.targets[b] = held;
}

function etherStroke(from, to, dt, scale, radius) {
  if (!dt) return;
  ether.splats.push({
    ax: from[0], ay: from[1], bx: to[0], by: to[1],
    vx: Math.min(6000, Math.max(-6000, ((to[0] - from[0]) / dt) * scale)),
    vy: Math.min(6000, Math.max(-6000, ((to[1] - from[1]) / dt) * scale)),
    radius
  });
}

function drawEther(now) {
  if (!etherInit()) { if (water.bands) drawWaterBands(now); return; }
  const gl = ether.gl;
  const programs = ether.programs;
  etherResize();
  const paletteKey = waterColors().join(',');
  if (paletteKey !== ether.paletteKey) {
    ether.paletteKey = paletteKey;
    gl.bindTexture(gl.TEXTURE_2D, ether.palette);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, ETHER_PALETTE_SIZE, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, etherPaletteData());
  }

  const force = 20;
  const radius = Math.min(600, Math.max(4, 100));
  const dt = ether.last ? Math.min(Math.max((now - ether.last) / 1000, 0), 1 / 30) : 0;
  ether.last = now;
  const size = ether.size;

  // Cursor: one stroke per moved frame, as the component does.
  const cx = waterPointer.cx;
  const cy = waterPointer.cy;
  const movedNow = cx !== ether.lastCx || cy !== ether.lastCy;
  if (movedNow) {
    ether.lastCx = cx;
    ether.lastCy = cy;
    ether.lastInput = now;
    ether.opening.active = false;
    const px = cx;
    const py = size.height - cy;
    const pointer = ether.pointer;
    if (!pointer.ready) {
      pointer.fromX = px; pointer.fromY = py;
      pointer.x = px; pointer.y = py;
      pointer.ready = true;
    }
    if (water.interactive && waterPointer.inside && dt > 0) {
      etherStroke([pointer.x, pointer.y], [px, py], dt, (force / 20) * 0.15, radius);
      ether.energy = 1;
    }
    pointer.x = px;
    pointer.y = py;
  }

  // Clicks push a puff in the direction the cursor was travelling.
  while (waterClickQueue.length) {
    const click = waterClickQueue.shift();
    if (!water.interactive) continue;
    const px = click.x;
    const py = size.height - click.y;
    const angle = Math.random() * Math.PI * 2;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const reach = radius * 0.5;
    const push = 1400 * (force / 20);
    ether.puffs.push({
      ax: px - dirX * reach, ay: py - dirY * reach,
      bx: px + dirX * reach, by: py + dirY * reach,
      vx: dirX * push, vy: dirY * push, radius: radius * 0.9
    });
    if (ether.puffs.length > 4) ether.puffs.shift();
    ether.energy = 1;
  }

  const idle = now - ether.lastInput > 1000;
  if (ether.opening.active && dt > 0) {
    const k = Math.min(1, ether.opening.time / 1.4);
    const stepAt = t => {
      const eased = 1 - Math.pow(1 - Math.min(1, Math.max(0, t / 1.4)), 3);
      const angle = -0.6 + eased * 3.6;
      const reach = 0.08 + 0.3 * eased;
      return [
        (0.5 + Math.cos(angle) * reach * 1.1) * size.width,
        (0.5 + Math.sin(angle) * reach * (size.width / size.height) * 0.75) * size.height
      ];
    };
    const from = stepAt(ether.opening.time);
    ether.opening.time += dt;
    const fade = Math.sin(Math.min(1, ether.opening.time / 1.4) * Math.PI);
    etherStroke(from, stepAt(ether.opening.time), dt, 0.2 * fade, radius);
    ether.energy = 1;
    if (ether.opening.time > 1.4) ether.opening.active = false;
  } else if (dt > 0 && idle) {
    const auto = ether.auto;
    auto.ramp = Math.min(1, auto.ramp + dt / 0.8);
    auto.phase += dt * water.speed * 1.6;
    const waveX = 0.62 * Math.sin(auto.phase * 0.83 + 1.3) + 0.38 * Math.sin(auto.phase * 1.71 + 0.4);
    const waveY = 0.6 * Math.sin(auto.phase * 1.07 + 2.1) + 0.4 * Math.cos(auto.phase * 0.61 + 0.7);
    const spot = [(0.5 + 0.41 * waveX) * size.width, (0.5 + 0.41 * waveY) * size.height];
    if (auto.ready) {
      const gust = 0.3 + 0.7 * Math.pow(0.5 + 0.5 * Math.sin(auto.phase * 2.6), 2);
      const scale = (force / 20) * 0.45 * 2.2 * auto.ramp * auto.ramp * gust * Math.min(1, dt * 60);
      etherStroke([auto.x, auto.y], spot, dt, scale, radius);
    }
    auto.x = spot[0];
    auto.y = spot[1];
    auto.ready = true;
    ether.energy = 1;
  } else {
    ether.auto.ramp = 0;
  }

  const puff = ether.puffs.shift();
  if (puff) ether.splats.push(puff);

  gl.bindVertexArray(ether.vao);
  gl.disable(gl.BLEND);

  if (dt > 0) {
    gl.viewport(0, 0, ether.grid.width, ether.grid.height);
    ether.splats.forEach(splat => {
      etherRun(programs.splat, ether.targets.velocityNext, u => {
        etherBind(0, ether.targets.velocity.texture, u.uVelocity);
        gl.uniform2f(u.uSize, size.width, size.height);
        gl.uniform4f(u.uSegment, splat.ax, splat.ay, splat.bx, splat.by);
        gl.uniform2f(u.uForce, splat.vx, splat.vy);
        gl.uniform1f(u.uRadius, splat.radius);
      });
      etherSwap('velocity', 'velocityNext');
    });
    ether.splats.length = 0;
    etherRun(programs.divergence, ether.targets.divergence, u => {
      etherBind(0, ether.targets.velocity.texture, u.uVelocity);
      gl.uniform1f(u.uWalls, 0);
    });
    for (let iteration = 0; iteration < ETHER_PRESSURE_STEPS; iteration += 1) {
      etherRun(programs.pressure, ether.targets.pressureNext, u => {
        etherBind(0, ether.targets.pressure.texture, u.uPressure);
        etherBind(1, ether.targets.divergence.texture, u.uDivergence);
        gl.uniform1f(u.uWalls, 0);
      });
      etherSwap('pressure', 'pressureNext');
    }
    etherRun(programs.project, ether.targets.velocityNext, u => {
      etherBind(0, ether.targets.pressure.texture, u.uPressure);
      etherBind(1, ether.targets.velocity.texture, u.uVelocity);
      gl.uniform1f(u.uWalls, 0);
    });
    etherSwap('velocity', 'velocityNext');
    etherRun(programs.advect, ether.targets.velocityNext, u => {
      etherBind(0, ether.targets.velocity.texture, u.uVelocity);
      gl.uniform2f(u.uStep, dt / size.width, dt / size.height);
      gl.uniform1f(u.uKeep, ETHER_KEEP(0.75, dt));
      gl.uniform1f(u.uWalls, 0);
    });
    etherSwap('velocity', 'velocityNext');
  }

  gl.viewport(0, 0, waterLayer.width, waterLayer.height);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  etherRun(programs.display, null, u => {
    etherBind(0, ether.targets.velocity.texture, u.uVelocity);
    etherBind(1, ether.palette, u.uPalette);
    gl.uniform2f(u.uSimSize, ether.grid.width, ether.grid.height);
    gl.uniform1f(u.uSpeedScale, (1.25 * 1) / (0.84 * 600));
    gl.uniform1f(u.uLight, 0);
    gl.uniform4f(u.uBackground, 0, 0, 0, 0);
  });
}

// ---- Color Bends ----------------------------------------------------------------
// One full-screen shader: the flow field is folded into bands that bend the palette.
// Ported from the React Bits component; three.js only supplied the quad, so this is
// raw WebGL2 instead.
const BENDS_FRAGMENT = `#version 300 es
precision highp float;
#define MAX_COLORS 8
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
in vec2 vUv;
out vec4 fragColor;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 shift = vec2(0.2 * cos(t) - 7.56);
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
    q += (rr - q) * 0.15;
    shift *= 0.85;
  }

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float spare = 1.0 - kBelow * gain;
      if (spare != 0.0) warped -= shift * spare;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float spare = 1.0 - kBelow * gain;
      if (spare != 0.0) warped -= shift * spare;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);
      col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  col *= uIntensity;

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  fragColor = vec4(rgb, a);
}`;

const BENDS_VERTEX = `#version 300 es
out vec2 vUv;
void main() {
  vec2 corner = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = corner;
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}`;

const bends = { gl: null, program: null, uniforms: null, vao: null, time: 0, timeAt: 0, last: 0, pointer: { x: 0, y: 0, tx: 0, ty: 0 }, failed: false, colors: new Float32Array(24), colorKey: '' };

function bendsDispose() {
  const gl = bends.gl;
  if (gl && !gl.isContextLost()) {
    if (bends.program) gl.deleteProgram(bends.program);
    if (bends.vao) gl.deleteVertexArray(bends.vao);
  }
  bends.gl = null;
  bends.program = null;
  bends.uniforms = null;
  bends.vao = null;
  bends.failed = false;
  bends.time = 0;
  bends.timeAt = 0;
}

function bendsInit() {
  if (bends.gl) return true;
  if (bends.failed) return false;
  const gl = waterLayer.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance' });
  if (!gl) { bends.failed = true; water.bands = true; console.warn('[Tabby] Color Bends: WebGL2 is unavailable.'); return false; }
  const built = waterBuild(gl, BENDS_VERTEX, BENDS_FRAGMENT);
  if (!built) { bends.failed = true; console.warn('[Tabby] Color Bends: the shader failed to compile.'); return false; }
  bends.gl = gl;
  bends.program = built.program;
  bends.uniforms = built.uniforms;
  bends.vao = gl.createVertexArray();
  return true;
}

function drawBends(now) {
  if (!bendsInit()) { if (water.bands) drawWaterBands(now); return; }
  const gl = bends.gl;
  const u = bends.uniforms;
  const width = Math.max(1, waterLayer.clientWidth);
  const height = Math.max(1, waterLayer.clientHeight);
  const ratio = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(2.4e6 / (width * height)));
  const pixelWidth = Math.max(1, Math.round(width * ratio));
  const pixelHeight = Math.max(1, Math.round(height * ratio));
  if (waterLayer.width !== pixelWidth || waterLayer.height !== pixelHeight) {
    waterLayer.width = pixelWidth;
    waterLayer.height = pixelHeight;
  }

  const dt = bends.timeAt ? Math.min(Math.max((now - bends.timeAt) / 1000, 0), 0.1) : 0;
  bends.timeAt = now;
  bends.time += dt;

  const colors = waterColors();
  const key = colors.join(',');
  if (key !== bends.colorKey) {
    bends.colorKey = key;
    bends.colors.fill(0);
    colors.slice(0, 8).forEach((value, index) => {
      bends.colors.set(waterParse(value), index * 3);
    });
  }

  const pointer = bends.pointer;
  if (water.interactive && waterPointer.inside) {
    pointer.tx = (waterPointer.cx / width) * 2 - 1;
    pointer.ty = -((waterPointer.cy / height) * 2 - 1);
  }
  const lerp = Math.min(1, dt * 8);
  pointer.x += (pointer.tx - pointer.x) * lerp;
  pointer.y += (pointer.ty - pointer.y) * lerp;

  const radians = (90 * Math.PI) / 180;
  gl.viewport(0, 0, pixelWidth, pixelHeight);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.disable(gl.BLEND);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(bends.program);
  gl.bindVertexArray(bends.vao);
  gl.uniform2f(u.uCanvas, width, height);
  gl.uniform1f(u.uTime, bends.time);
  gl.uniform1f(u.uSpeed, water.speed * 0.8);
  gl.uniform2f(u.uRot, Math.cos(radians), Math.sin(radians));
  gl.uniform1i(u.uColorCount, Math.min(colors.length, 8));
  gl.uniform3fv(u.uColors, bends.colors);
  gl.uniform1i(u.uTransparent, 1);
  gl.uniform1f(u.uScale, 1);
  gl.uniform1f(u.uFrequency, 1);
  gl.uniform1f(u.uWarpStrength, 1);
  gl.uniform2f(u.uPointer, pointer.x, pointer.y);
  gl.uniform1f(u.uMouseInfluence, 1);
  gl.uniform1f(u.uParallax, 0.5);
  gl.uniform1f(u.uNoise, 0.15);
  gl.uniform1i(u.uIterations, 1);
  gl.uniform1f(u.uIntensity, 1);
  gl.uniform1f(u.uBandWidth, 6);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// ---- Soft Aura ------------------------------------------------------------------
// Ported from the SoftAurora component: one fullscreen pass of slowly drifting
// noise bands, tinted with the theme colour. The component's props are baked in
// here (speed 0.25 * 2.4, scale 1.5, band height 0.5, spread 1, spectrum 1, tilt 0).
const AURORA_MAX_PULSES = 4;

// Same fullscreen triangle as the other engines, built from gl_VertexID so the
// shared water context needs no attribute buffer.
const AURORA_VERTEX = `#version 300 es
const vec2 corners[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() {
  gl_Position = vec4(corners[gl_VertexID], 0.0, 1.0);
}`;

const AURORA_FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uFlow;
uniform float uHue;
uniform float uScale;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uBandHeight;
uniform float uBandSpread;
uniform float uOctaveDecay;
uniform float uLayerOffset;
uniform vec2 uShift;
uniform vec4 uCursor;
uniform vec4 uPulses[4];
uniform float uSpectrum;
uniform float uTilt;
uniform vec3 uIntro;
uniform float uLightMode;
uniform float uOpacity;
out vec4 fragColor;

#define TAU 6.28318

vec3 gradientHash(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 234.6)),
    dot(p, vec3(269.5, 183.3, 198.3)),
    dot(p, vec3(169.5, 283.3, 156.9))
  );
  vec3 h = fract(sin(p) * 43758.5453123);
  float phi = acos(2.0 * h.x - 1.0);
  float theta = TAU * h.y;
  return vec3(cos(theta) * sin(phi), sin(theta) * cos(phi), cos(phi));
}

float quinticSmooth(float t) {
  float t2 = t * t;
  float t3 = t * t2;
  return 6.0 * t3 * t2 - 15.0 * t2 * t2 + 10.0 * t3;
}

vec3 cosineGradient(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(TAU * (c * t + d));
}

float perlin3D(float amplitude, float frequency, float px, float py, float pz) {
  float x = px * frequency;
  float y = py * frequency;

  float fx = floor(x);
  float fy = floor(y);
  float fz = floor(pz);
  float cx = ceil(x);
  float cy = ceil(y);
  float cz = ceil(pz);

  vec3 g000 = gradientHash(vec3(fx, fy, fz));
  vec3 g100 = gradientHash(vec3(cx, fy, fz));
  vec3 g010 = gradientHash(vec3(fx, cy, fz));
  vec3 g110 = gradientHash(vec3(cx, cy, fz));
  vec3 g001 = gradientHash(vec3(fx, fy, cz));
  vec3 g101 = gradientHash(vec3(cx, fy, cz));
  vec3 g011 = gradientHash(vec3(fx, cy, cz));
  vec3 g111 = gradientHash(vec3(cx, cy, cz));

  float d000 = dot(g000, vec3(x - fx, y - fy, pz - fz));
  float d100 = dot(g100, vec3(x - cx, y - fy, pz - fz));
  float d010 = dot(g010, vec3(x - fx, y - cy, pz - fz));
  float d110 = dot(g110, vec3(x - cx, y - cy, pz - fz));
  float d001 = dot(g001, vec3(x - fx, y - fy, pz - cz));
  float d101 = dot(g101, vec3(x - cx, y - fy, pz - cz));
  float d011 = dot(g011, vec3(x - fx, y - cy, pz - cz));
  float d111 = dot(g111, vec3(x - cx, y - cy, pz - cz));

  float sx = quinticSmooth(x - fx);
  float sy = quinticSmooth(y - fy);
  float sz = quinticSmooth(pz - fz);

  float lx00 = mix(d000, d100, sx);
  float lx10 = mix(d010, d110, sx);
  float lx01 = mix(d001, d101, sx);
  float lx11 = mix(d011, d111, sx);

  float ly0 = mix(lx00, lx10, sy);
  float ly1 = mix(lx01, lx11, sy);

  return amplitude * mix(ly0, ly1, sz);
}

float auroraGlow(float t, vec2 uv, float bend) {
  float noiseVal = 0.0;
  float freq = uNoiseFreq;
  float amp = uNoiseAmp;
  vec2 samplePos = uv * uScale;

  for (float i = 0.0; i < 3.0; i += 1.0) {
    noiseVal += perlin3D(amp, freq, samplePos.x, samplePos.y, t);
    amp *= uOctaveDecay;
    freq *= 2.0;
  }

  float yBand = uv.y * 10.0 - (uBandHeight + bend) * 10.0;
  return 0.3 * max(exp(uBandSpread * (1.0 - 1.1 * uIntro.y * abs(noiseVal * uIntro.z + yBand))), 0.0);
}

vec2 turn(vec2 p, vec2 center) {
  float c = cos(uTilt);
  float s = sin(uTilt);
  vec2 d = p - center;
  return center + vec2(c * d.x - s * d.y, s * d.x + c * d.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 center = vec2(0.5 * uResolution.x / uResolution.y, 0.5);
  vec2 screen = turn(gl_FragCoord.xy / uResolution.y, center);
  vec2 cursor = turn(uCursor.xy, center);
  vec2 field = screen + uShift;
  float t = 0.4 * uFlow;

  float reach = exp(-pow((screen.x - cursor.x) / 0.32, 2.0)) * uCursor.z;
  float gap = cursor.y + uShift.y - uBandHeight;
  float near = exp(-gap * gap / 0.16);
  float bend = reach * gap * near * 0.55;

  float pulse = 0.0;
  for (int i = 0; i < 4; i++) {
    vec4 wave = uPulses[i];
    if (wave.z <= 0.0) continue;
    float x = (abs(screen.x - turn(wave.xy, center).x) - wave.w * 0.55) / (0.1 + wave.w * 0.06);
    pulse += wave.z * exp(-x * x);
  }
  float boost = (1.0 + reach * near * 0.25 + pulse * 0.65) * uIntro.x;

  float glow1 = auroraGlow(t, field, bend) * boost;
  float glow2 = auroraGlow(t + uLayerOffset, field, bend) * boost;
  vec3 gradient1 = mix(vec3(1.0), cosineGradient(uv.x + uHue * 0.2, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.3, 0.20, 0.20)), uSpectrum);
  vec3 gradient2 = mix(vec3(1.0), cosineGradient(uv.x + uHue * 0.1, vec3(0.5), vec3(0.5), vec3(2.0, 1.0, 0.0), vec3(0.5, 0.20, 0.25)), uSpectrum);

  vec3 col = 0.99 * glow1 * gradient1 * uColor1;
  col += 0.99 * glow2 * gradient2 * uColor2;
  col *= uBrightness;

  float grain = (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0;
  if (uLightMode > 0.5) {
    float energy = max(col.r, max(col.g, col.b));
    vec3 hue = clamp(col / max(energy, 1e-4), 0.0, 1.0);
    vec3 average = (glow1 * uColor1 + glow2 * uColor2) / max(glow1 + glow2, 1e-4);
    float top = max(average.r, max(average.g, average.b));
    float spread = top - min(average.r, min(average.g, average.b));
    float core = smoothstep(0.55, 1.6, energy);
    float depth = 1.25 + 0.45 * core;
    vec3 tint = mix(average * 0.82, pow(average / max(top, 1e-4), vec3(depth + 0.6)), smoothstep(0.04, 0.2, spread));
    float vivid = smoothstep(0.12, 0.55, 1.0 - min(hue.r, min(hue.g, hue.b))) * smoothstep(0.04, 0.2, spread);
    vec3 ink = mix(tint, pow(hue, vec3(depth)), vivid) * mix(0.93, 0.8, core);
    float density = 0.88 * (1.0 - exp(-1.9 * pow(energy, 1.7)));
    density = clamp(density * uOpacity + grain, 0.0, 1.0);
    fragColor = vec4(ink * density, density);
  } else {
    float alpha = clamp(length(col), 0.0, 1.0);
    vec3 color = clamp(col, 0.0, 1.0);
    fragColor = vec4(clamp(color * alpha + grain, 0.0, alpha) * uOpacity, alpha * uOpacity);
  }
}`;

const aurora = {
  gl: null,
  program: null,
  uniforms: null,
  vao: null,
  flow: 0,
  hue: 0,
  opening: 0,
  timeAt: 0,
  pointer: { x: 0.5, y: 0.5 },
  mouse: { x: 0.5, y: 0.5, presence: 0 },
  pulses: [],
  pulseData: new Float32Array(AURORA_MAX_PULSES * 4),
  colors: null,
  colorsAt: 0,
  light: false,
  failed: false
};

function auroraEase(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function auroraDispose() {
  const gl = aurora.gl;
  if (gl && !gl.isContextLost()) {
    if (aurora.program) gl.deleteProgram(aurora.program);
    if (aurora.vao) gl.deleteVertexArray(aurora.vao);
  }
  aurora.gl = null;
  aurora.program = null;
  aurora.uniforms = null;
  aurora.vao = null;
  aurora.failed = false;
  aurora.flow = 0;
  aurora.hue = 0;
  aurora.opening = 0;
  aurora.timeAt = 0;
  aurora.pulses.length = 0;
}

function auroraInit() {
  if (aurora.gl) return true;
  if (aurora.failed) return false;
  const gl = waterLayer.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance' });
  if (!gl) { aurora.failed = true; water.bands = true; console.warn('[Tabby] Soft Aura: WebGL2 is unavailable.'); return false; }
  const built = waterBuild(gl, AURORA_VERTEX, AURORA_FRAGMENT, null);
  if (!built) { aurora.failed = true; console.warn('[Tabby] Soft Aura: the shader failed to compile.'); return false; }
  aurora.gl = gl;
  aurora.program = built.program;
  aurora.uniforms = built.uniforms;
  aurora.vao = gl.createVertexArray();
  return true;
}

function drawAurora(now) {
  if (!auroraInit()) { if (water.bands) drawWaterBands(now); return; }
  const gl = aurora.gl;
  const u = aurora.uniforms;
  const width = Math.max(1, waterLayer.clientWidth);
  const height = Math.max(1, waterLayer.clientHeight);
  // The bands are soft, so it renders below screen resolution on purpose: the
  // component used half size, and a pixel cap keeps big screens cheap.
  const ratio = Math.max(0.25, Math.min(0.5, Math.sqrt(1.3e6 / (width * height))));
  const pixelWidth = Math.max(1, Math.round(width * ratio));
  const pixelHeight = Math.max(1, Math.round(height * ratio));
  if (waterLayer.width !== pixelWidth || waterLayer.height !== pixelHeight) {
    waterLayer.width = pixelWidth;
    waterLayer.height = pixelHeight;
  }

  const dt = aurora.timeAt ? Math.min(Math.max((now - aurora.timeAt) / 1000, 0), 0.05) : 0;
  aurora.timeAt = now;
  const pace = water.speed * 2.4;
  aurora.flow += dt * pace;
  aurora.hue += dt * pace;
  if (aurora.opening < 1) aurora.opening = Math.min(1, aurora.opening + dt / 2);

  if (!aurora.colors || now - aurora.colorsAt > 1000) {
    aurora.colors = waterColors();
    aurora.colorsAt = now;
    aurora.light = waterLightTheme();
  }

  const tracking = water.interactive && waterPointer.inside;
  if (tracking) {
    aurora.pointer.x = waterPointer.cx / width;
    aurora.pointer.y = 1 - waterPointer.cy / height;
  }
  const follow = 1 - Math.exp(-dt / 0.325);
  aurora.mouse.x += ((tracking ? aurora.pointer.x : 0.5) - aurora.mouse.x) * follow;
  aurora.mouse.y += ((tracking ? aurora.pointer.y : 0.5) - aurora.mouse.y) * follow;
  aurora.mouse.presence += ((tracking ? 1 : 0) - aurora.mouse.presence) * (1 - Math.exp(-dt / (tracking ? 0.45 : 0.8)));

  const aspect = width / height;
  while (waterClickQueue.length) {
    const click = waterClickQueue.shift();
    aurora.pulses.push({ x: (click.x / width) * aspect, y: 1 - click.y / height, age: 0 });
    if (aurora.pulses.length > AURORA_MAX_PULSES) aurora.pulses.shift();
  }
  for (let index = aurora.pulses.length - 1; index >= 0; index -= 1) {
    aurora.pulses[index].age += dt;
    if (aurora.pulses[index].age >= 2.6) aurora.pulses.splice(index, 1);
  }
  aurora.pulseData.fill(0);
  aurora.pulses.forEach((pulse, index) => {
    aurora.pulseData[index * 4] = pulse.x;
    aurora.pulseData[index * 4 + 1] = pulse.y;
    aurora.pulseData[index * 4 + 2] = auroraEase(pulse.age / 0.18) * (1 - auroraEase((pulse.age - 0.18) / 2.42));
    aurora.pulseData[index * 4 + 3] = pulse.age;
  });

  const eased = 1 - Math.pow(1 - aurora.opening, 3);
  const influence = 0.25;
  const strength = Math.min(1, influence * 4) * aurora.mouse.presence;
  const color1 = waterParse(aurora.colors[0]);
  const color2 = waterParse(aurora.colors[2]);

  gl.viewport(0, 0, pixelWidth, pixelHeight);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.disable(gl.BLEND);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(aurora.program);
  gl.bindVertexArray(aurora.vao);
  gl.uniform2f(u.uResolution, pixelWidth, pixelHeight);
  gl.uniform1f(u.uFlow, aurora.flow);
  gl.uniform1f(u.uHue, aurora.hue);
  gl.uniform1f(u.uScale, 1.5);
  gl.uniform1f(u.uBrightness, 1);
  gl.uniform3f(u.uColor1, color1[0], color1[1], color1[2]);
  gl.uniform3f(u.uColor2, color2[0], color2[1], color2[2]);
  gl.uniform1f(u.uNoiseFreq, 2.5);
  gl.uniform1f(u.uNoiseAmp, 1);
  gl.uniform1f(u.uBandHeight, 0.5);
  gl.uniform1f(u.uBandSpread, 1);
  gl.uniform1f(u.uOctaveDecay, 0.1);
  gl.uniform1f(u.uLayerOffset, 0);
  gl.uniform2f(u.uShift, (aurora.mouse.x - 0.5) * influence, (aurora.mouse.y - 0.5) * influence);
  gl.uniform4f(u.uCursor, aurora.mouse.x * aspect, aurora.mouse.y, strength, 0);
  gl.uniform4fv(u.uPulses, aurora.pulseData);
  gl.uniform1f(u.uSpectrum, 1);
  gl.uniform1f(u.uTilt, 0);
  gl.uniform3f(u.uIntro, auroraEase(aurora.opening / 0.7), 1 + 3 * (1 - eased) * (1 - eased), 0.25 + 0.75 * eased);
  gl.uniform1f(u.uLightMode, aurora.light ? 1 : 0);
  gl.uniform1f(u.uOpacity, 1);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// ---- Which background runs ------------------------------------------------------
function releaseFlux() {
  if (water.gl && !water.gl.isContextLost()) {
    if (water.program) water.gl.deleteProgram(water.program);
    if (water.vao) water.gl.deleteVertexArray(water.vao);
  }
  water.gl = null;
  water.program = null;
  water.uniforms = null;
  water.vao = null;
  water.initTried = false;
  water.bands = false;
  water.broken = false;
}

function drawWater(now) {
  if (water.style === 'ether') { drawEther(now); return; }
  if (water.style === 'bends') { drawBends(now); return; }
  if (water.style === 'aurora') { drawAurora(now); return; }
  drawFlux(now);
}

function applyWaterStyle(style, { render = true } = {}) {
  water.style = style;
  releaseFlux();
  etherDispose();
  bendsDispose();
  auroraDispose();
  water.reveal = style === 'flux' ? 0 : 1;
  if (render) {
    pumpWater();
    if (water.on && !document.hidden) drawWater(performance.now());
  }
}

const savedStyle = localStorage.getItem(WATER_STYLE_KEY);
water.style = ['flux', 'ether', 'bends', 'aurora'].includes(savedStyle) ? savedStyle : 'flux';
if (waterStyleSelect) {
  waterStyleSelect.value = water.style;
  enhanceGlideSelect(waterStyleSelect, { ariaLabel: 'Water background', menuWidth: 200 });
  waterStyleSelect.addEventListener('change', () => {
    applyWaterStyle(waterStyleSelect.value);
    safeSetItem(WATER_STYLE_KEY, water.style);
    haptic('soft');
  });
}
if (water.style !== 'flux') { water.reveal = 1; drawWater(performance.now()); pumpWater(); }

// ---- Privacy lock --------------------------------------------------------------
// One tap and every widget body blurs, so nothing private is readable at a glance.
const privacyButton = document.getElementById('privacyButton');
function setPrivacyLocked(locked) {
  document.body.classList.toggle('privacy-locked', locked);
  privacyButton.setAttribute('aria-pressed', String(locked));
  const label = locked ? 'Show widget content' : 'Hide widget content';
  privacyButton.setAttribute('aria-label', label);
  privacyButton.title = label;
  haptic('soft');
}
privacyButton.addEventListener('click', () => {
  setPrivacyLocked(!document.body.classList.contains('privacy-locked'));
});

setInterval(tickClocks, 1000);
setInterval(tickTimers, 1000);
setInterval(() => { if (!document.hidden) refreshWeathers(); }, WEATHER_MAX_AGE);
window.addEventListener('online', refreshWeathers);
document.addEventListener('visibilitychange', () => { if (!document.hidden) { tickClocks(); tickTimers(); refreshWeathers(); } });

// ---- Backup: widgets, settings, uploaded font and wallpaper (you choose what goes in) ----
// Without media the backup is a small .json file. With a font or wallpaper it is a .tabby file:
// a short header, the same JSON as a manifest, then the raw font/photo/video bytes (no base64, so big videos work).
const BACKUP_APP = 'tabby';
const BACKUP_KIND = 'settings-backup';
const BACKUP_MAGIC = 'TABBYBK2';
const HEX_COLOR = /^#[\da-f]{6}$/i;

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

// parts: { widgets, settings, font, wallpaper } as booleans; media: { font, wallpaper } stored items
function buildBackup(parts = { widgets: true, settings: true }, media = {}) {
  const read = key => localStorage.getItem(key);
  const backup = { app: BACKUP_APP, kind: BACKUP_KIND, version: 1, exportedAt: new Date().toISOString() };
  if (parts.settings) {
    const font = read(FONT_MODE_KEY);
    backup.settings = {
      interfaceColor: read(INTERFACE_COLOR_KEY),
      uiBackgroundColor: read(UI_BACKGROUND_KEY),
      buttonBackgroundColor: read(BUTTON_BACKGROUND_KEY),
      themes: loadThemeStore(),
      fontMode: font && (font !== 'custom' || parts.font) ? font : null,
      hideControls: read(AUTOHIDE_KEY),
      siteIcons: read(SITE_ICONS_KEY),
      wallpaperVolume: read(VOLUME_KEY)
    };
  }
  if (parts.widgets) backup.widgets = JSON.parse(JSON.stringify(widgets));
  const files = [];
  const blobs = [];
  if (parts.font && media.font?.blob) {
    files.push({ role: 'font', name: String(media.font.name || 'font').slice(0, 120), type: media.font.blob.type || '', size: media.font.blob.size });
    blobs.push(media.font.blob);
  }
  if (parts.wallpaper && media.wallpaper?.blob) {
    const type = media.wallpaper.type || media.wallpaper.blob.type || '';
    files.push({ role: 'wallpaper', name: String(media.wallpaper.name || 'wallpaper').slice(0, 120), type, size: media.wallpaper.blob.size });
    blobs.push(media.wallpaper.blob);
  }
  if (!files.length) return { json: backup, blob: null };
  backup.version = 2;
  backup.files = files;
  const manifest = new TextEncoder().encode(JSON.stringify(backup));
  const length = new Uint8Array(4);
  new DataView(length.buffer).setUint32(0, manifest.length);
  return { json: backup, blob: new Blob([BACKUP_MAGIC, length, manifest, ...blobs], { type: 'application/octet-stream' }) };
}

// Reads a backup file (old .json or new .tabby). Returns { data, media } where media holds Blobs by role.
async function readBackupFile(file) {
  if (!file || file.size === 0) throw new Error('That file is empty.');
  if (file.size > MAX_BACKUP_BYTES) throw new Error(`That file is too large to be a Tabby backup (${formatBytes(file.size)}).`);
  const magic = await file.slice(0, BACKUP_MAGIC.length).text();
  if (magic !== BACKUP_MAGIC) {
    if (file.size > 5 * 1024 * 1024) throw new Error('That file is too large to be a Tabby backup.');
    let data;
    try { data = JSON.parse(await file.text()); } catch { throw new Error('That file is not a valid Tabby backup. It is not readable JSON.'); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('That file is not a Tabby backup.');
    return { data, media: {} };
  }
  const manifestStart = BACKUP_MAGIC.length + 4;
  if (file.size < manifestStart) throw new Error('This backup file is damaged (it ends too early).');
  const manifestLength = new DataView(await file.slice(BACKUP_MAGIC.length, manifestStart).arrayBuffer()).getUint32(0);
  if (manifestLength === 0 || manifestLength > 5 * 1024 * 1024 || manifestStart + manifestLength > file.size) throw new Error('This backup file is damaged.');
  let data;
  try { data = JSON.parse(await file.slice(manifestStart, manifestStart + manifestLength).text()); } catch { throw new Error('This backup file is damaged (its contents list is unreadable).'); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('This backup file is damaged.');
  const list = data.files === undefined ? [] : data.files;
  if (!Array.isArray(list) || list.length > 2) throw new Error('This backup file is damaged (unexpected file list).');
  const media = {};
  let offset = manifestStart + manifestLength;
  for (const entry of list) {
    const size = entry?.size;
    const limit = entry?.role === 'font' ? MAX_FONT_BYTES : MAX_WALLPAPER_BYTES;
    if (entry?.role !== 'font' && entry?.role !== 'wallpaper') throw new Error('This backup contains something Tabby does not recognize.');
    if (media[entry.role]) throw new Error('This backup file is damaged (the same item appears twice).');
    if (!Number.isInteger(size) || size <= 0 || size > limit) throw new Error(`The ${entry.role} in this backup has an invalid size.`);
    if (offset + size > file.size) throw new Error('This backup file is damaged (it ends too early).');
    media[entry.role] = { entry, blob: file.slice(offset, offset + size, String(entry.type || '')) };
    offset += size;
  }
  if (offset !== file.size) throw new Error('This backup file is damaged (it has extra data at the end).');
  return { data, media };
}

function cleanNumber(value, min, max) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : null;
}

function sanitizeWidgets(list) {
  if (!Array.isArray(list)) throw new Error('This backup has no widgets list.');
  const usedIds = new Set();
  return list.slice(0, 50).flatMap(item => {
    if (item && item.type === 'timer-v2') item = { ...item, type: 'timer-v3' };
    if (!item || typeof item !== 'object' || !WIDGET_TYPES[item.type]) return [];
    let id = typeof item.id === 'string' && /^[\w-]{1,64}$/.test(item.id) ? item.id : '';
    if (!id || usedIds.has(id)) id = `widget-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    usedIds.add(id);
    const type = item.type;
    const widget = {
      id,
      type,
      name: String(item.name || WIDGET_TYPES[type].defaultName).trim().slice(0, 24) || WIDGET_TYPES[type].defaultName,
      enabled: Boolean(item.enabled),
      shortcuts: [],
      position: null,
      size: null
    };
    if (isFavoritesType(type)) {
      const source = Array.isArray(item.shortcuts) ? item.shortcuts : [];
      const shortcuts = source.slice(0, type === 'favorites' ? 9 : 300).map(shortcut => {
        if (!shortcut || typeof shortcut !== 'object') return null;
        const name = String(shortcut.name || '').trim().slice(0, 28);
        if (!name) return null;
        try { return { name, url: normalizeWebsite(String(shortcut.url || '')) }; } catch { return null; }
      });
      widget.shortcuts = type === 'favorites' ? emptyShortcuts(shortcuts) : shortcuts;
    }
    if (type === 'clock') {
      const options = clockOptions(item);
      widget.options = options;
    } else if (isTimerType(type)) {
      widget.options = timerOptions(item);
    } else if (type === 'weather') {
      const wo = weatherOptions(item);
      widget.options = { units: wo.units };
      if (wo.city) Object.assign(widget.options, { city: wo.city, lat: wo.lat, lon: wo.lon });
    } else if (type === 'notes') {
      const seen = new Set();
      const notes = (Array.isArray(item.notes) ? item.notes : []).slice(0, NOTES_MAX).map(note => {
        let noteId = String(note?.id || '').replace(/[^\w-]/g, '').slice(0, 24);
        if (!noteId || seen.has(noteId)) noteId = newNote().id;
        seen.add(noteId);
        return { id: noteId, text: String(note?.text || '').slice(0, NOTE_CHARS) };
      });
      widget.notes = notes.length ? notes : [newNote()];
      widget.activeNote = widget.notes.some(note => note.id === item.activeNote) ? item.activeNote : widget.notes[0].id;
    } else if (type === 'search') {
      const so = searchOptions(item);
      widget.options = { engine: so.engine, switcher: so.switcher };
      if (so.customUrl) { widget.options.customName = so.customName; widget.options.customUrl = so.customUrl; }
    }
    const x = cleanNumber(item.position?.x, 0, 1);
    const y = cleanNumber(item.position?.y, 0, 1);
    if (x !== null && y !== null) widget.position = { x, y };
    const width = cleanNumber(item.size?.width, 40, 4000);
    const height = cleanNumber(item.size?.height, 40, 4000);
    if (width !== null && height !== null) widget.size = { width, height };
    if (isFavoritesType(type) && typeof item.options?.scaleTogether === 'boolean') widget.options = { scaleTogether: item.options.scaleTogether };
    const scale = cleanNumber(item.scale, 0.5, 2.5);
    if (scale !== null && isFavoritesType(type)) widget.scale = scale;
    widget.appearance = {
      backgroundColor: HEX_COLOR.test(item.appearance?.backgroundColor || '') ? item.appearance.backgroundColor : '#2a2439',
      opacity: cleanNumber(item.appearance?.opacity, 0, 100) ?? 85,
      outline: item.appearance?.outline !== false,
      blur: blurAmount({ type, appearance: item.appearance }),
      ...(HEX_COLOR.test(item.appearance?.textColor || '') ? { textColor: item.appearance.textColor } : {})
    };
    return [widget];
  });
}

async function applyBackup(data, media = {}) {
  if (!data || typeof data !== 'object' || data.app !== BACKUP_APP || data.kind !== BACKUP_KIND) {
    throw new Error('This file is not a Tabby backup.');
  }
  if (!Number.isInteger(data.version) || data.version < 1) throw new Error('This backup file is damaged (no version).');
  if (data.version > 2) throw new Error('This backup was made by a newer version of Tabby. Update Tabby and try again.');
  // 1) Check everything before changing anything, so a bad file never leaves a half-restored setup.
  const restored = data.widgets === undefined ? null : sanitizeWidgets(data.widgets);
  if (restored && JSON.stringify(restored).length > 3 * 1024 * 1024) throw new Error('The widgets in this backup are too large to restore.');
  const settings = data.settings && typeof data.settings === 'object' && !Array.isArray(data.settings) ? data.settings : null;
  let font = null;
  if (media.font) {
    const name = String(media.font.entry.name || '');
    if (!/\.(woff2?|ttf|otf)$/i.test(name)) throw new Error('The font in this backup is not a supported font file.');
    font = new File([media.font.blob], name.slice(0, 120), { type: media.font.entry.type || '' });
    await verifyFontFile(font);
  }
  let wallpaper = null;
  if (media.wallpaper) {
    const type = String(media.wallpaper.entry.type || '');
    if (!type.startsWith('image/') && !type.startsWith('video/')) throw new Error('The wallpaper in this backup is not a photo or video.');
    wallpaper = new File([media.wallpaper.blob], String(media.wallpaper.entry.name || 'wallpaper').slice(0, 120), { type });
    if (type.startsWith('image/') && window.createImageBitmap) {
      try { (await createImageBitmap(wallpaper)).close(); } catch { throw new Error('The wallpaper photo in this backup is damaged and cannot be opened.'); }
    }
  }
  const changes = [];
  const put = (key, value) => changes.push([key, value]);
  if (settings) {
    const putColor = (key, value) => { if (HEX_COLOR.test(value || '')) put(key, value); };
    putColor(INTERFACE_COLOR_KEY, settings.interfaceColor);
    putColor(UI_BACKGROUND_KEY, settings.uiBackgroundColor);
    putColor(BUTTON_BACKGROUND_KEY, settings.buttonBackgroundColor);
    if (settings.themes && typeof settings.themes === 'object') put(THEMES_KEY, JSON.stringify(sanitizeThemeStore(settings.themes)));
    const fontKey = normalizeFontKey(settings.fontMode);
    if (fontKey === 'custom') { if (font) put(FONT_MODE_KEY, 'custom'); }
    else if (fontChoices[fontKey]) put(FONT_MODE_KEY, fontKey);
    if (settings.siteIcons === 'on' || settings.siteIcons === 'off') put(SITE_ICONS_KEY, settings.siteIcons);
    if (settings.hideControls === 'on' || settings.hideControls === 'off') put(AUTOHIDE_KEY, settings.hideControls);
    const volume = cleanNumber(settings.wallpaperVolume, 0, 100);
    if (volume !== null) put(VOLUME_KEY, String(volume));
  }
  if (restored) put(WIDGETS_KEY, JSON.stringify(restored));
  // 2) Big files first (the step most likely to run out of space), with a check that they fit.
  const needed = (font ? font.size : 0) + (wallpaper ? wallpaper.size : 0);
  if (needed) await ensureSpaceFor(needed);
  if (font) await storeFont(font);
  if (wallpaper) await saveBackground(wallpaper);
  // 3) Small settings last. If the browser refuses one, put every setting back the way it was.
  const before = changes.map(([key]) => [key, localStorage.getItem(key)]);
  try {
    for (const [key, value] of changes) localStorage.setItem(key, value);
  } catch (error) {
    for (const [key, value] of before) {
      try { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value); } catch {}
    }
    throw new Error(isQuotaError(error)
      ? 'Your browser storage is full, so nothing was restored. Free up some space and try again.'
      : 'Tabby could not save the restored settings, so nothing was changed.');
  }
  return { widgets: restored ? restored.length : null, settings: Boolean(settings), font: Boolean(font), wallpaper: Boolean(wallpaper) };
}

function describeBackup(data, media) {
  const parts = [];
  if (Array.isArray(data?.widgets)) parts.push('your widgets');
  if (data?.settings && typeof data.settings === 'object') parts.push('your settings');
  if (media.font) parts.push('your uploaded font');
  if (media.wallpaper) parts.push('your wallpaper');
  return parts.length ? parts.join(', ').replace(/, ([^,]*)$/, ' and $1') : 'nothing';
}

function initBackup() {
  const exportButton = document.getElementById('exportBackupButton');
  const importButton = document.getElementById('importBackupButton');
  const input = document.getElementById('backupInput');
  const status = document.getElementById('backupStatus');
  const dialog = document.getElementById('exportBackupDialog');
  const form = document.getElementById('exportBackupForm');
  const box = id => document.getElementById(id);
  let media = { font: null, wallpaper: null };

  const refreshSize = () => {
    const fontOn = box('exportFont').checked && !box('exportFont').disabled;
    const wallpaperOn = box('exportWallpaper').checked && !box('exportWallpaper').disabled;
    const bytes = (fontOn ? media.font.blob.size : 0) + (wallpaperOn ? media.wallpaper.blob.size : 0);
    const anything = box('exportWidgets').checked || box('exportSettings').checked || fontOn || wallpaperOn;
    box('exportBackupConfirm').disabled = !anything;
    box('exportBackupSize').textContent = !anything ? 'Choose at least one thing to export.'
      : bytes > 0 ? `The file will be about ${formatBytes(bytes)}${bytes > 500 * 1024 * 1024 ? '. That is large, so saving it may take a moment.' : '.'}`
      : 'The file will be small.';
  };
  dialog.addEventListener('change', refreshSize);

  exportButton.addEventListener('click', async () => {
    media = { font: await getStoredFont().catch(() => null), wallpaper: await readBackground().catch(() => null) };
    const hasFont = Boolean(media.font?.blob);
    const hasWallpaper = Boolean(media.wallpaper?.blob);
    box('exportFont').disabled = !hasFont;
    box('exportFont').checked = hasFont;
    box('exportFontInfo').textContent = hasFont ? `${media.font.name || 'Custom font'} (${formatBytes(media.font.blob.size)})` : 'You have not uploaded a font.';
    box('exportWallpaper').disabled = !hasWallpaper;
    box('exportWallpaper').checked = hasWallpaper;
    const kind = (media.wallpaper?.type || media.wallpaper?.blob?.type || '').startsWith('video/') ? 'Video' : 'Photo';
    box('exportWallpaperInfo').textContent = hasWallpaper ? `${kind}: ${media.wallpaper.name || 'current wallpaper'} (${formatBytes(media.wallpaper.blob.size)})` : 'You have not set a wallpaper.';
    box('exportWidgets').checked = true;
    box('exportSettings').checked = true;
    refreshSize();
    dialog.showModal();
  });
  dialog.addEventListener('close', () => {
    if (dialog.returnValue !== 'export') return;
    const parts = {
      widgets: box('exportWidgets').checked,
      settings: box('exportSettings').checked,
      font: box('exportFont').checked && !box('exportFont').disabled,
      wallpaper: box('exportWallpaper').checked && !box('exportWallpaper').disabled
    };
    try {
      const { json, blob: container } = buildBackup(parts, media);
      const blob = container || new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const today = new Date();
      const stamp = [today.getDate(), today.getMonth() + 1, today.getFullYear()]
        .map(part => String(part).padStart(2, '0')).join('_');
      link.download = `Backup_${stamp}.tabby`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      status.textContent = `Backup saved to your downloads (${formatBytes(blob.size)}).`;
      notify({ type: 'success', title: 'Backup saved', message: `Written to your downloads as ${formatBytes(blob.size)}.`, duration: 3000 });
    } catch (error) {
      console.error('Could not create the backup:', error);
      status.textContent = 'Tabby could not create the backup file. Try again, or leave out the wallpaper if it is very large.';
      notify({ type: 'error', title: 'Something went wrong', message: status.textContent, duration: 3000 });
    } finally {
      media = { font: null, wallpaper: null }; // do not keep the big files in memory after exporting
    }
  });

  importButton.addEventListener('click', () => input.click());
  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    try {
      const { data, media: restoredMedia } = await readBackupFile(file);
      const summary = describeBackup(data, restoredMedia);
      if (!window.confirm(`Restore this backup? It replaces ${summary} on this device. Anything the backup does not contain is left as it is.`)) return;
      status.textContent = 'Restoring…';
      const result = await applyBackup(data, restoredMedia);
      const bits = [];
      if (result.widgets !== null) bits.push(`${result.widgets} widget${result.widgets === 1 ? '' : 's'}`);
      if (result.settings) bits.push('settings');
      if (result.font) bits.push('font');
      if (result.wallpaper) bits.push('wallpaper');
      status.textContent = `Restored ${bits.join(', ') || 'nothing'}. Reloading…`;
      notify({ type: 'success', title: 'Backup restored', message: `Restored ${bits.join(', ') || 'nothing'}.`, duration: 3000 });
      setTimeout(() => location.reload(), 400);
    } catch (error) {
      status.textContent = error instanceof SyntaxError ? 'That file is not a valid Tabby backup.' : describeStorageError(error, 'Could not restore that file.');
      notify({ type: 'error', title: 'Something went wrong', message: status.textContent, duration: 3000 });
    }
  });
}
initBackup();

// Notifications that run once on load.
offerSupport();
setTimeout(checkForUpdate, 1500);


// ---- Guidance: empty states, move helper, first-run hint, delete confirmation ----
const WELCOME_KEY = 'tabby-welcome-seen';
const WIDGET_HELP = {
  notes: 'Several notes in tabs. Everything you type saves automatically.',
  favorites: 'A 3×3 grid with nine shortcut slots.',
  'favorites-v2': 'A simple list you can add as many sites to as you like.',
  clock: 'Shows the time and date.',
  search: 'Search Google, YouTube or DuckDuckGo from your new tab.',
  timer: 'Focus and break sessions with start, pause and reset.',
  'timer-v3': 'A dark Pomodoro card with a ring that burns down, session dots and built-in settings.',
  weather: 'Current temperature and today\u2019s high and low for your city.'
};
const wallpaperEmpty = document.getElementById('wallpaperEmpty');
const widgetsEmpty = document.getElementById('widgetsEmpty');
const uploadLabel = document.getElementById('uploadLabel');
const moveWidgetsButton = document.getElementById('moveWidgetsButton');
const moveBanner = document.getElementById('moveBanner');
const welcomeHint = document.getElementById('welcomeHint');
const confirmDeleteDialog = document.getElementById('confirmDeleteDialog');
const widgetTypeSelect = document.getElementById('widgetTypeSelect');
const widgetTypeHelp = document.getElementById('widgetTypeHelp');
let pendingDeleteId = null;

function syncEmptyStates() {
  const hasWallpaper = wallpaperList.childElementCount > 0;
  const hasWidgets = widgetList.childElementCount > 0;
  wallpaperEmpty.hidden = hasWallpaper;
  uploadLabel.textContent = hasWallpaper ? 'Replace photo or video' : 'Add photo or video';
  widgetsEmpty.hidden = hasWidgets;
  moveWidgetsButton.hidden = !hasWidgets;
}
new MutationObserver(syncEmptyStates).observe(wallpaperList, { childList: true });
new MutationObserver(syncEmptyStates).observe(widgetList, { childList: true });
syncEmptyStates();

function syncMoveUi() {
  const on = moveModeButton.getAttribute('aria-pressed') === 'true';
  moveBanner.hidden = !on;
  moveWidgetsButton.textContent = on ? 'Finish moving widgets' : 'Move or resize widgets';
}
new MutationObserver(syncMoveUi).observe(moveModeButton, { attributes: true, attributeFilter: ['aria-pressed'] });
moveWidgetsButton.addEventListener('click', () => {
  moveModeButton.click();
  if (moveModeButton.getAttribute('aria-pressed') === 'true') closeWallpaperPanel();
});
document.getElementById('moveDone').addEventListener('click', () => moveModeButton.click());
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !moveBanner.hidden && wallpaperPanel.hidden && !document.querySelector('dialog[open]')) moveModeButton.click();
});

document.getElementById('panelClose').addEventListener('click', () => {
  closeWallpaperPanel();
  settingsButton.focus();
});

function dismissWelcome() {
  welcomeHint.hidden = true;
  try { safeSetItem(WELCOME_KEY, '1'); } catch (error) { /* storage unavailable */ }
}
try { welcomeHint.hidden = Boolean(localStorage.getItem(WELCOME_KEY)); } catch (error) { welcomeHint.hidden = true; }
document.getElementById('dismissHint').addEventListener('click', dismissWelcome);
settingsButton.addEventListener('click', dismissWelcome);

function showWidgetTypeHelp() { widgetTypeHelp.textContent = WIDGET_HELP[widgetTypeSelect.value] || ''; }
widgetTypeSelect.addEventListener('change', showWidgetTypeHelp);
addWidgetButton.addEventListener('click', showWidgetTypeHelp);
showWidgetTypeHelp();

function askDeleteWidget(widget) {
  pendingDeleteId = widget.id;
  document.getElementById('confirmDeleteTitle').textContent = `Delete widget “${widget.name}”?`;
  document.getElementById('confirmDeleteBody').textContent = 'Its shortcuts and settings will be removed. This can’t be undone.';
  confirmDeleteDialog.showModal();
}
confirmDeleteDialog.addEventListener('close', () => {
  if (confirmDeleteDialog.returnValue === 'delete' && pendingDeleteId) {
    const id = pendingDeleteId;
    widgets = widgets.filter(item => item.id !== id);
    if (openEditorWidgetId === id) openEditorWidgetId = null;
    saveWidgets();
  }
  pendingDeleteId = null;
  confirmDeleteDialog.returnValue = '';
});

// The version shown in Settings always comes from manifest.json, so the two can never disagree.
(function showVersion() {
  const label = document.querySelector('.panel-subtitle .version');
  try {
    const version = chrome.runtime.getManifest().version;
    if (label && version) label.textContent = `v${version}`;
  } catch {}
})();

// ---- Cross-tab synchronization -----------------------------------------------
window.addEventListener('storage', event => {
  if (event.key === WIDGETS_KEY || event.key === null) {
    const isEditingNotes = document.activeElement && document.activeElement.classList.contains('notes-text');
    if (!moveMode && !isEditingNotes) {
      widgets = loadWidgets();
      renderWidgets();
      if (!wallpaperPanel.hidden && widgetsTab.classList.contains('active')) {
        renderWidgetsPanel();
      }
    }
  }
  if (event.key === INTERFACE_COLOR_KEY || event.key === null) {
    const color = localStorage.getItem(INTERFACE_COLOR_KEY);
    if (/^#[\da-f]{6}$/i.test(color || '')) {
      applyInterfaceColor(color);
      const input = document.getElementById('interfaceColorInput');
      if (input) input.value = color;
    }
  }
  if (event.key === UI_BACKGROUND_KEY || event.key === null) {
    const color = localStorage.getItem(UI_BACKGROUND_KEY);
    if (/^#[\da-f]{6}$/i.test(color || '')) {
      document.documentElement.style.setProperty('--tabby-ui-background', color);
      const input = document.getElementById('uiBackgroundColorInput');
      if (input) input.value = color;
    }
  }
  if (event.key === BUTTON_BACKGROUND_KEY || event.key === null) {
    const color = localStorage.getItem(BUTTON_BACKGROUND_KEY);
    if (/^#[\da-f]{6}$/i.test(color || '')) {
      document.documentElement.style.setProperty('--tabby-button-bg', color);
      const input = document.getElementById('buttonBackgroundColorInput');
      if (input) input.value = color;
    }
  }
  if (event.key === AUTOHIDE_KEY || event.key === null) {
    const on = localStorage.getItem(AUTOHIDE_KEY) === 'on';
    document.body.classList.toggle('autohide-controls', on);
    const toggle = document.getElementById('autoHideControlsToggle');
    if (toggle) toggle.checked = on;
  }
  if (event.key === SITE_ICONS_KEY || event.key === null) {
    const toggle = document.getElementById('siteIconsToggle');
    if (toggle) toggle.checked = siteIconsOn();
    renderWidgets();
  }
  if (event.key === FONT_MODE_KEY || event.key === null) {
    initFontSettings().catch(() => {});
  }
  if (event.key === VOLUME_KEY || event.key === null) {
    if (currentWallpaperVideo) {
      currentWallpaperVideo.volume = savedWallpaperVolume() / 100;
    }
  }
});

