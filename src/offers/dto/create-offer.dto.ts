import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Offer } from "../entities/offer.entity";
import { OFFERS_ITEMSID_DESCRIPTION, OFFERS_ITEMSID_EXAMPLE } from "../constants/offers";

export class CreateOfferDto extends PickType(Offer, [
  'amount',
  'hidden',
]) {
  @ApiProperty({
    description: OFFERS_ITEMSID_DESCRIPTION,
    example: OFFERS_ITEMSID_EXAMPLE,
  })     
  @IsNumber()
  itemId: number;
}
