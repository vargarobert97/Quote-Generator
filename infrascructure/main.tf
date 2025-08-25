terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "quote_app" {
  name     = "quote-app-rg"
  location = "East US"
}

resource "azurerm_app_service_plan" "main" {
  name                = "quote-app-plan"
  location            = azurerm_resource_group.quote_app.location
  resource_group_name = azurerm_resource_group.quote_app.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_linux_web_app" "backend" {
  name                = "quote-app-backend"
  location            = azurerm_resource_group.quote_app.location
  resource_group_name = azurerm_resource_group.quote_app.name
  service_plan_id     = azurerm_app_service_plan.main.id

  site_config {
    application_stack {
      node_version = "18-lts"
    }
    always_on = false
  }

  app_settings = {
    NODE_ENV = "production"
  }
}

resource "azurerm_linux_web_app" "frontend" {
  name                = "quote-app-frontend"
  location            = azurerm_resource_group.quote_app.location
  resource_group_name = azurerm_resource_group.quote_app.name
  service_plan_id     = azurerm_app_service_plan.main.id

  site_config {
    application_stack {
      node_version = "18-lts"
    }
    always_on = false
  }
}