const dataUrl = 'data/media.json';
const basicPostsAmmount = 12;
const additionalPostAmmount = 6;
let postsArray = [];
let userData = {};
let lastIndexPost;
let currentModalPostId;

function initPage() {
    $.getJSON(dataUrl, (data) => {
        postsArray = data.media;
        userData.profile_pic_url = data.profile_pic_url;
        userData.username = data.username;
        const initialPosts = []
        for (let i = 0; i < basicPostsAmmount; i++) {
            initialPosts.push(postsArray[i]);
        }
        lastIndexPost = basicPostsAmmount;
        renderPostGrid(initialPosts);
    });
}

$('#container').on('click', '.post-item', (e) => {
    let postId = $(e.currentTarget).attr('data-id');
    let post = $.grep(postsArray, (obj) => obj.id === postId)[0];
    currentModalPostId = postId;
    renderPostModal(post);

    if (currentModalPostId < 1) {
        $('.prev').hide();
    } else {
        $('.prev').show();
    }

    if (currentModalPostId === postsArray.length - 1) {
        $('.next').hide();
    } else {
        $('.next').show();
    }
});

$('.modal').on('click', () => {
    $('.modal').hide();
});

$(document).keyup((e) => {
    if (e.keyCode === 27) {
        $('.modal').hide();
    }
});

$('.more-link').on('click', () => {
    const nextPostsArray = postsArray.slice(lastIndexPost + 1, lastIndexPost + additionalPostAmmount + 1);
    renderPostGrid(nextPostsArray);
    lastIndexPost += additionalPostAmmount;

    $('.more-link').hide();
});

$('.prev').on('click', (e) => {
    e.stopPropagation();
    currentModalPostId--;
    renderPostById(currentModalPostId);

    if (currentModalPostId < 1) {
        $('.prev').hide();
    }

    if (currentModalPostId < postsArray.length - 1) {
        $('.next').show();
    }
});

$('.next').on('click', (e) => {
    e.stopPropagation();
    currentModalPostId++;
    renderPostById(currentModalPostId);

    if (currentModalPostId === postsArray.length - 1) {
        $('.next').hide();
    }

    if (currentModalPostId > 1) {
        $('.prev').show();
    }
})

function renderPostGrid(postArray) {
    const items = [];
    const rowItems = [];
    $.each(postArray, (index, post) => {
        let overlay = `<div class="post-overlay">
            <i class="icon icon-like"></i><span class="meta-text">${post.edge_liked_by.count}</span>
            <i class="icon icon-comment"></i><span class="meta-text">${post.edge_media_to_comment.count}</span>
        </div>`;
        let img = `<div class="image" style="background-image: url(${post.display_url})"></div>`;
        let item = `<div class="post-item" data-id='${post.id}'>${img}${overlay}</div>`;
        items.push(item);
        if ((index + 1) % 3 === 0) {
            rowItems.push(`<div class="row">${items.join('')}</div>`);
            items.length = 0;
        }

    });

    $(rowItems.join('')).appendTo('#container');
}

function renderPostModal(postItem) {
    $('#post-modal').show();
    $('.post-image').prop('src', postItem.display_url);
    $('.logo').prop('src', userData.profile_pic_url);
    $('.blog-name').text(userData.username);
    $('.location').text(postItem.location);
    $('.caption').html(`<b>${userData.username}</b> ${postItem.edge_media_to_caption}`);
    $('.likes-row .likes').text(postItem.edge_liked_by.count);
}

function renderPostById(postId) {
    let post = $.grep(postsArray, (obj) => parseInt(obj.id) === postId)[0];
    renderPostModal(post);
}

initPage();