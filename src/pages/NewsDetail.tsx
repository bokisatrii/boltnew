import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, User, ChevronRight } from "lucide-react";
import AnimatedSection from "../components/ui/AnimatedSection";

type Vest = {
  naslov: string;
  datum: string;
  tekst: string;
  slika?: string;
  slug?: string;
  autor?: string;
};

const renderContent = (tekst: string) => {
  const parts = tekst.split(/<<IMG:(.*?)>>/g);
  return parts.map((part, i) => {
    if (part.startsWith("http") && part.match(/\.(jpeg|jpg|png|webp|gif|avif)$/i)) {
      return (
        <img
          key={i}
          src={part}
          alt=""
          className="w-full sm:w-2/3 mx-auto my-6 rounded shadow-md"
        />
      );
    }
    return (
      <p key={i} className="mb-4 text-gray-800 whitespace-pre-line">
        {part}
      </p>
    );
  });
};

const NewsDetail = () => {
  const { slug } = useParams();
  const [vesti, setVesti] = useState<Vest[]>([]);
  const [vest, setVest] = useState<Vest | null>(null);

  useEffect(() => {
    fetch("https://api.sheetbest.com/sheets/41a008b3-7e1b-4c04-9451-d11906ded880")
      .then((res) => res.json())
      .then((data: Vest[]) => {
        setVesti(data);
        const found = data.find((v) => v.slug === slug);
        setVest(found || null);
      });
  }, [slug]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("sr-RS", options);
  };

  if (!vest) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Članak nije pronađen
            </h1>
            <p className="text-gray-600 mb-8">
              Članak koji tražite ne postoji ili je uklonjen.
            </p>
            <Link to="/news" className="btn-primary">
              Nazad na vesti
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <AnimatedSection>
          <div className="mb-6">
            <Link
              to="/news"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft size={18} className="mr-2" />
              Nazad na sve vesti
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64 sm:h-96 overflow-hidden">
              <img
                src={vest.slika}
                alt={vest.naslov}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {vest.naslov}
              </h1>

              <div className="flex flex-wrap items-center text-gray-500 mb-8 gap-4">
                {vest.autor && (
                  <div className="flex items-center">
                    <User size={18} className="mr-2 text-blue-500" />
                    <span>{vest.autor}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2 text-blue-500" />
                  <span>{formatDate(vest.datum)}</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                {renderContent(vest.tekst)}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {vesti.length > 1 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Pročitajte i
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vesti
                .filter((v) => v.slug !== slug)
                .slice(0, 3)
                .map((v, index) => (
                  <AnimatedSection key={index} delay={index * 0.1}>
                    <Link
                      to={`/news/${v.slug}`}
                      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={v.slika}
                          alt={v.naslov}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {v.naslov}
                        </h4>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar size={14} className="mr-1" />
                          <span>{formatDate(v.datum)}</span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
