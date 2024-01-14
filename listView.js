document.addEventListener('DOMContentLoaded', function () {
    const albumsListContainer = document.getElementById('albums-list');

    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(photos => {
            const albums = groupPhotosIntoAlbums(photos);

            renderAlbumsList(albums);
        })
        .catch(error => console.error('Error fetching data:', error));

    function groupPhotosIntoAlbums(photos) {
        const albums = {};

        photos.forEach(photo => {
            if (!albums[photo.albumId]) {
                albums[photo.albumId] = {
                    name: `Album ${photo.albumId}`,
                    thumbnail: photo.thumbnailUrl,
                    albumId: photo.albumId
                };
            }
        });

        return Object.values(albums);
    }

    function renderAlbumsList(albums) {
        const listContainer = document.createElement('ul');

        albums.forEach(album => {
            const listItem = document.createElement('li');
            const listItemLink = document.createElement('a');
            listItemLink.href = '/PhotoViewerAppJs/gridView.html';
            listItemLink.target = '_blank';
            listItem.appendChild(listItemLink);

            const contentContainer = document.createElement('div');
            contentContainer.classList.add('content-container');

            const thumbnail = document.createElement('img');
            thumbnail.src = album.thumbnail;
            thumbnail.alt = 'Thumbnail';
            contentContainer.appendChild(thumbnail);

            const albumId = document.createElement('span');
            albumId.textContent = `Album ID: ${album.albumId}`;
            contentContainer.appendChild(albumId);

            listItemLink.appendChild(contentContainer);
            listContainer.appendChild(listItem);
        });

        albumsListContainer.appendChild(listContainer);
    }
});

