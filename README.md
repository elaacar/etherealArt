EtherealArt, modern kullanıcı arayüzüne sahip, React ve Tailwind CSS ile geliştirilmiş bir e-ticaret uygulamasıdır.  
Node.js tabanlı backend üzerinden Stripe API entegrasyonu ile **gerçek zamanlı ödeme işlemleri** gerçekleştirilmektedir.

 Kullanılan Teknolojiler

 Frontend
- React (TypeScript)
- Tailwind CSS
- Vite

Backend
- Node.js
- Express.js
- Stripe API (test ortamı)

Özellikler

- Ürün listeleme arayüzü
- Kullanıcı dostu, responsive tasarım
- Stripe ile entegre edilmiş ödeme sistemi (test)
- Frontend ve backend bağlantısı (API üzerinden)
- Component tabanlı yapı

Kurulum için

1. Frontend Başlatma

cd client
npm install
npm run dev

2. Backend Başlatma

cd backend
npm install
node server.jsNot: Stripe test anahtarınızı .env dosyasında tanımlamayı unutmayın.

API Bilgisi
POST /create-checkout-session
Frontend üzerinden gelen ürün bilgisiyle Stripe ödeme oturumu başlatır ve kullanıcıyı ödeme sayfasına yönlendirir.

Stripe Test Modu Bilgisi
Projede kullanılan Stripe API, test modundadır.

Gerçek ödeme yapılmaz, demo kart bilgileriyle test yapılır.

Canlı ortama geçmek için Stripe dashboard üzerinden live key eklenmelidir.

Geliştirici
Elanur Acar
GitHub: https://github.com/elaacar

 Durum
- Frontend ve backend yapısı kurulmuştur.
- Stripe API entegrasyonu başarıyla çalışmaktadır.
- Veritabanı desteği ilerleyen sürümlerde entegre edilecektir.
