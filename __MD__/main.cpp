#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJSON.h>
#define PZEMSensor D2
#define WaterSensor D3

const char *ssid = "Nama LAN Anda";
const char *password = "Password LAN Anda";

const char *id = "_id yang akan diupdate";

String serverName = "http://three-phase.herokuapp.com/data/" + id;

unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

void PZEMCalculation(int value)
{
  // Perhitungan PZEM
  return 30; // Contoh hasil = 30
}

void WaterSensorCalculation(int value)
{
  // Perhitungan Water Sensor
  return 20; // Contoh hasil = 20
}

void setup()
{
  Serial.begin(9600);
  pinMode(PZEMSensor, INPUT);
  pinMode(WaterSensor, INPUT);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop()
{
  if ((millis() - lastTime) > timerDelay)
  {
    if (WiFi.status() == WL_CONNECTED)
    {
      WiFiClient client;
      HTTPClient http;

      http.begin(client, serverName);
      http.addHeader("Content-Type", "application/json");

      int httpResponseCode = http.POST("{\"electric\":" + String(PZEMCalculation(analogRead(PZEMSensor))) + "\"water\":" + WaterSensorCalculation(analogRead(WaterSensor)) + "}");

      if (httpResponseCode > 0)
      {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else
      {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else
    {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}