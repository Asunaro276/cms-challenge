package net.asunaro.scalacms

import cats.effect.{IO, IOApp}
import net.asunaro.scalacms.infrastructure.controller.ScalacmsServer

object Main extends IOApp.Simple:
  val run = ScalacmsServer.run[IO]
