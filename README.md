# 📦 Eteration E-Commerce Web Application

Bu proje, modern bir e-ticaret uygulaması oluşturmayı hedeflemektedir. Kullanıcılar ürünleri listeleyebilir, filtreleyebilir, sepete ekleyebilir ve sepetlerini görüntüleyebilir. Uygulama, kullanıcı deneyimini ön planda tutarak responsive bir tasarımla geliştirilmiştir ve mobil, tablet ve masaüstü cihazlarla uyumlu çalışır.

## 📝 Proje Planlaması

### Projenin Başlangıcı:
- Projeye başlamadan önce, kullanıcı deneyimini en üst düzeye çıkarmayı amaçlayan bir tasarım planı oluşturuldu.
- Uygulamanın temel fonksiyonları tanımlandı: Ürün listeleme, filtreleme, sepet yönetimi, ürün arama ve sıralama.
- Redux kullanılarak global state yönetimi yapılması kararlaştırıldı.

### Yapı Planlaması:
- **Component bazlı** bir yapı kurularak, her bir bileşenin sorumlulukları net bir şekilde belirlendi.
- Tasarım, **mobile-first** prensibi ile planlandı.
- Ürünlerin ve filtrelerin yönetimi için bir mock API entegrasyonu planlandı.

## 🛠️ Kullanılan Teknolojiler ve Araçlar
- **Next.js**: Sayfa yönlendirmeleri, dinamik sayfalar ve performans optimizasyonları için.
- **React**: Component bazlı yapı ve kullanıcı etkileşimleri için.
- **Redux Toolkit**: Global state yönetimi ve veri akışını sağlamak için.
- **Tailwind CSS**: Hızlı ve verimli stil vermek, responsive tasarım sağlamak için.
- **Framer Motion**: Animasyonlar ve geçişler için.

## 📁 Proje Yapısı ve Component Ayrımı

```bash
📂 e-commerce-app
├── 📂 components
│   ├── Header.tsx
│   ├── Filters.tsx
│   ├── ProductList.tsx
│   ├── Cart.tsx
│   ├── ProductDetail.tsx
├── 📂 features
│   ├── 📂 cart
│   │   └── cartSlice.ts
│   ├── 📂 product
│   │   └── productSlice.ts
├── 📂 pages
│   ├── 📂 products
│   │   └── [id]
│   │       └── page.tsx
├── 📂 store
│   └── store.ts
├── 📂 public
│   └── images
│       └── ...
├── 📂 styles
│   └── globals.css
├── tailwind.config.js
└── README.md
```


## 🚀 Geliştirme Süreçleri
Component Geliştirme:
Proje Header, Filters, ProductList, ve Cart gibi temel bileşenlere ayrıldı.
Her bir component, kendi işlevine odaklanacak şekilde geliştirildi.
Header kullanıcı bilgilerini, sepet simgesini ve arama çubuğunu içerirken, Filters bileşeni ürünleri sıralama ve filtreleme işlemlerini içerdi.
Redux Yapısının Oluşturulması:
productSlice.ts: Ürün verilerinin API'den çekilmesi, filtreleme ve sıralama işlemleri burada yönetildi.
cartSlice.ts: Sepete ürün ekleme, sepetin yönetimi ve localStorage ile senkronize edilmesi sağlandı.
Responsive Tasarım ve Tailwind CSS:
Tailwind CSS kullanılarak, hızlı bir şekilde stil verildi.
Mobil cihazlar için filtre ve sepetlerin modal olarak açılması sağlandı.
Masaüstü cihazlarda filtrelerin sidebar olarak görünmesi ve sepetin sağda sabit durması sağlandı.
Ürün Listeleme ve Filtreleme:
Ürünler ProductList bileşeninde listelendi ve sayfalama (ReactPaginate) kullanılarak 12 ürünlük gruplar halinde görüntülendi.
Arama, sıralama ve filtreleme işlemleri Filters bileşeni aracılığıyla yapıldı ve Redux state'e göre ProductList güncellendi.

## 🎨 Tasarım Yaklaşımı ve Düşüncesi
Mobile-First Design: İlk olarak mobil cihazlarda kullanıcı deneyimi düşünülerek tasarım yapıldı, ardından daha büyük ekranlar için optimize edildi.
Kullanıcı Odaklı Tasarım: Kullanıcıların kolayca ürün arayabilmesi, filtreleyebilmesi ve sepete ekleyebilmesi için sade ve anlaşılır bir arayüz tasarlandı.
Modern ve Şık Görünüm: Tailwind CSS kullanılarak modern ve şık bir arayüz elde edildi. Renkler ve tipografi kullanıcıyı yormayacak şekilde ayarlandı.

## ⚙️ Kurulum ve Çalıştırma
Bu projeyi klonlayın:
git clone https://github.com/cbartuk/eteration-e-commerce.git

Gerekli bağımlılıkları yükleyin:
npm install

Geliştirme sunucusunu çalıştırın:
npm run dev


📊 Görseller ve Çizimler
Aşağıdaki diyagramda, projenin temel bileşenlerinin nasıl bir araya geldiği ve Redux state yönetimi ile nasıl çalıştığı gösterilmiştir:

```bash
+----------------------------+
|          Header            |
+----------------------------+
       /                \
      /                  \
+----------------+   +-----------------+
|    Filters     |   |   ProductList   |
+----------------+   +-----------------+
         \                /
          \              /
    +---------------------------+
    |       ProductSlice        |
    +---------------------------+
                  |
    +---------------------------+
    |         CartSlice         |
    +---------------------------+
                  |
    +---------------------------+
    |       LocalStorage        |
    +---------------------------+
```

