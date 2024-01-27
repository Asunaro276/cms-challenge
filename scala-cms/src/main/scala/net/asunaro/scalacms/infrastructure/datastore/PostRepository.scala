package net.asunaro.scalacms.infrastructure.datastore

import net.asunaro.scalacms.domain.repository.PostRepository

trait MixinPostRepository {
  val postRepository: PostRepository = PostRepositoryImpl
}

object PostRepositoryImpl extends PostRepository with MysqlPostRepository
