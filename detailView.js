document.addEventListener('DOMContentLoaded', function () {
    const photoElement = document.getElementById('photo');
    const titleContainer = document.getElementById('titleContainer');
    const tooltipElement = document.getElementById('tooltip');
    const ratingTextElement = document.getElementById('ratingText');
    const rateButton = document.getElementById('rateButton');
    const ratingInput = document.getElementById('ratingInput');
    const ratingValue = document.getElementById('ratingValue');
    const returnButton = document.getElementById('returnButton');

    const urlParams = new URLSearchParams(window.location.search);
    const photoId = urlParams.get('photoId');

    fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
        .then(response => response.json())
        .then(photo => {
            photoElement.src = photo.url;
            photoElement.alt = photo.title;
            titleContainer.textContent = photo.title;
            tooltipElement.textContent = photo.title;
            ratingTextElement.textContent = `Rating: ${photo.rating}`;
            ratingValue.value = photo.rating;
        })
        .catch(error => console.error('Error fetching photo details:', error));

    function showRatingInput() {
        rateButton.style.display = 'none';
        ratingTextElement.style.display = 'none';
        ratingInput.style.display = 'inline-block';
    }

    function saveRating() {
        const newRating = parseInt(ratingValue.value);
        if (!isNaN(newRating) && newRating >= 0 && newRating <= 10) {
            ratingTextElement.textContent = `Rating: ${newRating} / 10`;
        }
        resetRatingDisplay();
    }

    function cancelRating() {
        resetRatingDisplay();
    }

    function resetRatingDisplay() {
        rateButton.style.display = 'inline-block';
        ratingTextElement.style.display = 'inline-block';
        ratingInput.style.display = 'none';
    }

    returnButton.addEventListener('click', function () {
        window.location.href = '/PhotoViewerAppJs/gridView.html';
    });

    rateButton.addEventListener('click', showRatingInput);
    document.getElementById('saveRatingButton').addEventListener('click', saveRating);
    document.getElementById('cancelRatingButton').addEventListener('click', cancelRating);
});
