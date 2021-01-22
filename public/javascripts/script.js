$(document).ready(function () {
    const animationDuration = 3000;

    const frameDuration = 1000 / 60;

    const totalFrames = Math.round(animationDuration / frameDuration);

    const easeOutQuad = t => t * (2 - t);

    const animateCountUp = el => {
        let frame = 0;
        const countTo = parseInt(el.innerHTML, 10);

        const counter = setInterval(() => {
            frame++;

            const progress = easeOutQuad(frame / totalFrames);

            const currentCount = Math.round(countTo * progress);


            if (parseInt(el.innerHTML, 10) !== currentCount) {
                el.innerHTML = currentCount;
            }

            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    };

    const countupEls = document.querySelectorAll('.timer');
    countupEls.forEach(animateCountUp);
})
function locate() {

    const locInfo = document.querySelector('#locInfo');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            document.donateForm.latitude.value = lat
            const long = position.coords.longitude;
            document.donateForm.longitude.value = long
            alert("Location Fetched Successfully")

        });
    }
}

function validateAndSend() {
    if (donateForm.address.value == '' && donateForm.latitude.value == '') {
        alert('Please provide pickup location!');
        return false;
    }
    else {
        donateForm.submit();
    }
}