const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authMiddleware, r } = require("../middlewares/authMiddleware.js");
const {
  loginLimiter,
  resetPasswordLimiter,
} = require("../middlewares/rateLimiter.js");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Kimlik doğrulama işlemleri
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı oluştur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 *       400:
 *         description: Hatalı istek
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /register/owner:
 *   post:
 *     summary: Yeni işletme sahibi (owner) kaydı oluştur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mehmet
 *               surname:
 *                type: string
 *                example: Unver
 *               email:
 *                 type: string
 *                 example: ahmet@example.com
 *               password:
 *                 type: string
 *                 example: sifre123
 *     responses:
 *       201:
 *         description: Owner kaydı başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz veya eksik veri
 *       409:
 *         description: E-posta zaten kayıtlı
 */

router.post("/register/owner", authController.registerOwnerController);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Giriş başarılı, JWT döner
 *       401:
 *         description: Hatalı kimlik bilgisi
 */
router.post("/login", loginLimiter, authController.login);

/**
 * @swagger
 * /auth/update-password:
 *   put:
 *     summary: Şifre güncelle
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: eskiSifre123
 *               newPassword:
 *                 type: string
 *                 example: yeniSifre456
 *     responses:
 *       200:
 *         description: Şifre başarıyla güncellendi
 *       400:
 *         description: Hatalı istek (eksik alanlar veya geçersiz şifre)
 *       401:
 *         description: Yetkisiz, geçersiz veya eksik token
 */
router.put(
  "/update-password",
  authMiddleware,
  resetPasswordLimiter,
  authController.updatePasswordController
);
module.exports = router;
