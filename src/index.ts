// cannister code goes here
import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt, float32 } from 'azle';
import { v4 as uuidv4 } from 'uuid';

/**
 * This type represents a recipe that can be listed on a board.
 */

type Recipe = Record<{
    id: string;
    name: string;
    ingredients: string;
    preparationSteps: string;
    category: string;
    uploadedAt: nat64;
    updatedAt: Opt<nat64>;
    rating: float32;
}>

// A payload indicating the values to be passed to create a new recipe
type RecipePayload = Record<{
    name: string;
    ingredients: string;
    preparationSteps: string;
    category: string;
}>

// Store of all the recipe saved to the recipe canister
const recipeStorage = new StableBTreeMap<string, Recipe>(0, 44, 1024);


$query;
export function getRecipes(): Result<Vec<Recipe>, string> {
    return Result.Ok(recipeStorage.values());
}

$query;
export function getRecipeById(id: string): Result<Recipe, string> {
    return match(recipeStorage.get(id), {
        Some: (recipe) => Result.Ok<Recipe, string>(recipe),
        None: () => Result.Err<Recipe, string>(`Recipe with id=${id} was not found`)
    });
}

$query;
export function getRecipeByCategory(category: string): Result<Vec<Recipe>, string> {
    const recipeLength = recipeStorage.len();
    const recipe: Vec<Recipe> = []; // Create an empty array to store the recipe with the particular category
    const recipes = recipeStorage.items(); // Store all the recipes saved in a variable, so we can loop over them

    for(let i = 0; i < recipeLength; i++) {
        if(recipes[Number(i)][1].category == category) {
            recipe.push(recipes[Number(i)][1]); // If a particular recipe contains the required category, puss it into the recipe array created
        }
    }

    return Result.Ok(recipe); // Return the recipe array with the recipe having the desired category
}

$update;
export function addRecipe(payload: RecipePayload): Result<Recipe, string> {
    const recipe: Recipe = {
        id: uuidv4(),
        uploadedAt: ic.time(),
        updatedAt: Opt.None,
        rating: 1.0,
        ...payload
    };
    recipeStorage.insert(recipe.id, recipe);
    return Result.Ok(recipe);
}

$update;
export function updateRecipe(id: string, payload: RecipePayload): Result<Recipe, string> {
    return match(recipeStorage.get(id), {
        Some: (recipe) => {
            const updatedRecipe: Recipe = {
                ...recipe,
                ...payload,
                updatedAt: Opt.Some(ic.time())
            };
            recipeStorage.insert(recipe.id, updatedRecipe);
            return Result.Ok<Recipe, string>(updatedRecipe);
        },
        None: () => Result.Err<Recipe, string>(`Oops sorry, we couldn't update your recipe with the id=${id}. Recipe was not found`)
    });
}

$update;
export function rateRecipe(id: string, rate: number): Result<Recipe, string> {
    // Get the current rating of the particular recipe to be rated
    const recipeRating: any = match(recipeStorage.get(id), {
        Some: (rec) => {
            return rec.rating;
        },
        None: () => Result.Err<Recipe, string>(`Oops sorry, we couldn't update your recipe with the id=${id}. Recipe was not found`)
    })
    // Calculate the new rating by adding the current rating to the user's 
    // rating and dividing the result by 5
    const rating: any = ((recipeRating + rate) / 5);

    // Return the recipe with the new rating added to it
    return match(recipeStorage.get(id), {
        Some: (recipe) => {
            const ratingRecipe: Recipe = {
                ...recipe,
                rating,
                updatedAt: Opt.Some(ic.time())
            };
            recipeStorage.insert(recipe.id, ratingRecipe);
            return Result.Ok<Recipe, string>(ratingRecipe);
        },
        None: () => Result.Err<Recipe, string>(`Oops sorry, we couldn't update your recipe with the id=${id}. Recipe was not found`)
    });
}

$update;
export function deleteRecipe(id: string): Result<Recipe, string> {
    return match(recipeStorage.remove(id), {
        Some: (deletedRecipe) => Result.Ok<Recipe, string>(deletedRecipe),
        None: () => Result.Err<Recipe, string>(`Oops, we couldn't delete the recipe with the id=${id}. Recipe was not found`)
    });
}



// a workaround to make uuid package work with Azle
globalThis.crypto = {
    getRandomValues: () => {
        let array = new Uint8Array(32)

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256)
        }

        return array
    }
}