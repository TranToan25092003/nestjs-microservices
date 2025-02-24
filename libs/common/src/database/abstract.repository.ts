import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  /**
   * ====================================
   * create new document
   * ====================================
   */
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createDocument.save()).toJSON() as unknown as TDocument;
  }

  /**
   * ====================================
   * find one document
   * ====================================
   */
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    try {
      const document = await this.model.findOne(filterQuery).lean<TDocument>(true);

      if (!document) {
        this.logger.warn('Document was not found', filterQuery);
        throw new NotFoundException('Document was not found');
      }

      return document;
    } catch (error) {
      throw new NotFoundException('Document was not found');
    }
  }

  /**
   * ====================================
   * update one
   * ====================================
   */
  async update(
    updateQuery: UpdateQuery<TDocument>,
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, updateQuery, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  /**
   * ====================================
   * find all
   * ====================================
   */
  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    return await this.model.find(filterQuery).lean<TDocument>(true);
  }

  /**
   * ====================================
   * find one and delete
   * ====================================
   */
  async delete(filter: FilterQuery<TDocument>) {
    return await this.model.findOneAndDelete(filter).lean<TDocument>(true);
  }
}
