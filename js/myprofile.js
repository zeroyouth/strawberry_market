const btn4 = document.querySelector('.delete-item');
const pop4 = document.querySelector('.dimm.delete');
const out4 = document.querySelector('.delete .cancle-btn');
const del4 = document.querySelector('.delete .delete-btn');
const edit = document.querySelector('.edit-item');
const view4 = document.querySelector('.view-item');

// 상품 - 삭제 & 수정 모달 
function close4() {
  document.querySelector(".modal4").classList.remove("hidden");

  const itemId = this.getAttribute('data-id');
  btn4.setAttribute('data-id', itemId);
  edit.setAttribute('data-id', itemId);
  view4.setAttribute('data-id', itemId);
}
const open4 = () => {
  document.querySelector(".modal4").classList.add("hidden");
} 
function viewOption() {
  pop4.style.display = 'block';
}
function cancleOption() {
  pop4.style.display = 'none';
}
// 삭제
async function deleteItem(){
  const url = (location.protocol === "https:") ? 'https://api.mandarin.cf' : 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');
  const productId = btn4.getAttribute('data-id');

  try {
    const res = await fetch( `${url}/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-type' : 'application/json'
      }
    });
    const json = await res.json();
    location.href="./myprofile.html";

  } catch(err) {
    location.href="./404.html";
    console.error(err);
  }
}
// 상품 수정 이동 페이지 
function editOption(){
  const productId = edit.getAttribute('data-id');
  location.href=`./edit.html?productId=${productId}`;
}
async function viewItem(){
  const url = (location.protocol === "https:") ? 'https://api.mandarin.cf' : 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');
  const productId = view4.getAttribute('data-id');

  try {
    const res = await fetch(`${url}/product/detail/${productId}`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-type' : 'application/json'
      },
    });
    const json = await res.json();
    window.open(json.product.link);
  } catch(err) {
    location.href="./404.html";
    console.error(err);
  }
};

document.querySelector(".modal4.hidden .hidden-menu").addEventListener("click", open4); 

//  삭제, 수정, 웹사이트에서 보기 모달
btn4.addEventListener('click',viewOption);
out4.addEventListener('click',cancleOption);
del4.addEventListener('click',cancleOption);
del4.addEventListener('click', deleteItem);
edit.addEventListener('click',editOption);
view4.addEventListener('click',viewItem);

// -----------------------------------------------
const modalUserPost = document.querySelector("#userPost");
const modalPostDel = modalUserPost.querySelector('.delete-item');
const modalPostEdit = modalUserPost.querySelector('.edit-item');
const modalDelete = document.querySelector('.dimm.off.delete');

// 게시글 - 삭제 & 수정 모달 
function close5() {
  console.log(this);
  modalUserPost.classList.remove("hidden");

  const postId = this.getAttribute('data-id');
  modalPostDel.setAttribute('data-id', postId);
  modalPostEdit.setAttribute('data-id', postId);
}
const open5 = () => {
  modalUserPost.classList.add("hidden");   
}
async function deletePost(){
  const url = (location.protocol === "https:") ? 'https://api.mandarin.cf' : 'http://146.56.183.55:5050';
  const token = localStorage.getItem('Token');
  const postId = modalPostDel.getAttribute('data-id');

  try {
    const res = await fetch( `${url}/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-type' : 'application/json'
      }
    });
    const json = await res.json();
    // console.log(json);
    location.href="./myprofile.html";

  } catch(err) {
    location.href="./404.html";
    console.error(err);
  }
}
function editPost(){
  const postId = modalPostEdit.getAttribute('data-id');
  location.href=`./mypostedit.html?postId=${postId}`;
}

modalUserPost.querySelector('.hidden-menu').addEventListener("click", open5);
modalPostDel.addEventListener('click', function() {
  modalDelete.style.display = 'block';
});
modalDelete.querySelector('.delete-btn').addEventListener('click', deletePost);
modalDelete.querySelector('.cancle-btn').addEventListener('click', () => {
  modalDelete.style.display = 'none';
});
modalPostEdit.addEventListener('click', editPost);

// 리스트로 보기, 엘범으로 보기
function toggleOn(){
  const viewListSec = document.querySelector('#viewList');
  const viewAlbumSec = document.querySelector('#viewAlbum');
  
  this.classList.add('on');

  if(this.id === 'viewAlbum-btn'){
    this.previousElementSibling.classList.remove('on');
    viewListSec.classList.remove('on');
    viewAlbumSec.classList.add('on');
  }else{
    this.nextElementSibling.classList.remove('on');
    viewAlbumSec.classList.remove('on');
    viewListSec.classList.add('on');
  }
}
const viewListBtn = document.querySelector('#viewList-btn');
const viewAlbumBtn = document.querySelector('#viewAlbum-btn');
viewListBtn.addEventListener('click', toggleOn);
viewAlbumBtn.addEventListener('click', toggleOn);

