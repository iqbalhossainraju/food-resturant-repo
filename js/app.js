const searchItem = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    if(searchText == '') {
        swal("Write what type food you wants?", {
            dangerMode: true,

          });
    }
    else{
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

        fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayedSearchResult(data.meals))
    }

}

const displayedSearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(meals.length == 0) {
        // swal({
        //     title: "Good job!",
        //     text: "You clicked the button!",
        //     icon: "success",
        //     button: "Aww yiss!",
        //   });
    }
    else {
        meals.forEach(meal =>{
            // console.log(meal)
            const div =  document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top h-40" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">
                    ${meal.strInstructions.slice(0, 100)}
                  </p>
                </div>
              </div>
            `;
            searchResult.appendChild(div)
        });
    }
};

const loadMealDetail = mealId => {
    // console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then((response) => response.json())
    .then(data => displayedMealDetail(data.meals[0]))
}

const displayedMealDetail = meal =>{
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">
      ${meal.strInstructions.slice(0, 100)}
      </p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Watch On Youtube</a>
    </div>
    `;
    mealDetails.appendChild(div)
}