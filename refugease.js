const express = require('express');
var router = express.Router();
var haversine = require("haversine-distance");

dict = [
  {
    "Organization": "AIRP",
    "Address": "3775 Crosshaven Drive, Vestavia Hills, AL 35223",
    "Latitude": 33.4685307,
    "Longitude": -86.7307168,
    "Tag": "l, h",
    "Phone_Number": "N/A",
    "Link": "https://www.alirp.org/index.html"
  },
  {
    "Organization": "Birmingham Urban League",
    "Address": "2101 6th Ave N, Birmingham, AL 35203",
    "Latitude": 33.519866,
    "Longitude": -86.8069306,
    "Tag": "em, h",
    "Phone_Number": "(205) 326-0162",
    "Link": "https://birminghamul.org/"
  },
  {
    "Organization": "Jefferson County Literacy County",
    "Address": "218 S Wisconsin Drive, Jefferson, WI 53549",
    "Latitude": 43.0039292,
    "Longitude": -88.8110852,
    "Tag": "ed",
    "Phone_Number": "(920) 675-0500",
    "Link": "https://jcliteracyco.wixsite.com/jclc"
  },
  {
    "Organization": "La Casita",
    "Address": "92 Oxmoor Road Homewood, AL 35209",
    "Latitude": 33.455709,
    "Longitude": -86.8382124,
    "Tag": "ed",
    "Phone_Number": "(205) 987-4771",
    "Link": "https://hcsslacasita.org/"
  },
  {
    "Organization": "The Ministry Center at Green Springs",
    "Address": "2230 Green Springs Hwy. Birmingham, AL 35205",
    "Latitude": 33.4813301,
    "Longitude": -86.8244937,
    "Tag": "ed",
    "Phone_Number": "(205) 326-1211",
    "Link": "https://mcgsonline.org/english-second-language/"
  },
  {
    "Organization": "Alaska Literacy Program",
    "Address": "1345 Rudakof Circle, Suite 104 Anchorage, AK, 99508, US",
    "Latitude": 61.2088161,
    "Longitude": -149.8050301,
    "Tag": "ed",
    "Phone_Number": "907-337-1981",
    "Link": "https://www.alaskaliteracyprogram.org/"
  },
  {
    "Organization": "AmeriCorps",
    "Address": "9397 La Perouse Ave, Juneau, AK 99801",
    "Latitude": 58.3618851,
    "Longitude": -134.5910609,
    "Tag": "ed, em",
    "Phone_Number": "1-800-942-2677",
    "Link": "https://my.americorps.gov/mp/listing/viewListing.do;jsessionid=GxdjThnJQJmJkBlX3pQD8VG6vCDyt1bPnj2fP33ZbSTR5WVw9Qyx!-2041373993?id=55862&fromSearch=true"
  },
  {
    "Organization": "IRC Phoenix",
    "Address": "4425 West Olive Avenue #400 Glendale, AZ 85302",
    "Latitude": 33.5663699,
    "Longitude": -112.1542773,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(602) 433-2440",
    "Link": "https://www.rescue.org/united-states/phoenix-az"
  },
  {
    "Organization": "IRC Tucson",
    "Address": "1011 North Craycroft Road Suite 404 Tucson, AZ85711",
    "Latitude": 32.2349309,
    "Longitude": -110.8758746,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(520) 319-2128",
    "Link": "https://www.rescue.org/united-states/tucson-az"
  },
  {
    "Organization": "Catholic Charities Community Service Arizona",
    "Address": "4747 N. 7th Avenue, Phoenix AZ 85013",
    "Latitude": 33.5072957,
    "Longitude": -112.0821902,
    "Tag": "ed, em",
    "Phone_Number": "1-855-316-2229",
    "Link": "https://www.catholiccharitiesaz.org/all-locations/refugee-resettlement#:~:text=Catholic%20Charities%20is%20one%20of,hygiene%20products%20and%20basic%20bedding."
  },
  {
    "Organization": "ICS",
    "Address": "122 North Craycroft Road Tucson, AZ 85711",
    "Latitude": 32.2236963,
    "Longitude": -110.8739653,
    "Tag": "ed, l",
    "Phone_Number": "(520) 297-6049",
    "Link": "https://www.icstucson.org/who-we-are/mission-vision/"
  },
  {
    "Organization": "Arizona Refugee Resettlement Program",
    "Address": "4635 S Central Ave Phoenix AZ 85040-2148",
    "Latitude": 33.4034698,
    "Longitude": -112.0727135,
    "Tag": "ed, h",
    "Phone_Number": "(833) 762-8196",
    "Link": "https://des.az.gov/refugee-resettlement"
  },
  {
    "Organization": "Arkansas Marshallese",
    "Address": "614 East Emma Avenue, Springdale, AR, 72764",
    "Latitude": 36.185448,
    "Longitude": -94.1228329,
    "Tag": "ed",
    "Phone_Number": 4793656625,
    "Link": "https://www.arkansasmarshallese.org/tolemour"
  },
  {
    "Organization": "Arkansas United",
    "Address": "104 W Colt Square Dr., Suite 3, Fayetteville, AR 72703",
    "Latitude": 36.0937215,
    "Longitude": -94.1576779,
    "Tag": "ed, l",
    "Phone_Number": "(479) 347-2824",
    "Link": "https://arkansasunited.org/en/services/#es-servicelink"
  },
  {
    "Organization": "Arkansas Justice",
    "Address": "4024 Wagon Wheel Rd, Springdale, AR 72762",
    "Latitude": 36.2264479,
    "Longitude": -94.1737857,
    "Tag": "ed, l",
    "Phone_Number": "(479) 276-3180",
    "Link": "https://arjustice.org/about"
  },
  {
    "Organization": "Canopy Northwest Arkansas",
    "Address": "1142 N. Futrall Dr., Fayetteville, AR 72703",
    "Latitude": 36.0792626,
    "Longitude": -94.1979552,
    "Tag": "em, ed, l, h",
    "Phone_Number": "479-717-7358",
    "Link": "https://www.canopynwa.org/"
  },
  {
    "Organization": "The Little Rock Compassion Center",
    "Address": "3618 W. Roosevelt Road, Little Rock, Arkansas 72204",
    "Latitude": 34.725912,
    "Longitude": -92.3146548,
    "Tag": "ed, em, h",
    "Phone_Number": "501-296-9114",
    "Link": "https://lrcompassioncenter.org/our-services/"
  },
  {
    "Organization": "World Relief Sacramento",
    "Address": "2233 Watt Ave Suite 110 Sacramento, CA 95825",
    "Latitude": 38.6044309,
    "Longitude": -121.3837188,
    "Tag": "ed, em, l, h",
    "Phone_Number": "916-978-2650",
    "Link": "https://worldrelief.org/sacramento/about-us/"
  },
  {
    "Organization": "NARIKA",
    "Address": "1708 Fremont, CA 94538",
    "Latitude": 37.5042267,
    "Longitude": -121.9643745,
    "Tag": "ed",
    "Phone_Number": "(510) 444-6068",
    "Link": "https://www.narika.org/"
  },
  {
    "Organization": "California Language Academy",
    "Address": "8632 South Sepulveda Boulevard, #203 Los Angeles, CA 90045",
    "Latitude": 33.9588784,
    "Longitude": -118.3957869,
    "Tag": "ed",
    "Phone_Number": "(310) 910-0133",
    "Link": "https://cla.edu/"
  },
  {
    "Organization": "Refugee Transitions",
    "Address": "1811 11th Ave. Oakland, CA 94606",
    "Latitude": 37.7943447,
    "Longitude": -122.2451375,
    "Tag": "ed",
    "Phone_Number": "415.989.2151",
    "Link": "https://www.reftrans.org/"
  },
  {
    "Organization": "IRC San Diego",
    "Address": "5348 University Ave Suite 205 San Diego, CA92105",
    "Latitude": 32.7494316,
    "Longitude": -117.0810241,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(619) 641-7510",
    "Link": "https://www.rescue.org/united-states/san-diego-ca"
  },
  {
    "Organization": "IRC Sacramento",
    "Address": "2020 Hurley Way Suite 420 Sacramento, CA 95825",
    "Latitude": 38.5885872,
    "Longitude": -121.4178497,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(916) 482-0120",
    "Link": "https://www.rescue.org/united-states/sacramento-ca"
  },
  {
    "Organization": "IRC Los Angeles",
    "Address": "625 N. Maryland Ave Glendale, CA 91206",
    "Latitude": 34.1556269,
    "Longitude": -118.2541927,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(818) 550-6220",
    "Link": "https://www.rescue.org/united-states/los-angeles-ca"
  },
  {
    "Organization": "IRC Oakland",
    "Address": "440 Grand Avenue Suite 500 Oakland, CA 94610",
    "Latitude": 37.8089292,
    "Longitude": -122.2530187,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(510) 452-8222",
    "Link": "https://www.rescue.org/united-states/oakland-ca"
  },
  {
    "Organization": "IRC San Jose",
    "Address": "1210 South Bascom Ave. Suite 227 San Jose, CA 95128",
    "Latitude": 37.3041579,
    "Longitude": -121.9314364,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(408) 277-0255",
    "Link": "https://www.rescue.org/united-states/san-jose-ca"
  },
  {
    "Organization": "IRC Turlock",
    "Address": "3446 N Golden State Blvd Suite A Turlock, CA 95382",
    "Latitude": 37.5243384,
    "Longitude": -120.8797708,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(209) 667-2378",
    "Link": "https://www.rescue.org/united-states/turlock-ca"
  },
  {
    "Organization": "World Relief Modesto",
    "Address": "909 14th Street Modesto, CA 95354",
    "Latitude": 37.6425458,
    "Longitude": -120.9959891,
    "Tag": "ed, em, l",
    "Phone_Number": "(209) 491-2712",
    "Link": "https://worldrelief.org/modesto/"
  },
  {
    "Organization": "World Relief Southern California",
    "Address": "13121 Brookhurst Street, #H Garden Grove, CA 92843",
    "Latitude": 33.7718889,
    "Longitude": -117.9560632,
    "Tag": "ed, em, l",
    "Phone_Number": "(714) 210-4730",
    "Link": "https://worldrelief.org/socal/"
  },
  {
    "Organization": "Catholic Charities Contra Costa County Family Literacy Program",
    "Address": "4700 Calaveras Ave., Fremont, CA 94538",
    "Latitude": 37.538423,
    "Longitude": -121.9910691,
    "Tag": "ed",
    "Phone_Number": "(510) 793-6465",
    "Link": "https://catholiccharitiesca.org/where-we-operate/"
  },
  {
    "Organization": "IRC Colorado",
    "Address": "1873 S. Bellaire St. 5th Floor Denver, CO 80222",
    "Latitude": 39.6829383,
    "Longitude": -104.9377215,
    "Tag": "ed, em, l, h",
    "Phone_Number": "720-328-6655",
    "Link": "https://www.rescue.org/united-states/denver-co"
  },
  {
    "Organization": "LFSRM Colorado Springs",
    "Address": "First Lutheran Church 1515 N. Cascade Colorado Springs, CO 80907",
    "Latitude": 38.8553893,
    "Longitude": -104.8235282,
    "Tag": "ed, em, h",
    "Phone_Number": "719.227.8899",
    "Link": "https://www.lfsrm.org/locations/"
  },
  {
    "Organization": "LFSRM Denver",
    "Address": "1035 Osage Street, Suite 700, Denver, CO 80204",
    "Latitude": 39.7327268,
    "Longitude": -105.0056091,
    "Tag": "ed, em, h",
    "Phone_Number": "303.922.3433",
    "Link": "https://www.lfsrm.org/locations/"
  },
  {
    "Organization": "LFSRM Fort Collins",
    "Address": "2032 Lowe Street, Suite 200, Fort Collins, CO 80525",
    "Latitude": 40.532504,
    "Longitude": -105.039757,
    "Tag": "ed, em, h",
    "Phone_Number": "970.266.1788",
    "Link": "https://www.lfsrm.org/locations/"
  },
  {
    "Organization": "LSFRM Greeley",
    "Address": "815 9th Street, Greeley, CO 80631",
    "Latitude": 40.424219,
    "Longitude": -104.691672,
    "Tag": "ed, em, h",
    "Phone_Number": "970.356.6751",
    "Link": "https://www.lfsrm.org/locations/"
  },
  {
    "Organization": "Focus Points Family Center",
    "Address": "2501 East 48th Ave Denver, Colorado 80216",
    "Latitude": 39.7840285,
    "Longitude": -104.9569255,
    "Tag": "ed",
    "Phone_Number": "303-292-0770",
    "Link": "https://www.focuspoints.org/family-services/adult-education/"
  },
  {
    "Organization": "Jefferson Public Schools",
    "Address": "5280 W. Ohio Ave. Lakewood, CO  80226",
    "Latitude": 39.7018583,
    "Longitude": -105.0551937,
    "Tag": "ed",
    "Phone_Number": "303-982-6500",
    "Link": "https://www.jeffcopublicschools.org/programs/adult_education/adult_esl"
  },
  {
    "Organization": "Emily Griffith Technical College",
    "Address": "1860 Lincoln St 3rd floor, Denver, CO 80203",
    "Latitude": 39.7455916,
    "Longitude": -104.9857118,
    "Tag": "ed, em",
    "Phone_Number": "720-423-4700",
    "Link": "https://www.emilygriffith.edu/language-learning-center/"
  },
  {
    "Organization": "Spring Institute",
    "Address": "1373 Grant St. Denver, CO 80203",
    "Latitude": 39.7380851,
    "Longitude": -104.984036,
    "Tag": "ed",
    "Phone_Number": "(303) 863-0188",
    "Link": "https://springinstitute.org/"
  },
  {
    "Organization": "Immigration and Refugee Center",
    "Address": "3001 8TH AVE SUITE 170, EVANS, CO 80620",
    "Latitude": 40.3886884,
    "Longitude": -104.6917701,
    "Tag": "ed, em",
    "Phone_Number": "(970) 352-7323",
    "Link": "https://www.ircnoco.org/education"
  },
  {
    "Organization": "District 11 ESL",
    "Address": "2115 Afton Way Colorado Springs, CO 80909",
    "Latitude": 38.861339,
    "Longitude": -104.782086,
    "Tag": "ed",
    "Phone_Number": "719-328-3001",
    "Link": "https://www.d11.org/domain/1201"
  },
  {
    "Organization": "IRIS",
    "Address": "235 Nicoll Street New Haven, CT 06511",
    "Latitude": 41.3209731,
    "Longitude": -72.9077592,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(203) 562-2095",
    "Link": "https://irisct.org/"
  },
  {
    "Organization": "Catholic Charities Fairfield",
    "Address": "238 Jewett Ave Bridgeport, CT 06606",
    "Latitude": 41.2118414,
    "Longitude": -73.2171387,
    "Tag": "ed, l, h",
    "Phone_Number": "(203) 416-1503",
    "Link": "https://www.ccfairfield.org/"
  },
  {
    "Organization": "Jewish Family Services",
    "Address": "333 Bloomfield Avenue, Suite A West Hartford, CT 06117",
    "Latitude": 41.7994867,
    "Longitude": -72.7249266,
    "Tag": "ed, em",
    "Phone_Number": "(860) 236-1927",
    "Link": "https://jfshartford.org/"
  },
  {
    "Organization": "Catholic Charities Hartfield",
    "Address": "839-841 Asylum Avenue Hartford, CT 06105-2801",
    "Latitude": 41.7695198,
    "Longitude": -72.6927943,
    "Tag": "ed, em, h",
    "Phone_Number": "888.405.1183",
    "Link": "https://www.ccaoh.org/how-we-help/"
  },
  {
    "Organization": "B1C",
    "Address": "417 Shippan Ave, Stamford, CT 06902",
    "Latitude": 41.0452136,
    "Longitude": -73.5243959,
    "Tag": "ed, l",
    "Phone_Number": "(203) 674-8585",
    "Link": "https://building1community.org/"
  },
  {
    "Organization": "Jewish Family Services of Delaware",
    "Address": "99 Passmore Road Wilmington, DE 19803",
    "Latitude": 39.8108788,
    "Longitude": -75.5525474,
    "Tag": "ed, em",
    "Phone_Number": "302-478-9411",
    "Link": "https://www.jfsdelaware.org/refugee-emigre-services/"
  },
  {
    "Organization": "Deleware DoE",
    "Address": "35 Commerce Way, Suite 1 Dover, DE 19904",
    "Latitude": 39.1548391,
    "Longitude": -75.545159,
    "Tag": "ed",
    "Phone_Number": "302-857-3340",
    "Link": "https://www.doe.k12.de.us/Page/2928"
  },
  {
    "Organization": "IRC Miami",
    "Address": "453504 Miami, FL33245",
    "Latitude": 25.7506483,
    "Longitude": -80.2240177,
    "Tag": "ed, em, h, l",
    "Phone_Number": "(305) 640-9881",
    "Link": "https://www.rescue.org/united-states/miami-fl"
  },
  {
    "Organization": "IRC Tallahassee",
    "Address": "1310 Cross Creek Circle Suite A Tallahassee, FL 32301",
    "Latitude": 30.4297772,
    "Longitude": -84.2374285,
    "Tag": "ed, em, h, l",
    "Phone_Number": "(850) 391-9610",
    "Link": "https://www.rescue.org/united-states/tallahassee-fl"
  },
  {
    "Organization": "Florida Department",
    "Address": "2415 North Monroe Street, Suite 400, Tallahassee, FL 32303-4190",
    "Latitude": 30.4760858,
    "Longitude": -84.2931241,
    "Tag": "ed, em",
    "Phone_Number": "1-850-487-1111",
    "Link": "https://www.myflfamilies.com/services/public-assistance/refugee-services/refugee-services-overview"
  },
  {
    "Organization": "Gulf Coast JFCS",
    "Address": "14041 Icot Blvd. Clearwater, FL 33760",
    "Latitude": 27.8993784,
    "Longitude": -82.7148647,
    "Tag": "ed, h",
    "Phone_Number": "727.479.1800",
    "Link": "https://gulfcoastjewishfamilyandcommunityservices.org/"
  },
  {
    "Organization": "Catholic Charities Central Florida",
    "Address": "1819 N Semoran Blvd Orlando, FL 32807",
    "Latitude": 28.5692444,
    "Longitude": -81.3102847,
    "Tag": "ed, em, l",
    "Phone_Number": "(407) 658-0110",
    "Link": "https://cflcc.org/immigrants-refugees/"
  },
  {
    "Organization": "Florida Immigrant Care",
    "Address": "2800 Biscayne Blvd, Suite 300 Miami, FL 33137",
    "Latitude": 25.8037143,
    "Longitude": -80.1895552,
    "Tag": "ed, l",
    "Phone_Number": "(305) 571-7254",
    "Link": "https://floridaimmigrant.org/services/"
  },
  {
    "Organization": "IRC Atlanta",
    "Address": "2305 Parklake Drive Suite 100 Atlanta, GA 30345",
    "Latitude": 33.8534279,
    "Longitude": -84.2471052,
    "Tag": "ed, em, h, l",
    "Phone_Number": "(404) 292-7731",
    "Link": "https://www.rescue.org/united-states/atlanta-ga"
  },
  {
    "Organization": "New American Pathways",
    "Address": "2300 Henderson Mill Rd NE, Suite 100 Atlanta, GA 30345",
    "Latitude": 33.8527241,
    "Longitude": -84.259776,
    "Tag": "ed, l, h",
    "Phone_Number": "404.299.6099",
    "Link": "https://newamericanpathways.org/"
  },
  {
    "Organization": "Catholic Charities Atlanta",
    "Address": "3669 North Peachtree Road Chamblee, GA 30341",
    "Latitude": 33.8993876,
    "Longitude": -84.2933375,
    "Tag": "ed, l, h",
    "Phone_Number": "770-429-2369",
    "Link": "https://catholiccharitiesatlanta.org/"
  },
  {
    "Organization": "Global Village Project",
    "Address": "1548 Decatur, GA 30031",
    "Latitude": 33.7752916,
    "Longitude": -84.3042618,
    "Tag": "ed, em",
    "Phone_Number": "404-371-0107",
    "Link": "https://globalvillageproject.org/"
  },
  {
    "Organization": "Friends of Refugees",
    "Address": "548, Clarkston, GA 30021",
    "Latitude": 33.8095487,
    "Longitude": -84.2396434,
    "Tag": "ed, h",
    "Phone_Number": "404-292-8818",
    "Link": "https://friendsofrefugees.com/blog-page/"
  },
  {
    "Organization": "Helping Hands Hawaii",
    "Address": "Helping Hands Hawaii 2100 N. Nimitz Hwy. Honolulu, HI 96819",
    "Latitude": 21.3277433,
    "Longitude": -157.8852871,
    "Tag": "ed",
    "Phone_Number": "(808) 536-7234",
    "Link": "https://helpinghandshawaii.org/"
  },
  {
    "Organization": "Pacific Gateway Center",
    "Address": "723-C Umi St. Honolulu, HI 96819",
    "Latitude": 21.3332339,
    "Longitude": -157.8821062,
    "Tag": "ed, l, h",
    "Phone_Number": "(808) 851-7010",
    "Link": "https://www.pacificgatewaycenter.org/immigration-and-refugee-services"
  },
  {
    "Organization": "Hawaii Literacy",
    "Address": "West O’ahu Christian Church 94-420 Farrington Hwy",
    "Latitude": 21.3820168,
    "Longitude": -158.0151849,
    "Tag": "ed",
    "Phone_Number": "(808) 778-8490.",
    "Link": "https://www.hawaiiliteracy.org/ell"
  },
  {
    "Organization": "IRC Boise",
    "Address": "7291 W Franklin Road Boise, ID83709",
    "Latitude": 43.6049815,
    "Longitude": -116.3142928,
    "Tag": "ed, l, h, em",
    "Phone_Number": "(208) 344-1792",
    "Link": "https://www.rescue.org/united-states/boise-id"
  },
  {
    "Organization": "Indy Reads",
    "Address": "1066 Virginia Ave Indianapolis, IN 46203",
    "Latitude": 39.7525448,
    "Longitude": -86.1400562,
    "Tag": "ed",
    "Phone_Number": "(317) 384-1496",
    "Link": "https://indyreads.org/"
  },
  {
    "Organization": "English Language Center",
    "Address": "1607 W. Jefferson St. Boise, ID 83702",
    "Latitude": 43.6226044,
    "Longitude": -116.2112249,
    "Tag": "ed, l",
    "Phone_Number": "208.336.4222",
    "Link": "https://www.idahorefugees.org/elc.html"
  },
  {
    "Organization": "CSI Refugee Center",
    "Address": "1526 Highland Ave. E. Twin Falls, Idaho 83301",
    "Latitude": 42.544636,
    "Longitude": -114.4544646,
    "Tag": "ed, em, l",
    "Phone_Number": "208-736-2166",
    "Link": "https://refugeecenter.csi.edu/programs/englishTraining.asp"
  },
  {
    "Organization": "World Relief Chicagoland",
    "Address": "3507 W. Lawrence Ave. Chicago, Illinois 60625",
    "Latitude": 41.968213,
    "Longitude": -87.7162129,
    "Tag": "ed, em, l",
    "Phone_Number": "(773) 583-9191",
    "Link": "https://worldrelief.org/chicagoland/"
  },
  {
    "Organization": "World Relief Quad Cities",
    "Address": "1852 16th St. Moline, IL 61265",
    "Latitude": 41.4933928,
    "Longitude": -90.5132116,
    "Tag": "ed, em, l",
    "Phone_Number": "(309) 764-2279",
    "Link": "https://worldrelief.org/quad-cities/"
  },
  {
    "Organization": "The Immigration Project",
    "Address": "211 Landmark Drive, Suite B3A, Normal, IL 61761",
    "Latitude": 40.5155004,
    "Longitude": -88.9551702,
    "Tag": "ed, em, h",
    "Phone_Number": "(309) 829-8703",
    "Link": "https://www.immigrationproject.org/social-services/"
  },
  {
    "Organization": "RefugeeOne",
    "Address": "6008 N. California Ave. Chicago, IL 60659",
    "Latitude": 41.9906017,
    "Longitude": -87.699544,
    "Tag": "ed, em, h",
    "Phone_Number": "(773) 989-5647",
    "Link": "https://www.refugeeone.org/howwehelp.html"
  },
  {
    "Organization": "Syrian Community Network",
    "Address": "5439 Broadway Avenue Chicago, Illinois 60640",
    "Latitude": 41.981152,
    "Longitude": -87.6596736,
    "Tag": "ed, l",
    "Phone_Number": "773-654-1218",
    "Link": "https://www.syriancommunitynetwork.org/"
  },
  {
    "Organization": "HIAS",
    "Address": "216 W. Jackson St, Suite 700 Chicago, IL 60606",
    "Latitude": 41.8783849,
    "Longitude": -87.6344882,
    "Tag": "em, l, h",
    "Phone_Number": "312.357.4666",
    "Link": "https://www.jcfs.org/hias"
  },
  {
    "Organization": "Immigration Welcome Center",
    "Address": "40 E St. Clair Street Indianapolis, IN 46204",
    "Latitude": 39.7786372,
    "Longitude": -86.1568144,
    "Tag": "ed",
    "Phone_Number": "317.808.2326",
    "Link": "https://www.immigrantwelcomecenter.org/"
  },
  {
    "Organization": "Refugee Health Programs",
    "Address": "2 N Meridian St, Indianapolis, IN 46204",
    "Latitude": 39.7674437,
    "Longitude": -86.1585634,
    "Tag": "ed",
    "Phone_Number": "317) 233-1325",
    "Link": "https://www.in.gov/health/refugee-health/"
  },
  {
    "Organization": "Jewish Family Services",
    "Address": "6705 Hoover Road Indianapolis, IN 46260",
    "Latitude": 39.8796257,
    "Longitude": -86.1732495,
    "Tag": "ed",
    "Phone_Number": "317-726-5450",
    "Link": "https://www.jewishindianapolis.org/jfs"
  },
  {
    "Organization": "Indiana Refugee Network",
    "Address": "3306 Van Tassel Dr, Indianapolis, IN 46240",
    "Latitude": 39.8880194,
    "Longitude": -86.1104682,
    "Tag": "ed",
    "Phone_Number": "317-603-9796",
    "Link": "https://indianarefugeenetwork.org/"
  },
  {
    "Organization": "IRC Des Moines",
    "Address": "108 3rd Street Unit #200 Des Moines, IA 50309",
    "Latitude": 41.584199,
    "Longitude": -93.6202491,
    "Tag": "ed, em, l, h",
    "Phone_Number": "515-216-3619",
    "Link": "https://www.rescue.org/united-states/des-moines-ia"
  },
  {
    "Organization": "Catholic Charities Des Moines",
    "Address": "601 Grand Ave, Des Moines, IA 50309",
    "Latitude": 41.5880641,
    "Longitude": -93.6258173,
    "Tag": "ed, em",
    "Phone_Number": "(515) 244-3761",
    "Link": "https://www.catholiccharitiesdm.org/our-services/refugee-services/"
  },
  {
    "Organization": "Iowa International Center",
    "Address": "3839 Merle Hay Road Suite 259 Des Moines, IA 50310",
    "Latitude": 41.6309218,
    "Longitude": -93.6972439,
    "Tag": "ed",
    "Phone_Number": "515-282-8269",
    "Link": "https://iowainternationalcenter.org/services/"
  },
  {
    "Organization": "Iowa Migrant Movement for Justice",
    "Address": "41006 Des Moines, IA 50311",
    "Latitude": 41.5868353,
    "Longitude": -93.6249593,
    "Tag": "ed, em",
    "Phone_Number": "(515) 255-9809",
    "Link": "https://www.iowammj.org/"
  },
  {
    "Organization": "Lutheran Services in Iowa",
    "Address": "1323 Northwestern Ave. Ames, IA 50010",
    "Latitude": 42.0354783,
    "Longitude": -93.62608,
    "Tag": "ed, l, h",
    "Phone_Number": "515.232.7262",
    "Link": "https://lsiowa.org/"
  },
  {
    "Organization": "USCRI Des Moines",
    "Address": "1200 University Ave #205, Des Moines, IA 50314",
    "Latitude": 41.600129,
    "Longitude": -93.6331255,
    "Tag": "ed, em, l, h",
    "Phone_Number": "515-528-7525",
    "Link": "https://refugees.org/uscri-des-moines/"
  },
  {
    "Organization": "NLD",
    "Address": "2309 Euclid Avenue Des Moines, IA 50309",
    "Latitude": 41.6293273,
    "Longitude": -93.6482249,
    "Tag": "ed",
    "Phone_Number": "(515) 286-3928",
    "Link": "https://www.nld.org/reap-refugee-english-and-acculturation-project"
  },
  {
    "Organization": "IRC Wichita",
    "Address": "420 South Emporia Suite 200 Wichita, KS 67202",
    "Latitude": 37.6812953,
    "Longitude": -97.3325631,
    "Tag": "ed, em, l, h",
    "Phone_Number": "316-351-5495",
    "Link": "https://www.rescue.org/united-states/wichita-ks"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "600 Minnesota Avenue, Kansas City, Kansas",
    "Latitude": 39.1157893,
    "Longitude": -94.6242944,
    "Tag": "ed, em, l",
    "Phone_Number": "913.433.2100",
    "Link": "https://catholiccharitiesks.org/refugees/"
  },
  {
    "Organization": "Della Lamb",
    "Address": "500 Woodland Ave. Kansas City, MO 64106",
    "Latitude": 39.1086158,
    "Longitude": -94.5603199,
    "Tag": "ed, em",
    "Phone_Number": "816.842.8040",
    "Link": "https://www.dellalamb.org/services/refugee-services/"
  },
  {
    "Organization": "Catholic Charities Southwest",
    "Address": "2201 16th St. Great Bend, KS 67530",
    "Latitude": 38.3673945,
    "Longitude": -98.7682398,
    "Tag": "ed, h",
    "Phone_Number": "620-792-1393",
    "Link": "https://catholiccharitiesswks.org/services"
  },
  {
    "Organization": "IRC Louisville",
    "Address": "1951 Bishop Lane, Suite 100 Louisville, KY 40218",
    "Latitude": 38.203604,
    "Longitude": -85.6823197,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(502) 963 5939",
    "Link": "https://www.rescue.org/united-states/louisville-ky"
  },
  {
    "Organization": "KRM",
    "Address": "969-B Cherokee Road Louisville, Kentucky 40204",
    "Latitude": 38.2416782,
    "Longitude": -85.7229279,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(502) 479-9180",
    "Link": "https://kyrm.org/services/"
  },
  {
    "Organization": "Catholic Charities of Louisville",
    "Address": "2911 S Fourth St Louisville, KY 40208",
    "Latitude": 38.2068873,
    "Longitude": -85.7647948,
    "Tag": "ed",
    "Phone_Number": "502-637-9786",
    "Link": "https://cclou.org/programs/"
  },
  {
    "Organization": "Paths to Peace",
    "Address": "2500 Montgomery Street, Louisville, KY 40212",
    "Latitude": 38.2717993,
    "Longitude": -85.7885675,
    "Tag": "ed, h",
    "Phone_Number": "(502) 214-7322",
    "Link": "https://paths2peace.org/about-ipp"
  },
  {
    "Organization": "Americana World Community Center",
    "Address": "4801 Southside Drive Louisville, KY 40214",
    "Latitude": 38.1787301,
    "Longitude": -85.7642412,
    "Tag": "ed, h",
    "Phone_Number": "(502) 366-7813",
    "Link": "http://americanacc.org/about-us/programs/"
  },
  {
    "Organization": "Lori",
    "Address": "1120 Government Street, Ste. E Baton Rouge, LA 70802",
    "Latitude": 30.4432303,
    "Longitude": -91.1762889,
    "Tag": "ed, em, h",
    "Phone_Number": "225-239-7819",
    "Link": "https://www.mylori.org/"
  },
  {
    "Organization": "Louisiana Refugee",
    "Address": "628 N. 4th Street | Baton Rouge, LA 70802",
    "Latitude": 30.4529874,
    "Longitude": -91.1865314,
    "Tag": "ed, em",
    "Phone_Number": "225.342.8093",
    "Link": "http://www.louisianarefugees.org/"
  },
  {
    "Organization": "Louisiana Department of Education",
    "Address": "1201 North Third Street Baton Rouge, LA 70802-5243",
    "Latitude": 30.4597179,
    "Longitude": -91.1885601,
    "Tag": "ed",
    "Phone_Number": "1.877.453.2721",
    "Link": "https://www.louisianabelieves.com/"
  },
  {
    "Organization": "LSU",
    "Address": "2020 Gravier Street, 3rd Floor New Orleans, LA 70112",
    "Latitude": 29.956727,
    "Longitude": -90.0836199,
    "Tag": "ed",
    "Phone_Number": "(504) 568-5700",
    "Link": "https://sph.lsuhsc.edu/service/institute-for-public-health-and-justice/"
  },
  {
    "Organization": "Urban League",
    "Address": "4640 S. Carrollton Avenue, Suite 210 New Orleans, Louisiana 70119",
    "Latitude": 29.9733072,
    "Longitude": -90.1015512,
    "Tag": "ed, em, h",
    "Phone_Number": "(504) 620-2332",
    "Link": "https://urbanleaguela.org/"
  },
  {
    "Organization": "Opportunity Alliance",
    "Address": "50 Lydia Lane South Portland, ME 04106",
    "Latitude": 43.6376142,
    "Longitude": -70.3034479,
    "Tag": "ed",
    "Phone_Number": "207.874.1175",
    "Link": "https://www.opportunityalliance.org/"
  },
  {
    "Organization": "MEIRS",
    "Address": "256 Bartlett St. Lewiston, ME 04240",
    "Latitude": 44.0919063,
    "Longitude": -70.2077218,
    "Tag": "ed, em, h",
    "Phone_Number": "207-782-0260",
    "Link": "https://meirs.org/"
  },
  {
    "Organization": "LearningWorks",
    "Address": "181 Brackett Street Portland, ME 04102",
    "Latitude": 43.65122,
    "Longitude": -70.2673928,
    "Tag": "ed",
    "Phone_Number": "(207) 775-0105",
    "Link": "https://www.learningworks.me/"
  },
  {
    "Organization": "Eastern Maine Community College",
    "Address": "354 Hogan Road, Bangor, Maine",
    "Latitude": 44.8260177,
    "Longitude": -68.7442704,
    "Tag": "ed",
    "Phone_Number": "(207) 974-4600",
    "Link": "https://www.emcc.edu/academics/programs/programs-of-study/"
  },
  {
    "Organization": "Souther Maine Community College",
    "Address": "2 Fort Road, South Portland, Maine 04106",
    "Latitude": 43.6467515,
    "Longitude": -70.22922,
    "Tag": "ed",
    "Phone_Number": "207-741-5500",
    "Link": "https://www.smccme.edu/"
  },
  {
    "Organization": "Bangor Adult Education",
    "Address": "121 York Street • Bangor, ME 04401",
    "Latitude": 44.8023402,
    "Longitude": -68.7653507,
    "Tag": "ed",
    "Phone_Number": "207-941-6316",
    "Link": "https://bangor.maineadulted.org/"
  },
  {
    "Organization": "IRC Baltimore",
    "Address": "1900 N. Howard Street, Suite 200 Baltimore, MD 21218",
    "Latitude": 39.3113407,
    "Longitude": -76.6195646,
    "Tag": "ed, em, h, l",
    "Phone_Number": "(410) 327-1885",
    "Link": "https://www.rescue.org/united-states/baltimore-md"
  },
  {
    "Organization": "IRC Silver Spring",
    "Address": "8737 Colesville Road Suite 1200 Silver Spring, MD 20910",
    "Latitude": 38.9987367,
    "Longitude": -77.0257741,
    "Tag": "ed, em, h, l",
    "Phone_Number": "(301) 562-8633",
    "Link": "https://www.rescue.org/united-states/silver-spring-md"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "320 Cathedral Street Baltimore, MD 21201",
    "Latitude": 39.2937695,
    "Longitude": -76.6170385,
    "Tag": "ed",
    "Phone_Number": "667-600-2000",
    "Link": "https://cc-md.org/programs/esperanza-center/esperanza-center-services/"
  },
  {
    "Organization": "Refugee Training Center",
    "Address": "18330 Montgomery Village Ave. Gaithersburg, MD 20879",
    "Latitude": 39.1581266,
    "Longitude": -77.2054364,
    "Tag": "ed, em",
    "Phone_Number": "240-567-5000",
    "Link": "https://www.montgomerycollege.edu/workforce-development-continuing-education/english-language-skills/refugee/index.html"
  },
  {
    "Organization": "IINE Boston",
    "Address": "2 Boylston Street, 3rd Floor Boston, MA 02116",
    "Latitude": 42.352076,
    "Longitude": -71.063102,
    "Tag": "ed, em, h, l",
    "Phone_Number": "617-695-9990",
    "Link": "https://iine.org/boston/"
  },
  {
    "Organization": "IINE Lowell",
    "Address": "101 Jackson Street, Suite 2 Lowell, MA 01852",
    "Latitude": 42.6421647,
    "Longitude": -71.3105985,
    "Tag": "ed, em, h, l",
    "Phone_Number": "978-459-9031",
    "Link": "https://iine.org/lowell/"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "275 West Broadway Boston, MA 02127",
    "Latitude": 42.3387921,
    "Longitude": -71.0514018,
    "Tag": "ed, l",
    "Phone_Number": "617-464-8500",
    "Link": "https://www.ccab.org/refugee-immigrant-services/"
  },
  {
    "Organization": "Ascentria",
    "Address": "11 Shattuck Street Worcester, MA 01605",
    "Latitude": 42.286688,
    "Longitude": -71.7892617,
    "Tag": "ed",
    "Phone_Number": "774.243.3100",
    "Link": "https://www.ascentria.org/our-services/services-for-new-americans"
  },
  {
    "Organization": "RIAC",
    "Address": "253 Roxbury St., Boston, MA 02119",
    "Latitude": 42.330377,
    "Longitude": -71.0934557,
    "Tag": "ed, em",
    "Phone_Number": "617-238-2430",
    "Link": "https://www.riacboston.org/programs-services/"
  },
  {
    "Organization": "Somali Development Center",
    "Address": "10 Malcolm X Boulevard, 2nd Floor Nubian Square, Roxbury, MA 02119",
    "Latitude": 42.32929,
    "Longitude": -71.0864495,
    "Tag": "ed, em",
    "Phone_Number": "(617)-522-0700",
    "Link": "https://sdcboston.org/economic-empowerment/"
  },
  {
    "Organization": "USCRI Detroit",
    "Address": "13942 Michigan Ave Level, Suite 1, Dearborn, MI 48126",
    "Latitude": 42.3211617,
    "Longitude": -83.1802353,
    "Tag": "ed, em, h, l",
    "Phone_Number": "",
    "Link": "https://refugees.org/uscri-detroit/"
  },
  {
    "Organization": "Samaritas",
    "Address": "2170 E. Big Beaver Suite B Troy, MI 48083",
    "Latitude": 42.5629869,
    "Longitude": -83.1046333,
    "Tag": "ed, h",
    "Phone_Number": "(248) 423-2790",
    "Link": "https://www.samaritas.org/New-Americans/Resettlement"
  },
  {
    "Organization": "Refugee Development Center",
    "Address": "600 W. Maple St. Suite A Lansing, MI 48906",
    "Latitude": 42.7468622,
    "Longitude": -84.5603644,
    "Tag": "ed, h",
    "Phone_Number": "(517) 999-5090",
    "Link": "https://refugeedevelopmentcenter.org/resources/"
  },
  {
    "Organization": "Chaldean Community Foundation",
    "Address": "3601 15 Mile Road Sterling Heights, MI 48310",
    "Latitude": 42.5514607,
    "Longitude": -83.0724597,
    "Tag": "ed, em, l",
    "Phone_Number": "(586) 722-7253",
    "Link": "https://www.chaldeanfoundation.org/programs-solutions/new-american-acculturation/"
  },
  {
    "Organization": "Global Detroit",
    "Address": "4444 Second Ave Detroit, MI 48201, USA",
    "Latitude": 42.3519735,
    "Longitude": -83.0665487,
    "Tag": "ed, l",
    "Phone_Number": "N/A",
    "Link": "https://globaldetroitmi.org/opportunity-neighborhoods/"
  },
  {
    "Organization": "Arrive Ministries",
    "Address": "1515 East 66th Street, Richfield MN 55423",
    "Latitude": 44.8830646,
    "Longitude": -93.2534911,
    "Tag": "ed, em, h, l",
    "Phone_Number": "612-798-4332",
    "Link": "https://arriveministries.org/"
  },
  {
    "Organization": "International Institute of Minnesota",
    "Address": "1694 Como Avenue Saint Paul, MN 55108",
    "Latitude": 44.9770305,
    "Longitude": -93.1718476,
    "Tag": "ed, em, h, l",
    "Phone_Number": "651-647-0191",
    "Link": "https://iimn.org/programs/"
  },
  {
    "Organization": "MCC",
    "Address": "501 South Second Street Mankato, MN 56001",
    "Latitude": 44.1626064,
    "Longitude": -94.0049134,
    "Tag": "ed, em, h, l",
    "Phone_Number": "507-345-1554",
    "Link": "http://www.mnchurches.org/what-we-do/refugee-services/mankato-area-services"
  },
  {
    "Organization": "Literacy Minnesota",
    "Address": "700 Raymond Avenue, Suite 180 Saint Paul, MN 55114-1780",
    "Latitude": 44.9615302,
    "Longitude": -93.1969826,
    "Tag": "ed",
    "Phone_Number": "651-645-2277",
    "Link": "https://www.literacymn.org/"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "731 S. Pear Orchard Rd. Suite 51, Ridgeland, MS 39157",
    "Latitude": 32.403615,
    "Longitude": -90.1243836,
    "Tag": "ed, l",
    "Phone_Number": "601-355-8634",
    "Link": "https://www.catholiccharitiesjackson.org/"
  },
  {
    "Organization": "MCCB",
    "Address": "3825 Ridgewood Rd Jackson, MS 39211",
    "Latitude": 32.338257,
    "Longitude": -90.1420464,
    "Tag": "ed",
    "Phone_Number": "601-432-6518",
    "Link": "https://www.mccb.edu/"
  },
  {
    "Organization": "MSEF",
    "Address": "5165 Old Brandon Road Pearl, MS 39208",
    "Latitude": 32.290094,
    "Longitude": -90.0643854,
    "Tag": "ed",
    "Phone_Number": "601-605-2989",
    "Link": "https://www.mcef.net/"
  },
  {
    "Organization": "IISTL",
    "Address": "3401 Arsenal St., St. Louis, MO 63118",
    "Latitude": 38.6026684,
    "Longitude": -90.2384654,
    "Tag": "ed, l, h",
    "Phone_Number": "(314) 773-9090",
    "Link": "https://www.iistl.org/"
  },
  {
    "Organization": "Catholic Churches",
    "Address": "8001 Longview Rd, Kansas City, MO 64134",
    "Latitude": 38.913584,
    "Longitude": -94.4976023,
    "Tag": "ed, l",
    "Phone_Number": "(816) 221-4377",
    "Link": "https://catholiccharities-kcsj.org/"
  },
  {
    "Organization": "Adult Literacy Program",
    "Address": "205 Jefferson St., Jefferson City, MO 65101",
    "Latitude": 38.5774324,
    "Longitude": -92.1711617,
    "Tag": "ed",
    "Phone_Number": "573-751-4212",
    "Link": "https://dese.mo.gov/adult-learning-rehabilitation-services/adult-education-and-literacy"
  },
  {
    "Organization": "SLPL",
    "Address": "St. Louis Public Library, 1301 Olive Street, St. Louis, MO  63103",
    "Latitude": 38.6307357,
    "Longitude": -90.199499,
    "Tag": "ed",
    "Phone_Number": "314-241-2288",
    "Link": "https://www.slpl.org/"
  },
  {
    "Organization": "IRC Missoula",
    "Address": "3203 S. Russell St, Missoula, MT 59801",
    "Latitude": 46.8411232,
    "Longitude": -114.0187604,
    "Tag": "ed, em, h, l",
    "Phone_Number": "406 926 1982",
    "Link": "https://www.rescue.org/united-states/missoula-mt"
  },
  {
    "Organization": "Soft Landing Missoula",
    "Address": "939 Stephens Avenue, Suite C, Missoula, MT 59801",
    "Latitude": 46.8575319,
    "Longitude": -114.0119341,
    "Tag": "ed, em, h",
    "Phone_Number": "(406) 493-0504",
    "Link": "https://softlandingmissoula.org/"
  },
  {
    "Organization": "Montana State Univesity",
    "Address": "173860, Bozeman, MT 59717-3860",
    "Latitude": 45.6603986,
    "Longitude": -111.0451818,
    "Tag": "ed",
    "Phone_Number": "(406) 994-6550",
    "Link": "https://eu.montana.edu/"
  },
  {
    "Organization": "Montana Registered Aprenticeship",
    "Address": "1728 Helena, MT 59624",
    "Latitude": 46.61,
    "Longitude": -112.01,
    "Tag": "ed",
    "Phone_Number": "(406) 444-4100",
    "Link": "https://apprenticeship.mt.gov/"
  },
  {
    "Organization": "Lutheran Family Services",
    "Address": "124 South 24th Street, Suite 230, Omaha, NE 68102",
    "Latitude": 41.2590072,
    "Longitude": -95.9473112,
    "Tag": "ed, em, h",
    "Phone_Number": "(402) 342-7038",
    "Link": "https://www.onelfs.org/"
  },
  {
    "Organization": "Metropolitan Community College",
    "Address": "3200 Broadway Blvd, Kansas City, MO 64111",
    "Latitude": 39.0686368,
    "Longitude": -94.5909936,
    "Tag": "ed",
    "Phone_Number": "(816) 604-1000",
    "Link": "https://www.mccneb.edu/Academics/Programs-of-Study"
  },
  {
    "Organization": "South East Community College",
    "Address": "8800 O St, Lincoln, NE 68520",
    "Latitude": 40.8156222,
    "Longitude": -96.6016956,
    "Tag": "ed",
    "Phone_Number": "(402) 471-3333",
    "Link": "https://www.southeast.edu/"
  },
  {
    "Organization": "Catholic Charities of Southern Nevada",
    "Address": "1501 Las Vegas Blvd N, Las Vegas, NV 89101",
    "Latitude": 36.1870151,
    "Longitude": -115.1346743,
    "Tag": "ed, l, h",
    "Phone_Number": "(702) 385-2662",
    "Link": "https://www.catholiccharities.com/"
  },
  {
    "Organization": "Northern Nevada International Center",
    "Address": "1155 W 4th Street, Suite 222 & 223 Reno, NV 89503",
    "Latitude": 39.5263869,
    "Longitude": -119.8291717,
    "Tag": "ed, h",
    "Phone_Number": "(775) 784-7515",
    "Link": "https://www.unr.edu/nnic"
  },
  {
    "Organization": "JFSA",
    "Address": "5851 West Charleston Blvd., Las Vegas, NV 89146",
    "Latitude": 36.1587949,
    "Longitude": -115.2210647,
    "Tag": "ed, h",
    "Phone_Number": "(702) 732-0304",
    "Link": "https://www.jfsalv.org/"
  },
  {
    "Organization": "CSN",
    "Address": "700 College Dr, Henderson, NV 89002",
    "Latitude": 36.0057073,
    "Longitude": -114.9636936,
    "Tag": "ed",
    "Phone_Number": "(702) 651-3000",
    "Link": "https://www.csn.edu/"
  },
  {
    "Organization": "Truckee Meadows",
    "Address": "7000 Dandini Blvd, Reno, NV 89512",
    "Latitude": 39.5716701,
    "Longitude": -119.7975771,
    "Tag": "ed",
    "Phone_Number": "(775) 673-7111",
    "Link": "https://www.tmcc.edu/"
  },
  {
    "Organization": "Nevada Career Instiute",
    "Address": "3231 N Decatur Blvd #201, Las Vegas, NV 89130",
    "Latitude": 36.2179486,
    "Longitude": -115.2084204,
    "Tag": "ed",
    "Phone_Number": "(702) 209-0030",
    "Link": "https://www.nevadacareerinstitute.com/"
  },
  {
    "Organization": "NHRP",
    "Address": "29 Hazen Drive, Concord, NH 03301",
    "Latitude": 43.219186,
    "Longitude": -71.5159968,
    "Tag": "ed, em",
    "Phone_Number": "1-800-735-2964",
    "Link": "https://www.dhhs.nh.gov/programs-services/diversity-culture-inclusion/refugee-program"
  },
  {
    "Organization": "BCNH",
    "Address": "1045 Elm Street, Suite 202, Manchester NH 03101",
    "Latitude": 42.9929595,
    "Longitude": -71.462688,
    "Tag": "ed, l",
    "Phone_Number": "603-935-9620",
    "Link": "https://www.bcinnh.org/"
  },
  {
    "Organization": "IINE Manchester",
    "Address": "470 Pine Street, Lower Level, Manchester, NH 03104",
    "Latitude": 42.99466,
    "Longitude": -71.4599079,
    "Tag": "ed, em, l, h",
    "Phone_Number": "603-647-1500",
    "Link": "https://iine.org/refugee-resettlement/"
  },
  {
    "Organization": "Project Home",
    "Address": "22 Middle Street, Keene NH 03431",
    "Latitude": 42.9346973,
    "Longitude": -72.2814603,
    "Tag": "ed, em, l, h",
    "Phone_Number": "N/A",
    "Link": "https://www.projecthomenh.org/about"
  },
  {
    "Organization": "Overcomers",
    "Address": "90 Airport Road, Concord, New Hampshire 03301, United States",
    "Latitude": 43.2031927,
    "Longitude": -71.5094274,
    "Tag": "ed",
    "Phone_Number": "603-856-7507",
    "Link": "https://overcomersnh.org/our-services"
  },
  {
    "Organization": "Second Start",
    "Address": "17 Knight Street, Concord, NH 03301",
    "Latitude": 43.2436797,
    "Longitude": -71.5734318,
    "Tag": "ed",
    "Phone_Number": "(603) 228-1341",
    "Link": "https://www.second-start.org/"
  },
  {
    "Organization": "IRC Elizabeth",
    "Address": "208 Commerce Place, 4th Floor, 4th Floor, Elizabeth, NJ07201",
    "Latitude": 40.666785,
    "Longitude": -74.2144704,
    "Tag": "ed, em, l, h",
    "Phone_Number": "908- 290-5496",
    "Link": "https://www.rescue.org/united-states/elizabeth-nj"
  },
  {
    "Organization": "Interfaith-RISE",
    "Address": "19 S 2nd Ave, Highland Park, NJ 08904",
    "Latitude": 40.4978957,
    "Longitude": -74.4293425,
    "Tag": "ed, em, h",
    "Phone_Number": "(732) 249-7349",
    "Link": "https://interfaithrise.org/what-we-do/"
  },
  {
    "Organization": "Jewish Vocational Service",
    "Address": "7 Glenwood Avenue, Lower Level, East Orange, NJ 07017",
    "Latitude": 40.7703691,
    "Longitude": -74.2202253,
    "Tag": "ed, em",
    "Phone_Number": "973-674-6330",
    "Link": "https://jvsnj.org/"
  },
  {
    "Organization": "Literacy New Jersey",
    "Address": "100 Menlo Park Dr., Ste 314, Edison, NJ 08837",
    "Latitude": 40.5475987,
    "Longitude": -74.33647,
    "Tag": "ed",
    "Phone_Number": "(732) 906-5456",
    "Link": "https://literacynj.org/"
  },
  {
    "Organization": "LFSRM Albuquerque",
    "Address": "230 Truman Street, NE, Albuquerque, NM 87108",
    "Latitude": 35.0815136,
    "Longitude": -106.5870669,
    "Tag": "ed, em, h",
    "Phone_Number": "505.933.7032",
    "Link": "https://www.lfsrm.org/locations/"
  },
  {
    "Organization": "LFSRM Las Cruces",
    "Address": "250 S. Main Street, Las Cruces, NM 88001",
    "Latitude": 32.3082439,
    "Longitude": -106.7785128,
    "Tag": "ed, em, h",
    "Phone_Number": "575.265.0836",
    "Link": "https://www.lfsrm.org/locations/"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "2010 Bridge Blvd SW Albuquerque, NM   87105",
    "Latitude": 35.0651204,
    "Longitude": -106.6877531,
    "Tag": "ed, l",
    "Phone_Number": "(505) 724-4670",
    "Link": "https://www.ccasfnm.org/refugeesupport.html"
  },
  {
    "Organization": "Encuentro",
    "Address": "907 4th St. SW, Albuquerque, NM 87102",
    "Latitude": 35.0764716,
    "Longitude": -106.6534962,
    "Tag": "ed, em",
    "Phone_Number": "(505) 247 - 2920",
    "Link": "https://encuentronm.org/our-initiatives/"
  },
  {
    "Organization": "IRC New York",
    "Address": "263 West 38th Street, 6th Floor, New York, NY10018",
    "Latitude": 40.7545523,
    "Longitude": -73.9908539,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(212) 377-4728",
    "Link": "https://www.rescue.org/united-states/new-york-ny"
  },
  {
    "Organization": "World Relief Western New York",
    "Address": "420 Winton Road N., Rochester NY 14610",
    "Latitude": 43.1535686,
    "Longitude": -77.5503435,
    "Tag": "ed, em, l",
    "Phone_Number": "(585) 563-7175",
    "Link": "https://worldrelief.org/western-ny/"
  },
  {
    "Organization": "Catholic Charities of New York",
    "Address": "1011 First Avenue, New York, NY 10022",
    "Latitude": 40.7574566,
    "Longitude": -73.9639978,
    "Tag": "ed, l, h",
    "Phone_Number": "(888) 744-7900",
    "Link": "https://catholiccharitiesny.org/"
  },
  {
    "Organization": "Church World Service",
    "Address": "110 Maryland Ave NE, Washington, DC 20002",
    "Latitude": 38.8916961,
    "Longitude": -77.0052186,
    "Tag": "ed, h",
    "Phone_Number": "1.800.297.1516",
    "Link": "https://cwsglobal.org/"
  },
  {
    "Organization": "USCRI Albany",
    "Address": "99 Pine St #101, Albany, NY 12207",
    "Latitude": 42.65114,
    "Longitude": -73.7511986,
    "Tag": "ed, em, h, l",
    "Phone_Number": "518-459-1790",
    "Link": "https://refugees.org/uscri-albany/"
  },
  {
    "Organization": "World Relief Triad",
    "Address": "155 Northpoint Ave.Suite 102, High Point, NC 27262",
    "Latitude": 35.9883881,
    "Longitude": -80.022533,
    "Tag": "ed, em, l",
    "Phone_Number": "336-887-9007",
    "Link": "https://worldrelief.org/triad/"
  },
  {
    "Organization": "World Relief Durham",
    "Address": "801 Gilbert St #209, Durham, NC 27701",
    "Latitude": 35.9961315,
    "Longitude": -78.889374,
    "Tag": "ed, em, l",
    "Phone_Number": "(919) 286-3496",
    "Link": "https://worldrelief.org/durham/"
  },
  {
    "Organization": "USCRI North Carolina",
    "Address": "3824 Barrett Dr, Raleigh, NC 276097220",
    "Latitude": 35.8281172,
    "Longitude": -78.6317832,
    "Tag": "ed, em, l, h",
    "Phone_Number": "919-334-0072",
    "Link": "https://refugees.org/uscri-north-carolina/"
  },
  {
    "Organization": "RSS",
    "Address": "3925 Willard Farrow Dr., Charlotte, NC 28215",
    "Latitude": 35.2323313,
    "Longitude": -80.7602662,
    "Tag": "ed, em",
    "Phone_Number": "(704) 458-3245",
    "Link": "https://www.refugeesupportservices.org/what-we-do/"
  },
  {
    "Organization": "NCASC",
    "Address": "122 N. Elm Street Suite 1010, Greensboro, NC 27401",
    "Latitude": 36.073422,
    "Longitude": -79.789285,
    "Tag": "ed, h",
    "Phone_Number": "336-574-2677",
    "Link": "https://www.ascafrica.org/our-services"
  },
  {
    "Organization": "International House",
    "Address": "1817 Central Ave., Suite 215 Charlotte, NC 28205",
    "Latitude": 35.2206962,
    "Longitude": -80.809004,
    "Tag": "ed, l",
    "Phone_Number": "704.333.8099",
    "Link": "https://www.ihclt.org/programs"
  },
  {
    "Organization": "Lutheran Social Services of North Dakota",
    "Address": "3911 20th Ave. S., Fargo, ND 58103",
    "Latitude": 46.8485947,
    "Longitude": -96.8470662,
    "Tag": "ed, em",
    "Phone_Number": "(701) 235-7341",
    "Link": "https://www.immigrationadvocates.org/nonprofit/legaldirectory/organization.393084-Lutheran_Social_Services_of_North_Dakota_Immigration_Services"
  },
  {
    "Organization": "Refugee Resettlement Program",
    "Address": "600 East Boulevard Avenue, Dept 325, Bismarck N.D. 58505-0250",
    "Latitude": 46.8206977,
    "Longitude": -100.7827515,
    "Tag": "ed, em, l",
    "Phone_Number": "(701) 328-2310",
    "Link": "https://www.nd.gov/dhs/services/childfamily/refugees/"
  },
  {
    "Organization": "North Dakota College of Science",
    "Address": "800 6th Street N, Wahpeton, ND 58076",
    "Latitude": 46.2715363,
    "Longitude": -96.6082342,
    "Tag": "ed",
    "Phone_Number": "800-342-4325",
    "Link": "https://www.ndscs.edu/"
  },
  {
    "Organization": "United Tribes Technical College",
    "Address": "3315 University Drive, Bismarck, ND 58504",
    "Latitude": 46.7679771,
    "Longitude": -100.7542072,
    "Tag": "ed",
    "Phone_Number": "701.255.3285",
    "Link": "https://uttc.edu/"
  },
  {
    "Organization": "Bismark State College",
    "Address": "1500 Edwards Avenue, Bismarck, ND 58506, USA",
    "Latitude": 46.8210891,
    "Longitude": -100.8158573,
    "Tag": "ed",
    "Phone_Number": "701.224.5400",
    "Link": "https://bismarckstate.edu/academics/programs/"
  },
  {
    "Organization": "USCRI Cleveland",
    "Address": "3167 Fulton Rd Suite 306, Cleveland, OH 44109",
    "Latitude": 41.4680682,
    "Longitude": -81.7071562,
    "Tag": "ed, em, l, h",
    "Phone_Number": "216-781-4560",
    "Link": "https://refugees.org/uscri-cleveland/"
  },
  {
    "Organization": "US Together",
    "Address": "1415 E Dublin Granville Rd., Suite 100, Columbus OH, 43229",
    "Latitude": 40.0867976,
    "Longitude": -82.9791838,
    "Tag": "ed, em, l, h",
    "Phone_Number": "614-437-9941",
    "Link": "https://www.ustogether.us/"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "7162 Reading Rd, Cincinnati, OH 45237",
    "Latitude": 39.1913947,
    "Longitude": -84.4613031,
    "Tag": "ed, l",
    "Phone_Number": "(513) 241-7745",
    "Link": "https://www.ccswoh.org/"
  },
  {
    "Organization": "Refugee Response",
    "Address": "2054 W47th St., Cleveland, OH 44102",
    "Latitude": 41.4767751,
    "Longitude": -81.7191151,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(216) 236-3877",
    "Link": "https://www.refugeeresponse.org/"
  },
  {
    "Organization": "Ohio Tech",
    "Address": "1374 E 51st Street, Cleveland, OH 44103",
    "Latitude": 41.51837,
    "Longitude": -81.6570534,
    "Tag": "ed",
    "Phone_Number": "1-800-322-7000",
    "Link": "https://ohiotech.edu/"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "1232 N. Classen Blvd., Oklahoma City, OK 73106",
    "Latitude": 35.4810719,
    "Longitude": -97.5285677,
    "Tag": "ed, l",
    "Phone_Number": "405.523.3000",
    "Link": "https://catholiccharitiesok.org/refugee-services"
  },
  {
    "Organization": "JFS Tulsa",
    "Address": "2021 E. 71st Street, Tulsa, OK 74136",
    "Latitude": 36.0627063,
    "Longitude": -95.9635359,
    "Tag": "ed, h",
    "Phone_Number": "918-495-1100",
    "Link": "https://www.jewishtulsa.org/about/"
  },
  {
    "Organization": "TGA",
    "Address": "700 North Greenwood Ave, Tulsa, OK 74106",
    "Latitude": 36.1645916,
    "Longitude": -95.9893305,
    "Tag": "ed, l",
    "Phone_Number": "918.594.8299",
    "Link": "https://tulsaglobalalliance.org/our-mission"
  },
  {
    "Organization": "IRCO",
    "Address": "10301 NE Glisan St. Portland, OR 97220",
    "Latitude": 45.5266826,
    "Longitude": -122.5569966,
    "Tag": "ed, em, l",
    "Phone_Number": "503) 234-1541",
    "Link": "https://irco.org/"
  },
  {
    "Organization": "Refugee & Immigrant Hospitality Organization",
    "Address": "16126 SE Stark St, Portland, OR, 97233",
    "Latitude": 45.5189245,
    "Longitude": -122.4969175,
    "Tag": "ed",
    "Phone_Number": "N/A",
    "Link": "https://yellow.place/en/refugee-immigrant-hospitality-organization-portland-or-usa"
  },
  {
    "Organization": "RRC",
    "Address": "1025 G St, Springfield, OR 97477",
    "Latitude": 44.0521114,
    "Longitude": -123.012153,
    "Tag": "ed, l",
    "Phone_Number": 5413453628,
    "Link": "https://rrclc.org/about-us/"
  },
  {
    "Organization": "Unite Oregon",
    "Address": "1390 SE 122nd Ave, Portland, OR 97233",
    "Latitude": 45.5132202,
    "Longitude": -122.5372272,
    "Tag": "ed, em, h",
    "Phone_Number": "(503) 287-4117",
    "Link": "https://www.uniteoregon.org/our-work-1"
  },
  {
    "Organization": "USCRI Erie",
    "Address": "517 E 26th St, Erie, PA 16504",
    "Latitude": 42.116034,
    "Longitude": -80.061667,
    "Tag": "ed, em, l, h",
    "Phone_Number": "814-452-3935",
    "Link": "https://refugees.org/uscri-erie/"
  },
  {
    "Organization": "NSC",
    "Address": "Nationalities Service Center, 1216 Arch Street, 4th Floor, Philadelphia, PA 19107",
    "Latitude": 39.9539556,
    "Longitude": -75.1604,
    "Tag": "ed, em",
    "Phone_Number": "215-893-8400",
    "Link": "https://nscphila.org/"
  },
  {
    "Organization": "PACRI",
    "Address": "3705 Trindle Road, Suite 111, Camp Hill, PA 17011",
    "Latitude": 40.2346551,
    "Longitude": -76.9442833,
    "Tag": "ed, em, l",
    "Phone_Number": "(717) 458-4745",
    "Link": "https://pacri.org/programs-and-services/"
  },
  {
    "Organization": "Global Wordsmiths",
    "Address": "6401 Penn Avenue, 3rd Floor, Pittsburgh, PA 15206",
    "Latitude": 40.4585483,
    "Longitude": -79.9171549,
    "Tag": "ed",
    "Phone_Number": "412.228.0240",
    "Link": "https://www.globalwordsmiths.com/"
  },
  {
    "Organization": "Pennsylvania Refugee Resettlement Program",
    "Address": "3705 Trindle Rd #111, Camp Hill, PA 17011",
    "Latitude": 40.2346551,
    "Longitude": -76.9442833,
    "Tag": "ed, l",
    "Phone_Number": "1-800-692-7462",
    "Link": "https://www.dhs.pa.gov/refugeesinpa/Pages/Services.aspx"
  },
  {
    "Organization": "The Welcome Center",
    "Address": "211 N 13th St, 4th Floor, Philadelphia, PA 19107",
    "Latitude": 39.9565343,
    "Longitude": -75.160292,
    "Tag": "ed, em",
    "Phone_Number": "215.557.2626",
    "Link": "https://welcomingcenter.org/services/"
  },
  {
    "Organization": "Center for New Americans",
    "Address": "1845 Walnut St 7th Floor, Philadelphia, PA 19103",
    "Latitude": 39.9506933,
    "Longitude": -75.1715016,
    "Tag": "ed",
    "Phone_Number": "(215) 854-1800",
    "Link": "https://www.jevshumanservices.org/program/center-for-new-americans/"
  },
  {
    "Organization": "Dorcas International Institute North Campus",
    "Address": "220 Elmwood Avenue, Providence, RI 02907-1435",
    "Latitude": 41.8068327,
    "Longitude": -71.4249282,
    "Tag": "ed, em, l, h",
    "Phone_Number": "401-784-8600",
    "Link": "https://www.diiri.org/"
  },
  {
    "Organization": "Dorcas International Institute South Campus",
    "Address": "645 Elmwood Avenue, Providence, RI 02907-1435",
    "Latitude": 41.7942959,
    "Longitude": -71.4244595,
    "Tag": "ed, em, l, h",
    "Phone_Number": "401-784-8600",
    "Link": "https://www.diiri.org/"
  },
  {
    "Organization": "World Relief Upstate South Carolina",
    "Address": "2510 Wade Hampton Blvd, Suite C4, Greenville, SC 29615",
    "Latitude": 34.8942203,
    "Longitude": -82.3429501,
    "Tag": "ed, em, l",
    "Phone_Number": "(864) 729-8655",
    "Link": "https://worldrelief.org/upstate-sc/"
  },
  {
    "Organization": "Lutherian Services SC",
    "Address": "1416 S. Martin Luther King, Jr. Ave., Salisbury, NC 28145",
    "Latitude": 35.6549386,
    "Longitude": -80.4790005,
    "Tag": "ed, em, h",
    "Phone_Number": "704-637-2870",
    "Link": "https://lscarolinas.net/refugee-and-immigrant-services/"
  },
  {
    "Organization": "Center for Heirs",
    "Address": "8570 Rivers Ave., Suite 170, North Charleston, SC 29406",
    "Latitude": 32.9627878,
    "Longitude": -80.0429264,
    "Tag": "ed, em",
    "Phone_Number": "843.745.7055",
    "Link": "https://www.heirsproperty.org/"
  },
  {
    "Organization": "Upstate International",
    "Address": "9 S. Memminger Street, Greenville, SC 29601",
    "Latitude": 34.8419488,
    "Longitude": -82.4146216,
    "Tag": "ed, l, h",
    "Phone_Number": "(864) 631-2188",
    "Link": "https://upstateinternational.org/help-with-relocation/"
  },
  {
    "Organization": "LSS",
    "Address": "705 East 41st Street, Suite 200, Sioux Falls, SD 57105",
    "Latitude": 43.5146307,
    "Longitude": -96.7180431,
    "Tag": "ed, em, h",
    "Phone_Number": "605-444-7500",
    "Link": "https://lsssd.org/"
  },
  {
    "Organization": "SD Department of Social Services",
    "Address": "700 Governors Drive | Pierre, SD 57501",
    "Latitude": 44.370885,
    "Longitude": -100.3405797,
    "Tag": "ed, em",
    "Phone_Number": "605.773.3165",
    "Link": "https://dss.sd.gov/"
  },
  {
    "Organization": "The Community Outreach",
    "Address": "1915 East 8th Street Suite 105, Sioux Falls, SD 57103",
    "Latitude": 43.5472406,
    "Longitude": -96.7022871,
    "Tag": "ed, h",
    "Phone_Number": "(605) 331-3935",
    "Link": "https://www.thecommunityoutreach.org/how-we-help"
  },
  {
    "Organization": "World Relief Memphis",
    "Address": "5340 Quince Rd, Suite A, Memphis, TN 38119",
    "Latitude": 35.0913171,
    "Longitude": -89.8839221,
    "Tag": "ed, em, l",
    "Phone_Number": "(901) 341-0220",
    "Link": "https://worldrelief.org/memphis/"
  },
  {
    "Organization": "REP",
    "Address": "258 North Merton Street, Memphis, TN 38112, United States",
    "Latitude": 35.14211,
    "Longitude": -89.9757893,
    "Tag": "ed",
    "Phone_Number": "(901)-500-3844",
    "Link": "https://repmemphis.org/about-us"
  },
  {
    "Organization": "Bridge Refugee Services Knoxville Office",
    "Address": "4420 Whittle Springs Road, Knoxville, TN 37917",
    "Latitude": 36.0154548,
    "Longitude": -83.9192199,
    "Tag": "ed, em, h",
    "Phone_Number": "(865) 540-1311",
    "Link": "https://www.bridgerefugees.org/services/"
  },
  {
    "Organization": "Bridge Refugee Services Chattanooga Office",
    "Address": "4791/A Hal Drive, Chattanooga, TN 37416",
    "Latitude": 35.0849871,
    "Longitude": -85.1890434,
    "Tag": "ed, em, h",
    "Phone_Number": "(423) 954-1911",
    "Link": "https://www.bridgerefugees.org/services/"
  },
  {
    "Organization": "NICE",
    "Address": "417 Welshwood Drive, Ste. 100, Nashville, TN 37211",
    "Latitude": 36.0819677,
    "Longitude": -86.7296562,
    "Tag": "ed, l, h",
    "Phone_Number": "(615) 315-9681",
    "Link": "https://www.empowernashville.org/programs/"
  },
  {
    "Organization": "Siloam Health",
    "Address": "820 GALE LANE, NASHVILLE, TN, 37204",
    "Latitude": 36.1188173,
    "Longitude": -86.7758169,
    "Tag": "ed",
    "Phone_Number": "615-298-5406",
    "Link": "https://siloamhealth.org/our-work/"
  },
  {
    "Organization": "IRC Abilene",
    "Address": "3305 North Third St., Suite 320, Abilene, TX 79603",
    "Latitude": 32.4525548,
    "Longitude": -99.7622983,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(325) 675-5643",
    "Link": "https://www.rescue.org/united-states/abilene-tx"
  },
  {
    "Organization": "Refugee Services of Texas",
    "Address": "9330 LBJ Freeway, Suite 350 Dallas, Texas 75243",
    "Latitude": 32.9122653,
    "Longitude": -96.7397898,
    "Tag": "ed, l",
    "Phone_Number": "(214) 821-4422",
    "Link": "https://www.rstx.org/"
  },
  {
    "Organization": "IRC Dallas",
    "Address": "6500 Greenville Avenue, Suite 500, Dallas, TX 75206",
    "Latitude": 32.8645072,
    "Longitude": -96.7670458,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(214)-461-9781",
    "Link": "https://www.rescue.org/united-states/dallas-tx"
  },
  {
    "Organization": "Interfaith Ministries",
    "Address": "3303 Main Street, Houston, TX 77002",
    "Latitude": 29.740398,
    "Longitude": -95.3776379,
    "Tag": "ed, em, h",
    "Phone_Number": "713-533-4900",
    "Link": "https://www.imgh.org/refugees/"
  },
  {
    "Organization": "Center for Survivors Dallas",
    "Address": "4108 Swiss Avenue, Dallas, TX 75204",
    "Latitude": 32.7950349,
    "Longitude": -96.777665,
    "Tag": "ed",
    "Phone_Number": "(214) 827-2314",
    "Link": "https://cstnet.org/"
  },
  {
    "Organization": "Center for Survivors Austin",
    "Address": "9415 Burnet Road, Suite #201, Austin, TX 78758",
    "Latitude": 30.3779489,
    "Longitude": -97.7247641,
    "Tag": "ed",
    "Phone_Number": "(512) 358-4612",
    "Link": "https://cstnet.org/"
  },
  {
    "Organization": "Center for Survivors San Antonio Satellite Office",
    "Address": "590 N. General McMullen, Suite 3, San Antonio, Texas 78228",
    "Latitude": 29.441973,
    "Longitude": -98.5522715,
    "Tag": "ed",
    "Phone_Number": "(210) 434-1054",
    "Link": "https://cstnet.org/"
  },
  {
    "Organization": "Center for Survivors Fort Worth Office in Refugee Services of Texas",
    "Address": "4200 South Freeway, Fort Worth, Texas 76115",
    "Latitude": 32.6849463,
    "Longitude": -97.322096,
    "Tag": "ed",
    "Phone_Number": "(817) 413-3772",
    "Link": "https://cstnet.org/"
  },
  {
    "Organization": "Caritas for Austin",
    "Address": "611 Neches Street, Austin, Texas 78701",
    "Latitude": 30.2673586,
    "Longitude": -97.7377236,
    "Tag": "ed, em, h",
    "Phone_Number": "512.479.4610",
    "Link": "https://caritasofaustin.org/what-we-do/ending-homelessness-in-austin/"
  },
  {
    "Organization": "World Relief Forth Worth",
    "Address": "4200 South Fwy Suite 408, Fort Worth, TX 76115",
    "Latitude": 32.6865568,
    "Longitude": -97.3271853,
    "Tag": "ed, em, l",
    "Phone_Number": "(817) 615-9331",
    "Link": "https://worldrelief.org/north-texas/"
  },
  {
    "Organization": "World Relief Dallas",
    "Address": "7500 W Camp Wisdom Rd, Dallas Linguistic Center, Hunt Building, Ste. 180-183, Dallas, TX 75236",
    "Latitude": 32.6620911,
    "Longitude": -96.8573288,
    "Tag": "ed, em, l",
    "Phone_Number": "(817) 615-9331",
    "Link": "https://worldrelief.org/north-texas/"
  },
  {
    "Organization": "IRC Salt Lake City",
    "Address": "221 South 400 West, Salt Lake City, UT84110",
    "Latitude": 40.7644682,
    "Longitude": -111.9021783,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(801) 328-1091",
    "Link": "https://www.rescue.org/united-states/salt-lake-city-ut"
  },
  {
    "Organization": "LFSRM Salt Lake City",
    "Address": "415 E. 3900 South, Salt Lake City, UT, 84107",
    "Latitude": 40.6873539,
    "Longitude": -111.8794474,
    "Tag": "ed, em, h",
    "Phone_Number": "801.290.2008",
    "Link": "https://www.lfsrm.org/locations/"
  },
  {
    "Organization": "Utah Refugee Center",
    "Address": "45249, Salt Lake City, UT 84145-0249",
    "Latitude": 40.76,
    "Longitude": -111.9,
    "Tag": "ed, em",
    "Phone_Number": "801-526-WORK (9675)",
    "Link": "https://jobs.utah.gov/refugee/center/"
  },
  {
    "Organization": "Asian Association of Utah",
    "Address": "155 South 300 West, Suite 101, Salt Lake City, Utah, 84101",
    "Latitude": 40.7658841,
    "Longitude": -111.8992986,
    "Tag": "ed, l, h",
    "Phone_Number": "801-467-6060",
    "Link": "https://aau-slc.org/"
  },
  {
    "Organization": "USCRI Vermont",
    "Address": "2231 Crystal Drive, Suite 350, Arlington, VA 22202",
    "Latitude": 38.8538325,
    "Longitude": -77.0488411,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(703) 310-1130",
    "Link": "https://refugees.org/uscri-vermont/"
  },
  {
    "Organization": "State Refugee Office",
    "Address": "280 State Drive - Center Building, Waterbury, VT",
    "Latitude": 44.3328491,
    "Longitude": -72.7547005,
    "Tag": "ed, em, l, h",
    "Phone_Number": "802-241-0440",
    "Link": "https://humanservices.vermont.gov/our-work/programs-services/state-refugee-office"
  },
  {
    "Organization": "CVRAN",
    "Address": "910 Montpelier, VT 05601",
    "Latitude": 44.26064,
    "Longitude": -72.5778,
    "Tag": "ed, em, h",
    "Phone_Number": "(802) 522-3011",
    "Link": "https://cvran.org/about/"
  },
  {
    "Organization": "USCRI",
    "Address": "462 Hegeman Avenue, Colchester, Vermont, United States, 05446-3187",
    "Latitude": 44.504147,
    "Longitude": -73.1528068,
    "Tag": "ed, em, h, l",
    "Phone_Number": "(802) 338-4627",
    "Link": "https://www.justserve.org/projects/b8d7af0b-e5bd-4420-8137-452024e6f692/vermont-refugee-resettlement-center-(uscri)?shiftId=5b001803-bca7-41b1-bc42-9b25beb2a4be"
  },
  {
    "Organization": "VRIS",
    "Address": "236 Riverside Ave, Suite F Burlington, VT 05401",
    "Latitude": 44.4878378,
    "Longitude": -73.1961875,
    "Tag": "ed, l",
    "Phone_Number": "(802) 658-2683",
    "Link": "https://vermontrefugees.org/?cat=3"
  },
  {
    "Organization": "English Empowerment Center",
    "Address": "2855 Annandale Road, Falls Church, Virginia 22042",
    "Latitude": 38.8740367,
    "Longitude": -77.1734098,
    "Tag": "ed",
    "Phone_Number": "703-237-0866",
    "Link": "https://englishempowermentcenter.org/about/"
  },
  {
    "Organization": "ReEstablish Richmond",
    "Address": "14680 Richmond, VA 23221",
    "Latitude": 37.5488885,
    "Longitude": -77.4874049,
    "Tag": "ed",
    "Phone_Number": "804-552-5525",
    "Link": "https://www.reestablishrichmond.org/language-access"
  },
  {
    "Organization": "Campagna Center",
    "Address": "25228 Alexandria, VA 22313",
    "Latitude": 38.8048355,
    "Longitude": -77.0469214,
    "Tag": "ed",
    "Phone_Number": "(703) 549 0111",
    "Link": "https://www.campagnacenter.org/program/adults-new-neighbors/"
  },
  {
    "Organization": "IRC Charlottesville",
    "Address": "375 Greenbrier Drive, Suite 200, Charlottesville, VA22901",
    "Latitude": 38.0708286,
    "Longitude": -78.4866934,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(434) 979-7772",
    "Link": "https://www.rescue.org/united-states/charlottesville-va"
  },
  {
    "Organization": "IRC Richmond",
    "Address": "2004 Bremo Rd, Suite 200, Richmond, VA23226",
    "Latitude": 37.5901421,
    "Longitude": -77.5081253,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(804) 308-9144",
    "Link": "https://www.rescue.org/united-states/richmond-va"
  },
  {
    "Organization": "Catholic Charities Diocese of Arlington",
    "Address": "200 North Glebe Road Suite 250, Arlington, VA 22203",
    "Latitude": 38.8721356,
    "Longitude": -77.1036183,
    "Tag": "ed, em, l, h",
    "Phone_Number": "703-841-3830",
    "Link": "https://www.ccda.net/need-help/immigrants-and-refugees/"
  },
  {
    "Organization": "IRC Seattle",
    "Address": "1200 South 192nd Street, Suite 101, SeaTac, WA 98148",
    "Latitude": 47.4314336,
    "Longitude": -122.3193907,
    "Tag": "ed, em, l, h",
    "Phone_Number": "(206) 623-2105",
    "Link": "https://www.rescue.org/united-states/seattle-wa"
  },
  {
    "Organization": "IRC Spokane",
    "Address": "925 W Montgomery Ave, Spokane, WA 99205",
    "Latitude": 47.6783538,
    "Longitude": -117.4263428,
    "Tag": "ed, em, l, h",
    "Phone_Number": "N/A",
    "Link": "https://www.rescue.org/united-states/spokane-wa"
  },
  {
    "Organization": "World Relief Tricities",
    "Address": "2600 N. Columbia Center Blvd., Suite 206, Richland, WA 99352",
    "Latitude": 46.2363851,
    "Longitude": -119.2215192,
    "Tag": "ed, em, l",
    "Phone_Number": "509-734-5477",
    "Link": "https://worldrelief.org/tricities/"
  },
  {
    "Organization": "World Relief Western Washington King County",
    "Address": "23835 Pacific Hwy S, Suite 100, Kent, WA 98032, United States",
    "Latitude": 47.3879431,
    "Longitude": -122.2969217,
    "Tag": "ed, em, l",
    "Phone_Number": "(253) 277-1121",
    "Link": "https://worldrelief.org/western-wa/"
  },
  {
    "Organization": "World Relief Western Washington Thurston County",
    "Address": "812 Central St SE, Olympia, WA  98501, United States",
    "Latitude": 47.0419486,
    "Longitude": -122.8812548,
    "Tag": "ed, em, l",
    "Phone_Number": "N/A",
    "Link": "https://worldrelief.org/western-wa/"
  },
  {
    "Organization": "World Relief Western Washington Whatcom County",
    "Address": "805 W Orchard Dr, Suite 5, Bellingham, WA 98225",
    "Latitude": 48.7784635,
    "Longitude": -122.4829432,
    "Tag": "ed, em, l",
    "Phone_Number": "(360) 684-3429",
    "Link": "https://worldrelief.org/western-wa/"
  },
  {
    "Organization": "World Relief Spokane",
    "Address": "1522 N. Washington St., Suite 101, Spokane, WA 99201",
    "Latitude": 47.671904,
    "Longitude": -117.416854,
    "Tag": "ed, em, l",
    "Phone_Number": "509.484.9829",
    "Link": "https://worldrelief.org/spokane/"
  },
  {
    "Organization": "Seattle Office of Immigrant and Refugee Affairs",
    "Address": "Morgantown, WV 26506",
    "Latitude": 39.654181,
    "Longitude": -79.9594886,
    "Tag": "ed, l",
    "Phone_Number": "(304) 293-0111",
    "Link": "https://www.seattle.gov/iandraffairs/programs-and-services"
  },
  {
    "Organization": "West Virginia Adult Education",
    "Address": "1900 Kanawha Boulevard East, Charleston, West Virginia 25305",
    "Latitude": 38.3360761,
    "Longitude": -81.6123998,
    "Tag": "ed",
    "Phone_Number": "1-833-627-2833",
    "Link": "https://wvde.us/adult-education/"
  },
  {
    "Organization": "World Relief Fox Valley",
    "Address": "510 E Wisconsin Ave., Appleton, WI  54911",
    "Latitude": 44.2731551,
    "Longitude": -88.3990322,
    "Tag": "ed, em, l",
    "Phone_Number": "(920) 231-3600",
    "Link": "https://worldrelief.org/fox-valley/"
  },
  {
    "Organization": "International Institute of Wisconsin",
    "Address": "1110 North Old World Third Street, Suite 420, Milwaukee WI, 53203",
    "Latitude": 43.0446739,
    "Longitude": -87.9141921,
    "Tag": "ed, l",
    "Phone_Number": "414-225-6220",
    "Link": "https://iiwisconsin.org/refugee-resettlement/"
  },
  {
    "Organization": "Lutheran Social Services",
    "Address": "88868, Milwaukee, WI  53288",
    "Latitude": 43.0389025,
    "Longitude": -87.9064736,
    "Tag": "ed, l",
    "Phone_Number": "414-246-2300",
    "Link": "https://www.lsswis.org/our-services/"
  },
  {
    "Organization": "Neighborhood House of Milwaukee",
    "Address": "639 N. 25th Street, Milwaukee, WI 53233",
    "Latitude": 43.0385156,
    "Longitude": -87.9452688,
    "Tag": "ed",
    "Phone_Number": "(414) 344-4777",
    "Link": "https://neighborhoodhousemke.org/programs/"
  },
  {
    "Organization": "Refugee Support Services",
    "Address": "201 West Washington Avenue, Madison, WI 53703-8916",
    "Latitude": 43.0727714,
    "Longitude": -89.3863002,
    "Tag": "ed, em",
    "Phone_Number": "608-422-7000",
    "Link": "https://dcf.wisconsin.gov/refugee/employment"
  },
  {
    "Organization": "FSC",
    "Address": "4600 American Parkway, Suite 301, Madison, WI 53718",
    "Latitude": 43.148283,
    "Longitude": -89.2913869,
    "Tag": "ed, em, h",
    "Phone_Number": "402-434-5502",
    "Link": "https://fsc-corp.org/"
  },
  {
    "Organization": "Madison College",
    "Address": "1701 Wright St, Madison, WI 53704",
    "Latitude": 43.1217909,
    "Longitude": -89.3296516,
    "Tag": "ed",
    "Phone_Number": "(608) 246-6100",
    "Link": "https://madisoncollege.edu/academics/high-school-completion/english-as-a-second-language"
  },
  {
    "Organization": "Open Doors for Refugees",
    "Address": "1213 N. Sherman Ave, #104, Madison, WI 53704",
    "Latitude": 43.1129042,
    "Longitude": -89.3618239,
    "Tag": "ed, h",
    "Phone_Number": "N/A",
    "Link": "https://opendoorsforrefugees.org/teams/"
  },
  {
    "Organization": "Teton Literacy Center",
    "Address": "1715 High School Rd #260, Jackson, WY 83001",
    "Latitude": 43.4588178,
    "Longitude": -110.7995649,
    "Tag": "ed",
    "Phone_Number": "307-733-9242",
    "Link": "http://www.tetonliteracy.org/"
  },
  {
    "Organization": "Goodwill Industries of Wyoming",
    "Address": "5487 Division Ave S, Wyoming, MI 49548",
    "Latitude": 42.8645167,
    "Longitude": -85.6660392,
    "Tag": "ed, em",
    "Phone_Number": "(616) 893-5074",
    "Link": "https://www.goodwillwy.org/move-forward-resources.html"
  },
  {
    "Organization": "Catholic Charities USA",
    "Address": "507 E 18th St, Cheyenne, WY 82001",
    "Latitude": 41.1365541,
    "Longitude": -104.8103056,
    "Tag": "em, h",
    "Phone_Number": "(307) 637-0554",
    "Link": "https://www.catholiccharitiesusa.org/our-vision-and-ministry/immigration-refugee-services/"
  },
  {
    "Organization": "HICA",
    "Address": "117 Southcrest Dr, Birmingham, AL 35209",
    "Latitude": 33.4676066,
    "Longitude": -86.8304131,
    "Tag": "em, l",
    "Phone_Number": "(205) 942-5505",
    "Link": "https://hicaalabama.org/en/programs-and-services"
  },
  {
    "Organization": "Inspiritus",
    "Address": "731 Peachtree Street NE, Suite. B, Atlanta, Ga 30308",
    "Latitude": 33.7600995,
    "Longitude": -84.3880355,
    "Tag": "em, l, h",
    "Phone_Number": "800-875-5645",
    "Link": "https://weinspirit.org/refugees"
  },
  {
    "Organization": "Catholic Social Services Anchorage",
    "Address": "3710 E. 20th AvenueAnchorage, Alaska 99508",
    "Latitude": 61.2021214,
    "Longitude": -149.8110812,
    "Tag": "em, l, h",
    "Phone_Number": "907.222.7300",
    "Link": "https://www.cssalaska.org/"
  },
  {
    "Organization": "Catholic Charities Community Service",
    "Address": "4747 N. 7th Avenue, Phoenix AZ 85013",
    "Latitude": 33.5072957,
    "Longitude": -112.0821902,
    "Tag": "ed, em",
    "Phone_Number": "1-855-316-2229",
    "Link": "https://www.catholiccharitiesaz.org/all-locations/refugee-resettlement#:~:text=Catholic%20Charities%20is%20one%20of,hygiene%20products%20and%20basic%20bedding."
  },
  {
    "Organization": "Lutherian Social Services of the Southwest",
    "Address": "2502 E. University Drive, Suite 125, Phoenix, AZ 85034",
    "Latitude": 33.4252417,
    "Longitude": -112.0282423,
    "Tag": "em, l, h",
    "Phone_Number": "480-396-3795",
    "Link": "https://www.lss-sw.org/refugeeservices"
  },
  {
    "Organization": "Arkansas Human Services",
    "Address": "1600 Browns Lane Access Rd, Jonesboro, AR 72401",
    "Latitude": 35.8081058,
    "Longitude": -90.6931695,
    "Tag": "em, h",
    "Phone_Number": "(870) 972-1732",
    "Link": "https://humanservices.arkansas.gov/apply-for-services/"
  },
  {
    "Organization": "Northwest Arkansas Workers Justice Center",
    "Address": "2200 W Sunset Ave, Springdale, AR 72762",
    "Latitude": 36.1751784,
    "Longitude": -94.1543224,
    "Tag": "em",
    "Phone_Number": "(479) 750-8015",
    "Link": "https://www.idealist.org/en/nonprofit/e17d7af8fc4c43b49c4e769b5aeed561-northwest-arkansas-workers-justice-center-fayetteville"
  },
  {
    "Organization": "CET",
    "Address": "6295 Edsall Rd #220, Alexandria, VA 22312",
    "Latitude": 38.8024076,
    "Longitude": -77.142377,
    "Tag": "em",
    "Phone_Number": "(703) 461-9767",
    "Link": "https://cetweb.edu/"
  },
  {
    "Organization": "Catholic Charities Almada County Employment Center",
    "Address": "1107 9th Street, Suite 707 Sacramento, CA 95814",
    "Latitude": 38.579306,
    "Longitude": -121.495139,
    "Tag": "em",
    "Phone_Number": "916.706.1539",
    "Link": "https://catholiccharitiesca.org/where-we-operate/"
  },
  {
    "Organization": "International Institute of Los Angeles",
    "Address": "3845 Selig Place, Los Angeles, CA 90031",
    "Latitude": 34.0685547,
    "Longitude": -118.1989767,
    "Tag": "em, l, h",
    "Phone_Number": "323-224-3800",
    "Link": "https://www.iilosangeles.org/"
  },
  {
    "Organization": "PANA",
    "Address": "5348 University Ave Suite 110, San Diego, CA 92105",
    "Latitude": 32.7494586,
    "Longitude": -117.0811682,
    "Tag": "em",
    "Phone_Number": "(619) 363-6939",
    "Link": "https://www.panasd.org/about-1"
  },
  {
    "Organization": "African Community Center",
    "Address": "925 S. Niagara St. Suite 200, Denver, CO 80224",
    "Latitude": 39.6998747,
    "Longitude": -104.9113916,
    "Tag": "em, l",
    "Phone_Number": "303-399-4500",
    "Link": "https://www.acc-den.org/"
  },
  {
    "Organization": "Coneticut Institute for Refugee and Immigrants",
    "Address": "670 Clinton Ave, Bridgeport, CT 06605",
    "Latitude": 41.1765595,
    "Longitude": -73.2114832,
    "Tag": "em, l",
    "Phone_Number": "(203) 336-0141",
    "Link": "https://cirict.org/refugee-services/"
  },
  {
    "Organization": "Catholic Charities of the Diocese of Wilmington",
    "Address": "2601 W 4th Street, Wilmington, DE 19805",
    "Latitude": 39.7521439,
    "Longitude": -75.5795675,
    "Tag": "em, l, h",
    "Phone_Number": "302-655-9624",
    "Link": "https://www.ccwilm.org/"
  },
  {
    "Organization": "Catholic Charities of the Diocese of Palm Beach",
    "Address": "100 W. 20th Street, Riviera Beach, FL 33404",
    "Latitude": 26.7792111,
    "Longitude": -80.0569386,
    "Tag": "em, l",
    "Phone_Number": "(561) 345-2000",
    "Link": "https://www.ccdpb.org/programs/refugee-resettlement/"
  },
  {
    "Organization": "Amplio Recruiting",
    "Address": "9400 DUMFRIES DR DALLAS TX 75227-4747",
    "Latitude": 32.7715765,
    "Longitude": -96.6622261,
    "Tag": "em",
    "Phone_Number": "(470) 588-0400",
    "Link": "https://ampliorecruiting.com/"
  },
  {
    "Organization": "ORR Hawaii",
    "Address": "370 L'Enfant Plaza SW # 8W, Washington, DC 20447",
    "Latitude": 38.8850317,
    "Longitude": -77.0255285,
    "Tag": "em, l",
    "Phone_Number": "(202) 401-9246",
    "Link": "https://www.acf.hhs.gov/orr/about/what-we-do"
  },
  {
    "Organization": "JHS Hawaii",
    "Address": "2550 Pali Hwy, Honolulu, HI 96817",
    "Latitude": 21.3307525,
    "Longitude": -157.844541,
    "Tag": "em",
    "Phone_Number": "(808) 258-7121",
    "Link": "https://www.jcs-hi.org/our-mission"
  },
  {
    "Organization": "Child & Family Service",
    "Address": "91-1841 Ft. Weaver Rd. • Ewa Beach, HI 96706",
    "Latitude": 21.3542265,
    "Longitude": -158.0291668,
    "Tag": "em",
    "Phone_Number": "808.681.3500",
    "Link": "https://www.childandfamilyservice.org/programs/employmentrefugees/"
  },
  {
    "Organization": "Agency for New Americans",
    "Address": "1614 W Jefferson St, Boise, ID 83702",
    "Latitude": 43.6232692,
    "Longitude": -116.2111826,
    "Tag": "em, l",
    "Phone_Number": "(208) 338-0033",
    "Link": "http://www.anaidaho.org/about.html"
  },
  {
    "Organization": "Global Talent",
    "Address": "1607 W Jefferson St, Boise, ID 83702",
    "Latitude": 43.6226044,
    "Longitude": -116.2112249,
    "Tag": "em",
    "Phone_Number": "(208) 947-4250",
    "Link": "https://glotalent.org/"
  },
  {
    "Organization": "CSI Refugee Center",
    "Address": "1526 Highland Ave. E. Twin Falls, Idaho 83301",
    "Latitude": 42.544636,
    "Longitude": -114.4544646,
    "Tag": "ed, em, l",
    "Phone_Number": "208-736-2166",
    "Link": "https://refugeecenter.csi.edu/programs/employment.asp"
  },
  {
    "Organization": "Illinois Welcoming Center",
    "Address": "5413 WEST DIVERSEY AVE, CHICAGO IL 60639",
    "Latitude": 41.9311387,
    "Longitude": -87.7619763,
    "Tag": "em, l, h",
    "Phone_Number": "(773) 622-3215",
    "Link": "https://onwardhouse.org/illinois-welcoming-center/"
  },
  {
    "Organization": "Rock Valley College",
    "Address": "3301 North Mulford Road, Rockford, IL 61114",
    "Latitude": 42.3095499,
    "Longitude": -88.9949611,
    "Tag": "em",
    "Phone_Number": "815.921.7821",
    "Link": "https://www.rockvalleycollege.edu/Community/AdultEd/refugee.cfm"
  },
  {
    "Organization": "Exodus Refugee",
    "Address": "2457 E. Washington Street, Suite A, Indianapolis, IN 46201",
    "Latitude": 39.767362,
    "Longitude": -86.1199677,
    "Tag": "em, l",
    "Phone_Number": "(317) 921-0836",
    "Link": "https://www.exodusrefugee.org/"
  },
  {
    "Organization": "Indiana Department of Workforce Development",
    "Address": "10 N Senate Ave, Indianapolis, IN 46204",
    "Latitude": 39.7679029,
    "Longitude": -86.1637272,
    "Tag": "em",
    "Phone_Number": "(317) 232-6702",
    "Link": "https://www.in.gov/dwd/"
  },
  {
    "Organization": "Goodwill Employment Help",
    "Address": "1329 Applegate Ln, Clarksville, IN 47129",
    "Latitude": 38.3129182,
    "Longitude": -85.7621089,
    "Tag": "em",
    "Phone_Number": "(812) 283-7908",
    "Link": "https://www.goodwillindy.org/employment/"
  },
  {
    "Organization": "WorkOne",
    "Address": "105 E. Drexel Parkway, Rensselear, IN 47978",
    "Latitude": 40.9229654,
    "Longitude": -87.1419446,
    "Tag": "em",
    "Phone_Number": "(219) 866-4330",
    "Link": "https://www.in.gov/dwd/workone/"
  },
  {
    "Organization": "IndyChamber",
    "Address": "111 Monument Circle, Suite 1950, Indianapolis, IN 46204",
    "Latitude": 39.768897,
    "Longitude": -86.157105,
    "Tag": "em",
    "Phone_Number": "317.464.2222",
    "Link": "https://indychamber.com/economic-development/indy-partnership/"
  },
  {
    "Organization": "Iowa Workforce Development",
    "Address": "1000 E Grand Ave, Des Moines, IA 50319",
    "Latitude": 41.5922978,
    "Longitude": -93.6050813,
    "Tag": "em",
    "Phone_Number": "(866) 239-0843",
    "Link": "https://www.iowaworkforcedevelopment.gov/"
  },
  {
    "Organization": "Iowa BRS",
    "Address": "321 E 12th St 6th floor, Des Moines, IA 50319",
    "Latitude": 41.591247,
    "Longitude": -93.6009484,
    "Tag": "em, h",
    "Phone_Number": "1-800-362-2780",
    "Link": "https://hhs.iowa.gov/refugee-services"
  },
  {
    "Organization": "Catholic Charities Northeast",
    "Address": "600 Minnesota Avenue,Kansas City, Kansas",
    "Latitude": 39.1157893,
    "Longitude": -94.6242944,
    "Tag": "em, l",
    "Phone_Number": "913.621.3445",
    "Link": "https://catholiccharitiesks.org/refugees/"
  },
  {
    "Organization": "JVS",
    "Address": "4600 The Paseo, Kansas City, MO 64110",
    "Latitude": 39.043041,
    "Longitude": -94.5688223,
    "Tag": "em, l, h",
    "Phone_Number": "816.471.2930",
    "Link": "https://jvskc.org/services/community-integration/rr/"
  },
  {
    "Organization": "International Center of Kentucky",
    "Address": "806 Kenton St, Bowling Green, KY 42101",
    "Latitude": 36.985673,
    "Longitude": -86.4335649,
    "Tag": "em, l, h",
    "Phone_Number": "(270) 781-8336",
    "Link": "https://www.icofky.com/our-services-1"
  },
  {
    "Organization": "Kentucky Adult Education",
    "Address": "500 Mero Street. Frankfort, KY 40601.",
    "Latitude": 38.202447,
    "Longitude": -84.8764481,
    "Tag": "em",
    "Phone_Number": "NA",
    "Link": "https://kyae.ky.gov/Pages/index.aspx"
  },
  {
    "Organization": "LCTCS",
    "Address": "265 South Foster Drive, Baton Rouge, LA 70806",
    "Latitude": 30.4476368,
    "Longitude": -91.1373847,
    "Tag": "em",
    "Phone_Number": "225) 922-2800",
    "Link": "https://www.lctcs.edu/"
  },
  {
    "Organization": "Louisiana WorkForce Commission",
    "Address": "1001 N 23rd St, Baton Rouge, LA 70802",
    "Latitude": 30.4585179,
    "Longitude": -91.1656627,
    "Tag": "em",
    "Phone_Number": "(225) 342-3111",
    "Link": "https://www.laworks.net/"
  },
  {
    "Organization": "Maine Career Centers",
    "Address": "5 Mollison Way, Lewiston, ME 04240",
    "Latitude": 44.1237072,
    "Longitude": -70.1994908,
    "Tag": "em",
    "Phone_Number": "(800) 741-2991",
    "Link": "https://www.mainecareercenter.gov/"
  },
  {
    "Organization": "World Relief Baltimore",
    "Address": "7 E Baltimore Street, Baltimore, MD 21202",
    "Latitude": 39.2892601,
    "Longitude": -76.6146569,
    "Tag": "ed, em, l",
    "Phone_Number": "(443) 451-1931",
    "Link": "https://worldrelief.org/baltimore/"
  },
  {
    "Organization": "Catholic Charities Archdiocese of Washington",
    "Address": "1018 Monroe Street, NE, Washington, DC 20017",
    "Latitude": 38.9326981,
    "Longitude": -76.991915,
    "Tag": "em",
    "Phone_Number": "(202) 266-3062",
    "Link": "https://www.catholiccharitiesdc.org/refugeecenter/"
  },
  {
    "Organization": "Lutherian Social Services",
    "Address": "1730 Rhode Island Ave NW Suite 712, Washington, DC 20036",
    "Latitude": 38.9058783,
    "Longitude": -77.0394827,
    "Tag": "ed, em, l",
    "Phone_Number": "(202) 723-3000",
    "Link": "https://lssnca.org/programs/new-americans/"
  },
  {
    "Organization": "Freedom House",
    "Address": "1777 N. Rademacher, Detroit, MI 48209",
    "Latitude": 42.3130873,
    "Longitude": -83.113664,
    "Tag": "em, h",
    "Phone_Number": "313.964.4320",
    "Link": "https://freedomhousedetroit.org/programs/"
  },
  {
    "Organization": "IIMD",
    "Address": "111 E Kirby St, Detroit, MI 48202",
    "Latitude": 42.3611222,
    "Longitude": -83.0647035,
    "Tag": "em, l",
    "Phone_Number": "(313) 871-8600",
    "Link": "https://www.iimd.org/immigration-legal-services"
  },
  {
    "Organization": "Lutherian Social Service",
    "Address": "2485 Como Avenue, Saint Paul, MN 55108",
    "Latitude": 44.9866686,
    "Longitude": -93.2000963,
    "Tag": "em, l",
    "Phone_Number": "651.642.5990",
    "Link": "https://www.lssmn.org/services/refugees/services"
  },
  {
    "Organization": "WellShare International",
    "Address": "122 W Franklin Ave, Minneapolis, MN 55404",
    "Latitude": 44.9630112,
    "Longitude": -93.2804896,
    "Tag": "em",
    "Phone_Number": "(612) 871-3759",
    "Link": "https://wellshareinternational.org/us/"
  },
  {
    "Organization": "MIRA",
    "Address": "4436 N State St suite a-1, Jackson, MS 39206",
    "Latitude": 32.352832,
    "Longitude": -90.1743377,
    "Tag": "em, l, h",
    "Phone_Number": "(601) 968-5182",
    "Link": "https://yourmira.org/"
  },
  {
    "Organization": "World Relief",
    "Address": "7 E Baltimore Street, Baltimore, MD 21202",
    "Latitude": 39.2892601,
    "Longitude": -76.6146569,
    "Tag": "ed, em, l",
    "Phone_Number": "(443) 451-1931",
    "Link": "https://worldrelief.org/"
  },
  {
    "Organization": "MDES",
    "Address": "1235 Echelon Pkwy, Jackson, MS 39213",
    "Latitude": 32.3965942,
    "Longitude": -90.1844021,
    "Tag": "em",
    "Phone_Number": "(601) 321-6000",
    "Link": "https://mdes.ms.gov/"
  },
  {
    "Organization": "MDRS",
    "Address": "1281 Highway 51 Madison, MS 39110",
    "Latitude": 32.478997,
    "Longitude": -90.1048367,
    "Tag": "em",
    "Phone_Number": "800.443.1000",
    "Link": "https://www.mdrs.ms.gov/"
  },
  {
    "Organization": "JVS",
    "Address": "4600 The Paseo, Kansas City, MO 64110",
    "Latitude": 39.043041,
    "Longitude": -94.5688223,
    "Tag": "em, l, h",
    "Phone_Number": "816.471.2808",
    "Link": "https://jvskc.org/"
  },
  {
    "Organization": "RISE",
    "Address": "1627 Washington Ave, St. Louis, MO 63103",
    "Latitude": 38.6333496,
    "Longitude": -90.2028177,
    "Tag": "em, h",
    "Phone_Number": "314-333-7000",
    "Link": "https://risestl.org/"
  },
  {
    "Organization": "SkillUp",
    "Address": "615 E 13th St, Kansas City, MO 64106",
    "Latitude": 39.0978937,
    "Longitude": -94.5757424,
    "Tag": "em",
    "Phone_Number": "(816) 889-2000",
    "Link": "https://mydss.mo.gov/food-assistance/skillup-missouri"
  },
  {
    "Organization": "Jobs.mo",
    "Address": "2900 E Sunshine St, Springfield, MO 65804",
    "Latitude": 37.1803227,
    "Longitude": -93.2358456,
    "Tag": "em",
    "Phone_Number": "(417) 887-4343",
    "Link": "https://jobs.mo.gov/"
  },
  {
    "Organization": "Anaconda Job Corps",
    "Address": "200 Constitution Ave NW, Suite N4463Washington, DC 20210",
    "Latitude": 38.8937443,
    "Longitude": -77.014524,
    "Tag": "em",
    "Phone_Number": "800 733-5627",
    "Link": "https://www.jobcorps.gov/center/anaconda-job-corps-civilian-conservation-center"
  },
  {
    "Organization": "Montana Vocational Rehabilitation",
    "Address": "11 North Last Chance Gulch, Suite 4C, Helena, MT 59604-4210",
    "Latitude": 46.5871349,
    "Longitude": -112.0390306,
    "Tag": "em",
    "Phone_Number": "(406) 444-2590",
    "Link": "https://dphhs.mt.gov/detd/vocrehab/"
  },
  {
    "Organization": "Nebraska Department of Labor",
    "Address": "550 S 16th St, Lincoln, NE 68508",
    "Latitude": 40.8084181,
    "Longitude": -96.697816,
    "Tag": "em",
    "Phone_Number": "(402) 471-9000",
    "Link": "https://dol.nebraska.gov/"
  },
  {
    "Organization": "Heartland Workforce Solutions",
    "Address": "1777 N. Rademacher, Detroit, MI 48209",
    "Latitude": 42.3130873,
    "Longitude": -83.113664,
    "Tag": "em",
    "Phone_Number": "313.964.4320",
    "Link": "https://hws-ne.org/"
  },
  {
    "Organization": "Northern Nevada Refugee",
    "Address": "1664 N. Virginia Street, Reno, NV 89557",
    "Latitude": 39.54508,
    "Longitude": -119.8183072,
    "Tag": "em, l, h",
    "Phone_Number": "(775) 784-1110",
    "Link": "https://www.unr.edu/nnic/resettlement"
  },
  {
    "Organization": "Nevada Job Connect",
    "Address": "3405 S Maryland Pkwy, Las Vegas, NV 89169",
    "Latitude": 36.1278405,
    "Longitude": -115.1377137,
    "Tag": "em",
    "Phone_Number": "(702) 486-0100",
    "Link": "https://nevadajobconnect.com/"
  },
  {
    "Organization": "One Stop Career Centers",
    "Address": "2800 E St Louis Ave, Las Vegas, NV 89104",
    "Latitude": 36.1472491,
    "Longitude": -115.111388,
    "Tag": "em",
    "Phone_Number": "(702) 486-7923",
    "Link": "https://detr.nv.gov/Page/One-Stop_Career_Centers"
  },
  {
    "Organization": "Nevada Partners",
    "Address": "690 W. Lake Mead Blvd., North Las Vegas, NV 89030",
    "Latitude": 36.1960734,
    "Longitude": -115.1503317,
    "Tag": "em",
    "Phone_Number": "(702) 844-8000",
    "Link": "https://nvpartners.org/"
  },
  {
    "Organization": "NH Works",
    "Address": "45 South Fruit Street CONCORD, NH 03301",
    "Latitude": 43.1971102,
    "Longitude": -71.547968,
    "Tag": "em",
    "Phone_Number": "(603)228-4083",
    "Link": "https://nhworksjobmatch.nhes.nh.gov/vosnet/Default.aspx"
  },
  {
    "Organization": "New Mexico Department of Workforce",
    "Address": "401 Broadway NE, Albuquerque, NM 87102",
    "Latitude": 35.0869852,
    "Longitude": -106.6447536,
    "Tag": "em",
    "Phone_Number": "1-877-664-6984",
    "Link": "https://www.dws.state.nm.us/en-us/"
  },
  {
    "Organization": "HIAS",
    "Address": "1300 Spring Street, Suite 500 Silver Spring, MD 20910",
    "Latitude": 38.9989623,
    "Longitude": -77.0319777,
    "Tag": "ed, em, l, h",
    "Phone_Number": "301-844-7300",
    "Link": "https://hias.org/who/?gclid=Cj0KCQiA0oagBhDHARIsAI-BbgcvLpEisJywovwhYWv_QrLXm2iy-rDxRxxBuiFklUanUPomWgAq0TMaAuPlEALw_wcB&gclsrc=aw.ds"
  },
  {
    "Organization": "Office for New Americans",
    "Address": "123 William Street, New York, NY 10038-3804",
    "Latitude": 40.7094756,
    "Longitude": -74.0072955,
    "Tag": "em, l",
    "Phone_Number": "800-566-7636",
    "Link": "https://dos.ny.gov/office-new-americans-0"
  },
  {
    "Organization": "SafeHorizon",
    "Address": "384 East 149th St - 6th floor, Bronx, NY 10451",
    "Latitude": 40.8160342,
    "Longitude": -73.9184523,
    "Tag": "em, l",
    "Phone_Number": "1-800-621-4673",
    "Link": "https://www.safehorizon.org/our-services/legal-and-court-help/immigration-law-project/"
  },
  {
    "Organization": "CWS",
    "Address": "504 W Chapel Hill St STE 106, Durham, NC 27701",
    "Latitude": 35.9974071,
    "Longitude": -78.909154,
    "Tag": "em",
    "Phone_Number": "919-680-4310",
    "Link": "https://cwsdurham.org/refugee-resettlement/"
  },
  {
    "Organization": "Community Action Partnership",
    "Address": "3233 South University Drive Fargo, ND 58104",
    "Latitude": 46.8316364,
    "Longitude": -96.8005688,
    "Tag": "em, h",
    "Phone_Number": "701-232-2452",
    "Link": "https://www.capnd.org/"
  },
  {
    "Organization": "Global Clevland",
    "Address": "1422 Euclid Ave, #1652 Cleveland, Ohio 44115",
    "Latitude": 41.5007358,
    "Longitude": -81.6810818,
    "Tag": "em",
    "Phone_Number": "216-472-3282",
    "Link": "https://globalcleveland.org/#"
  },
  {
    "Organization": "Immigrant Worker Project",
    "Address": "701 Walnut Ave NE Canton, OH 44702",
    "Latitude": 40.8025604,
    "Longitude": -81.3717266,
    "Tag": "em, h",
    "Phone_Number": "(330) 454 – 2220",
    "Link": "https://iwpohio.org/"
  },
  {
    "Organization": "YWCA",
    "Address": "1910 S Lewis Ave  Tulsa, OK 74104",
    "Latitude": 36.1345401,
    "Longitude": -95.9585832,
    "Tag": "em, l, h",
    "Phone_Number": "(918) 587-2100",
    "Link": "https://www.ywcatulsa.org/immigrant-and-refugee-services/"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "2740 SE POWELL BLVD PORTLAND, OR 97202",
    "Latitude": 45.4975197,
    "Longitude": -122.6379587,
    "Tag": "ed, l",
    "Phone_Number": "(503) 231-4866",
    "Link": "https://www.catholiccharitiesoregon.org/services/"
  },
  {
    "Organization": "ODHS",
    "Address": "500 Summer Street NE, E-15 Salem, OR 973​01",
    "Latitude": 44.9425559,
    "Longitude": -123.0275326,
    "Tag": "em",
    "Phone_Number": "N/A",
    "Link": "https://www.oregon.gov/dhs/assistance/refugee/pages/service-areas.aspx"
  },
  {
    "Organization": "HIAS",
    "Address": "600 Chestnut St., Suite 500B Philadelphia, PA 19106",
    "Latitude": 39.948901,
    "Longitude": -75.1510986,
    "Tag": "em, l, h",
    "Phone_Number": "215.832.0900",
    "Link": "https://hiaspa.org/get-help/arrival-to-citizenship/"
  },
  {
    "Organization": "JFCS",
    "Address": "5743 Bartlett Street Pittsburgh, PA 15217",
    "Latitude": 40.43631,
    "Longitude": -79.9239769,
    "Tag": "em, l, h",
    "Phone_Number": "412.422.7200",
    "Link": "https://www.jfcspgh.org/services/career-development-center/"
  },
  {
    "Organization": "SCDSS",
    "Address": "South Carolina Department of Social Services 1535 Confederate Avenue Ext. Columbia, SC 29201",
    "Latitude": 34.0217192,
    "Longitude": -81.0356419,
    "Tag": "em",
    "Phone_Number": "1.800.922.1548",
    "Link": "https://dss.sc.gov/assistance-programs/refugee-resettlement/"
  },
  {
    "Organization": "Community Action Partnership",
    "Address": "111 N. Van Eps Madison, SD 57042",
    "Latitude": 44.0055134,
    "Longitude": -97.1157075,
    "Tag": "em, l, h",
    "Phone_Number": "605-256-6518",
    "Link": "https://www.interlakescap.com/"
  },
  {
    "Organization": "CRIT",
    "Address": "5100 Linbar Drive, Suite 101, Nashville, TN, 37211",
    "Latitude": 36.0811541,
    "Longitude": -86.697786,
    "Tag": "em, l",
    "Phone_Number": "615-366-6868",
    "Link": "https://www.centerforrefugees.org/"
  },
  {
    "Organization": "Tennessee Resettlement Aid",
    "Address": "2355 Alteras Drive Nashville, TN 37211",
    "Latitude": 36.0215859,
    "Longitude": -86.7018014,
    "Tag": "em, h",
    "Phone_Number": "N/A",
    "Link": "https://tennesseeresettlementaid.org/"
  },
  {
    "Organization": "Catholic Charities of Texas",
    "Address": "1625 Rutherford Ln. Austin, Texas 78754",
    "Latitude": 30.3344734,
    "Longitude": -97.6809922,
    "Tag": "em, l, h",
    "Phone_Number": "512.651.6100",
    "Link": "https://ccctx.org/about-us/"
  },
  {
    "Organization": "Catholic Community Services Utah",
    "Address": "224 North 2200 West • Salt Lake City, Utah 84116",
    "Latitude": 40.7740263,
    "Longitude": -111.9532712,
    "Tag": "em",
    "Phone_Number": "(801) 977-9119",
    "Link": "https://www.ccsutah.org/"
  },
  {
    "Organization": "Utah Workforce Services",
    "Address": "45249 Salt Lake City, UT  84145-0249",
    "Latitude": 40.76,
    "Longitude": -111.9,
    "Tag": "em, l, h",
    "Phone_Number": "801-526-9675",
    "Link": "https://jobs.utah.gov/refugee/"
  },
  {
    "Organization": "Commonwealth Catholic Charities",
    "Address": "1601 Rolling Hills Drive | Richmond, VA 23229",
    "Latitude": 37.6028425,
    "Longitude": -77.5455068,
    "Tag": "em, l, h",
    "Phone_Number": "804.285.5900",
    "Link": "https://www.cccofva.org/services"
  },
  {
    "Organization": "Lutherian Community Sevices Northwest",
    "Address": "4040 S 188th St, Suite 300 SeaTac, WA 98188",
    "Latitude": 47.4347675,
    "Longitude": -122.2824819,
    "Tag": "em, h",
    "Phone_Number": "206-901-1685",
    "Link": "https://lcsnw.org/our-impact/refugee-and-immigrant-services/"
  },
  {
    "Organization": "Catholic Charities West Virginia",
    "Address": "2000 Main St. Wheeling WV 26003",
    "Latitude": 40.0622739,
    "Longitude": -80.7237805,
    "Tag": "em, l",
    "Phone_Number": "(888)-900-2989",
    "Link": "https://catholiccharitieswv.org/migration-and-refugee-services/"
  },
  {
    "Organization": "WorkForce West Virginia",
    "Address": "5707 MacCorkle Ave., SE Suite 500 Charleston, WV 25304",
    "Latitude": 38.3113206,
    "Longitude": -81.5700098,
    "Tag": "em",
    "Phone_Number": "1-800-252-JOBS(5627)",
    "Link": "https://workforcewv.org/"
  },
  {
    "Organization": "Goodwill Industries of Kanawha Valley",
    "Address": "215 Virginia Street W Charleston, WV, US 25302",
    "Latitude": 38.3593837,
    "Longitude": -81.6470242,
    "Tag": "em",
    "Phone_Number": "304-346-0811",
    "Link": "https://www.goodwillkv.com/career-services"
  },
  {
    "Organization": "Climb Wyoming",
    "Address": "1709 Carey Avenue, Cheyenne, WY 82001",
    "Latitude": 41.1336321,
    "Longitude": -104.8170927,
    "Tag": "em",
    "Phone_Number": "(307) 778-4126",
    "Link": "https://www.climbwyoming.org/"
  },
  {
    "Organization": "Wyoming Dept. of Workforce Services",
    "Address": "5221 Yellowstone Road, Cheyenne, WY 82002",
    "Latitude": 41.1675487,
    "Longitude": -104.8263096,
    "Tag": "em",
    "Phone_Number": "(307) 777-8650",
    "Link": "https://dws.wyo.gov/"
  },
  {
    "Organization": "Alabama Coalition for Immigrant Justice",
    "Address": "1826 6th Avenue South Irondale, AL 35210",
    "Latitude": 33.5335518,
    "Longitude": -86.7054106,
    "Tag": "l",
    "Phone_Number": "(205) 945-0777",
    "Link": "https://www.acij.org/"
  },
  {
    "Organization": "GBM",
    "Address": "2304 12th Avenue North Birmingham, AL 35234",
    "Latitude": 33.5294083,
    "Longitude": -86.8098092,
    "Tag": "l",
    "Phone_Number": "(205) 326-6821",
    "Link": "https://gbm.org/"
  },
  {
    "Organization": "Alabama Access to Justice",
    "Address": "4129 Montgomery, AL 36103",
    "Latitude": 32.37,
    "Longitude": -86.3,
    "Tag": "l",
    "Phone_Number": "334-781-6344",
    "Link": "https://www.alabamaatj.org/about/about-mission-goals/"
  },
  {
    "Organization": "Alaska Institute for Justice",
    "Address": "431 West 7th Ave. Suite 208 Anchorage, AK 99501",
    "Latitude": 61.2157662,
    "Longitude": -149.8909414,
    "Tag": "l",
    "Phone_Number": "907-279-2457",
    "Link": "https://www.akijp.org/"
  },
  {
    "Organization": "AIRS",
    "Address": "10240 N 31st Ave #112, Phoenix, AZ 85051",
    "Latitude": 33.579885,
    "Longitude": -112.125941,
    "Tag": "l, h",
    "Phone_Number": "(602) 944-1821",
    "Link": "https://airsaz.org/?page_id=3626"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "2500 N. Tyler St. Little Rock, AR 72207",
    "Latitude": 34.7749469,
    "Longitude": -92.3329481,
    "Tag": "ed, l",
    "Phone_Number": "(501) 664-0340",
    "Link": "https://dolr.org/catholic-charities/refugee-resettlement"
  },
  {
    "Organization": "Catholic Charities Imperial County Immigration Services",
    "Address": "250 W. Orange Street El Centro, CA 92243",
    "Latitude": 32.7891974,
    "Longitude": -115.5480438,
    "Tag": "l",
    "Phone_Number": "(760) 353-6822",
    "Link": "https://catholiccharitiesca.org/where-we-operate/"
  },
  {
    "Organization": "Jewish Family Service",
    "Address": "Community Services Building 8788 Balboa Avenue",
    "Latitude": 32.8208791,
    "Longitude": -117.1391099,
    "Tag": "l",
    "Phone_Number": "(858) 637-3000",
    "Link": "https://www.jfssd.org/our-services/"
  },
  {
    "Organization": "Catholic Charities CC East Bay Immigration Program",
    "Address": "3020 Madison Street, Riverside, CA 92504s",
    "Latitude": 33.9309578,
    "Longitude": -117.4010825,
    "Tag": "l",
    "Phone_Number": "(951) 689-1803",
    "Link": "https://catholiccharitiesca.org/where-we-operate/"
  },
  {
    "Organization": "Catholic Charities San Diego County Immigration Services",
    "Address": "4575 Mission Gorge Pl Suite B, San Diego, CA 92120",
    "Latitude": 32.7827027,
    "Longitude": -117.0947423,
    "Tag": "l",
    "Phone_Number": "(619) 287- 1270",
    "Link": "https://catholiccharitiesca.org/where-we-operate/"
  },
  {
    "Organization": "Jewish Family Service",
    "Address": "3201 South Tamarac Dr. Denver, CO 80231",
    "Latitude": 39.6569862,
    "Longitude": -104.9001043,
    "Tag": "l",
    "Phone_Number": "303.597.5000",
    "Link": "https://www.jewishfamilyservice.org/resettlement"
  },
  {
    "Organization": "211 Colorado",
    "Address": "1129 Colorado Avenue Grand Junction, Colorado 81501",
    "Latitude": 39.0661031,
    "Longitude": -108.5535147,
    "Tag": "l",
    "Phone_Number": "970.244.8400",
    "Link": "https://www.211colorado.org/immigrant-and-refugee-services/"
  },
  {
    "Organization": "New Haven Legal Assistance",
    "Address": "205 Orange Street New Haven, Connecticut 06510-2069",
    "Latitude": 41.3068139,
    "Longitude": -72.9229053,
    "Tag": "l",
    "Phone_Number": "203-946-4811",
    "Link": "https://nhlegal.org/"
  },
  {
    "Organization": "CIRC",
    "Address": "36 Woodland Street Hartford, CT 06105",
    "Latitude": 41.7695591,
    "Longitude": -72.7007157,
    "Tag": "l, h",
    "Phone_Number": "(860) 727-5731",
    "Link": "https://www.coalitionct.org/refugee-resettlement"
  },
  {
    "Organization": "Catholic Charities Diocese of St. Petersburg",
    "Address": "2021 E. Bush Boulevard Tampa, FL 33612",
    "Latitude": 28.0321359,
    "Longitude": -82.4358774,
    "Tag": "l, h",
    "Phone_Number": "813-631-4397",
    "Link": "https://www.ccdosp.org/refugee-ressletement/"
  },
  {
    "Organization": "Catholic Charities Hawaii",
    "Address": "1822 Ke‘eaumoku Street Honolulu, HI 96822",
    "Latitude": 21.3076458,
    "Longitude": -157.8338364,
    "Tag": "l, h",
    "Phone_Number": "(808) 521-4357",
    "Link": "https://www.catholiccharitieshawaii.org/"
  },
  {
    "Organization": "Aloha Immigration",
    "Address": "1050 Queen Street #100 Honolulu, HI 96814",
    "Latitude": 21.2949458,
    "Longitude": -157.851935,
    "Tag": "l",
    "Phone_Number": "(808) 626-5020",
    "Link": "https://alohaimmigration.com/"
  },
  {
    "Organization": "Legal Aid Hawaii",
    "Address": "924 Bethel Street Honolulu, HI 96813",
    "Latitude": 21.3099792,
    "Longitude": -157.8630564,
    "Tag": "l",
    "Phone_Number": "808-536-4302",
    "Link": "https://www.legalaidhawaii.org/immigrant-justice-center.html"
  },
  {
    "Organization": "Catholic Charities Idaho",
    "Address": "7201 W. Franklin Rd. Boise, ID  83709",
    "Latitude": 43.6040499,
    "Longitude": -116.2713308,
    "Tag": "l",
    "Phone_Number": "(208) 345-6031",
    "Link": "https://www.ccidaho.org/"
  },
  {
    "Organization": "CSI Refugee Center",
    "Address": "1526 Highland Ave. E. Twin Falls, Idaho 83301",
    "Latitude": 42.544636,
    "Longitude": -114.4544646,
    "Tag": "ed, em, l",
    "Phone_Number": "208-736-2166",
    "Link": "https://refugeecenter.csi.edu/programs/socialServices.asp"
  },
  {
    "Organization": "Catholic Charities Indianapolis",
    "Address": "1400 N. Meridian Street, Indianapolis, IN 46202",
    "Latitude": 39.7862374,
    "Longitude": -86.1579498,
    "Tag": "l, h",
    "Phone_Number": "800-382-9836",
    "Link": "https://www.archindy.org/cc/indianapolis/"
  },
  {
    "Organization": "Neighborhood Christian Legal Clinic",
    "Address": "3333 N Meridian Street, Suite 201, Indianapolis, Indiana 46208",
    "Latitude": 39.8164762,
    "Longitude": -86.1564105,
    "Tag": "l, h",
    "Phone_Number": "1.317.429.4131",
    "Link": "https://www.nclegalclinic.org/immigrant-justice"
  },
  {
    "Organization": "Catholic Charities Witchita",
    "Address": "437 North Topeka st. Wichita. KS 67202-2431",
    "Latitude": 37.6930495,
    "Longitude": -97.3346691,
    "Tag": "l, h",
    "Phone_Number": "(316) 264-8344",
    "Link": ""
  },
  {
    "Organization": "SLLS",
    "Address": "715 St. Ferdinand St. Baton Rouge, LA 70802",
    "Latitude": 30.4409738,
    "Longitude": -91.1862244,
    "Tag": "l",
    "Phone_Number": "(855) 512-3980",
    "Link": "https://slls.org/"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "58009 New Orleans, LA 70158-8009",
    "Latitude": 29.9510658,
    "Longitude": -90.0715323,
    "Tag": "ed",
    "Phone_Number": "(504) 523-3755",
    "Link": "https://www.ccano.org/programs/refugee-immigration/"
  },
  {
    "Organization": "ILAP",
    "Address": "489 Congress Street, 3rd Floor Portland, ME 04112",
    "Latitude": 43.6567757,
    "Longitude": -70.2602076,
    "Tag": "l",
    "Phone_Number": "(207) 780-1593",
    "Link": "https://ilapmaine.org/"
  },
  {
    "Organization": "Advocacy Center",
    "Address": "530 Lakeland Drive Baton Rouge, LA 70802",
    "Latitude": 30.4555619,
    "Longitude": -91.1854567,
    "Tag": "l",
    "Phone_Number": "800-960-7705",
    "Link": "https://louisianalawhelp.org/organization/advocacy-center-baton-rouge-office"
  },
  {
    "Organization": "Catholic Charities Maine",
    "Address": "10660 Portland, ME 04104-6060",
    "Latitude": 43.6599999,
    "Longitude": -70.27,
    "Tag": "l",
    "Phone_Number": "(207) 781-8550",
    "Link": "https://www.ccmaine.org/services/refugee-immigration-services"
  },
  {
    "Organization": "Legal Aid Clinic",
    "Address": "300 Fore Street, Portland, ME 04101",
    "Latitude": 43.6577219,
    "Longitude": -70.2511146,
    "Tag": "l",
    "Phone_Number": "207.780.4355",
    "Link": "https://mainelaw.maine.edu/"
  },
  {
    "Organization": "VLP",
    "Address": "75 Pearl St, Portland, ME 04101",
    "Latitude": 43.6594059,
    "Longitude": -70.2547639,
    "Tag": "l, h",
    "Phone_Number": "1-800-442-4293",
    "Link": "https://www.vlp.org/"
  },
  {
    "Organization": "JFS",
    "Address": "475 Franklin Street Suite 101 Framingham MA 01702",
    "Latitude": 42.2894722,
    "Longitude": -71.4278929,
    "Tag": "l, h",
    "Phone_Number": "508-875-3100",
    "Link": "https://jfsmw.org/immigrant/"
  },
  {
    "Organization": "MIRC",
    "Address": "15 S. Washington Street, Suite 201 Ypsilanti, MI 48197",
    "Latitude": 42.2400465,
    "Longitude": -83.6141393,
    "Tag": "l",
    "Phone_Number": "(734) 239-6863",
    "Link": "https://michiganimmigrant.org/find-services"
  },
  {
    "Organization": "Advocates for Human Rights",
    "Address": "330 Second Avenue South, Suite 800 Minneapolis, MN 55401",
    "Latitude": 44.9790575,
    "Longitude": -93.2671179,
    "Tag": "l",
    "Phone_Number": "612-341-3302",
    "Link": "https://www.theadvocatesforhumanrights.org/Migrant_Rights"
  },
  {
    "Organization": "Mississippi Center for Justice",
    "Address": "210 E. Capitol Street Suite 1800 Jackson, MS 39201",
    "Latitude": 32.3004291,
    "Longitude": -90.1852806,
    "Tag": "l",
    "Phone_Number": "(601) 352-2269",
    "Link": "https://mscenterforjustice.org/"
  },
  {
    "Organization": "Legal Aid of Western Missouri",
    "Address": "4001 Dr. Martin Luther King, Jr. Blvd., Suite 300, Kansas City, MO 64130",
    "Latitude": 39.0345441,
    "Longitude": -94.5366215,
    "Tag": "l",
    "Phone_Number": "816-474-6750",
    "Link": "https://lawmo.org/"
  },
  {
    "Organization": "MLSA",
    "Address": "616 Helena Avenue Suite 100 Helena, MT 59601",
    "Latitude": 46.5933283,
    "Longitude": -112.0355668,
    "Tag": "l",
    "Phone_Number": "1-800-666-6899",
    "Link": "https://www.mtlsa.org/"
  },
  {
    "Organization": "World Montana",
    "Address": "1601 N. Benton Ave, Helena, MT 59625",
    "Latitude": 46.6019947,
    "Longitude": -112.0380559,
    "Tag": "l",
    "Phone_Number": "406.447.4444",
    "Link": "https://worldmontana.org/"
  },
  {
    "Organization": "Refugee Empowerment",
    "Address": "1111 N 13th Street, Suite 128, Omaha, NE 68102",
    "Latitude": 41.2723048,
    "Longitude": -95.9326328,
    "Tag": "l",
    "Phone_Number": "(402) 554-0759",
    "Link": "https://refugeeempowerment.org/"
  },
  {
    "Organization": "Omaha Together",
    "Address": "3647 Lafayette Avenue, Ste 110, Omaha, NE 68131",
    "Latitude": 41.2706985,
    "Longitude": -95.9685051,
    "Tag": "l",
    "Phone_Number": "402-344-4401",
    "Link": "https://otoc.org/"
  },
  {
    "Organization": "Immigrant Legal Center",
    "Address": "4223 Center Street, Omaha, NE, 68105",
    "Latitude": 41.2412202,
    "Longitude": -95.9766293,
    "Tag": "l",
    "Phone_Number": "402.898.1349",
    "Link": "https://www.immigrantlc.org/"
  },
  {
    "Organization": "Nebraska Appleseed",
    "Address": "Nebraska Appleseed, 947 O St, Ste 401, Lincoln, NE 68508",
    "Latitude": 40.8132619,
    "Longitude": -96.7072825,
    "Tag": "l",
    "Phone_Number": "402-438-8853",
    "Link": "https://neappleseed.org/"
  },
  {
    "Organization": "Catholic Services",
    "Address": "1501 Las Vegas Blvd North, Las Vegas, NV 89101",
    "Latitude": 36.1870151,
    "Longitude": -115.1346743,
    "Tag": "l",
    "Phone_Number": "702.385.2662",
    "Link": "https://www.catholiccharities.com/services/immigration-refugee-services"
  },
  {
    "Organization": "Immigration Clinic",
    "Address": "William S. Boyd School of Law, 4505 S. Maryland Parkway",
    "Latitude": 36.1079635,
    "Longitude": -115.1399553,
    "Tag": "l",
    "Phone_Number": "702-895-3671",
    "Link": "https://law.unlv.edu/clinics/immigration"
  },
  {
    "Organization": "Legal Aid Center of Southern Nevada",
    "Address": "725 E. Charleston Blvd., Las Vegas, NV 89104",
    "Latitude": 36.1592178,
    "Longitude": -115.1432688,
    "Tag": "l",
    "Phone_Number": "(702) 386-1070",
    "Link": "https://www.lacsn.org/"
  },
  {
    "Organization": "ORIS",
    "Address": "434 Lake Ave. Second Floor Manchester, NH 03103",
    "Latitude": 42.9874571,
    "Longitude": -71.4465684,
    "Tag": "l",
    "Phone_Number": "(603) 296-0443",
    "Link": "https://www.refugeesuccess.org/programs/refugee-resettlement/"
  },
  {
    "Organization": "Catholic Charities Diocese of Trenton",
    "Address": "383 West State Street, Trenton, NJ 08607-1423",
    "Latitude": 40.2244989,
    "Longitude": -74.7777428,
    "Tag": "l, h",
    "Phone_Number": "1-800-360-7711",
    "Link": "https://www.catholiccharitiestrenton.org/"
  },
  {
    "Organization": "Lutheran Social Ministries of NJ",
    "Address": "3 Manhattan Drive, Burlington, NJ 08016",
    "Latitude": 40.0365218,
    "Longitude": -74.8451389,
    "Tag": "l, h",
    "Phone_Number": "609-386-7171",
    "Link": "https://www.lsmnj.org/"
  },
  {
    "Organization": "International Institute of New Jersey",
    "Address": "1 Journal Square Plaza # 4, Jersey City, NJ 07306",
    "Latitude": 40.7343616,
    "Longitude": -74.063643,
    "Tag": "l",
    "Phone_Number": "(201) 653-3888",
    "Link": "https://www.jerseycares.org/organization/001A000000jAC6LIAW"
  },
  {
    "Organization": "NMLC",
    "Address": "625 Silver Ave SW, Albuquerque, NM 87102",
    "Latitude": 35.0833265,
    "Longitude": -106.655025,
    "Tag": "l",
    "Phone_Number": "(505) 247-1023",
    "Link": "https://www.nmilc.org/our-services"
  },
  {
    "Organization": "Santa Fe Dreamers",
    "Address": "8009 Santa Fe, NM 87504 USA",
    "Latitude": 35.81,
    "Longitude": -105.99,
    "Tag": "l",
    "Phone_Number": "1-866-416-1922",
    "Link": "http://www.santafedreamersproject.org/legal-services"
  },
  {
    "Organization": "New Mexico Legal Aid",
    "Address": "505 Marquette Avenue NW, Albuquerque, NM, 87102",
    "Latitude": 35.0886747,
    "Longitude": -106.6522954,
    "Tag": "l",
    "Phone_Number": "(505) 243-7871",
    "Link": "https://www.newmexicolegalaid.org/"
  },
  {
    "Organization": "NMCDLA",
    "Address": "8324 Santa Fe, NM 87504",
    "Latitude": 35.81,
    "Longitude": -105.99,
    "Tag": "l",
    "Phone_Number": "505-992-0050",
    "Link": "https://nmcdla.org/"
  },
  {
    "Organization": "University of North Dakota",
    "Address": "Grand Forks, ND 58202",
    "Latitude": 47.9536762,
    "Longitude": -97.1683543,
    "Tag": "l",
    "Phone_Number": "701.777.3000",
    "Link": "https://und.edu/academics/provost/immigration.html"
  },
  {
    "Organization": "Citizenship and Immigration Services",
    "Address": "226 Steen Blvd. Bldg 101, Grand Forks, ND 58205",
    "Latitude": 47.9483003,
    "Longitude": -97.3733057,
    "Tag": "l",
    "Phone_Number": "(701) 747-4902",
    "Link": "https://www.grandforkshousing.com/base-directory/citizenship-and-immigration-services"
  },
  {
    "Organization": "Lutheran Social Services",
    "Address": "3911 20th Ave. S. Fargo, ND 58103",
    "Latitude": 46.8485947,
    "Longitude": -96.8470662,
    "Tag": "l",
    "Phone_Number": "701) 235-7341",
    "Link": "https://www.immigrationadvocates.org/nonprofit/legaldirectory/organization.393084-Lutheran_Social_Services_of_North_Dakota_Immigration_Services"
  },
  {
    "Organization": "Legal Services of North Dakota",
    "Address": "418 E Broadway #25, Bismarck, North Dakota 58501",
    "Latitude": 46.8067048,
    "Longitude": -100.7850725,
    "Tag": "l",
    "Phone_Number": "701-258-0043",
    "Link": "http://www.legalassist.org/"
  },
  {
    "Organization": "Legal Aid Society",
    "Address": "1223 West Sixth St., Cleveland, OH 44113",
    "Latitude": 41.501069,
    "Longitude": -81.699383,
    "Tag": "l",
    "Phone_Number": "888-817-3777",
    "Link": "https://lasclev.org/"
  },
  {
    "Organization": "International Institute of Akron",
    "Address": "20 Olive Street, Suite 201, Akron, OH, 44310",
    "Latitude": 41.0976918,
    "Longitude": -81.51457,
    "Tag": "l",
    "Phone_Number": 3303765106,
    "Link": "https://www.iiakron.org/"
  },
  {
    "Organization": "Oklahoma University",
    "Address": "800 N. Harvey, Oklahoma City, OK 73102",
    "Latitude": 35.4756651,
    "Longitude": -97.517025,
    "Tag": "l",
    "Phone_Number": "(405) 208-6400",
    "Link": "https://law.okcu.edu/academics/curriculum/centers-programs/"
  },
  {
    "Organization": "Ecumencial Ministries of Oregon",
    "Address": "245 S Bancroft St., Ste. B, Portland, OR 97239",
    "Latitude": 45.492627,
    "Longitude": -122.6750611,
    "Tag": "l, h",
    "Phone_Number": "(503) 221-1054",
    "Link": "https://emoregon.org/our-programs/"
  },
  {
    "Organization": "Innovation Law Labe",
    "Address": "40204, Portland, OR 97240",
    "Latitude": 45.515232,
    "Longitude": -122.6783853,
    "Tag": "l",
    "Phone_Number": "N/A",
    "Link": ""
  },
  {
    "Organization": "Catholic Charities of Harrisonburg",
    "Address": "4800 Union Deposit Rd Harrisburg, PA 17111-3710",
    "Latitude": 40.281725,
    "Longitude": -76.8014105,
    "Tag": "l, h",
    "Phone_Number": "717-657-4804",
    "Link": "http://www.cchbg.org/get-help/"
  },
  {
    "Organization": "Catholic Charities of SC",
    "Address": "1662 Ingram Road Charleston, SC 29407",
    "Latitude": 32.8150536,
    "Longitude": -79.9930918,
    "Tag": "l",
    "Phone_Number": "843-388-0089",
    "Link": "https://charitiessc.org/immigration-legal-services"
  },
  {
    "Organization": "SC Legal Services",
    "Address": "2803 Carner Avenue North Charleston, SC 29405",
    "Latitude": 32.8463462,
    "Longitude": -79.9665783,
    "Tag": "l",
    "Phone_Number": "(843) 720-7044",
    "Link": "https://sclegal.org/"
  },
  {
    "Organization": "Voices for Peace",
    "Address": "300 South Minnesota Avenue Sioux Falls, South Dakota 57104",
    "Latitude": 43.5443922,
    "Longitude": -96.7303747,
    "Tag": "l",
    "Phone_Number": "(605) 782-9560",
    "Link": "https://www.sdvfpeace.org/legal-services.html"
  },
  {
    "Organization": "Blessed Virgin Mary",
    "Address": "1500 North Second Street Aberdeen, South Dakota 57401",
    "Latitude": 45.4810592,
    "Longitude": -98.4908814,
    "Tag": "l",
    "Phone_Number": "605.229.8337",
    "Link": "https://www.presentationsisters.org/ministries/social-justice/"
  },
  {
    "Organization": "TIIRC",
    "Address": "3310 Ezell Rd Nashville, TN — 37211",
    "Latitude": 36.0824085,
    "Longitude": -86.6889521,
    "Tag": "l",
    "Phone_Number": "(615) 833-0384",
    "Link": "https://www.tnimmigrant.org/refugeeswelcome"
  },
  {
    "Organization": "RAICES",
    "Address": "1305 N. Flores Street, San Antonio TX 78212",
    "Latitude": 29.4381187,
    "Longitude": -98.5031345,
    "Tag": "l",
    "Phone_Number": "N/A",
    "Link": "https://www.raicestexas.org/need-help/"
  },
  {
    "Organization": "Legal Aid Justice Center",
    "Address": "6402 Arlington Blvd, Suite 1130 Falls Church VA 22042",
    "Latitude": 38.8734906,
    "Longitude": -77.1599794,
    "Tag": "l",
    "Phone_Number": "(703) 778-3450",
    "Link": "https://www.justice4all.org/"
  },
  {
    "Organization": "Northern Virginia Family Service",
    "Address": "10455 White Granite Dr., Suite 100 Oakton, VA 22124",
    "Latitude": 38.8734181,
    "Longitude": -77.3055359,
    "Tag": "l, h",
    "Phone_Number": "571.748.2500",
    "Link": "https://www.nvfs.org/"
  },
  {
    "Organization": "Catholic Immigration Services",
    "Address": "100 23rd Avenue S Seattle, WA 98144",
    "Latitude": 47.601159,
    "Longitude": -122.3016677,
    "Tag": "l",
    "Phone_Number": "(206) 328-5696",
    "Link": "https://ccsww.org/get-help/specialized-services/refugee-immigration-services/"
  },
  {
    "Organization": "ACLU",
    "Address": "1614 Kanawha Blvd E, Charleston, WV 25311",
    "Latitude": 38.3373738,
    "Longitude": -81.6178814,
    "Tag": "l",
    "Phone_Number": "304-345-9246",
    "Link": "https://www.acluwv.org/en/issues/immigrants-rights"
  },
  {
    "Organization": "Legal Aid of West Virginia",
    "Address": "922 Quarrier Street, Fourth Floor Charleston, WV 25301",
    "Latitude": 38.348975,
    "Longitude": -81.6333685,
    "Tag": "l",
    "Phone_Number": "866-255-4370",
    "Link": "https://legalaidwv.org/"
  },
  {
    "Organization": "Catholic Charities",
    "Address": "3501 Marshall Lake Dr., Oakton, VA 22124",
    "Latitude": 38.8990305,
    "Longitude": -77.3363306,
    "Tag": "l",
    "Phone_Number": "414-769-3400",
    "Link": "https://www.ccmke.org/RIS"
  },
  {
    "Organization": "Immigrant Hope",
    "Address": "90 W Kelly Ave/PO Box 942 Jackson, WY 83001",
    "Latitude": 43.4752448,
    "Longitude": -110.7631844,
    "Tag": "l",
    "Phone_Number": "208-709-0131",
    "Link": "https://www.immigranthopewyomingidaho.org/"
  },
  {
    "Organization": "Grace Klein Community",
    "Address": "2652 Old Rocky Ridge Rd, Hoover, AL 35216",
    "Latitude": 33.4011365,
    "Longitude": -86.7632037,
    "Tag": "h",
    "Phone_Number": "205-490-7516",
    "Link": "https://gracekleincommunity.com/"
  },
  {
    "Organization": "Habitat for Humanity of Central Arkansas",
    "Address": "6700 S. University Avenue Little Rock, AR 72209",
    "Latitude": 34.6880759,
    "Longitude": -92.3495164,
    "Tag": "h",
    "Phone_Number": "501.376.4434",
    "Link": "https://www.habitatcentralar.org/"
  },
  {
    "Organization": "Ministry of Caring",
    "Address": "115 East 14th Street Wilmington, DE 19801-3209",
    "Latitude": 39.7486043,
    "Longitude": -75.5436596,
    "Tag": "h",
    "Phone_Number": "(302) 652-5523",
    "Link": "https://www.ministryofcaring.org/"
  },
  {
    "Organization": "Habitat for Humanity of New Castle County",
    "Address": "1920 Hutton Street Wilmington, DE 19802",
    "Latitude": 39.7510134,
    "Longitude": -75.5410441,
    "Tag": "h",
    "Phone_Number": "302-652-0365",
    "Link": "https://www.habitatncc.org/"
  },
  {
    "Organization": "Beyond 90",
    "Address": "3920 Spring Park Road Jacksonville, FL 32207",
    "Latitude": 30.2860053,
    "Longitude": -81.621864,
    "Tag": "h",
    "Phone_Number": "904-509-9388",
    "Link": "https://www.beyond90.org/"
  },
  {
    "Organization": "The Institute for Human Services",
    "Address": "546 Kaaahi Street Honolulu, Hawaii 96817",
    "Latitude": 21.3177915,
    "Longitude": -157.8658741,
    "Tag": "h",
    "Phone_Number": "808.447.2800",
    "Link": "https://ihshawaii.org/"
  },
  {
    "Organization": "Family Programs Hawaii",
    "Address": "801 S King St Honolulu, HI 96813",
    "Latitude": 21.3021845,
    "Longitude": -157.8523678,
    "Tag": "h",
    "Phone_Number": "(808) 521-9531",
    "Link": "https://familyprogramshawaii.org/about-us/"
  },
  {
    "Organization": "JCS Hawaii",
    "Address": "235805 Honolulu, HI 96823",
    "Latitude": 21.3089203,
    "Longitude": -157.8494935,
    "Tag": "h",
    "Phone_Number": "808.258.7121",
    "Link": "https://www.jcs-hi.org/our-mission"
  },
  {
    "Organization": "ICAN",
    "Address": "Boise, ID 83703",
    "Latitude": 43.6574505,
    "Longitude": -116.242429,
    "Tag": "h",
    "Phone_Number": "(208) 385-9146",
    "Link": "https://www.facebook.com/IdahoCAN/"
  },
  {
    "Organization": "Idaho Office for Refugees",
    "Address": "1607 W. Jefferson St. Boise, ID 83702",
    "Latitude": 43.6226044,
    "Longitude": -116.2112249,
    "Tag": "h",
    "Phone_Number": "208.336.4222",
    "Link": "https://www.idahorefugees.org/for-housing-professionals.html"
  },
  {
    "Organization": "Boise City Housing Authorities",
    "Address": "1001 S Orchard Street Boise Idaho 83705",
    "Latitude": 43.5951442,
    "Longitude": -116.2440496,
    "Tag": "h",
    "Phone_Number": "(208) 345-4907",
    "Link": "https://bcacha.org/"
  },
  {
    "Organization": "Illinois Housing Help",
    "Address": "111 E. Wacker Dr., Suite 1000 Chicago, IL 60601",
    "Latitude": 41.8876241,
    "Longitude": -87.6236513,
    "Tag": "h",
    "Phone_Number": "(866) 454-3571",
    "Link": "https://www.illinoishousinghelp.org/"
  },
  {
    "Organization": "Fair Housing Center of Indiana",
    "Address": "445 North Pennsylvania St, Ste 811 Indianapolis, IN 46204",
    "Latitude": 39.7738265,
    "Longitude": -86.1555472,
    "Tag": "h",
    "Phone_Number": "317-644-0673",
    "Link": "https://www.fhcci.org/programs/education/national-origin-immigration-refugee-status/"
  },
  {
    "Organization": "New Orleans Multi-Cultural Institute",
    "Address": "1500 Lafayette St. Suite 154 Gretna LA 70053",
    "Latitude": 29.907811,
    "Longitude": -90.055775,
    "Tag": "h",
    "Phone_Number": "504.814.4480",
    "Link": "http://www.nomicllc.com/"
  },
  {
    "Organization": "Maine Housing",
    "Address": "26 Edison Drive, Augusta Maine 04330",
    "Latitude": 44.3161894,
    "Longitude": -69.8178461,
    "Tag": "h",
    "Phone_Number": "(800) 452-4668",
    "Link": "https://www.mainehousing.org/"
  },
  {
    "Organization": "Preble Street",
    "Address": "55 Portland Street Portland, ME 04101",
    "Latitude": 43.6582767,
    "Longitude": -70.2642657,
    "Tag": "h",
    "Phone_Number": "207-775-0026",
    "Link": "https://www.preblestreet.org/"
  },
  {
    "Organization": "Avesta Housing",
    "Address": "4 Meeting Place Drive Exeter, NH 03833",
    "Latitude": 42.988454,
    "Longitude": -70.963589,
    "Tag": "h",
    "Phone_Number": "207-553-7777",
    "Link": "https://www.avestahousing.org/"
  },
  {
    "Organization": "Saint Paul Minnesota",
    "Address": "15 Kellogg Blvd. West Saint Paul, MN 55102",
    "Latitude": 44.9447369,
    "Longitude": -93.0921341,
    "Tag": "h",
    "Phone_Number": "651-266-8989",
    "Link": "https://www.stpaul.gov/departments/planning-and-economic-development/housing/emergency-rent-assistance"
  },
  {
    "Organization": "NACC",
    "Address": "5825 Nelson Avenue Burnaby, BC",
    "Latitude": 49.231614,
    "Longitude": -122.994927,
    "Tag": "h",
    "Phone_Number": "604.435.4123",
    "Link": "https://www.nacchurch.org/"
  },
  {
    "Organization": "Regional Housing Authority",
    "Address": "10430 Three Rivers Rd Gulfport, Mississippi 39503",
    "Latitude": 30.4380477,
    "Longitude": -89.0829347,
    "Tag": "h",
    "Phone_Number": "(228) 248-1030",
    "Link": "https://mrha8org.wordpress.com/"
  },
  {
    "Organization": "Mississippi Home Corporation",
    "Address": "735 Riverside Dr, Jackson, MS 39202",
    "Latitude": 32.3231209,
    "Longitude": -90.1756525,
    "Tag": "h",
    "Phone_Number": "601-718-4642",
    "Link": "https://www.mshomecorp.com/"
  },
  {
    "Organization": "City Union",
    "Address": "1100 East 11th Street | Kansas City, MO 64106",
    "Latitude": 39.1010737,
    "Longitude": -94.5694674,
    "Tag": "h",
    "Phone_Number": "(816) 474-9380",
    "Link": "https://cityunionmission.org/what-we-do/"
  },
  {
    "Organization": "Montana Fair Housing",
    "Address": "501 E Front St. #533 Butte, MT 59701",
    "Latitude": 46.0004931,
    "Longitude": -112.5296919,
    "Tag": "h",
    "Phone_Number": "1-406-782-2573",
    "Link": "https://montanafairhousing.org/"
  },
  {
    "Organization": "Montana Rescue Mission",
    "Address": "2902 Minnesota Avenue Billings, Montana 59101",
    "Latitude": 45.779532,
    "Longitude": -108.5053451,
    "Tag": "h",
    "Phone_Number": "406-259-3800",
    "Link": "https://montanarescuemission.org/"
  },
  {
    "Organization": "Montana Department of Commerce",
    "Address": "301 S Park Ave Helena MT 59601",
    "Latitude": 46.5841859,
    "Longitude": -112.0424801,
    "Tag": "h",
    "Phone_Number": "406.841.2840",
    "Link": "https://housing.mt.gov/"
  },
  {
    "Organization": "Habitat Omaha",
    "Address": "1701 N. 24th St. Omaha, NE 68110",
    "Latitude": 41.2747423,
    "Longitude": -95.9461836,
    "Tag": "h",
    "Phone_Number": "(402) 457-5657",
    "Link": "https://habitatomaha.org/"
  },
  {
    "Organization": "Family Housing Advising Services",
    "Address": "2401 Lake St. Omaha, NE 68111",
    "Latitude": 41.2812866,
    "Longitude": -95.9472825,
    "Tag": "h",
    "Phone_Number": "(402) 934-7921",
    "Link": "https://www.fhasinc.org/"
  },
  {
    "Organization": "YWCA",
    "Address": "72 CONCORD ST MANCHESTER, NH 03101",
    "Latitude": 42.9929267,
    "Longitude": -71.4611458,
    "Tag": "h",
    "Phone_Number": "603.625.5785",
    "Link": "https://ywcanh.org/housing-programs-reach/"
  },
  {
    "Organization": "Concord Human Services",
    "Address": "41 Green Street Concord, NH 03301",
    "Latitude": 43.206219,
    "Longitude": -71.540106,
    "Tag": "h",
    "Phone_Number": "603-225-8610",
    "Link": "https://www.concordnh.gov/579/Human-Services"
  },
  {
    "Organization": "Community Action Program",
    "Address": "2 Industrial Park Drive, Concord, NH",
    "Latitude": 43.2130049,
    "Longitude": -71.4862774,
    "Tag": "h",
    "Phone_Number": "603 225-3295",
    "Link": "https://www.bm-cap.org/"
  },
  {
    "Organization": "HCDN-NJ",
    "Address": "145 W. Hanover Street Trenton, NJ 08618",
    "Latitude": 40.2218523,
    "Longitude": -74.769953,
    "Tag": "h",
    "Phone_Number": "(609) 393-3752",
    "Link": "https://www.hcdnnj.org/"
  },
  {
    "Organization": "YWCA",
    "Address": "301 Washington SE Albuquerque, NM",
    "Latitude": 35.076895,
    "Longitude": -106.59555,
    "Tag": "h",
    "Phone_Number": 5052549922,
    "Link": "https://www.groundworksnm.org/nonprofit-directory/nonprofit/34167"
  },
  {
    "Organization": "Somos Un Pueblo Unido",
    "Address": "1804 Espinacitas St. Santa Fe, NM 87505",
    "Latitude": 35.6608193,
    "Longitude": -105.9678304,
    "Tag": "h",
    "Phone_Number": "505-424-7832",
    "Link": "https://www.somosunpueblounido.org/somos-un-pueblo-unido.html#about"
  },
  {
    "Organization": "WANA Community Center",
    "Address": "521 W. 126th St. in Harlem, NYC",
    "Latitude": 40.814938,
    "Longitude": -73.9559829,
    "Tag": "h",
    "Phone_Number": "N/A",
    "Link": "https://www.wanacommunitycenter.org/rdj-refugee-shelter"
  },
  {
    "Organization": "Rural Development Housing Program",
    "Address": "220 East Rosser Ave, Room 208 Bismarck, ND 58501",
    "Latitude": 46.8091646,
    "Longitude": -100.7883243,
    "Tag": "h",
    "Phone_Number": "(701) 530-2037",
    "Link": "https://www.rd.usda.gov/nd"
  },
  {
    "Organization": "North Dakota Community Action Agencies",
    "Address": "301 Rhode Island Ave. N.W, #2002 Washington, DC 20001",
    "Latitude": 38.9150639,
    "Longitude": -77.0163998,
    "Tag": "h",
    "Phone_Number": "(202) 238-4600",
    "Link": "https://communityactionpartnership.com/find-a-cap/"
  },
  {
    "Organization": "CDSA",
    "Address": "114 S Independence Ave, Enid, OK 73701",
    "Latitude": 36.396247,
    "Longitude": -97.8803088,
    "Tag": "h",
    "Phone_Number": "(580) 242-6131‬",
    "Link": "https://cdsaok.org/"
  },
  {
    "Organization": "Green County Habitat for Humanity",
    "Address": "6235 E 13th ST, Tulsa, OK",
    "Latitude": 36.1445414,
    "Longitude": -95.9077488,
    "Tag": "h",
    "Phone_Number": "(918)592-4224",
    "Link": "https://greencountryhabitat.org/about-tulsa-habitat"
  },
  {
    "Organization": "JFCS PA",
    "Address": "5743 Bartlett St, Pittsburgh, PA 15217",
    "Latitude": 40.43631,
    "Longitude": -79.9239769,
    "Tag": "h",
    "Phone_Number": "(412) 422-7200",
    "Link": "https://jfcsphilly.org/basic-needs/"
  },
  {
    "Organization": "The Alliance",
    "Address": "6420 Hillcroft Avenue, Houston, TX 77081",
    "Latitude": 29.7119874,
    "Longitude": -95.4946549,
    "Tag": "h",
    "Phone_Number": "817.224.6000",
    "Link": "https://thealliancetx.org/refugee-services/#refugeeservices"
  },
  {
    "Organization": "CASPVT",
    "Address": "190 Main St Ste. 301, Brattleboro, VT 05301",
    "Latitude": 42.8538008,
    "Longitude": -72.5591631,
    "Tag": "h",
    "Phone_Number": "(802) 579-1509",
    "Link": "https://caspvt.org/"
  },
  {
    "Organization": "King County Housing Association",
    "Address": "600 Andover Park W. Tukwila, WA 98188",
    "Latitude": 47.4499146,
    "Longitude": -122.2537243,
    "Tag": "h",
    "Phone_Number": "(206) 574-1100",
    "Link": "https://www.kcha.org/"
  },
  {
    "Organization": "Tacoma Housing",
    "Address": "902 South L Street Tacoma, WA 98405-4037",
    "Latitude": 47.2533644,
    "Longitude": -122.453904,
    "Tag": "h",
    "Phone_Number": "(253) 207-4400",
    "Link": "https://www.tacomahousing.org/"
  },
  {
    "Organization": "West Virginia Housing Development Fund",
    "Address": "5710 MacCorkle Ave. SE Charleston, WV 25304",
    "Latitude": 38.3138844,
    "Longitude": -81.5679547,
    "Tag": "h",
    "Phone_Number": "(304) 391-8600",
    "Link": "https://www.wvhdf.com/"
  },
  {
    "Organization": "Habitat for Humanity WV Locations",
    "Address": "56 S. Kanawha Street Buckhannon, WV 26201",
    "Latitude": 38.9904691,
    "Longitude": -80.2292776,
    "Tag": "h",
    "Phone_Number": "(304) 470-2922",
    "Link": "https://www.habitat.org/local/affiliate-by-state?state=WV"
  },
  {
    "Organization": "CommunityWorks WV",
    "Address": "4302 Crede Drive, Charleston, WV 25302",
    "Latitude": 38.4055447,
    "Longitude": -81.5425658,
    "Tag": "h",
    "Phone_Number": "304.965.2241",
    "Link": "https://communityworkswv.org/"
  },
  {
    "Organization": "IIW",
    "Address": "1110 North Old World Third Street, Suite 420 Milwaukee WI, 53203",
    "Latitude": 43.0446739,
    "Longitude": -87.9141921,
    "Tag": "h",
    "Phone_Number": "414-225-6220",
    "Link": "https://iiwisconsin.org/refugee-resettlement/"
  },
  {
    "Organization": "Wyoming Housing Network",
    "Address": "2345 E 2nd St, Casper, WY 82609",
    "Latitude": 42.8483908,
    "Longitude": -106.2947288,
    "Tag": "h",
    "Phone_Number": "307.472.5843",
    "Link": "https://whninc.org/"
  },
  {
    "Organization": "Wyoming Community Development Authority",
    "Address": "155 N. Beech St. Casper, WY",
    "Latitude": 42.8511729,
    "Longitude": -106.3205155,
    "Tag": "h",
    "Phone_Number": "(307) 265-0603",
    "Link": "https://www.wyomingcda.com/"
  },
  {
    "Organization": "Wyoming Department of Family Services",
    "Address": "201 N. 4th Lander, Wyoming 82520",
    "Latitude": 42.8348934,
    "Longitude": -108.7330423,
    "Tag": "h",
    "Phone_Number": "(307) 332-4038",
    "Link": "https://dfs.wyo.gov/assistance-programs/home-utilities-energy-assistance/"
  }
]

