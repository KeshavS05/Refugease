# RefugEase

The four issues refugees often encounter and lack after resettlement are education, employment, legal services, and housing. Our team, RefugEase, has created a map which allows refugees to enter their location and the problems they are facing. Our map contains 466 organizations across the fifty states of the United States, and returns the closest organizations that supports their needs.

Our hack was created within 24 hours during HackTJ 10.0. We hope you enjoy!

## [👶🏻 Team Members]

Keshav Subramonian (11), Alina Chen (11), Brij Bhagat (11), and Anika Saraf (11)

## [🖥️ Presentation]

URL: https://docs.google.com/presentation/d/1oBy8ZrFQZRaExdHqgfbkstAUgA4ZX7tWMGzrXf4eg_I/edit?usp=sharing

## [🤔 How It Works]

We manually retrieved the names, addresses, and phone numbers of each of the organizations. We used the Google Apps Extension GeoCoder to extract the latitude and longitude from the address, and used a Google Sheets script to extract the link from each organization's website. After creating a .csv file with our data, we imported the data into Mapbox, an American provider of custom online maps. Our website takes two inputs: a user's location and their needs. After these two inputs, it produces a map which show the relevant organizations.
