/* Kısayolcu — data file (English, US keyboard layout)
 * Source: Apple "Mac keyboard shortcuts" (support.apple.com/102650) + browser extras.
 * keys: key sequence (Apple order: ⌃ ⌥ ⇧ ⌘). alt: alternative keys. then: key pressed afterwards.
 * pop: one of the most-used. tr: optional keyboard note (shown as a generic "keyboard note").
 */
window.KS_CATS = [
  { id: 'temel',    ad: 'The basics',            ikon: '⌘', aciklama: 'Every day, in every app.' },
  { id: 'metin',    ad: 'Flying through text',   ikon: '⌥', aciklama: 'Move the cursor without touching the mouse.' },
  { id: 'emoji',    ad: 'Emoji & special characters', ikon: '😀', aciklama: 'Emoji, €, ~ and friends. No googling.' },
  { id: 'pencere',  ad: 'Windows & apps',        ikon: '▢', aciklama: 'Switch, hide, close, tile.' },
  { id: 'sistem',   ad: 'System & screenshots',  ikon: '📸', aciklama: 'Spotlight, lock, screenshots.' },
  { id: 'finder',   ad: 'Finder',                ikon: '📁', aciklama: 'Get around your files fast.' },
  { id: 'tarayici', ad: 'Browser',               ikon: '🌐', aciklama: 'Works in both Safari and Chrome.' },
  { id: 'erisim',   ad: 'Accessibility',         ikon: '◐', aciklama: 'Take control of the screen and focus.' }
];

