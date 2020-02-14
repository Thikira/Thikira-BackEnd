import { DtoCheckEmail, DtoCheckPassword, DtoCreateRestaurant, DtoEditAddress, DtoEditPassword, DtoEditRestaurantInfo, DtoSignIn } from '@app/dto';
import { MenuService } from '@app/menu';
import { ResLoadRestaurant, ResRefresh, ResSignIn } from '@app/res';
import { RestaurantService } from '@app/restaurant';
import { UtilService } from '@app/util';
import {
  Body, Controller, Delete, Get, Headers, HttpCode,
  InternalServerErrorException, Patch, Post, ValidationPipe,
} from '@nestjs/common';
import {
  ApiConflictResponse, ApiForbiddenResponse,
  ApiHeader, ApiNotFoundResponse,
  ApiOkResponse, ApiOperation,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Restaurant')
@Controller('api/restaurant')
export class RestaurantController {
  constructor(private readonly restaurant_service: RestaurantService,
              private readonly menu_service: MenuService,
              private readonly util_service: UtilService,
  ) {
  }

  @Get('auth/email')
  @HttpCode(200)
  @ApiOperation({ summary: '이메일 확인' })
  @ApiOkResponse()
  @ApiConflictResponse()
  public async check_email(@Body() payload: DtoCheckEmail) {
    try {
      return await this.restaurant_service.check_email(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: '회원가입' })
  @ApiOkResponse()
  public async create_restaurant(@Body() payload: DtoCreateRestaurant) {
    try {
      return await this.restaurant_service.create_restaurant(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('auth/sign_in')
  @HttpCode(200)
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ type: ResSignIn })
  @ApiNotFoundResponse()
  public async sign_in(@Body(new ValidationPipe()) payload: DtoSignIn) {
    try {
      return await this.restaurant_service.sign_in(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('auth/refresh')
  @HttpCode(200)
  @ApiOperation({ summary: '토큰 재발급' })
  @ApiHeader({ name: 'X-Refresh-Token' })
  @ApiOkResponse({ type: ResRefresh })
  @ApiForbiddenResponse()
  public async refresh(@Headers() header) {
    try {
      return await this.restaurant_service.refresh(this.util_service.get_token_body(header['x-refresh-token']));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Delete('leave')
  @HttpCode(200)
  @ApiOperation({ summary: '회원탈퇴' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async leave(@Headers() header) {
    try {
      return await this.restaurant_service.leave(this.util_service.get_token_body(header.authorization));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('auth')
  @HttpCode(200)
  @ApiOperation({ summary: '토큰 확인' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public auth(@Headers() headers) {
    return null;
  }

  @Get('auth/password')
  @HttpCode(200)
  @ApiOperation({ summary: '비밀번호 확인' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  public async check_password(@Headers() header,
                              @Body() payload: DtoCheckPassword) {
    try {
      return await this.restaurant_service.check_password(this.util_service.get_token_body(header.authorization), payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('password')
  @HttpCode(200)
  @ApiOperation({ summary: '비밀번호 수정' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async edit_password(@Headers() header,
                             @Body() payload: DtoEditPassword) {
    try {
      return await this.restaurant_service.edit_password(this.util_service.get_token_body(header.authorization), payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('info')
  @HttpCode(200)
  @ApiOperation({ summary: '정보 수정' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async edit_info(@Headers() header,
                         @Body() payload: DtoEditRestaurantInfo) {
    try {
      return await this.restaurant_service.edit_info(this.util_service.get_token_body(header.authorization), payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('address')
  @HttpCode(200)
  @ApiOperation({ summary: '주소 수정' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async edit_address(@Headers() header,
                            @Body() payload: DtoEditAddress) {
    try {
      return await this.restaurant_service.edit_address(this.util_service.get_token_body(header.authorization), payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: '업체 조회' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse({ type: ResLoadRestaurant })
  @ApiNotFoundResponse()
  public async get_restaurant(@Headers() header) {
    try {
      return await this.restaurant_service.get(this.util_service.get_token_body(header.authorization));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
