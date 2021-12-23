const imageContainerEl = document.getElementById('imageContainer');
const loaderEl = document.getElementById('loader');

let ready = false;
let imagesloaded = 0;
let totalimages = 0;
let photosArray = [];



// Unsplash API
const count = 10;
const apiKey = '1GjxKuCC5Jqs5kznWsX7j-JQkVkf9i1yAYl_e7yOJ8Y';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// onLoading
function onLoading(){
    imagesloaded++;
    if(imagesloaded === totalimages){
        ready = true;
        loaderEl.hidden = true;
    }
}

//setting attributs
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create element for links & photos , add to dom
function displayPhotos() {
    imagesloaded = 0;
    totalimages = photosArray.length;
    loaderEl.hidden = false;
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{href:photo.links.html,target:'_blank'});
        

        // create image element
        const img = document.createElement('img');
        setAttributes(img,{
            src : photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // adding event listner
        img.addEventListener('load', onLoading);
        

        // Put img in inside <a> ,then put both in container
        item.appendChild(img);
        imageContainerEl.appendChild(item);
    });
}

// Get photosfrom Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        //console.log(photosArray);
        displayPhotos();
    }catch(error){
        console.log(error);
    }
}


//Scroll event
window.addEventListener('scroll', () => {
    //console.log('scrolled');
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        //console.log(window.scrollY);
        ready = false;
        getPhotos();
    }
});

// on Load
getPhotos();