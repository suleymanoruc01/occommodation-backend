const express = require("express");
const router = express.Router();
const unitController = require("../controllers/unitController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Units
 *   description: Konaklama birimi işlemleri
 */

/**
 * @swagger
 * /units:
 *   post:
 *     summary: Yeni birim (oda vb.) oluştur
 *     tags: [Units]
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
 *               - accommodationUid
 *             properties:
 *               name:
 *                 type: string
 *               accommodationUid:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Birim oluşturuldu
 *       401:
 *         description: Yetkisiz
 */
router.post(
  "/",
  verifyToken,
  checkRole(["admin", "owner"]),
  unitController.create
);

/**
 * @swagger
 * /units:
 *   get:
 *     summary: Tüm birimleri getir
 *     tags: [Units]
 *     responses:
 *       200:
 *         description: Birim listesi
 */
router.get("/", unitController.getAll);

/**
 * @swagger
 * /units/{uid}:
 *   get:
 *     summary: Belirli bir birimi UID ile getir
 *     tags: [Units]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Birim UID
 *     responses:
 *       200:
 *         description: Birim bilgisi
 *       404:
 *         description: Bulunamadı
 */
router.get("/:uid", unitController.getByUid);

/**
 * @swagger
 * /units/accommodation/{accommodationUid}:
 *   get:
 *     summary: Belirli bir konaklamaya ait birimleri getir
 *     tags: [Units]
 *     parameters:
 *       - in: path
 *         name: accommodationUid
 *         required: true
 *         description: Konaklama UID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: İlgili konaklamaya ait birimler başarıyla listelendi
 *       404:
 *         description: Konaklama bulunamadı veya birim yok
 */
router.get(
  "/accommodation/:accommodationUid",
  unitController.getUnitsByAccommodationUid
);
/**
 * @swagger
 * /units/{uid}:
 *   put:
 *     summary: UID ile birimi güncelle
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Birim UID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Güncelleme başarılı
 *       404:
 *         description: Bulunamadı
 */
router.put(
  "/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  unitController.updateByUid
);

/**
 * @swagger
 * /units/delete/{uid}:
 *   delete:
 *     summary: Belirli bir birimi (unit) yumuşak sil (soft delete) – sadece admin/owner
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: Silinecek birimin (unit) UID değeri
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Birim başarıyla yumuşak silindi
 *       403:
 *         description: Erişim reddedildi (yetkisiz kullanıcı)
 *       404:
 *         description: Birim bulunamadı
 */

router.delete(
  "/delete/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  unitController.softDeleteUnit
);
/**
 * @swagger
 * /units/{uid}:
 *   delete:
 *     summary: UID ile birimi sil
 *     tags: [Units]
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
 *         description: Bulunamadı
 */
router.delete(
  "/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  unitController.deleteByUid
);

module.exports = router;
