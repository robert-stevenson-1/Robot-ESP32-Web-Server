#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "FS.h"
#include "SD.h"
#include "SPI.h"
#include <ArduinoJson.h>
#include "WiFi_Config.h"

// Replace with your network credentials
const char *ssid = WIFI_SSID;
const char *password = WIFI_PASSWORD;

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

// put function declarations here:
void initSDCard();
void initWiFi();

void handleLedTogglePOST(AsyncWebServerRequest *request)
{
  // Serial.println("Handle POST request");
  // // print the number of argument and parameters and headers
  // Serial.print("Number of arguments: "); Serial.println(request->args());
  // Serial.print("Number of parameters: "); Serial.println(request->params());
  // Serial.print("Number of headers: "); Serial.println(request->headers());

  // // Print all the header values
  // Serial.println("Header values:");
  // int headersCount = request->headers();
  // for (int i = 0; i < headersCount; i++) {
  //   AsyncWebHeader* header = request->getHeader(i);
  //   Serial.print(header->name());
  //   Serial.print(": ");
  //   Serial.println(header->value());
  // }

  // request->send(200);
}

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);

  pinMode(32, OUTPUT);
  digitalWrite(32, LOW);

  initWiFi();
  initSDCard();

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
  {
    request->send(SD, "/index.html", "text/html"); 
  });

  server.on("/LED_TOGGLE", HTTP_POST, handleLedTogglePOST,
            NULL,
            [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total)
            {
              for (size_t i = 0; i < len; i++)
              {
                Serial.write(data[i]);
              }

              Serial.println();

              DynamicJsonDocument jsonData(128);
              DeserializationError error = deserializeJson(jsonData, data);

              Serial.print("ledToggle (Json) val: "); Serial.println(jsonData["ledToggle"].as<bool>());
              digitalWrite(32, jsonData["ledToggle"].as<bool>() ? HIGH : LOW);
              request->send(200);
            });

  server.serveStatic("/", SD, "/");

  server.begin();
}

void loop()
{
  // put your main code here, to run repeatedly:
}

// put function definitions here:
void initSDCard()
{
  if (!SD.begin())
  {
    Serial.println("Card Mount Failed");
    return;
  }
  uint8_t cardType = SD.cardType();

  if (cardType == CARD_NONE)
  {
    Serial.println("No SD card attached");
    return;
  }

  Serial.print("SD Card Type: ");
  if (cardType == CARD_MMC)
  {
    Serial.println("MMC");
  }
  else if (cardType == CARD_SD)
  {
    Serial.println("SDSC");
  }
  else if (cardType == CARD_SDHC)
  {
    Serial.println("SDHC");
  }
  else
  {
    Serial.println("UNKNOWN");
  }
  uint64_t cardSize = SD.cardSize() / (1024 * 1024);
  Serial.printf("SD Card Size: %lluMB\n", cardSize);
}

void initWiFi()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}