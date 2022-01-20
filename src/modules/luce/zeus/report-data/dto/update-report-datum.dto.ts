import { PartialType } from '@nestjs/swagger';
import { CreateReportDatumDto } from './create-report-datum.dto';

export class UpdateReportDatumDto extends PartialType(CreateReportDatumDto) {}
