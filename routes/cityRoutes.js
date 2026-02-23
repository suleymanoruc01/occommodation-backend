const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: Şehir yönetimi işlemleri
 */

/**
 * @swagger
 * /cities:
 *   post:
 *     summary: Yeni bir şehir oluştur
 *     tags: [Cities]
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
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Şehir oluşturuldu
 *       401:
 *         description: Yetkisiz
 */
router.post(
  "/",
  verifyToken,
  checkRole(["admin", "owner"]),
  cityController.create
);

/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Tüm şehirleri getir
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: Şehir listesi
 */
router.get("/", cityController.getAll);

/**
 * @swagger
 * /cities/{id}:
 *   get:
 *     summary: ID ile şehir getir
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Şehir ID
 *     responses:
 *       200:
 *         description: Şehir bilgisi
 *       404:
 *         description: Şehir bulunamadı
 */
router.get("/:id", cityController.getById);

/**
 * @swagger
 * /cities/{id}:
 *   put:
 *     summary: ID ile şehri güncelle
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Şehir ID
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
 *         description: Şehir bulunamadı
 */
router.put(
  "/:id",
  verifyToken,
  checkRole(["admin", "owner"]),
  cityController.update
);

/**
 * @swagger
 * /cities/{id}:
 *   delete:
 *     summary: ID ile şehir sil
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Şehir ID
 *     responses:
 *       200:
 *         description: Silme başarılı
 *       404:
 *         description: Şehir bulunamadı
 */
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin", "owner"]),
  cityController.remove
);

module.exports = router;
