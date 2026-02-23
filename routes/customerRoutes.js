const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Müşteri işlemleri
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Yeni müşteri oluştur
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Müşteri oluşturuldu
 *       400:
 *         description: Hatalı istek
 */
router.post("/", customerController.create);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Tüm müşterileri getir (sadece admin/owner)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Müşteri listesi
 *       403:
 *         description: Erişim reddedildi
 */
router.get(
  "/",
  verifyToken,
  checkRole(["admin", "owner"]),
  customerController.getAll
);

/**
 * @swagger
 * /customers/accommodation/{uid}:
 *   get:
 *     summary: Belirli bir konaklamaya ait müşterileri getir (sadece admin/owner)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: Konaklama UID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: İlgili konaklamaya ait müşteriler başarıyla listelendi
 *       403:
 *         description: Erişim reddedildi (yetkisiz)
 *       404:
 *         description: Konaklama bulunamadı
 */

router.get(
  "/accommodation/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  customerController.getCustomersByAccommodationUid
);

/**
 * @swagger
 * /customers/{uid}:
 *   get:
 *     summary: UID ile müşteri getir
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Müşteri UID
 *     responses:
 *       200:
 *         description: Müşteri bulundu
 *       404:
 *         description: Bulunamadı
 */
router.get("/:uid", customerController.getByUid);

/**
 * @swagger
 * /customers/{uid}:
 *   put:
 *     summary: UID ile müşteri güncelle
 *     tags: [Customers]
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
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Güncelleme başarılı
 *       404:
 *         description: Müşteri bulunamadı
 */
router.put(
  "/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  customerController.updateByUid
);

/**
 * @swagger
 * /customers/{uid}:
 *   delete:
 *     summary: UID ile müşteri sil
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Müşteri UID
 *     responses:
 *       200:
 *         description: Silme başarılı
 *       404:
 *         description: Müşteri bulunamadı
 */
router.delete(
  "/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  customerController.deleteByUid
);

module.exports = router;
