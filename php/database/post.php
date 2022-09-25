<?php
    include_once "database.php";

    class Post extends DataBase
    {
        protected $post_id;
        protected $user_id;
        protected $post_text;
        protected $post_imgs;
        protected $template;
        protected $num_of_comments = 0;
        protected $num_of_saves = 0;


        public function __construct($user_id, $post_text, $post_imgs, $template, $post_id = null)
        {
            $this->post_id = $post_id;
            $this->user_id = $user_id;
            $this->post_text = $post_text;
            $this->post_imgs = $post_imgs;
            $this->template = $template;
        }

        public function upload_post()
        {
            $this->conect_db();
            $prepare = $this->conn->prepare("INSERT INTO posts (user_id, post_text, post_imgs, num_of_comments, num_of_saves, template, post_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $prepare->bind_param("issiisi", $user_id, $post_text, $post_imgs, $num_of_comments, $num_of_saves, $template, $post_id);
            $user_id = $this->user_id;
            $post_text = $this->post_text;
            $post_imgs = $this->post_imgs;
            $num_of_comments = $this->num_of_comments;
            $num_of_saves = $this->num_of_saves;
            $template = $this->template;
            $post_id = $this->post_id;
            $prepare->execute();
            $this->close_db();
        }

        public function update_post()
        {
            $this->conect_db();
            $prepare = $this->conn->prepare("UPDATE posts SET post_text = ?, post_imgs = ?, num_of_comments = 0, num_of_saves = 0, template = ? WHERE post_id = ?");
            $prepare->bind_param("sssi", $post_text, $post_imgs, $template, $post_id);
            $post_text = $this->post_text;
            $post_imgs = $this->post_imgs;
            $template = $this->template;
            $post_id = $this->post_id;
            $prepare->execute();
            $this->close_db();
        }

        public function delete_post()
        {
            $this->conect_db();
            $prepare = $this->conn->prepare("DELETE FROM posts WHERE post_id = ?");
            $prepare->bind_param("i", $post_id);
            $post_id = $this->post_id;
            $prepare->execute();
            $this->close_db();
        }

        public function update_num_comments($post_id, $new_value)
        {
            $sql = "UPDATE posts SET num_of_comments = $new_value WHERE post_id=$post_id";
            $this->conect_db();
            $this->conn->query($sql);
            $this->close_db();
        }
        public function update_num_saves($post_id, $new_value)
        {
            $sql = "UPDATE posts SET num_of_saves = $new_value WHERE post_id=$post_id";
            $this->conect_db();
            $this->conn->query($sql);
            $this->close_db();
        } 

        private function parse_imgs($string)
        {
            return explode(" ", $string);
        }

        public function get_post_id()
        {
            return $this->post_id;
        }
        public function get_user_id()
        {
            return $this->user_id;
        }
        public function get_post_text()
        {
            return $this->post_text;
        }
        public function get_post_imgs()
        {
            return $this->parse_imgs($this->post_imgs);
        }
        public function get_num_of_comments()
        {
            return $this->num_of_comments;
        }
        public function get_num_of_saves()
        {
            return $this->num_of_saves;
        }
        public function get_post_template()
        {
            return $this->template;
        }
    }
