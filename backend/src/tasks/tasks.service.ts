import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
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
    const taskObj = this.taskRepository.create({
      ...task,
      delivered: true,
      deliveredDate: dayjs(),
    });
    return this.taskRepository.save(taskObj);
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

  formatTasks(
    tasks: Task[],
    startDate,
    finishDate,
    skip?: number,
    take?: number,
    filter?: BaseFilter,
  ) {
    const internshipStartDate = dayjs(startDate);
    const internshipFinishDate = dayjs(finishDate);
    const month = filter?.date ?? dayjs();
    const businessDaysInCurrentMonth: dayjs.Dayjs[] = dayjs(month)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .businessDaysInMonth()
      .filter(
        (dayOfMonth: dayjs.Dayjs) =>
          dayOfMonth >= internshipStartDate &&
          dayOfMonth <= internshipFinishDate,
      );
    const startIndex = skip;
    const endIndex = startIndex + take;

    return [
      businessDaysInCurrentMonth
        .map((date, index) => {
          const [task] = tasks.filter(
            ({ date: taskDate, delivered }) =>
              delivered && dayjs(taskDate).diff(date, 'days') === 0,
          );

          /**
           * Need to send the index as id to "solve" a bug with react admin
           */
          if (task) {
            return {
              ...task,
              date: dayjs(task.date),
              deliveredDate: dayjs(task.deliveredDate),
              id: index,
              realId: task.id,
            };
          }

          return {
            id: index,
            delivered: false,
            date,
          };
        })
        .slice(startIndex, endIndex),
      businessDaysInCurrentMonth.length,
    ];
  }
}