window.KS_SHORTCUTS = [
  // ── The basics ───────────────────────────────────────
  { id: 'copy', cat: 'temel', keys: ['cmd', 'c'], ad: 'Copy', d: 'Copies the selected text, file or image to the clipboard.', pop: true },
  { id: 'paste', cat: 'temel', keys: ['cmd', 'v'], ad: 'Paste', d: 'Pastes the clipboard wherever your cursor is.', pop: true },
  { id: 'cut', cat: 'temel', keys: ['cmd', 'x'], ad: 'Cut', d: 'Cuts the selected text. To move files in Finder, use ⌘C + ⌥⌘V.' },
  { id: 'undo', cat: 'temel', keys: ['cmd', 'z'], ad: 'Undo', d: 'Undoes the last thing you did. Keep pressing to go further back.', pop: true },
  { id: 'redo', cat: 'temel', keys: ['shift', 'cmd', 'z'], ad: 'Redo', d: 'Brings back what you just undid.' },
  { id: 'selectall', cat: 'temel', keys: ['cmd', 'a'], ad: 'Select All', d: 'Selects the entire text, list or folder.' },
  { id: 'find', cat: 'temel', keys: ['cmd', 'f'], ad: 'Find', d: 'Opens search in a page, a document or Finder.' },
  { id: 'findnext', cat: 'temel', keys: ['cmd', 'g'], ad: 'Find Next', d: 'Jumps to the next match. ⇧⌘G goes to the previous one.' },
  { id: 'save', cat: 'temel', keys: ['cmd', 's'], ad: 'Save', d: 'Saves the document.' },
  { id: 'saveas', cat: 'temel', keys: ['shift', 'cmd', 's'], ad: 'Save As / Duplicate', d: 'Makes a copy of the document.' },
  { id: 'open', cat: 'temel', keys: ['cmd', 'o'], ad: 'Open', d: 'Brings up the open-file dialog.' },
  { id: 'print', cat: 'temel', keys: ['cmd', 'p'], ad: 'Print', d: 'Opens the print (and save as PDF) dialog.' },
  { id: 'new', cat: 'temel', keys: ['cmd', 'n'], ad: 'New', d: 'Opens a new window or a new document.' },
  { id: 'settings', cat: 'temel', keys: ['cmd', ','], ad: 'Settings', d: 'Opens settings for the app in front. Works almost everywhere.' },
  { id: 'help', cat: 'temel', keys: ['shift', 'cmd', '?'], ad: 'Search the menus', d: 'Opens the Help menu. Type a command and it points to it in the menus.' },
  { id: 'pasteplain', cat: 'temel', keys: ['opt', 'shift', 'cmd', 'v'], ad: 'Paste and Match Style', d: 'Pastes text so it matches the styling of wherever it lands.' },

  // ── Text ─────────────────────────────────────────────
  { id: 'wordleft', cat: 'metin', keys: ['opt', 'left'], alt: [['opt', 'right']], ad: 'Jump word by word', d: 'Moves the cursor to the previous / next word.' },
  { id: 'linestart', cat: 'metin', keys: ['cmd', 'left'], alt: [['cmd', 'right']], ad: 'Start / end of line', d: 'Moves the cursor to the start or end of the line.' },
  { id: 'docstart', cat: 'metin', keys: ['cmd', 'up'], alt: [['cmd', 'down']], ad: 'Top / bottom of document', d: 'Moves the cursor to the very top or very bottom of the text.' },
  { id: 'selchar', cat: 'metin', keys: ['shift', 'left'], alt: [['shift', 'right']], ad: 'Select letter by letter', d: 'Extends the selection by one character. ⇧↑ / ⇧↓ go line by line.' },
  { id: 'selword', cat: 'metin', keys: ['opt', 'shift', 'left'], alt: [['opt', 'shift', 'right']], ad: 'Select word by word', d: 'Extends the selection one word at a time.' },
  { id: 'selline', cat: 'metin', keys: ['shift', 'cmd', 'left'], alt: [['shift', 'cmd', 'right']], ad: 'Select to end of line', d: 'Selects from the cursor to the start / end of the line.' },
  { id: 'seldoc', cat: 'metin', keys: ['shift', 'cmd', 'up'], alt: [['shift', 'cmd', 'down']], ad: 'Select to end of document', d: 'Selects from the cursor to the top / bottom of the text.' },
  { id: 'delword', cat: 'metin', keys: ['opt', 'delete'], ad: 'Delete a word', d: 'Deletes the whole word to the left of the cursor in one go.', pop: true },
  { id: 'delline', cat: 'metin', keys: ['cmd', 'delete'], ad: 'Delete the line', d: 'Deletes everything from the cursor back to the start of the line.' },
  { id: 'fwddel', cat: 'metin', keys: ['fn', 'delete'], ad: 'Forward delete', d: 'Deletes the character to the right of the cursor (the Windows Delete key).' },
  { id: 'pageupdown', cat: 'metin', keys: ['fn', 'up'], alt: [['fn', 'down']], ad: 'Page up / down', d: 'Page Up / Page Down. fn← and fn→ jump to the top / bottom.' },
  { id: 'bold', cat: 'metin', keys: ['cmd', 'b'], ad: 'Bold', d: 'Makes the selected text bold. ⌘I for italic, ⌘U for underline.' },
  { id: 'link', cat: 'metin', keys: ['cmd', 'k'], ad: 'Add a link', d: 'Turns the selected text into a link (Notes, Mail, Slack, Notion…).' },
  { id: 'ctrla', cat: 'metin', keys: ['ctrl', 'a'], alt: [['ctrl', 'e']], ad: 'Start / end of line (secret route)', d: 'Old-school start / end of line that works everywhere, Terminal included.' },
  { id: 'ctrlk', cat: 'metin', keys: ['ctrl', 'k'], ad: 'Cut to end of line', d: 'Cuts from the cursor to the end of the line. ⌃Y pastes it back.' },
  { id: 'ctrlt', cat: 'metin', keys: ['ctrl', 't'], ad: 'Swap two letters', d: 'Swaps the letters on either side of the cursor. A typo lifesaver.' },
  { id: 'define', cat: 'metin', keys: ['ctrl', 'cmd', 'd'], ad: 'Look Up', d: 'Shows the definition of the word under the pointer.' },
  { id: 'spell', cat: 'metin', keys: ['cmd', ';'], ad: 'Find a typo', d: 'Jumps to the next misspelled word in the document.' },

  // ── Emoji & special characters ───────────────────────
  { id: 'emoji', cat: 'emoji', keys: ['ctrl', 'cmd', 'space'], alt: [['fn', 'e']], ad: 'Emoji picker', d: 'Opens the emoji and symbols picker. Just type to search.', pop: true },
  { id: 'charviewer', cat: 'emoji', keys: ['fn', 'fn'], ad: 'Character Viewer', d: 'Press the fn / 🌐 key twice (turn it on in Keyboard settings).' },
  { id: 'at', cat: 'emoji', keys: ['shift', '2'], ad: '@ sign', d: 'Types @ for emails and mentions.', tr: 'On non-US keyboards this key may differ.', pop: true },
  { id: 'hash', cat: 'emoji', keys: ['shift', '3'], ad: '# sign', d: 'Types # for hashtags and code.', tr: 'On a UK keyboard, # is ⌥3.' },
  { id: 'dollar', cat: 'emoji', keys: ['shift', '4'], ad: '$ sign', d: 'Types a dollar sign.' },
  { id: 'brackets', cat: 'emoji', keys: ['['], alt: [[']']], ad: 'Square brackets [ ]', d: 'Opens / closes a square bracket. The two keys right of P.' },
  { id: 'curly', cat: 'emoji', keys: ['shift', '['], alt: [['shift', ']']], ad: 'Curly braces { }', d: 'Opens / closes a curly brace. Essential for code.' },
  { id: 'backslash', cat: 'emoji', keys: ['\\'], ad: 'Backslash \\', d: 'Types a backslash. The key above Return. ⇧\\ gives you |.', tr: 'On non-US keyboards this key may differ.' },
  { id: 'tilde', cat: 'emoji', keys: ['shift', '`'], ad: '~ tilde', d: 'Types a tilde (for paths like ~/Downloads). The key left of 1.', tr: 'On non-US keyboards this key may differ.' },
  { id: 'euro', cat: 'emoji', keys: ['opt', 'shift', '2'], ad: '€ sign', d: 'Types the euro symbol.', tr: 'On a UK keyboard, € is ⌥2.' },
  { id: 'applelogo', cat: 'emoji', keys: ['opt', 'shift', 'k'], ad: ' Apple logo', d: 'Types the Apple logo. Only shows up on Apple devices 😉' },
  { id: 'inputsrc', cat: 'emoji', keys: ['ctrl', 'space'], ad: 'Switch keyboard language', d: 'Flips between your input sources (if you’ve added more than one).' },

  // ── Windows & apps ───────────────────────────────────
  { id: 'cmdtab', cat: 'pencere', keys: ['cmd', 'tab'], ad: 'Switch apps', d: 'Cycles through open apps. Keep holding ⌘ and tap Tab again.', pop: true },
  { id: 'cmdtick', cat: 'pencere', keys: ['cmd', '`'], ad: 'Switch windows of the same app', d: 'Flips between windows of the app you’re in. The ` key sits left of 1.', tr: 'On non-US keyboards, it’s the key next to left Shift or above Tab.' },
  { id: 'closewin', cat: 'pencere', keys: ['cmd', 'w'], ad: 'Close window / tab', d: 'Closes the window or tab in front. The app stays open.' },
  { id: 'closeall', cat: 'pencere', keys: ['opt', 'cmd', 'w'], ad: 'Close all windows', d: 'Closes every window of the app.' },
  { id: 'quit', cat: 'pencere', keys: ['cmd', 'q'], ad: 'Quit app', d: 'Actually quits the app. That’s the difference from ⌘W.', pop: true },
  { id: 'hide', cat: 'pencere', keys: ['cmd', 'h'], ad: 'Hide app', d: 'Gets the app out of sight without quitting it.' },
  { id: 'minimizeall', cat: 'pencere', keys: ['opt', 'cmd', 'm'], ad: 'Minimize all', d: 'Sends every window of the app down to the Dock.' },
  { id: 'hideothers', cat: 'pencere', keys: ['opt', 'cmd', 'h'], ad: 'Hide Others', d: 'Hides every app except the one in front. Instant focus mode.' },
  { id: 'minimize', cat: 'pencere', keys: ['cmd', 'm'], ad: 'Minimize', d: 'Shrinks the window into the Dock. ⌥⌘M does it for all of them.' },
  { id: 'forcequit', cat: 'pencere', keys: ['opt', 'cmd', 'esc'], ad: 'Force Quit', d: 'Opens the Force Quit window so you can kill a frozen app.', pop: true },
  { id: 'fullscreen', cat: 'pencere', keys: ['ctrl', 'cmd', 'f'], alt: [['fn', 'f']], ad: 'Full screen', d: 'Takes the app in and out of full screen.' },
  { id: 'tileleft', cat: 'pencere', keys: ['fn', 'ctrl', 'left'], alt: [['fn', 'ctrl', 'right']], ad: 'Tile window left / right', d: 'Split the screen in two (macOS 15 and later). fn⌃↑ / fn⌃↓ for top / bottom half.' },
  { id: 'tilefill', cat: 'pencere', keys: ['fn', 'ctrl', 'f'], ad: 'Fill the screen', d: 'The window fills the screen (without going full screen). fn⌃C centers it.' },
  { id: 'tilerestore', cat: 'pencere', keys: ['fn', 'ctrl', 'r'], ad: 'Return to previous size', d: 'Puts a tiled window back to the size it was.' },
  { id: 'missionctl', cat: 'pencere', keys: ['ctrl', 'up'], ad: 'Mission Control', d: 'A bird’s-eye view of every open window and desktop.' },
  { id: 'appexpose', cat: 'pencere', keys: ['ctrl', 'down'], ad: 'App windows', d: 'Shows all windows of the app in front, side by side.' },
  { id: 'spaces', cat: 'pencere', keys: ['ctrl', 'left'], alt: [['ctrl', 'right']], ad: 'Switch desktops', d: 'Slides between desktops (Spaces) and full-screen apps.' },
  { id: 'showdesktop', cat: 'pencere', keys: ['fn', 'h'], ad: 'Show Desktop', d: 'Shoves every window aside to reveal the desktop.' },

  // ── System & screenshots ─────────────────────────────
  { id: 'spotlight', cat: 'sistem', keys: ['cmd', 'space'], ad: 'Spotlight', d: 'Open apps, find files, do math, convert units. Your Mac’s command center.', pop: true },
  { id: 'ssfull', cat: 'sistem', keys: ['shift', 'cmd', '3'], ad: 'Screenshot the whole screen', d: 'Saves the entire screen to your desktop.' },
  { id: 'ssarea', cat: 'sistem', keys: ['shift', 'cmd', '4'], ad: 'Screenshot a selected area', d: 'Saves whatever area you drag over.', pop: true },
  { id: 'sswindow', cat: 'sistem', keys: ['shift', 'cmd', '4'], then: ['space'], ad: 'Screenshot a window', d: 'After ⇧⌘4, press Space and click a window. Drop shadow included.' },
  { id: 'ssclip', cat: 'sistem', keys: ['ctrl', 'shift', 'cmd', '4'], ad: 'Screenshot to clipboard', d: 'No file, just copied. Then ⌘V it anywhere you like.', pop: true },
  { id: 'sstool', cat: 'sistem', keys: ['shift', 'cmd', '5'], ad: 'Screenshot & recording tool', d: 'Every option in one place, screen recording and save location included.' },
  { id: 'lock', cat: 'sistem', keys: ['ctrl', 'cmd', 'q'], ad: 'Lock Screen', d: 'Hit it when you leave your desk. On Touch ID Macs, pressing the power button locks too.', pop: true },
  { id: 'screensleep', cat: 'sistem', keys: ['ctrl', 'shift', 'power'], ad: 'Sleep the display', d: 'Turns the screen off instantly, Mac stays awake (keyboards without Touch ID).' },
  { id: 'logout', cat: 'sistem', keys: ['shift', 'cmd', 'q'], ad: 'Log Out', d: 'Logs you out, after asking first.' },
  { id: 'dockhide', cat: 'sistem', keys: ['opt', 'cmd', 'd'], ad: 'Hide / show the Dock', d: 'Toggles Dock auto-hiding. Free screen space.' },
  { id: 'fnquicknote', cat: 'sistem', keys: ['fn', 'q'], ad: 'Quick Note', d: 'Pops up a small note on top of whatever app you’re in.' },
  { id: 'fnnotif', cat: 'sistem', keys: ['fn', 'n'], ad: 'Notification Center', d: 'Opens notifications and widgets.' },
  { id: 'fncontrol', cat: 'sistem', keys: ['fn', 'c'], ad: 'Control Center', d: 'Wi-Fi, Bluetooth, sound and brightness controls.' },
  { id: 'fndock', cat: 'sistem', keys: ['fn', 'a'], ad: 'Show the Dock', d: 'Summons a hidden Dock.' },
  { id: 'fnapps', cat: 'sistem', keys: ['fn', 'shift', 'a'], ad: 'Apps', d: 'Opens the Apps view (formerly known as Launchpad).' },
  { id: 'fndictation', cat: 'sistem', keys: ['fn', 'd'], ad: 'Dictation', d: 'Starts / stops typing with your voice.' },
  { id: 'volfine', cat: 'sistem', keys: ['opt', 'shift', 'vol'], ad: 'Fine-tune the volume', d: 'Changes volume in quarter steps. Works with the brightness keys too.' },
  { id: 'volsettings', cat: 'sistem', keys: ['opt', 'vol'], ad: 'Open Sound settings', d: '⌥ + a volume key opens Sound settings, ⌥ + brightness opens Displays.' },

  // ── Finder ───────────────────────────────────────────
  { id: 'quicklook', cat: 'finder', keys: ['space'], ad: 'Quick Look', d: 'Previews a file without opening it. PDFs, videos, images… all of it.', pop: true },
  { id: 'hidden', cat: 'finder', keys: ['shift', 'cmd', '.'], ad: 'Show hidden files', d: 'Shows / hides hidden files like .env and .git.', pop: true },
  { id: 'trash', cat: 'finder', keys: ['cmd', 'delete'], ad: 'Move to Trash', d: 'Sends the selected file to the Trash.' },
  { id: 'emptytrash', cat: 'finder', keys: ['shift', 'cmd', 'delete'], ad: 'Empty Trash', d: 'Empties the Trash, after asking first.' },
  { id: 'move', cat: 'finder', keys: ['opt', 'cmd', 'v'], ad: 'Move (cut & paste)', d: 'Copy with ⌘C first, then move with ⌥⌘V. This is how you cut files on a Mac.' },
  { id: 'goto', cat: 'finder', keys: ['shift', 'cmd', 'g'], ad: 'Go to Folder', d: 'Type a path and jump to any folder (like ~/Library).' },
  { id: 'newfolder', cat: 'finder', keys: ['shift', 'cmd', 'n'], ad: 'New Folder', d: 'Creates a new folder right where you are.' },
  { id: 'rename', cat: 'finder', keys: ['return'], ad: 'Rename', d: 'Starts editing the name of the selected file.' },
  { id: 'info', cat: 'finder', keys: ['cmd', 'i'], ad: 'Get Info', d: 'File size, dates, permissions.' },
  { id: 'duplicate', cat: 'finder', keys: ['cmd', 'd'], ad: 'Duplicate', d: 'Makes a copy of the selected file in the same place.' },
  { id: 'openitem', cat: 'finder', keys: ['cmd', 'down'], ad: 'Open', d: 'Opens the selected file / folder. ⌘↑ goes up to the parent folder.' },
  { id: 'views', cat: 'finder', keys: ['cmd', '1'], ad: 'Change view', d: '⌘1 icons, ⌘2 list, ⌘3 columns, ⌘4 gallery.' },
  { id: 'copypath', cat: 'finder', keys: ['opt', 'cmd', 'c'], ad: 'Copy file path', d: 'Copies the full path of the selected file as text.' },
  { id: 'downloads', cat: 'finder', keys: ['opt', 'cmd', 'l'], ad: 'Downloads', d: 'Opens the Downloads folder.' },
  { id: 'desktopfolder', cat: 'finder', keys: ['shift', 'cmd', 'd'], ad: 'Desktop folder', d: 'Opens the Desktop folder. ⇧⌘H for Home, ⇧⌘O for Documents.' },
  { id: 'appsfolder', cat: 'finder', keys: ['shift', 'cmd', 'a'], ad: 'Applications folder', d: 'Opens the Applications folder.' },
  { id: 'airdrop', cat: 'finder', keys: ['shift', 'cmd', 'r'], ad: 'AirDrop', d: 'Opens the AirDrop window.' },
  { id: 'pathbar', cat: 'finder', keys: ['opt', 'cmd', 'p'], ad: 'Path Bar', d: 'Shows the folder path along the bottom of the window.' },
  { id: 'finderback', cat: 'finder', keys: ['cmd', '['], alt: [['cmd', ']']], ad: 'Back / forward', d: 'Goes to the previous / next folder.' },

  // ── Browser ──────────────────────────────────────────
  { id: 'newtab', cat: 'tarayici', keys: ['cmd', 't'], ad: 'New tab', d: 'Opens a new tab.' },
  { id: 'reopentab', cat: 'tarayici', keys: ['shift', 'cmd', 't'], ad: 'Reopen closed tab', d: 'Brings back the tab you closed by accident. Keep pressing for older ones.', pop: true },
  { id: 'address', cat: 'tarayici', keys: ['cmd', 'l'], ad: 'Jump to the address bar', d: 'Selects the address, ready for typing.' },
  { id: 'reload', cat: 'tarayici', keys: ['cmd', 'r'], ad: 'Reload', d: 'Reloads the page. ⇧⌘R skips the cache.' },
  { id: 'nexttab', cat: 'tarayici', keys: ['ctrl', 'tab'], alt: [['ctrl', 'shift', 'tab']], ad: 'Next / previous tab', d: 'Cycles through your tabs in order.' },
  { id: 'tabn', cat: 'tarayici', keys: ['cmd', '1'], ad: 'Go to tab N', d: '⌘1…⌘8 jump to that tab, ⌘9 jumps to the last one.' },
  { id: 'zoom', cat: 'tarayici', keys: ['cmd', '+'], alt: [['cmd', '-'], ['cmd', '0']], ad: 'Zoom in / out', d: 'Makes the page bigger or smaller. ⌘0 resets.' },
  { id: 'cmdclick', cat: 'tarayici', keys: ['cmd', 'click'], ad: 'Open link in a background tab', d: 'Opens the link in a new tab without leaving the page you’re reading.' },
  { id: 'bookmark', cat: 'tarayici', keys: ['cmd', 'd'], ad: 'Bookmark', d: 'Adds the page to your bookmarks.' },
  { id: 'history', cat: 'tarayici', keys: ['cmd', 'y'], ad: 'History', d: 'Opens your browsing history.' },
  { id: 'private', cat: 'tarayici', keys: ['shift', 'cmd', 'n'], ad: 'Private window', d: 'Opens a private / incognito window.' },
  { id: 'devtools', cat: 'tarayici', keys: ['opt', 'cmd', 'i'], ad: 'Developer tools', d: 'Opens the page’s code and the console.' },
  { id: 'browserback', cat: 'tarayici', keys: ['cmd', 'left'], alt: [['cmd', 'right']], ad: 'Back / forward', d: 'Goes to the previous / next page (when you’re not in a text field). ⌘[ / ⌘] work too.' },
  { id: 'tabarrows', cat: 'tarayici', keys: ['opt', 'cmd', 'right'], alt: [['opt', 'cmd', 'left']], ad: 'Next / previous tab (arrows)', d: 'Moves between tabs with the arrow keys in Chrome and Safari.' },

  // ── Accessibility ────────────────────────────────────
  { id: 'a11ypanel', cat: 'erisim', keys: ['opt', 'cmd', 'f5'], ad: 'Accessibility Shortcuts', d: 'Opens the Accessibility Shortcuts panel. Triple-pressing Touch ID does it too.' },
  { id: 'invert', cat: 'erisim', keys: ['ctrl', 'opt', 'cmd', '8'], ad: 'Invert colors', d: 'Inverts the screen colors (you may need to turn it on in Settings).' },
  { id: 'tabfocus', cat: 'erisim', keys: ['tab'], alt: [['shift', 'tab']], ad: 'Next field', d: 'Moves to the next / previous control in forms and dialogs.' },
  { id: 'focusmenu', cat: 'erisim', keys: ['ctrl', 'f2'], ad: 'Focus the menu bar', d: 'Lets you drive the menu bar from the keyboard (fn⌃F2 works too).' }
];

