



const loadVideos = () =>{
    fetch('https://openapi.twoinsoft.com/videos')
    .then(res => res.json())
    .then(data => 
    {
        removeActive();
        showHide('video-container');
        const AllBtn = document.getElementById('AllBtn');
        AllBtn.classList.add('active');
        showAllVideos(data)
    }
        
    )
}


const loadVideosByCategory = (category_id) =>
{
    fetch(`https://openapi.twoinsoft.com/category/${category_id}`)
    .then(res => res.json())
    .then(data => 
    {
        removeActive();
        showHide("video-container");
        const activeBtn = document.getElementById(`category-btn-${category_id}`)
        activeBtn.classList.add("active");
        showAllVideos(data)
    }
        
    )
}


const singleVidoe  = (id) =>{
    fetch(`https://openapi.twoinsoft.com/videos/${id}`)
    .then(res => res.json())
    .then(data => showSingleData(data) )
}

const showSingleData =(video)=>{
    const section = document.getElementById('single-section');
    const {title, thumbnail} = video;
    section.innerHTML = `
        <div>
            This is a video of ${title}
            <img src="${thumbnail}">
        </div>
    `
}
const loadCategories = () =>{
    fetch('https://openapi.twoinsoft.com/categories')
    .then(res => res.json())
    .then(data => 

        {
            
            showCategories(data)
            
        }
    )
};

const removeActive = () =>{
    const categoryBtn = document.querySelectorAll('.category-btn');
    categoryBtn.forEach(element =>{
        element.classList.remove('active');
    })
}

const showHide = (id) =>
{
    document.getElementById('video-container').classList.add("hidden");
    document.getElementById('single-section').classList.add("hidden");
    document.getElementById(id).classList.remove('hidden');

}
const showCategories = (categories) =>{
    const ul = document.getElementById('category-btn-container');
    
    categories.map(item => {
        const div = document.createElement('div')
        div.innerHTML = `
            <li id="category-btn-${item.category_id}" onclick="loadVideosByCategory(${item.category_id})" class="btn category-btn btn-sm rounded-lg bg-base-20">${item.category}</li>
        `

        ul.appendChild(div)
    })
}


const showAllVideos = (videos) =>{
    const section  = document.getElementById('video-container');
    const h1 = document.createElement("h1");
    h1.innerText = "Item Not Found";
    
    section.innerHTML = ""

    videos.length == 0 ? section.appendChild(h1) :

    
    videos.map(single => 
    {
        const {thumbnail, title, others, authors, video_id} = single;
        const div= document.createElement('div');

        div.addEventListener('click', function(){
            showHide('single-section');
            singleVidoe(video_id)
        })

        div.innerHTML = `
            <div class="my-5 cursor-pointer">
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