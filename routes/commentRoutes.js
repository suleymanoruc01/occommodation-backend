const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const {
  verifyToken,
  checkRole,
  authenticateToken,
} = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Yorum işlemleri
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Yeni yorum oluştur
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - accommodationUid
 *             properties:
 *               content:
 *                 type: string
 *               accommodationUid:
 *                 type: string
 *     responses:
 *       201:
 *         description: Yorum oluşturuldu
 */
router.post("/", commentController.create);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Tüm yorumları getir (sadece admin/owner)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Yorum listesi
 */
router.get(
  "/",
  verifyToken,
  checkRole(["admin", "owner"]),
  commentController.getAll
);

/**
 * @swagger
 * /comments/user:
 *   get:
 *     summary: Giriş yapan kullanıcının yorumlarını getir
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcının yorumları
 */
router.get("/user", authenticateToken, commentController.getUserComments);

/**
 * @swagger
 * /comments/accommodation/{uid}:
 *   get:
 *     summary: Belirli bir konaklamaya ait yorumları getir
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Yorumları alınacak konaklamanın UID'si
 *     responses:
 *       200:
 *         description: Yorumlar başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   comment:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *       404:
 *         description: Konaklamaya ait yorum bulunamadı
 *       400:
 *         description: Geçersiz istek
 */

router.get("/accommodation/:uid", commentController.getAccommodationComments);
/**
 * @swagger
 * /comments/{uid}:
 *   get:
 *     summary: Belirli bir yorumu UID ile getir
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Yorum UID
 *     responses:
 *       200:
 *         description: Yorum bulundu
 *       404:
 *         description: Bulunamadı
 */
router.get("/:uid", commentController.getByUid);

/**
 * @swagger
 * /comments/{uid}:
 *   put:
 *     summary: Yorumu güncelle
 *     tags: [Comments]
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
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Güncelleme başarılı
 */
router.put("/:uid", commentController.updateByUid);
/**
 * @swagger
 * /comments/{uid}:
 *   delete:
 *     summary: Yorumu sil
 *     tags: [Comments]
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
router.delete("/:uid", commentController.deleteByUid);

module.exports = router;
