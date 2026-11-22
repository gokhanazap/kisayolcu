/* Kısayolcu — veri dosyası
 * Kaynak: Apple "Mac klavye kısayolları" (support.apple.com/102650) + tarayıcı/Türkçe Q klavye ekleri.
 * keys: tuş dizisi (Apple sırası: ⌃ ⌥ ⇧ ⌘). alt: alternatif tuşlar. then: ardından basılan tuş.
 * pop: en çok kullanılanlardan. tr: Türkçe Q klavyeye özel not.
 */
window.KS_CATS = [
  { id: 'temel',    ad: 'Temeller',              ikon: '⌘', aciklama: 'Her gün, her uygulamada.' },
  { id: 'metin',    ad: 'Metinde uçmak',         ikon: '⌥', aciklama: 'İmleci fareye dokunmadan yönet.' },
  { id: 'emoji',    ad: 'Emoji & özel karakter', ikon: '😀', aciklama: '@, #, emoji… aramadan.' },
  { id: 'pencere',  ad: 'Pencere & uygulama',    ikon: '▢', aciklama: 'Geç, gizle, kapat, döşe.' },
  { id: 'sistem',   ad: 'Sistem & ekran görüntüsü', ikon: '📸', aciklama: 'Spotlight, kilit, ekran görüntüsü.' },
  { id: 'finder',   ad: 'Finder',                ikon: '📁', aciklama: 'Dosyalarla hızlı çalış.' },
  { id: 'tarayici', ad: 'Tarayıcı',              ikon: '🌐', aciklama: 'Safari ve Chrome’da ortak.' },
  { id: 'erisim',   ad: 'Erişilebilirlik',       ikon: '◐', aciklama: 'Ekranı ve odağı kontrol et.' }
];

