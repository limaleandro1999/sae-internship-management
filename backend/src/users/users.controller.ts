import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ConfirmUserDTO } from './dto/confirm-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Post('/confirm')
  async confirmUser(@Body() confirmUserDTO: ConfirmUserDTO, @Res() res) {
    const { email, confirmationId } = confirmUserDTO;
    if (await this.userService.isValid(email, confirmationId)) {
      return this.userService.confirmUser(confirmUserDTO);
    }
    return res.status(HttpStatus.FORBIDDEN).json({message: 'Email doesn\'t match'});
  } 
}
