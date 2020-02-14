import { DtoCheckEmail, DtoCheckPassword, DtoCreateUser, DtoEditAddress, DtoEditPassword, DtoEditUserInfo, DtoSignIn } from '@app/dto';
import { ResLoadUser, ResRefresh, ResSignIn } from '@app/res';
import { UserService } from '@app/user';
import { UtilService } from '@app/util';
import {
  Body, Controller, Delete, Get, Headers, HttpCode,
  InternalServerErrorException, Patch, Post,
} from '@nestjs/common';
import {
  ApiConflictResponse, ApiForbiddenResponse,
  ApiHeader, ApiNotFoundResponse,
  ApiOkResponse, ApiOperation,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(
    private readonly user_service: UserService,
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
      return await this.user_service.check_email(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: '계정생성' })
  @ApiOkResponse()
  public async create(@Body() payload: DtoCreateUser) {
    try {
      return await this.user_service.create_user(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('auth/sign_in')
  @HttpCode(200)
  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ type: ResSignIn })
  @ApiNotFoundResponse()
  public async sign_in(@Body() payload: DtoSignIn) {
    try {
      return await this.user_service.sign_in(payload);
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
      return await this.user_service.refresh(this.util_service.get_token_body(header['x-refresh-token']));
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
      return await this.user_service.leave(this.util_service.get_token_body(header.authorization));
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
      return await this.user_service.check_password(this.util_service.get_token_body(header.authorization), payload);
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
      return await this.user_service.edit_password(this.util_service.get_token_body(header.authorization), payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Patch('profile')
  @HttpCode(200)
  @ApiOperation({ summary: '프로필 수정' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async edit_profile(@Headers() header,
                            @Body() payload: DtoEditUserInfo) {
    try {
      return await this.user_service.edit_info(this.util_service.get_token_body(header.authorization), payload);
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
      return await this.user_service.edit_address(this.util_service.get_token_body(header.authorization), payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: '사용자 정보 가져오기' })
  @ApiHeader({ name: 'Authorization' })
  @ApiOkResponse({ type: ResLoadUser })
  @ApiNotFoundResponse()
  public async get_user(@Headers() header) {
    try {
      return await this.user_service.get(this.util_service.get_token_body(header.authorization));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
