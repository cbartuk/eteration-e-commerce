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
# Test Süreci ve Yapılandırma 🧪
## 🚀 Giriş
Projede React bileşenleri ve Redux yapısı için testler gerçekleştirdik. Jest ve React Testing Library kullanarak, her bir işlevselliği ve kullanıcı etkileşimlerini doğrulayan kapsamlı test senaryoları hazırlandı.

## 📚 Test Süreci
1. Redux Slice'larının Test Edilmesi
Amaç: productSlice ve cartSlice'in doğru bir şekilde çalıştığından emin olmak.
Yapılanlar: Asenkron işlemler ve reducer'ların başlangıç durumlarını test edildi.
Sonuç: Ürünlerin ve sepet işlemlerinin doğru şekilde güncellendiği doğrulandı.
2. Bileşen Testleri
Amaç: ProductList ve Header gibi bileşenlerin doğru bir şekilde render edilip edilmediğini test etmek.
Yapılanlar: Mock edilmiş bir Redux store kullanarak, bileşenlerin belirli verilerle nasıl tepki verdiğini test edildi.
Sonuç: Bileşenler, sağlanan verilerle beklenen çıktıyı verdi.
3. JSX Hatalarının Çözülmesi 🛠️
Karşılaşılan Sorun: Jest'in bazı JSX yapıları ayrıştırırken Unexpected token '<' hatası vermesi.
Çözüm: Jest'in yapılandırmasında transformIgnorePatterns ve TypeScript ayarlarını düzenleyerek bu sorun çözüldü.
Sonuç: Testler, JSX hatası olmadan çalışmaya başladı.
4. Filtreleme ve Arama Fonksiyonelliği
Amaç: Filters bileşeninde yapılan seçimlerin ProductList'i doğru bir şekilde güncellemesini sağlamak.
Yapılanlar: Redux'da filtreleme aksiyonlarını düzeltildi ve filtre değişikliklerinin anında bileşenlere yansımasını sağlandı.
Sonuç: Filtreler etkin bir şekilde çalışarak ürün listesine yansıdı.
5. UI Etkileşim Testleri 🖱️
Amaç: Kullanıcı etkileşimlerini (örneğin: filtreleme, sıralama, sepete ürün ekleme) doğru bir şekilde simüle etmek.
Yapılanlar: Filtreleme ve sıralama kutularına tıklama, arama ve sepete ekleme gibi kullanıcı aksiyonlarını test edildi.
Sonuç: Kullanıcı etkileşimleri beklenen sonuçları verdi.
## ✅ Test Sonuçları
Testlerimiz başarıyla tamamlandı ve aşağıdaki sonuçlar alındı:

```bash
PASS  features/cart/cartSlice.test.ts
PASS  features/product/productSlice.test.ts
PASS  components/ProductList.test.tsx
PASS  components/Header.test.tsx
```

# 📄 Testlerde Dinamik Mock Veri Kullanımı
Bu projede, testlerin doğruluğunu ve güvenilirliğini artırmak amacıyla faker.js kullanılarak dinamik mock veriler oluşturulmuştur. Bu yöntem, testlerin her çalıştırıldığında rastgele veri ile çalışmasını sağlar ve yan etkilerden kaçınarak daha sağlam testler yazılmasına yardımcı olur.

## 🔧 Mock Veri Üretimi
Statik mock veriler yerine, testlerin her seferinde farklı verilerle çalışması için generateMockProductsData fonksiyonu oluşturulmuştur. Bu fonksiyon, belirli bir ürün sayısını argüman olarak alır ve bu sayı kadar rastgele ürün bilgisi üretir.

```bash
import { faker } from '@faker-js/faker';
import { Product } from '../features/product/productSlice';

export const generateMockProductsData = (count: number): Product[] => {
  return Array.from({ length: count }, () => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    image: faker.image.url(),
    description: faker.commerce.productDescription(),
    brand: faker.company.name(),
    model: faker.commerce.productMaterial(),
  }));
};

```
Bu fonksiyon, her test çalıştırıldığında benzersiz veriler oluşturur. Böylece testlerin her zaman doğru sonuç vermesi sağlanır ve testlerde yan etkilerin (side effect) önüne geçilir.

## 🧪 Testlerde Kullanımı
ProductList.test.tsx dosyasında daha önce statik ürün verileri kullanılırken, artık dinamik olarak üretilen veriler kullanılmaktadır. Aşağıda bu fonksiyonun nasıl kullanıldığı gösterilmektedir:

```bash

describe("ProductList", () => {
  test("renders ProductList component with dynamic mock data", () => {
    const mockProducts = generateMockProductsData(10); // Rastgele 10 ürün üretilir.

```

## 📦 Gerekli Yüklemeler
Projeye faker.js kütüphanesini yüklemek için aşağıdaki komutu kullanabilirsiniz:

```bash
npm install @faker-js/faker --save-dev
```

## 📚 Amaç
### Bu yöntem ile:

* Random mock veriler üretilerek testlerin her çalıştırıldığında farklı veri setleriyle çalışması sağlanır.
* Yan etkiler ve bias (ön yargı) test durumları daha iyi yakalanabilir.
* Testlerin her zaman başarılı olmasını sağlayan evergreen (her daim başarılı) durumların önüne geçilir.
Bu sayede, testler daha sağlam ve güvenilir hale gelir.

# 🌐 Canlı Proje
Canlı projeyi şu linkten inceleyebilirsiniz:
[Live Demo](https://eteration-e-commerce.vercel.app/)

