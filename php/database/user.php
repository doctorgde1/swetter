<?php
    session_start();
    include "database.php";
    class User extends DataBase
    {
        protected $username;
        protected $email;
        protected $password;
        protected $register_statement = null;
        protected $login_statement = null;
        
        public function __construct($username, $email, $password)
        { 
            $this->username = $username;
            $this->email = $email;
            $this->password = $password;
        }
        public function select_username($username)
        {
            $sql = "SELECT * FROM users WHERE username = \"$username\"";
            $this->conect_db();
            if($this->conn->query($sql)->fetch_assoc() == null)
            {
                $this->close_db();
                return null;
            }
            $result = $this->conn->query($sql)->fetch_assoc()["username"];
            $this->close_db();
            return $result;
        }
        public function select_password($password)
        {
            $sql = "SELECT * FROM users WHERE password = \"$password\"";
            $this->conect_db();
            if($this->conn->query($sql)->fetch_assoc() == null)
            {
                $this->close_db();
                return null;
            }
            $result = $this->conn->query($sql)->fetch_assoc()["password"];
            $this->close_db();
            return $result;
        }

        public function select_user_id($username)
        {
            $sql = "SELECT user_id FROM users WHERE username = \"$username\"";
            $this->conect_db();
            if($this->conn->query($sql)->fetch_assoc() == null)
            {
                $this->close_db();
                return null;
            }
            $result = $this->conn->query($sql)->fetch_assoc()["user_id"];
            $this->close_db();
            return $result;
        }


        public function registr()
        {
            $this->conect_db();
            $prepare = $this->conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
            $prepare->bind_param("sss", $usernmae, $email, $password);
            $usernmae = $this->username;
            $email = $this->email;
            $password = $this->password;
            $prepare->execute();
            $this->close_db();
        }
        public function login()
        {   
            $_SESSION["username"] = $this->username;
            $_SESSION["user_id"] = $this->select_user_id($this->username);
        }
    
        public function get_username()
        {
            return $this->username;
        }
        public function get_email()
        {
            return $this->email;
        }
        public function get_password()
        {
            return $this->password;
        }
        public function get_register_statement()
        {
            return $this->register_statement;
        }
        public function get_login_statement()
        {
            return $this->login_statement;
        }
    }
?>