export const myFoodListItems = JSON.parse(localStorage.getItem('List')) || []

export const myFoodListCount = myFoodListItems.length