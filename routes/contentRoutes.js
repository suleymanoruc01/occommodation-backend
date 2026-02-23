const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

/**
 * @swagger
 * tags:
 *   name: Contents
 *   description: İçerik yönetimi
 */

/**
 * @swagger
 * /contents/upload:
 *   post:
 *     summary: Yeni içerik oluştur
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: İçerik oluşturuldu
 *       401:
 *         description: Yetkisiz
 */
router.post(
  "/upload",
  verifyToken,
  checkRole(["admin", "owner"]),
  upload.single("file"),
  contentController.uploadContent
);
/**
 * @swagger
 * /contents/uploads:
 *   post:
 *     summary: Birden fazla içerik dosyası yükle (max 10 dosya)
 *     tags: [Contents]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *               - AccommodationUid
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Yüklenecek dosyalar
 *               AccommodationUid:
 *                 type: string
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: Dosyalar başarıyla yüklendi
 *       400:
 *         description: Eksik alan veya hatalı yükleme
 *       413:
 *         description: Dosya boyutu limiti aşıldı
 */

router.post(
  "/uploads",
  upload.array("file", 10),
  contentController.uploadContent
);

/**
 * @swagger
 * /contents/accommodation/{accommodationUid}:
 *   get:
 *     summary: Belirli bir konaklamaya ait içerikleri getir
 *     tags: [Contents]
 *     parameters:
 *       - in: path
 *         name: accommodationUid
 *         required: true
 *         description: Konaklama UID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: İçerikler başarıyla listelendi
 *       404:
 *         description: Konaklama bulunamadı veya içerik yok
 */

router.get(
  "/accommodation/:accommodationUid",
  contentController.getContentsByAccommodation
);
/**
 * @swagger
 * /contents:
 *   get:
 *     summary: Tüm içerikleri getir
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: İçerik listesi
 */
router.get(
  "/",
  verifyToken,
  checkRole(["admin", "owner"]),
  contentController.getAll
);

/**
 * @swagger
 * /contents/{uid}:
 *   get:
 *     summary: Belirli bir içeriği UID ile getir
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: İçerik UID
 *     responses:
 *       200:
 *         description: İçerik detayları
 *       404:
 *         description: İçerik bulunamadı
 */
router.get(
  "/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  contentController.getByUid
);

/**
 * @swagger
 * /contents/{uid}:
 *   put:
 *     summary: İçeriği güncelle
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Güncelleme başarılı
 *       404:
 *         description: İçerik bulunamadı
 */
router.put(
  "/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  contentController.updateByUid
);

/**
 * @swagger
 * /contents/{uid}:
 *   delete:
 *     summary: İçeriği sil
 *     tags: [Contents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Silme başarılı
 *       404:
 *         description: İçerik bulunamadı
 */
router.delete(
  "/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  contentController.deleteByUid
);

module.exports = router;
