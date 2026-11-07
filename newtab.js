/* Copyright (c) 2026 Asadjon. Licensed under the MIT License (see LICENSE). */
const DB_NAME = 'open-canvas-backgrounds';
const STORE_NAME = 'settings';
const BACKGROUND_KEY = 'background';
const FONT_KEY = 'uploaded-font';
const FONT_MODE_KEY = 'tabby-font-mode';
const INTERFACE_COLOR_KEY = 'tabby-interface-color';
const UI_BACKGROUND_KEY = 'tabby-ui-background-color';
const BUTTON_BACKGROUND_KEY = 'tabby-button-background-color';
const WALLPAPER_SOUND_ON_ICON = 'wallpaper-sound-on.svg';
const WALLPAPER_SOUND_OFF_ICON = 'wallpaper-sound-off.svg';
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
let uploadedFontUrl = null;

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
  chevron.textContent = '⌄';
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
    pop.ownerButton = button;
    let hsv = hexToHsv(input.value);
    pop.innerHTML = `
      <div class="color-pop-hex"><span class="color-chip"></span><input type="text" maxlength="7" spellcheck="false" aria-label="Hex color"></div>
      <div class="color-pop-main">
        <div class="color-area"><div class="color-thumb"></div></div>
        <div class="color-hue"><div class="color-thumb"></div></div>
      </div>`;
    const area = pop.querySelector('.color-area');
    const hue = pop.querySelector('.color-hue');
    const hexInput = pop.querySelector('input');
    const popChip = pop.querySelector('.color-chip');
    const areaThumb = area.firstElementChild;
    const hueThumb = hue.firstElementChild;
    const render = (fromHex) => {
      const hex = hsvToHex(hsv);
      area.style.background = `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsv.h} 100% 50%))`;
      areaThumb.style.left = `${hsv.s * 100}%`;
      areaThumb.style.top = `${(1 - hsv.v) * 100}%`;
      areaThumb.style.background = hex;
      hueThumb.style.top = `${hsv.h / 360 * 100}%`;
      hueThumb.style.background = `hsl(${hsv.h} 100% 50%)`;
      popChip.style.background = hex;
      if (!fromHex) hexInput.value = hex.toUpperCase();
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
    drag(hue, (x, y) => { hsv = { ...hsv, h: y * 359.99 }; });
    hexInput.addEventListener('input', () => {
      let v = hexInput.value.trim();
      if (!v.startsWith('#')) v = '#' + v;
      if (!/^#[\da-f]{6}$/i.test(v)) return;
      hsv = hexToHsv(v);
      commit(true);
    });
    pop.addEventListener('click', event => event.stopPropagation());
    document.body.append(pop);
    openColorPopover = pop;
    render(false);
    const rect = button.getBoundingClientRect();
    const width = 232;
    const left = Math.max(8, Math.min(window.innerWidth - width - 8, rect.right - width));
    let top = rect.bottom + 8;
    if (top + 230 > window.innerHeight) top = Math.max(8, rect.top - 230 - 8);
    pop.style.left = `${left}px`;
    pop.style.top = `${top}px`;
  });
}

function initInterfaceColor() {
  const input = document.getElementById('interfaceColorInput');
  const saved = localStorage.getItem(INTERFACE_COLOR_KEY);
  const color = /^#[\da-f]{6}$/i.test(saved || '') ? saved : '#c3b1ff';
  input.value = color;
  applyInterfaceColor(color);
  input.addEventListener('input', () => {
    applyInterfaceColor(input.value);
    localStorage.setItem(INTERFACE_COLOR_KEY, input.value);
  });
}

function initUiBackgroundColor() {
  const input = document.getElementById('uiBackgroundColorInput');
  const saved = localStorage.getItem(UI_BACKGROUND_KEY);
  const color = /^#[\da-f]{6}$/i.test(saved || '') ? saved : '#2a2439';
  input.value = color;
  document.documentElement.style.setProperty('--tabby-ui-background', color);
  input.addEventListener('input', () => {
    document.documentElement.style.setProperty('--tabby-ui-background', input.value);
    localStorage.setItem(UI_BACKGROUND_KEY, input.value);
  });
}

