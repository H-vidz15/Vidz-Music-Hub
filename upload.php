<?php
$secret_key = "Vidz_secret_15"; // match this with secret_upload.html

if ($_GET['key'] !== $secret_key) {
  http_response_code(403);
  echo json_encode(["status" => "error", "message" => "Unauthorized"]);
  exit;
}

$target_dir = "uploads/";
if (!is_dir($target_dir)) mkdir($target_dir, 0777, true);
$target_file = $target_dir . basename($_FILES["song"]["name"]);
$response = [];

if (move_uploaded_file($_FILES["song"]["tmp_name"], $target_file)) {
  $response['status'] = "success";
  $response['file'] = $target_file;
} else {
  $response['status'] = "error";
  $response['message'] = "Upload failed.";
}

echo json_encode($response);
?>
