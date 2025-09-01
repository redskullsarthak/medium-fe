import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@avinash13/medium2-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    authorId: string;
  };
}>();

interface JwtPayload {
  id: string;
}

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization");
  const token = authHeader?.split(" ")[1] || "";
  const user = (await verify(token, c.env.JWT_SECRET)) as unknown as JwtPayload;

  if (user) {
    c.set("authorId", user.id);
    await next();
  } else {
    return c.json({
      msg: "not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const authorId = c.get("authorId");

    const { success } = createBlogInput.safeParse({
      title: body.title,
      content: body.content,
    });
    if (!success) return c.json({ msg: "wrong input" });
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: false,
        authorId: authorId,
      },
    });

    return c.json({
      id: post.id,
      msg:'successfully created'
    });
  } catch {
    return c.json({
      msg: "error while posting",
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse({
    title: body.title,
    content: body.content,
    id: body.id,
  });
  if (!success)
    return c.json({
      msg: "wrong inputs",
    });
  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      published: false,
    },
  });

  return c.json({
    id: post.id,
  });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log(c.req.header("authorization"));
  try {
    const posts = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: { name: true },
        },
      },
    });
    console.log(posts);
    return c.json({ posts: posts });
  } catch(error) {
    console.log(error);
    return c.json({});
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = await c.req.param("id");
  try {
    const posts = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        title: true,
        content: true,
        id:true,
        author: { select: { name: true } },
      },
    });
    console.log(posts);
    return c.json({
      post: posts,
    });
  } catch {
    return c.json({ msg: "error while fetching" });
  }
});
