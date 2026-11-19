const loadCategories = () =>{
    fetch('https://openapi.twoinsoft.com/categories')
    .then(res => res.json())
    .then(data => showCategories(data))
};


const loadVideos = () =>{
    fetch('https://openapi.twoinsoft.com/videos')
    .then(res => res.json())
    .then(data => showAllVideos(data))
}


const showCategories = (categories) =>{
    const ul = document.getElementById('category-btn-container');
    categories.map(item => {
        const div = document.createElement('div')
        div.innerHTML = `
            <li class="btn btn-sm rounded-lg bg-base-20">${item.category}</li>
        `

        ul.appendChild(div)
    })
}


const showAllVideos = (videos) =>{
    const section  = document.getElementById('video-container');
    videos.map(single => 
    {
        const {thumbnail, title, others, authors} = single;
        const div= document.createElement('div');
        div.innerHTML = `
            <div class="my-5">
                    <div class="relative">
                        <img class="h-60 w-full object-cover rounded-2xl" src="${thumbnail}" alt="">
                        <div class="bg-black/50 badge absolute bottom-2 right-2 text-white border-none">
                           ${others.duration}
                        </div>
                    </div>

                    <div class="flex gap-3 mt-2.5">
                        <div>
                            <img class="h-10 w-10 object-cover rounded-full" src="${authors[0].profile_picture}" alt="">
                        </div>
                        <div>
                            <h3 class="text-md font-bold text-black">${title}</h3>
                            <div class="flex gap-1 items-center">
                                <h2 class="text-gray-600 text-sm mt-0.5">${authors[0].profile_name}</h2>
                                ${ 
                                    authors[0].verified ? '<i class="fa-solid text-sm text-blue-600 fa-circle-check"></i> ': ""
                                }
                            </div>

                            <p class="text-gray-600 text-sm mt-0.5">${others.views} views <span>.</span> ${others.posted_date} ago</p>
                        </div>
                    </div>
                </div>
        `

        section.appendChild(div)
    })
}

loadCategories();
loadVideos();