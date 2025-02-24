import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { UsersDocument } from './models/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<UsersDocument> {
  protected readonly logger: Logger;

  constructor(@InjectModel(UsersDocument.name) userModel: Model<UsersDocument>) {
    super(userModel);
  }
}
