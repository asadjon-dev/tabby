# Changes log

Newest first. Each entry says what changed, in which files, and why.

## 2026-11-11 - Remove the redundant Water background label

**Asked for:** remove the "Water background" label sitting above the Flux Lines dropdown.

**newtab.html** - dropped the `<label for="waterStyle">` from `#waterOptions`; the section already has `aria-label="Water background"`, and the glide select supplies its own `aria-label`, so the control stays labelled for assistive tech.

**Checked** - inspected the markup; the label is gone and the select remains the first item in the options group.

## 2026-11-11 - Two-line water help tooltip

**Asked for:** break the hover help after "over your background." instead of letting it wrap mid-sentence.

**newtab.html** - the `.water-info` `title` now contains a newline (`&#10;`) between the two sentences, so the tooltip shows:
"Slow flowing lines of light over your background."
"They stop on battery saver, or when this tab is hidden."
The `aria-label` stays a single sentence for screen readers.

**Checked** - inspected the attribute; the two sentences are separated by a newline character.

## 2026-11-11 - Remove the "No background yet" card

**Asked for:** remove the empty-state card in the Background tab.

**newtab.html** - dropped the `#wallpaperEmpty` section ("No background yet" and its description).
**newtab.js** - removed the now-unused `wallpaperEmpty` lookup plus the `hasWallpaper` / `wallpaperEmpty.hidden` lines from `syncEmptyStates()`.

**Checked** - `node --check newtab.js`; no `wallpaperEmpty` references remain and the section tags still balance.

## 2026-11-11 - Water help as a hover info icon, round Interactive switch

**Asked for:** put an icon at the end of the "Moving water background" line that shows the water help text on hover, and make the Interactive checkbox round too.

**newtab.html** - the long water help paragraph is replaced by a `.water-info` info icon next to the master label; its `title` and `aria-label` carry "Slow flowing lines of light over your background. They stop on battery saver, or when this tab is hidden." The Interactive label gains `water-radio`.
**newtab.css** - added `.water-master-row` and `.water-info` (dimmed at rest, accent on hover/focus), and generalized the round radio styling from `.water-master input` to `.water-radio input` so both toggles are 50%-radius circles with an accent dot.

**Checked** - `node --check newtab.js`; in the browser the info icon exposes the help text via `title` and `aria-label`, both toggles compute to `border-radius: 50%` with `appearance: none`, and the on/off disabled state still works. No console errors.

## 2026-11-11 - Water master toggle on top, round switch, disabled options

**Asked for:** move "Moving water background" above the water style chooser, make it a round radio-style switch, and disable everything inside when it is off.

**newtab.html** - the master toggle now sits above the Water background style select and its help text, with the style, Interactive and Wave speed controls wrapped in `#waterOptions`.
**newtab.js** - `syncWaterOptions()` disables the native select, its glide-select trigger, Interactive and Wave speed, and toggles `.is-off` on the section. It runs on load, on toggle, when `turnOffWater()` fires, and again after `enhanceGlideSelect()` creates the trigger.
**newtab.css** - `.water-master input` renders as a 50%-radius radio with an accent dot when checked; `.water-settings.is-off .water-options` dims to 40% and blocks pointer events.

**Checked** - `node --check newtab.js`; in the browser, toggling off set `is-off`, disabled all four controls (native select, glide trigger, Interactive, speed) with opacity 0.4, and toggling on restored them. No console errors.

## 2026-11-11 - Cleaner settings close button

**Asked for:** replace the settings drawer's X with the supplied icon or drop its background.

**newtab.html** - the close button now uses the filled X path from the supplied SVG instead of the two stroked lines.
**newtab.css** - `.panel-close` loses its filled background and border (both transparent now); the accent border still appears on hover and the focus ring is unchanged.

**Checked** - inspected the markup and CSS; no JavaScript involved.

## 2026-11-11 - Liquid Chrome, Pixel Blast and Plasma frame rates

**Asked for:** measure the new backgrounds on a real new tab page and lower the internal resolution or raymarch steps if any lag.

Measured at a 1920x1080 viewport (AMD Radeon 610M, D3D11) by sampling `requestAnimationFrame` intervals for 1.6s per style:
- **Liquid Chrome** - 60 fps at a 2066x1162 backing (2.4e6 budget); left unchanged.
- **Pixel Blast** - 51 fps at 2066x1162; halved the pixel budget to 1.2e6 (backing 1461x822), now 60 fps.
- **Plasma** - 31 fps at 1265x712 with a 60-step raymarch; reduced the budget to 0.45e6 (backing 894x503) and the raymarch to 32 steps, now 60 fps.

**newtab.js** - `drawPixelBlast` budget 2.4e6 -> 1.2e6; `drawPlasma` budget 0.9e6 -> 0.45e6 and its loop 60 -> 32 iterations.

**Checked** - `node --check newtab.js`; re-ran the rAF sampling after each change and read pixels back to confirm every style still renders.

## 2026-11-11 - Liquid Chrome, Pixel Blast and Plasma backgrounds

**Asked for:** add more animated water backgrounds.

