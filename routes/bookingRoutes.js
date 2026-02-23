const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const {
  verifyToken,
  checkRole,
  authenticateToken,
} = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Rezervasyon işlemleri
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Yeni rezervasyon oluştur
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerUid
 *               - unitUid
 *               - checkInDate
 *               - checkOutDate
 *             properties:
 *               customerUid:
 *                 type: string
 *               unitUid:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *               checkOutDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rezervasyon başarıyla oluşturuldu
 *       400:
 *         description: Hatalı istek
 */
router.post("/", authenticateToken, bookingController.create);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Tüm rezervasyonları getir (sadece admin/owner)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rezervasyon listesi
 *       403:
 *         description: Erişim reddedildi
 */
router.get(
  "/",
  verifyToken,
  checkRole(["admin", "owner"]),
  bookingController.getAll
);

/**
 * @swagger
 * /bookings/{uid}:
 *   put:
 *     summary: Rezervasyonu güncelle (sadece admin/owner)
 *     tags: [Bookings]
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
 *               checkInDate:
 *                 type: string
 *               checkOutDate:
 *                 type: string
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
  bookingController.updateByUid
);

/**
 * @swagger
 * /bookings/user:
 *   get:
 *     summary: Giriş yapan kullanıcının rezervasyonlarını getir
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı rezervasyonları
 */
router.get("/user", authenticateToken, bookingController.getBookingsByUserUid);

/**
 * @swagger
 * /bookings/accommodation:
 *   get:
 *     summary: UID ile konaklamaya ait rezervasyonları getir (sadece admin/owner)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Konaklama UID
 *     responses:
 *       200:
 *         description: Rezervasyonlar bulundu
 */
router.get(
  "/accommodation",
  authenticateToken,
  verifyToken,
  checkRole(["admin", "owner"]),
  bookingController.getUserAccommodationBookings
);
/**
 * @swagger
 * /bookings/{uid}:
 *   get:
 *     summary: Rezervasyonu UID ile getir
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Rezervasyon UID
 *     responses:
 *       200:
 *         description: Rezervasyon bulundu
 *       404:
 *         description: Bulunamadı
 */
router.get("/:uid", bookingController.getByUid);

/**
 * @swagger
 * /bookings/delete/{uid}:
 *   delete:
 *     summary: Belirli bir rezervasyonu yumuşak sil (soft delete)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: Silinecek rezervasyonun UID bilgisi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rezervasyon başarıyla yumuşak silindi
 *       404:
 *         description: Rezervasyon bulunamadı
 */

router.delete(
  "/delete/:uid",
  verifyToken,
  checkRole(["admin", "owner"]),
  bookingController.softDeleteBooking
);
/**
 * @swagger
 * /bookings/{uid}:
 *   delete:
 *     summary: Rezervasyonu sil (sadece admin/owner)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Rezervasyon UID
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
  bookingController.deleteByUid
);

module.exports = router;
