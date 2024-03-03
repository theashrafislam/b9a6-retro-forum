const allPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    // console.log(posts);
    allPostDisplay(posts);
}

const allPostDisplay = (posts) => {
    // console.log(posts);
    const postContainer = document.getElementById('post-container');
    posts.forEach(post => {
        // console.log(post);
        const div = document.createElement('div');
        // div.classList.add(`w-full md:w-3/5 flex gap-4 bg-[#F3F3F5] p-6 rounded-3xl`);
        div.innerHTML = `
        <div class="w-full  flex gap-4 bg-[#F3F3F5] p-6 rounded-3xl">
                <div class="w-1/6  md:pl-6">
                <img class="absolute w-24" src="${post.image}" alt="">
                <div class="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full relative lg:top-[-8px] lg:ml-[0px] top-[-6px] left-[89px]"></div>
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
                            <button onclick="readBtn(${post?.id})"><img src="./images/mes-box.png" alt=""></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        postContainer.appendChild(div);
    })
}

const titleCount = document.getElementById('title-count');
const viewCount = document.getElementById('view-count');

const readBtn = async (id) => {
    console.log(id);
    // titleCount.innerText = ${id};
}



const latestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data)
    const lMainContainer = document.getElementById('l-main-container')
    const latestContainer = document.getElementById('latest-container');
    data.forEach(item => {
        console.log(item)

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




allPost();
latestPosts();