import { PartialType } from '@nestjs/swagger';
import { CreateMetersListDto } from './create-meters-list.dto';

export class UpdateMetersListDto extends PartialType(CreateMetersListDto) {}
