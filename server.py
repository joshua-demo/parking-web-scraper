import requests
from bs4 import BeautifulSoup

url = "https://sjsuparkingstatus.sjsu.edu/"

response = requests.get(url, verify=False)
soup = BeautifulSoup(response.content, "html.parser")

garages = soup.find_all(class_="garage__name")
garage_data = {}

for garage in garages:
    garage_name = garage.text.strip()
    fullness_text = garage.find_next(class_="garage__fullness").text.strip()

    if "full" in fullness_text.lower():
        fullness = "100%"
    else:
        fullness = fullness_text.split("%")[0].strip() + "%"

    garage_data[garage_name] = fullness

south_garage_fullness = garage_data.get("South Garage", "N/A")
west_garage_fullness = garage_data.get("West Garage", "N/A")
north_garage_fullness = garage_data.get("North Garage", "N/A")
south_campus_garage_fullness = garage_data.get("South Campus Garage", "N/A")

print("South Garage Fullness:", south_garage_fullness)
print("West Garage Fullness:", west_garage_fullness)
print("North Garage Fullness:", north_garage_fullness)
print("South Campus Garage Fullness:", south_campus_garage_fullness)
