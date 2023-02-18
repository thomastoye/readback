locals {
  environment = split("-", terraform.workspace)[1]
  gcp_folder = "1043197321318"
}

resource "google_project" "project" {
  name       = "Readback - ${local.environment}"
  project_id = "readback-${local.environment}"
  folder_id  = local.gcp_folder
}
