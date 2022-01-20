import { PartialType } from '@nestjs/swagger';
import { CreateAllertDatumDto } from './create-allert-datum.dto';

export class UpdateAllertDatumDto extends PartialType(CreateAllertDatumDto) {}
