<?php
session_start();

function movePage($msg, $url) {
    echo "<script>alert('".$msg."')</script>";
    echo "<script>location.href='".$url."'</script>";
    exit;
}

function back($msg) {
    echo "<script>alert('".$msg."')</script>";
    echo "<script>history.back()</script>";
    exit;
}
