setTimeout(() => {
    if (db) {
        let dbtransaction = db.transaction("video", "readonly");
        let videostore = dbtransaction.objectStore("video")
        let videorequest = videostore.getAll();
        videorequest.onsuccess = (e) => {
            let gallery = document.querySelector(".gallery-cont")
            let videoresult = videorequest.result

            videoresult.forEach((video) => {
                let mediaeleme = document.createElement("div");
                mediaeleme.setAttribute("class", "media-cont");
                mediaeleme.setAttribute("id", video.id);
                let url = URL.createObjectURL(video.blobdata)
                mediaeleme.innerHTML = `<video autoplay="true" loop src="${url}"></video><div class="media-action-cont"><div class="download"><span class="material-icons">file_download</span></div><div class="delete"><span class="material-icons">delete</span></div></div>`;
                let deleteele = mediaeleme.querySelector(".delete");
                deleteele = mediaeleme.addEventListener("click", deletelistner);
                let download = mediaeleme.querySelector(".download")
                download.addEventListener("click", downloadlistner);
                gallery.appendChild(mediaeleme);

            })
        }

        let dbtransaction2 = db.transaction("image", "readonly");
        let imagestore = dbtransaction2.objectStore("image")
        let imagerequest = imagestore.getAll();
        imagerequest.onsuccess = (e) => {
            let gallery = document.querySelector(".gallery-cont")
            let imageresult = imagerequest.result
            imageresult.forEach((image) => {
                let mediaeleme = document.createElement("div");
                mediaeleme.setAttribute("class", "media-cont");
                mediaeleme.setAttribute("id", image.id);
                let url = image.url;
                mediaeleme.innerHTML = ` <img src="${url}">
                <div class="media-action-cont"> 
                     <div class="download"><span class="material-icons">
                     file_download
                     </span></div>
                    <div class="delete"><span class="material-icons">
                    delete
                    </span></div> 
                 </div></img>`;
                let deleteele = mediaeleme.querySelector(".delete");
                deleteele.addEventListener("click", deletelistner);
                let download = mediaeleme.querySelector(".download")
                download.addEventListener("click", downloadlistner);
             
                gallery.appendChild(mediaeleme);

            })
        }
    }

}, 100)

function deletelistner(e) {
    let id = e.target.parentElement.parentElement.parentElement.getAttribute("id");
    if (id.slice(0, 3) === "vid") {
        let dbtransaction = db.transaction("video", "readwrite");
        let videostore = dbtransaction.objectStore("video")
        videostore.delete(id);
    }
    else if (id.slice(0, 3) === "img") {
        let dbtransaction2 = db.transaction("image", "readwrite");
        let imagestore = dbtransaction2.objectStore("image")
        imagestore.delete(id);
    }
    e.target.parentElement.parentElement.parentElement.remove()

}
function downloadlistner(e) {
    // let vid=e.target.parentElement.parentElement.parentElement.getAttribute("id")
    let id = e.target.parentElement.parentElement.parentElement.getAttribute("id");
    if (id.slice(0, 3) === "vid") {
        let dbtransaction = db.transaction("video", "readwrite");
        let videostore = dbtransaction.objectStore("video")
        let videorequest = videostore.get(id);
        videorequest.onsuccess=(e) => {
            let videoresult = videorequest.result;
            let videourl=URL.createObjectURL(videoresult.blobdata)
            let a = document.createElement("a");
            a.href = videourl;
            a.download = `${id}.mp4`;
            a.click();
        };
    }
    else if (id.slice(0, 3) === "img") {
        let dbtransaction2 = db.transaction("image", "readwrite");
        let imagestore = dbtransaction2.objectStore("image")
        let imagerequest = imagestore.get(id);
        imagerequest.onsuccess=(e) => {
            let imageresult = imagerequest.result;
           
            let a = document.createElement("a");
            a.href = imageresult.url;
            a.download = `${id}.jpeg`;
            a.click();
        };
    }
}
