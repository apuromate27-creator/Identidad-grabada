
import {Header,Footer,WhatsAppFloat,Title}from"../components/ui";
import {ProductCatalog}from"../components/ProductCatalog";
export default function ProductsPage(){return <main className="min-h-screen text-white ig-page-background ig-page-productos"><Header/><section className="max-w-7xl mx-auto px-6 py-20"><Title eyebrow="Catálogo completo" title="Todos los mates personalizados" text="Buscá, filtrá por categoría y elegí el modelo ideal para personalizar."/><ProductCatalog/></section><Footer/><WhatsAppFloat/></main>}
