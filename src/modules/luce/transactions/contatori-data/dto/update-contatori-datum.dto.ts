import { PartialType } from '@nestjs/swagger';
import { CreateContatoriDatumDto } from './create-contatori-datum.dto';

export class UpdateContatoriDatumDto extends PartialType(CreateContatoriDatumDto) {}
