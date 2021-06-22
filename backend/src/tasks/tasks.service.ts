import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task-dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  createTask(task: CreateTaskDTO) {
    delete task.id;
    return this.taskRepository.save({
      ...task,
      delivered: true,
      deliveredDate: dayjs(),
    });
  }

  findOne(id: string | number) {
    return this.taskRepository.findOne(id);
  }

  async getTasksByDateRangeAndEmail(
    internshipProcessId: number | string,
    startDate: Date,
    finishDate: Date,
  ) {
    return this.taskRepository
      .createQueryBuilder('task')
      .where(
        'task.internshipProcessId = :internshipProcessId AND (task.date BETWEEN :startDate AND :finishDate)',
        {
          startDate: dayjs(startDate).format('YYYY-MM-DD'),
          finishDate: dayjs(finishDate).format('YYYY-MM-DD'),
          internshipProcessId,
        },
      )
      .getMany();
  }
}