/* ── Learning flow (MVP) ──────────────────────────────
 * check types:
 *  combo     : a key combination the browser can see (times: how many presses)
 *  emoji     : was an emoji entered in the field
 *  char      : was a specific character entered in the field
 *  away      : the page lost focus and got it back (OS shortcuts like Spotlight, ⌘Tab)
 *  resize    : the window size changed (full screen, tiling, zoom)
 *  tabClose  : the practice tab was closed
 *  tabReopen : the practice tab was closed and reopened
 *  reload    : the page was reloaded
 *  imagePaste: an image was pasted into the field
 *  metaClick : a link was clicked while holding ⌘
 *  manual    : the browser can't see it, the user says "Done"
 *  info      : information only, "Got it"
 */
window.KS_CHAPTERS = [
  { id: 'sart', ad: 'Can’t live without', alt: 'The “whoa” ones, right up front' },
  { id: 'gunluk', ad: 'Daily speed', alt: 'The ones you’ll hit dozens of times a day' },
  { id: 'ekran', ad: 'Screen master', alt: 'Screenshots, windows, tabs' },
  { id: 'finder', ad: 'Finder break', alt: 'Files (try these in Finder)' },
  { id: 'merakli', ad: 'For the curious', alt: 'Few people know these. You’ll survive without them' }
];

