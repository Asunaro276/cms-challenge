package net.asunaro.scalacms.infrastructure.datastore.mysql

import io.getquill._
import io.getquill.context.ZioJdbc._
import zio.console.{Console, putStrLn}
import zio.{ExitCode, Has, URIO, ZIO}

import java.io.Closeable
import javax.sql
import doobie.util.transactor.Transactor
import zio.Task
import scala.util.Try
import net.asunaro.scalacms.infrastructure.mysql.Mysql

trait MysqlPostRepository extends zio.App {
  def getPostList(): Try[Seq[Post]] = {
    val sql = sql"""
        select * from contents;
      """
    for {
      xa <- Mysql.transactor
      result <- sql.query[Int].unique.transact(xa) 
    } yield()
  }

}
