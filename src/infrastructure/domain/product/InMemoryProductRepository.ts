import data from './products.json';
import {Uuid} from "../../../domain/shared/Uuid";
import {ProductRepository} from "../../../domain/product/ProductRepository";
import {Product} from "../../../domain/product/Product";

export class InMemoryProductRepository implements ProductRepository {
    private _database: Product[];

    constructor() {
        this._database = getMockData();
    }

    findAll(): Promise<Product[]> {
        return Promise.resolve(
            this._database.splice(0)
        );
    }

    findByCategory(categoryId: Uuid): Promise<Product[]> {
        const products = this._database.splice(0).filter((product) => product.categoryId.equals(categoryId));
        return Promise.resolve(products);
    }

    findById(id: Uuid): Promise<Product | undefined> {
        const product = this._database.splice(0).find((product) => product.id.equals(id));
        return Promise.resolve(product);
    }

    findByUser(userId: Uuid): Promise<Product[]> {
        const products = this._database.splice(0).filter((product) => product.userId.equals(userId));
        return Promise.resolve(products);
    }

    store(product: Product): Promise<void> {
        this._database.push(product);
        return Promise.resolve();
    }
}

const getMockData = () => {
    const database: Product[] = data.map((row) => {
        const id = Uuid.create(row.id);
        const userId = Uuid.create(row.userId);
        const title = row.title;
        const description = row.description;
        const categoryId = Uuid.create(row.categoryId);
        const images = row.images;
        const value = row.value;

        return new Product(id, userId, title, description, categoryId, images, value);
    });
    return database;
};