const KS_LOREM = 'Two keys beat reaching for the mouse, hundreds of times a day.';

window.KS_LESSONS = [
  // The basics
  { id: 'l-copy', ch: 'temel', sc: 'copy', gorev: 'The text is already selected. Now copy it with ⌘C.', practice: { kind: 'input', value: 'Everything on a Mac starts with ⌘C', select: 'all' }, check: { type: 'combo', combos: ['cmd+c'] } },
  { id: 'l-paste', ch: 'temel', sc: 'paste', gorev: 'Paste what you just copied into the box with ⌘V.', practice: { kind: 'input', value: '', placeholder: 'paste here…' }, check: { type: 'combo', combos: ['cmd+v'] } },
  { id: 'l-cut', ch: 'temel', sc: 'cut', gorev: 'Cut the selected text with ⌘X. The box will go empty.', practice: { kind: 'input', value: 'This text is about to vanish', select: 'all' }, check: { type: 'combo', combos: ['cmd+x'] } },
  { id: 'l-undo', ch: 'temel', sc: 'undo', gorev: 'Type something in the box, then undo it with ⌘Z.', practice: { kind: 'input', value: '', placeholder: 'type something, then ⌘Z…' }, check: { type: 'combo', combos: ['cmd+z'] } },
  { id: 'l-redo', ch: 'temel', sc: 'redo', gorev: 'Changed your mind? Bring back what you undid with ⇧⌘Z.', practice: { kind: 'input', value: '', placeholder: 'type → ⌘Z → ⇧⌘Z' }, check: { type: 'combo', combos: ['cmd+shift+z'] } },
  { id: 'l-selectall', ch: 'temel', sc: 'selectall', gorev: 'The cursor is inside the text. Select all of it with ⌘A.', practice: { kind: 'textarea', value: KS_LOREM + '\nThe second line gets selected too.', select: 'end' }, check: { type: 'combo', combos: ['cmd+a'] } },
  { id: 'l-find', ch: 'temel', sc: 'find', gorev: 'Open search with ⌘F. (On this page we catch it before the browser does.)', practice: { kind: 'none' }, check: { type: 'combo', combos: ['cmd+f'], prevent: true } },
  { id: 'l-settings', ch: 'temel', sc: 'settings', gorev: 'Open your browser’s settings with ⌘, then close them with ⌘W and come back.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-pasteplain', ch: 'temel', sc: 'pasteplain', gorev: 'Copy some text, then paste it with ⌥⇧⌘V: the font and color stay behind.', practice: { kind: 'input', value: '', placeholder: 'paste without formatting…' }, check: { type: 'combo', combos: ['alt+shift+cmd+v'] } },

  // Emoji
  { id: 'l-emoji', ch: 'emoji', sc: 'emoji', gorev: 'Press ⌃⌘Space and pick an emoji. (The 🌐 key opens it too.)', practice: { kind: 'input', value: '', placeholder: 'drop an emoji here 👀' }, check: { type: 'emoji' } },
  { id: 'l-applelogo', ch: 'emoji', sc: 'applelogo', gorev: 'Type the Apple logo with ⌥⇧K. Yes, it’s been hiding on your keyboard all along.', practice: { kind: 'input', value: 'Made on a Mac ', select: 'end' }, check: { type: 'char', chars: [''] } },

  // Text
  { id: 'l-wordjump', ch: 'metin', sc: 'wordleft', gorev: 'Jump 3 words with ⌥← or ⌥→.', practice: { kind: 'textarea', value: KS_LOREM, select: 'end' }, check: { type: 'combo', combos: ['alt+left', 'alt+right'], times: 3 } },
  { id: 'l-linestart', ch: 'metin', sc: 'linestart', gorev: 'Go to the start of the line with ⌘←, then the end with ⌘→.', practice: { kind: 'textarea', value: KS_LOREM, select: 'middle' }, check: { type: 'combo', combos: ['cmd+left', 'cmd+right'], times: 2 } },
  { id: 'l-docstart', ch: 'metin', sc: 'docstart', gorev: 'Go to the very top of the text with ⌘↑, then the very bottom with ⌘↓.', practice: { kind: 'textarea', value: 'First line.\nSecond line.\nThird line.\nFourth line.', select: 'middle' }, check: { type: 'combo', combos: ['cmd+up', 'cmd+down'], times: 2 } },
  { id: 'l-selword', ch: 'metin', sc: 'selword', gorev: 'Select the last 2 words with ⌥⇧←.', practice: { kind: 'textarea', value: KS_LOREM, select: 'end' }, check: { type: 'combo', combos: ['alt+shift+left', 'alt+shift+right'], times: 2 } },
  { id: 'l-selline', ch: 'metin', sc: 'selline', gorev: 'Select from the cursor back to the start of the line with ⇧⌘←.', practice: { kind: 'textarea', value: KS_LOREM, select: 'end' }, check: { type: 'combo', combos: ['shift+cmd+left', 'shift+cmd+right'] } },
  { id: 'l-delword', ch: 'metin', sc: 'delword', gorev: 'Delete the last 2 words with ⌥⌫.', practice: { kind: 'textarea', value: KS_LOREM, select: 'end' }, check: { type: 'combo', combos: ['alt+delete'], times: 2 } },
  { id: 'l-delline', ch: 'metin', sc: 'delline', gorev: 'Wipe out the whole line in one go with ⌘⌫.', practice: { kind: 'textarea', value: KS_LOREM, select: 'end' }, check: { type: 'combo', combos: ['cmd+delete'] } },
  { id: 'l-fwddel', ch: 'metin', sc: 'fwddel', gorev: 'The cursor is at the start. Delete the letters to its right with fn⌫.', practice: { kind: 'textarea', value: 'XXXDelete the X’s at the start of this sentence.', select: 'start' }, check: { type: 'combo', combos: ['fwddelete'], times: 2 } },
  { id: 'l-ctrlae', ch: 'metin', sc: 'ctrla', gorev: 'Secret route: ⌃A jumps to the start of the line, ⌃E to the end.', practice: { kind: 'textarea', value: KS_LOREM, select: 'middle' }, check: { type: 'combo', combos: ['ctrl+a', 'ctrl+e'], times: 2 } },
  { id: 'l-ctrlt', ch: 'metin', sc: 'ctrlt', gorev: 'The cursor is between the u and the c. Press ⌃T to swap the two letters and get “Shortcut”.', practice: { kind: 'input', value: 'Shortuct', select: [6, 6] }, check: { type: 'combo', combos: ['ctrl+t'] } },

  // Windows
  { id: 'l-cmdtab', ch: 'pencere', sc: 'cmdtab', gorev: 'Switch to another app with ⌘Tab, then ⌘Tab again to come back.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-cmdtick', ch: 'pencere', sc: 'cmdtick', gorev: 'Open a second browser window with ⌘N, then flip between them with ⌘`.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-closewin', ch: 'pencere', sc: 'closewin', gorev: 'Press ↩ to open a practice tab, then close it over there with ⌘W.', practice: { kind: 'tab' }, check: { type: 'tabClose' } },
  { id: 'l-newtab', ch: 'pencere', sc: 'newtab', gorev: 'Open a new tab with ⌘T, then close it with ⌘W and come back.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-hide', ch: 'pencere', sc: 'hide', gorev: 'Hide the browser with ⌘H, then bring it back with ⌘Tab.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-minimize', ch: 'pencere', sc: 'minimize', gorev: 'Minimize the window to the Dock with ⌘M, then click it in the Dock to bring it back.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-quit', ch: 'pencere', sc: 'quit', gorev: 'Don’t try this one here 😅 ⌘W closes the window, ⌘Q quits the app. On a Mac, the red close button doesn’t quit the app.', practice: { kind: 'none' }, check: { type: 'info' } },
  { id: 'l-forcequit', ch: 'pencere', sc: 'forcequit', gorev: 'Open the Force Quit window with ⌥⌘Esc, close it with Esc and come back. For when an app freezes.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-fullscreen', ch: 'pencere', sc: 'fullscreen', gorev: 'Go full screen with ⌃⌘F, then press it again to get out.', practice: { kind: 'none' }, check: { type: 'resize', mods: ['ctrl', 'meta'], combos: ['ctrl+cmd+f'] } },
  { id: 'l-tile', ch: 'pencere', sc: 'tileleft', gorev: 'Tile the window to the left with fn⌃←, then put it back with fn⌃R. (macOS 15+)', practice: { kind: 'none' }, check: { type: 'resize', mods: ['ctrl'] } },
  { id: 'l-mission', ch: 'pencere', sc: 'missionctl', gorev: 'See every window from above with ⌃↑ (Mission Control), then press it again to close.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-spaces', ch: 'pencere', sc: 'spaces', gorev: 'Got more than one desktop or a full-screen app? Slide between them with ⌃← / ⌃→.', practice: { kind: 'none' }, check: { type: 'manual' } },

  // System
  { id: 'l-spotlight', ch: 'sistem', sc: 'spotlight', gorev: 'Open Spotlight with ⌘Space, type “125*4” (it’s a calculator!), then close it with Esc.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-ssarea', ch: 'sistem', sc: 'ssarea', gorev: 'Press ⇧⌘4 and drag over an area. The screenshot lands on your desktop. (Esc to bail.)', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-ssclip', ch: 'sistem', sc: 'ssclip', gorev: 'Select an area with ⌃⇧⌘4 (it goes to the clipboard), then paste it here with ⌘V.', practice: { kind: 'paste' }, check: { type: 'imagePaste' } },
  { id: 'l-sswindow', ch: 'sistem', sc: 'sswindow', gorev: 'Press ⇧⌘4, then Space: the pointer turns into a camera. Click a window.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-sstool', ch: 'sistem', sc: 'sstool', gorev: 'Open the screenshot and screen recording tool with ⇧⌘5. Close it with Esc.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-lock', ch: 'sistem', sc: 'lock', gorev: 'Lock the screen with ⌃⌘Q, then get back in with your password. (Not now? Skip it with esc.)', practice: { kind: 'none' }, check: { type: 'away', mods: ['ctrl', 'meta'] } },
  { id: 'l-fn', ch: 'sistem', sc: 'fnquicknote', gorev: 'Press fn+Q: a Quick Note pops up. (fn+N is notifications, fn+C is Control Center.)', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-volfine', ch: 'sistem', sc: 'volfine', gorev: 'Hold ⌥⇧ and tap a volume key: the volume moves in tiny steps.', practice: { kind: 'none' }, check: { type: 'manual' } },

  // Browser
  { id: 'l-address', ch: 'tarayici', sc: 'address', gorev: 'Jump to the address bar with ⌘L, then click back on the page.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-reopen', ch: 'tarayici', sc: 'reopentab', gorev: 'Press ↩ to open the practice tab, close it with ⌘W, then bring it back with ⇧⌘T.', practice: { kind: 'tab' }, check: { type: 'tabReopen' } },
  { id: 'l-reload', ch: 'tarayici', sc: 'reload', gorev: 'Reload the page with ⌘R. You won’t lose your place, promise.', practice: { kind: 'none' }, check: { type: 'reload' } },
  { id: 'l-zoom', ch: 'tarayici', sc: 'zoom', gorev: 'Zoom in with ⌘+, zoom out with ⌘-, reset with ⌘0.', practice: { kind: 'none' }, check: { type: 'resize', mods: ['meta'] } },
  { id: 'l-cmdclick', ch: 'tarayici', sc: 'cmdclick', gorev: 'Hold ⌘ and click the link below: it opens in a new tab in the background.', practice: { kind: 'link' }, check: { type: 'metaClick' } },
  { id: 'l-nexttab', ch: 'tarayici', sc: 'nexttab', gorev: 'Go to the next tab with ⌃Tab, then come back with ⌃⇧Tab.', practice: { kind: 'none' }, check: { type: 'away', mods: ['ctrl', 'meta'] } },
  { id: 'l-private', ch: 'tarayici', sc: 'private', gorev: 'Open a private window with ⇧⌘N, then close it with ⌘W and come back.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },

  // Finder
  { id: 'l-quicklook', ch: 'finder', sc: 'quicklook', gorev: 'Select a file in Finder and press Space. Quick Look previews it without opening.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-hidden', ch: 'finder', sc: 'hidden', gorev: 'In Finder, show hidden files with ⇧⌘. and press it again to hide them.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-move', ch: 'finder', sc: 'move', gorev: 'Cutting files, Mac style: copy the file with ⌘C, then move it with ⌥⌘V in the destination folder.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-goto', ch: 'finder', sc: 'goto', gorev: 'In Finder, press ⇧⌘G, type “~/Downloads”, hit Return.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-rename', ch: 'finder', sc: 'rename', gorev: 'Select a file, press Return, type the new name.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-trash', ch: 'finder', sc: 'trash', gorev: 'Select a file you don’t need and trash it with ⌘⌫. (⌘Z brings it back!)', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-copypath', ch: 'finder', sc: 'copypath', gorev: 'Select a file, copy its full path with ⌥⌘C, then paste it here.', practice: { kind: 'input', value: '', placeholder: '/Users/…' }, check: { type: 'char', chars: ['/'] } }
];

/* ── Lesson order: by importance ───────────────────────
 * Importance = time saved in daily life × how few people know it.
 * To change the order, just edit this list. A lesson that isn't listed isn't shown.
 */
window.KS_ORDER = {
  sart: ['l-copy', 'l-paste', 'l-emoji', 'l-spotlight', 'l-ssclip', 'l-undo', 'l-redo', 'l-delword', 'l-wordjump', 'l-cmdtab', 'l-closewin', 'l-reopen', 'l-quit', 'l-forcequit'],
  gunluk: ['l-linestart', 'l-delline', 'l-selword', 'l-selline', 'l-selectall', 'l-cut', 'l-find', 'l-newtab', 'l-address', 'l-cmdclick', 'l-cmdtick', 'l-lock', 'l-hide'],
  ekran: ['l-ssarea', 'l-sswindow', 'l-sstool', 'l-fullscreen', 'l-tile', 'l-mission', 'l-nexttab', 'l-reload', 'l-zoom', 'l-docstart', 'l-fwddel', 'l-settings'],
  finder: ['l-quicklook', 'l-move', 'l-rename', 'l-trash', 'l-hidden', 'l-goto', 'l-copypath'],
  merakli: ['l-applelogo', 'l-private', 'l-minimize', 'l-spaces', 'l-fn', 'l-volfine', 'l-ctrlae', 'l-ctrlt', 'l-pasteplain']
};
(function () {
  const byId = Object.fromEntries(window.KS_LESSONS.map(l => [l.id, l]));
  const out = [];
  for (const ch in window.KS_ORDER) window.KS_ORDER[ch].forEach(id => { const l = byId[id]; if (l) { l.ch = ch; out.push(l); } });
  window.KS_LESSONS = out;
})();
