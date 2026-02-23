const express = require("express");
const router = express.Router();
const townController = require("../controllers/townController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Towns
 *   description: İlçe yönetimi
 */

/**
 * @swagger
 * /towns:
 *   post:
 *     summary: Yeni ilçe oluştur
 *     tags: [Towns]
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
 *               - cityId
 *             properties:
 *               name:
 *                 type: string
 *               cityId:
 *                 type: string
 *     responses:
 *       201:
 *         description: İlçe oluşturuldu
 */
router.post(
  "/",
  verifyToken,
  checkRole(["admin", "owner"]),
  townController.create
);

/**
 * @swagger
 * /towns/city/{cityId}:
 *   get:
 *     summary: Şehre (cityId) göre ilçeleri getir
 *     tags: [Towns]
 *     parameters:
 *       - in: path
 *         name: cityId
 *         required: true
 *         description: Şehir ID'si
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: İlçeler başarıyla listelendi
 *       404:
 *         description: Şehir bulunamadı veya ilçe yok
 */
router.get("/city/:cityId", townController.getTownsByCity);
/**
 * @swagger
 * /towns:
 *   get:
 *     summary: Tüm ilçeleri getir
 *     tags: [Towns]
 *     responses:
 *       200:
 *         description: İlçe listesi
 */
router.get("/", townController.getAll);

/**
 * @swagger
 * /towns/{id}:
 *   get:
 *     summary: Belirli bir ilçeyi ID ile getir
 *     tags: [Towns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: İlçe ID'si
 *     responses:
 *       200:
 *         description: İlçe bilgisi
 *       404:
 *         description: İlçe bulunamadı
 */
router.get("/:id", townController.getById);

/**
 * @swagger
 * /towns/{id}:
 *   put:
 *     summary: İlçeyi güncelle (ID ile)
 *     tags: [Towns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: İlçe ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Güncelleme başarılı
 *       404:
 *         description: İlçe bulunamadı
 */
router.put(
  "/:id",
  verifyToken,
  checkRole(["admin", "owner"]),
  townController.update
);

/**
 * @swagger
 * /towns/{id}:
 *   delete:
 *     summary: İlçeyi sil (ID ile)
 *     tags: [Towns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: İlçe ID'si
 *     responses:
 *       200:
 *         description: Silme başarılı
 *       404:
 *         description: İlçe bulunamadı
 */
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin", "owner"]),
  townController.remove
);

module.exports = router;
