document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');

    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(photos => {
            const albums = groupPhotosIntoAlbums(photos);

            renderAlbums(albums);
        })
        .catch(error => console.error('Error fetching data:', error));

    function groupPhotosIntoAlbums(photos) {
        const albums = {};

        photos.forEach(photo => {
            if (!albums[photo.albumId]) {
                albums[photo.albumId] = {
                    name: `Album ${photo.albumId}`,
                    photos: []
                };
            }

            albums[photo.albumId].photos.push(photo);
        });

        return Object.values(albums);
    }

    function renderAlbums(albums) {
        const albumContainer = document.createElement('div');
        albumContainer.classList.add('album-container');

        albums.forEach(album => {
            const albumElement = document.createElement('div');
            albumElement.classList.add('album');

            const albumName = document.createElement('h3');
            albumName.textContent = album.name;

            albumElement.appendChild(albumName);

            album.photos.forEach(photo => {
                const photoContainer = document.createElement('div');
                photoContainer.classList.add('photo-container');

                const photoElement = document.createElement('img');
                photoElement.src = photo.thumbnailUrl;
                photoElement.alt = photo.title;

                photoElement.addEventListener('click', function () {
                    openDetailView(photo.id);
                });

                photoContainer.appendChild(photoElement);

                const title = document.createElement('p');
                title.textContent = photo.title.length > 20 ? photo.title.substring(0, 20) + '...' : photo.title;
                title.title = photo.title;
                photoContainer.appendChild(title);

                albumElement.appendChild(photoContainer);
            });

            albumContainer.appendChild(albumElement);
        });

        app.appendChild(albumContainer);
    }

    function openDetailView(photoId) {
        window.location.href = `/PhotoViewerAppJs/detailView.html?photoId=${photoId}`;
    }

    const returnButton = document.getElementById('returnButton');
    returnButton.addEventListener('click', function () {
        window.location.href = '/PhotoViewerAppJs/listView.html';
    });
});
