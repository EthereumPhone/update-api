const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const newVersion = new Date("2022-05-22");

exports.getUpdate = functions.https.onRequest((request, response) => {
    //functions.logger.info("Request: " + request.query, { structuredData: true });
    var base_url = "https://storage.googleapis.com/ethos_binaries/ethOS2_{dist}_{version}.zip"
    var deviceName = request.query.deviceName;
    var submit_date = new Date(request.query.date.slice(0,4)+"-"+request.query.date.slice(4,6)+"-"+request.query.date.slice(6,8));
    var obj = [
        {
            "datetime": Math.floor(newVersion.getTime() / 1000),
            "filename": "ota-package.zip",
            "id": "5eb63bbbe01eeed093cb22bb8f5acdc3",
            "romtype": "UNOFFICIAL",
            "size": 314572800,
            "url": "https://example.com/ota-package.zip",
            "version": "19.1"
        }
    ]
    
    if (submit_date.getTime() < newVersion.getTime()) {
        if (deviceName === "blueline") {
            // Temp update test
            obj[0].url = base_url.replace("ethOS2_{dist}_{version}", "ethOS_blueline_OTA_update");
            obj[0].filename = "ethOS_blueline_OTA_update.zip";
            obj[0].size = 1054474061;
            response.send({"response": obj});
            return;
        } else if (deviceName === "crosshatch") {
            obj[0].url = base_url.replace("{dist}", "crosshatch").replace("{version}", "1");
            obj[0].filename = "ethOS2_crosshatch_1.zip";
            obj[0].size = 1313206202;
            response.send({"response": obj});
        }
    } else {
        response.send({"response":[]});
    }
});