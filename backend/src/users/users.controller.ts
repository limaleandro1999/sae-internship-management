import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { EmailsService } from 'src/emails/emails.service';
import { ConfirmUserDTO } from './dto/confirm-user.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { IsConfirmedRequest } from './interfaces/is-confirmed-request.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly emailService: EmailsService,
  ) {}

  @Public()
  @Post('/confirm')
  async confirmUser(@Body() confirmUserDTO: ConfirmUserDTO, @Res() res) {
    const { email, confirmationId } = confirmUserDTO;
    if (await this.userService.isValid(email, confirmationId)) {
      return this.userService.confirmUser(confirmUserDTO);
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

  @Public()
  @Post('/forgot-password')
  async forgotPassword(
    @Body() forgotPasswordBody: ForgotPasswordDTO,
    @Res() res: Response,
  ) {
    const { email } = forgotPasswordBody;
    const user = await this.userService.findUser(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    try {
      const forgotPasswordToken = await this.userService.generateForgotPasswordToken(
        user,
      );

      await this.emailService.sendForgotPasswordEmail(
        user?.email,
        user?.id,
        forgotPasswordToken?.token,
      );

      return res.status(200).json({ message: 'Forgot password e-mail sent' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  @Public()
  @Post('/reset-password/:userId/:token')
  async resetPassword(
    @Body() resetPasswordBody: ResetPasswordDTO,
    @Param('userId') userId,
    @Param('token') token,
    @Res() res: Response,
  ) {
    const { password } = resetPasswordBody;

    try {
      const user = await this.userService.findUserById(userId);
      const resetPassword = await this.userService.resetPassword(
        user,
        token,
        password,
      );

      if (resetPassword) {
        await this.emailService.sendResetPasswordEmail(user?.email);
        return res
          .status(200)
          .json({ message: 'Password successfully changed' });
      }

      return res.status(200).json({ message: 'Password failed to be changed' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