function initButtonBackgroundColor() {
  const input = document.getElementById('buttonBackgroundColorInput');
  const saved = localStorage.getItem(BUTTON_BACKGROUND_KEY);
  const color = /^#[\da-f]{6}$/i.test(saved || '') ? saved : '#3a3354';
  input.value = color;
  document.documentElement.style.setProperty('--tabby-button-bg', color);
  input.addEventListener('input', () => {
    document.documentElement.style.setProperty('--tabby-button-bg', input.value);
    localStorage.setItem(BUTTON_BACKGROUND_KEY, input.value);
  });
}

const THEMES_KEY = 'tabby-themes-v1';
const BUILTIN_THEMES = [
  { id: 'default', name: 'Lavender', tag: 'Default', accent: '#c3b1ff', surface: '#3a3354', ui: '#2a2439' },
  { id: 'pumpkin', name: '🎃 Pumpkin spice', tag: 'Warm & cozy', accent: '#be5103', surface: '#544823', ui: '#332216' },
  { id: 'winter', name: '❄ Winter chill', tag: 'Icy & calm', accent: '#b8e3e9', surface: '#4f7c82', ui: '#0b2e33' },
  { id: 'autumn', name: '🍂 Autumn leaves', tag: 'Golden brown', accent: '#ffb343', surface: '#614419', ui: '#2c1f0b' },
  { id: 'honeycomb', name: '🍯 Honeycomb', tag: 'Sweet amber', accent: '#ffc107', surface: '#442814', ui: '#1e1209' },
  { id: 'stone', name: '🪨 Stone path', tag: 'Soft & earthy', accent: '#a5a58d', surface: '#34322e', ui: '#1e1d1a' },
  { id: 'salt', name: '🧂 Salt and pepper', tag: 'Clean mono', accent: '#d4d4d4', surface: '#3a3a3a', ui: '#2b2b2b' },
  { id: 'golden', name: '🌇 Golden hour', tag: 'Gold & lilac', accent: '#ffbf00', surface: '#312738', ui: '#1b151f' },
  { id: 'forest', name: '🌲 Lush forest', tag: 'Fresh green', accent: '#68ba7f', surface: '#2e6f40', ui: '#253d2c' }
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

// The old Lavender (dark blue) is swapped for the new one, but only if the user never changed those colors.
function migrateOldLavender() {
  const old = { [INTERFACE_COLOR_KEY]: '#b6a3ff', [UI_BACKGROUND_KEY]: '#182333', [BUTTON_BACKGROUND_KEY]: '#202e41' };
  const stored = Object.keys(old).map(key => (localStorage.getItem(key) || '').toLowerCase());
  if (stored.every((value, i) => value === Object.values(old)[i])) {
    const lav = BUILTIN_THEMES[0];
    localStorage.setItem(INTERFACE_COLOR_KEY, lav.accent);
    localStorage.setItem(UI_BACKGROUND_KEY, lav.ui);
    localStorage.setItem(BUTTON_BACKGROUND_KEY, lav.surface);
  }
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
  const persist = () => localStorage.setItem(THEMES_KEY, JSON.stringify(store));
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

async function loadUploadedFont(item) {
  if (!item?.blob) return false;
  if (uploadedFontUrl) URL.revokeObjectURL(uploadedFontUrl);
  uploadedFontUrl = URL.createObjectURL(item.blob);
  const face = new FontFace('TabbyUploaded', `url("${uploadedFontUrl}")`);
  await face.load();
  document.fonts.add(face);
  applyFont('TabbyUploaded, Arial, sans-serif');
  return true;
}

async function getStoredFont() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(FONT_KEY);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function storeFont(file) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).put({ blob: file, name: file.name }, FONT_KEY);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
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
        localStorage.setItem(FONT_MODE_KEY, 'custom');
        status.textContent = 'Using your uploaded font.';
      } catch {
        status.textContent = 'That font could not be loaded. Upload a different file.';
      }
      return;
    }
    applyFont(fontChoices[normalizeFontKey(select.value)] || fontChoices.system);
    localStorage.setItem(FONT_MODE_KEY, select.value);
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
      await storeFont(file);
      await loadUploadedFont({ blob: file });
      customOption.disabled = false;
      customOption.textContent = `Uploaded: ${file.name}`;
      select.value = 'custom';
      select.glideSelectRefresh?.();
      localStorage.setItem(FONT_MODE_KEY, 'custom');
      status.textContent = `Using ${file.name}.`;
    } catch {
      status.textContent = 'This font file could not be loaded. Try another file.';
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
  const migrated = [{
    id: 'favorites-default',
    type: 'favorites',
    name: 'Favorites',
    enabled: localStorage.getItem(FOLDER_WIDGET_KEY) === 'true',
    shortcuts: emptyShortcuts(legacyShortcuts),
    position: Number.isFinite(legacyPosition?.x) ? { x: legacyPosition.x, y: legacyPosition.y } : null,
    size: Number.isFinite(legacyPosition?.width) ? { width: legacyPosition.width, height: legacyPosition.height } : null
  }];
  localStorage.setItem(WIDGETS_KEY, JSON.stringify(migrated));
  return migrated;
}

