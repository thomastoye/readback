terraform {
  backend "remote" {
    organization = "toye"

    workspaces {
      prefix = "readback-"
    }
  }

  required_version = ">= 1.0.0"
}

