const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Rol yönetimi
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Yeni rol oluştur
 *     tags: [Roles]
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
 *         description: Rol oluşturuldu
 */
router.post("/", roleController.create);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Tüm rolleri getir
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Rol listesi
 */
router.get("/", roleController.getAll);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Belirli bir rolü getir
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Rol ID'si
 *     responses:
 *       200:
 *         description: Rol bilgisi
 *       404:
 *         description: Rol bulunamadı
 */
router.get("/:id", roleController.getById);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Rolü güncelle
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Rol ID'si
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
 *         description: Rol bulunamadı
 */
router.put("/:id", roleController.update);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Rolü sil
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Rol ID'si
 *     responses:
 *       200:
 *         description: Silme başarılı
 *       404:
 *         description: Rol bulunamadı
 */
router.delete("/:id", roleController.remove);

module.exports = router;
