import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  salaryRange?: string;

  @IsNumber()
  maxCvs: number;

  @IsOptional()
  @IsDate()
  // The following line allows the class-transformer to transform a string input (in the request)
  // into a Date object, which is what is expected of this DTO. This is necessary because the
  // request body is always a string, and we need to transform it into a Date object.
  @Type(() => Date)
  deadline?: Date;

  @IsNumber()
  @Type(() => Number)
  disclosureFee: number;
}
