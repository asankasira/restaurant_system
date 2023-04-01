import { DEFAULT_TIMEOUT_SEC } from './config';

export const timeoutAfter = sec => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Took long to respond. Timeout after ${sec} seconds`)),
      sec * 1000
    )
  );
};

export const waitFor = sec => {
  return new Promise((resolve, _) => {
     setTimeout(resolve, sec * 1000);
  })
}

export const getJsonResponse = async url => {
  try {
    const res = await Promise.race([fetch(url), timeoutAfter(DEFAULT_TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
}

export const postData = async (url, uploadData) => {
  try {

    const request = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(uploadData)
    })

    const res = await Promise.race([request, timeoutAfter(DEFAULT_TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
}

export const getRecipe = (recipe) => {
  let rcp = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    key: recipe.key
  }

  // Removing undefined or null properties
  rcp = Object.entries(rcp).reduce((acc, [key, value]) => {
      acc[key] = value;
      value ?? delete acc[key];
      return acc;
  }, {})

  return rcp;
}
