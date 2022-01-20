import { PartialType } from '@nestjs/swagger';
import { CreateLettureDatumDto } from './create-letture-datum.dto';

export class UpdateLettureDatumDto extends PartialType(CreateLettureDatumDto) {}
