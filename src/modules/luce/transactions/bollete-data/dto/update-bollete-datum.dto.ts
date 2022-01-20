import { PartialType } from '@nestjs/swagger';
import { CreateBolleteDatumDto } from './create-bollete-datum.dto';

export class UpdateBolleteDatumDto extends PartialType(CreateBolleteDatumDto) {}
