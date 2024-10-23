import Hero from "@/components/hero";
import { NavigationBar } from "@/components/navigation-bar";
import ProductList from "@/components/product-list";

export default function Home() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="container px-4 md:px-6 mx-auto">
        <Hero></Hero>
        <ProductList></ProductList>
      </div>
    </>
    )
}
