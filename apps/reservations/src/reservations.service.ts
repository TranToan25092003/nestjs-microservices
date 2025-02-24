import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservations/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservations/dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepo: ReservationRepository) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepo.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '1111111',
    });
  }

  findAll() {
    return this.reservationRepo.find({});
  }

  findOne(id: string) {
    try {
      return this.reservationRepo.findOne({
        _id: id,
      });
    } catch (error) {
      throw new Error('not found');
      console.log(error);
    }
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepo.update({ _id: id, $set: updateReservationDto }, {});
  }

  remove(id: string) {
    return this.reservationRepo.delete({ _id: id });
  }
}
