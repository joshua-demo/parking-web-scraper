# Spartan Spaces

### Team Name: The Droppers 
**Joshua Demo** (joshua.demo@sjsu.edu) and **Steven Le** (steven.q.le@sjsu.edu)

## Problem to solve
[SJSU's parking status page](https://sjsuparkingstatus.sjsu.edu/) has a generic UI lacking visual representaions of parking data. Additionally, there lacks supplementary features that may be of use to SJSU students; it's a plain website.

## Functionality
This project scrapes the SJSU parking page for parking structure data to display the data over time; it'll mirror the core functionatily of SJSU's original website. However, this project will include additional supplementary features to support SJSU students find parking spaces. This may include visual representations of data, trend analysis, etc...

### High-level description of Solution (Plan + Approach)
We'll first focus on web-scraping; we need to pull data from SJSU's existing parking page as it's the core part of the project's functionality. From there, we'll create a FastAPI server that uses threads to scrape the aforementioned data at a TBD interval (this way, we're constantly "refreshing" data). From there, we'll connect the server to a React frontend styled in the theme(s) of SJSU. Finally, we'll make choices on what "supplementary features" may be useful to students looking at parking data, and implement such features.

## Technology Stack
**Backend**: Python FastAPI server <br>
**Frontend**: NextJS application styled with Tailwind + Chart JS <br>

## How to run Spartan Spaces
- Clone this repository into a local directory: ```git clone https://github.com/joshua-demo/parking-web-scraper```

### Backend Only
1. From the root directory, create a virutal environment (to handle packages)

    - Windows:
   ```sh
   python -m venv venv
   ```
    - MacOS/Linux:
   ```sh
   python3 -m venv venv
   ```

2. Activate virtual env

   - Windows:

   ```sh
   .\venv\modules\Scripts\activate.bat
   ```

   - MacOS/Linux

   ```sh
   source venv/bin/activate
   ```

3. Install dependencies

   ```sh
   pip install -r ./server/requirements.txt
   ```

4. Run script in the project's root directory
  - Command line:

    ```sh
    python ./server/server.py
    ```

### Frontend
1. From the root directory navigate to the frontend folder
  - Command line:

   ```sh
   cd ./frontend
   ```

2. Install dependencies

   ```sh
   npm i
   ```

3. Run script in the project's frontend folder

   ```sh
   npm run dev
   ```

What it should look like
![image](https://github.com/joshua-demo/parking-web-scraper/assets/116464215/ee5a05e5-0ece-4dee-9872-5a2817c48352)
