# EtherealArt – React ve Stripe ile Geliştirilmiş E-Ticaret Uygulaması

EtherealArt, modern kullanıcı arayüzüne sahip, React ve Tailwind CSS kullanılarak geliştirilmiş bir e-ticaret uygulamasıdır.  
Node.js tabanlı bir backend üzerinden Stripe API entegrasyonu ile test ortamında gerçek zamanlı ödeme işlemleri gerçekleştirilir.

## Kullanılan Teknolojiler

### Frontend
- React (TypeScript)
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- Stripe API (Test ortamı)

## Özellikler

- Ürün listeleme arayüzü
- Responsive tasarım
- Stripe ödeme entegrasyonu (test ortamı)
- Frontend ve backend arasında REST API iletişimi
- Component tabanlı mimari

## Kurulum

### Frontend

cd client
npm install
npm run dev

### Backend

cd backend
npm install
node server.js

API Bilgisi
POST /create-checkout-session
Frontend’den gelen ürün bilgileri ile Stripe üzerinden bir ödeme oturumu başlatır ve kullanıcıyı ödeme sayfasına yönlendirir.

Stripe Test Modu Bilgisi
Uygulama Stripe test anahtarları ile çalışmaktadır.
Gerçek ödeme alınmaz, test kartları ile işlem yapılır.
Canlı ortama geçmek için Stripe dashboard üzerinden live key ile yapılandırılmalıdır.

 Durum
 
- Frontend ve backend yapısı kurulmuştur.
- Stripe API entegrasyonu başarıyla çalışmaktadır.
- Veritabanı desteği ilerleyen sürümlerde entegre edilecektir.

Geliştirici

Elanur Acar
GitHub: https://github.com/elaacar
