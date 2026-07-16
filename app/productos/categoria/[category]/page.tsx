
import {notFound}from"next/navigation";
import {Header,Footer,WhatsAppFloat,Title}from"../../../components/ui";
import {ProductCatalog}from"../../../components/ProductCatalog";
import {categories,getCategoryLabel}from"../../../data/products";
export function generateStaticParams(){return categories.filter(c=>c.id!=="todos").map(c=>({category:c.id}))}
export function generateMetadata({params}:{params:{category:string}}){return {title:`Mates ${getCategoryLabel(params.category)} | Identidad Grabada`}}
export default function CategoryPage({params}:{params:{category:string}}){if(!categories.some(c=>c.id===params.category))notFound();return <main className="min-h-screen bg-[#050505] text-white"><Header/><section className="max-w-7xl mx-auto px-6 py-20"><Title eyebrow="Categoría" title={`Mates ${getCategoryLabel(params.category)}`} text="Elegí el modelo ideal y personalizalo con nombre, frase, iniciales o logo."/><ProductCatalog initialCategory={params.category}/></section><Footer/><WhatsAppFloat/></main>}
