/* ---------- Alt DTO’lar ---------- */
class CityDTO {
  constructor(city) {
    if (!city) return;
    this.name = city.name;
  }
}

class TownDTO {
  constructor(town) {
    if (!town) return;
    this.name = town.name;
  }
}

class VillageDTO {
  constructor(village) {
    if (!village) return;
    this.name = village.name;
  }
}

class UserLiteDTO {
  constructor(user) {
    if (!user) return;
    this.uid = user.uid;
    this.name = user.name;
    this.surname = user.surname;
  }
}

class UnitDTO {
  constructor(unit) {
    this.uid = unit.uid;
    this.name = unit.name;
    this.description = unit.description;
    this.isActive = unit.isActive;
  }
}

class BookingDTO {
  constructor(booking) {
    this.uid = booking.uid;
    this.startDate = booking.startDate;
    this.endDate = booking.endDate;
    this.customerCount = booking.customerCount;
    this.description = booking.description;
    this.status = booking.status;
  }
}

class CommentDTO {
  constructor(comment) {
    this.uid = comment.uid;
    this.commentBody = comment.commentBody;
    this.createdAt = comment.createdAt;
    // ilişkili kullanıcı (yalın DTO)
    this.user = new UserLiteDTO(comment.User);
  }
}

class ContentDTO {
  constructor(content) {
    this.uid = content.uid;
    this.contentUrl = content.contentUrl; // ör: "image", "video"
    this.type = content.type;
  }
}

/* ---------- Ana DTO ---------- */
class AccommodationDetailsDTO {
  constructor(accommodation) {
    /* Temel alanlar */
    this.uid = accommodation.uid;
    this.name = accommodation.name;
    this.phoneNumber = accommodation.phoneNumber;
    this.description = accommodation.description;

    /* Konum */
    this.city = new CityDTO(accommodation.City);
    this.town = new TownDTO(accommodation.Town);
    this.village = new VillageDTO(accommodation.Village);

    /* Sahip kullanıcı */
    //this.owner = new UserLiteDTO(accommodation.User);

    /* Bir-çok ilişkiler (dizi) */
    this.units = (accommodation.Units || []).map((u) => new UnitDTO(u));
    this.comments = (accommodation.Comments || []).map(
      (c) => new CommentDTO(c)
    );
    this.contents = (accommodation.Contents || []).map(
      (c) => new ContentDTO(c)
    );
  }
}

class AccommodationDTO {
  constructor(accommodation) {
    /* Temel alanlar */
    this.uid = accommodation.uid;
    this.name = accommodation.name;
    this.description = accommodation.description;
    /* Konum */
    this.city = new CityDTO(accommodation.City);
    this.town = new TownDTO(accommodation.Town);
    this.village = new VillageDTO(accommodation.Village);
    this.contents = (accommodation.Contents || []).map(
      (c) => new ContentDTO(c)
    );
  }
}

class AccommodationbyOwnerDTO {
  constructor(accommodation) {
    /* Temel alanlar */
    this.uid = accommodation.uid;
    this.name = accommodation.name;

    this.units = (accommodation.Units || []).map((u) => new UnitDTO(u));
  }
}

class AccommodationNameDTO {
  constructor(accommodation) {
    /* Temel alanlar */
    this.uid = accommodation.uid;
    this.name = accommodation.name;
  }
}

module.exports = {
  AccommodationDetailsDTO,
  AccommodationDTO,
  AccommodationbyOwnerDTO,
};
