import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ConfirmUserDTO } from './dto/confirm-user.dto';
import { IsConfirmedRequest } from './interfaces/is-confirmed-request.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('/confirm')
  async confirmUser(@Body() confirmUserDTO: ConfirmUserDTO, @Res() res) {
    const { email, confirmationId } = confirmUserDTO;
    if (await this.userService.isValid(email, confirmationId)) {
      const result = await this.userService.confirmUser(confirmUserDTO);

      return res
        .status(result.confirmed ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
        .json(result);
    }
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ message: "Email doesn't match" });
  }

  @Public()
  @Get('/is-confirmed/:confirmationId')
  async isConfirmed(@Req() req: IsConfirmedRequest, @Res() res) {
    const { confirmationId } = req.params;
    const isUserConfirmed = await this.userService.isConfirmed(confirmationId);

    return res.json({ confirmed: isUserConfirmed });
  }
}