**newtab.html** - three new options in the Water background select: Liquid Chrome, Pixel Blast, Plasma.
**newtab.js** - ported the three React Bits-style components to the existing vanilla WebGL2 water engines:
- **Liquid Chrome** - one fullscreen pass of the chrome wave/studio-reflection shader, tinted from the theme accent and nudged by pointer parallax.
- **Pixel Blast** - a dithered pixel field generated in one pass (the component's cell-feedback pass is dropped), using the accent colours with edge fade and twinkle.
- **Plasma** - the volume raymarch and composite merged into a single pass so no half-float render target is needed, with pointer heat and orbit sway.

All three share the `#waterLayer` context, follow the Wave speed slider, and are disposed by `applyWaterStyle()` when another style is chosen.

**Checked** - `node --check newtab.js`; loaded over localhost in the browser, each engine compiled with no shader errors and rendered non-zero pixels (Liquid Chrome full alpha, Pixel Blast sparse pixels, Plasma visible bands). No console errors beyond the expected missing-favicon 404.

## 2026-11-11 - Set photo or video button and water settings in Background

**Asked for:** swap the "+" in the upload button for the image icon, rename the button to "Set photo or video", and move the water background controls into the Background tab.

**newtab.html** - the upload button now carries the image-plus SVG (`.upload-icon`) and the label "Set photo or video"; the water controls (style, moving toggle, interactive toggle, wave speed) moved out of the Settings tab into a `.water-settings` section under the wallpaper list in the Background tab.
**newtab.js** - `syncEmptyStates()` always labels the button "Set photo or video" instead of switching between Add/Replace.
**newtab.css** - replaced the old `+` span rule with `.upload-icon` sizing/colour, and added `.water-settings` spacing plus label styling so the moved block keeps its look.

**Checked** - `node --check newtab.js`; confirmed the water controls appear once, inside the Background tab, and the Settings tab no longer contains them.

## 2026-11-11 - Simpler widget names

**Asked for:** rename some widgets to simpler names (e.g. "Favorites folder" to something simpler).

**newtab.js** - `WIDGET_TYPES` labels/defaultNames: "Favorites folder" -> "Favorites", "Favorites folder V2" -> "Favorites list", "Search bar" -> "Search", "Pomodoro timer" -> "Timer", "Pomodoro timer V2" -> "Timer (dark)".
**newtab.html** - matching option labels in the "Add widget" picker.
**README.md** - widget list updated to the new names.

**Checked** - `node --check newtab.js`; picker labels and help text reviewed for consistency. Existing widgets keep their saved names.

## 2026-11-11 - Notes tabs are keyboard accessible

**Asked for:** the Notes widget's tab strip should work from the keyboard and use proper tab roles.

**newtab.js**
- The strip is a real tablist now: it has an `aria-label`, every tab has an `id`, `aria-controls` pointing at the note panel and a roving `tabIndex` (selected tab 0, the others -1). The textarea sits in a `role="tabpanel"` container whose `aria-labelledby` follows the selected tab.
- Arrow Left/Right move the selection (wrapping at the ends), Home and End jump to the first and last note; selecting a tab activates it and moves focus to that tab. A mouse click still switches the note and puts the caret in the textarea.
- Switching notes goes through one `activate()` helper, so the click and keyboard paths flush the pending save and reset the delete confirmation the same way.

**newtab.css** - `.notes-panel` keeps the textarea filling the card now that it sits in the tabpanel; `.notes-tab:focus-visible` draws the accent focus ring.

**Checked** - `node --check newtab.js`; served over localhost, a Notes widget with two notes reported `role="tablist"`, two tabs with matching `aria-controls`, `aria-selected`/`tabIndex` moving `[true,false]`/`[0,-1]` to `[false,true]`/`[-1,0]` on ArrowRight, wrapping from the last tab to the first on the next ArrowRight, Home returning to the first note, the panel's `aria-labelledby` following the selected tab, and a click selecting the second note and focusing the textarea (`value` "Second note"). No console errors beyond the expected missing favicon.

## 2026-11-11 - Bug sweep: timer options, font sync and restore

**newtab.js only**

- **Toggling Sound or Notifications reset a paused Pomodoro.** `timerApplyOptions()` (Timer V2) and the Timer V1 editor both rewrote `state.left` to the full duration on every option change. They now compare the current mode's duration before and after and only reset the countdown when it actually changed.
- **Cross-tab font changes bound duplicate listeners.** The `storage` handler called `initFontSettings()`, which attached another `change` handler to the select and the file input each time. The state refresh moved to `syncFontSettings()`; `initFontSettings()` binds the listeners once (`dataset.fontReady`) and re-syncs after that.
- **`migrateOldLavender()` ran on every load**, so re-picking the old Lavender palette was moved back to Stone on each new tab. It now runs once, guarded by `tabby-migrate-lavender-v1`, like the Stone migration.
- **Restored widgets came back purple.** `sanitizeWidgets()` used the removed `#2a2439` fallback and also overrode Timer V2's dark card. The fallback is the live theme surface, with `#050505` kept for `timer-v3`.
- **A backup restore could report a full disk even when it was replacing a similar-size wallpaper or font.** The preflight now subtracts the size of the files being replaced.
- **A Favorites widget missing its `shortcuts` array crashed the editor** when a slot was written. The editor and the shortcut dialog now create the array first.
- **Dropping a non-photo/video left the drop window open** and the drag-depth counter stuck. The drop handler closes the window before validating the file.
- **Smaller fixes:** `refreshWidgetCard()` re-runs the overlap pass after replacing a card; the storage handler uses a declared `widgetsTabButton` instead of the id-based global; a non-numeric saved opacity falls back to 85 instead of producing an invalid `color-mix()`.

**Checked** - `node --check newtab.js`; served over localhost, the page loaded through its whole init with no console errors (only the expected missing-favicon 404 and the GitHub "no release" 404); in the running page, `timerApplyOptions(widget, { sound: false })` kept a paused 600s countdown at 600 while `{ focus: 30 }` reset it to 1800, `sanitizeWidgets()` gave `#34322e` (the Stone surface) for a clock and `#050505` for `timer-v3`, and the font setup ran through the new `syncFontSettings()` path. The drop-window close, the shortcut-array guard, the one-time migration flag and the backup space preflight were verified by reading the changed paths, not by driving the extension.

## 2026-11-11 - A wallpaper turns the water background off

**Asked for:** uploading a wallpaper should switch the moving water background off.

**newtab.js**
- `turnOffWater()` stops the water: `water.on = false`, unchecks `#waterToggle`, saves `tabby-water-background` as `'0'` and calls `pumpWater()`, which hides the canvas and drops the animation frame.
- The wallpaper upload handler calls it right after `saveBackground()` / `showBackground()`, so "Choose a file" and dropping a file on the page both do it.

**Checked** - in the browser, before the upload `water.on` was true with the switch on; after it `on` was false, the switch off, storage `'0'`, the canvas hidden, no animation frame left, the wallpaper applied and the success toast shown.

## 2026-11-11 - Settings tabs line up across the strip

**Asked for:** Background on the left, Widgets in the centre, Settings at the right end where the rule stops.

**newtab.css** - `.panel-tabs` is a grid now: `grid-template-columns: 1fr auto 1fr`, the first tab `justify-self: start` and the last `justify-self: end`, so the middle tab sits in the exact centre of the strip.

**Checked** - measured in the browser: strip 949-1239 px (centre 1094), Widgets centred at 1094, Background flush at 949, Settings flush at 1239.

## 2026-11-11 - SVG icons moved into icons/

**Asked for:** keep every icon inside the `icons` folder instead of loose in the project root.

**Files** - `tabby-icon.svg`, `move-diagonal.svg`, `wallpaper-sound-on.svg` and `wallpaper-sound-off.svg` now sit in `icons/`, next to the existing `icon16/32/48/128.png`.
- `newtab.html`: the brand mark and the move-mode button point at `icons/...`.
- `newtab.js`: `WALLPAPER_SOUND_ON_ICON` and `WALLPAPER_SOUND_OFF_ICON` use `icons/...`.

**Checked** - `node --check newtab.js`; all four icons answer 200 and the two page images decode at 150x150 and 24x24.

## 2026-11-11 - Widgets stay where you drop them

**Problem:** a widget jumped back to its old spot after dragging. Two causes, both in `newtab.js`:

- `startWidgetDrag()` measured the card while the stylesheet's `translate(-50%, -50%)` was still applied, so the pointer offset was half a card out and the drop landed where the pointer never was. It now clears that transform first, freezing the card at its measured rect.
- `saveWidgetGeometry()` read the position from `getBoundingClientRect()`, which can still report the pre-drag box, so the old position was written back and the next render — including the one when you leave move mode — put the widget back where it started. It now reads the inline `left`/`top` (and `width`/`height` after a resize) and only falls back to the rect.

**Checked** — `node --check newtab.js`; in the browser a 60 px drag saved `y` 0.616 and re-applying the stored position left the card exactly at the dropped spot, and a drag past the right edge clamped to the edge instead of overhanging it.

## 2026-11-11 - Notifications

**Asked for:** four kinds of notification — a success note after uploading a wallpaper, font or backup (3 s), an error note (3 s), a news note when a newer version is on GitHub (10 s), and a support note for guns.lol/asadjon (15 s) shown the first time the browser is opened, not on every new tab.

**`manifest.json`** — `storage` permission for `chrome.storage.session`; `https://api.github.com` and `https://raw.githubusercontent.com` added to `connect-src` so the update check is not blocked by the extension CSP.

**`newtab.html`** — `#toastStack` live region (`aria-live="polite"`), placed with the rest of the page markup.

**`newtab.css`** — toast cards: theme surface, 3 px coloured edge, icon tile, title and message, close button, optional action button; they slide in and out, with no transition under reduced motion.

**`newtab.js`**
- `notify({ type, title, message, duration, action })` renders a toast, keeps at most three, auto-dismisses and takes one action button; links open through `chrome.tabs.create` with a `window.open` fallback.
- Success notes: wallpaper set, font applied, backup saved, backup restored.
- Error notes: `showNotice()` now raises an error toast instead of the old bottom bar, and the font upload, backup export and backup restore failures each raise one too.
- `checkForUpdate()` reads the latest release of `asadjon-dev/tabby`; the repo has no releases or tags yet, so it falls back to the `version` in the repo's own `manifest.json`. The answer is cached for six hours and the update is offered for ten seconds.
- `offerSupport()` shows the support note for fifteen seconds once per browser session through `chrome.storage.session`, with an eight hour localStorage fallback.

**Checked** — `node --check newtab.js`; in the browser all four types render with the right icon and edge colour at 3 s / 3 s / 10 s / 15 s, the close and action buttons are present, success and error toasts disappear on their own after three seconds, the support note appears once and not again on a second call, the update check falls back to the repo manifest when there is no release ("Version 1.6.0 is available. You are on 1.5.3."), reuses its six hour cache, and stays silent when the versions match.

## 2026-11-11 - Slider style and the drop window

**Task:** Wave speed should use the Board UI slider look (filled track, dot thumb, value bubble), and the drop window should close once a file is picked in the explorer.

**newtab.js**
- `enhanceRangeInput()` wraps every `input[type="range"]` in a `.range-field`, writes `--range-fill` for the filled part of the track and puts a `.range-bubble` over the thumb with the value at the step's precision; it repaints on `input` and `change`.
- Drop window: `dragenter` (files only, with a depth counter) opens `#dropWindow`; `dragleave`, `dragend` and Escape close it, and the file input's `change` handler now calls `closeDropWindow()` before it reads the file, so choosing one in the explorer dismisses the window. Its button opens the same explorer.

**newtab.html** - the `#dropWindow` overlay with its card and "Choose a file" button, just before the wallpaper input.

**newtab.css** - slider: 6px accent-filled track, 20px white thumb holding an accent dot, hover and drag scale, accent focus ring, and a bubble with a 45 degree tail that fades in on hover, focus or drag; the Wave speed row reserves 36px above itself so the bubble sits in that band instead of on the paragraph above. Drop window: dashed accent frame over the panel colour with a centred card.

**Checked in a browser** (localhost): the input is wrapped, the track reads 13.8% filled at 0.25 and 48.3% at 0.75, with the bubble, the inline readout and `water.speed` all following. A synthetic `dragenter` with a file opens the window (`display: grid`), `dragleave` closes it, and dispatching `change` after setting a picked file closes it again. Hover and `:focus-within` cannot be triggered in a hidden preview tab, so the bubble's fade-in was checked by forcing its opacity for the screenshot.

## 2026-11-11 - Settings tabs use the underline style

**Task:** The settings panel's three tabs should read as underline tabs (Board UI's tabs), not as a segmented track.

