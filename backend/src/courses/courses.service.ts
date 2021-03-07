import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseFilter } from 'src/common/interfaces/base-filter-interface';
import { Raw, Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>
  ) {}

  findAll(order?: object, skip?: number, take?: number, filter?: BaseFilter, campusId?: number): Promise<[Course[], number]> {
    const { q } = filter;
    const whereClause = q ? { name: Raw(alias => `${alias} ILIKE '%${q}%'`) } : null;
    return this.courseRepository.findAndCount({ order, skip, take, where: {  ...whereClause, campus: campusId } });
  }

  findOne(id: number | string): Promise<Course> {
    return this.courseRepository.findOne(id);
  }

  create(course: CreateCourseDTO, campusId?: number): Promise<Course> {
    course.campus = campusId ? campusId : course.campus;
    return this.courseRepository.save(course);
  }

  async update(id: number | string, course: UpdateCourseDTO): Promise<Course> {
    await this.courseRepository.update(id, course);
    return this.courseRepository.findOne(id);
  }
}
