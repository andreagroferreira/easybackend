import { PartialType } from '@nestjs/swagger';
import { CreateCasiDatumDto } from './create-casi-datum.dto';

export class UpdateCasiDatumDto extends PartialType(CreateCasiDatumDto) {}