window.KS_SHORTCUTS = [
  // ── Temeller ─────────────────────────────────────────
  { id: 'copy', cat: 'temel', keys: ['cmd', 'c'], ad: 'Kopyala', d: 'Seçili metni, dosyayı ya da görseli panoya kopyalar.', pop: true },
  { id: 'paste', cat: 'temel', keys: ['cmd', 'v'], ad: 'Yapıştır', d: 'Panodakini imlecin olduğu yere yapıştırır.', pop: true },
  { id: 'cut', cat: 'temel', keys: ['cmd', 'x'], ad: 'Kes', d: 'Seçili metni keser. Finder’da dosya taşımak için ⌘C + ⌥⌘V kullanılır.' },
  { id: 'undo', cat: 'temel', keys: ['cmd', 'z'], ad: 'Geri al', d: 'Son işlemi geri alır. Art arda basabilirsin.', pop: true },
  { id: 'redo', cat: 'temel', keys: ['shift', 'cmd', 'z'], ad: 'Yinele', d: 'Geri aldığını tekrar uygular.' },
  { id: 'selectall', cat: 'temel', keys: ['cmd', 'a'], ad: 'Tümünü seç', d: 'Metnin, listenin ya da klasörün tamamını seçer.' },
  { id: 'find', cat: 'temel', keys: ['cmd', 'f'], ad: 'Bul', d: 'Sayfada, belgede ya da Finder’da arama açar.' },
  { id: 'findnext', cat: 'temel', keys: ['cmd', 'g'], ad: 'Sonrakini bul', d: 'Aramada bir sonraki eşleşmeye gider. ⇧⌘G öncekine.' },
  { id: 'save', cat: 'temel', keys: ['cmd', 's'], ad: 'Kaydet', d: 'Belgeyi kaydeder.' },
  { id: 'saveas', cat: 'temel', keys: ['shift', 'cmd', 's'], ad: 'Farklı kaydet / Çoğalt', d: 'Belgenin kopyasını oluşturur.' },
  { id: 'open', cat: 'temel', keys: ['cmd', 'o'], ad: 'Aç', d: 'Dosya açma penceresini getirir.' },
  { id: 'print', cat: 'temel', keys: ['cmd', 'p'], ad: 'Yazdır', d: 'Yazdırma (ve PDF’e kaydetme) penceresini açar.' },
  { id: 'new', cat: 'temel', keys: ['cmd', 'n'], ad: 'Yeni', d: 'Yeni pencere ya da yeni belge açar.' },
  { id: 'settings', cat: 'temel', keys: ['cmd', ','], ad: 'Ayarlar', d: 'Öndeki uygulamanın ayarlarını açar. Neredeyse her uygulamada çalışır.' },
  { id: 'help', cat: 'temel', keys: ['shift', 'cmd', '?'], ad: 'Menüde komut ara', d: 'Yardım menüsünü açar. Yazdığın komutu menülerde bulup gösterir.', tr: 'Türkçe Q’da ? tuşu farklı yerde: ⇧⌘ ile birlikte ? karakterini yazan tuşa bas.' },
  { id: 'pasteplain', cat: 'temel', keys: ['opt', 'shift', 'cmd', 'v'], ad: 'Biçimsiz yapıştır', d: 'Metni, yapıştırdığın yerin yazı stiline uydurarak yapıştırır.' },

  // ── Metin ────────────────────────────────────────────
  { id: 'wordleft', cat: 'metin', keys: ['opt', 'left'], alt: [['opt', 'right']], ad: 'Kelime kelime atla', d: 'İmleci bir önceki / sonraki kelimeye taşır.' },
  { id: 'linestart', cat: 'metin', keys: ['cmd', 'left'], alt: [['cmd', 'right']], ad: 'Satır başı / sonu', d: 'İmleci satırın başına ya da sonuna götürür.' },
  { id: 'docstart', cat: 'metin', keys: ['cmd', 'up'], alt: [['cmd', 'down']], ad: 'Belge başı / sonu', d: 'İmleci metnin en başına ya da en sonuna götürür.' },
  { id: 'selchar', cat: 'metin', keys: ['shift', 'left'], alt: [['shift', 'right']], ad: 'Harf harf seç', d: 'Seçimi bir karakter genişletir. ⇧↑ / ⇧↓ satır satır.' },
  { id: 'selword', cat: 'metin', keys: ['opt', 'shift', 'left'], alt: [['opt', 'shift', 'right']], ad: 'Kelime kelime seç', d: 'Seçimi kelime kelime genişletir.' },
  { id: 'selline', cat: 'metin', keys: ['shift', 'cmd', 'left'], alt: [['shift', 'cmd', 'right']], ad: 'Satır sonuna kadar seç', d: 'İmleçten satır başına / sonuna kadar seçer.' },
  { id: 'seldoc', cat: 'metin', keys: ['shift', 'cmd', 'up'], alt: [['shift', 'cmd', 'down']], ad: 'Belge sonuna kadar seç', d: 'İmleçten metnin başına / sonuna kadar seçer.' },
  { id: 'delword', cat: 'metin', keys: ['opt', 'delete'], ad: 'Kelime sil', d: 'İmlecin solundaki kelimeyi tek seferde siler.', pop: true },
  { id: 'delline', cat: 'metin', keys: ['cmd', 'delete'], ad: 'Satırı sil', d: 'İmleçten satır başına kadar her şeyi siler.' },
  { id: 'fwddel', cat: 'metin', keys: ['fn', 'delete'], ad: 'İleri sil', d: 'İmlecin sağındaki karakteri siler (Windows’taki Delete).' },
  { id: 'pageupdown', cat: 'metin', keys: ['fn', 'up'], alt: [['fn', 'down']], ad: 'Sayfa yukarı / aşağı', d: 'Page Up / Page Down. fn← ve fn→ belge başı / sonu.' },
  { id: 'bold', cat: 'metin', keys: ['cmd', 'b'], ad: 'Kalın', d: 'Seçili metni kalın yapar. ⌘I italik, ⌘U altı çizili.' },
  { id: 'link', cat: 'metin', keys: ['cmd', 'k'], ad: 'Bağlantı ekle', d: 'Seçili metne link ekler (Notlar, Mail, Slack, Notion…).' },
  { id: 'ctrla', cat: 'metin', keys: ['ctrl', 'a'], alt: [['ctrl', 'e']], ad: 'Satır başı / sonu (gizli yol)', d: 'Terminal dahil her yerde çalışan eski usul satır başı / sonu.' },
  { id: 'ctrlk', cat: 'metin', keys: ['ctrl', 'k'], ad: 'Satır sonuna kadar kes', d: 'İmleçten satır sonuna kadar keser. ⌃Y ile geri yapıştırırsın.' },
  { id: 'ctrlt', cat: 'metin', keys: ['ctrl', 't'], ad: 'Harflerin yerini değiştir', d: 'İmlecin iki yanındaki harfleri takas eder. Yazım hatası kurtarıcı.' },
  { id: 'define', cat: 'metin', keys: ['ctrl', 'cmd', 'd'], ad: 'Sözlükte bak', d: 'İmlecin altındaki kelimenin tanımını gösterir.', pad: "Kelimeye üç parmakla dokun ya da sert bas" },
  { id: 'spell', cat: 'metin', keys: ['cmd', ';'], ad: 'Yazım hatası bul', d: 'Belgedeki bir sonraki yanlış yazılmış kelimeye gider.' },

  // ── Emoji & özel karakter ────────────────────────────
  { id: 'emoji', cat: 'emoji', keys: ['ctrl', 'cmd', 'space'], alt: [['fn', 'e']], ad: 'Emoji paneli', d: 'Emoji ve sembol panelini açar. Yazarak emoji arayabilirsin.', pop: true },
  { id: 'charviewer', cat: 'emoji', keys: ['fn', 'fn'], ad: 'Karakter görüntüleyici', d: 'fn / 🌐 tuşuna iki kez bas (Klavye ayarından açılır).' },
  { id: 'at', cat: 'emoji', keys: ['opt', 'q'], ad: '@ işareti', d: 'E-posta ve etiketler için @ yazar.', tr: 'Türkçe Q klavye. ABD klavyede ⇧2.', pop: true },
  { id: 'hash', cat: 'emoji', keys: ['opt', '3'], ad: '# işareti', d: 'Hashtag ve kod için # yazar.', tr: 'Türkçe Q klavye. ABD klavyede ⇧3.' },
  { id: 'dollar', cat: 'emoji', keys: ['opt', '4'], ad: '$ işareti', d: 'Dolar işareti yazar.', tr: 'Türkçe Q klavye. ABD klavyede ⇧4.' },
  { id: 'brackets', cat: 'emoji', keys: ['opt', '8'], alt: [['opt', '9']], ad: 'Köşeli parantez [ ]', d: 'Köşeli parantez açar / kapatır.', tr: 'Türkçe Q klavye. (Türkçe Q – Legacy düzeninde ABD gibi düz tuşlar.)' },
  { id: 'curly', cat: 'emoji', keys: ['opt', '7'], alt: [['opt', '0']], ad: 'Süslü parantez { }', d: 'Kod yazarken süslü parantez açar / kapatır.', tr: 'Türkçe Q klavye. ABD klavyede ⇧[ / ⇧].' },
  { id: 'backslash', cat: 'emoji', keys: ['opt', '*'], ad: 'Ters eğik çizgi \\', d: 'Ters eğik çizgi yazar. 0’ın sağındaki * tuşuyla.', tr: 'Türkçe Q klavye. | için ⌥ + - tuşu.' },
  { id: 'tilde', cat: 'emoji', keys: ['opt', 'n'], ad: '~ işareti', d: 'Tilde yazar (~/Downloads gibi yollar için).', tr: 'Türkçe Q klavye.' },
  { id: 'lira', cat: 'emoji', keys: ['opt', 't'], ad: '₺ işareti', d: 'Türk lirası simgesini yazar.', tr: 'Türkçe Q klavye.' },
  { id: 'euro', cat: 'emoji', keys: ['opt', 'e'], ad: '€ işareti', d: 'Euro simgesini yazar.', tr: 'Türkçe Q klavye.' },
  { id: 'applelogo', cat: 'emoji', keys: ['opt', 'shift', 'k'], ad: ' Apple logosu', d: 'Apple logosunu yazar. Sadece Apple cihazlarda görünür 😉' },
  { id: 'inputsrc', cat: 'emoji', keys: ['ctrl', 'space'], ad: 'Klavye dilini değiştir', d: 'Türkçe ↔ İngilizce klavye arasında geçer (birden fazla dil ekliyse).' },

  // ── Pencere & uygulama ───────────────────────────────
  { id: 'cmdtab', cat: 'pencere', keys: ['cmd', 'tab'], ad: 'Uygulama değiştir', d: 'Açık uygulamalar arasında geçer. ⌘’i bırakmadan Tab’a basmaya devam et.', pop: true },
  { id: 'cmdtick', cat: 'pencere', keys: ['cmd', '`'], ad: 'Aynı uygulamanın pencereleri', d: 'Aynı uygulamanın iki penceresi arasında geçer.', tr: 'Türkçe Q’da: ⌘ + sol ⇧’nin yanındaki < tuşu.' },
  { id: 'closewin', cat: 'pencere', keys: ['cmd', 'w'], ad: 'Pencere / sekme kapat', d: 'Öndeki pencereyi ya da sekmeyi kapatır. Uygulama açık kalır.' },
  { id: 'closeall', cat: 'pencere', keys: ['opt', 'cmd', 'w'], ad: 'Tüm pencereleri kapat', d: 'Uygulamanın tüm pencerelerini kapatır.' },
  { id: 'quit', cat: 'pencere', keys: ['cmd', 'q'], ad: 'Uygulamadan çık', d: 'Uygulamayı tamamen kapatır. ⌘W’den farkı bu.', pop: true },
  { id: 'hide', cat: 'pencere', keys: ['cmd', 'h'], ad: 'Uygulamayı gizle', d: 'Uygulamayı kapatmadan gözden kaldırır.' },
  { id: 'minimizeall', cat: 'pencere', keys: ['opt', 'cmd', 'm'], ad: 'Hepsini küçült', d: 'Uygulamanın tüm pencerelerini Dock’a indirir.' },
  { id: 'hideothers', cat: 'pencere', keys: ['opt', 'cmd', 'h'], ad: 'Diğerlerini gizle', d: 'Öndeki hariç tüm uygulamaları gizler. Odaklanma modu.' },
  { id: 'minimize', cat: 'pencere', keys: ['cmd', 'm'], ad: 'Küçült', d: 'Pencereyi Dock’a küçültür. ⌥⌘M uygulamanın hepsini.' },
  { id: 'forcequit', cat: 'pencere', keys: ['opt', 'cmd', 'esc'], ad: 'Zorla çık', d: 'Donan uygulamayı kapatmak için Zorla Çık penceresini açar.', pop: true },
  { id: 'fullscreen', cat: 'pencere', keys: ['ctrl', 'cmd', 'f'], alt: [['fn', 'f']], ad: 'Tam ekran', d: 'Uygulamayı tam ekrana alır / çıkarır.' },
  { id: 'tileleft', cat: 'pencere', keys: ['fn', 'ctrl', 'left'], alt: [['fn', 'ctrl', 'right']], ad: 'Pencereyi sola / sağa yasla', d: 'Ekranı ikiye böl (macOS 15 ve sonrası). fn⌃↑ / fn⌃↓ üst / alt yarı.' },
  { id: 'tilefill', cat: 'pencere', keys: ['fn', 'ctrl', 'f'], ad: 'Pencereyi ekrana yay', d: 'Pencere ekranı doldurur (tam ekran olmadan). fn⌃C ortalar.' },
  { id: 'tilerestore', cat: 'pencere', keys: ['fn', 'ctrl', 'r'], ad: 'Önceki boyuta dön', d: 'Yasladığın pencereyi eski boyutuna döndürür.' },
  { id: 'missionctl', cat: 'pencere', keys: ['ctrl', 'up'], ad: 'Mission Control', d: 'Tüm açık pencereleri ve masaüstlerini kuşbakışı gösterir.', pad: "Üç (ya da dört) parmakla yukarı kaydır" },
  { id: 'appexpose', cat: 'pencere', keys: ['ctrl', 'down'], ad: 'Uygulamanın pencereleri', d: 'Öndeki uygulamanın tüm pencerelerini yan yana gösterir.', pad: "Üç (ya da dört) parmakla aşağı kaydır" },
  { id: 'spaces', cat: 'pencere', keys: ['ctrl', 'left'], alt: [['ctrl', 'right']], ad: 'Masaüstü değiştir', d: 'Masaüstleri (Spaces) ve tam ekran uygulamalar arasında kayar.', pad: "Üç (ya da dört) parmakla sola / sağa kaydır" },
  { id: 'showdesktop', cat: 'pencere', keys: ['fn', 'h'], ad: 'Masaüstünü göster', d: 'Tüm pencereleri kenara iter, masaüstünü gösterir.', pad: "Başparmağını ve üç parmağını birbirinden aç" },

  // ── Sistem & ekran görüntüsü ─────────────────────────
  { id: 'spotlight', cat: 'sistem', keys: ['cmd', 'space'], ad: 'Spotlight', d: 'Uygulama aç, dosya bul, hesap yap, birim çevir. Mac’in komuta merkezi.', pop: true },
  { id: 'ssfull', cat: 'sistem', keys: ['shift', 'cmd', '3'], ad: 'Tüm ekranın görüntüsü', d: 'Ekranın tamamını masaüstüne kaydeder.' },
  { id: 'ssarea', cat: 'sistem', keys: ['shift', 'cmd', '4'], ad: 'Alan seçerek ekran görüntüsü', d: 'Sürükleyerek seçtiğin alanı kaydeder.', pop: true },
  { id: 'sswindow', cat: 'sistem', keys: ['shift', 'cmd', '4'], then: ['space'], ad: 'Pencerenin ekran görüntüsü', d: '⇧⌘4’ten sonra Space’e bas, bir pencereye tıkla. Gölgesiyle birlikte.' },
  { id: 'ssclip', cat: 'sistem', keys: ['ctrl', 'shift', 'cmd', '4'], ad: 'Ekran görüntüsünü panoya al', d: 'Dosya oluşturmaz, direkt kopyalar. Sonra ⌘V ile istediğin yere yapıştır.', pop: true },
  { id: 'sstool', cat: 'sistem', keys: ['shift', 'cmd', '5'], ad: 'Ekran görüntüsü & kayıt aracı', d: 'Ekran kaydı dahil tüm seçenekleri ve kayıt yerini ayarlar.' },
  { id: 'lock', cat: 'sistem', keys: ['ctrl', 'cmd', 'q'], ad: 'Ekranı kilitle', d: 'Masadan kalkarken bas. Touch ID’li Mac’lerde güç tuşuna basmak da kilitler.', pop: true },
  { id: 'screensleep', cat: 'sistem', keys: ['ctrl', 'shift', 'power'], ad: 'Ekranı uyut', d: 'Ekranı anında kapatır, Mac açık kalır (Touch ID’siz klavyelerde).' },
  { id: 'logout', cat: 'sistem', keys: ['shift', 'cmd', 'q'], ad: 'Oturumu kapat', d: 'Onay sorarak oturumu kapatır.' },
  { id: 'dockhide', cat: 'sistem', keys: ['opt', 'cmd', 'd'], ad: 'Dock’u gizle / göster', d: 'Dock’u otomatik gizlemeyi açar / kapatır. Ekranda yer kazandırır.' },
  { id: 'fnquicknote', cat: 'sistem', keys: ['fn', 'q'], ad: 'Hızlı Not', d: 'Hangi uygulamadaysan üstüne küçük bir not açar.' },
  { id: 'fnnotif', cat: 'sistem', keys: ['fn', 'n'], ad: 'Bildirim Merkezi', d: 'Bildirimleri ve widget’ları açar.', pad: "İki parmakla sağ kenardan sola kaydır" },
  { id: 'fncontrol', cat: 'sistem', keys: ['fn', 'c'], ad: 'Denetim Merkezi', d: 'Wi-Fi, Bluetooth, ses, parlaklık kontrolleri.' },
  { id: 'fndock', cat: 'sistem', keys: ['fn', 'a'], ad: 'Dock’u göster', d: 'Gizli Dock’u çağırır.' },
  { id: 'fnapps', cat: 'sistem', keys: ['fn', 'shift', 'a'], ad: 'Uygulamalar', d: 'Uygulamalar ekranını (eski adıyla Launchpad) açar.', pad: "Başparmağını ve üç parmağını birleştir (kıstır)" },
  { id: 'fndictation', cat: 'sistem', keys: ['fn', 'd'], ad: 'Dikte', d: 'Konuşarak yazmayı başlatır / durdurur.' },
  { id: 'volfine', cat: 'sistem', keys: ['opt', 'shift', 'vol'], ad: 'Sesi ince ayarla', d: 'Sesi çeyrek adımlarla açar / kısar. Parlaklık tuşlarıyla da çalışır.' },
  { id: 'volsettings', cat: 'sistem', keys: ['opt', 'vol'], ad: 'Ses ayarlarını aç', d: '⌥ + ses tuşu Ses ayarlarını, ⌥ + parlaklık Ekran ayarlarını açar.' },

  // ── Finder ───────────────────────────────────────────
  { id: 'quicklook', cat: 'finder', keys: ['space'], ad: 'Hızlı Bakış', d: 'Dosyayı açmadan önizler. PDF, video, görsel… hepsi.', pop: true, pad: "Dosyaya sert bas (Force Click)" },
  { id: 'hidden', cat: 'finder', keys: ['shift', 'cmd', '.'], ad: 'Gizli dosyaları göster', d: '.env, .git gibi gizli dosyaları gösterir / gizler.', pop: true },
  { id: 'trash', cat: 'finder', keys: ['cmd', 'delete'], ad: 'Çöpe at', d: 'Seçili dosyayı Çöp Sepeti’ne taşır.' },
  { id: 'emptytrash', cat: 'finder', keys: ['shift', 'cmd', 'delete'], ad: 'Çöpü boşalt', d: 'Onay sorarak Çöp Sepeti’ni boşaltır.' },
  { id: 'move', cat: 'finder', keys: ['opt', 'cmd', 'v'], ad: 'Taşı (kes-yapıştır)', d: 'Önce ⌘C ile kopyala, sonra ⌥⌘V ile taşı. Mac’te dosya kesme budur.' },
  { id: 'goto', cat: 'finder', keys: ['shift', 'cmd', 'g'], ad: 'Klasöre git', d: 'Yol yazarak herhangi bir klasöre atla (~/Library gibi).' },
  { id: 'newfolder', cat: 'finder', keys: ['shift', 'cmd', 'n'], ad: 'Yeni klasör', d: 'Bulunduğun yerde yeni klasör oluşturur.' },
  { id: 'rename', cat: 'finder', keys: ['return'], ad: 'Yeniden adlandır', d: 'Seçili dosyanın adını düzenlemeye başlar.' },
  { id: 'info', cat: 'finder', keys: ['cmd', 'i'], ad: 'Bilgi Al', d: 'Dosya boyutu, tarih, izinler.' },
  { id: 'duplicate', cat: 'finder', keys: ['cmd', 'd'], ad: 'Çoğalt', d: 'Seçili dosyanın kopyasını aynı yere oluşturur.' },
  { id: 'openitem', cat: 'finder', keys: ['cmd', 'down'], ad: 'Aç', d: 'Seçili dosyayı / klasörü açar. ⌘↑ üst klasöre çıkar.' },
  { id: 'views', cat: 'finder', keys: ['cmd', '1'], ad: 'Görünüm değiştir', d: '⌘1 simge, ⌘2 liste, ⌘3 sütun, ⌘4 galeri.' },
  { id: 'copypath', cat: 'finder', keys: ['opt', 'cmd', 'c'], ad: 'Dosya yolunu kopyala', d: 'Seçili dosyanın tam yolunu metin olarak kopyalar.' },
  { id: 'downloads', cat: 'finder', keys: ['opt', 'cmd', 'l'], ad: 'İndirilenler', d: 'İndirilenler klasörünü açar.' },
  { id: 'desktopfolder', cat: 'finder', keys: ['shift', 'cmd', 'd'], ad: 'Masaüstü klasörü', d: 'Masaüstü klasörünü açar. ⇧⌘H ana klasör, ⇧⌘O Belgeler.' },
  { id: 'appsfolder', cat: 'finder', keys: ['shift', 'cmd', 'a'], ad: 'Uygulamalar klasörü', d: 'Uygulamalar klasörünü açar.' },
  { id: 'airdrop', cat: 'finder', keys: ['shift', 'cmd', 'r'], ad: 'AirDrop', d: 'AirDrop penceresini açar.' },
  { id: 'pathbar', cat: 'finder', keys: ['opt', 'cmd', 'p'], ad: 'Yol çubuğu', d: 'Pencerenin altında klasör yolunu gösterir.' },
  { id: 'finderback', cat: 'finder', keys: ['cmd', '['], alt: [['cmd', ']']], ad: 'Geri / ileri', d: 'Önceki / sonraki klasöre gider.', tr: 'Türkçe Q’da [ için ⌥ gerekir; ⌘↑ ile üst klasöre çıkmak daha kolay.' },

  // ── Tarayıcı ─────────────────────────────────────────
  { id: 'newtab', cat: 'tarayici', keys: ['cmd', 't'], ad: 'Yeni sekme', d: 'Yeni sekme açar.' },
  { id: 'reopentab', cat: 'tarayici', keys: ['shift', 'cmd', 't'], ad: 'Kapattığın sekmeyi geri aç', d: 'Yanlışlıkla kapattığın sekmeyi geri getirir. Tekrar bastıkça öncekiler gelir.', pop: true },
  { id: 'address', cat: 'tarayici', keys: ['cmd', 'l'], ad: 'Adres çubuğuna git', d: 'Adresi seçer, yazmaya hazır.' },
  { id: 'reload', cat: 'tarayici', keys: ['cmd', 'r'], ad: 'Yenile', d: 'Sayfayı yeniler. ⇧⌘R önbelleği atlayarak.' },
  { id: 'nexttab', cat: 'tarayici', keys: ['ctrl', 'tab'], alt: [['ctrl', 'shift', 'tab']], ad: 'Sonraki / önceki sekme', d: 'Sekmeler arasında sırayla gezer.' },
  { id: 'tabn', cat: 'tarayici', keys: ['cmd', '1'], ad: 'N. sekmeye git', d: '⌘1…⌘8 o sıradaki sekmeye, ⌘9 son sekmeye atlar.' },
  { id: 'zoom', cat: 'tarayici', keys: ['cmd', '+'], alt: [['cmd', '-'], ['cmd', '0']], ad: 'Yakınlaştır / uzaklaştır', d: 'Sayfayı büyütür, küçültür. ⌘0 sıfırlar.', pad: "İki parmağını aç / kıstır" },
  { id: 'cmdclick', cat: 'tarayici', keys: ['cmd', 'click'], ad: 'Linki arka sekmede aç', d: 'Okuduğun sayfadan çıkmadan linki yeni sekmede açar.' },
  { id: 'bookmark', cat: 'tarayici', keys: ['cmd', 'd'], ad: 'Yer imi ekle', d: 'Sayfayı yer imlerine ekler.' },
  { id: 'history', cat: 'tarayici', keys: ['cmd', 'y'], ad: 'Geçmiş', d: 'Tarayıcı geçmişini açar.' },
  { id: 'private', cat: 'tarayici', keys: ['shift', 'cmd', 'n'], ad: 'Gizli pencere', d: 'Gizli / özel tarama penceresi açar.' },
  { id: 'devtools', cat: 'tarayici', keys: ['opt', 'cmd', 'i'], ad: 'Geliştirici araçları', d: 'Sayfanın kodunu ve konsolu açar.' },
  { id: 'browserback', cat: 'tarayici', keys: ['cmd', 'left'], alt: [['cmd', 'right']], ad: 'Geri / ileri', d: 'Önceki / sonraki sayfaya gider (metin kutusunda değilken). ⌘[ / ⌘] de olur.', pad: "İki parmakla sola / sağa kaydır" },
  { id: 'tabarrows', cat: 'tarayici', keys: ['opt', 'cmd', 'right'], alt: [['opt', 'cmd', 'left']], ad: 'Sonraki / önceki sekme (oklarla)', d: 'Chrome ve Safari’de sekmeler arasında oklarla gezer.' },

  // ── Erişilebilirlik ─────────────────────────────────
  { id: 'a11ypanel', cat: 'erisim', keys: ['opt', 'cmd', 'f5'], ad: 'Erişilebilirlik paneli', d: 'Erişilebilirlik kısayolları panelini açar. Touch ID’ye üç kez basmak da açar.' },
  { id: 'invert', cat: 'erisim', keys: ['ctrl', 'opt', 'cmd', '8'], ad: 'Renkleri ters çevir', d: 'Ekran renklerini ters çevirir (Ayarlar’dan açılması gerekebilir).' },
  { id: 'tabfocus', cat: 'erisim', keys: ['tab'], alt: [['shift', 'tab']], ad: 'Sonraki alan', d: 'Formlarda ve pencerelerde bir sonraki / önceki kontrole geçer.' },
  { id: 'focusmenu', cat: 'erisim', keys: ['ctrl', 'f2'], ad: 'Menü çubuğuna odaklan', d: 'Menü çubuğunu klavyeyle kullanmanı sağlar (fn⌃F2 da olur).' }
];

