import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const popularContent = [
  {
    id: 1,
    title: "JavaScript Tutorial",
    badge: "Coding",
    image:
      "/temp/1.jpeg",
    count: 4300,
  },
  {
    id: 2,
    title: "Tech Trends 2025",
    badge: "Tech",
    image:
      "/temp/2.webp",
    count: 3200,
  },
  {
    id: 3,
    title: "The Future of AI",
    badge: "AI",
    image:
      "/temp/3.jpeg",
    count: 2400,
  },
  {
    id: 4,
    title: "React Hooks Explained",
    badge: "Coding",
    image:
      "/temp/4.jpeg",
    count: 1500,
  },
  {
    id: 5,
    title: "Image Generation with AI",
    badge: "AI",
    image:
      "/temp/5.jpeg",
    count: 1200,
  },
];

const latestTransactions = [
  {
    id: 1,
    title: "Пупки Василий",
    badge: "admin",
    image:
      "/temp/6.webp",
    count: 1400,
  },
  {
    id: 2,
    title: "Радужная Алиса",
    badge: "user",
    image:
      "/temp/7.jpeg",
    count: 2100,
  },
  {
    id: 3,
    title: "Черный Майкл",
    badge: "user",
    image:
      "/temp/8.webp",
    count: 1300,
  },
  {
    id: 4,
    title: "Радужная Евгения",
    badge: "admin",
    image:
      "/temp/9.webp",
    count: 2500,
  },
  {
    id: 5,
    title: "Кудрявый Игорь",
    badge: "user",
    image:
      "/temp/10.jpeg",
    count: 1400,
  },
];

const AppCardList = ({ title }: { title: string }) => {
  const list =
    title === "Список событий" ? popularContent : latestTransactions;
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {list.map((item) => (
          <Card key={item.id} className="flex-row items-center justify-between gap-4 p-4">
            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Badge variant="secondary">{item.badge}</Badge>
            </CardContent>
            <CardFooter className="p-0">{item.count / 1000}K</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppCardList;