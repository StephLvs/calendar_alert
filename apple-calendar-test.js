// connect to Calendar app
var calendarApp = Application("Calendar");
// return list of calendars
var calendars = calendarApp.calendars();

// date objects
var now = new Date();
var hourRange = new Date(now.getTime() + 60*60*1000);
var startTimeRange = new Date(now.getTime()+ 4*60*1000);
var endTimeRange = new Date(now.getTime() + 6*60*1000);

var foundEvents = []


calendars.forEach(calendar => {
    // return name of current calendar
    var calendarName = calendar.name();
    console.log("Checking calendar: " + calendarName);

    // return list of events between time range
    // >< all events from current calendar
    var events = calendar.events.whose({
        _and: [
            {startDate: {
                _greaterThan: startTimeRange
            }},
            {startDate: {
                _lessThan: endTimeRange
            }}
        ]   
        })();

    // checks each event from the current calendar
    events.forEach(event => {
        // use calendar properties
        var title = event.summary();
        var startDate = event.startDate();
        var endDate = event.endDate();

        foundEvents.push({
            // object (property name: value)
            title: title,
            startDate: startDate,
            endDate: endDate
        });
    
    });  
});

console.log("Found " + foundEvents.length + " upcoming event(s) starting in 5 minutes");
foundEvents.forEach(event => {
    console.log(event.title + " starts at: " + event.startDate +
        "| ends at: " + event.endDate);
});