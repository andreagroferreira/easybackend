import { PartialType } from '@nestjs/swagger';
import { CreateFattureDatumDto } from './create-fatture-datum.dto';

export class UpdateFattureDatumDto extends PartialType(CreateFattureDatumDto) {}
