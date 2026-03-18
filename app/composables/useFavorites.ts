import { type Recipe } from "../types/types";

export const useFavorites = () => {
  const favorites = useState<Recipe[]>("favorites", () => []);
  const { addToast } = useToasts();

  onMounted(() => {
    const stored = localStorage.getItem("recipe-favorites");
    if (stored) {
      favorites.value = JSON.parse(stored);
    }
  });

  const toggleFavorite = (recipe: Recipe) => {
    const index = favorites.value.findIndex((f) => f.id === recipe.id);
    if (index === -1) {
      favorites.value.push(recipe);
      addToast(`"${recipe.name}" added to favorites!`, 'success');
    } else {
      favorites.value.splice(index, 1);
      addToast(`"${recipe.name}" removed from favorites`, 'info');
    }
    localStorage.setItem("recipe-favorites", JSON.stringify(favorites.value));
  };

  const isFavorite = (id: number) => {
    return favorites.value.some((f) => f.id === id);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
