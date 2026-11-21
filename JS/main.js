let currentMeal = null;
let mealsData = [];
let filteredMeals = [];

$(document).ready(function () {
    loadMeals();
    loadFoodLog();
    $('.nav-item').click(function () {
        const section = $(this).data('section');
        $('.section').removeClass('active');
        $(`#${section}`).addClass('active');
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
    });

    // فلترة الـ Recipes
    $('#searchInput').on('input', filterRecipes);
    $('#areaTabs').on('click', '.tab', function () {
        filterByArea($(this).text());
    });
    $('#categoryTabs').on('click', '.tab', function () {
        filterByCategory($(this).text());
    });
});

function loadMeals() {
    $.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', function (data) {
        if (data.meals) {
            mealsData = data.meals.slice(0, 25);
            filteredMeals = [...mealsData];
            displayMeals(filteredMeals);
            populateFilters(mealsData);
        } else {
            // Placeholder إذا فشل API
            displayMeals([{
                idMeal: 'placeholder',
                strMeal: 'Placeholder Recipe',
                strMealThumb: 'https://via.placeholder.com/250x150',
                strCategory: 'Category',
                strArea: 'Area'
            }]);
        }
    }).fail(function () {
        alert('Failed to load recipes. Check internet connection.');
    });
}

function displayMeals(me