function saveWidgets() {
  localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
  renderWidgets();
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
  localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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
  const stamp = `${text}|${period}`;
  if (timeEl.dataset.stamp !== stamp) {
    timeEl.dataset.stamp = stamp;
    timeEl.textContent = text;
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
  return { focus: mins(o.focus, 25, 180), short: mins(o.short, 5, 60), long: mins(o.long, 15, 90), longEvery: mins(o.longEvery, 4, 8), sound: o.sound !== false };
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

function timerNextMode(state, longEvery = 4) {
  if (state.mode !== 'focus') return { mode: 'focus', cycle: state.cycle };
  const cycle = state.cycle + 1;
  return { mode: cycle % longEvery === 0 ? 'long' : 'short', cycle };
}

function paintTimer(widget, body) {
  const state = timerState(widget);
  const minutes = String(Math.floor(state.left / 60)).padStart(2, '0');
  const seconds = String(state.left % 60).padStart(2, '0');
  if (body.dataset.editing !== '1') body.querySelector('.timer-time').textContent = `${minutes}:${seconds}`;
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
      const next = timerNextMode(state, timerOptions(widget).longEvery);
      setTimerState(widget, { mode: next.mode, cycle: next.cycle, running: false, left: timerOptions(widget)[next.mode] * 60, endsAt: null });
      if (timerOptions(widget).sound) timerBeep();
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
  body.querySelector('.timer3-time').textContent = `${minutes}:${seconds}`;
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
      const row = t3El('button', 'timer3-row');
      row.type = 'button';
      row.setAttribute('role', 'switch');
      row.setAttribute('aria-checked', String(options.sound));
      const state = t3El('span', 'timer3-switch');
      row.append(t3El('span', '', 'Sound when a session ends'), state);
      row.addEventListener('click', () => {
        timerApplyOptions(widget, { sound: !timerOptions(widget).sound });
        renderSettings();
      });
      list.append(row);
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

function readWeatherCache() {
  try { return JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY) || '{}') || {}; } catch { return {}; }
}

async function fetchWeather(lat, lon) {
  const key = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  const cache = readWeatherCache();
  const hit = cache[key];
  if (hit && Date.now() - hit.time < WEATHER_MAX_AGE) return hit.data;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('Weather request failed');
    const json = await response.json();
    const data = {
      temp: json.current.temperature_2m,
      code: json.current.weather_code,
      isDay: json.current.is_day === 1,
      high: json.daily.temperature_2m_max[0],
      low: json.daily.temperature_2m_min[0]
    };
    if (![data.temp, data.code, data.high, data.low].every(Number.isFinite)) throw new Error('Unexpected weather data');
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ [key]: { time: Date.now(), data } }));
    return data;
  } catch (error) {
    if (hit) return hit.data;
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function paintWeather(widget, body, data, message) {
  const options = weatherOptions(widget);
  const empty = body.querySelector('.weather-empty');
  const main = body.querySelector('.weather-main');
  empty.hidden = Boolean(data);
  main.hidden = !data;
  if (!data) { empty.textContent = message; return; }
  const info = weatherInfo(data.code, data.isDay);
  const convert = value => Math.round(options.units === 'f' ? value * 9 / 5 + 32 : value);
  body.querySelector('.weather-icon').innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${WEATHER_ICONS[info.icon]}</svg>`;
  body.querySelector('.weather-temp').textContent = `${convert(data.temp)}°`;
  body.querySelector('.weather-label').textContent = info.label;
  body.querySelector('.weather-city').textContent = options.city;
  body.querySelector('.weather-range').textContent = `H ${convert(data.high)}° · L ${convert(data.low)}°`;
}

async function updateWeather(widget, body) {
  const options = weatherOptions(widget);
  if (options.lat === null) { paintWeather(widget, body, null, 'Choose a city in the widget editor.'); return; }
  try {
    paintWeather(widget, body, await fetchWeather(options.lat, options.lon));
  } catch {
    paintWeather(widget, body, null, 'Weather unavailable right now.');
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
  body.innerHTML = '<p class="weather-empty" hidden></p><div class="weather-main" hidden><span class="weather-icon"></span><span class="weather-temp"></span><span class="weather-details"><span class="weather-label"></span><span class="weather-city"></span><span class="weather-range"></span></span></div>';
  const options = weatherOptions(widget);
  const cached = options.lat === null ? null : readWeatherCache()[`${options.lat.toFixed(2)},${options.lon.toFixed(2)}`]?.data;
  paintWeather(widget, body, cached || null, options.lat === null ? 'Choose a city in the widget editor.' : 'Loading weather…');
  updateWeather(widget, body);
  return body;
}

async function geocodeCity(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('Search failed');
    const json = await response.json();
    return (json.results || []).map(item => ({
      name: String(item.name || '').slice(0, 60),
      detail: [item.admin1, item.country].filter(Boolean).join(', ').slice(0, 60),
      lat: item.latitude,
      lon: item.longitude
    })).filter(item => item.name && Number.isFinite(item.lat) && Number.isFinite(item.lon));
  } finally {
    clearTimeout(timeout);
  }
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
  visibleShortcuts.forEach((shortcut, index) => {
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

function applyWidgetAppearance(widget, card) {
  const color = /^#[\da-f]{6}$/i.test(widget.appearance?.backgroundColor || '') ? widget.appearance.backgroundColor : '#2a2439';
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
  const maxLeft = Math.max(1, window.innerWidth - rect.width);
  const maxTop = Math.max(1, window.innerHeight - rect.height);
  widget.position = {
    x: Math.min(1, Math.max(0, rect.left / maxLeft)),
    y: Math.min(1, Math.max(0, rect.top / maxTop))
  };
  widget.size = { width: rect.width, height: rect.height };
  localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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
        localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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
        localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
      });
      const colorLabel = document.createElement('label');
      colorLabel.className = 'widget-appearance-label';
      colorLabel.textContent = 'Background color';
      const color = document.createElement('input');
      color.className = 'widget-background-color';
      color.type = 'color';
      color.value = /^#[\da-f]{6}$/i.test(widget.appearance?.backgroundColor || '') ? widget.appearance.backgroundColor : '#2a2439';
      color.setAttribute('aria-label', `${widget.name} background color`);
      color.addEventListener('input', () => {
        widget.appearance = { ...widget.appearance, backgroundColor: color.value };
        const card = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
        if (card) applyWidgetAppearance(widget, card);
        localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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
        localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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
        localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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
        localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
      });
      appearance.append(appearanceTitle, opacityLabel, opacity, blurLabel, blur, colorLabel, color, textLabel, textColor, resetText, outlineRow);
      enhanceColorInput(color);
      enhanceColorInput(textColor);
      if (isFavoritesType(widget.type || 'favorites')) {
        appearance.append(switchRow('Scale together', 'On: resizing scales everything as one. Off: change width and height freely.', scaleTogether(widget), on => {
          widget.options = { ...widget.options, scaleTogether: on };
          delete widget.scale;
          localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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
        help.textContent = 'Could not search right now. Check your connection.';
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
    const number = document.createElement('span');
    number.className = 'bookmark-number';
    number.textContent = `${index + 1}.`;
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.maxLength = 28;
    nameInput.placeholder = 'Name';
    nameInput.value = shortcut?.name || '';
    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.inputMode = 'url';
    urlInput.placeholder = 'youtube.com';
    urlInput.value = shortcut?.url?.replace(/^https?:\/\//i, '') || '';
    const save = document.createElement('button');
    save.className = 'bookmark-save';
    save.type = 'button';
    save.textContent = 'Save';
    save.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (!name) { nameInput.setCustomValidity('Enter a name for this bookmark.'); nameInput.reportValidity(); return; }
      try {
        widget.shortcuts[index] = { name, url: normalizeWebsite(urlInput.value) };
        saveWidgets();
      } catch (error) { urlInput.setCustomValidity(error.message); urlInput.reportValidity(); }
    });
    const remove = document.createElement('button');
    remove.className = 'bookmark-delete';
    remove.type = 'button';
    remove.innerHTML = TRASH_ICON;
    remove.title = 'Delete bookmark';
    remove.setAttribute('aria-label', `Delete bookmark ${index + 1}`);
    remove.addEventListener('click', () => { widget.shortcuts[index] = null; saveWidgets(); });
    row.append(number, nameInput, urlInput, save, remove);
    list.append(row);
  });
}

function renderExpandableBookmarkEditor(widget, list) {
  if (!Array.isArray(widget.shortcuts)) widget.shortcuts = [];
  widget.shortcuts.forEach((shortcut, index) => {
    const row = document.createElement('div');
    row.className = 'bookmark-editor-row bookmark-editor-row-v2';
    const number = document.createElement('span');
    number.className = 'bookmark-number';
    number.textContent = `${index + 1}.`;
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.maxLength = 28;
    nameInput.placeholder = 'Name';
    nameInput.value = shortcut?.name || '';
    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.inputMode = 'url';
    urlInput.placeholder = 'youtube.com';
    urlInput.value = shortcut?.url?.replace(/^https?:\/\//i, '') || '';
    const save = document.createElement('button');
    save.className = 'bookmark-save';
    save.type = 'button';
    save.textContent = 'Save';
    save.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (!name) { nameInput.setCustomValidity('Enter a name for this site.'); nameInput.reportValidity(); return; }
      try {
        widget.shortcuts[index] = { name, url: normalizeWebsite(urlInput.value) };
        saveWidgets();
      } catch (error) { urlInput.setCustomValidity(error.message); urlInput.reportValidity(); }
    });
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
    row.append(number, nameInput, urlInput, save, remove);
    list.append(row);
  });
  const addSite = document.createElement('button');
  addSite.className = 'bookmark-add-site';
  addSite.type = 'button';
  addSite.textContent = '＋ Add site';
  addSite.addEventListener('click', () => {
    widget.shortcuts.push(null);
    localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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
  localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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
    appearance: type === 'timer-v3' ? { backgroundColor: '#050505', opacity: 94 } : { backgroundColor: '#2a2439', opacity: isSimpleType(type) && type !== 'search' && type !== 'notes' ? 35 : 85 }
  });
  openEditorWidgetId = null;
  localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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

window.addEventListener('resize', () => widgets.forEach(widget => {
  const card = widgetLayer.querySelector(`[data-widget-id="${CSS.escape(widget.id)}"]`);
  if (card) applyWidgetPosition(widget, card);
}));

shortcutForm.addEventListener('submit', event => {
  event.preventDefault();
  const widget = widgets.find(item => item.id === editingWidgetId);
  if (!widget || editingSlot === null) return;
  try {
    widget.shortcuts[editingSlot] = { name: shortcutName.value.trim(), url: normalizeWebsite(shortcutUrl.value) };
    localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
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

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readBackground() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(BACKGROUND_KEY);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function saveBackground(file) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).put({ blob: file, type: file.type, name: file.name }, BACKGROUND_KEY);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

async function clearBackground() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).delete(BACKGROUND_KEY);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

function showBackground(item) {
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  backdrop.replaceChildren();
  currentWallpaperVideo = null;
  if (!item?.blob) return;
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
    sound.innerHTML = `<img src="${WALLPAPER_SOUND_OFF_ICON}" alt="">`;
    sound.setAttribute('aria-label', 'Enable wallpaper sound');
    sound.setAttribute('aria-pressed', 'false');
    sound.title = 'Enable wallpaper sound';
    sound.addEventListener('click', async () => {
      if (!currentWallpaperVideo) return;
      const enableSound = currentWallpaperVideo.muted;
      currentWallpaperVideo.muted = !enableSound;
      sound.innerHTML = `<img src="${enableSound ? WALLPAPER_SOUND_ON_ICON : WALLPAPER_SOUND_OFF_ICON}" alt="">`;
      sound.setAttribute('aria-label', enableSound ? 'Mute wallpaper sound' : 'Enable wallpaper sound');
      sound.setAttribute('aria-pressed', String(enableSound));
      sound.title = enableSound ? 'Mute wallpaper sound' : 'Enable wallpaper sound';
      if (enableSound) {
        try {
          await currentWallpaperVideo.play();
        } catch {
          currentWallpaperVideo.muted = true;
          sound.innerHTML = `<img src="${WALLPAPER_SOUND_OFF_ICON}" alt="">`;
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
      localStorage.setItem(VOLUME_KEY, String(level));
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
      if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
      backdrop.replaceChildren();
      backdrop.style.backgroundImage = '';
      wallpaperList.replaceChildren();
    } catch (error) {
      console.error('Could not remove wallpaper:', error);
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
  () => { panelFrameCustom = true; localStorage.setItem(PANEL_FRAME_KEY, JSON.stringify(panelFrame)); });
const moveEditor = (event, edge) => startFrameDrag(event, edge, { ...editorShown },
  frame => { editorFrame = frame; applyFrames(); },
  () => localStorage.setItem(EDITOR_FRAME_KEY, JSON.stringify(editorFrame)));

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

fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
    fileInput.value = '';
    return;
  }
  try {
    await saveBackground(file);
    showBackground({ blob: file, type: file.type, name: file.name });
  } catch (error) {
    console.error('Could not save background:', error);
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
  localStorage.setItem(SITE_ICONS_KEY, siteIconsToggle.checked ? 'on' : 'off');
  renderWidgets();
});
const autoHideToggle = document.getElementById('autoHideControlsToggle');
autoHideToggle.checked = localStorage.getItem(AUTOHIDE_KEY) === 'on';
document.body.classList.toggle('autohide-controls', autoHideToggle.checked);
autoHideToggle.addEventListener('change', () => {
  localStorage.setItem(AUTOHIDE_KEY, autoHideToggle.checked ? 'on' : 'off');
  document.body.classList.toggle('autohide-controls', autoHideToggle.checked);
});

enhanceGlideSelect(document.getElementById('themeSelect'), { ariaLabel: 'Color theme', menuWidth: 260 });
enhanceGlideSelect(document.getElementById('fontSelect'), { ariaLabel: 'Interface font', menuWidth: 220 });
enhanceGlideSelect(document.getElementById('widgetTypeSelect'), { ariaLabel: 'Widget type', menuWidth: 190 });
initFontSettings()
  .then(() => document.getElementById('fontSelect').glideSelectRefresh?.())
  .catch(error => console.error('Could not initialize font settings:', error));
migrateOldLavender();
initInterfaceColor();
initUiBackgroundColor();
initButtonBackgroundColor();
document.querySelectorAll('input[type="color"]').forEach(enhanceColorInput);
initThemePresets();

setInterval(tickClocks, 1000);
setInterval(tickTimers, 1000);
setInterval(() => { if (!document.hidden) refreshWeathers(); }, WEATHER_MAX_AGE);
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
  const magic = await file.slice(0, BACKUP_MAGIC.length).text();
  if (magic !== BACKUP_MAGIC) {
    if (file.size > 5 * 1024 * 1024) throw new Error('That file is too large to be a Tabby backup.');
    return { data: JSON.parse(await file.text()), media: {} };
  }
  const lengthBytes = await file.slice(BACKUP_MAGIC.length, BACKUP_MAGIC.length + 4).arrayBuffer();
  const manifestLength = new DataView(lengthBytes).getUint32(0);
  const manifestStart = BACKUP_MAGIC.length + 4;
  if (manifestLength > 5 * 1024 * 1024 || manifestStart + manifestLength > file.size) throw new Error('This backup file is damaged.');
  const data = JSON.parse(await file.slice(manifestStart, manifestStart + manifestLength).text());
  const media = {};
  let offset = manifestStart + manifestLength;
  const list = Array.isArray(data.files) ? data.files.slice(0, 2) : [];
  for (const entry of list) {
    const size = Number(entry?.size);
    if (!Number.isFinite(size) || size < 0 || offset + size > file.size) throw new Error('This backup file is damaged.');
    if ((entry.role === 'font' || entry.role === 'wallpaper') && !media[entry.role]) {
      media[entry.role] = { entry, blob: file.slice(offset, offset + size, String(entry.type || '')) };
    }
    offset += size;
  }
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
  if (typeof data.version !== 'number' || data.version > 2) throw new Error('This backup was made by a newer version of Tabby.');
  // Check everything first, then write, so a bad file never leaves a half-restored setup.
  const restored = data.widgets === undefined ? null : sanitizeWidgets(data.widgets);
  const settings = data.settings && typeof data.settings === 'object' ? data.settings : null;
  let font = null;
  if (media.font) {
    const name = String(media.font.entry.name || '');
    if (!/\.(woff2?|ttf|otf)$/i.test(name)) throw new Error('The font in this backup is not a supported font file.');
    font = new File([media.font.blob], name.slice(0, 120), { type: media.font.entry.type || '' });
  }
  let wallpaper = null;
  if (media.wallpaper) {
    const type = String(media.wallpaper.entry.type || '');
    if (!type.startsWith('image/') && !type.startsWith('video/')) throw new Error('The wallpaper in this backup is not a photo or video.');
    wallpaper = new File([media.wallpaper.blob], String(media.wallpaper.entry.name || 'wallpaper').slice(0, 120), { type });
  }
  if (font) await storeFont(font);
  if (wallpaper) await saveBackground(wallpaper);
  if (settings) {
    const setColor = (key, value) => { if (HEX_COLOR.test(value || '')) localStorage.setItem(key, value); };
    setColor(INTERFACE_COLOR_KEY, settings.interfaceColor);
    setColor(UI_BACKGROUND_KEY, settings.uiBackgroundColor);
    setColor(BUTTON_BACKGROUND_KEY, settings.buttonBackgroundColor);
    if (settings.themes && typeof settings.themes === 'object') localStorage.setItem(THEMES_KEY, JSON.stringify(sanitizeThemeStore(settings.themes)));
    const fontKey = normalizeFontKey(settings.fontMode);
    if (fontKey === 'custom') { if (font) localStorage.setItem(FONT_MODE_KEY, 'custom'); }
    else if (fontChoices[fontKey]) localStorage.setItem(FONT_MODE_KEY, fontKey);
    if (settings.siteIcons === 'on' || settings.siteIcons === 'off') localStorage.setItem(SITE_ICONS_KEY, settings.siteIcons);
    if (settings.hideControls === 'on' || settings.hideControls === 'off') localStorage.setItem(AUTOHIDE_KEY, settings.hideControls);
    const volume = cleanNumber(settings.wallpaperVolume, 0, 100);
    if (volume !== null) localStorage.setItem(VOLUME_KEY, String(volume));
  }
  if (restored) localStorage.setItem(WIDGETS_KEY, JSON.stringify(restored));
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
    const { json, blob: container } = buildBackup(parts, media);
    const blob = container || new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tabby-backup-${new Date().toISOString().slice(0, 10)}.${container ? 'tabby' : 'json'}`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    status.textContent = `Backup saved to your downloads (${formatBytes(blob.size)}).`;
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
      setTimeout(() => location.reload(), 400);
    } catch (error) {
      status.textContent = error instanceof SyntaxError ? 'That file is not a valid Tabby backup.' : (error.message || 'Could not restore that file.');
    }
  });
}
initBackup();


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
  try { localStorage.setItem(WELCOME_KEY, '1'); } catch (error) { /* storage unavailable */ }
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
