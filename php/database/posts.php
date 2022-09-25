<?php
include_once "post.php";

class Posts extends Post
{
    protected $posts = array();

    public function __construct($order)
    {
        $sql = "SELECT * FROM posts ORDER BY $order DESC";
        $this->conect_db();
        $result = $this->conn->query($sql);
        $this->close_db();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $post = new Post($row["user_id"], $row["post_text"], $row["post_imgs"], $row["template"],  $row["post_id"]);
                array_push($this->posts, $post);
            }
        }   
    }

    public function get_posts()
    {
        return $this->posts;
    }
    public function get_posts_by_user_id($user_id)
    {
        $result = array();
        for ($i=0; $i < count($this->posts); $i++) { 
            if($this->posts[$i]->get_user_id() == $user_id)
            {
                array_push($result, $this->posts[$i]);
            }
        }
        return $result;
    }
}
