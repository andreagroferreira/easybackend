import { PartialType } from '@nestjs/swagger';
import { CreateHourlyPowerDto } from './create-hourly-power.dto';

export class UpdateHourlyPowerDto extends PartialType(CreateHourlyPowerDto) {}
