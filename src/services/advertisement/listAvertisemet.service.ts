import { And, Between, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisements } from "../../entities/advertisement.entity";
import { match } from "assert";

const ListAdvertisementService = async (query: any) => {
  const advertisementRepository: Repository<Advertisements> =
    AppDataSource.getRepository(Advertisements);

  if (query.color == '') {
    query.color = undefined
  }
  if (query.brand == '') {
    query.brand = undefined
  }
  if (query.model == '') {
    query.model = undefined
  }
  if (query.year == '') {
    query.year = undefined
  }
  if (query.fuel == '') {
    query.fuel = undefined
  }
  if (query.minKm == '') {
    query.kmMin = undefined
  }
  if (query.kmMax == '') {
    query.maxKm = undefined
  }
  if (query.yearMax == '') {
    query.maxKm = undefined
  }
  if (query.yearMax == '') {
    query.maxKm = undefined
  }

  const advertisements = advertisementRepository.find({
    select: {
      user: {
        id: true,
        email: true,
        name: true
      }
    },
    relations: {
      user: true,
      images: true,
    },
    where: {
      brand: query.brand,
      color: query.color,
      model: query.model,
      year: query.year || Between(Number(query.yearMin) || 1900, Number(query.yearMax) || 2100),
      fuel: query.fuel,
      km: Between(Number(query.kmMin) || 0, Number(query.kmMax) || 100000),
    }

  });

  return advertisements;
};

export default ListAdvertisementService;