**newtab.css** - `.panel-tabs` is now a plain flex strip sitting on a 1px `--tabby-line` baseline with no track background. `.panel-tab` is a 13px regular label, 8px 10px padding, square corners, with a 2px transparent bottom border that turns accent on the selected tab; the selected label goes accent and semibold, hover tints it accent, and keyboard focus draws a 2px accent ring. Reduced motion drops the colour transition.

**newtab.js** - the sliding thumb is gone from the tabs: `enhanceSegmented()` now only runs on `.segmented` groups, where the thumb belongs. New `enhanceTabs()` keeps the strip a single tab stop and activates a tab as soon as an arrow, Home or End lands on it, the way React Aria's tab list does, re-syncing the roving tabindex when the selection changes.

**Checked in a browser** (localhost): strip is flex with a transparent background over a 1px baseline; the selected tab carries the accent text, weight 600 and a 2px accent underline; no `.segmented-thumb` is added to `.panel-tabs`; ArrowRight from the selected tab moves focus to the next tab, activates it and shows its panel; tabindex is one `0` and two `-1`, and follows the selection.

## 2026-11-11 - Segmented control with a sliding thumb

**Task:** The three settings tabs and the widget editor's option groups should be one segmented control: a track with a thumb that slides to the selected segment, not separate buttons with their own fills.

