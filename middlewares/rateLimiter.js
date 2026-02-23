const rateLimit = require("express-rate-limit");

// 🌐 Genel kullanım (her IP'ye 15 dakikada 100 istek)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 1000000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: "Çok fazla istek gönderdiniz. Lütfen biraz sonra tekrar deneyin.",
  },
});

// 🔐 Login için özel limiter (5 dakikada 5 giriş denemesi)
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 dakika
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error:
      "Çok fazla başarısız giriş denemesi. Lütfen 5 dakika sonra tekrar deneyin.",
  },
});

// 🧑‍💻 Şifre sıfırlama gibi hassas endpoint’ler için
const resetPasswordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 dakika
  max: 3,
  message: {
    status: 429,
    error: "Çok fazla istek. Lütfen 10 dakika sonra tekrar deneyin.",
  },
});

module.exports = {
  generalLimiter,
  loginLimiter,
  resetPasswordLimiter,
};
