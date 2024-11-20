import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

export abstract class AbstractRepository<TModel> {

  constructor(protected readonly prisma: PrismaClient) {}
  protected abstract get modelName(): string;
  protected abstract readonly logger: Logger;

  //create a new record
  async create(data: Partial<TModel>): Promise<TModel> {
    try {
      const createdUser = await this.prisma[this.modelName].create({ data });
      this.logger.log(`Created new ${this.modelName}`);
      return createdUser as TModel;
    } catch (error) {
      this.logger.error(`Failed to create ${this.modelName}`, error);
      throw error;
    }
  }

  // find a unique record using a unique key
  async findOne(options: { where: any }): Promise<TModel> {
    try {
      const document = await this.prisma[this.modelName].findUnique({
        where: options.where,
      });
      if (!document) {
        throw new Error(`${this.modelName} not found`);
      }
      return document as TModel;
    } catch (error) {
      this.logger.error(`Failed to find ${this.modelName}`, error);
      throw error;
    }
  }

  //findOneAndUpdate method
  async findOneAndUpdate(options: { where: any; data: Partial<TModel> }): Promise<TModel> {
    try {
      const document = await this.prisma[this.modelName].update({
        where: options.where,
        data: options.data,
      });
      if (!document) {
        throw new Error(`${this.modelName} not found`);
      }
      this.logger.log(`Updated ${this.modelName}`);
      return document as TModel;
    } catch (error) {
      this.logger.error(`Failed to update ${this.modelName}`, error);
      throw error;
    }
  }

  //find all records
  async findAll(): Promise<TModel[]> {
    console.log(`Finding all ${this.modelName}`);
    try {
      return this.prisma[this.modelName].findMany();
    } catch (error) {
      this.logger.error(`Failed to find all ${this.modelName}`, error);
      throw error;
    }
  }

  //findOneAndDelete method
  async findOneAndDelete(options: { where: any }): Promise<TModel> {
    try {
      const document = await this.prisma[this.modelName].delete({
        where: options.where,
      });
      if (!document) {
        throw new Error(`${this.modelName} not found`);
      }
      this.logger.log(`Deleted ${this.modelName}`);
      return document as TModel;
    } catch (error) {
      this.logger.error(`Failed to delete ${this.modelName}`, error);
      throw error;
    }
  }
}
