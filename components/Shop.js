import Image from 'next/image';

export default function Shop() {
  const articles = [
    {
      id: 1,
      title: "Goldene Handschellen",
      price: "89,99 €",
      image: "/videos/blindfold-harness-and-ball-gag-194871.png",
      description: "Luxuriöse Handschellen in Gold-Optik"
    },
    {
      id: 2,
      title: "Satin Augenbinde",
      price: "29,99 €",
      image: "/images/shop/blindfold.jpg",
      description: "Weiche Augenbinde aus hochwertigem Satin"
    },
    {
      id: 3,
      title: "Leder Peitsche",
      price: "69,99 €",
      image: "/images/shop/whip.jpg",
      description: "Handgefertigte Lederpeitsche"
    },
    {
      id: 4,
      title: "Seil Set",
      price: "49,99 €",
      image: "/images/shop/rope.jpg",
      description: "Hochwertiges Seil-Set aus Baumwolle"
    },
    {
      id: 5,
      title: "Latex Handschuhe",
      price: "39,99 €",
      image: "/images/shop/gloves.jpg",
      description: "Elegante Latex-Handschuhe"
    },
    {
      id: 6,
      title: "Federn Set",
      price: "24,99 €",
      image: "/images/shop/feathers.jpg",
      description: "Sanfte Federn für zärtliche Berührungen"
    }
  ];

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-[#d0b48f] text-center mb-12">
          EmmaXschwarz Shop
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div 
              key={article.id}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-[#d0b48f] text-xl font-playfair mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {article.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#d0b48f] text-xl font-bold">
                    {article.price}
                  </span>
                  <button className="bg-[#d0b48f] text-black px-4 py-2 rounded-full hover:bg-[#e3cbaa] transition-colors font-playfair">
                    In den Warenkorb
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 