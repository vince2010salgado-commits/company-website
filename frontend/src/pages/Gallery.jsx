import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { galleryItems } from '../mock';

const Gallery = () => {
  const renderImageArea = (item) => {
    // Type 1: Natural before/after pair - two separate images side by side
    if (item.type === 'pair') {
      return (
        <div className="grid grid-cols-2 gap-1 bg-black">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={item.beforeImage}
              alt={`Before - ${item.description}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">
                BEFORE
              </span>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={item.afterImage}
              alt={`After - ${item.description}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <span className="bg-[#3d6e3a] text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">
                AFTER
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Type 2: Pre-made collage image (already has before/after built in)
    if (item.type === 'collage') {
      return (
        <div className="relative bg-black">
          <img
            src={item.image}
            alt={item.description}
            className="w-full h-auto aspect-[2/1] object-cover"
          />
        </div>
      );
    }

    // Type 3: Single result image
    return (
      <div className="relative aspect-[2/1] overflow-hidden bg-black">
        <img
          src={item.image}
          alt={item.description}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-[#3d6e3a] text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">
            JOB COMPLETE
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" data-testid="gallery-page-title">
            Our Work Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the difference professional property care makes. Real jobs, real results.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {galleryItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#3d6e3a]"
                data-testid={`gallery-item-${item.id}`}
              >
                <CardContent className="p-0">
                  {/* Service Badge */}
                  <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                    <Badge className="bg-[#3d6e3a] hover:bg-[#2d5e2a] text-white px-4 py-1.5 text-sm">
                      {item.service}
                    </Badge>
                    <span className="text-sm text-gray-500 font-medium">
                      Job #{String(item.id).padStart(3, '0')}
                    </span>
                  </div>

                  {/* Image Area - Renders based on type */}
                  {renderImageArea(item)}

                  {/* Description Footer */}
                  <div className="p-6 bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.description}
                    </h3>
                    {item.type === 'pair' || item.type === 'collage' ? (
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                            Before
                          </p>
                          <p className="text-sm text-gray-700">{item.beforeText}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#3d6e3a] uppercase tracking-wider mb-1">
                            After
                          </p>
                          <p className="text-sm text-gray-700">{item.afterText}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700 mt-2">{item.afterText}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* More Coming Soon */}
          <div className="text-center mt-12 p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <p className="text-lg text-gray-600 font-medium">
              More transformations coming soon!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Follow us on Instagram <a href="https://instagram.com/freshstartpropertycare" target="_blank" rel="noopener noreferrer" className="text-[#3d6e3a] font-semibold hover:underline">@freshstartpropertycare</a> for the latest projects
            </p>
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
            <a href="/booking" className="inline-block" data-testid="gallery-cta-estimate">
              <button className="bg-white text-[#3d6e3a] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Free Estimate
              </button>
            </a>
            <a href="tel:832-291-9876" className="inline-block" data-testid="gallery-cta-call">
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
