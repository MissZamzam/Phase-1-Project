
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = " ";{
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                
            });
          
        }
        mealList.innerHTML = html;
    })

}
//get recipe of meal
function getMealRecipe(e){
e.prevebtDefault();
if(e.target.classList.contains('recipe-btn')){
    let mealItem = e.target.parentElement.parentElement;
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}')
    .then(response => response.json())
    .then(data => mealRecipeModal(data.meals));
       
    }
}

