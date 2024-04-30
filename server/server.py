from datetime import datetime
import json
import logging
import threading
import time

from fastapi import FastAPI
import requests
import urllib3
import uvicorn

from bs4 import BeautifulSoup

app = FastAPI()

url = "https://sjsuparkingstatus.sjsu.edu/"
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
http = urllib3.PoolManager(cert_reqs='CERT_NONE', assert_hostname=False)

@app.get("/")
async def root():
    return "Welcome to Spartan Spaces!"

@app.get("/parking")
async def get_garage_data():
    return garage_data

def update_garage_data():
    global garage_data  # indicate that we want to modify the global variable
    response = requests.get(url, verify=False)
    soup = BeautifulSoup(response.content, "html.parser")

    garages = soup.find_all(class_="garage__name")
    parking_data = []

    for garage in garages:
        garage_name = garage.text.strip()
        fullness_text = garage.find_next(class_="garage__fullness").text.strip()

        if "full" in fullness_text.lower():
            fullness = "100%"
        else:
            fullness = fullness_text.split("%")[0].strip() + "%"

        parking_data.append({
            "Garage Name": garage_name,
            "Fullness": fullness
        })

    garage_data = {
        "time": datetime.now(),
        "parking_data": parking_data
    }

# thread that periodically scrapes SJSU's parking status page
def helper_thread():
    print("Helper thread started.")  
    while True:
        try:
            update_garage_data()
            print(garage_data)
        except Exception:
            logging.exception("Unable to update cache")
        finally:
            time.sleep(5) # scrape periodically

if __name__ == 'server':
    helper = threading.Thread(target=helper_thread, daemon=True)
    helper.start()

# run server on localhost:8000
if __name__ == "__main__":
    uvicorn.run("server:app", host="localhost", port=8000, reload=True)