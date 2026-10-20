import { IsNotEmpty } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    category!: string;

    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    quantity!: number;

}

export class UpdateProductDto {

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    category!: string;

    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    quantity!: number;

}