**newtab.js**
- `enhanceSegmented()` and `paintSegmented()` add a `.segmented-thumb` to `.panel-tabs` and to every `.segmented` group, measure the active item (`aria-selected`, `aria-pressed` or `.active`) and move the thumb with a translate.
- Repaints on click, on attribute changes, on resize, on scroll, on `transitionend` and two frames after enhancing - the panel is built while hidden, so without that the thumb kept the stale offsets it measured at zero size.
- Keyboard: arrows and Home/End move focus inside the group (Space or Enter still picks the segment) and the group is a single tab stop through a roving `tabindex`.
- Runs once for the tabs, and a MutationObserver picks up groups the widget editor builds later.

**newtab.css**
- Tabs and widget groups now share one track: 4px padding, 2px gap, 12px radius, button-coloured surface, 34px segments with a 7px radius.
- The selected segment is a sliding accent thumb with a soft shadow and semibold accent-ink text; the old per-button accent fill and hover tint are gone. Reduced motion turns the slide off.

**Checked in a browser** (localhost): the thumb is absolute, 7px radius, filled with the root accent, and lands exactly on the active tab (120,117 92x34) the first time the panel opens; picking Widgets moves it to 214,117 where it stays aligned within 1.5px. ArrowRight moves focus to the next tab and the group has one tab stop ([-1, 0, -1]). This browser reports reduced motion, so the 200ms slide was not seen animating.

## 2026-11-11 - Third-party notices

**Task:** Credit every project the extension borrows from.

**THIRD_PARTY_NOTICES.md** - now lists three sources instead of one: REICON (reicon.dev, icons, MIT licence text kept verbatim), Board UI (boardui.com, the colour picker and segmented control designs, reimplemented in plain HTML/CSS/JS with no package code bundled) and React Bits (reactbits.dev, the four water backgrounds, ported to plain WebGL2 so no React or three.js ships). The README licence line now names all three next to the link to this file.

## 2026-11-11 - Color picker rebuilt

**Task:** Every colour control should open a picker that feels like a real one: choose by eye, by hex, or from presets, instead of the cramped native-style popover.

**newtab.js**
- `enhanceColorInput()` now builds a 248px popover: a rounded 3:2 saturation/brightness field, a horizontal hue rail, a hex row and eight presets, in theme colours.
- Thumbs are white-ringed pills filled with the colour under them; the field re-tints as the hue moves, and the presets mark the one in use.
- The hex field takes any CSS colour through the new `cssColorToHex()` (`#abc`, `rgb(...)`, `rebeccapurple`); half-typed values no longer commit, and Enter or blur normalises the text to `#RRGGBB` while keeping focus.
- Keyboard: arrows nudge the field (Shift is a bigger step, 10x), the hue rail takes arrows and Shift (20 degrees). Both expose `aria-valuenow`.
- The popover measures itself after building instead of assuming 230px, so it flips above the button near the bottom of the window and stays inside it.

**newtab.css** - the picker block rewritten: 18px popover radius on the theme background, inset hairline rings, 12px hue pill, 16px field thumb (14px), 34px monospace hex field on a tertiary surface, 8-column preset grid with hover scale and a white selected ring.

**Checked in a browser** (localhost, real page): popover measures 248x272 at 18px radius, field is 3:2 with a 14px thumb and a 12px hue pill, opens 8px under its button at (133,385) and stays in the viewport; 8 presets with the active one ringed; clicking a preset writes `#ef4444` to the hidden input and the trigger; typing `#22c55e` commits live, `notacolor` is ignored, `rebeccapurple` becomes `#663399`; arrow and Shift+arrow on the field change the value. Not exercised by hand: dragging with a real pointer, since the preview tab stays hidden.

## 2026-11-11 - Four water backgrounds to pick from

**Task:** Settings should offer a choice of water backgrounds instead of one fixed animation: Flux Lines, Liquid Ether, Color Bends and Soft Aura.

**newtab.html** - a `waterStyle` dropdown (glide select) with those four names, just above the Moving water background switch.

