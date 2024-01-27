package net.asunaro.scalacms.infrastructure.datastore.mysql

import doobie._
import doobie.implicits._

val xa = Transactor.fromDriverManager[IO]
