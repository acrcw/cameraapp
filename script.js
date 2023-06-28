let video = document.querySelector("video");
let constraints = {
    video: true,
    audio: true

}
let filtermap=new Map();
filtermap.set("blur","blur(0.5rem)")
filtermap.set("contrast","contrast(1.75)")
filtermap.set("grayscale","grayscale(1)")
filtermap.set("huerotate","hue-rotate(-0.25turn)")
filtermap.set("invert"," invert(1)")
filtermap.set("opacity","opacity(50%)")
filtermap.set("saturate","saturate(4)")
filtermap.set("sepia","sepia(1)")
// filtermap.set("blue","blur(0.5rem)")
filtermap.set("bright","brightness(1.75)")
let recorder;
let recordflag = false;
let transparentcolor="transparent";
let recordbtncont = document.querySelector(".record-btn-cont")
let recordbtn = document.querySelector(".record-btn")
let capturebtncont = document.querySelector(".capture-btn-cont")
let capturebtn= document.querySelector(".capture-bt")
// navigator is global object that tells informtaion related to browser
window.navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream // add to video element
    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start", (e) => {
        chunks = [];
    })
    recorder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data);
    })
    recorder.addEventListener("stop", (e) => {
        //convert media chunks to video
        let blob = new Blob(chunks, { type: "video/mp4" });
        let videourl = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = videourl;
        a.download = "stream.mp4"
        a.click();


    })
})
recordbtncont.addEventListener("click", (e) => {
    if (recorder === false) return;
    recordflag = !recordflag;

    if (recordflag === true) {

        recorder.start();
        // console.log("recording started")
        startTimer();
        recordbtn.classList.add("scale-record");
    }
    else {
        recorder.stop();
        stopTimer();
        recordbtn.classList.remove("scale-record");
    }
})
let timerid;
let counter = 0;
console.log(document.title);
function startTimer() {
    timerid = setInterval(() => {
        let seconds = counter;
        let hrs = Number.parseInt(seconds / 3600); // i hr has 3600 sec so divide will give no of hrs
        seconds = Number.parseInt(seconds % 3600); // get the remainging seconds
        let minutes = Number.parseInt(seconds / 60); // i minute has 60 secs so dividing remainging seconds by 60 will give me minutes
        seconds = Number.parseInt(seconds % 60); // lastly the seconds left are seconds
        document.title = `${(hrs <= 9) ? "0" : ""}${hrs}:${(minutes <= 9) ? "0" : ""}${minutes}:${(seconds <= 9) ? "0" : ""}${seconds}`

        counter++;


    }, 1000)
}
function stopTimer() {
    clearInterval(timerid);
    document.title = "Camera Gallery"
}
capturebtncont.addEventListener("click",(e)=>{
   
    let canvas=document.createElement("canvas");
    canvas.width=video.videoWidth; //px
    canvas.height=video.videoHeight; // px
    let tool=canvas.getContext("2d"); // get context provide a tool refrence for camvas element
    //filter apply
    tool.filter=filtermap.get(transparentcolor);
    tool.drawImage(video,0,0,canvas.width,canvas.height);
    //  tool.fillRect(0,0,canvas.width,canvas.height)
    // canvas.classList.toggle(transparentcolor);
     let imageurl=canvas.toDataURL(); // create a url of image 
     let a=document.createElement("a");
     a.href=imageurl;
     a.download="capture.jpeg";
     a.click();
})
let filters=document.querySelectorAll(".filter")
filters.forEach((filter)=>{
    filter.addEventListener("click",(e)=>{
        // video.classList.add()
        console.log(video.classList.toggle(filter.classList[1]))
        transparentcolor=(transparentcolor===filter.classList[1]?"transparent":`${filter.classList[1]}`)
    })
})
// blue.click()