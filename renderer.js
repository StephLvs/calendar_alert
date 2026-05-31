function showAlert(eventName) {
    const eventBanner = document.getElementById("eventBanner")

    eventBanner.textContent = `${eventName} in 5 minutes`
}

showAlert("Teams meeting")