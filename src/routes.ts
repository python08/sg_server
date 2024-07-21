import { Express, Request, Response } from "express";
import { productRoutes } from "./routes/product.route";
import { sessionRoutes } from "./routes/session.route";
import { userRoutes } from "./routes/user.route";
import { updatesRoutes } from "./routes/updates.route";
import { categoryRoutes } from "./routes/category.route";
import { festivalRoutes } from "./routes/festival.route";

function routes(app: Express) {
  // healthcheck
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // add user
  userRoutes(app);

  // session
  sessionRoutes(app);

  // product
  productRoutes(app);

  // updates
  updatesRoutes(app);

  // category
  categoryRoutes(app);

  // festivals
  festivalRoutes(app);
}

export default routes;
