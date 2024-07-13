import { Module } from '@nestjs/common'
import { PostModule } from './PostModule'
import { AuthModule } from './AuthModule'

@Module({
  imports: [
    PostModule,
    AuthModule
  ]
})
export class RootModule {}
