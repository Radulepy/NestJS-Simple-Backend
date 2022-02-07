import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products') // called at /products URL
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    @Post() //default path
    addProduct( //get body values and set variables to it
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): any {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId };
    }

    @Get() //no custom path
    getAllProducts() { //get all available products
        return this.productsService.getProducts(); //automatically converted to json
    }

    @Get(':id') //set value from param
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')//in the URL
    updateProduct(
        @Param('id') prodId: string, //Param
        @Body('title') prodTitle: string, //Body
        @Body('description') prodDesc: string, //Body
        @Body('price') prodPrice: number //Body
    ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string)
    {
        this.productsService.deleteProduct(prodId);
        return null;
    }
}