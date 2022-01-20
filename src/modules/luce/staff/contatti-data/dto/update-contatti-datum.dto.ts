import { PartialType } from '@nestjs/swagger';
import { CreateContattiDatumDto } from './create-contatti-datum.dto';

export class UpdateContattiDatumDto extends PartialType(CreateContattiDatumDto) {}
