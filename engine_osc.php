<?php
ini_set("display_errors", "on");
error_reporting(E_ALL);

$debug = true;

function logthis($text) {
	global $debug, $fp;
	if (!$debug) return false;
	if (!$fp) {
		$fp = fopen("/tmp/ybt-dev.log", "a");
	}
	#fwrite($fp, $text . "\n");
	return true;
}

//logthis("Access from {$_SERVER["REMOTE_ADDR"]} at " . date("Y-m-d H:i:s") . " : GET is {$_SERVER["QUERY_STRING"]}" );

#require_once("app/inc_functions.php");

require($_SERVER["DOCUMENT_ROOT"] . 'app/lib/Juggernaut.php');

Juggernaut::init('127.0.0.1');

$pusher_json = "{
	\"room\": \"{$_GET["location"]}\",
	\"uid\": \"{$_GET["uid"]}\",
	\"lasttime\": \"" . (microtime(true) - $lasttime) . "\",
	\"who\": \"{$_GET["who"]}\"
}";

Juggernaut::publish("osc", utf8_encode($pusher_json));
exit;


?>