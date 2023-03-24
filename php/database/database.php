<?php
class DataBase
{
    public $conn;

    private function __construct()
    {
        $this->conect_db();
    }
    
    public function conect_db()
    {
        $this->conn = new mysqli("", "admin", "", "");
        if ($this->conn->connect_error) {
            die("Conection failed" . $this->conn->connect_error);
        }
    }
    public function close_db()
    {
        mysqli_close($this->conn);
    }
    static public function get_last_id($table, $column)
    {
        $sql = "SELECT $column FROM $table ORDER BY $column DESC LIMIT 1";
        $connDB = new DataBase();
        if($connDB->conn->query($sql)->fetch_assoc() == null)
        {
            $connDB->close_db();
            return 0;
        }
        $result = $connDB->conn->query($sql)->fetch_assoc()["$column"];
        $connDB->close_db();
        return $result;
    }
}
?>
