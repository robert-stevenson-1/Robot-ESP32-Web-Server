var btnOneState = false;

// data sent from the robot 
const RobotCMDMessage = {
    // forward, right, reverse, left
    "dir": [0, 0, 0, 0],
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

// data received from the robot 
const RobotData = {
    "msg": {
        "robot_id" : 0,
        "uptime": 0,
        "body": "MESSAGE HERE",
    },
}

async function btnOne() {
    //toggle the button State
    btnOneState = btnOneState ? false : true

    RobotCMDMessage["dir"][0] = 0;
    RobotCMDMessage["dir"][1] = 0;
    RobotCMDMessage["dir"][2] = 0;
    RobotCMDMessage["dir"][3] = 0;
    RobotCMDMessage["dir"][3] = 0;
    RobotCMDMessage["ctrl_panel"]["btn1"]["state"] = btnOneState;

    //make a get request to the ESP
    const resp = await fetch("/btnOne", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(RobotCMDMessage)
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
    // let robotMsg = JSON.parse(JSON.stringify(RobotCMDMessageTemplate));

    // update the message to send
    RobotCMDMessage["dir"][0] = 105;
    RobotCMDMessage["dir"][1] = 0;
    RobotCMDMessage["dir"][2] = 0;
    RobotCMDMessage["dir"][3] = 0;

    // send the data to the server
    const resp = await fetch("/RobotMove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(RobotCMDMessage)
    }).then(function (response){
        // Print the response object
        console.log(response);
        return response.json();
    }).then(function (data){
        // Print the data
        console.log(data);
    })
}

/**
 * Robot Turn Left
 */
async function btnLeft(){
    // Deep Copy the Template JSON Message to send to the server
    // let robotMsg = JSON.parse(JSON.stringify(RobotCMDMessageTemplate));

    // update the message to send
    RobotCMDMessage["dir"][0] = 0;
    RobotCMDMessage["dir"][1] = 0;
    RobotCMDMessage["dir"][2] = 0;
    RobotCMDMessage["dir"][3] = 105;
    // send the data to the server
    const resp = await fetch("/RobotMove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(RobotCMDMessage)
    }).then(function (response){
        // Print the response object
        console.log(response);
        return response.json();
    }).then(function (data){
        // Print the data
        console.log(data);
    })
}

/**
 * Robot Turn Right
 */
async function btnRight(){
    // Deep Copy the Template JSON Message to send to the server
    // let robotMsg = JSON.parse(JSON.stringify(RobotCMDMessageTemplate));

    // update the message to send
    RobotCMDMessage["dir"][0] = 0;
    RobotCMDMessage["dir"][1] = 105;
    RobotCMDMessage["dir"][2] = 0;
    RobotCMDMessage["dir"][3] = 0;

    // send the data to the server
    const resp = await fetch("/RobotMove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(RobotCMDMessage)
    }).then(function (response){
        // Print the response object
        console.log(response);
        return response.json();
    }).then(function (data){
        // Print the data
        console.log(data);
    })
}

/**
 * Robot Reverse
 */
async function btnReverse(){
    // Deep Copy the Template JSON Message to send to the server
    // let robotMsg = JSON.parse(JSON.stringify(RobotCMDMessageTemplate));

    // update the message to send
    RobotCMDMessage["dir"][0] = 0;
    RobotCMDMessage["dir"][1] = 0;
    RobotCMDMessage["dir"][2] = 105;
    RobotCMDMessage["dir"][3] = 0;

    // send the data to the server
    const resp = await fetch("/RobotMove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(RobotCMDMessage)
    }).then(function (response){
        // Print the response object
        console.log(response);
        return response.json();
    }).then(function (data){
        // Print the data
        console.log(data);
    })
}