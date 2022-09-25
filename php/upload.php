<?php
    session_start();
    include_once "database/post.php";
    if (isset($_SESSION["user_id"])) {
        if(isset($_POST["upload"]))
        {
            $max_img_size = 3 * 1024 * 1024;
            $max_char_in_desr = 2000;
            $available_file_types = array("jpg", "jpeg", "png");
            $db_imgs_string = "";
            $num_of_files = isset($_FILES["imgs"]) ? count($_FILES["imgs"]["name"]) : 0;
            validate_description($max_char_in_desr);
            if($_POST["upload"] == "upload")
            {
                $post_id = DataBase::get_last_id("posts", "post_id") + 1;
                $target_dir = "../imgs/posts/post$post_id/";
                validate_num_of_files($num_of_files, "<p>You need upload at least 1 photo</p>");
                validate_imgs($num_of_files, $max_img_size, $available_file_types);
                $db_imgs_string = make_imgs_string($num_of_files, $target_dir);

                $post = new Post($_SESSION["user_id"], htmlspecialchars($_POST["description"]), $db_imgs_string, $_POST["template"], $post_id);
                $post->upload_post();
                mkdir($target_dir);
                for ($i = 0; $i < $num_of_files; $i++) {
                    move_uploaded_file($_FILES["imgs"]["tmp_name"][$i], $target_dir . basename($_FILES["imgs"]["name"][$i]));
                }
                echo "<p>Uploaded successfully</p>";
            }
            elseif ($_POST["upload"] == "edit") {
                $post_id = $_POST["post_id"];
                $target_dir = "../imgs/posts/post$post_id/";
                validate_num_of_files($num_of_files, "<p>Edit posts</p>");
                validate_imgs($num_of_files, $max_img_size, $available_file_types);
                $db_imgs_string = make_imgs_string($num_of_files, $target_dir);

                $post = new Post($_SESSION["user_id"], htmlspecialchars($_POST["description"]), $db_imgs_string, $_POST["template"], $post_id);
                $post->update_post();
                $old_files = glob($target_dir . "*");
                foreach($old_files as $old_file)
                {
                    unlink($old_file);
                }
                for ($i = 0; $i < $num_of_files; $i++) {
                    move_uploaded_file($_FILES["imgs"]["tmp_name"][$i], $target_dir . basename($_FILES["imgs"]["name"][$i]));
                }
                echo "<p>Edited successfully</p>";
            }
            elseif ($_POST["upload"] == "delete") {
                $post_id = $_POST["post_id"];
                $target_dir = "../imgs/posts/post$post_id";
                if(is_dir($target_dir))
                {
                    $post = new Post($_SESSION["user_id"], "", "", "", $post_id);
                    $post->delete_post();
                    $files = glob($target_dir . "/*");
                    foreach($files as $file)
                    {
                        unlink($file);
                    }
                    rmdir($target_dir);
                    echo "<p>Deleted successfully</p>";
                }
                else{
                    die("<p>Post already deleted</p>");
                }
            }
        }
    } else {
        die("<p>To make post please login</p>");
    }





    function validate_num_of_files($num_of_files, $message)
    {
        if ($num_of_files > 7) {
            die("<p>$num_of_files imgs is too much 7 is maximum </p>");
        }
        else if ($num_of_files == 0) {
            die("<p>$message</p>");
        }
    }

    function validate_description($max_char_in_desr)
    {
        if (mb_strlen($_POST["description"], "UTF-8") > $max_char_in_desr) {
            die("<p>Your description " . mb_strlen($_POST["description"], "UTF-8") . " characters long - " . $max_char_in_desr . " characters is maximum</p>");
        }
    }

    function validate_imgs($num_of_files, $max_img_size, $available_file_types)
    {
        for ($i = 0; $i < $num_of_files; $i++) {
            $image_file_type = strtolower(pathinfo($_FILES["imgs"]["name"][$i], PATHINFO_EXTENSION));
            if ($_FILES["imgs"]["size"][$i] > $max_img_size || $_FILES["imgs"]["error"][$i] == 1) {
                die("<p>Your file is too big - " . $max_img_size / 1024 / 1024 . "mb is maximum</p>");
            }
            if (!in_array($image_file_type, $available_file_types)) {
                die("<p>$image_file_type - is not allowed, use : jpg, jpeg, png instead </p>");
            }
        }
    }

    function make_imgs_string($num_of_files, $target_dir)
    {
        $output_imgs_string = "";
        for ($i = 0; $i < $num_of_files; $i++) {
            $output_imgs_string .= $target_dir . basename($_FILES["imgs"]["name"][$i]) . " ";
        }
        return rtrim($output_imgs_string, " ");
    }

?>