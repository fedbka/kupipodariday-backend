import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class PublicUserProfileDto extends PickType(User, ['id', 'username', 'about', 'avatar', 'createdAt', 'updatedAt']) { }
