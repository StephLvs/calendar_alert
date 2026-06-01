// connect to Calendar app
var calendarApp = Application("Calendar");
// return list of calendars
var calendars = calendarApp.calendars();

// date objects
var now = new Date();
var hourRange = new Date(now.getTime() + 60*60*1000);

var foundEvents = [];


calendars.forEach(calendar => {
    // return list of events from the current calendar
    var events = calendar.events();
    events.forEach(event => {
        // use calendar properties
        var title = event.summary();
        var startDate = event.startDate();
        var endDate = event.endDate();

        // check if event starts between now and one hour from now
        if(startDate >= now && startDate <= hourRange) {
            foundEvents.push({
                // object (property name: value)
                title: title,
                startDate: startDate,
                endDate: endDate
            });
        }
    });  
});

console.log("Found " + foundEvents.length + " upcoming event(s)");
foundEvents.forEach(event => {
    console.log(event.title + "starts at: " + event.startDate +
        "| ends at: " + event.endDate);
});