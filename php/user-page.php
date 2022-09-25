<?php
 include_once "database/posts.php";

 session_start();

 $posts = new Posts("reg_date");

 if(isset($_SESSION["user_id"]))
 {
    $posts_response = $posts->get_posts_by_user_id($_SESSION["user_id"]);

    for ($i=0; $i < count($posts_response); $i++) {
        $id = $posts_response[$i]->get_post_id();
        $html_post = "<div class=\"constructor\" id=\"$id\">";
   
        $html_post .= "<div class=\"constructor__menu menu\">";
        $html_post .= "<div class=\"constructor__previous menu-item\">";
        $html_post .= "<i class=\"fa-solid fa-arrow-left\"></i>";
        $html_post .= "</div>";
        $html_post .= "<div class=\"constructor__next menu-item\">";
        $html_post .= "<i class=\"fa-solid fa-arrow-right\"></i>";
        $html_post .= "</div>";
        $html_post .= "<div class=\"constructor__edit menu-item\">";
        $html_post .= "<input onclick=\"clicked(this)\" type=\"submit\" value=\"edit\" name=\"upload\">";
        $html_post .= "<i class=\"fa-solid fa-pen-to-square\"></i>";
        $html_post .= "</div>";
        $html_post .= "<div class=\"constructor__delete menu-item\">";
        $html_post .= "<input onclick=\"clicked(this)\" type=\"submit\" value=\"delete\" name=\"upload\">";
        $html_post .= "<i class=\"fa-solid fa-trash\"></i>";
        $html_post .= "</div>";
        $html_post .= "</div>";
   
        
        $template = $posts_response[$i]->get_post_template();
        $html_post .= "<div class=\"constructor__gallery gallery constructor-block\" style='grid-template-areas:$template'>";
   
        $html_post .= "<input class=\"gallery__input\" multiple type=\"file\" name=\"imgs[]\" id=\"\">";
        $html_post .= "<div class=\"input-hover\">Select images ...";
        $html_post .= "</div>";
   
        $imgs = $posts_response[$i]->get_post_imgs();
        for ($j=0; $j < count($imgs); $j++) {
            $html_post .= "<div class=\"gallery__preview preview-item" . $j + 1 . "\">";
            $html_post .= "<img src=\"$imgs[$j]\" alt=\"\" srcset=\"\">";
            $html_post .= "</div>";
        }
        $html_post .= "</div>";
        
        
        
        $html_post .= "<div class=\"constructor__text text constructor-block\">";
        $html_post .= "<textarea placeholder=\"Write description ...\" name=\"description\" id=\"\" maxlength=\"2000\">";
        $html_post .= $posts_response[$i]->get_post_text();
        $html_post .= "</textarea>";
        $html_post .= "<div class=\"text__max-chars\">";
        $html_post .= "0 / 2000";
        $html_post .= "</div>";
        $html_post .= "</div>";
   
   
   
        $html_post .= "</div>";
   
   
        echo $html_post;
    }
 }
 else
 {
    echo "<p>Login first</p>";
 }
?>