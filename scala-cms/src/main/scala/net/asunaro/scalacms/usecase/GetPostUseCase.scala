package net.asunaro.scalacms.usecase

import net.asunaro.scalacms.domain.entity.Post

case class GetPostListOutput(
  post: Seq[Post]
)

trait GetPostListUseCase[F[_]]:
  def execute(id: String): GetPostListOutput
