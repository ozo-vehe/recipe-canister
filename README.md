# RECIPE CANISTER
- Recipe Canister is a TypeScript (Azle) project on the ICP (Internet Computer TypeScript) platform that performs CRUD (Create, Read, Update and Delete) operations.
- Recipe provides users with the ability to perform the following
  1. Upload their favourite recipes.
  2. See and rate other user's recipes.
  3. Get recipes by their id or category
  4. Update their recipes and
  5. Delete recipes.


## Preparing the Development Environment
### 1. Install Node Version Manager (nvm)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

### 2. Switch to Node.js version 18
```bash
nvm use 18
```

### 3. Install DFX
```bash
DFX_VERSION=0.14.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

### 4. Add DFX to your path
```bash
echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
```

### 5. Reload your terminal if using GitHub Codespaces
- This can be done by closing the terminal and opening a new terminal.

### 6. Starting the Local Internet Computer
```bash
dfx start --background
```

Your terminal will display an output similar to the one below.

![](https://github.com/ozo-vehe/recipe-canister/blob/main/image1.png)

## Deploying the Canister

- Next, we will compile our canister code and install it on the local network using the dfx deploy command:
```bash
dfx deploy
```

- Executing the dfx deploy command should result in an output similar to:

![](https://github.com/ozo-vehe/recipe-canister/blob/main/image2.png)

## Interacting With the Canister

### 1. Adding a Recipe:
- First, we will invoke the `addRecipe()` function from our canister file. Execute the following command in your terminal:
```bash
dfx canister call recipe addRecipe '(record {"name"= "Delicious Egg Salad for Sandwiches"; "ingredients"= "8 eggs, 1/2 cup mayonnaise, 1/4 cup chopped green onion, 1 teaspoon prepared yellow mustard, 1/4 teaspoon paprika, salt and pepper to taste."; "preparationSteps"= "Place eggs in a saucepan and cover with cold water. Bring water to a boil and immediately remove from heat. Cover and let eggs stand in hot water for 10 to 12 minutes. Remove from hot water, cool, peel, and chop. Place chopped eggs in a bowl; stir in mayonnaise, green onion, and mustard. Season with paprika, salt, and pepper. Stir and serve on your favorite bread or crackers."; "category"="lunch"})'
```
> Take note of the id of the recipe generated as this will be used later.

> Other recipes available includes the following (they should be placed in the curly braces {}):

>  - "name"= "Tres Leches Pancakes"; "ingredients"= "2/3 cup sweetened condensed milk, 1/2 cup evaporated milk, 1/3 cup half and half, 1 box French vanilla cake mix, 1 1/4 cups almond milk, 3 large eggs, lightly beaten, 4 tablespoons vegetable oil, divided"; "preparationSteps"= " Combine sweetened condensed milk, evaporated milk, and half and half in a small saucepan and set over medium heat. Bring to a boil, stirring constantly for 3 minutes. Remove from heat and let cool. This is a sauce. Add cake mix, almond milk, eggs, and 3 tablespoons vegetable oil to a large bowl, and beat vigorously by hand for 2 minutes. Heat a large skillet or griddle over medium heat, and lightly coat with remaining vegetable oil. Add 1/4 cup of the batter for each pancake. Cook until edges begin to puff up, small bubbles appear, pop, and leave small holes. Flip pancakes and cook until golden brown on the other side. Serve pancakes with a drizzle of the sauce."; "category"="breakfast"

>  - "name"= "Air Fryer Waffle Egg in a Hole"; "ingredients"= "1 frozen waffle, 1 large egg, salt and pepper to taste, 2 tablespoons shredded cheese, maple syrup to taste"; "preparationSteps"= "Preheat the air fryer to 350 degrees F (175 degrees C). Cut a hole in the center of the frozen waffle using the rim of a cup or glass (about 2 to 3 inches in diameter). Move waffle to a square of parchment paper, then carefully place the parchment paper into the preheated air fryer, along with the small center waffle. Crack egg directly into the center of waffle hole; season with salt and pepper to taste. Close the lid and cook until the white of the egg has started to set, about 5 to 6 minutes. Remove small center waffle from the air fryer. Sprinkle shredded cheese onto egg waffle, and cook until the cheese is melted and egg white is completely set, about 1 to 2 minutes. Transfer egg waffle onto a plate; drizzle with maple syrup and serve immediately."; "category"="breakfast"


### 2. Rating a Recipe
- To rate a recipe we will call the `rateRecipe()` function. Execute the following command in your terminal, replacing id with the id of the recipe and rating with your rating
> Rating should be in decimal e.g a rating of 3 should be written as 3.0 etc

```bash
dfx canister call recipe rateRecipe '("id", rating)'
```

### 3. Favourite Recipe
- To make a recipe your favourite we will call the `favRecipe()` function. Execute the following command in your terminal, replacing id with the id of the recipe and favourite with your true
> Rating should be in decimal e.g a rating of 3 should be written as 3.0 etc

```bash
dfx canister call recipe favRecipe '("id", favourite)'
```

### 4. Get a Recipe by Category
- To get a recipe by it's category, we will call the `getRecipeByCategory()` function. Execute the following command in your terminal, replacing category with either breakfast, lunch or dinner.
```bash
dfx canister call recipe getRecipeByCategory '("category")'
```

### 5. Get a Recipes by Keyword
- To search for a recipe by a keyword, we will call the `searchRecipes()` function. Execute the following command in your terminal, replacing keyword with a specific keyword (like egg or something else).
```bash
dfx canister call recipe searchRecipes '("keyword")'
```

### 6. Get Top Rated Recipe
- To get the top rated recipe, we will call the `getTopRatedRecipes()` function. Execute the following command in your terminal. This function does not require any arguments/parameters to be passed.
```bash
dfx canister call recipe getTopRatedRecipes '()'
```

## :writing_hand: Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your new feature branch (`git checkout -b feature/new_feature`)
3. Commit your changes (`git commit -m 'icluded a new feature(s)'`)
4. Push to the branch (`git push origin feature/new_feature`)
5. Open a pull request


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