**newtab.js**
- `drawWater()` is now a dispatcher; the old sine-and-band drawing became `drawFlux()` and is otherwise untouched.
- Liquid Ether: the fluid sim from the component (splat, divergence, 20 pressure steps, gradient subtract, advect) on a grid capped at 80k cells and a 2M pixel budget. The cursor paints strokes, clicks push a puff, and an auto-demo keeps it moving when nothing is happening. Its speed scale is normalised to the component's 600px box so the fluid is as bright on a big screen as in the original demo.
- Color Bends: the shader from the component as a single fullscreen pass, bands rotated 90 degrees, intensity eased from 1.5 to 1 so one theme colour does not blow the bands out to white.
- Soft Aura: the three-octave perlin bands from the component, with its two second intro, cursor bend, four click pulses, and the light-theme branch picked from the theme background colour.
- All four share the one `#waterLayer` WebGL2 context, take their colours from `waterColors()` so they follow the theme, and obey the Wave speed slider (Liquid Ether and Soft Aura scale it to their own pace). Each one binds the default framebuffer at the end of its draw, and `applyWaterStyle()` disposes the other engines.
- The choice is remembered in `tabby-water-style`; Flux Lines stays the default for anyone who never picks.

- Flux Lines now carries the component's light-mode output as well: on a light theme it lays down ink instead of glow (`uLight` / `uOpaque`), chosen from the theme background by the new `waterLightTheme()`, which Soft Aura also uses.

**Checked in a browser** (served over localhost): switching through the dropdown compiles and draws all four with no console or GL errors - lit pixels out of 483k: Flux Lines 31k, Liquid Ether 376k, Color Bends 302k, Soft Aura 50k at full alpha - the glide select shows "Soft Aura", the choice survives a reload, a queued click adds one pulse that fades after 2.6s, and switching back and forth re-initialises each engine cleanly.

- The privacy lock's padlock is now the eye-with-slash icon, filled with `currentColor` so it follows the theme like the gear next to it.

## 2026-11-10 - Motion pass: rolling digits, celebration, skeleton, water, haptics, privacy lock

**Task:** Bring the motion and detail list into the extension: rolling numbers, one big celebration, a skeleton instead of a spinner, moving water, haptics, press feedback, a privacy lock, no white flash.

**newtab.js**
- `paintRollingText()` gives every digit its own slot and slides a changed digit out while the new one slides in (0.2s). Used by the clock, both timers and the weather temperature. Unchanged characters, like the colon, stay put.
- `celebrate()` fires when a focus session ends: a 1.6s confetti burst in the theme colours, a small scale pop on the card, and a success buzz.
- `haptic()` wraps `navigator.vibrate` (soft tap on a widget reorder, success on a finished session), and does nothing on desktops or with Reduce Motion on.
- The weather widget shows pulsing skeleton blocks while it loads instead of a line of text.
- Moving water: a canvas of layered sines drawn at about 30 frames a second, using the accent colours. It stops when the tab is hidden, with Reduce Motion on, on battery saver (via the Battery Status API, at 20% and unplugged) or when switched off.
- Privacy lock button: one tap blurs every widget body and stops clicks reaching them; another tap brings them back.

**newtab.html** - water canvas, the Moving water background switch in Settings, the lock button next to the gear, and an inline page background so a new tab never flashes white.

**newtab.css** - rolling digit, celebration, skeleton, water layer, water switch, press feedback (`scale: 0.97` on active, so existing transforms are untouched) and privacy-lock styles, all with a `prefers-reduced-motion` opt-out.

**Checked in a browser** (served over localhost): page loads with no console errors, Stone path is the selected theme, the workspace and Settings panel keep working at 200% text with no sideways overflow, rolling slots fill for the clock and timer and animate when Reduce Motion is off, a finished session creates then removes the confetti and advances the mode, the privacy lock blurs all three widget types, and the water layer stays paused while the tab is hidden and draws when allowed. The live water animation and the vibration itself could not be exercised in a hidden/desktop tab.

- The arrow in the color theme picker, and in every other dropdown, is now the chevron icon instead of a text `⌄`; it turns over when the list is open. One change in the shared `glide-select` component covers them all.

- The picked-theme tick in the dropdown is now the check SVG (16px, accent colour) instead of a text `✓`. The `×` next to it is still the delete control.

## 2026-11-10 - Empty first launch, widget colours follow the theme

**Task:** Nothing should be waiting on the canvas on a fresh install, and a widget you add should start in the colour of the theme you are using rather than a fixed purple.

**newtab.js**
- `loadWidgets()` no longer seeds `favorites-default` on first run: a new install starts with an empty canvas. Shortcuts saved by an older version are still carried over into a Favorites widget, since that is real data.
- New `themeSurfaceColor()` reads `--tabby-button-bg` from the live theme and returns it as a hex string. Used when a widget is created, and as the fallback for widgets that have no saved colour (`#2a2439` purple is gone). Timer V2 keeps its own near-black background.

**Checked in a browser:** with storage empty, `loadWidgets()` returns `[]`, the layer has no cards, and nothing is written except an empty array. Adding a Clock saves `backgroundColor: "#34322e"` in Stone path and renders it as `color-mix(in srgb, #34322e 35%, transparent)`.

## 2026-11-10 - New widget defaults, backup file name, no overlapping widgets

**Task:** A new widget should start at 30% opacity with 30% blur, backups should be named `Backup_day_month_year.tabby`, and two widgets must not sit on top of each other when the window is narrow.

**newtab.js**
- New widgets are created with `{ opacity: 30, blur: 30 }` on top of the theme background colour. Timer V2 keeps its `#050505` surface.
- Backups download as `Backup_10_11_2026.tabby` (day, month, year, zero padded) instead of `tabby-backup-2026-11-10.json`. Restoring is unchanged: the reader checks the file's contents, not its name, so older backups still open.
- `resolveWidgetOverlaps()` runs after every render and window resize. Widgets are placed by a fraction of the free space, so a packed window could put two on top of each other; the pass walks them in order and slides any that collide into the nearest free space (left, below, above or right of the one it hit, then the bottom/right edge), keeping a 12px gap and staying inside the window. It only changes the on-screen position: the saved fraction is untouched, so widening the window again restores the user's arrangement. It also runs on a `requestAnimationFrame` so it measures after the position pass.

