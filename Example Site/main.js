var ledState = false;

async function ledToggle() {
    //make a get request to the ESP to toggle the LED
    ledState = ledState ? false : true;
    
    const resp = await fetch("/LED_TOGGLE", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ledToggle: ledState,
        })
    }).then(function (response) {
        
        console.log(response);
        return response.json();

    }).then(function (data){
        
        console.log(data);

        // get the button html element
        // var btn = document.getElementById("LED_TOGGLE");
        // btn.className = "LED_TOGGLE_ON";
    });
}