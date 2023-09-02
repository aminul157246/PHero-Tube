const loadPHTube = async () => {
    const response = await fetch (`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await response.json()
    

    const tabContainer = document.getElementById('tab-container')
    data.data.forEach((element => {
        
        const div = document.createElement('div')
        div.innerHTML = `
            <a onclick = 'handleTube(${element.category_id})' class="tab">${element.category} </a> 
        `
        tabContainer.appendChild(div)
        
    }))
    }

// card part 
const handleTube = async (categoryId) => {

    const response = await fetch (`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)

    const data = await response.json()
    console.log(data.data)
    document.getElementById('sort-handler' ).addEventListener('click', function(){
        const foo = data.data.sort((a,b) => {
            return parseFloat(b.others.views) - parseFloat(a.others.views)
        })
        console.log(foo)
    })


// no found part 
    const noFoundHandler = () => {
        const noResultFound = document.getElementById('no-result')
        noResultFound.textContent = ''
        const div = document.createElement("div")
        noResultFound.innerHTML = `
        <div class= 'flex justify-center items-center'><img src="Icon.png" alt=""></div>
        <h2 class="text-4xl font-bold text-center mt-4">Opps... <br> No Data Found</h2>
        
        `
        noResultFound.appendChild(div)
        
    if (data.data.length === 0){
        noResultFound.classList.remove('hidden')
    }
    else {
    noResultFound.classList.add('hidden')
    }
    } 
noFoundHandler()
    


const cardContainer = document.getElementById('card-container')
cardContainer.textContent = ""

    data.data.forEach(item => {
        // time part 
        const getTime = item.others.posted_date;
        const timeInHours = Math.floor(getTime/3600)
        const timeInMin  = Math.floor(timeInHours%60)
        const div = document.createElement('div')  
        div.innerHTML = `
        <div class="card h-[380px] bg-base-100 shadow-xl">
        <div>  
        <span class = 'relative'><img class='h-[200px] w-full' src="${item.thumbnail}" alt="" /></span>
        <p class = 'absolute bg-gray-100 px-4 top-40 left-28 rounded-lg'>
        ${
                item.others.posted_date !== ""
                ? `(${timeInHours} hours ${timeInMin} minutes)`
                : ''
        }  
        </p>
        </div>

        <div class="card-body ">
        <div class = "flex justify-left gap-2">
        <div class = "w-[50px]">
        <img class = " rounded-full " src="${item.authors[0].profile_picture}" alt="" />
        </div>
        <h2 class="text-xl font-bold">${item.title}
        </h2>
        </div>
            <div class = "flex justify-start">
            <p>${item.authors[0].profile_name}</p>
            <p>${item.authors[0].verified ? '<div class = "w-6" >  <img  src="icons8-verified-48.png" alt=""> </div>' : ""}</p>
        </div>

        <p>${item.others.views} views</p>
        
        </div>
    </div>
        
        `
        cardContainer.appendChild(div)
        
    })

}

loadPHTube()
handleTube('1000')



// goToQuestion
const goToQuestion = document.getElementById('question').addEventListener('click' , function (){
    window.location.href = 'question.html'

})
