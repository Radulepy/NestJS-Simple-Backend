import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const prodId = Math.random().toFixed(2) // random number as id 
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);

        return prodId;
    }

    getProducts() {
        return [...this.products]; // return a copy of the products and not the pointer to the obj
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }

    updateProduct(productId: string, title: string, description: string, price: number) {
        // const product = this.findProduct(productId)[0];
        // const index = this.findProduct(productId)[1];

        const [product, index] = this.findProduct(productId);
        const updateProduct = { ...product }; //duplicate product
        if (title) // check for empty objects
        {
            updateProduct.title = title;
        }
        if (description) {
            updateProduct.description = description;
        } 
        if (price) {
            updateProduct.price = price;
        }

        this.products[index] = updateProduct;
    }

    deleteProduct(prodId: string) //delete product at given id
    {
        const index = this.findProduct(prodId)[1]; //only get index of the product
        this.products.splice(index, 1); //remove from list
    }

    private findProduct(id: string): [Product, number] //return the product and the product Index from the product array
    {
        const productIndex = this.products.findIndex((prod) => prod.id == id); //find index of the produt in the array
        const product = this.products[productIndex];
        if (!product) // product does not exits
        {
            throw new NotFoundException('Could not find product!'); // automatically sends 404 error if not found
        }
        return [product, productIndex]
    }
}