/* ── Öğrenme akışı (MVP) ──────────────────────────────
 * check tipleri:
 *  combo     : tarayıcının görebildiği tuş kombinasyonu (times: kaç kez)
 *  emoji     : alana emoji girildi mi
 *  char      : alana belirli karakter girildi mi
 *  away      : sayfa odağı kaybetti ve geri döndü (Spotlight, ⌘Tab gibi işletim sistemi kısayolları)
 *  resize    : pencere boyutu değişti (tam ekran, döşeme, yakınlaştırma)
 *  tabClose  : açılan deneme sekmesi kapatıldı
 *  tabReopen : deneme sekmesi kapatılıp geri açıldı
 *  reload    : sayfa yenilendi
 *  imagePaste: alana görsel yapıştırıldı
 *  metaClick : ⌘ ile linke tıklandı
 *  manual    : tarayıcı göremiyor, kullanıcı “Yaptım” der
 *  info      : sadece bilgi, “Anladım”
 */
window.KS_CHAPTERS = [
  { id: 'sart', ad: 'Olmazsa olmaz', alt: 'Bilince “vay” dediklerin, en başta' },
  { id: 'gunluk', ad: 'Günlük hız', alt: 'Her gün onlarca kez basacakların' },
  { id: 'ekran', ad: 'Ekran ustası', alt: 'Ekran görüntüsü, pencere, sekme' },
  { id: 'merakli', ad: 'Meraklısına', alt: 'Bilen az, bilmesen de olur' },
  { id: 'finder', ad: "Elle denenecekler", alt: "Tarayıcı göremiyor; dene, Space ile geç" }
];

