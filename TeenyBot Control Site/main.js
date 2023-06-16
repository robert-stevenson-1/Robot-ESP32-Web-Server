var btnOneState = false;

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