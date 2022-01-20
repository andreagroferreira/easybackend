import { PartialType } from '@nestjs/swagger';
import { CreateSensorListDto } from './create-sensor-list.dto';

export class UpdateSensorListDto extends PartialType(CreateSensorListDto) {}
