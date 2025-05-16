import { seedProducts } from "./productsSeeder.js";

const mainSeedingFunction = async () => {
    try{
    await seedProducts();
    }
    catch (error) {
        console.error("Error al crear los productos", error);
    }
    
}

mainSeedingFunction()
    .then(() => {
        console.log("Proceso de seeding completado.");
        process.exit(0); // Finaliza el proceso
    })
    .catch((error) => {
        console.error("Error en el proceso de seeding:", error);
        process.exit(1); // Finaliza el proceso con error
    });
