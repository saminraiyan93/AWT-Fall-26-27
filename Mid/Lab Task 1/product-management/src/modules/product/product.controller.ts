import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/product.dto";
import { UpdateProductDto } from "./dto/product.dto";
@Controller("products")
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get()
    async getProducts() {
        return await this.productService.getProducts();
    }

    @Get(":id")
    async getProductsById(@Param("id") id: string) {
        return await this.productService.getProductsById(id);
    }

    @Post()
    async createProduct(@Body() dto: CreateProductDto) {
        return await this.productService.createProduct(dto);
    }

    @Patch(":id")
    async updateProduct(@Param("id") id: string, @Body() dto: UpdateProductDto) {
        return await this.productService.updateProduct(id, dto);
    }

    @Delete(":id")
    async deleteProduct(@Param("id") id: string) {
        return await this.productService.deleteProduct(id);
    }

}