const KS_LOREM = 'Fareye uzanmak yerine iki tuşa basmak, günde yüzlerce saniye demek.';

window.KS_LESSONS = [
  // Temeller
  { id: 'l-copy', ch: 'temel', sc: 'copy', gorev: 'Metin zaten seçili. Şimdi ⌘C ile kopyala.', practice: { kind: 'input', value: 'Mac’te her şey ⌘C ile başlar', select: 'all' }, check: { type: 'combo', combos: ['cmd+c'] } },
  { id: 'l-paste', ch: 'temel', sc: 'paste', gorev: 'Az önce kopyaladığını kutuya ⌘V ile yapıştır.', practice: { kind: 'input', value: '', placeholder: 'buraya yapıştır…' }, check: { type: 'combo', combos: ['cmd+v'] } },
  { id: 'l-cut', ch: 'temel', sc: 'cut', gorev: 'Seçili metni ⌘X ile kes. Kutu boşalacak.', practice: { kind: 'input', value: 'Bu yazı birazdan yok olacak', select: 'all' }, check: { type: 'combo', combos: ['cmd+x'] } },
  { id: 'l-undo', ch: 'temel', sc: 'undo', gorev: 'Kutuya bir şey yaz, sonra ⌘Z ile geri al.', practice: { kind: 'input', value: '', placeholder: 'bir şey yaz, sonra ⌘Z…' }, check: { type: 'combo', combos: ['cmd+z'] } },
  { id: 'l-redo', ch: 'temel', sc: 'redo', gorev: 'Fikrini mi değiştirdin? ⇧⌘Z ile geri aldığını geri getir.', practice: { kind: 'input', value: '', placeholder: 'yaz → ⌘Z → ⇧⌘Z' }, check: { type: 'combo', combos: ['cmd+shift+z'] } },
  { id: 'l-selectall', ch: 'temel', sc: 'selectall', gorev: 'İmleç metnin içinde. ⌘A ile hepsini seç.', practice: { kind: 'textarea', value: KS_LOREM + '\nİkinci satır da seçilecek.', select: 'end' }, check: { type: 'combo', combos: ['cmd+a'] } },
  { id: 'l-find', ch: 'temel', sc: 'find', gorev: '⌘F ile arama aç. (Bu sayfada arama çubuğunu biz yakalıyoruz.)', practice: { kind: 'none' }, check: { type: 'combo', combos: ['cmd+f'], prevent: true } },
  { id: 'l-save', ch: 'temel', sc: 'save', gorev: '⌘S ile kaydet. Merak etme, bir şey indirmeyeceğiz.', practice: { kind: 'none' }, check: { type: 'combo', combos: ['cmd+s'], prevent: true } },
  { id: 'l-settings', ch: 'temel', sc: 'settings', gorev: '⌘, ile tarayıcının ayarlarını aç, sonra ⌘W ile kapatıp buraya dön.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-pasteplain', ch: 'temel', sc: 'pasteplain', gorev: 'Bir yazı kopyala, ⌥⇧⌘V ile yapıştır: font ve renk gelmez.', practice: { kind: 'input', value: '', placeholder: 'biçimsiz yapıştır…' }, check: { type: 'combo', combos: ['alt+shift+cmd+v'] } },

  // Emoji
  { id: 'l-emoji', ch: 'emoji', sc: 'emoji', gorev: '⌃⌘Space’e bas, bir emoji seç. (🌐 tuşu da açar.)', practice: { kind: 'input', value: '', placeholder: 'buraya bir emoji 👀' }, check: { type: 'emoji' } },
  { id: 'l-at', ch: 'emoji', sc: 'at', gorev: 'Kutuya @ yaz.', practice: { kind: 'input', value: 'merhaba', select: 'end' }, check: { type: 'char', chars: ['@'] } },
  { id: 'l-hash', ch: 'emoji', sc: 'hash', gorev: 'Kutuya # yaz.', practice: { kind: 'input', value: '', placeholder: '#kısayol' }, check: { type: 'char', chars: ['#'] } },
  { id: 'l-lira', ch: 'emoji', sc: 'lira', gorev: 'Kutuya ₺ yaz. Fiyat yazarken artık “TL” yok.', practice: { kind: 'input', value: '99,90 ', select: 'end' }, check: { type: 'char', chars: ['₺'] } },
  { id: 'l-brackets', ch: 'emoji', sc: 'brackets', gorev: 'Kutuya köşeli parantez [ yaz.', practice: { kind: 'input', value: '', placeholder: '[ ]' }, check: { type: 'char', chars: ['[', ']'] } },
  { id: 'l-curly', ch: 'emoji', sc: 'curly', gorev: 'Kutuya { yaz.', practice: { kind: 'input', value: '', placeholder: '{ }' }, check: { type: 'char', chars: ['{', '}'] } },
  { id: 'l-inputsrc', ch: 'emoji', sc: 'inputsrc', gorev: 'Birden fazla klavye dilin varsa ⌃Space ile aralarında geç. Menü çubuğundaki bayrağı izle.', practice: { kind: 'none' }, check: { type: 'manual' } },

  // Metin
  { id: 'l-wordjump', ch: 'metin', sc: 'wordleft', gorev: '⌥← ya da ⌥→ ile 3 kez kelime atla.', practice: { kind: 'textarea', value: KS_LOREM, select: 'end' }, check: { type: 'combo', combos: ['alt+left', 'alt+right'], times: 3 } },
  { id: 'l-linestart', ch: 'metin', sc: 'linestart', gorev: '⌘← ile satır başına, ⌘→ ile satır sonuna git.', practice: { kind: 'textarea', value: KS_LOREM, select: 'middle' }, check: { type: 'combo', combos: ['cmd+left', 'cmd+right'], times: 2 } },
  { id: 'l-docstart', ch: 'metin', sc: 'docstart', gorev: '⌘↑ ile metnin en başına, ⌘↓ ile en sonuna git.', practice: { kind: 'textarea', value: 'Birinci satır.\nİkinci satır.\nÜçüncü satır.\nDördüncü satır.', select: 'middle' }, check: { type: 'combo', combos: ['cmd+up', 'cmd+down'], times: 2 } },
  { id: 'l-selword', ch: 'metin', sc: 'selword', gorev: '⌥⇧← ile son 2 kelimeyi seç.', practice: { kind: 'textarea', value: KS_LOREM, select: 'end' }, check: { type: 'combo', combos: ['alt+shift+left', 'alt+shift+right'], times: 2 } },
  { id: 'l-selline', ch: 'metin', sc: 'selline', gorev: '⇧⌘← ile imleçten satır başına kadar seç.', practice: { kind: 'textarea', value: KS_LOREM, select: 'end' }, check: { type: 'combo', combos: ['shift+cmd+left', 'shift+cmd+right'] } },
  { id: 'l-delword', ch: 'metin', sc: 'delword', gorev: '⌥⌫ ile son 2 kelimeyi sil.', practice: { kind: 'textarea', value: KS_LOREM, select: 'end' }, check: { type: 'combo', combos: ['alt+delete'], times: 2 } },
  { id: 'l-delline', ch: 'metin', sc: 'delline', gorev: '⌘⌫ ile bütün satırı tek seferde sil.', practice: { kind: 'textarea', value: KS_LOREM, select: 'end' }, check: { type: 'combo', combos: ['cmd+delete'] } },
  { id: 'l-fwddel', ch: 'metin', sc: 'fwddel', gorev: 'İmleç başta. fn⌫ ile sağdaki harfleri sil.', practice: { kind: 'textarea', value: 'XXXBu cümlenin başındaki X’leri sil.', select: 'start' }, check: { type: 'combo', combos: ['fwddelete'], times: 2 } },
  { id: 'l-ctrlae', ch: 'metin', sc: 'ctrla', gorev: 'Gizli yol: ⌃A ile satır başına, ⌃E ile satır sonuna git.', practice: { kind: 'textarea', value: KS_LOREM, select: 'middle' }, check: { type: 'combo', combos: ['ctrl+a', 'ctrl+e'], times: 2 } },
  { id: 'l-ctrlt', ch: 'metin', sc: 'ctrlt', gorev: 'İmleç r ile ğ arasında. ⌃T ile iki harfin yerini değiştir, “Doğru” olsun.', practice: { kind: 'input', value: 'Dorğu', select: [3, 3] }, check: { type: 'combo', combos: ['ctrl+t'] } },

  // Pencere
  { id: 'l-cmdtab', ch: 'pencere', sc: 'cmdtab', gorev: '⌘Tab ile başka bir uygulamaya geç, sonra yine ⌘Tab ile buraya dön.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-closewin', ch: 'pencere', sc: 'closewin', gorev: '↩ ile deneme sekmesini aç, orada ⌘W ile kapat.', practice: { kind: 'tab' }, check: { type: 'tabClose' } },
  { id: 'l-newtab', ch: 'pencere', sc: 'newtab', gorev: '⌘T ile yeni sekme aç, sonra ⌘W ile kapatıp buraya dön.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-hide', ch: 'pencere', sc: 'hide', gorev: '⌘H ile tarayıcıyı gizle, sonra ⌘Tab ile geri getir.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-minimize', ch: 'pencere', sc: 'minimize', gorev: '⌘M ile pencereyi Dock’a küçült, sonra Dock’tan geri aç.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-quit', ch: 'pencere', sc: 'quit', gorev: 'Burada deneme 😅 ⌘W pencereyi kapatır, ⌘Q uygulamayı. Kırmızı çarpıya basmak Mac’te uygulamayı kapatmaz.', practice: { kind: 'none' }, check: { type: 'info' } },
  { id: 'l-forcequit', ch: 'pencere', sc: 'forcequit', gorev: '⌥⌘Esc ile Zorla Çık penceresini aç, Esc ile kapat ve geri dön. Donan uygulamalar için.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-fullscreen', ch: 'pencere', sc: 'fullscreen', gorev: '⌃⌘F ile tam ekrana geç, tekrar basıp çık.', practice: { kind: 'none' }, check: { type: 'resize', mods: ['ctrl', 'meta'], combos: ['ctrl+cmd+f'] } },
  { id: 'l-tile', ch: 'pencere', sc: 'tileleft', gorev: 'fn⌃← ile pencereyi sola yasla, fn⌃R ile eski boyutuna döndür. (macOS 15+)', practice: { kind: 'none' }, check: { type: 'resize', mods: ['ctrl'] } },
  { id: 'l-mission', ch: 'pencere', sc: 'missionctl', gorev: '⌃↑ ile tüm pencereleri kuşbakışı gör, tekrar basıp kapat.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-spaces', ch: 'pencere', sc: 'spaces', gorev: 'Birden fazla masaüstün ya da tam ekran uygulaman varsa ⌃← / ⌃→ ile aralarında kay.', practice: { kind: 'none' }, check: { type: 'manual' } },

  // Sistem
  { id: 'l-spotlight', ch: 'sistem', sc: 'spotlight', gorev: '⌘Space ile Spotlight’ı aç, “125*4” yaz (hesap makinesi!), Esc ile kapat.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-ssarea', ch: 'sistem', sc: 'ssarea', gorev: '⇧⌘4 ile bir alan seç. Görüntü masaüstüne kaydedilecek. (Vazgeçmek için Esc.)', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-ssclip', ch: 'sistem', sc: 'ssclip', gorev: '⌃⇧⌘4 ile ekrandan bir alan seç (panoya gider), sonra ⌘V ile buraya yapıştır.', practice: { kind: 'paste' }, check: { type: 'imagePaste' } },
  { id: 'l-sswindow', ch: 'sistem', sc: 'sswindow', gorev: '⇧⌘4’e bas, sonra Space: imleç kameraya dönüşür. Bir pencereye tıkla.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-sstool', ch: 'sistem', sc: 'sstool', gorev: '⇧⌘5 ile ekran görüntüsü ve ekran kaydı aracını aç. Esc ile kapat.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-lock', ch: 'sistem', sc: 'lock', gorev: '⌃⌘Q ile ekranı kilitle, şifrenle geri dön. (Şimdi istemiyorsan esc ile geç.)', practice: { kind: 'none' }, check: { type: 'away', mods: ['ctrl', 'meta'] } },
  { id: 'l-fn', ch: 'sistem', sc: 'fnquicknote', gorev: 'fn+Q’ya bas: Hızlı Not açılır. (fn+N bildirimler, fn+C Denetim Merkezi.)', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-volfine', ch: 'sistem', sc: 'volfine', gorev: '⌥⇧ basılı tut, ses tuşuna bas: ses minik adımlarla değişir.', practice: { kind: 'none' }, check: { type: 'manual' } },

  // Tarayıcı
  { id: 'l-address', ch: 'tarayici', sc: 'address', gorev: '⌘L ile adres çubuğuna git, sonra sayfaya geri tıkla.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },
  { id: 'l-reopen', ch: 'tarayici', sc: 'reopentab', gorev: '↩ ile deneme sekmesini aç, ⌘W ile kapat, sonra ⇧⌘T ile geri getir.', practice: { kind: 'tab' }, check: { type: 'tabReopen' } },
  { id: 'l-reload', ch: 'tarayici', sc: 'reload', gorev: '⌘R ile sayfayı yenile. Kaldığın yer kaybolmaz, söz.', practice: { kind: 'none' }, check: { type: 'reload' } },
  { id: 'l-zoom', ch: 'tarayici', sc: 'zoom', gorev: '⌘+ ile yakınlaştır, ⌘- ile uzaklaştır, ⌘0 ile sıfırla.', practice: { kind: 'none' }, check: { type: 'resize', mods: ['meta'] } },
  { id: 'l-cmdclick', ch: 'tarayici', sc: 'cmdclick', gorev: '⌘ basılıyken aşağıdaki linke tıkla: arka planda yeni sekmede açılır.', practice: { kind: 'link' }, check: { type: 'metaClick' } },
  { id: 'l-nexttab', ch: 'tarayici', sc: 'nexttab', gorev: '⌃Tab ile sonraki sekmeye geç, ⌃⇧Tab ile geri dön.', practice: { kind: 'none' }, check: { type: 'away', mods: ['ctrl', 'meta'] } },
  { id: 'l-private', ch: 'tarayici', sc: 'private', gorev: '⇧⌘N ile gizli pencere aç, ⌘W ile kapatıp dön.', practice: { kind: 'none' }, check: { type: 'away', mods: ['meta'] } },

  // Finder
  { id: 'l-quicklook', ch: 'finder', sc: 'quicklook', gorev: 'Finder’da bir dosya seç ve Space’e bas. Açmadan önizle.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-hidden', ch: 'finder', sc: 'hidden', gorev: 'Finder’da ⇧⌘. ile gizli dosyaları göster, tekrar basıp gizle.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-move', ch: 'finder', sc: 'move', gorev: 'Mac’te dosya kesme: dosyayı ⌘C ile kopyala, hedef klasörde ⌥⌘V ile taşı.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-goto', ch: 'finder', sc: 'goto', gorev: 'Finder’da ⇧⌘G’ye bas, “~/Downloads” yaz, Return.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-rename', ch: 'finder', sc: 'rename', gorev: 'Bir dosya seç, Return’e bas, yeni adını yaz.', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-trash', ch: 'finder', sc: 'trash', gorev: 'Silinecek bir dosya seç, ⌘⌫ ile çöpe at. (⌘Z geri getirir!)', practice: { kind: 'none' }, check: { type: 'manual' } },
  { id: 'l-copypath', ch: 'finder', sc: 'copypath', gorev: 'Bir dosya seç, ⌥⌘C ile tam yolunu kopyala, buraya yapıştır.', practice: { kind: 'input', value: '', placeholder: '/Users/…' }, check: { type: 'char', chars: ['/'] } }
];

/* ── Ders sırası: önem sırasına göre ───────────────────
 * Önem = günlük hayatta kazandırdığı zaman × ne kadar az bilindiği.
 * Sırayı değiştirmek için sadece bu listeyi düzenle. Listede olmayan ders gösterilmez.
 */
window.KS_ORDER = {
  sart: ['l-copy', 'l-paste', 'l-emoji', 'l-at', 'l-spotlight', 'l-ssclip', 'l-undo', 'l-redo', 'l-delword', 'l-wordjump', 'l-cmdtab', 'l-closewin', 'l-reopen', 'l-forcequit'],
  gunluk: ['l-linestart', 'l-delline', 'l-selword', 'l-selline', 'l-selectall', 'l-cut', 'l-find', 'l-newtab', 'l-address', 'l-cmdclick', 'l-hash', 'l-lira', 'l-lock', 'l-hide'],
  ekran: ['l-sstool', 'l-fullscreen', 'l-tile', 'l-nexttab', 'l-reload', 'l-zoom', 'l-docstart', 'l-fwddel', 'l-settings'],
  merakli: ['l-brackets', 'l-curly', 'l-private', 'l-minimize', 'l-ctrlae', 'l-ctrlt', 'l-pasteplain', 'l-copypath'],
  finder: ['l-quit', 'l-ssarea', 'l-sswindow', 'l-mission', 'l-spaces', 'l-fn', 'l-volfine', 'l-quicklook', 'l-move', 'l-rename', 'l-trash', 'l-hidden', 'l-goto']
};
(function () {
  const byId = Object.fromEntries(window.KS_LESSONS.map(l => [l.id, l]));
  const out = [];
  for (const ch in window.KS_ORDER) window.KS_ORDER[ch].forEach(id => { const l = byId[id]; if (l) { l.ch = ch; out.push(l); } });
  window.KS_LESSONS = out;
})();
