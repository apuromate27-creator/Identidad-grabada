export const contact={brand:"Identidad Grabada",whatsapp:"5491136466108",whatsappLabel:"+54 9 11 3646-6108",instagram:"identidadgrabada",instagramUrl:"https://instagram.com/identidadgrabada",city:"General Las Heras, Buenos Aires, Argentina"};
export function whatsappLink(message:string){return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`}
