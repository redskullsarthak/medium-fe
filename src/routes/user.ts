import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";
import { signinInput,signupInput } from "@avinash13/medium2-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();


userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  if (!body.email || !body.password) {
    return c.json({ msg: "email and password are required" });
  }

  const {success} = signupInput.safeParse({email:body.email, password:body.password});
  if(!success) return c.json({msg:"invalid inputs"});


  const already_exists = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (already_exists) {
    return c.json({ msg: "already exists" }, 400);
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    jwt: token,
  });
});





userRouter.post("signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

   const {success} = signinInput.safeParse({email:body.email, password:body.password});
  if(!success) return c.json({msg:"invalid inputs"});

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ msg: "user not found" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    jwt: token,
  });
});
