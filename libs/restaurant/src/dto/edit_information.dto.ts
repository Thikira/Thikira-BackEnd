import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsNumberString, IsString, IsUrl } from 'class-validator';

export class EditInformationDto {
  @ApiProperty({
    description: '업체 사진',
    example: 'asdf@gmail.com',
  })
  @IsUrl()
  public readonly image: string;

  @ApiProperty({
    description: '업체 이름',
    example: '증포동 bbq',
  })
  @IsString()
  public readonly name: string;

  @ApiProperty({
    description: '전화번호',
    example: '01012312312',
  })
  @IsNumberString()
  public readonly phone: string;

  @ApiProperty({
    description: '배달 가능 지역',
    example: ['증포동', '창전동'],
  })
  @IsArray()
  public readonly area: string[];

  @ApiProperty({
    description: '분류',
    example: '치킨',
  })
  @IsString()
  public readonly category: string;

  @ApiProperty({
    description: '최소가격',
    example: 17500,
  })
  @IsNumber()
  public readonly min_price: number;

  @ApiProperty({
    description: '휴무일',
    example: '주일날은 교회에 갑니다.',
  })
  @IsString()
  public readonly day_off: string;

  @ApiProperty({
    description: '온라인 결제 여부',
    example: true,
  })
  @IsBoolean()
  public readonly online_payment: boolean;

  @ApiProperty({
    description: '오프라인 결제 여부',
    example: false,
  })
  @IsBoolean()
  public readonly offline_payment: boolean;

  @ApiProperty({
    description: '개시시간',
    example: '15:00',
  })
  @IsString()
  public readonly open_time: string;

  @ApiProperty({
    description: '마감 시간',
    example: '00:00',
  })
  @IsString()
  public readonly close_time: string;

  @ApiProperty({
    description: '설명',
    example: '증포동 bbq 입니다.',
  })
  @IsString()
  public readonly description: string;
}