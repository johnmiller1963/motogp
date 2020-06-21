# motogp

Statistical analysis of International motorcycle racing in the Grand Prix classes.

Motorcycling is both a hobby and a passion of mine.  This site represents the joining of 2 passions, motorcycling and coding, in particular coding using other peoples data, in this case the full history of championship wins by nation, rider and manufacturer.

Created as a milestone project within my [Code Institute - Full stack web developer course](https://codeinstitute.net/full-stack-software-development-diploma-uk) course, the website demonstrates an interactive front-end.  Using data from a JSON data file interactive components such as results tables, various charts and maps are there to be used by the user who has an interest in Grand Prix motorcycle racing.

[responsive design](<img src=“https://github.com/johnmiller1963/motogp/blob/master/readme/responsive.jpg” raw=true alt=“How site looks” style=“width: 90%;”>)

## UX

- As a fan of a rider I want to see their historic achievments so that I will be better informed.
- As a fan of a motorcycle make I want to see its historic achievments so that I will be better informed.
- As a fan of older motorcycles I want to discover racing history so that I can appreciate my bikes.
- Having heard ex-racers as commentators I want to review their racing history.
- As a younger or new fan I want to educate myself to the history of GP racing so that I know whom my peers are talking about.
- As a new fan I want to know where the races take place so that I can attend.
- As a long term fan I want to see a specific stat that isn't displayed, I want to be able to request this.

The sport of Grand Prix motorcycle racing to fast paced and dynamic.  I want the site to reflect the action delivered througout each race, this is achieved through the use of action shots from various race classes over the 71 years that the championship has been running.  Any fan of the sport will recognise many of the individuals in the sliding carousel.  

Wireframes were produced in Balsamiq to display the desired look on [desktop](readme/wf-desktop.pdf) and [mobile](readme/wf-mobile.df), the finished site is represented in the image above across mutiple targetted devices.

## Features

Dynamic carousel using a large proportion of the top of the page, a random function means the first image shown could be different on each visit.
The carpousel will adapt to device size so that it doesn't obscure the page on a smaller mobile view.

An articles section presents 4 text based articles, history, winners, physics and the future.  
As an article is selected the appropriate text is scrolled into view, this can be re-hidden or replaced by another article.

A single JSON file supplies all results data for the webite, if this was available externally the site would be truely dynamic, as it is an extra line of data added to the JSON file will keep the site current.

A dynamic html table displays the full championship history of winners by nation, rider and make across all the classes for the last 71 years.
The data in the table can be filtered and sorted by any racing class.

Several statistical charts are shown, all have options that allow a user to display different data choices.
Charts are displayed in bar, pie and stacked line (or area) format, colours are chosen at random from an array.

All race tracks used throughout the championships are displayed on a Google map, with additional tooltip data showing site name and the years where that location was used.

A working contact us form is included with reCaptcha and double email validation to allow feedback and suggestions.

A rudimentary search all facility exists in the fixed navbar.

The theme of the site is based on a black\grey colour mix, reminisent of race track tarmac.  A contrasting bright orange is then used to highlight functionality, in addition this orange is the base colour for the most successful racing team of all time (Honda).

Google font open-sans was chosen as default, it allows clear and easy reading across devices of any size.  In particular the 100 weight was nice against the dark background.  Text displayed is generally off-white as this looks more professional than pure white.

There are navbar menu options to each section and a return link at the bottom or each section.  All scrolling is managed in
a bit to allow the user to see that they are moving up or down the page.

### Features Left to Implement

Implementing a Wikipedia hyperlink from riders, manufacturers, race tracks etc would allow a fan to further research any person or item named on the site.

Most recent (last 20 years) grand prix meetings have been televised and many are available on Youtube, a catalogue of these could be displayed, allowing users to see past and present riders in action.

The navbar search facility could build an array of matches and allow the user to select the specific occurance of the match to view.

The navbar search can only find items in the DOM, so when a component is hidden (default for articles) these are not searched, it would be better to allow the textual content to be searched and if a match is found to display this specific article.

## Technologies Used

- [html5](<a href="http://www.w3.org/html/logo/">
<img src="https://www.w3.org/html/logo/badge/html5-badge-h-css3-semantics.png" width="165" height="64" alt="HTML5 Powered with CSS3 / Styling, and Semantics" title="HTML5 Powered with CSS3 / Styling, and Semantics">
</a>)
Building blocks of this site

- [CSS3](https://www.w3.org/Style/CSS/)
A simple mechanism for adding style (e.g., fonts, colors, spacing) to Web documents.

- [Javascript](https://www.w3.org/wiki/The_web_standards_model_-_HTML_CSS_and_JavaScript#JavaScript_.E2.80.94_adding_behaviour_to_web_pages)
Adding behaviour to web pages in particular building dynamic arrays of user chosen data to display in charts

- [Bootstrap 4](https://getbootstrap.com/)
Bootstrap is an open source, mobile first toolkit for developing with HTML, CSS, and JS.  A CDN link is included on each page

- [JQuery](https://api.jquery.com/)
The project uses JQuery to simplify DOM manipulation.

- [Google fonts](https://fonts.google.com/)
Google font Open-sans is the primary type-face used

- [Gitpod](https://gitpod.io/)
Used as the primary IDE and to push committed changes back to Github

- [Github](https://github.com/)
On-line repository for all resources related to the finished site

- [Gitpages](https://pages.github.com/)
Used to host the finished site

- [Tabulator](http://tabulator.info/)
Free open source html table builder that takes JSON as one source of data

- [I want hue](https://medialab.github.io/iwanthue/)
Generates related and complimentary sets of colours used to populate chart graphics.

- [reCaptcha](https://developers.google.com/recaptcha/docs/display)
Utilised on submission of the contact form to prevent non human interaction

- [chartjs](https://www.chartjs.org/)
Used to generate all statistical graphs on the site

- [A contact us template](https://bootstrapious.com/p/how-to-build-a-working-bootstrap-contact-form) was used as a start point, this utilised functionality in a  contact.php
This was modified to allow use with mailjs.

- [Email facility](https://www.emailjs.com/) is used to allow the contact us form to send emails to my address.

## Testing

CDN mechanisms were used to leverage functionality from external resources, all have been updated to the latest version available from the authors.

Manual testing was carried out on a variety of modern browsers and devices of several sizes, though early testing revealed issues with some charts at very small resolutions these issues have been fixed in the live version.  

All navbar (menu) links and in page navigation works as designed.  The smooth 'ScrollToView' function is not as well supported on Apple devices as it is on other browsers but it does always find it's target.

The size of all images were checked with 300kb each being an upper limit, the largest file used is 209kb.

Google APIs are enabled on the map feature, a quota has been enabled to ensure the key is not abused.  Ditto the reCaptcha is hard-coded to the Gitpages delivery site.

The navbar search facility can only find the first occurance of any match, this is a limitation (see future features) but in this version it is by design.

The html and css were validated on [W3](https://validator.w3.org/nu/), initially 51 errors found.  Corrections and modifications have now removed all of these errors.

The Google reCaptcha caused a failure in the validator as code had been copied and pasted therefore putting a form into a form which fails, so this was corrected.

The javscript has been split across 5 files to aid navigation and allow portability to future projects.

Javascript was validated with [jshint](https://jshint.com/), many errors were displayed but the majority represent code choices from ES6 being rejected as they should have browser specific modifiers, researching this I decided not to modify the original code.  All other errors detected were corrected however this process did highlight a community variance on how and where to use semi-colons.  I decided on a standard and applied that across the 5 javascript pages.

For each of the user stories, specific tests were carried out:

- As a fan of a rider I want to see their historic achievments so that I will be better informed. 
*Searched for Barry Sheene, the last UK winner of the premier class, located in the data table - OK*
- As a fan of a motorcycle make I want to see its historic achievments so that I will be better informed. 
*Searched Ducati, this is the make I own.  Located in the data table and the makes chart and Ducati's impact on the championships over the years in the Kaizen chart.*
- As a fan of older motorcycles I want to discover racing history so that I can appreciate my bikes. 
*As a fan from the 90's onwards I was unaware of the riders in the first decades of this competition, I am now aware.*
- Having heard ex-racers as commentators I want to review their racing history. 
*Many ex champions turn to commentry after the racing career, all I have come across were located in the data table.*
- As a younger or new fan I want to educate myself to the history of GP racing so that I know whom my peers are talking about. 
*All championship winners are included in the results set, in addition the charts can provide a timeline for the performance of different makes.*
- As a new fan I want to know where the races take place so that I can attend.
*I have visited multiple Grand Prix on 4 of the tracks, for each I used the Google map and zoomed in to ensure the race track was visible in satelite view, which they were.*
- As a long term fan I want to see a specific stat that isn't displayed, I want to be able to request this. 
*!*

The contact form was tested on several devices, in each case an alert confirmed to the user that the [email](readme/email.jpg) had been sent and thanked them.  Each email was received by myself except when sent from Gitpod as the reCaptcha halted the form submission, the user was informed of this.  Each field is defined a required and testing ensured each was required, the browser highlighting any field that was missing an entry.  
Additional validation happens to ensure both email input entries are identical (and that the top box conforms to standards), otherwise the submit is cancelled.

## Deployment

The site resides in [Github](https://github.com/johnmiller1963/motogp) and the master repository is hosted on Gitpages.  

Instructions are shown here [Publishing pages](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

I chose to use the 'master' repository as the source for Gitpages, this means that each new push into the master repository will (within a few minutes) automatically update the published page.    

I used the gitpod interface to write the code and as it is linked with github it was easy to use the terminal to commit my files and push to my repository.

Deployment was completed by clicking on the settings tab on my repository then scroll down to 'Github pages' Changing the source from none to master, this then deployed a link that can be found here [Published pages](https://johnmiller1963.github.io/motogp/)

If you wish to run this project locally.

Within the github repository, Click 'Clone or Download'
Choose your preffered method (Zip or github desktop)
If zipped, then unzip the downloaded file to a convenient location, tested on a Windows desktop
Inside the root of the 'motogo' folder, double-click index.html
You may be prompted to select your preferred browser.

Note that the Google reCaptcha is locked to my site so either remove this functionality or add your own API key.
The Google maps functionality is linked to my API key, a quota is set and if usage stays below the quota the functionality will work fine, 
however if the quota is exceeded a message will be displayed to that effect on the map.  For best effect replace my API key with on of your own.

## Credits

The core of the data used for the site was extracted from [Wikipedia](https://en.wikipedia.org/wiki/List_of_Grand_Prix_motorcycle_racing_World_Champions_by_year)
The race track information was taken from [W(ikipedia](https://en.wikipedia.org/wiki/List_of_Grand_Prix_motorcycle_circuits)
The article titled physics 101 is borrowed from [Owen Edwards of the George Lucas Education Foundation](https://www.edutopia.org/motorcycle-physics)
The article titled The Future is credited at the top and originated from [Repsol](https://www.boxrepsol.com/en/motogp-en/motogp-2-0-future-technologies-applied-to-motogp) a major sponsor of the championship
The majority of images are sourced from [Wikimedia Commons](https://commons.wikimedia.org/), license was checked on each image used.
The logo for [MotoGP](https://www.motogp.com/) is used and at the foot of the page a large image and link to this.  The motoGP Grand Prix championships is run by [Dorna](https://www.dorna.com/)
