// CHECK:: 전체적으로 정리 필요! 
const uploadTxt = document.querySelector('.upload-txt');
const uploadInp = document.querySelector('.upload-input');
const imgContainer = document.querySelector('.img-container');
const uploadBtn = document.querySelector('.upload-btn');
// MEMO:: readInputFile()에서 빼서 전역변수로 두고 createPost()에서 length 기준으로 삼아줌
let selectedFiles = [];

// 이미지 업로드
async function uploadImg(files,index) {
  const formData = new FormData();
  formData.append("image", files[index]);
  console.log(formData);
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfiles`, {
      method: "POST",
      body: formData
  });
  const data = await res.json()
  console.log('data: ' ,data);
  const productImgName = data[0].filename;
  console.log(productImgName);
  return productImgName;
}

// 게시글 작성 후 서버에 post
async function createPost() {
  const url = "http://146.56.183.55:5050";
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjU0ODg4OWQwOWQzNmIyMTM1YzFiMSIsImV4cCI6MTY0ODY1MTUwMCwiaWF0IjoxNjQzNDY3NTAwfQ.QieMk5pJr-_DbG4yrlla9x3BkgYqMk1-qvI-lNT1tqQ';
  const contentText = uploadTxt.value;
  const imgUrls = [];
  const files = uploadInp.files;
  if(selectedFiles.length > 3) {
    alert('3장까지만');
  } else {
    for(let index = 0; index < files.length; index++) {
      const imgUrl = await uploadImg(files, index);
      imgUrls.push(`${url}/${imgUrl}`);
    }
    console.log(imgUrls);
    const res = await fetch(`${url}/post`, {
      method: 'POST',
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
      },
      body:JSON.stringify({
        "post": {
          "content": contentText,
          "image": imgUrls.join(',') //"imageurl1", "imageurl2" 형식으로 
        }
      })
    })
    const json = await res.json();
    const post = json.post;
    console.log(json)
    console.log(post);
    // location.href = '../html/P02.html';
  }
}

uploadBtn.addEventListener('click', createPost)

function removeImg() {

}


// 사진 미리보기
// CHECK:: 아래 미리 만들어둔 코드 활용해서 쓰면 된다!!!
function readInputFile(e){
  const files = e.target.files;
  const fileArr = Array.prototype.slice.call(files);
  const index = 0;
  
  fileArr.forEach(function(i) {
    if(files.length <= 3){
      selectedFiles.push(i);
      const reader = new FileReader();
      reader.onload = function(e) {
        // 1. div를 생성해서 선택된 파일을 백그라운드로 넣는다 
        const imgItem = document.createElement('div');
        imgItem.style.backgroundImage = `url(${reader.result})`;
        imgItem.className = 'img-item';

        // 2. 생성한 div를 원래 있던 부모요소의 자식으로 지정한다
        imgContainer.appendChild(imgItem);
        // CHECK:: 왜 넣어야 하는지 모름
        e.target.value = '';

        // 3. close 아이콘을 클릭하면 div를 제거한다
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        imgItem.appendChild(closeBtn);
        closeBtn.addEventListener('click',function(){
          imgContainer.removeChild(imgItem);
          // CHECK:: imgUrls 배열에서도 빼줘야 한다
        });
      };
      reader.readAsDataURL(i);
    }
    console.log(selectedFiles);
  })
}

uploadInp.addEventListener('change',readInputFile);