**Checked in a browser:** a new Favorites widget saves `backgroundColor: "#34322e"`, `opacity: 30`, `blur: 30` and renders `color-mix(in srgb, #34322e 30%, transparent)` with `blur(9.6px)`. The export path produces the file name `Backup_10_11_2026.tabby`. With two widgets at 640x520 they overlapped at first (177-395 x 71-267 and 207-425 x 100-297) and the pass moved the second to 177-395 x 279-475: no overlap, still inside the window; at 1600x900 the same nudge happens only when the stored fractions actually collide.

## 2026-11-10 - Corner buttons follow the theme

**Task:** The round corner buttons (move, privacy lock, settings) should take their background from the colour theme, the way widget cards do, instead of a fixed dark grey.

**newtab.css**
- `.move-mode-button` / `.settings-button` dropped `background: #191b20` for `color-mix(in srgb, var(--tabby-button-bg) 30%, transparent)` plus `backdrop-filter: blur(9.6px) saturate(1.2)` — the same recipe a new widget gets, so they read as part of the same surface.
- The later `#191b20` override and the two pressed states (`move-mode-button[aria-pressed]`, `privacy-button[aria-pressed]`) now mix the accent into the theme surface instead of a hardcoded grey.

**Checked in a browser:** with Stone path the settings button computes `color(srgb 0.204 0.196 0.18 / 0.3)` (that is `#34322e` at 30%) with `blur(9.6px) saturate(1.2)`; the lock button matches. Pointing `--tabby-button-bg` at `#2a2439` changes the rendered background immediately, so the swap really is theme-driven.

## 2026-11-10 - Water background replaced with the FluxLines shader

**Task:** Use the FluxLines (React Bits) effect as the moving water background.

**newtab.js**
- The plain 2D sine bands are gone. `drawWater()` now runs the FluxLines fragment shader on the same `#waterLayer` canvas through WebGL2, with the props from the request: three theme colours, `speed 0.5`, `scale 1.6`, `turbulence 1`, `fluidity 0.1`, `rimWidth 0.2`, `sharpness 2.5`, `shimmer 1.5`, `glow 2`, `lineWidth 1`, `flowDirection down` and the 1.8s intro.
- Colours are read from `--tabby-accent` / `--tabby-accent-light` once a second, so the lines follow the theme.
- The cursor is a magnet (`mouseRadius 0.35`, `mouseDampening 0.15`) and a click starts the swirl, as in the component.
- Everything that already governed the old water still applies: ~30fps, stops when the tab is hidden, with Reduce Motion on, on battery saver at 20% and unplugged, or when the switch is off. WebGL context loss resets the program and it rebuilds on the next frame.
- The render buffer is capped near 2.6 million pixels (and DPR 1.5), so a 4K monitor does not pay full price for a background.

**newtab.html** - the toggle's help text now says "Slow flowing lines of light over your background."

**Checked in a browser:** the WebGL2 context and program build (19 uniforms), a frame draws with no GL error, and sampled rows show 4-6 line crossings with peaks around 150-185 alpha. Forcing Reduce Motion stops the loop.

## 2026-11-10 - Flowing lines on by default

**Task:** Opening the page showed no lines, because the switch started off and nothing said so.

**newtab.js** - `water.on` is now true when nothing is saved yet (`savedWater === null`), and still respects an explicit off: once the switch is used, its stored value wins. So a fresh open shows the lines and turning them off sticks.

**Checked in a browser:** with the key removed and the page reloaded, `water.on` is true, the checkbox is ticked and the canvas is visible. Screenshot of the running effect is `water-check.png` in the project root.

## 2026-11-10 - Interactive switch, flat page background

**Task:** Make the cursor interaction an option instead of always-on, and remove the coloured haze behind the page.

**newtab.html** - new "Interactive" checkbox under "Moving water background", with the help line "The cursor pulls the lines towards it, and a click stirs them into a swirl."

**newtab.js** - `tabby-water-interactive` (on unless the user turns it off). The magnet, the click swirl and the pointer listeners all check it, and turning it off resets the magnet and any running swirl.

**newtab.css** - `.backdrop` no longer draws the accent-tinted radial gradient (`color-mix(accent 24%, button-bg)` at the bottom). With no wallpaper it showed as an olive haze over the whole page; it is now the flat theme background.

**Checked in a browser:** the checkbox exists, starts ticked, and toggling it writes `0`/`1` and flips `water.interactive`. `.backdrop` computes to `rgb(30, 29, 26)` with `background-image: none`.

## 2026-11-10 - Flowing lines: why nothing showed, and no more silent failures

**Task:** The installed extension drew no lines and the console said nothing, so the failure was invisible.

**newtab.js**
- `pumpWater()` used to draw nothing at all while paused. It now draws a single still frame (at full intro reveal) when the lines are on but Reduce Motion or battery saver pauses them, and still stops the loop.
- `waterInit()` reports instead of failing silently: no WebGL2 logs `[Tabby] Flowing lines: WebGL2 is unavailable…` and switches to a plain canvas-bands renderer so the switch still produces a background; a shader that fails to compile logs that it did.
- Init is attempted once (`water.initTried`), so a failing context is not rebuilt on every frame.
- At load, if the lines are on while Reduce Motion is enabled, it logs `[Tabby] Flowing lines are on, but Reduce Motion is enabled, so they stay still.`

**Checked in a browser:** a single still frame with `reveal = 1` paints 24,502 lit pixels on a 538x958 buffer with peak alpha 194, so the paused picture is visible.

## 2026-11-10 - Interactive switch actually does something

**Task:** Ticking or unticking "Interactive" changed nothing.

