const express = require("express");
const router = express.Router();
const villageController = require("../controllers/villageController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Villages
 *   description: Mahalle / Köy işlemleri
 */

/**
 * @swagger
 * /villages:
 *   post:
 *     summary: Yeni köy/mahalle oluştur
 *     tags: [Villages]
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
 *               - townId
 *             properties:
 *               name:
 *                 type: string
 *               townId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Köy/mahalle oluşturuldu
 *       401:
 *         description: Yetkisiz
 */
router.post(
  "/",
  verifyToken,
  checkRole(["admin", "owner"]),
  villageController.create
);

/**
 * @swagger
 * /villages/town/{townId}:
 *   get:
 *     summary: İlçeye (townUid) göre köy ve mahalleleri getir
 *     tags: [Villages]
 *     parameters:
 *       - in: path
 *         name: townUid
 *         required: true
 *         description: İlçe UID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Köy ve mahalleler başarıyla listelendi
 *       404:
 *         description: İlçe bulunamadı veya veri yok
 */
router.get("/town/:townId", villageController.getVillagesByTown);
/**
 * @swagger
 * /villages:
 *   get:
 *     summary: Tüm köy/mahalleleri getir
 *     tags: [Villages]
 *     responses:
 *       200:
 *         description: Köy/mahalle listesi
 */
router.get("/", villageController.getAll);

/**
 * @swagger
 * /villages/{id}:
 *   get:
 *     summary: Belirli bir köy/mahalleyi ID ile getir
 *     tags: [Villages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Köy/mahalle ID
 *     responses:
 *       200:
 *         description: Bilgi getirildi
 *       404:
 *         description: Bulunamadı
 */
router.get("/:id", villageController.getById);

/**
 * @swagger
 * /villages/{id}:
 *   put:
 *     summary: Köy/mahalleyi güncelle (ID ile)
 *     tags: [Villages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Köy/mahalle ID
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
 *         description: Bulunamadı
 */
router.put(
  "/:id",
  verifyToken,
  checkRole(["admin", "owner"]),
  villageController.update
);

/**
 * @swagger
 * /villages/{id}:
 *   delete:
 *     summary: Köy/mahalleyi sil (ID ile)
 *     tags: [Villages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Köy/mahalle ID
 *     responses:
 *       200:
 *         description: Silme başarılı
 *       404:
 *         description: Bulunamadı
 */
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin", "owner"]),
  villageController.remove
);

module.exports = router;
