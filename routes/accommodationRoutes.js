const express = require("express");
const router = express.Router();
const accommodationController = require("../controllers/accommodationController");
const {
  verifyToken,
  checkRole,
  authenticateToken,
} = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Accommodations
 *   description: Konaklama yönetimi
 */

/**
 * @swagger
 * /accommodations:
 *   post:
 *     summary: Yeni konaklama oluştur
 *     tags: [Accommodations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phoneNumber
 *               - description
 *               - userUid
 *               - cityUid
 *               - townUid
 *               - villageUid
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               description:
 *                 type: string
 *               userUid:
 *                 type: string
 *               cityUid:
 *                 type: string
 *               townUid:
 *                 type: string
 *               villageUid:
 *                 type: string
 *     responses:
 *       201:
 *         description: Konaklama oluşturuldu
 *       400:
 *         description: Eksik veya hatalı veri
 *       401:
 *         description: Yetkisiz
 */
router.post(
  "/",
  verifyToken,
  checkRole(["admin", "owner"]),
  accommodationController.createAccommodation
);

/**
 * @swagger
 * /accommodations:
 *   get:
 *     summary: Tüm konaklamaları getir
 *     tags: [Accommodations]
 *     responses:
 *       200:
 *         description: Konaklama listesi
 */
router.get("/", accommodationController.getAllAccommodations);

/**
 * @swagger
 * /accommodations/user:
 *   get:
 *     summary: Giriş yapan kullanıcının konaklamalarını getir
 *     tags: [Accommodations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı konaklamaları
 */
router.get(
  "/user",
  authenticateToken,
  accommodationController.getAccommodationbyUserUidwithUnits
);

/**
 * @swagger
 * /accommodations/town:
 *   post:
 *     summary: İlçe adına göre konaklamaları getir
 *     tags: [Accommodations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - town
 *             properties:
 *               town:
 *                 type: string
 *                 example: Bodrum
 *     responses:
 *       200:
 *         description: İlçeye ait konaklamalar başarıyla listelendi
 *       404:
 *         description: İlçe bulunamadı veya konaklama yok
 *       400:
 *         description: Eksik veya hatalı istek
 */
router.post("/town", accommodationController.getAccommodationsByTownName);
/**
 * @swagger
 * /accommodations/available:
 *   post:
 *     summary: Müsait konaklamaları getir
 *     tags: [Accommodations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Müsait konaklamalar
 */
router.post("/available", accommodationController.getAvailableAccommodations);

/**
 * @swagger
 * /accommodations/{uid}:
 *   get:
 *     summary: UID ile konaklama getir
 *     tags: [Accommodations]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Konaklama detayları
 *       404:
 *         description: Bulunamadı
 */
router.get("/:uid", accommodationController.getAccommodationByUid);

/**
 * @swagger
 * /accommodations/city/{uid}:
 *   get:
 *     summary: Şehre göre konaklamaları getir
 *     tags: [Accommodations]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Şehir UID'si
 *     responses:
 *       200:
 *         description: Konaklamalar listelendi
 */
router.get("/city/:id", accommodationController.getAccommodationsByCityId);

/**
 * @swagger
 * /accommodations/{uid}:
 *   put:
 *     summary: Konaklamayı güncelle (UID ile)
 *     tags: [Accommodations]
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
 *             required:
 *               - name
 *               - phoneNumber
 *               - description
 *               - userUid
 *               - cityUid
 *               - townUid
 *               - villageUid
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               description:
 *                 type: string
 *               userUid:
 *                 type: string
 *               cityUid:
 *                 type: string
 *               townUid:
 *                 type: string
 *               villageUid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Güncelleme başarılı
 *       400:
 *         description: Eksik veya hatalı veri
 *       401:
 *         description: Yetkisiz
 *       404:
 *         description: Konaklama bulunamadı
 */

router.put(
  "/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  accommodationController.updateAccommodationByUid
);

/**
 * @swagger
 * /accommodation/delete/{uid}:
 *   delete:
 *     summary: Belirli bir konaklamayı yumuşak sil (soft delete)
 *     tags: [Accommodations]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: Silinecek konaklama UID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Konaklama başarıyla silindi (soft delete uygulandı)
 *       404:
 *         description: Konaklama bulunamadı
 */
router.delete(
  "/delete/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  accommodationController.softDeleteAccommodation
);

/**
 * @swagger
 * /accommodations/{uid}:
 *   delete:
 *     summary: Konaklamayı sil
 *     tags: [Accommodations]
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
 */
router.delete(
  "/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  accommodationController.deleteAccommodationByUid
);

module.exports = router;
