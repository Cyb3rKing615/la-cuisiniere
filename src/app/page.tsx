import HeroCarousel from "@/components/home/HeroCarousel";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import BrandStory from "@/components/home/BrandStory";
import FromFieldToPlate from "@/components/home/FromFieldToPlate";
import RecipeIdeas from "@/components/home/RecipeIdeas";
import JoinUs from "@/components/home/JoinUs";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <ProductsShowcase />
      <BrandStory />
      <FromFieldToPlate />
      <RecipeIdeas />
      <JoinUs />
    </>
  );
}
