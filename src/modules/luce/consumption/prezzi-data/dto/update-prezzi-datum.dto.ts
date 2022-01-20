import { PartialType } from '@nestjs/swagger';
import { CreatePrezziDatumDto } from './create-prezzi-datum.dto';

export class UpdatePrezziDatumDto extends PartialType(CreatePrezziDatumDto) {}
