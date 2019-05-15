
<?php
    $url=$_POST['urlString'];
    $res = file_get_contents($url);
    echo $res;
?>