const profileEditBtn = document.querySelector('.profile-edit-btn');
const profileProdBtn = document.querySelector('.profile-product-btn');
profileEditBtn.addEventListener('click', (e) => {
  const accountName = checkAccountName();
  e.preventDefault();
  location.href = './accountedit.html';
});
profileProdBtn.addEventListener('click', (e) => {
  const accountName = checkAccountName();
  e.preventDefault();
  location.href = './product.html';
});

// 2. 얻어온 정보 뿌려주기
function setUserProfile(userProfile) {
  const user_image = (userProfile.image) ? userProfile.image : '../assets/basic-profile-img-2.png';

  document.querySelector('.profile-followers dd a').textContent = userProfile.followerCount;
  document.querySelector('.profile-followings dd a').textContent = userProfile.followingCount;
  document.querySelector('.profile-img').src = user_image;
  document.querySelector('.profile-name').textContent = userProfile.username;
  document.querySelector('.profile-account').textContent = `@ ${userProfile.accountname}`;
  document.querySelector('.profile-desc').textContent = userProfile.intro;
}

function setUserProduct(userProduct) {
  const productSec = document.querySelector('.product-sec .container');

  if (userProduct.data !== 0) {
    // 상품 O
    const fragment = document.createDocumentFragment();
    const productList = document.querySelector('.product-list');

    for (const product of userProduct.product) {
      const productPrice = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      const productItem = document.createElement('li');
      productItem.setAttribute('class', 'product-item');
      productItem.setAttribute('data-id', product.id);

      const productImg = document.createElement('img');
      productImg.setAttribute('src', product.itemImage);
      productImg.setAttribute('alt', '상품 이미지입니다.');
      productImg.setAttribute('class', 'item-img');

      const productTit = document.createElement('h3');
      productTit.setAttribute('class', 'item-tit sl-ellipsis');
      productTit.textContent = product.itemName;

      const productText = document.createElement('p');
      productText.setAttribute('class', 'item-price');
      productText.textContent = `${productPrice}원`;

      productItem.addEventListener('click', close4);

      productItem.appendChild(productImg);
      productItem.appendChild(productTit);
      productItem.appendChild(productText);
      fragment.appendChild(productItem);  
    }
    productList.appendChild(fragment);
    productSec.appendChild(productList);
  } else {
    // 상품 X
    document.querySelector('.product-sec').remove();
  }
}

function setUserImgPost(userImgPost) {
  const fragement = document.createDocumentFragment();
  const postAlbumList = document.querySelector('.post-album-list');
  for (const imgPost of userImgPost) {
    const imgString = imgPost.image;
    const imgArr = imgString.split(',');
    if(imgArr.length == 1){
      // 이미지 1개
      imgUrl = imgArr[0];
      imgClass = '';
    }else{
      // 이미지 여러개
      imgUrl = imgArr[0];
      imgClass = 'multi';
    }
    const postAlbumItem = document.createElement('li');
    postAlbumItem.setAttribute('class', `post-album-item ${imgClass}`);
    postAlbumItem.innerHTML = `<a href="./postdetail.html?postId=${imgPost.id}"><img src="${imgUrl}" alt="게시글 이미지 입니다."></a>`;
    fragement.appendChild(postAlbumItem);
  }
  postAlbumList.appendChild(fragement);
}

function checkImagePost(userPost) {
  let checkImagePost = false;
  let userImgPost = [];

  for (post of userPost) {
    if (post.image !== '') {
      checkImagePost = true;
      userImgPost.push(post);
    }
  }
  if (checkImagePost === true) {
    // 이미지 게시글 O - 앨범으로 보기 게시글 추가
    setUserImgPost(userImgPost);
  } else {
    // 이미지 게시글이 X - 앨범으로 보기 remove
    const viewAlbumBtn = document.querySelector('.post-btn-album');
    const postAlbumSec = document.querySelector('.post-album-sec');
    viewAlbumBtn.remove();
    postAlbumSec.remove();
  }
}

