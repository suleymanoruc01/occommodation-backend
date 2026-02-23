const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const CityModel = require("../models/City");
const TownModel = require("../models/Town");
const VillageModel = require("../models/Village");

const City = CityModel(sequelize, DataTypes);
const Town = TownModel(sequelize, DataTypes);
const Village = VillageModel(sequelize, DataTypes);

const canakkaleVillages = [
  {
    town: "Ayvacık",
    villages: ["Ahmetçe", "Arıklı", "Babakale", "Bektaş", "Babadere"],
  },
  {
    town: "Bayramiç",
    villages: [
      "Camicedit",
      "Camicuma",
      "Mehmet Akif Ersoy",
      "Tepecik",
      "Yenice",
    ],
  },
  {
    town: "Biga",
    villages: ["Şirintepe", "Hamitabat", "Sakarya", "İstiklal"],
  },
  {
    town: "Bozcaada",
    villages: ["Alaybey", "Cumhuriyet"],
  },
  {
    town: "Çan",
    villages: ["Cumhuriyet", "İstiklal", "Karşıyaka", "Atatürk", "Fatih"],
  },
  {
    town: "Eceabat",
    villages: ["Kemaliye", "Seddülbahir", "Alçıtepe", "Kocadere", "Yalova"],
  },
  {
    town: "Ezine",
    villages: ["Camikebir", "Cumhuriyet", "Geyikli", "Kumburun", "Yeniköy"],
  },
  {
    town: "Gelibolu",
    villages: [
      "Camiikebir",
      "Yazıcızade",
      "Gazi Süleyman Paşa",
      "Yeni Mahalle",
      "Bayır",
    ],
  },
  {
    town: "Gökçeada",
    villages: ["Kaleköy", "Zeytinliköy", "Tepeköy", "Dereköy", "Uğurlu"],
  },
  {
    town: "Lapseki",
    villages: [
      "Cumhuriyet",
      "Gazi Süleyman Paşa",
      "Çardak",
      "Yenice",
      "Kangırlı",
    ],
  },
  {
    town: "Merkez",
    villages: ["Cevatpaşa", "Barbaros", "Kepez", "İsmetpaşa", "Eski Balıklı"],
  },
  {
    town: "Yenice",
    villages: ["Cumhuriyet", "Kalkım", "Çal", "Hamdibey", "Çamlı"],
  },
];

async function seedCanakkaleVillages() {
  try {
    await sequelize.authenticate();
    console.log("✅ Veritabanına bağlanıldı.");

    await sequelize.sync(); // Mevcut yapıyı bozmadan

    const canakkale = await City.findOne({ where: { name: "Çanakkale" } });
    if (!canakkale) {
      console.error("❌ Çanakkale ili bulunamadı.");
      return;
    }

    for (const { town, villages } of canakkaleVillages) {
      const townRecord = await Town.findOne({
        where: { name: town, CityId: canakkale.id },
      });

      if (!townRecord) {
        console.warn(`⚠️ ${town} ilçesi bulunamadı, atlanıyor.`);
        continue;
      }

      for (const villageName of villages) {
        await Village.findOrCreate({
          where: {
            name: villageName,
            TownId: townRecord.id,
          },
        });
      }

      console.log(`✅ ${town} ilçesine ait köyler/mahalleler eklendi.`);
    }

    console.log("🎉 Tüm Çanakkale köy/mahalle verileri başarıyla işlendi.");
  } catch (error) {
    console.error("❌ Hata oluştu:", error);
  } finally {
    await sequelize.close();
  }
}

seedCanakkaleVillages();
