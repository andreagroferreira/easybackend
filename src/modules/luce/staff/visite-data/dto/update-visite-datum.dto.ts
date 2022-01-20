import { PartialType } from '@nestjs/swagger';
import { CreateVisiteDatumDto } from './create-visite-datum.dto';

export class UpdateVisiteDatumDto extends PartialType(CreateVisiteDatumDto) {}
