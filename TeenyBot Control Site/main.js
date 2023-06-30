var btnOneState = false;

const RobotCMDMessageTemplate = {
    // forward, right, reverse, left
    "dir": [false, false, false, false],
    // control panel 
    "ctrl_panel": {
        "btn1": {
            "state": false,
        },
        "btn2": {
            "state": false,
        },
        "btn3": {
            "state": false,
        },
        "btn4": {
            "state": false,
        },
        "btn5": {
            "state": false,
        },
    },
}

const RobotDataTemplate = {
    "msg": {
        "uptime": 0,
        "body": "MESSAGE HERE",
    },
}

async function btnOne() {
    //toggle the button State
    btnOneState = btnOneState ? false : true
    //make a get request to the ESP
    const resp = await fetch("/btnOne", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            btnOneState: btnOneState,
        })
    }).then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (data){
        console.log(data);
    });
}
/**
 * Robot Drive Forwards
 */
async function btnDrive(){
    // Deep Copy the Template JSON Message to send to the server
    let robotMsg = JSON.parse(JSON.stringify(RobotCMDMessageTemplate));

    // update the message to send
    robotMsg["dir"][0] = true;

    // send the data to the server
    const resp = await fetch("/btnDrive", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(robotMsg)
    }).then(function (response){
        // Print the response object
        console.log(response);
        return response.json();
    }).then(function (data){
        // Print the data
        console.log(data);
    })
}