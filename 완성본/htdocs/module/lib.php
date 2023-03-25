<?php
session_start();

function back($msg) {
    echo "<script>alert('".$msg."')</script>";
    echo "<script>history.back()</script>";
    exit;
}

function movePage($msg, $url) {
    echo "<script>alert('".$msg."')</script>";
    echo "<script>window.location.href='".$url."'</script>";
    exit;
}

function alert($msg) {
    echo "<script>alert('".$msg."')</script>";
}