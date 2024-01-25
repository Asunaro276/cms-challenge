import { Module } from '@nestjs/common'
import { PostModule } from './PostModule'

@Module({
  imports: [
    PostModule
  ]
})
export class RootModule {}
