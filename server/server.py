from datetime import datetime
import json
import logging
import threading
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import urllib3
import uvicorn

from bs4 import BeautifulSoup

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    timestamp_element = soup.find(class_="timestamp")
    timestamp = timestamp_element.text.strip().split("Last updated ")[1].split(" Refresh")[0]
    last_update_time = datetime.strptime(timestamp, "%Y-%m-%d %I:%M:%S %p")

    garage_data = {
        "time": last_update_time,
        "parking_data": parking_data
    }

# thread that periodically scrapes SJSU's parking status page
def helper_thread():
    print("Helper thread started.")  
    while True:
        try:
            update_garage_data()
            print("Successfully updated garage data.")
            # print(garage_data)
        except Exception:
            logging.exception("Unable to scrape data from SJSU's parking status page.")
        finally:
            time.sleep(5) # scrape periodically

if __name__ == 'server':
    helper = threading.Thread(target=helper_thread, daemon=True)
    helper.start()

# run server on localhost:8000
if __name__ == "__main__":
    uvicorn.run("server:app", host="localhost", port=8000, reload=True)
