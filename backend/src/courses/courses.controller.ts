import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { RequestWithQueryInfo } from 'src/common/interfaces/request-query-info.interface';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  findAll(@Req() req: RequestWithQueryInfo): Promise<[Course[], number]> {
    const { order, skip, filter, take } = req.queryInfo;
    return this.courseService.findAll(
      order,
      skip,
      take,
      filter,
      req.user.campusId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Post()
  create(
    @Req() req: RequestWithQueryInfo,
    @Body() createCourseDTO: CreateCourseDTO,
  ): Promise<Course> {
    return this.courseService.create(createCourseDTO, req.user.campusId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDTO: UpdateCourseDTO,
  ): Promise<Course> {
    return this.courseService.update(id, updateCourseDTO);
  }
}
