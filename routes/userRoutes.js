const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  authenticateToken,
  verifyToken,
  checkRole,
} = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Kullanıcı işlemleri
 */

/**
 * @swagger
 * /users/{uid}/role:
 *   patch:
 *     summary: Kullanıcının rolünü değiştir (sadece admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Kullanıcı UID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: owner
 *     responses:
 *       200:
 *         description: Rol başarıyla değiştirildi
 *       403:
 *         description: Yetkisiz işlem
 */
router.patch(
  "/:uid/role",
  authenticateToken,
  authorizeRoles("admin"),
  userController.updateUserRole
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Yeni kullanıcı oluştur
 *     tags: [Users]
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kullanıcı oluşturuldu
 */
router.post("/", userController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Tüm kullanıcıları getir (sadece admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı listesi
 */
router.get("/", verifyToken, checkRole(["admin"]), userController.getAllUsers);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Giriş yapan kullanıcının bilgilerini getir
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı bilgisi
 */
router.get("/profile", authenticateToken, userController.getUserByUid);

/**
 * @swagger
 * /users/user:
 *   put:
 *     summary: Giriş yapan kullanıcı bilgilerini güncelle
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Güncelleme başarılı
 */
router.put("/user", authenticateToken, userController.updateUserByUid);

/**
 * @swagger
 * /users/user:
 *   delete:
 *     summary: Giriş yapan kullanıcı hesabını sil
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Silme başarılı
 */
router.delete("/user", authenticateToken, userController.deleteUserByUid);

module.exports = router;
