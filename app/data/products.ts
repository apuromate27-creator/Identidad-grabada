
export type Product={slug:string;name:string;category:string;categoryLabel:string;material:string;price:string;priceValue:number;badge:string;shortDescription:string;description:string;features:string[];gallery:string[];related:string[];featured:boolean;bestSeller:boolean;stock:string;tags:string[]};
const base=[
["imperial-calabaza","Mate Imperial de Calabaza","imperiales","Mates Imperiales","Calabaza natural con virola premium","Clásico premium",true,true,["imperial","calabaza","premium"]],
["imperial-algarrobo","Mate Imperial de Algarrobo","imperiales","Mates Imperiales","Algarrobo con terminación premium","Elegante",true,false,["imperial","algarrobo","madera"]],
["camionero-calabaza","Mate Camionero de Calabaza","camioneros","Mates Camioneros","Calabaza natural","Tradicional",true,true,["camionero","calabaza"]],
["camionero-algarrobo","Mate Camionero de Algarrobo","camioneros","Mates Camioneros","Algarrobo artesanal","Robusto",false,false,["camionero","algarrobo"]],
["torpedo-liso","Mate Torpedo Liso","torpedos","Mates Torpedo","Modelo torpedo liso","Minimalista",false,false,["torpedo","liso"]],
["torpedo-cincelado","Mate Torpedo Cincelado","torpedos","Mates Torpedo","Torpedo con detalles cincelados","Producto premium",true,true,["torpedo","cincelado","premium"]],
["ranchero-algarrobo","Mate Ranchero de Algarrobo","rancheros","Mates Rancheros","Algarrobo artesanal","Artesanal",false,false,["ranchero","algarrobo"]]
];
export const products:Product[]=base.map(([slug,name,category,categoryLabel,material,badge,featured,bestSeller,tags])=>({slug,name,category,categoryLabel,material,price:"Consultar",priceValue:0,badge,featured,bestSeller,tags:tags as string[],stock:"Disponible a pedido",shortDescription:`${name} preparado para grabado láser personalizado.`,description:`${name} con terminación premium. Ideal para personalizar con nombres, iniciales, frases o logos mediante grabado láser.`,features:["Grabado láser personalizado","Ideal para regalo","Producción artesanal","Personalización con nombre o logo","Envíos a toda Argentina","Confirmación de diseño antes de grabar"],gallery:["1","2","3","4"],related:["imperial-calabaza","torpedo-cincelado","camionero-calabaza"].filter(x=>x!==slug)})) as Product[];
export const categories=[{id:"todos",label:"Todos",href:"/productos"},{id:"imperiales",label:"Imperiales",href:"/productos/categoria/imperiales"},{id:"camioneros",label:"Camioneros",href:"/productos/categoria/camioneros"},{id:"torpedos",label:"Torpedos",href:"/productos/categoria/torpedos"},{id:"rancheros",label:"Rancheros",href:"/productos/categoria/rancheros"}];
export function getProductBySlug(slug:string){return products.find(p=>p.slug===slug)}
export function getRelatedProducts(slugs:string[]){return products.filter(p=>slugs.includes(p.slug))}
export function getCategoryLabel(category:string){return categories.find(c=>c.id===category)?.label || category}
