const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");
const CityModel = require("../models/City");
const City = CityModel(sequelize, DataTypes);
const TownModel = require("../models/Town");

const Town = TownModel(sequelize, DataTypes);

const canakkaleTowns = [
  "Ayvacık",
  "Bayramiç",
  "Biga",
  "Bozcaada",
  "Çan",
  "Eceabat",
  "Ezine",
  "Gelibolu",
  "Gökçeada",
  "Lapseki",
  "Merkez",
  "Yenice",
];

async function seedTowns() {
  try {
    await sequelize.authenticate();
    console.log("Veritabanına bağlanıldı.");

    await sequelize.sync();

    // Çanakkale ilini bul
    const canakkale = await City.findOne({ where: { name: "Çanakkale" } });
    console.log("Çanakkale ID:", canakkale.id);
    if (!canakkale) {
      console.error("Çanakkale ili veritabanında bulunamadı.");
      return;
    }

    // Her ilçeyi ekle
    for (const name of canakkaleTowns) {
      await Town.findOrCreate({
        where: { name, CityId: canakkale.id },
      });
    }

    console.log("Çanakkale ilçeleri başarıyla eklendi.");
  } catch (error) {
    console.error("Hata oluştu:", error);
  } finally {
    await sequelize.close();
  }
}

seedTowns();
