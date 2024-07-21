import { Request, Response } from "express";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import logger from "../utils/logger";
import {
  // CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  // UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
  getActiveProduct,
  getAllProduct,
} from "../service/product.service";
import { S3 } from "../middleware/aws-s3-config";
import { randomImageName } from "../utils/util";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { get } from "lodash";

export async function createProductHandler(
  // req: Request<{}, {}, CreateProductInput["body"]>,
  req: any, // FP add type check for formdata
  res: Response
) {
  try {
    const body = req.body;
    const file: any = req.file; // FP

    if (body && file) {
      // Generate a unique filename
      const fileName = randomImageName();

      // Construct S3 upload parameters
      const bucketFolderName = "products";
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${bucketFolderName}/${fileName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // Upload image to S3
      const command = new PutObjectCommand(params);
      await S3.send(command);

      body.link = `${process.env.S3_BUCKET_URL}/${bucketFolderName}/${fileName}`;

      // add product details
      const product = await createProduct({ ...body });

      return res.send(product);
    }
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function updateProductHandler(
  // req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>, // FP add type check for formdata,
  req: any,
  res: Response
) {
  try {
    const productId = req.params.productId;

    if (ObjectId.isValid(productId)) {
      const update = req.body;

      const updatedProduct = await findAndUpdateProduct(
        { _id: productId },
        update,
        {
          new: true,
          upsert: true,
        }
      );

      if (!updatedProduct) {
        return res.status(404).send({ message: "product not found" });
      }

      const product = await findProduct({
        _id: new mongoose.Types.ObjectId(productId),
      });

      if (!product.length) {
        return res.status(404).send({ message: "product not found" });
      }

      const file: any = req.file; // FP

      // no image update
      if (file) {
        const productImageUrl: string = get(product, "[0].link", "");
        const bucketFolderName = "products"; // FP
        const fileName = productImageUrl
          ? productImageUrl.split(`${bucketFolderName}/`)[1]
          : "";

        // Construct S3 upload parameters
        const params = {
          Bucket: process.env.S3_BUCKET_NAME, // Replace with your bucket name
          Key: `${bucketFolderName}/${fileName}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        // Upload image to S3
        const command = new PutObjectCommand(params);
        await S3.send(command);
      }

      return res.send(product[0]);
    } else {
      return res.status(400).send({ message: "Invalid MongoDB _id" });
    }
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getProductDetailsHandler(
  req: Request<GetProductInput["params"]>,
  res: Response
) {
  try {
    if (ObjectId.isValid(req.params.productId)) {
      const productId = new mongoose.Types.ObjectId(req.params.productId);

      const product = await findProduct({ _id: productId });

      if (!product.length) {
        return res.status(404).send({ message: "product not found" });
      }

      return res.send(product[0]);
    } else {
      return res.status(400).send({ message: "Invalid MongoDB _id" });
    }
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getAllProductHandler(
  req: Request<GetProductInput["params"]>,
  res: Response
) {
  try {
    const products = await getAllProduct();

    if (!products) {
      return res.status(404).send({ message: "products not found" });
    }

    return res.send(products);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getActiveProductHandler(
  req: Request<GetProductInput["params"]>,
  res: Response
) {
  try {
    const products = await getActiveProduct();

    if (!products) {
      return res.status(404).send({ message: "products not found" });
    }

    return res.send(products);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;

    if (ObjectId.isValid(productId)) {
      const productObjectId = new mongoose.Types.ObjectId(productId);
      const product = await findProduct({
        _id: productObjectId,
      });

      if (!product.length) {
        return res.status(404).send({ message: "product not found" });
      }

      const productImageUrl: string = get(product, "[0].link", "");
      const filePath = productImageUrl ? productImageUrl.split(`.com/`)[1] : "";

      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filePath,
      };

      // Upload image to S3
      const command = new DeleteObjectCommand(params);
      const response = await S3.send(command);
      if (get(response, "DeleteMarker")) {
        await deleteProduct({
          _id: productObjectId,
        });

        return res
          .status(200)
          .send({ message: "product deleted successfully" });
      }

      return res
        .status(400)
        .send({ message: "image and product deletion error" });
    } else {
      return res.status(400).send({ message: "Invalid MongoDB _id" });
    }
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function uploadProductImageHandler(
  req: any, // find type for multer FP
  res: Response
) {
  try {
    const file = req && req.file;

    if (file) {
      // Generate a unique filename
      const fileName = randomImageName();

      // Construct S3 upload parameters
      const params = {
        Bucket: process.env.S3_BUCKET_NAME, // Replace with your bucket name
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // Upload image to S3
      const command = new PutObjectCommand(params);
      await S3.send(command);
      // Respond with success message and uploaded file URL
      res.status(201).send(fileName);
    } else {
      res.status(400).send({ message: "cannot find file in request" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error uploading image!" });
  }
}

export async function deleteProductImageHandler(
  req: any, // find type for multer FP
  res: Response
) {
  try {
    // Construct S3 upload parameters
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: req.fileName,
    };

    // Upload image to S3
    const command = new DeleteObjectCommand(params);
    await S3.send(command);
    // Respond with success message and uploaded file URL
    res.status(201).send(req.fileName);
  } catch (error) {
    res.status(500).json({ message: "Error deleting image!" });
  }
}
