<?php
   include('db_config.php');
   session_start();
   
   $user_check = $_SESSION['login_user'];
   
   $ses_sql = mysqli_query($db,"select st_useremail from tbl_users where st_useremail = '$user_check' ");
   
   $row = mysqli_fetch_array($ses_sql, MYSQLI_ASSOC);
   
   $login_session = $row['username'];
   
   if(!isset($_SESSION['login_user'])){
      header("location:login.php");
      die();
   }
?>