import { PartialType } from '@nestjs/swagger';
import { CreateEnergiaVerdeDatumDto } from './create-energia-verde-datum.dto';

export class UpdateEnergiaVerdeDatumDto extends PartialType(CreateEnergiaVerdeDatumDto) {}
