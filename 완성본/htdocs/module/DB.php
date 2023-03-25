<?php
class DB {
    private static $db = null;
    private static function getDB() {
        if(is_null(self::$db)) {
            self::$db = new \PDO("mysql:host=localhost; dbname=database; charset=utf8mb4;", "root", "");
        }
        return self::$db;
    }

    public static function execute($sql, $datas=[]) {
        $query = self::getDB()->prepare($sql);
        return $query->execute($datas);
    }

    public static function fetch($sql, $datas=[]) {
        $query = self::getDB()->prepare($sql);
        $query->execute($datas);
        return $query->fetch(\PDO::FETCH_OBJ);
    }

    public static function fetchAll($sql, $datas=[]) {
        $query = self::getDB()->prepare($sql);
        $query->execute($datas);
        return $query->fetchAll(\PDO::FETCH_OBJ);
    }

}