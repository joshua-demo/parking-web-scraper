# Sparking Status

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
**Frontend**: ReactJS application styled with Tailwind + DaisyUI <br>
Additional technologies TBD
