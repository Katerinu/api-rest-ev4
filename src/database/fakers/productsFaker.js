import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const generateFakeProduct = () => {
    const name = faker.commerce.productName();
    const sku = faker.string.uuid();
    const price = faker.commerce.price(1, 1000, 2);
    const stock = faker.number.int({ min: 0, max: 1000 });

    const newProduct = {
        uuid: uuidv4(),
        name,
        sku,
        price,
        stock,
        status: true,
        createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        updatedAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    };
    return newProduct;
}

export { generateFakeProduct };