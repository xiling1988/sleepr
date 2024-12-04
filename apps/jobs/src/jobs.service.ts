import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService {
  //inject the repository
  constructor(private readonly jobsRepository: JobsRepository) {}

  async create(createJobDto: CreateJobDto, userId: string) {
    return this.jobsRepository.create({
      ...createJobDto, 
      userId
    });
  }

  findAll() {
    return this.jobsRepository.findAll();
  }

  findOne(id: string) {
    return this.jobsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobsRepository.findOneAndUpdate({ where: { id }, data: updateJobDto });
  }

  remove(id: string) {
    return this.jobsRepository.findOneAndDelete({ where: { id } });
  }
}
