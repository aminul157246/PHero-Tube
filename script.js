const loadPHTube = async () => {
    const response = await fetch (`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await response.json()
    // console.log(data.data)

    const tabContainer = document.getElementById('tab-container')
    data.data.forEach((element => {
        console.log(element)
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
    console.log(data.data.length)


if (data.data.length === 0){
    const noResultFound = document.getElementById('no-result')
  
    noResultFound.innerHTML = `
    <div class= 'flex justify-center items-center'><img src="Icon.png" alt=""></div>
    <h2 class="text-4xl font-bold text-center mt-4">Opps... <br> No Data Found</h2>
    
    `
}
// else {
//     noResultFound.innerHTML = ''
// }

    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent = ""

   



    data.data.forEach(item => {
        console.log(item)
        const getTime = item.others.posted_date;
        const timeInHours = Math.floor(getTime/3600)
        const timeInMin  = Math.floor(timeInHours%60)
      

        const div = document.createElement('div')  
        div.innerHTML = `
        <div class="card h-[350px]  bg-base-100 shadow-xl">
        <figure "><img src="${item.thumbnail}" alt="" /></figure>

        
        <div class="card-body ">
        <div class = "flex justify-left gap-2">
        <div class = "w-12 ">
        <img class = "rounded-full" src="${item.authors[0].profile_picture}" alt="" />
        </div>
          <h2 class="text-xl font-bold">${item.title}
          </h2>
        </div>
          <div class = "flex justify-start">
          <p>${item.authors[0].profile_name}</p>
          <p>${item.authors[0].verified ? '<div class = "w-6" >  <img  src="icons8-verified-48.png" alt=""> </div>' : ""}</p>
          </div>

          <p>${item.others.views}</p>
          <p>(${timeInHours} hours ${timeInMin} minutes) </p>
        </div>
      </div>
        
        `
        // <p><span class= 'font-bold'>GPS:</span> ${phone.others?.GPS ? phone.others.GPS : 'No gps' }</p>
        cardContainer.appendChild(div)
        
    })

}

loadPHTube()
handleTube('1000')



// goToQuestion
const goToQuestion = document.getElementById('question').addEventListener('click' , function (){
 window.location.href = 'question.html'

})


 