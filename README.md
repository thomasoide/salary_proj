# Columbia Missourian State Worker Salary Database

## Overview
This is a working version of a searchable salary database I developed as a project for the Advanced Data Journalism class at the University of Missouri. It will eventually be deployed on the Columbia Missourian's website after I make a few improvements to it this summer. I developed this application because I noticed that a similar function at other news organizations got excellent engagement numbers. 
I developed the application using the Express framework for Node.js, Embedded JS as the view engine and MySQL to store the three separate databases. 
Here is a link to a video demonstration of the app: https://www.youtube.com/watch?v=m_0Yivv4c5o&t=1s
## Data
There is a data folder in the repository. It contains CSV files for the raw data as well as the SQL INSERT statements that I used to construct each table in the database. 
For the UM System data, I tracked first and last name only to make the database easier to construct. I also removed the records of UM System employees whose salary was less than $200, as they were paid hourly. 
The City of Columbia data was last updated on 3/2/18. The Missouri State Worker database data is from 2017, since their 2018 salary numbers are still being compiled. 
## Questions / Comments
I'm relatively new to programming, so I'm sure there are sections of this code that can be cleaned up and optimized. If you see any glaring or possibly fatal mistakes, feel free to contact me at thomas.t.oide@gmail.com. 
