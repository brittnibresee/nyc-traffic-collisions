# New York Vehicle Collisions

![alt text](https://github.com/yashkansal97/nyc-traffic-collisions-analysis/blob/main/images/shutterstockRF_1564421236.avif)

Car accidents are a significant public safety concern, resulting in thousands of injuries and fatalities every year. In New York, the problem is particularly severe, with hundreds of thousands of accidents reported annually. This dataset offers a comprehensive view of car accidents in New York, including location, time of day, and number of persons injured.

The project's primary goal is to analyze this data and gain insights into the factors contributing to car accidents, while especially identifying areas where collision frequency is high and more safety measures are needed. The ultimate objective is to establish a more comprehensive understanding of car accidents in New York, promote safer driving practices, and reduce the number of accidents in the city.

## Our team:
- Brittni Breese
- Yash Kansal
- Adam Paganini
- Nicole Campos
- Yeyan Wang

## Built with:
- Python
- Flask
- SQLite
- HTML
- CSS
- JavaScript
- D3

## Installation
To run the app:
1. Git clone- git@github.com:yashkansal97/nyc-traffic-collisions-analysis.git
2. CD into directory- nyc-traffic-collisions-analysis
3. Start Flask app with app.py
4. Visit localhost:5000 in a browser


## Implementation Details
This repository provides a collection of scripts and files that demonstrate the project's key features including:

1. ETL.ipynb - Performs the ETL, which includes:
    1. Requesting an API endpoint for collision data for February 2023
    2. Using pandas to clean up the data that was received
    3. Saving this data as a SQLite database for future use
2. app.py - A flask app with three endpoints, which include:
    1. “/data” - This endpoint reads from a local SQLite database and returns a jsonified result.
    2. “/boroughs” - This endpoint reads a geojson file which includes the boundaries for the different boroughs.
    3. “/” - This endpoint that returns the rendered index.html.
3. index.html - 
    1. Accesses all the libraries being used in the dashboard
    2. Displays various page contents:
        1. Buttons to switch between tabs and also access data sources
        2. Search bar which allows user input to zoom in on specified coordinates
        3. Two separate tabs analyzing the data
        4. Links to JavaScript and CSS files to render various visualizations
    3. Function that ensures the user can switch between the two tabs
4. logic.js - 
    1. Fetches tile layers and set up the map
    2. Uses d3 to fetch data from data endpoints from app.py. Once the data is fetched, this file creates the following:
        1. Map with collisions clusters and borough boundaries
        2. Bar chart that displays the boroughs vs. number of collisions
        3. Line chart that plots the number of injuries and deaths against the hour of the day
    3. Includes a function that uses the user input to zoom in on the map
5. style.css - This file stores all the styling specifications for various “ids” and “classes” in the index.html file.

## Credits
- New York Open Data 
- Geological survey data
- D3.js documentation: https://d3js.org
- Leaflet.js
- Moment.js
- Plotly.js
