import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { galleryItems } from '../mock';

const Gallery = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Work Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the difference professional property care makes. Browse our before and after transformations.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Badge className="absolute top-4 left-4 z-10 bg-[#3d6e3a] hover:bg-[#2d5e2a] text-white">
                      {item.service}
                    </Badge>
                    <div className="grid grid-cols-2">
                      {/* Before */}
                      <div className="relative aspect-square bg-gradient-to-br from-gray-400 to-gray-600">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white p-4">
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
                              BEFORE
                            </div>
                            <p className="text-sm">{item.beforeText}</p>
                          </div>
                        </div>
                      </div>
                      {/* After */}
                      <div className="relative aspect-square bg-gradient-to-br from-[#3d6e3a] to-[#5fa85c]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white p-4">
                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
                              AFTER
                            </div>
                            <p className="text-sm">{item.afterText}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.description}</h3>
                    <p className="text-gray-600 text-sm">
                      Professional {item.service.toLowerCase()} service delivering outstanding results.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#3d6e3a] to-[#2d5e2a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Your Transformation?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Let us give your property the fresh start it deserves!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" className="inline-block">
              <button className="bg-white text-[#3d6e3a] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Free Estimate
              </button>
            </a>
            <a href="tel:832-291-9876" className="inline-block">
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#3d6e3a] px-8 py-3 rounded-lg font-semibold transition-colors">
                Call: 832-291-9876
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;