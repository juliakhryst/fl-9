const dataUrl = 'data/media.json';
const itemsNumber = 12;
const postsArray = [];

function layout() {
    $.getJSON(dataUrl, (data) => {
        const items = [];
        const rowItems = [];
        $.each(data.media, (index, post) => {
            let overlay = `<div class="post-overlay">
                <i class="icon icon-like"></i><span class="meta-text">${post.edge_liked_by.count}</span>
                <i class="icon icon-comment"></i><span class="meta-text">${post.edge_media_to_comment.count}</span>
            </div>`;
            let img = `<div class="image" style="background-image: url(${post.display_url})"></div>`;
            let item = `<div class="post-item" data-id='${post.id}'>${img}${overlay}</div>`;
            items.push(item);
            postsArray.push(post);
            if ((index + 1) % 3 === 0) {
                rowItems.push(`<div class="row">${items.join('')}</div>`);
                items.length = 0;
            }
        });

        $(rowItems.join('')).appendTo('#container');

    });
}

$('#container').on('click', '.post-item', (e) => {
    let postId = $('.post-item').attr('data-id');
    console.log(postId);
    let post = $.grep(postsArray, (obj) => obj.id === postId)[0];
    console.log(post)
    renderPostModal(post);
});

function renderPostModal(postItem) {
    $('#post-modal').show();
    $modal = $('#post-modal .modal-content');
    $modal.find('.post-image').css('background-image', `url(${postItem.display_url}`);
    $modal.find('.location').text(postItem.location);
    $modal.find('.caption').text(postItem.edge_media_to_caption);
}

layout();