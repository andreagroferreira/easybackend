import { PartialType } from '@nestjs/swagger';
import { CreateIbanDatumDto } from './create-iban-datum.dto';

export class UpdateIbanDatumDto extends PartialType(CreateIbanDatumDto) {}
