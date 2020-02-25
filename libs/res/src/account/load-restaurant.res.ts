import { Restaurant } from '@app/db';
import { ApiProperty } from '@nestjs/swagger';
import { stringify } from "querystring";

export class ResLoadRestaurant {
  @ApiProperty()
  public readonly image: string;
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly phone: string;
  @ApiProperty()
  public readonly add_street: string;
  @ApiProperty()
  public readonly add_parcel: string;
  @ApiProperty()
  public readonly area: string;
  @ApiProperty()
  public readonly category: string;
  @ApiProperty()
  public readonly min_price: number;
  @ApiProperty()
  public readonly day_off: string;
  @ApiProperty()
  public readonly online_payment: boolean;
  @ApiProperty()
  public readonly offline_payment: boolean;
  @ApiProperty()
  public readonly open_time: string;
  @ApiProperty()
  public readonly close_time: string;
  @ApiProperty()
  public readonly description: string;
  @ApiProperty()
  public readonly create_time: Date;

  constructor(restaurant?: Restaurant) {
    if (restaurant !== undefined) {
      if (restaurant instanceof Restaurant) {
        this.image = restaurant.r_image;
        this.name = restaurant.r_name;
        this.phone = restaurant.r_phone;
        this.add_street = restaurant.r_add_street;
        this.add_parcel = restaurant.r_add_parcel;
        this.area = restaurant.r_area;
        this.category = restaurant.r_category;
        this.min_price = restaurant.r_min_price;
        this.day_off = restaurant.r_day_off;
        this.online_payment = restaurant.r_online_payment;
        this.offline_payment = restaurant.r_offline_payment;
        this.open_time = restaurant.r_open_time;
        this.close_time = restaurant.r_close_time;
        this.description = restaurant.r_description;
        this.create_time = restaurant.r_create_time;
      }
    }
  }

  public get_info(): string {
    return stringify({
      image: this.image,
      name: this.name,
      phone: this.phone,
      area: this.area,
      min_price: this.min_price,
      day_off: this.day_off,
      online_payment: this.online_payment,
      offline_payment: this.offline_payment,
      open_time: this.open_time,
      close_time: this.close_time,
      description: this.description,
    });
  }

  public get_address(): string {
    return stringify({
      add_street: this.add_street,
      add_parcel: this.add_parcel,
    });
  }
}