**Cause:** the magnet's reach went to the shader as `radius * pixelHeight / 100`, which is about 3 pixels. The shader measures `uMagnet.w` against the height (0.35 means 35% of the height), so the cursor's pull was confined to a dot a few pixels wide: invisible at any zoom.

**newtab.js** - pass `waterPointer.radius` (0.35) straight through, as the component does.

**Checked in a browser:** for the same frame, no cursor vs. cursor at the centre changes 176,992 pixels; a 33ms time step with no cursor changes 23,442. A click swirl changes 47,983. Before the fix the cursor effect was a handful of pixels.

## 2026-11-10 - Flowing lines ignore Reduce Motion

**Task:** Reduce Motion was pausing the background, which is why the extension showed no lines until the console said so.

**newtab.js** - the lines now run on the switch alone: `pumpWater()`, `tickWater()` and the click-swirl handler no longer consult `reduceMotion()`. Only the switch, a hidden tab and battery saver stop them. The console note about Reduce Motion is gone. Rolling digits, the celebration and haptics still respect Reduce Motion.

**newtab.html** - the help text drops "with Reduce Motion on".

**Checked in a browser:** with `matchMedia` forced to report Reduce Motion, `pumpWater()` still schedules the loop (`water.frame` is set) instead of pausing.

## 2026-11-10 - Flowing lines: clearer drift, lighter per second

**Task:** The lines looked frozen until the cursor touched them, and continuous movement costs GPU time.

**newtab.js**
- `uSpeed` 0.5 -> 1.15, so the drift is about 2.3x faster and reads as movement on its own. The cursor magnet is now an extra on top of the flow, not the only motion.
- Cheaper to run: ~22 frames a second instead of 30 (45ms step) and a render budget of about 1.6 million pixels with device pixel ratio capped at 1.25 (was 2.6M at 1.5). Same look, less per-frame work.

**Checked in a browser:** two frames 400ms apart differ across ~31,000 of 515,000 pixels (the moving line pixels), and the next 400ms differ by a similar amount, so the field keeps advancing rather than settling.

## 2026-11-10 - Flowing lines back on the component's own settings

**Task:** Try the original FluxLines settings rather than my tuned ones.

**newtab.js** - restored to exactly what the component does: `speed 0.5`, device pixel ratio capped at 2, and one draw per animation frame (the ~22fps and 30fps throttles and the 1.6M pixel budget are gone). Everything else was already the component's: scale 1.6, turbulence 1, fluidity 0.1, rimWidth 0.2, sharpness 2.5, shimmer 1.5, glow 2, lineWidth 1, flow down, intro 1.8s, magnet 0.35 at strength 1, click swirl. The only additions left are outside the effect: the hidden-tab pause, battery saver, the on/off switch and the Interactive toggle.

**Checked in a browser:** at speed 0.5 a full second of drift changes 32,117 of 515,404 pixels (6.2%), and the next second changes 31,211, so the field keeps moving at the reference rate.

## 2026-11-10 - Wave speed control

**Task:** The flow was too fast, and a fixed number is guesswork.

**newtab.html** - "Wave speed" range under the water options: 0.05 to 1.5 in 0.05 steps, with the value beside it.

**newtab.css** - `.water-speed` row matching the settings list, accent-coloured track, dim value readout.

