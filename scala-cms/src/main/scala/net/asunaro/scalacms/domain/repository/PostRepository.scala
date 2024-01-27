package net.asunaro.scalacms.domain.repository

import net.asunaro.scalacms.domain.entity.Post

trait PostRepository {
  def getPostById(id: String): Option[Post]
  def getAllPost(): Seq[Post]
}