function setUserPost(userPost, userProfile) {
  const user_image = (userProfile.image) ? userProfile.image : '../assets/basic-profile-img-2.png';
  const postSec = document.querySelector('.post-sec');

  if (Object.keys(userPost.post).length !== 0) {
    // 이미지 게시글 체크
    checkImagePost(userPost.post);

    const fragment = document.createDocumentFragment();
    const postList = document.querySelector('.post-list-list');

    for (const post of userPost.post) {
      const post_date = new Date(post.createdAt);
      const post_date_format = `${post_date.getFullYear()}년 ${post_date.getMonth() + 1}월 ${post_date.getDate()}일`;
      // 이미지 여부 확인 및 복수 처리
      let postImageList = '';
      if(post.image){
        const postImages = post.image;
        const imageList = postImages.split(',');
        for (const item of imageList) {
          postImageList = `${postImageList}<li class="current"><img src="${item}" alt="포스트 이미지" class="user-photo"></li>`
        }
      }
      postImageList = `<ul class="post-img-list">${postImageList}</ul>`

      const heartBtnClass = post.hearted ? "btn btn-heart on" : "btn btn-heart";
      const postItem = document.createElement('li');
      postItem.setAttribute('class', 'post-list-item home-post');
      postItem.setAttribute('data-id', post.id);
      const htmlPostUser = `<div class="home-post-user">
        <img class="user-profile" src="${user_image}" alt="회원 프로필">
        <h4 class="user-name">${userProfile.username}</h4>
        <p class="user-id">@ ${userProfile.accountname}</p>
        <button type="button" class="btn-menu" data-id="${post.id}"><img src="../assets/icon/icon-more-vertical.png" alt="메뉴 열기"></button>
        </div>`;
      postItem.innerHTML = `${htmlPostUser}
          <div class="home-post-content">
            <p class="user-cont">${post.content}</p>
            ${postImageList}
          </div>`;

      const postMenuBtn = postItem.querySelector('.btn-menu');
      postMenuBtn.addEventListener('click', close5);
      // console.log();
      // 모달 하나로 해서 스크립트로 내용 바꾸기...

      const postComment = document.createElement('div');
      postComment.setAttribute('class', 'home-post-comment');

      const itemHeart = document.createElement('div');
      itemHeart.setAttribute('class', 'item-count');
      const itemHeartBtn = document.createElement('button');
      itemHeartBtn.setAttribute('type', 'button');
      itemHeartBtn.setAttribute('class', heartBtnClass);
      itemHeartBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('on');
      });
      const itemHeartCount = document.createElement('p');
      itemHeartCount.setAttribute('class', 'heart-count');
      itemHeartCount.textContent = post.heartCount;

      itemHeart.appendChild(itemHeartBtn);
      itemHeart.appendChild(itemHeartCount);

      const itemComment = document.createElement('div');
      itemComment.setAttribute('class', 'item-count');
      const itemCommentBtn = document.createElement('button');
      itemCommentBtn.setAttribute('type', 'button');
      itemCommentBtn.setAttribute('class', 'btn btn-message');
      itemCommentBtn.addEventListener('click', () => {
        location.href=`./postdetail.html?postId=${post.id}`;
      });
      const itemCommentImg = document.createElement('img');
      itemCommentImg.setAttribute('class', 'message-button');
      itemCommentImg.setAttribute('src', '../assets/icon/icon-message-circle.png');
      itemCommentImg.setAttribute('alt', '댓글 버튼');
      const itemCommentCount = document.createElement('p');
      itemCommentCount.setAttribute('class', 'message-count');
      itemCommentCount.textContent = post.commentCount;

      itemComment.appendChild(itemCommentBtn);
      itemCommentBtn.appendChild(itemCommentImg);
      itemComment.appendChild(itemCommentCount);

      const itemDate = document.createElement('p');
      itemDate.setAttribute('class', 'date');
      itemDate.textContent = post_date_format;
      
      postComment.appendChild(itemHeart);
      postComment.appendChild(itemComment);

      // postItem.appendChild(postDiv);
      postItem.appendChild(postComment);
      postItem.appendChild(itemDate);
      fragment.appendChild(postItem);
    }
    postList.appendChild(fragment);
  } else {
    // 게시글 X
    postSec.remove();
  }
}

// 1. api - 프로필 정보 얻어오기
async function getUserProfile() {
  const url = (location.protocol === "https:") ? 'https://api.mandarin.cf' : 'http://146.56.183.55:5050';
  const accountName = checkAccountName();
  const token = localStorage.getItem('Token');
  const init = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
  }

  try {
    // userProfile
    const resUserProfile = await fetch(`${url}/profile/${accountName}`, init);
    const resUserProfileJson = await resUserProfile.json();
    const userProfile = resUserProfileJson.profile;

    setUserProfile(userProfile);

    // userProduct
    const resUserProduct = await fetch(`${url}/product/${accountName}`, init);
    const resUserProductJson = await resUserProduct.json();
    const userProduct = resUserProductJson;

    setUserProduct(userProduct);

    // userProduct
    const resUserPost = await fetch(`${url}/post/${accountName}/userpost`, init);
    const resUserPostJson = await resUserPost.json();
    const userPost = resUserPostJson;

    setUserPost(userPost, userProfile);
  } catch (err) {
    location.href="./404.html";
    console.error('err', err);
  }
}

// 사용자 프로필 or 마이 프로필 확인
function checkUserOther() {
  if (location.search.split('id=')[1]) {
    location.href = `./profile.html?id=${location.search.split('id=')[1]}`;
  }
}

changeTitle();
checkUserOther();
getUserProfile();