router.get('/locationform', function(req, res){
    res.render('locationform')
})

router.get('/formhandler', function(req, res){
    console.log(req.query)
    
    let out = dict.filter(function(elem){
        //console.log(Number(elem.Latitude), Number(elem.Longitude), Number(req.query.lat), Number(req.query.long))
        if("Tag" in req.query){
            if(String(req.query.Tag).length <= 2){
                if(!elem.Tag.includes(req.query.Tag.toLowerCase())) {
                    //console.log(req.query.Tag)
                    //console.log(elem)
                    return false;
                }}
            else{
                bo = true
                req.query.Tag.forEach(function(e){
                    if(!elem.Tag.includes(e.toLowerCase())){
                        bo = false;
                    }
    
                })
                if(!bo){
                    return false;
                }
            }
        }
        if(req.query.rad){
            if(distance(Number(elem.Latitude), Number(elem.Longitude), Number(req.query.lat), Number(req.query.long), 'M') > Number(req.query.rad)){
                return false;
            } 
        }
        return true;
    })
    console.log(out.length)
    if('listview' in req.query){
        let re = {'lst':out}
        res.render('listview', re)
    }
    newout = []
    out.forEach(function(e){
        //arr = new Array(Number(e.Longitude), Number(e.Latitude))
        let arr = {'lat':e.Longitude, 'long':e.Latitude, 'name':e.Organization, 'link':e.Link, 'num':e.Phone_Number}
        toAdd = {
            // feature for Mapbo  let arr = [Number(e.Longitude), Number(e.Latitude)]x point
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': arr
            },
            'properties': {
                'title': e.Organization
            }
        }
        newout.push(toAdd)
    })
    console.log(newout)
    let result = {}
    result.lat = Number(req.query.lat)
    result.long = Number(req.query.long)
    result.out = newout
    
    res.render('mapbox', result)
})


function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

function haversine(lat1, lon1, lat2, lon2){
    console.log(lat1, lon1, lat2, lon2)
    //First point in your haversine calculation
    var point1 = { 'lat': lat1, 'lng': lon1 }
    
    //Second point in your haversine calculation
    var point2 = { 'lat': lat2, 'lng': lon2 }
    
    var haversine_m = haversine(point1, point2); //Results in meters (default)
    var haversine_km = haversine_m /1000; //Results in kilometers
    
    console.log("distance (in meters): " + haversine_m + "m");
    console.log("distance (in kilometers): " + haversine_km + "km");
    return haversine_km * 0.621371
}

function calcCrow(lat1, lon1, lat2, lon2) 
{
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var l1 = toRad(lat1);
      var l2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(l1) * Math.cos(l2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return (d / 1000) * 0.621371;
}

    // Converts numeric degrees to radians
function toRad(Value) 
{
        return Value * Math.PI / 180;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

module.exports = router;