**newtab.js** - `tabby-water-speed` (0.25 by default, half the component's 0.5). The slider writes the value straight into the `uSpeed` uniform, so the change is live and survives reloads.

**Checked in a browser:** with the slider at 0.25 the shader receives `0.25`; moving it to 0.90 and 0.10 changes the uniform to 0.9 and 0.1 and stores the value.

**Rollback:** originals are in `.backup-1.5.3/`.

## 2026-11-09 — v1.5.3: Cross-tab sync, desktop notifications, storage protection, cleanup

**Task:** Sync multi-tab state, add Pomodoro desktop notifications, protect video storage, and clean up dead CSS.

**manifest.json**
- Bumped version to `1.5.3`.
- Added `"unlimitedStorage"` permission to prevent large photo/video wallpapers in IndexedDB from being evicted by browser quota policies.

**newtab.js**
- Added cross-tab synchronization (`window.addEventListener('storage', ...)`): changes made to widgets, themes, colors, autohide, site icons, or volume in one tab now sync immediately across all open tabs without race conditions or overwriting.
- Added desktop notifications to Pomodoro timers (both V1 and dark card V3): asks for notification permission when enabled and triggers a desktop alert when focus or break sessions end.

**newtab.html**
- Version label updated to `v1.5.3`.

**newtab.css**
- Removed legacy unused CSS classes (`.theme-presets`, `.theme-studio`, `.folder-header`, etc.) and eliminated orphaned `--theme-*` custom properties.

## 2026-11-09 - Favorites rows save themselves, Stone path default, plain theme names

**Task:** Remove the numbers and the Save button from the favorites editor rows, default to Stone path, drop the emoji from theme names.

**newtab.js**
- `buildShortcutInputGroup(shortcut)` no longer builds the number cell; the row is `[ name | website ]`.
- Both per-row Save buttons are gone. `wireShortcutAutoSave()` writes a row 400 ms after typing stops (and on change/blur) once it has a name and a valid address, clears the shortcut when both fields are emptied, and reports a bad address on blur only. It saves with `persistWidgets()` + `refreshWidgetCard()`, so the panel is not rebuilt and the caret stays put.
- `BUILTIN_THEMES`: Stone path is first with tag `Default`; Lavender is a normal theme (`lavender`, "Soft lilac"). All nine names lost their emoji.
- Colour fallbacks are `#a5a58d` / `#34322e` / `#1e1d1a`; `migrateOldLavender()` targets the Stone entry.
- New `migrateDefaultThemeToStone()` runs once (`tabby-default-stone-v1`) and moves a tab still on the old out-of-the-box Lavender colours to Stone, so a Lavender choice made later is not overridden.

**newtab.html** - three colour-input defaults and `theme-color` use the Stone values.
**newtab.css** - `:root` accent/panel/button values are Stone; `.bookmark-editor-row` is now two columns; `.input-group-text` and `.bookmark-save` rules removed.

**Rollback:** originals are in `.backup-1.5.3/`.

## 2026-11-09 — Anti-slop pass on the whole UI

**Task:** Apply the same clean-up to the whole app, not only the editor window.

**newtab.css only (no JS change)**
- **No blur anywhere:** removed all 5 remaining `backdrop-filter: blur(...)` uses (settings panel, the two round floating buttons, the dialog scrim). Panel and buttons are solid colours now; the dialog scrim keeps its dark tint.
- **Font weights:** the file now uses only 400, 500 and 600. 30 declarations changed (300 to 400; 650, 700, 750, 800 to 600).
- **No small text:** 31 declarations at 9, 10, 10.5, 11 and 11.5px are now 12px.
- **Settings panel type scale:** body text, tab labels, buttons, labels and select values are 14px; section headings 14px; "No background yet" style headings 16px (override block at the end of the file). The brand title got line-height 1.2 and tracking -0.02em (was 1.05 and -0.04em).
- **Version label:** "v1.5.2" is plain 12px text instead of a bordered pill.
- **Flat surfaces:** removed decorative gradients on the favorites card, the shortcut avatar and the colour-theme card. The page background and the slider/hue controls keep theirs, since those are functional.
- **Spacing:** 60 padding/margin/gap values snapped to the 4px grid in panel, dialog and editor rules. Rules for widget cards (favorites, clock, timers, weather, notes, search, shortcuts) were deliberately skipped so their layouts stay as they were.

**Checked** in headless Chromium with the real extension page (chrome API stubbed): Background, Widgets and Settings tabs, the Edit Favorites window, and each widget type (favorites list, clock, search, both timers, weather message, notes). No script errors and no layout breakage seen. Weather data is blocked offline, so only its "choose a city" state was checked.

**Not changed:** widget-card spacing, the wallpaper default background, and the widget "Background blur" slider, which is a user feature, not interface chrome.

**Easy rollback:** the spacing, weights and sizes were changed by mechanical rules, so tell me if any screen looks off and I will fix that screen only.

## 2026-11-09 — Anti-slop pass on the widget editor window (Edit Favorites)

**Task:** Clean up the editor UI using the anti-slop, typography, spacing and colour-palette rules. Scope: only the widget editor window. The settings panel and the rest of the app were not touched.

**newtab.css only (no JS change)**
- **No frosted glass:** removed `backdrop-filter: blur(28px)` and the 90% see-through fill from `.widget-editor-slot`. It is now a solid `--tabby-ui-background` surface. The 1px border and soft shadow still separate it from the wallpaper.
- **Type:** weights 700/650/600 became 600 (headings) and 500 (buttons). Nothing under 12px: Save and "Add site" 10-11px became 14px, inputs 12px became 14px, labels 11px became 12px, title 16px became 18px (line-height 1.2).
- **Spacing:** snapped to the 8pt grid. Controls are 40px tall, row gap 8px, list margin 16px, header spacing 16px, panel side padding 24px, Appearance section margin 24px.
- **Row layout:** `minmax(0, 1fr) auto 32px`. The website field takes more space than the name field (`flex-grow: 1.6`), and the number cell is slimmer, so "youtube.com" fits at the narrowest panel width (340px).
- **Colour:** delete icon changed from pure `#ff0000` to the app's existing soft red `#ff6b81`. A rule `.bookmark-delete svg path { fill: currentColor }` makes the icon follow the button colour. The other buttons that use the same trash icon are unchanged.

**Checked:** rendered before/after screenshots of the editor at 340px panel width in headless Chromium, using a copy of the editor markup. I did not run the full extension.

**Found but NOT changed (outside the editor window), for a later pass**
- 6 uses of `backdrop-filter` (settings panel, round buttons, one overlay).
- Several gradients (accent buttons, a rainbow hue slider that is functional and should stay).
- Font weights up to 800 and sizes of 9-11.5px in other parts of the app.

## 2026-11-09 — Favorites editor rows use a Bootstrap-style input group

**Task:** Make each row in the "Edit Favorites" panel an `input-group` (number, name, website), like Bootstrap.

**Markup each row now produces**
```html
<div class="input-group">
  <span class="input-group-text">1</span>
  <input type="text" class="form-control" aria-label="Name">
  <input type="text" class="form-control" aria-label="Website, e.g. youtube.com">
</div>
```
The Save and Delete buttons stay next to the group, outside it.

**newtab.js**
- Added `buildShortcutInputGroup(index, shortcut)`. It builds the group and returns `{ group, nameInput, urlInput }`.
- `renderBookmarkEditor` (3x3 Favorites) and `renderExpandableBookmarkEditor` (Favorites V2) both use it now, so the markup lives in one place.
- Row is now `row.append(group, save, remove)`.
- The number no longer has a trailing dot ("1" instead of "1.").
- Inputs get `aria-label`s ("Name", "Website, e.g. youtube.com") and keep their placeholders.

**newtab.css**
- Added local `.input-group`, `.input-group-text` and `.form-control` rules. These copy the few Bootstrap behaviours needed (joined borders, rounded outer corners only, focus ring on top). The full Bootstrap library is NOT loaded, so no extra files, no license notice needed, and no clash with Tabby's own styles.
- `.bookmark-editor-row` grid changed to `minmax(0, 1fr) 38px 30px`, with the later override at `minmax(0, 1fr) 46px 32px`.
- Removed the old `.bookmark-number` and `.bookmark-editor-row input` rules, which are no longer used.

**To check after reloading**
- Both Favorites types: number, name, website look joined as one bar.
- Saving, deleting and "Add site" (V2) still work.
- Narrow editor window: inputs shrink without overflowing.
