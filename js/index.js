const showLoading = () => {
    document.getElementById('loading').classList.remove('hidden');
}
const hideLoading = () => {
    document.getElementById('loading').classList.add('hidden');
}

const allPost = async () => {
    showLoading();
    setTimeout(async () => {
        const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
        const data = await res.json();
        const posts = data.posts;
        allPostDisplay(posts);
        hideLoading();
    }, 2000)
}

const postContainer = document.getElementById('post-container');
const allPostDisplay = (posts) => {
    // console.log(posts);

    postDisplay(posts)
}

function postDisplay(posts){

    posts.forEach(post => {
        console.log(post);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="w-full  flex gap-4 bg-[#F3F3F5] p-6 rounded-3xl">
                <div class="w-1/6  md:pl-6">
                <img class="absolute w-16 lg:w-24" src="${post.image}" alt="">
                <div class="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full relative lg:top-[-8px] lg:ml-[0px] top-[-6px] left-[57px]"></div>
                <div class="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full relative lg:top-[-8px] lg:ml-[0px] top-[-6px] left-[89px]"></div>
                </div>
                    <div class="w-5/6">
                    <div class="flex gap-8 mb-2">
                        <span class="text-sm text-[#12132DCC] font-bold">${post?.category}</span>
                        <p class="text-sm text-[#12132DCC] font-bold">Author: <span>${post?.author?.name}</span></p>
                    </div>
                    <div class="pb-6 border-b-2 border-dashed space-y-3">
                        <h2 class="text-xl font-bold">${post?.title}</h2>
                        <p class="text-[#12132D99] text-lg">${post?.description}</p>
                    </div>
                    <div class="pt-6 flex justify-between items-center md:gap-5 gap-2">
                        <div class="flex gap-4">
                            <span class="flex justify-center items-center gap-2">
                                <img src="./images/comment.png" alt="">
                                <p>${post?.comment_count}</p>
                            </span>
                            <span class="flex justify-center items-center gap-2">
                                <img src="./images/view.png" alt="">
                                <p>${post?.view_count}</p>
                            </span>
                            <span class="flex justify-center items-center gap-2">
                                <img src="./images/time.png" alt="">
                                <p class="text-nowrap">${post?.posted_time}</p>
                            </span>
                        </div>
                        <div>
                            <button class="countButton" onclick="readBtn('${post?.title.replace(/'/g,'@')}', '${post?.view_count}')"><img src="./images/mes-box.png" alt=""></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        postContainer.appendChild(div);
    })
}

const titleViewCount = document.getElementById('titleViewCount');
const read = document.getElementById('read');
let readCount = 0;
function readBtn(title, view){
    console.log('title', title)
    console.log('view', view)
    const div = document.createElement('div');
    div.classList.add('flex', 'justify-between', 'items-center', 'bg-[#FFFFFF]', 'gap-2', 'p-4', 'rounded-xl', 'mt-3');
    div.innerHTML = `
    <div>
        <h1 id="title-count">${title}</h1>
    </div>
    <div>
        <p class="flex"><img src="./images/view.png" alt=""> <span id="view-count">${view}</span></p>
    </div>
    `;
    readCount = readCount + 1;
    read.innerText = readCount;
    titleViewCount.appendChild(div);

}

const latestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data)
    const lMainContainer = document.getElementById('l-main-container')
    const latestContainer = document.getElementById('latest-container');
    data.forEach(item => {
        // console.log(item)

        const div = document.createElement('div');
        div.classList.add('rounded-3xl', 'border-2', 'space-y-4', 'p-6');
        div.innerHTML = `
        <img class="w-full" src="${item?.cover_image}" alt="">
                <h3 class="flex gap-3"><img src="./images/cal.png" alt=""><p class="text-[#12132D99]">${item?.author?.posted_date??"No publish date"}</p></h3>
                <h1 class="text-lg font-extrabold">${item?.title}</h1>
                <p class="text-base text-[#12132D99]">${item?.description}</p>
                <div class="flex gap-4">
                    <img class="w-16 rounded-full" src="${item?.profile_image}" alt="">
                    <div class="flex flex-col">
                        <h2 class="text-base font-bold">${item?.author?.name}</h2>
                        <p class="text-[#12132D99]">${item?.author?.designation??"Unknown"}</p>
                    </div>
                </div>
        `;
        latestContainer.appendChild(div);
    })
}

function searchBtn(){
    const searchField = document.getElementById('search-field').value;
    console.log(searchField)
    search(searchField)
    
}

const search = async (searchField) => {
    postContainer.textContent = '';
    showLoading();
    setTimeout(async () => {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchField}`);
        const data = await res.json();
        const posts = data.posts;
        postDisplay(posts);
        hideLoading();
    }, 2000)
}

allPost();
latestPosts();