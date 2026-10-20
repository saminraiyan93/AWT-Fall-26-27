import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";


@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,) { }

    async getProducts() {
        try {
            const products = this.productRepository.find();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductsById(id: string) {
        try {
            const product = await this.productRepository.findOne(
                { where: { id } }
            );

            if (!product) {
                throw new NotFoundException("Product not found!");
            }

            return product;
        } catch (error) {
            throw error;
        }
    }

    async createProduct(dto: CreateProductDto) {
        try {
            const response = await this.productRepository.create(dto);
            return await this.productRepository.save(response);
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id: string, dto: UpdateProductDto) {
        try {

            console.log("id", id)
            if (!id) {
                throw new NotFoundException("Product id is empty!");
            }
            const product = await this.productRepository.findOne(
                {
                    where: { id }
                }
            )

            if (!product) {
                throw new NotFoundException("Product not found!");
            }

            Object.assign(product, dto);

            const { id: uid, ...rest } = product;

            return await this.productRepository.update({ id }, rest);

        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id: string) {
        try {

            const product = await this.productRepository.findOne({
                where: { id }
            });

            if (!product) {
                throw new NotFoundException("Product not found!");
            }

            return await this.productRepository.delete({ id: id });

        } catch (error) {
            throw error;
        }
    }
}