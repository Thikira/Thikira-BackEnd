import { DBService, User } from '@app/db';
import {
  DtoCheckPassword, DtoCreateUser, DtoEditAddress,
  DtoEditPassword, DtoEditUserInfo, DtoSignIn,
  QueryCheckEmail,
} from '@app/req';
import { ResLoadUser, ResRefresh, ResSignIn } from '@app/res';
import { TokenTypeEnum, UtilService } from '@app/util';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly db_service: DBService,
    private readonly util_service: UtilService,
  ) {
  }

  public async check_email(query: QueryCheckEmail): Promise<void> {
    const found_user = await this.db_service.find_user_by_email(query.email);
    if (!found_user.is_empty()) {
      throw new ConflictException();
    }
  }

  public async create_user(payload: DtoCreateUser): Promise<void> {
    const found_user = await this.db_service.find_user_by_nickname(payload.nickname);
    if (!found_user.is_empty()) {
      throw new ConflictException();
    }

    await this.db_service.insert_user(new User({
      ...payload, password: await this.util_service.encode(payload.password),
    }));
  }

  public async sign_in(payload: DtoSignIn): Promise<ResSignIn> {
    const found_user: User = await this.db_service.find_user_by_email(payload.email);
    if (found_user.is_empty() ||
      found_user.u_password !== await this.util_service.encode(payload.password)) {
      throw new NotFoundException();
    }

    return {
      access_token: await this.util_service.create_token(payload.email, TokenTypeEnum.access),
      refresh_token: await this.util_service.create_token(payload.email, TokenTypeEnum.refresh),
    };
  }

  public async refresh(token: string): Promise<ResRefresh> {
    const email: string = await this.util_service.get_email_by_token(token);
    return { access_token: await this.util_service.create_token(email, TokenTypeEnum.access) };
  }

  public async leave(token: string): Promise<void> {
    const email: string = await this.util_service.get_email_by_token(token);
    await this.db_service.delete_user(email);
  }

  public async check_password(token: string, payload: DtoCheckPassword): Promise<void> {
    const email: string = await this.util_service.get_email_by_token(token);
    const found_user: User = await this.db_service.find_user_by_email(email);
    if (await this.util_service.encode(payload.password) !== found_user.u_password) {
      throw new UnauthorizedException();
    }
  }

  public async edit_password(token: string, payload: DtoEditPassword) {
    const email: string = await this.util_service.get_email_by_token(token);
    await this.db_service.update_user(email, { u_password: payload.password });
  }

  public async edit_info(token: string, payload: DtoEditUserInfo) {
    const email: string = await this.util_service.get_email_by_token(token);
    const edit_data = { u_phone: payload.phone, u_nickname: payload.nickname };
    for (const key of Object.keys(edit_data)) {
      if (edit_data[key] === undefined || edit_data[key] === null) {
        delete edit_data[key];
      }
    }
    await this.db_service.update_user(email, edit_data);
  }

  public async edit_address(token: string, payload: DtoEditAddress) {
    const email: string = await this.util_service.get_email_by_token(token);
    await this.db_service.update_user(email, {
      u_add_street: payload.add_street,
      u_add_parcel: payload.add_parcel,
    });
  }

  public async get(token: string): Promise<ResLoadUser> {
    const email: string = await this.util_service.get_email_by_token(token);
    const found_user: User = await this.db_service.find_user_by_email(email);
    return new ResLoadUser(found_user);
  }
}
