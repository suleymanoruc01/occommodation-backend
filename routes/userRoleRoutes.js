const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/userRoleController");

/**
 * @swagger
 * tags:
 *   name: UserRoles
 *   description: Kullanıcı-Rol ilişkileri
 */

/**
 * @swagger
 * /user-roles:
 *   post:
 *     summary: Kullanıcıya rol ata
 *     tags: [UserRoles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleId
 *             properties:
 *               userId:
 *                 type: string
 *               roleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rol ataması yapıldı
 *       400:
 *         description: Hatalı veri
 */
router.post("/", userRoleController.create);

/**
 * @swagger
 * /user-roles:
 *   get:
 *     summary: Tüm kullanıcı-rol atamalarını getir
 *     tags: [UserRoles]
 *     responses:
 *       200:
 *         description: Kullanıcı-rol listesi
 */
router.get("/", userRoleController.getAll);

/**
 * @swagger
 * /user-roles/{id}:
 *   get:
 *     summary: Belirli bir kullanıcı-rol ilişkisini getir
 *     tags: [UserRoles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Kullanıcı-Rol ilişkisinin ID'si
 *     responses:
 *       200:
 *         description: İlişki bulundu
 *       404:
 *         description: Bulunamadı
 */
router.get("/:id", userRoleController.getById);

/**
 * @swagger
 * /user-roles/{id}:
 *   put:
 *     summary: Kullanıcı-rol ilişkisini güncelle
 *     tags: [UserRoles]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               roleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Güncelleme başarılı
 *       404:
 *         description: Bulunamadı
 */
router.put("/:id", userRoleController.update);

/**
 * @swagger
 * /user-roles/{id}:
 *   delete:
 *     summary: Kullanıcı-rol ilişkisini sil
 *     tags: [UserRoles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Silme başarılı
 *       404:
 *         description: Bulunamadı
 */
router.delete("/:id", userRoleController.remove);

module.exports = router;
