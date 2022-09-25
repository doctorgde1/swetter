<?php
    include_once "database/posts.php";

    $posts = new Posts("reg_date");

    $posts_response = $posts->get_posts();

    for ($i=0; $i < count($posts_response); $i++) {
        $id = $posts_response[$i]->get_post_id();
        $html_post = "<div class=\"post\" id=\"$id\">";



        $html_post .= "<div class=\"post__menu menu\">";
        $html_post .= "<div class=\"menu__gallery menu-item\">";
        $html_post .= "<i class=\"fa-regular fa-image\"></i>";
        $html_post .= "</div>";
        $html_post .= "<div class=\"menu__text menu-item\">";
        $html_post .= "<i class=\"fa-solid fa-pen-nib\"></i>";
        $html_post .= "</div>";
        $html_post .= "<div class=\"menu__comments menu-item\">";
        $html_post .= "<i class=\"fa-regular fa-message\"></i>";
        $html_post .= "</div>";
        $html_post .= " <div class=\"menu__save menu-item\">";
        $html_post .= "<i class=\"fa-regular fa-bookmark\"></i>";
        $html_post .= "</div>";
        $html_post .= "</div>";



        $html_post .= "<div class=\"post__comments comments\" style=\"visibility: hidden; opacity: 0;\">";
        $html_post .= "<div class=\"comments__close\">";
        $html_post .= "<img src=\"imgs/svgs/arrow.svg\" alt=\"\" srcset=\"\">";
        $html_post .= "</div>";
        $html_post .= "<div class=\"comments__container\">";
        $html_post .= "<div class=\"comments__input\">";
        $html_post .= "<textarea placeholder=\"Messae...\" name=\"\" cols=\"30\" rows=\"10\"></textarea>";
        $html_post .= "</div>";
        $html_post .= "<div class=\"post__comment\">Coment</div>";
        $html_post .= "<div class=\"post__comment\">Coment</div>";
        $html_post .= "</div>";
        $html_post .= "</div>";
        
        
        $template = $posts_response[$i]->get_post_template();
        $html_post .= "<div class=\"post__gallery gallery\" style='grid-template-areas:$template'>";
        $imgs = $posts_response[$i]->get_post_imgs();
        for ($j=0; $j < count($imgs); $j++) {
            $html_post .= "<div class=\"gallery__img img-item" . $j + 1 . "\">";
            $html_post .= "<img src=\"$imgs[$j]\" alt=\"\" srcset=\"\">";
            $html_post .= "</div>";
        }
        $html_post .= "</div>";
        
        
        
        $html_post .= "<div class=\"post__text\" style=\"visibility: hidden; opacity: 0;\">";
        $html_post .= $posts_response[$i]->get_post_text();
        $html_post .= "</div>";



        $html_post .= "</div>";


        echo $html_post;
    }
?>