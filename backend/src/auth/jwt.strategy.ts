import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import environment from 'src/common/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment().jwt.secret,
    });
  }

  validate(payload) {
    return {
      id: payload.sub,
      email: payload.email,
      campusId: payload.campusId,
    };
  }
}
